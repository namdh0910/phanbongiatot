"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function StickyCTA() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <div className={`lg:hidden fixed bottom-0 left-0 w-full z-[200] px-4 pb-6 pt-4 bg-gradient-to-t from-white via-white/95 to-transparent transition-all duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full opacity-0'}`}>
      <div className="flex gap-3 max-w-lg mx-auto">
        <a 
          href="https://zalo.me/0773440966" 
          className="flex-[2] bg-[#0068FF] text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-2xl shadow-blue-300 active:scale-95 transition-transform"
        >
          <span className="text-xl">💬</span> ZALO TƯ VẤN
        </a>
        <a 
          href="tel:0773440966" 
          className="flex-1 bg-[#1a5c2a] text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-2xl shadow-emerald-300 active:scale-95 transition-transform"
        >
          <span className="text-xl">📞</span> GỌI
        </a>
      </div>
    </div>
  );
}
