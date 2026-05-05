"use client";
import { useState } from 'react';
import Image from 'next/image';

interface LiteYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
}

export default function LiteYouTube({ videoId, title, className = "" }: LiteYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Fallback thumbnail if maxresdefault doesn't exist
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div 
      className={`relative aspect-video bg-gray-900 rounded-2xl md:rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-2xl ${className}`}
      onClick={() => setIsLoaded(true)}
    >
      {!isLoaded ? (
        <>
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <p className="text-white text-xs md:text-sm font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Nhấn để xem video kỹ thuật</p>
          </div>
          {/* Overlay to catch clicks */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
        </>
      ) : (
        <iframe 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
