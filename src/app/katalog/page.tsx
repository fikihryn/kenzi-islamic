'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarDemo from "@/app/components/navbar";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye, ArrowUpRight, ChevronRight, Star, Search, Instagram, Mail, Phone, ShoppingBag } from "lucide-react";

type Product = {
  id: number;
  nama_produk: string;
  harga: number;
  foto: string;
  kategori: string;
  diskon?: boolean;
};

// Data mockup untuk bagian Featured
const featuredProducts = [
  {
    id: 1,
    nama_produk: "Armany Jacquard",
    harga: 150000,
    rating: 5,
    foto: "/armanyjacquard1.jpg",
    deskripsi: "Mukena premium dengan bahan halus dan nyaman untuk beribadah"
  },
  {
    id: 2,
    nama_produk: "Armany Motif",
    harga: 150000,
    rating: 5,
    foto: "/MukenaArmany1.jpg",
    deskripsi: "Mukena dengan bordir mewah dan bahan Armany silk yang adem"
  },
  {
    id: 3,
    nama_produk: "Katun Mikro Motif",
    harga: 750000,
    rating: 5,
    foto: "/katunmikro1.jpg",
    deskripsi: "Mukena berbahan katun yang lembut dan tidak menerawang"
  }
];

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#222] text-gray-300 px-6 py-12 md:py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand & Description */}
        <div>
          <h2 className="text-xl font-bold text-white">Kenzi Islamic Attire</h2>
          <p className="mt-2 text-sm">
            Tampil anggun dan nyaman dengan mukena dan busana muslimah terbaik. Temukan koleksi pilihan kami.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Beranda</a></li>
            <li><a href="/katalog" className="hover:text-white">Katalog</a></li>
            <li><a href="/review" className="hover:text-white">Review</a></li>
            <li><a href="/kontak" className="hover:text-white">Kontak</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Hubungi Kami</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={18} /> kenzi.attire@email.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +62 812 3456 7890
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={18} /> <a href="https://instagram.com/kenzi.attire" target="_blank" className="hover:text-white">kenzi.attire</a>
            </li>
            <li className="flex items-center gap-2">
              <ShoppingBag size={18} /> <a href="https://shopee.co.id/kenziattire" target="_blank" className="hover:text-white">Shopee</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600 mt-12 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Kenzi Islamic Attire. All rights reserved.
      </div>
    </footer>
  );
};

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [filter, setFilter] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Warna aksen emas sesuai permintaan
  const accentColor = "#D9B67D";

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Modify data to add diskon property to only a few products (3 products)
        const productsWithDiscount = data.map((product: Product, index: number) => ({
          ...product,
          diskon: index < 3 // Only first 3 products will have discount
        }));
        setProducts(productsWithDiscount);
        setFilteredProducts(productsWithDiscount);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Gagal memuat produk.");
        setLoading(false);
      });
  }, []);

  // Apply search and category filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery.trim() !== "") {
      result = result.filter(product => 
        product.nama_produk.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filter !== "semua") {
      if (filter === "diskon") {
        result = result.filter(product => product.diskon);
      } else {
        result = result.filter(product => {
          // Map the filter to the appropriate category value
          let categoryValue = filter;
          if (filter === "premium") categoryValue = "Premium";
          if (filter === "klasik") categoryValue = "Klasik";
          if (filter === "modern") categoryValue = "Modern";
          
          return product.kategori === categoryValue;
        });
      }
    }
    
    setFilteredProducts(result);
  }, [searchQuery, filter, products]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Check if user is searching or filtering
  const isSearching = searchQuery.trim() !== "" || filter !== "semua";

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleProductClick = (productId: number) => {
    router.push(`/ProductDetail/${productId}`);
  };

  // Variasi animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Filter kategori dalam bahasa Indonesia
  const categories = ["semua", "premium", "klasik", "modern", "diskon"];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavbarDemo />
      
      <div className="flex-grow">
        {/* Header section dengan background putih sama seperti yang lain */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="pt-32 pb-16 px-4 bg-white"
        >
          <div className="container mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4"
            >
              Koleksi <span style={{ color: accentColor }}>Mukena</span> Eksklusif
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-6"
            >
              Desain elegan dengan bahan premium untuk kenyamanan beribadah Anda
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <button 
                style={{ backgroundColor: accentColor }} 
                className="px-6 py-3 rounded-full font-medium text-black flex items-center gap-2 mx-auto hover:shadow-lg transition-all duration-300"
              >
                Lihat Koleksi <ChevronRight size={16} />
              </button>
            </motion.div>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 pb-16">
          {/* Search dan filter bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10"
          >
            <div className="relative w-full md:w-auto md:min-w-64">
              <input
                type="text"
                placeholder="Cari mukena..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-black focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-yellow-400 text-black"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    filter === category
                      ? "text-black border-black bg-white shadow-md"
                      : "text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Bagian produk unggulan - hanya tampil jika tidak sedang mencari/memfilter */}
          {!isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-black">Produk Unggulan</h2>
                <a className="flex items-center gap-1 font-medium" style={{ color: accentColor }} href="#">
                  Lihat semua <ChevronRight size={16} />
                </a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <motion.div
                    key={`featured-${product.id}`}
                    whileHover={{ y: -5 }}
                    className="relative group overflow-hidden rounded-2xl shadow-lg"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img 
                        src={product.foto} 
                        alt={product.nama_produk}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{product.nama_produk}</h3>
                      <p className="text-sm text-white/80 mb-2">{product.deskripsi}</p>
                      <div className="flex items-center gap-1 mb-3">
                        {Array(5).fill(0).map((_, idx) => (
                          <Star key={idx} size={16} fill={accentColor} color={accentColor} />
                        ))}
                        <span className="text-white/80 text-sm ml-2">5.0</span>
                      </div>
                      <p className="font-semibold text-lg mb-4" style={{ color: accentColor }}>
                        Rp {product.harga.toLocaleString("id-ID")}
                      </p>
                      <button 
                        className="w-full py-2 rounded-full flex items-center justify-center gap-2 text-black transition-all duration-300"
                        style={{ backgroundColor: accentColor }}
                      >
                        Lihat Detail <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Loading state dengan animasi */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          )}
          
          {/* Pesan error */}
          {error && (
            <div className="border-l-4 border-red-500 p-4 rounded shadow-md mx-auto max-w-md bg-red-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Bagian produk utama dengan judul */}
          <div className="mb-8">
            {isSearching ? (
              <>
                <h2 className="text-2xl font-bold text-black mb-6">
                  {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : "Hasil Filter"}
                </h2>
                {filteredProducts.length > 0 ? (
                  <p className="text-gray-600">Menampilkan {filteredProducts.length} produk</p>
                ) : (
                  <p className="text-gray-600">Tidak ada produk yang sesuai dengan kriteria pencarian</p>
                )}
              </>
            ) : (
              <h2 className="text-2xl font-bold text-black mb-6">Semua Produk</h2>
            )}
          </div>

          {/* Grid produk dengan animasi bertahap */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={productVariants}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative overflow-hidden">
                  {/* Gambar produk dengan efek hover */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={product.foto || "/placeholder.jpg"}
                      alt={product.nama_produk}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Tombol aksi cepat - MODIFIED to show by default (removed opacity-0 group-hover:opacity-100) */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 z-20">
                      <button 
                        className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Heart size={18} className="text-black" />
                      </button>
                      <button 
                        style={{ backgroundColor: accentColor }} 
                        className="rounded-full p-2 shadow-md hover:opacity-90" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ShoppingCart size={18} className="text-black" />
                      </button>
                    </div>
                    
                    {/* Modified overlay - now excludes the heart and cart icons area */}
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ backgroundColor: accentColor }}
                        className="text-black font-medium py-3 px-6 rounded-full flex items-center gap-2 transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-md z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product.id);
                        }}
                      >
                        <Eye size={18} /> Lihat Detail
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Label Mukena */}
                  <div className="absolute top-4 left-4 z-20">
                    <span 
                      style={{ backgroundColor: accentColor }} 
                      className="text-black text-xs font-medium px-3 py-1 rounded-full shadow-md"
                    >
                      {product.kategori || "Mukena"}
                    </span>
                  </div>
                </div>
                
                {/* Bagian informasi produk */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-black mb-2 truncate">
                    {product.nama_produk}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={14} 
                        fill={star <= 4 ? accentColor : "transparent"} 
                        color={star <= 4 ? accentColor : "gray"} 
                      />
                    ))}
                    <span className="text-gray-600 text-xs ml-1">4.0</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-black font-bold text-lg">
                        Rp {product.harga.toLocaleString("id-ID")}
                      </p>
                      {/* Only show discount price for products with diskon property */}
                      {product.diskon && (
                        <p className="text-gray-500 text-sm line-through">
                          Rp {Math.round(product.harga * 1.2).toLocaleString("id-ID")}
                        </p>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ color: accentColor }}
                      className="hover:text-black"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product.id);
                      }}
                    >
                      <ArrowUpRight size={22} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Status kosong */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-black">Tidak ada produk ditemukan</h3>
              <p className="text-gray-500 mt-2">
                {searchQuery 
                  ? `Tidak ada produk yang sesuai dengan pencarian "${searchQuery}"`
                  : "Coba ubah filter atau periksa kembali nanti."}
              </p>
            </div>
          )}
          
          {/* Bagian langganan newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-24 bg-gray-50 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 w-48 h-48 opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M47.5,-57.2C59,-47.8,64.4,-30.9,68.2,-13.2C72,4.5,74.2,23,67.1,37.1C60.1,51.2,43.9,60.9,26.8,65.3C9.7,69.7,-8.3,68.9,-24.4,62.9C-40.5,56.9,-54.7,45.7,-63.3,30.9C-71.9,16.1,-74.9,-2.3,-70.4,-19.1C-65.9,-35.9,-53.8,-51,-39.2,-60.1C-24.6,-69.2,-7.5,-72.3,7.9,-71.3C23.4,-70.2,36.1,-66.7,47.5,-57.2Z" transform="translate(100 100)" />
              </svg>
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
                Berlangganan Newsletter Kami
              </h3>
              <p className="text-gray-600 mb-6">
                Dapatkan informasi terbaru tentang produk baru, penawaran eksklusif, dan koleksi yang akan datang.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Alamat email Anda"
                  className="flex-grow rounded-full px-5 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
                />
                <button 
                  style={{ backgroundColor: accentColor }} 
                  className="px-6 py-3 rounded-full font-medium text-black flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                >
                  Berlangganan <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer integrated at the bottom */}
      <Footer />
    </div>
  );
}