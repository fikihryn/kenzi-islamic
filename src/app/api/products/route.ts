import { NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function GET() {
  try {
    const query = `
    SELECT id, nama_produk, harga, foto
    FROM katalog_produk
    ORDER BY id DESC
    `;

    console.log('Running query:', query); // Log query ke terminal

    const [products] = await db.query(query);

    console.log('Query result:', products); // Log hasil query

    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: String(error) },
      { status: 500 }
    );
  }
}
