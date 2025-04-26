import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // ganti jika kamu pakai password di MariaDB
  database: 'kenziattire',
});

export default pool.promise(); // biar bisa pakai async/await
