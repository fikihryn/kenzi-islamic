# Katalog Produk - Kenzi Islamic Attire (Next.js Version)

Proyek ini adalah katalog produk berbasis web untuk UMKM **Kenzi Islamic Attire** menggunakan **Next.js** dan **MariaDB/MySQL**.

## Fitur
- Menampilkan katalog produk
- Halaman detail produk
- Sistem admin untuk menambah, mengedit, dan menghapus produk (belum implementasi, tapi bisa ditambahkan)
- Koneksi ke database MariaDB/MySQL untuk manajemen produk

## Teknologi yang Digunakan
- **Frontend**: Next.js (React), Tailwind CSS
- **Backend**: API Routes Next.js
- **Database**: MariaDB/MySQL (dengan XAMPP)

## Cara Menjalankan Proyek

### 1. **Clone repositori ini**
   Clone repositori ke komputer lokal kamu dengan perintah berikut:
   ```bash
   git clone https://github.com/username/katalog-produk.git
   cd katalog-produk
   ```

### 2. **Install dependencies**
   Setelah berhasil meng-clone repositori, instal semua dependensi yang dibutuhkan:
   ```bash
   npm install
   ```

### 3. **Setup Database**
   1. **Pastikan XAMPP aktif** dan jalankan Apache serta MySQL.
   2. **Buka phpMyAdmin** melalui `http://localhost/phpmyadmin/`.
   3. **Buat database baru** dengan nama `kenziattire`.
   4. **Import database** dengan file `.sql`:
      - Pilih database `kenziattire` yang baru dibuat.
      - Klik **Import** ➔ Pilih file `database/kenziattire.sql`.
      - Klik **Go** untuk mengimpor.

### 4. **Konfigurasi Lingkungan (Environment Variables)**
   Buat file `.env.local` di root folder proyek dan isi dengan konfigurasi database berikut:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=  # Kosongkan jika tidak ada password pada XAMPP
   DB_NAME=kenziattire
   ```

   > Pastikan konfigurasi sesuai dengan pengaturan MySQL di XAMPP kamu.

### 5. **Jalankan Proyek**
   Jalankan proyek dengan perintah berikut:
   ```bash
   npm run dev
   ```
   Buka browser dan akses aplikasi di `http://localhost:3000`.


## Struktur Proyek

- `/src/app`: Routing halaman menggunakan Next.js (Next.js 14+ app router).
- `/src/components`: Folder komponen UI (misal: Card Produk, Header, Footer).
- `/src/lib`: File koneksi ke database, misal `db.ts` atau `mysql.ts`.
- `/src/api`: API routes untuk menangani request seperti GET, POST, PUT, DELETE produk.
- `/public`: Asset publik, seperti gambar produk.
- `/database`: File SQL untuk setup database (`kenziattire.sql`).
- `.gitignore`: File untuk mengabaikan file yang tidak perlu di Git (misal: file `.env.local`).

## Catatan

- Pastikan untuk **tidak meng-upload** file `.env.local` ke GitHub. Sudah ada di file `.gitignore` agar Git mengabaikan file tersebut.
- Sesuaikan dengan konfigurasi **koneksi database** di file `.env.local` dan pastikan database berjalan di XAMPP.

## Penggunaan API

### 1. **Menambahkan Produk** (POST)
   - Endpoint: `/api/products`
   - Body (JSON):
     ```json
     {
       "nama_produk": "Produk A",
       "harga": 150000,
       "deskripsi": "Deskripsi produk A",
       "foto": "url_gambar"
     }
     ```

### 2. **Mengambil Daftar Produk** (GET)
   - Endpoint: `/api/products`
   - Response (JSON):
     ```json
     [
       {
         "id": 1,
         "nama_produk": "Produk A",
         "harga": 150000,
         "deskripsi": "Deskripsi produk A",
         "foto": "url_gambar"
       },
       ...
     ]
     ```

### 3. **Mengupdate Produk** (PUT)
   - Endpoint: `/api/products/[id]`
   - Body (JSON):
     ```json
     {
       "nama_produk": "Produk A Update",
       "harga": 200000,
       "deskripsi": "Deskripsi produk A setelah update",
       "foto": "url_gambar_baru"
     }
     ```

### 4. **Menghapus Produk** (DELETE)
   - Endpoint: `/api/products/[id]`
   - Response: Status 200 jika berhasil.

## Kontribusi

Jika kamu ingin berkontribusi pada proyek ini, silakan fork repositori dan ajukan **pull request**. Semua kontribusi sangat dihargai!





