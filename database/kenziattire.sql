-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2025 at 12:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kenziattire`
--

-- --------------------------------------------------------

--
-- Table structure for table `akun`
--

CREATE TABLE `akun` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `akun`
--

INSERT INTO `akun` (`id`, `name`, `email`, `password`) VALUES
(1, 'Fiki Haryono', 'fazadafiki@gmail.com', '$2a$10$x5SipFfO8atJORQyv.QPP.zixUC2R/R0ZyBjiN4DfhXpOkecGujdG'),
(2, 'Egi Haryono', 'egiharyono@gmail.com', '$2a$10$KqM665Jf4SRDEvBz76VZHO31Zwn2S2D8xzOpxdj79kCjCgyXtYowq'),
(3, 'Lipot', 'lipot@gmail.com', '$2a$10$6vvYmlUps8GTgAG0Xicsz.9Y/KaWksMwSDUYRXLghZ65TIqMov65K'),
(4, 'Zaky', 'zaky@gmail.com', '$2a$10$CLTjgzfZEJJzm4LfmSpi7uxC.qIWqil7n7Ri9fF5pFrmo5h00IWU6'),
(5, 'Markonah ', 'marko111@gmail.com', '$2a$10$txsIbGbZTi3hWDJVttwRiuseMS0wtpuvYKdozSEdv0cBYSKmV8c3e'),
(6, 'asep bensin', 'asepbensin@gmail.com', '$2a$10$MQMyliXbrGzHLz2fMyadl.ydzbDZuxdk1bFYT0sqeOClm7cwf7F.m'),
(7, 'antony', 'gaotantony@gmail.com', '$2a$10$3MDS4nm341ckmfe3T4IZr.vZoXot4C611t5ShYWG3JmnNYfxKalV.'),
(8, 'cristiano', 'ronaldo@gmail.com', '$2a$10$Z0GWC7mvLYa/eDaIxY8B9.9bHQTJPG9bb0uNvoy2KJ3UVmlege05a'),
(9, 'Ujang Kedu', 'ujangkedu@gmail.com', '$2b$10$.e7SkuJDgDVtDB56J908r.QsqYO.L4MCUW2ywZuNxsUMuQ19ix5.C'),
(10, 'Toto Kopyor', 'totokopyor@gmail.com', '$2b$10$WrissJq07rBToLXE4LRUJeeVEIRY99An/86jQP8dp2DfnwNpK/TYS'),
(11, 'Andi Lesmana', 'andilesmana@gmail.com', '$2b$10$BAbj.3eSUmYAp4G3DGyRRe.al9X6b6rUWDlWejh76Dsi.uhUDSycS');

-- --------------------------------------------------------

--
-- Table structure for table `detail_produk`
--

CREATE TABLE `detail_produk` (
  `id` int(11) NOT NULL,
  `produk_id` int(11) NOT NULL,
  `deskripsi_produk` text NOT NULL,
  `foto_tambahan_1` varchar(255) DEFAULT NULL,
  `foto_tambahan_2` varchar(255) DEFAULT NULL,
  `foto_tambahan_3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_produk`
--

INSERT INTO `detail_produk` (`id`, `produk_id`, `deskripsi_produk`, `foto_tambahan_1`, `foto_tambahan_2`, `foto_tambahan_3`) VALUES
(7, 15, 'Bahan : Katun Mikro\r\nUkuran : Dewasa\r\nWarna : Putih\r\nRenda : Rajut 3cm Putih', 'uploads/1732363221967.jpg', 'uploads/1732363221998.jpg', 'uploads/1732363222001.jpg'),
(8, 16, 'Mukena ini terbuat dari bahan Armany Silk bermotif yang lembut dan nyaman dipakai. Dirancang khusus untuk ukuran dewasa, mukena ini hadir dalam warna lavender yang elegan dan menenangkan. Bagian tepi mukena dilengkapi dengan renda berkualitas yang memberikan sentuhan manis, serta dilengkapi dengan resleting berukuran 6 cm yang praktis dan memudahkan penggunaan.', 'uploads/1732717469659.jpg', 'uploads/1732717469678.jpg', 'uploads/1732717469709.jpg'),
(9, 17, 'Mukena Mikro Polos - Hitam, dengan harga IDR 50.000, terbuat dari bahan katun mikro polos. Mukena ini memiliki ukuran dewasa dan warna hitam, serta dilengkapi dengan renda rajut berukuran 3cm berwarna Milo.', 'uploads/1732454322765.jpg', 'uploads/1732454322782.jpg', 'uploads/1732454322801.jpg'),
(10, 18, 'ini hanyalah sebuah sample jadi saya tidak tau mau ngisi apa ', 'uploads/1732426397996.jpg', 'uploads/1732426398003.jpg', 'uploads/1732426398012.jpg'),
(11, 19, 'ini hanyalah sebuah sample jadi saya tidak tau mau ngisi apa ', 'uploads/1732426441438.jpg', 'uploads/1732426441442.jpg', 'uploads/1732426441447.jpg'),
(12, 20, 'ini hanyalah sebuah sample jadi saya tidak tau mau ngisi apa ', 'uploads/1732426481055.jpg', 'uploads/1732426481060.jpg', 'uploads/1732426481067.jpg'),
(22, 30, 'Mukena Armany Jacquard merupakan mukena eksklusif berbahan Armany Jacquard yang lembut, adem, dan elegan, sehingga sangat nyaman digunakan untuk beribadah. Mukena ini berukuran dewasa dan dilengkapi dengan detail renda yang mempercantik tampilan, yaitu renda stretch pada lingkar badan dan kalung, serta renda Giper selebar 1,3 cm pada list badan dan lingkar bawah. Tersedia dalam satu seri yang terdiri dari delapan pilihan warna cantik, Mukena Armany Jacquard siap menemani ibadah Anda dengan sentuhan keanggunan dan kenyamanan maksimal.\r\n\r\n', '/uploads/1745661598711-armanyjacquard2.JPG', '/uploads/1745661598726-armanyjacquard3.JPG', '/uploads/1745661598739-armanyjacquard4.JPG'),
(23, 31, 'Nikmati kenyamanan beribadah dengan Mukena 2in1 Katun Mikro Motif. Terbuat dari bahan katun mikro bermotif yang super ringan, adem, dan nyaman, mukena ini siap menemani setiap sujud Anda dengan kesan anggun dan praktis. Didesain khusus untuk ukuran dewasa, Mukena 2in1 ini dilengkapi dengan renda rajut selebar 3 cm yang mempercantik keseluruhan tampilan. Hadir dalam 1 seri 5 warna dengan motif yang beragam dan eksklusif (sesuai ketersediaan stok), Mukena 2in1 Katun Mikro Motif menjadi pilihan sempurna untuk Anda yang mengutamakan kenyamanan tanpa mengorbankan gaya.', '/uploads/1745661761486-katunmikro2.JPG', '/uploads/1745661761498-katunmikro3.JPG', '/uploads/1745661761512-katunmikro4.JPG'),
(24, 32, 'Tampil cantik dan nyaman saat beribadah dengan Mukena Terusan Mikro Motif. Dibuat dari bahan katun mikro bermotif yang ringan, adem, dan jatuh sempurna saat dipakai, mukena ini memberikan kenyamanan maksimal di setiap momen ibadah Anda. Dengan desain terusan berukuran dewasa, mukena ini dihiasi renda Giper selebar 4 cm yang mewah dan menambah kesan elegan. Tersedia dalam 1 seri 5 warna dengan pilihan motif menarik (menyesuaikan stok), Mukena Terusan Mikro Motif adalah pilihan tepat untuk Anda yang menginginkan mukena praktis, modis, dan tetap nyaman.', '/uploads/1745661834909-terusanmikro2.JPG', '/uploads/1745661834919-terusanmikro3.JPG', '/uploads/1745661834929-terusanmikro4.JPG');

-- --------------------------------------------------------

--
-- Table structure for table `katalog_produk`
--

CREATE TABLE `katalog_produk` (
  `id` int(11) NOT NULL,
  `nama_produk` varchar(255) NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `kategori` varchar(255) NOT NULL,
  `foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `katalog_produk`
