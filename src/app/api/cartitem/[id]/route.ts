// /app/api/cartitem/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import pool from "@/app/lib/db";
import { RowDataPacket } from "mysql2/promise";

// Define the structure of route params
type Params = {
  params: {
    id: string;
  };
};

// Helper function to verify JWT token
async function verifyToken(req: NextRequest): Promise<{ userId: number } | null> {
  const cookieStore = await cookies(); // Await the promise to get cookies
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("No auth token found");
    return null;
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string" || !("id" in decoded)) {
      console.log("Invalid token format");
      return null;
    }

    return { userId: (decoded as JwtPayload).id };
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}

// Update cart item quantity
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    console.log("Updating cart item ID:", id);
    
    const body = await req.json();
    const { jumlah } = body;

    if (!jumlah || jumlah < 1) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    const auth = await verifyToken(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = auth.userId;
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Check if cart item exists and belongs to user
      const [cartItems] = await connection.query<RowDataPacket[]>( 
        "SELECT k.*, p.harga FROM keranjang k JOIN katalog_produk p ON k.produk_id = p.id WHERE k.id = ? AND k.akun_id = ?",
        [id, userId]
      );

      if (cartItems.length === 0) {
        await connection.rollback();
        return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
      }

      // Update quantity
      await connection.query("UPDATE keranjang SET jumlah = ? WHERE id = ?", [jumlah, id]);
      
      await connection.commit();
      
      // Calculate total price with updated quantity
      const item = cartItems[0];
      const totalPrice = jumlah * item.harga;

      return NextResponse.json({ 
        success: true, 
        message: "Quantity updated successfully", 
        data: {
          jumlah: jumlah,
          total_harga: totalPrice
        }
      });
    } catch (queryError) {
      await connection.rollback();
      console.error("Database query error when updating cart item:", queryError);
      return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Unexpected error updating cart item:", error);
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 });
  }
}

// Delete cart item
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    console.log("Deleting cart item ID:", id);

    const auth = await verifyToken(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = auth.userId;
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Check if cart item exists and belongs to user
      const [cartItems] = await connection.query<RowDataPacket[]>( 
        "SELECT * FROM keranjang WHERE id = ? AND akun_id = ?",
        [id, userId]
      );

      if (cartItems.length === 0) {
        await connection.rollback();
        return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
      }

      // Delete the cart item
      await connection.query("DELETE FROM keranjang WHERE id = ?", [id]);
      
      await connection.commit();

      return NextResponse.json({ 
        success: true, 
        message: "Item removed from cart successfully" 
      });
    } catch (queryError) {
      await connection.rollback();
      console.error("Database query error when deleting cart item:", queryError);
      return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Unexpected error deleting cart item:", error);
    return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 });
  }
}
