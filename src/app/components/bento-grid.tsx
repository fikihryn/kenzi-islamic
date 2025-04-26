"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

// Create a card component with enhanced shadow effects while maintaining layout
function WhiteCard({ 
  containerClassName, 
  children, 
  href = "#" 
}: { 
  containerClassName: string; 
  children: React.ReactNode; 
  href?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href={href}
      className={`group relative overflow-hidden rounded-3xl transition-all duration-500 border border-black ${containerClassName} ${
        isHovered ? 'bg-black text-white' : 'bg-white text-gray-800'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered 
          ? '0 10px 30px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
          : 'none' // Removed shadow when not hovered
      }}
    >
      {/* Card content with subtle scale effect */}
      <div 
        className={`relative h-full w-full p-6 md:p-8 transition-all duration-500 ${
          isHovered 
            ? 'scale-[1.01] translate-y-1' 
            : ''
        }`}
      >
        {children}
      </div>
      
      {/* Call to action indicator */}
      <div 
        className={`absolute bottom-6 right-6 flex items-center gap-2 ${
          isHovered ? 'text-white' : 'text-gray-700'
        } transform transition-all duration-500 ${
          isHovered 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-4 opacity-0'
        }`}
      >
        <span className="text-sm font-medium">View More</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </div>
    </Link>
  );
}

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      
      {/* First Card - Catalog */}
      <WhiteCard 
        containerClassName="col-span-1 lg:col-span-2 h-full min-h-[500px] lg:min-h-[300px]"
        href="/katalog"
      >
        {/* Content Layer */}
        <div className="relative z-10 max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] group-hover:text-white">
            Cek Katalog Kita
          </h2>
          <p className="mt-4 text-left text-base/6 group-hover:text-white text-gray-600">
            tertarik dengan koleksi barang kami?
            cek bagian katalog ini untuk melihat produk
          </p>
        </div>
      </WhiteCard>

      {/* Second Card */}
      <WhiteCard 
        containerClassName="col-span-1 min-h-[300px]"
        href="/sale"
      >
        <div className="relative z-10">
          <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] group-hover:text-white">
            Special Sale
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 group-hover:text-white text-gray-600">
            Dapatkan potongan harga spesial di momen tertentu!
          </p>
        </div>
      </WhiteCard>

      {/* Third Card */}
      <WhiteCard 
        containerClassName="col-span-1 lg:col-span-3 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] relative"
        href="/new-products"
      >
        <div className="relative z-10 max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] group-hover:text-white">
            Cek
            Produk Terbaru
            Kami
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 group-hover:text-white text-gray-600">
            Update dan lihat produk terbaru kami jangan sampai ketinggalan
          </p>
        </div>

        {/* Image container that moves to vertical center only when hovered */}
        <div className="absolute bottom-10 right-10 z-10 transition-all duration-700 ease-in-out group-hover:bottom-1/2 group-hover:transform group-hover:translate-y-1/2">
          {/* Row container - maintains row layout */}
          <div className="flex flex-row items-center justify-end gap-3 group-hover:gap-4">
            
            {/* Image 1 - Size transform on hover */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-md transition-all duration-700 ease-out group-hover:w-36 group-hover:h-36 md:group-hover:w-40 md:group-hover:h-40 group-hover:shadow-lg">
              <Image
                src="/model1.jpg"
                fill
                alt="product image 1"
                className="object-cover transition-all duration-700 ease-in-out
                filter grayscale opacity-60 group-hover:filter-none group-hover:opacity-100"
              />
            </div>
            
            {/* Image 2 - Size transform on hover */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-md transition-all duration-700 ease-out group-hover:w-36 group-hover:h-36 md:group-hover:w-40 md:group-hover:h-40 group-hover:shadow-lg">
              <Image
                src="/model2.jpg"
                fill
                alt="product image 2"
                className="object-cover transition-all duration-700 ease-in-out
                filter grayscale opacity-60 group-hover:filter-none group-hover:opacity-100"
              />
            </div>
            
            {/* Image 3 - Size transform on hover */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-md transition-all duration-700 ease-out group-hover:w-36 group-hover:h-36 md:group-hover:w-40 md:group-hover:h-40 group-hover:shadow-lg">
              <Image
                src="/model3.jpg"
                fill
                alt="product image 3"
                className="object-cover transition-all duration-700 ease-in-out
                filter grayscale opacity-60 group-hover:filter-none group-hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </WhiteCard>
    </div>
  );
}