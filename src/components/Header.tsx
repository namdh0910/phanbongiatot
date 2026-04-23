"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith('/admin')) return null;
  const { cartCount } = useCart();
  const settings = useSettings();

  const navLinks = [
    { href: "/danh-muc/phan-bon", label: "Phân bón" },
    { href: "/danh-muc/thuoc-tru-sau", label: "Thuốc trừ sâu" },
    { href: "/danh-muc/kich-re", label: "Kích rễ" },
    { href: "/danh-muc/tuyen-trung", label: "Tuyến trùng" },
    { href: "/blog", label: "Kiến thức" },
    { href: "/ve-chung-toi", label: "Về chúng tôi" },
    { href: "/lien-he", label: "Liên hệ" },
  ];

  return (
    <div className="w-full">
      {/* Announcement Bar */}
      {settings.announcementEnabled && (
        <div className="bg-[#ee4d2d] text-white py-1.5 px-4 text-center text-[11px] md:text-xs font-bold uppercase tracking-widest animate-pulse">
           {settings.announcementText}
        </div>
      )}
      
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black text-primary tracking-tighter flex-shrink-0">
          PhânBón<span className="text-yellow-500">GiáTốt</span>
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-xs mx-6 relative">
           <input 
             type="text" 
             placeholder="Tìm kiếm..." 
             className="w-full bg-gray-100 border border-gray-200 rounded-full px-5 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all text-gray-900"
           />
           <button className="absolute right-3 top-2 text-gray-400 font-bold">🔍</button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-gray-900 hover:text-primary transition-colors font-bold text-sm whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Link href="/gio-hang" className="relative p-2 text-gray-900 hover:text-primary transition-colors mr-2">
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ee4d2d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
          <a href={`https://zalo.me/${settings.zaloId}`} target="_blank" className="flex items-center gap-2 text-blue-600 border border-blue-200 bg-blue-50 px-3 py-2 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors">
            💬 Zalo
          </a>
          <a href={`tel:${settings.hotline}`} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary-hover transition-all shadow-md">
            📞 {settings.phone || settings.hotline}
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-2">
          <Link href="/gio-hang" className="relative p-2 text-gray-900 hover:text-primary transition-colors">
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ee4d2d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 text-gray-900 hover:text-primary transition-colors">
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                className="py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl font-medium transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
              <a href={`https://zalo.me/${settings.zaloId}`} target="_blank" className="flex-1 text-center bg-blue-50 text-blue-700 py-3 rounded-xl font-bold">💬 Zalo</a>
              <a href={`tel:${settings.hotline}`} className="flex-1 text-center bg-primary text-white py-3 rounded-xl font-bold">📞 Gọi Ngay</a>
            </div>
          </nav>
        </div>
      )}
    </header>
    </div>
  );
}
