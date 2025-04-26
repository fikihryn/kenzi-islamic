"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import CartModal from "@/app/components/cartmodal";
import NavbarDemo from "@/app/components/navbar";

// Tipe produk detail dari server
type ProductDetail = {
  id: number;
  nama_produk: string;
  harga: number;
  kategori: string;
  foto: string | null;
  deskripsi_produk: string;
  foto_tambahan_1: string | null;
  foto_tambahan_2: string | null;
  foto_tambahan_3: string | null;
};

// Tipe produk yang diminta oleh CartModal
type Product = {
  id: number;
  nama_produk: string;
  harga: number;
  kategori: string;
  foto?: string;
  deskripsi_produk: string;
  foto_tambahan_1?: string;
  foto_tambahan_2?: string;
  foto_tambahan_3?: string;
};

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const openCartModal = () => setCartModalOpen(true);
  const closeCartModal = () => setCartModalOpen(false);

  const goldColor = "#D9B67D";
  const goldColorLight = "#F5EEDD"; // Lighter version for backgrounds

  const getImageSrc = (img: string | null) => {
    if (!img) return "/default-image.jpg";
    return img.startsWith("/uploads/") ? img : `/uploads/${img}`;
  };

  const toCartProduct = (p: ProductDetail): Product => ({
    ...p,
    foto: p.foto ?? undefined,
    foto_tambahan_1: p.foto_tambahan_1 ?? undefined,
    foto_tambahan_2: p.foto_tambahan_2 ?? undefined,
    foto_tambahan_3: p.foto_tambahan_3 ?? undefined,
  });

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(`/api/productsbyid/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setActiveImage(data.foto); // Set main image
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product data:", err);
        setError("Failed to load product details.");
        setLoading(false);
      });
  }, [id]);

  if (!id) {
    return (
      <div className="font-poppins min-h-screen flex items-center justify-center">
        <p>Invalid product ID.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="font-poppins min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 rounded-full"
          style={{ borderColor: `${goldColor} transparent ${goldColor} ${goldColor}` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="font-poppins min-h-screen flex flex-col items-center justify-center text-center">
        <p className="text-red-500">{error || "Could not find product details."}</p>
        <button
          onClick={() => router.push("/catalog")}
          className="mt-4 px-4 py-2 rounded text-white hover:opacity-90"
          style={{ backgroundColor: goldColor }}
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const imageList = [
    product.foto,
    product.foto_tambahan_1,
    product.foto_tambahan_2,
    product.foto_tambahan_3,
  ].filter(Boolean);

  return (
    <div className="font-poppins bg-neutral-50">
      <NavbarDemo />

      <div className="min-h-screen pt-24 pb-16 px-4 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-4">
          <nav className="flex text-sm text-neutral-500">
            <button 
              onClick={() => router.push("/")}
              className="hover:opacity-80"
              style={{ color: goldColor }}
            >
              Home
            </button>
            <span className="mx-2">/</span>
            <button 
              onClick={() => router.push("/katalog")}
              className="hover:opacity-80"
              style={{ color: goldColor }}
            >
              Catalog
            </button>
            <span className="mx-2">/</span>
            <span className="text-neutral-800 font-medium truncate max-w-xs">
              {product.nama_produk}
            </span>
          </nav>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Gallery */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="aspect-square w-full relative bg-white rounded-2xl overflow-hidden shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                key={activeImage}
                src={getImageSrc(activeImage)}
                alt={product.nama_produk}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <div className="flex space-x-3 justify-center">
              {imageList.map((img, index) => (
                <motion.div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden h-30 w-40 transition-all duration-200 ${
                    activeImage === img 
                      ? "ring-2 ring-offset-2" 
                      : "opacity-70 hover:opacity-100"
                  }`}
                  style={{ 
                    boxShadow: activeImage === img 
                      ? `0 0 0 2px white, 0 0 0 4px ${goldColor}` 
                      : 'none' 
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setActiveImage(img!);
                    setSelectedThumbnail(index);
                  }}
                >
                  <img
                    src={getImageSrc(img!)}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <div 
                className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-4"
                style={{ backgroundColor: goldColorLight, color: goldColor }}
              >
                {product.kategori || "Uncategorized"}
              </div>
              
              <h1 className="text-3xl font-semibold text-neutral-800 mb-2">
                {product.nama_produk}
              </h1>
              
              <p className="text-2xl font-medium" style={{ color: goldColor }}>
                Rp {product.harga.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="border-t border-b border-neutral-200 py-6">
              <h2 className="text-lg font-medium mb-3">Description</h2>
              <div className="text-neutral-600 whitespace-pre-line leading-relaxed">
                {product.deskripsi_produk}
              </div>
            </div>

            <motion.button 
              onClick={openCartModal}
              className="w-full text-white py-4 px-6 rounded-full font-medium transition-all duration-300 flex items-center justify-center hover:opacity-90"
              style={{ backgroundColor: goldColor }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </motion.button>
          </motion.div>
        </div>

        <div className="mt-12">
          <button
            onClick={() => router.push("/katalog")}
            className="flex items-center hover:underline font-medium hover:opacity-80"
            style={{ color: goldColor }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Catalog
          </button>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal 
        isOpen={cartModalOpen} 
        onClose={closeCartModal} 
        product={toCartProduct(product)} 
      />
    </div>
  );
}