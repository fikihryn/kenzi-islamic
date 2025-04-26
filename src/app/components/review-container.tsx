"use client";
import React, { useState, useEffect } from "react";
import { ContainerScroll } from "@/app/components/ui/container-scroll-animation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function HeroScrollDemo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/Review1.png",
    "/Review2.png",
    "/Review3.png"
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  // Framer Motion variants
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  // Keep track of slide direction
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);

  // Update both page and direction when changing slides
  const paginate = (newDirection: number) => {
    const newIndex = (currentImageIndex + newDirection + images.length) % images.length;
    setCurrentImageIndex(newIndex);
    setPage([newIndex, newDirection]);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black">
              Apa kata mereka? <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Review Pelanggan
              </span>
            </h1>
          </>
        }
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          {/* Slider container */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {/* Images with Framer Motion */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentImageIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute top-0 left-0 w-full h-full"
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={`Customer review ${currentImageIndex + 1}`}
                  fill
                  sizes="100vw"
                  quality={100}
                  className="object-contain rounded-2xl"
                  draggable={false}
                  priority={true}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons */}
            <button 
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-10"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 z-10"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const direction = index > currentImageIndex ? 1 : -1;
                    setCurrentImageIndex(index);
                    setPage([index, direction]);
                  }}
                  className={`w-3 h-3 rounded-full ${
                    currentImageIndex === index ? "bg-white" : "bg-white bg-opacity-50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}