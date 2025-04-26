import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import pool from '@/app/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

type Product = {
  id: number;
  nama_produk: string;
  harga: number;
  kategori: string;
  foto: string;
};

type DetailProduk = {
  produk_id: number;
  deskripsi_produk: string;
  foto_tambahan_1: string;
  foto_tambahan_2: string;
  foto_tambahan_3: string;
};

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[API] /api/adminroute/products called');
  console.log('[API] Method:', req.method);

  if (req.method === 'GET') {
    try {
      console.log('[API] Fetching data from katalog_produk...');
      const [products] = await pool.query<Product[] & RowDataPacket[]>(
        'SELECT * FROM katalog_produk'
      );
      console.log('[API] Products fetched:', products.length);

      console.log('[API] Fetching data from detail_produk...');
      const [details] = await pool.query<DetailProduk[] & RowDataPacket[]>(
        'SELECT * FROM detail_produk'
      );
      console.log('[API] Details fetched:', details.length);

      const result = products.map(product => {
        const detail = details.find(d => d.produk_id === product.id);
        return {
          ...product,
          deskripsi_produk: detail?.deskripsi_produk || '',
          foto_tambahan_1: detail?.foto_tambahan_1 || '',
          foto_tambahan_2: detail?.foto_tambahan_2 || '',
          foto_tambahan_3: detail?.foto_tambahan_3 || '',
        };
      });

      console.log('[API] Merged result length:', result.length);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('[API] Error fetching products:', error);
      return res.status(500).json({ message: 'Failed to fetch products' });
    }
  }

  if (req.method === 'POST') {
    console.log('[API] Parsing form data...');
    const form = new IncomingForm({ multiples: true, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('[API] Form parse error:', err);
        return res.status(500).json({ message: 'Failed to parse form data' });
      }

      try {
        const saveFile = async (file: File): Promise<string> => {
          const data = fs.readFileSync(file.filepath);
          const uploadsDir = path.join(process.cwd(), 'public/uploads');
          const fileName = `${Date.now()}-${file.originalFilename}`;
          const finalPath = path.join(uploadsDir, fileName);

          if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
          fs.writeFileSync(finalPath, data);
          console.log(`[API] Saved file to: ${finalPath}`);
          return `/uploads/${fileName}`;
        };

        const fotoPath = files.foto?.[0] ? await saveFile(files.foto[0]) : '';
        console.log('[API] Uploaded main photo:', fotoPath);

        const [result] = await pool.query<ResultSetHeader>(
          'INSERT INTO katalog_produk (nama_produk, harga, kategori, foto) VALUES (?, ?, ?, ?)',
          [
            fields.nama_produk?.[0] || '',
            fields.harga?.[0] || '',
            fields.kategori?.[0] || '',
            fotoPath,
          ]
        );

        const insertedId = result.insertId;
        console.log('[API] Inserted into katalog_produk with ID:', insertedId);

        const fotoTambahan1 = files.foto_tambahan_1?.[0]
          ? await saveFile(files.foto_tambahan_1[0])
          : '';
        const fotoTambahan2 = files.foto_tambahan_2?.[0]
          ? await saveFile(files.foto_tambahan_2[0])
          : '';
        const fotoTambahan3 = files.foto_tambahan_3?.[0]
          ? await saveFile(files.foto_tambahan_3[0])
          : '';

        await pool.query(
          'INSERT INTO detail_produk (produk_id, deskripsi_produk, foto_tambahan_1, foto_tambahan_2, foto_tambahan_3) VALUES (?, ?, ?, ?, ?)',
          [
            insertedId,
            fields.deskripsi_produk?.[0] || '',
            fotoTambahan1,
            fotoTambahan2,
            fotoTambahan3,
          ]
        );

        console.log('[API] Product successfully saved');
        return res.status(201).json({
          id: insertedId,
          nama_produk: fields.nama_produk?.[0],
          harga: fields.harga?.[0],
          kategori: fields.kategori?.[0],
          foto: fotoPath,
        });
      } catch (error: any) {
        console.error('[API] Upload error:', error);
        return res.status(500).json({ message: 'Gagal menambahkan produk' });
      }
    });
  } else {
    console.warn('[API] Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
