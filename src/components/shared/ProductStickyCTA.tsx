"use client";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { getImageUrl } from "@/utils/image";

interface ProductStickyCTAProps {
  product: any;
}

export default function ProductStickyCTA({ product }: ProductStickyCTAProps) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-3 z-[90] flex items-center gap-3 animate-in slide-in-from-bottom duration-300 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
        <img src={getImageUrl(product.images?.[0])} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-gray-900 truncate">{product.name}</h4>
        <p className="text-[#ee4d2d] font-black text-sm">₫{product.price?.toLocaleString()}</p>
      </div>
      <div className="flex items-center gap-2">
        <a 
          href={`https://zalo.me/${(product.zalo || '0773440966').replace(/\./g, '')}`}
          target="_blank"
          className="bg-[#0068ff] text-white px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider shadow-lg shadow-blue-100 active:scale-95 transition-all animate-pulse flex items-center gap-1.5"
        >
          💬 ZALO
        </a>
        <a 
          href={`tel:${(product.hotline || '0773.440.966').replace(/\./g, '')}`}
          className="bg-[#ee4d2d] text-white w-10 h-10 rounded-xl shadow-lg shadow-red-100 active:scale-95 transition-all flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>
      </div>
    </div>
  );
}
