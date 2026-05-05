import { usePathname } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";

export default function StickyCTA() {
  const pathname = usePathname();
  const settings = useSettings();

  const hotline = settings?.hotline || "0773.440.966";
  const zalo = settings?.zalo || "0773440966";
  const zaloUrl = `https://zalo.me/${zalo.replace(/\./g, '')}`;
  const callUrl = `tel:${hotline.replace(/\./g, '')}`;

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/kenh-nguoi-ban')) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-[999] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex items-stretch h-[calc(64px+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] border-t border-gray-100">
      <a 
        href={zaloUrl} 
        target="_blank"
        rel="noopener noreferrer"
        className="w-[70%] bg-[#0068FF] text-white flex items-center justify-center gap-3 text-[16px] font-black transition-all active:scale-95"
      >
        <span className="text-2xl animate-bounce">💬</span> Nhắn Zalo tư vấn
      </a>
      <a 
        href={callUrl} 
        className="w-[30%] bg-[#1a5c2a] text-white flex items-center justify-center gap-2 text-[16px] font-black transition-all active:scale-95 border-l border-white/10"
      >
        <span className="text-2xl">📞</span> Gọi
      </a>
    </div>
  );
}
