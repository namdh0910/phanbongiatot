"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const settings = useSettings();

  if (pathname?.startsWith('/admin')) return null;

  const navItems = [
    { label: "Trang chủ", icon: "🏠", href: "/" },
    { label: "Danh mục", icon: "📦", href: "/danh-muc/phan-bon" },
    { label: "Giỏ hàng", icon: "🛒", href: "/gio-hang", badge: cartCount },
    { label: "Zalo", icon: "💬", href: `https://zalo.me/${settings?.zaloId || '0773440966'}`, isExternal: true },
    { label: "Tài khoản", icon: "👤", href: "/kenh-nguoi-ban/dang-nhap" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-2 pb-safe-area-inset-bottom shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center h-16 max-w-md mx-auto">
        {navItems.map((item, i) => {
          const isActive = pathname === item.href;
          const Content = (
            <div className={`flex flex-col items-center justify-center gap-1 w-full relative ${isActive ? 'text-[#ee4d2d]' : 'text-gray-500'}`}>
              <span className="text-xl">{item.icon}</span>
              <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-80'}`}>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 right-1/4 bg-[#ee4d2d] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {item.badge}
                </span>
              )}
            </div>
          );

          if (item.isExternal) {
            return (
              <a key={i} href={item.href} target="_blank" className="flex-1 py-1">
                {Content}
              </a>
            );
          }

          return (
            <Link key={i} href={item.href} className="flex-1 py-1">
              {Content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
