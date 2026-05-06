'use client';

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
  isHot?: boolean;
}

export default function ProductGallery({ images, name, isHot }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0] || '/og-image.png');

  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-3 md:gap-4 items-start">
      {/* Main Image - Full width on mobile */}
      <div className="w-full aspect-square max-h-[360px] md:max-h-none rounded-2xl md:rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group relative">
        <img 
          src={activeImage} 
          alt={name} 
          className="w-full h-full object-contain p-1 md:p-6 group-hover:scale-105 transition-transform duration-700" 
        />
        {isHot && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse shadow-lg">
            HOT
          </div>
        )}
      </div>

      {/* Thumbnails - Horizontal slider on mobile, grid on desktop */}
      {images && images.length > 1 && (
        <div className="w-full flex flex-row md:grid md:grid-cols-4 gap-2 md:gap-4 overflow-x-auto md:overflow-visible scrollbar-hide pb-2 md:pb-0">
          {images.map((img: string, i: number) => (
            <div 
              key={i} 
              onClick={() => setActiveImage(img)}
              className={`w-16 h-16 md:w-full md:aspect-square flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden border transition-all cursor-pointer ${
                activeImage === img ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-gray-100 bg-gray-50 hover:border-emerald-300'
              }`}
            >
              <img src={img} alt={`${name} ${i}`} className="w-full h-full object-cover p-1 md:p-2" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
