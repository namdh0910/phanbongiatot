"use client";
import { usePathname } from "next/navigation";

export default function StickyCTA() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/kenh-nguoi-ban')) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-[999] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-stretch h-[calc(56px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]">
      <a 
        href="https://zalo.me/0773440966" 
        target="_blank"
        rel="noopener noreferrer"
        className="w-[70%] bg-[#0068FF] text-white flex items-center justify-center gap-2 text-[15px] font-semibold transition-opacity active:opacity-90"
      >
        <span className="text-xl">💬</span> Zalo tư vấn ngay
      </a>
      <a 
        href="tel:0773440966" 
        className="w-[30%] bg-[#2d7a2d] text-white flex items-center justify-center gap-2 text-[15px] font-semibold transition-opacity active:opacity-90"
      >
        <span className="text-xl">📞</span> Gọi
      </a>
    </div>
  );
}
