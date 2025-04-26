import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import path from 'path';
import pool from '@/app/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file: File, folder: string): Promise<string> => {
  if (!file.filepath || !file.originalFilename) throw new Error('File tidak valid');

  const data = fs.readFileSync(file.filepath);
  const uploadsDir = path.join(process.cwd(), 'public/uploads', folder);
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const fileName = `${Date.now()}-${file.originalFilename.replace(/\s+/g, '_')}`;
  const finalPath = path.join(uploadsDir, fileName);
  fs.writeFileSync(finalPath, data);

  return `/uploads/${fileName}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id) || isNaN(Number(id))) {
    return res.status(400).json({ message: 'ID produk tidak valid' });
  }

  try {
    switch (req.method) {
      case 'GET': {
        const [[produk], [detail]] = await Promise.all([
          pool.query<RowDataPacket[]>('SELECT * FROM katalog_produk WHERE id = ?', [id]),
          pool.query<RowDataPacket[]>('SELECT * FROM detail_produk WHERE produk_id = ?', [id])
        ]);

        if (!produk.length) {
          return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        return res.status(200).json({ ...produk[0], ...detail[0] });
      }

      case 'PUT': {
        const form = new IncomingForm({ multiples: true, keepExtensions: true });

        const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve([fields, files]);
          });
        });

        // FIXED: Properly parse harga from form data without corrupting it
        const rawHarga = fields.harga?.toString().trim();
        const harga = Number(rawHarga);

        if (isNaN(harga) || harga <= 0) {
          return res.status(400).json({ message: 'Harga produk tidak valid' });
        }

        const fotoUtama = files?.foto ? await saveFile(files.foto as File, 'produk') : fields.existing_foto;
        const foto1 = files?.foto_tambahan_1 ? await saveFile(files.foto_tambahan_1 as File, 'produk') : fields.existing_foto_tambahan_1;
        const foto2 = files?.foto_tambahan_2 ? await saveFile(files.foto_tambahan_2 as File, 'produk') : fields.existing_foto_tambahan_2;
        const foto3 = files?.foto_tambahan_3 ? await saveFile(files.foto_tambahan_3 as File, 'produk') : fields.existing_foto_tambahan_3;

        const [updateKatalog] = await pool.query<ResultSetHeader>(
          'UPDATE katalog_produk SET nama_produk = ?, harga = ?, kategori = ?, foto = ? WHERE id = ?',
          [fields.nama_produk, harga, fields.kategori, fotoUtama, id]
        );

        const [updateDetail] = await pool.query<ResultSetHeader>(
          'UPDATE detail_produk SET deskripsi_produk = ?, foto_tambahan_1 = ?, foto_tambahan_2 = ?, foto_tambahan_3 = ? WHERE produk_id = ?',
          [fields.deskripsi_produk, foto1, foto2, foto3, id]
        );

        if (updateKatalog.affectedRows === 0 && updateDetail.affectedRows === 0) {
          return res.status(404).json({ message: 'Tidak ada data yang diperbarui' });
        }

        return res.status(200).json({ message: 'Produk berhasil diperbarui' });
      }

      case 'DELETE': {
        const [result] = await pool.query<ResultSetHeader>(
          'DELETE FROM katalog_produk WHERE id = ?', [id]
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        return res.status(200).json({ message: 'Produk berhasil dihapus' });
      }

      default:
        return res.status(405).json({ message: 'Metode tidak diizinkan' });
    }
  } catch (error) {
    console.error('Error handler API:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
}