--

INSERT INTO `katalog_produk` (`id`, `nama_produk`, `harga`, `kategori`, `foto`) VALUES
(15, 'Mukena Terusan Mikro - Putih', 55000.00, 'Dewasa', 'uploads/1732363221949.jpg'),
(16, 'Mukena Armany Motif', 150000.00, 'Dewasa', 'uploads/1732717469632.jpg'),
(17, 'Mukena Mikro Polos - Hitam', 50000.00, 'Dewasa', 'uploads/1732454322738.jpg'),
(18, 'Mukena Sample 1', 100000.00, 'Dewasa', 'uploads/1732426397986.jpg'),
(19, 'Mukena Sample 2', 80000.00, 'Dewasa', 'uploads/1732426441431.jpg'),
(20, 'Mukena Sample 3', 75000.00, 'Dewasa', 'uploads/1732426481048.jpg'),
(30, 'Armany Jacquard', 150000.00, 'Dewasa', '/uploads/1745661598693-armanyjacquard1.JPG'),
(31, 'Katun Mikro Motif', 70000.00, 'Dewasa', '/uploads/1745661761469-katunmikro1.JPG'),
(32, 'Terusan Mikro Motif', 70000.00, 'Dewasa', '/uploads/1745661834895-terusanmikro1.JPG');

-- --------------------------------------------------------

--
-- Table structure for table `keranjang`
--

CREATE TABLE `keranjang` (
  `id` int(11) NOT NULL,
  `akun_id` int(11) NOT NULL,
  `produk_id` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `keranjang`
--

INSERT INTO `keranjang` (`id`, `akun_id`, `produk_id`, `jumlah`) VALUES
(5, 3, 15, 1),
(9, 5, 16, 1),
(22, 9, 20, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `akun`
--
ALTER TABLE `akun`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `detail_produk`
--
ALTER TABLE `detail_produk`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_produk` (`produk_id`);

--
-- Indexes for table `katalog_produk`
--
ALTER TABLE `katalog_produk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `akun_id` (`akun_id`),
  ADD KEY `produk_id` (`produk_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `akun`
--
ALTER TABLE `akun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `detail_produk`
--
ALTER TABLE `detail_produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `katalog_produk`
--
ALTER TABLE `katalog_produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_produk`
--
ALTER TABLE `detail_produk`
  ADD CONSTRAINT `fk_produk` FOREIGN KEY (`produk_id`) REFERENCES `katalog_produk` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD CONSTRAINT `keranjang_ibfk_1` FOREIGN KEY (`akun_id`) REFERENCES `akun` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `keranjang_ibfk_2` FOREIGN KEY (`produk_id`) REFERENCES `katalog_produk` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
