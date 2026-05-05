"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const settings = useSettings();

  if (pathname?.startsWith('/admin')) return null;

  const navItems = [
    { label: "Trang chủ", icon: "🏠", href: "/" },
    { label: "Giải pháp", icon: "🩺", href: "/giai-phap" },
    { label: "Kiến thức", icon: "📖", href: "/blog" },
    { 
      label: "Zalo", 
      icon: "💬", 
      href: `https://zalo.me/${settings?.zalo || '0773440966'}?text=${typeof window !== 'undefined' ? encodeURIComponent('Tôi cần tư vấn về: ' + document.title) : ''}`, 
      isExternal: true 
    },
    { label: "Gọi điện", icon: "📞", href: `tel:${(settings?.phone || '0773440966').replace(/\./g, '')}`, isExternal: true },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-[100] px-2 pb-safe-area-inset-bottom shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center h-[64px] max-w-md mx-auto">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href;
          const Content = (
            <div className={`flex flex-col items-center justify-center gap-1 w-full min-h-[48px] min-w-[48px] relative ${isActive ? 'text-[#1b5e20]' : 'text-gray-600'}`}>
              <span className="text-xl">{item.icon}</span>
              <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-90'}`}>{item.label}</span>
            </div>
          );

          if (item.isExternal) {
            return (
              <a key={i} href={item.href} target="_blank" className="flex-1 flex items-center justify-center min-h-[48px]">
                {Content}
              </a>
            );
          }

          return (
            <Link key={i} href={item.href} className="flex-1 flex items-center justify-center min-h-[48px]">
              {Content}
            </Link>
          );
        })}
      </div>
    </div>

  );
}

