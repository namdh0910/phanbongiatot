"use client";
import { usePathname, useParams } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import { useEffect, useState } from "react";
import { trackEvent } from "@/utils/analytics";
import { MessageCircle, Phone } from "lucide-react";

export default function StickyCTA() {
  const pathname = usePathname();
  const params = useParams();
  const settings = useSettings();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof document !== 'undefined' && document.title) {
        const title = document.title.split('|')[0].trim();
        setPageTitle(title);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [pathname, params]);

  const hotline = settings?.hotline || "0339.50.50.50";
  const zalo = settings?.zalo || "0339505050";
  
  const message = pageTitle 
    ? `Chào Kỹ sư PBGT, tôi đang xem về "${pageTitle}" và cần tư vấn giải pháp phục hồi cho vườn của mình.`
    : `Chào Kỹ sư PBGT, tôi cần tư vấn kỹ thuật phục hồi vườn cho cây trồng của mình.`;
  
  const zaloUrl = `https://zalo.me/${zalo.replace(/\./g, '')}?text=${encodeURIComponent(message)}`;
  const callUrl = `tel:${hotline.replace(/\./g, '')}`;

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/kenh-nguoi-ban')) return null;

  return (
    <div className="fixed bottom-10 right-10 z-[500] flex flex-col gap-4 animate-in fade-in slide-in-from-right-10 duration-700">
      {/* Zalo Floating Button */}
      <a 
        href={zaloUrl} 
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('zalo_click', { title: pageTitle, position: 'desktop_sticky' })}
        className="group relative flex items-center justify-end"
      >
        <span className="mr-3 bg-white text-[#0068FF] px-4 py-2 rounded-xl text-sm font-black shadow-xl opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 border border-blue-50">
          Nhắn Zalo Kỹ Sư
        </span>
        <div className="w-16 h-16 bg-[#0068FF] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,104,255,0.5)] hover:scale-110 transition-all active:scale-95 animate-bounce" style={{ animationDuration: '3s' }}>
          <MessageCircle size={32} />
        </div>
      </a>

      {/* Hotline Floating Button */}
      <a 
        href={callUrl} 
        onClick={() => trackEvent('call_click', { title: pageTitle, position: 'desktop_sticky' })}
        className="group relative flex items-center justify-end"
      >
        <span className="mr-3 bg-white text-[#ee4d2d] px-4 py-2 rounded-xl text-sm font-black shadow-xl opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 border border-red-50">
          Gọi Kỹ Sư: {hotline}
        </span>
        <div className="w-16 h-16 bg-[#ee4d2d] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(238,77,45,0.5)] hover:scale-110 transition-all active:scale-95">
          <Phone size={32} />
        </div>
      </a>
    </div>
  );
}
