"use client";
import { usePathname, useParams } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import pathologies from "@/data/pathologies.json";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function StickyCTA() {
  const pathname = usePathname();
  const params = useParams();
  const settings = useSettings();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    if (pathname?.includes('/giai-phap/') && params?.slug) {
      const p = (pathologies as any[]).find(item => item.slug === params.slug);
      if (p) setPageTitle(p.title);
    } else if (pathname?.includes('/blog/') || pathname?.includes('/san-pham/')) {
      // Zero-latency optimization: Read directly from document title
      const timer = setTimeout(() => {
        if (document.title) {
          const title = document.title.split('|')[0].trim();
          setPageTitle(title);
        }
      }, 500); // Wait for Next.js to update the document.title
      return () => clearTimeout(timer);
    }
  }, [pathname, params]);

  const hotline = settings?.hotline || "0773.440.966";
  const zalo = settings?.zalo || "0773440966";
  
  const message = pageTitle 
    ? `Chào kỹ sư, tôi vừa xem video về cách chữa ${pageTitle} và muốn nhận phác đồ cho vườn ở [Tỉnh của tôi] của tôi`
    : `Chào kỹ sư, tôi cần tư vấn kỹ thuật phục hồi vườn cho vườn ở [Tỉnh của tôi] của tôi.`;
  
  const zaloUrl = `https://zalo.me/${zalo.replace(/\./g, '')}?text=${encodeURIComponent(message)}`;
  const callUrl = `tel:${hotline.replace(/\./g, '')}`;

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/kenh-nguoi-ban')) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-[1000] bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex items-stretch h-[calc(64px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] border-t border-gray-100">
      <a 
        href={zaloUrl} 
        target="_blank"
        rel="noopener noreferrer"
        className="w-[70%] bg-[#0068FF] text-white flex items-center justify-center gap-3 text-[16px] font-black transition-all active:scale-95"
      >
        <span className="text-2xl animate-bounce" style={{ animationDuration: '2s' }}>💬</span> Nhắn Zalo tư vấn
      </a>
      <a 
        href={callUrl} 
        className="w-[30%] bg-[#ee4d2d] text-white flex items-center justify-center gap-2 text-[16px] font-black transition-all active:scale-95 border-l border-white/10"
      >
        <span className="text-2xl">📞</span> Gọi
      </a>
    </div>
  );
}
