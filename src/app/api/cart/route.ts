import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import pool from "@/app/lib/db";
import { NextRequest } from "next/server";
import { RowDataPacket } from "mysql2/promise";

// Define interface for decoded JWT token
interface DecodedToken extends JwtPayload {
  id: number;
}

// Define interface for database rows
interface CartRow {
  id: number;
  akun_id: number;
  produk_id: number;
  jumlah: number;
  product_id: number;
  nama_produk: string;
  harga: number;
  kategori: string;
  foto: string;
  deskripsi_produk?: string;
  foto_tambahan_1?: string;
  foto_tambahan_2?: string;
  foto_tambahan_3?: string;
}

// Define interface for cart item
interface CartItem {
  id: number;
  akun_id: number;
  produk_id: number;
  jumlah: number;
  product: {
    id: number;
    nama_produk: string;
    harga: number;
    kategori: string;
    foto: string;
    deskripsi_produk?: string;
    foto_tambahan_1?: string;
    foto_tambahan_2?: string;
    foto_tambahan_3?: string;
  };
  total_harga: number; // Add calculated total price
}

// Interface for POST & DELETE request body
interface CartBody {
  produk_id: number;
  jumlah?: number;
}

// Helper function to verify JWT token
async function verifyToken(req: NextRequest): Promise<{ userId: number } | null> {
  const cookieStore = await cookies();  // Add 'await' here
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("No auth token found in cookies");
    return null;
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return { userId: decoded.id };
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}

// GET: Get all cart items for the logged-in user
export async function GET(req: NextRequest) {
  try {
    const auth = await verifyToken(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = auth.userId;
    console.log("Fetching cart for user ID:", userId);
    
    const connection = await pool.getConnection();
    
    try {
      // Updated query to include product details
      const [rows] = await connection.query<RowDataPacket[]>(`
        SELECT k.id, k.akun_id, k.produk_id, k.jumlah, 
               p.id AS product_id, p.nama_produk, p.harga, p.kategori, p.foto,
               dp.deskripsi_produk, dp.foto_tambahan_1, dp.foto_tambahan_2, dp.foto_tambahan_3
        FROM keranjang k
        LEFT JOIN katalog_produk p ON k.produk_id = p.id
        LEFT JOIN detail_produk dp ON p.id = dp.produk_id
        WHERE k.akun_id = ?`, [userId]);
      
      console.log("Query executed successfully, rows returned:", rows.length);

      // Calculate total price for each item and create cart item objects
      const cartItems: CartItem[] = (rows as CartRow[]).map((row) => ({
        id: row.id,
        akun_id: row.akun_id,
        produk_id: row.produk_id,
        jumlah: row.jumlah,
        product: {
          id: row.product_id,
          nama_produk: row.nama_produk,
          harga: row.harga,
          kategori: row.kategori,
          foto: row.foto,
          deskripsi_produk: row.deskripsi_produk,
          foto_tambahan_1: row.foto_tambahan_1,
          foto_tambahan_2: row.foto_tambahan_2,
          foto_tambahan_3: row.foto_tambahan_3
        },
        total_harga: row.jumlah * row.harga
      }));

      // Calculate cart summary
      const cartSummary = {
        items: cartItems,
        total_items: cartItems.reduce((sum, item) => sum + item.jumlah, 0),
        total_harga: cartItems.reduce((sum, item) => sum + item.total_harga, 0)
      };

      return NextResponse.json(cartSummary);
    } catch (queryError) {
      console.error("Database query error:", queryError);
      return NextResponse.json({ error: "Database query failed" }, { status: 500 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Unexpected error in cart API:", error);
    return NextResponse.json({ error: "Failed to get cart items" }, { status: 500 });
  }
}

// POST: Add item to cart
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { produk_id, jumlah } = body as CartBody;

    if (!produk_id || !jumlah || jumlah < 1) {
      return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
    }

    const auth = await verifyToken(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = auth.userId;
    console.log("Adding to cart for user ID:", userId, "Product ID:", produk_id, "Quantity:", jumlah);

    const connection = await pool.getConnection();
    
    try {
      // Check if product exists
      const [productResult] = await connection.query<RowDataPacket[]>(
        "SELECT id FROM katalog_produk WHERE id = ?", 
        [produk_id]
      );
      
      if ((productResult as any[]).length === 0) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      // Begin transaction
      await connection.beginTransaction();

      // Check if item already exists in cart
      const [existingItems] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM keranjang WHERE akun_id = ? AND produk_id = ?", 
        [userId, produk_id]
      );

      const items = existingItems as CartRow[];

      let result;

      if (items.length > 0) {
        // Update quantity if the item already exists
        const newQuantity = items[0].jumlah + jumlah;
        [result] = await connection.query(
          "UPDATE keranjang SET jumlah = ? WHERE id = ?",
          [newQuantity, items[0].id]
        );
      } else {
        // Insert new item if it doesn't exist
        [result] = await connection.query(
          "INSERT INTO keranjang (akun_id, produk_id, jumlah) VALUES (?, ?, ?)",
          [userId, produk_id, jumlah]
        );
      }

      // Commit transaction
      await connection.commit();

      return NextResponse.json({ 
        success: true, 
        message: "Item added to cart successfully" 
      });
    } catch (queryError) {
      // Rollback in case of error
      await connection.rollback();
      console.error("Database query error when adding to cart:", queryError);
      return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Unexpected error adding item to cart:", error);
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}

// DELETE: Remove item from cart
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { produk_id } = body as CartBody;

    if (!produk_id) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    const auth = await verifyToken(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = auth.userId;
    console.log("Deleting from cart for user ID:", userId, "Product ID:", produk_id);

    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Execute the delete query
      const [result] = await connection.query(
        "DELETE FROM keranjang WHERE akun_id = ? AND produk_id = ?",
        [userId, produk_id]
      );
      
      const resultInfo = result as any;
      
      if (resultInfo.affectedRows === 0) {
        await connection.rollback();
        return NextResponse.json({ error: "Item not found in cart" }, { status: 404 });
      }

      await connection.commit();
      return NextResponse.json({ 
        success: true, 
        message: "Item removed from cart successfully" 
      });
    } catch (queryError) {
      await connection.rollback();
      console.error("Database query error when deleting from cart:", queryError);
      return NextResponse.json({ error: "Failed to delete cart item" }, { status: 500 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Unexpected error deleting cart item:", error);
    return NextResponse.json({ error: "Failed to delete cart item" }, { status: 500 });
  }
}
