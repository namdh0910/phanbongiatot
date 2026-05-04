"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

interface ProductStickyCTAProps {
  product: any;
}

export default function ProductStickyCTA({ product }: ProductStickyCTAProps) {
  const [show, setShow] = useState(false);
  const { addToCart } = useCart();

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
        <img src={product.images?.[0]} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-gray-900 truncate">{product.name}</h4>
        <p className="text-[#ee4d2d] font-black text-sm">₫{product.price?.toLocaleString()}</p>
      </div>
      <button 
        onClick={() => addToCart(product, 1)}
        className="bg-[#ee4d2d] text-white px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider shadow-lg shadow-red-100 active:scale-95 transition-transform"
      >
        MUA NGAY
      </button>
    </div>
  );
}
