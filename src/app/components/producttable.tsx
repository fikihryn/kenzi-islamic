"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface Product {
  id: number;
  nama_produk: string;
  harga: number;
  kategori: string;
  foto: string;
  deskripsi_produk?: string;
  foto_tambahan_1?: string;
  foto_tambahan_2?: string;
  foto_tambahan_3?: string;
}

interface ProductDisplayProps {
  products: Product[];
  isLoading?: boolean; // Added isLoading prop as optional
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ModernProductDisplay({
  products,
  isLoading = false, // Default to false
  onEdit,
  onDelete
}: ProductDisplayProps) {
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleExpand = (productId: number) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  // Display loading state
  if (isLoading) {
    return (
      <div className="w-full py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
        </div>
        <p className="text-center text-gray-500 mt-4">Memuat produk...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            {/* Product Image with Hover Effect */}
            <div className="relative h-56 bg-gray-100 overflow-hidden group">
              {product.foto ? (
                <Image
                  src={product.foto.startsWith("/uploads") ? product.foto : `/${product.foto}`}
                  alt={product.nama_produk}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-black">
                  Tidak ada gambar
                </div>
              )}
              
              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                  {product.kategori}
                </span>
              </div>
              
              {/* Product ID badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-white/80 text-black text-xs font-medium px-2.5 py-1.5 rounded-full shadow-sm">
                  ID: {product.id}
                </span>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-black line-clamp-1">{product.nama_produk}</h3>
              <p className="text-black font-bold text-xl mb-4">{formatPrice(product.harga)}</p>
              
              {/* Action buttons with improved styling */}
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(product);
                  }}
                  className="flex items-center justify-center gap-1 bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-lg text-sm transition flex-1 shadow-sm"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(product);
                  }}
                  className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition flex-1 shadow-sm"
                >
                  <Trash2 size={16} />
                  Hapus
                </button>
              </div>
              
              {/* View Details Button */}
              <button
                onClick={() => toggleExpand(product.id)}
                className="flex items-center justify-center w-full gap-1 mt-3 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                {expandedProductId === product.id ? (
                  <>
                    Sembunyikan Detail <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Lihat Detail <ChevronDown size={16} />
                  </>
                )}
              </button>
            </div>
            
            {/* Expanded details with animation */}
            {expandedProductId === product.id && (
              <div className="border-t border-gray-200 p-5 bg-gray-50 animate-fadeIn">
                <h4 className="font-medium text-sm text-black mb-2">Detail Produk</h4>
                
                {/* Description */}
                <p className="text-black text-sm mb-4">
                  {product.deskripsi_produk || "Tidak ada deskripsi"}
                </p>
                
                {/* Additional photos with improved gallery */}
                {[product.foto_tambahan_1, product.foto_tambahan_2, product.foto_tambahan_3].some(Boolean) && (
                  <div className="mt-4">
                    <h4 className="font-medium text-sm text-black mb-2">Foto Tambahan</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[product.foto_tambahan_1, product.foto_tambahan_2, product.foto_tambahan_3]
                        .filter(Boolean)
                        .map((foto, index) => (
                          <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-white border hover:opacity-90 transition cursor-pointer">
                            <Image
                              src={foto?.startsWith("/uploads") ? foto : `/${foto}`}
                              alt={`${product.nama_produk} - ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Empty state if no products */}
      {products.length === 0 && !isLoading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center text-black">
          Tidak ada produk untuk ditampilkan
        </div>
      )}
    </div>
  );
}