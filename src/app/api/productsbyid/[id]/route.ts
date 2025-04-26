import { NextResponse } from 'next/server';
import db from '@/app/lib/db'; // Make sure this path is valid

// ✅ Helper to format image paths safely
const formatImagePath = (filename: string | null) => {
  if (!filename) return null;
  if (filename.startsWith('/uploads/')) return filename;
  if (filename.startsWith('uploads/')) return `/${filename}`;
  return `/uploads/${filename}`;
};

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id || Array.isArray(id)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return NextResponse.json({ error: 'Product ID must be a number' }, { status: 400 });
  }

  try {
    const query = `
      SELECT
        p.id,
        p.nama_produk,
        p.harga,
        p.kategori,
        p.foto,
        d.deskripsi_produk,
        d.foto_tambahan_1,
        d.foto_tambahan_2,
        d.foto_tambahan_3
      FROM katalog_produk p
      LEFT JOIN detail_produk d ON p.id = d.produk_id
      WHERE p.id = ?
    `;

    const [results] = await db.query(query, [productId]);
    const product = (results as any[])[0];

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const formattedProduct = {
      ...product,
      foto: formatImagePath(product.foto),
      foto_tambahan_1: formatImagePath(product.foto_tambahan_1),
      foto_tambahan_2: formatImagePath(product.foto_tambahan_2),
      foto_tambahan_3: formatImagePath(product.foto_tambahan_3),
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product details' }, { status: 500 });
  }
}
