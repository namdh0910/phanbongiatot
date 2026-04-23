"use client";
import { useState } from "react";

export default function ProductGallery({ images, name, discount }: { images: string[], name: string, discount: number }) {
  const [activeImg, setActiveImg] = useState(0);
  
  const allImages = images.length > 0 ? images : [];
  const hasImages = allImages.length > 0;
  const currentSrc = allImages[activeImg];
  const isUrl = currentSrc && (currentSrc.startsWith("http") || currentSrc.startsWith("/"));

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="aspect-square relative bg-white border border-gray-100 rounded-sm overflow-hidden group">
        {hasImages && isUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={currentSrc} 
            alt={name} 
            className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col items-center justify-center gap-4 p-8">
            <div className="text-8xl opacity-30 drop-shadow-sm">🌿</div>
            <p className="font-bold text-green-800/30 text-xl text-center leading-tight">{name}</p>
          </div>
        )}
        
        {discount > 0 && (
          <div className="absolute top-0 right-0 bg-[#fce015] text-[#ee4d2d] font-bold px-2 py-1 flex flex-col items-center justify-center text-xs w-10 z-10 shadow-sm">
            <span>{discount}%</span>
            <span className="text-[10px] uppercase font-black">Giảm</span>
            <div className="absolute -bottom-1 left-0 w-full h-1 border-t-4 border-l-4 border-r-4 border-transparent border-t-[#fce015] border-l-[#fce015] border-r-[#fce015]"></div>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((img, i) => {
            const thumbUrl = img && (img.startsWith("http") || img.startsWith("/"));
            return (
              <div 
                key={i} 
                onClick={() => setActiveImg(i)}
                className={`w-20 h-20 flex-shrink-0 border-2 cursor-pointer transition-all rounded-sm overflow-hidden ${activeImg === i ? 'border-[#ee4d2d]' : 'border-transparent hover:border-[#ee4d2d]/50'}`}
              >
                {thumbUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-2xl">🌿</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
