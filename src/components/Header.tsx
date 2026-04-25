"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import './HeaderFooter.css';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const settings = useSettings();

  if (pathname?.startsWith('/admin')) return null;

  const navLinks = [
    { href: "/danh-muc/phan-bon", label: "Phân bón" },
    { href: "/combo", label: "Combo tiết kiệm" },
    { href: "/danh-muc/thuoc-tru-sau", label: "Thuốc trừ sâu" },
    { href: "/danh-muc/kich-re", label: "Kích rễ" },
    { href: "/danh-muc/tuyen-trung", label: "Tuyến trùng" },
    { href: "/blog", label: "Kiến thức" },
    { href: "/ve-chung-toi", label: "Về chúng tôi" },
    { href: "/lien-he", label: "Liên hệ" },
  ];

  const trending = [
    { label: "Sầu riêng", href: "/tim-kiem?q=sau+rieng" },
    { label: "Cà phê", href: "/tim-kiem?q=ca+phe" },
    { label: "Kích rễ", href: "/tim-kiem?q=kich+re" },
    { label: "Tuyến trùng", href: "/tim-kiem?q=tuyen+trung" }
  ];

  const hotline = settings?.hotline || "0773.440.966";
  const zaloId = settings?.zaloId || "0773440966";

  return (
    <div className="w-full">
      {/* Announcement Bar */}
      {settings?.announcementEnabled && (
        <div className="bg-[#1a5c2a] text-white py-2 px-4 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest">
           {settings.announcementText}
        </div>
      )}
      
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
        {/* DESKTOP HEADER (3 ROWS) */}
        <div className="hidden lg:block">
          {/* Row 1: Trending Tags */}
          <div className="bg-gray-50 border-b border-gray-100 py-2">
            <div className="container mx-auto px-4 flex justify-center gap-6 text-[11px] font-bold uppercase tracking-wider text-gray-500">
               <span className="text-gray-400">Xu hướng:</span>
               {trending.map((t, i) => (
                 <Link key={i} href={t.href} className="hover:text-[#1a5c2a] transition-colors">{t.label}</Link>
               ))}
            </div>
          </div>

          {/* Row 2: Logo | Hotline | Logo */}
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-black text-[#1a5c2a] tracking-tighter">
                PhânBón<span className="text-[#f5a623]">GiáTốt</span>
              </div>
            </Link>

            <a href="tel:0773440966" className="flex items-center gap-3 bg-white border-2 border-[#1a5c2a] px-6 py-2 rounded-full hover:bg-green-50 transition-all shadow-sm group">
               <div className="w-8 h-8 bg-[#1a5c2a] text-white rounded-full flex items-center justify-center text-sm group-hover:scale-110 transition-transform">📞</div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">Hotline 24/7</span>
                  <span className="text-lg font-black text-gray-900 leading-none">0773.440.966</span>
               </div>
            </a>

            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-black text-[#1a5c2a] tracking-tighter opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                PhânBón<span className="text-[#f5a623]">GiáTốt</span>
              </div>
            </Link>
          </div>

          {/* Row 3: Nav Menu & Zalo */}
          <div className="border-t border-gray-100 py-3">
            <div className="container mx-auto px-4 flex items-center justify-between">
               <nav className="flex items-center gap-8">
                  <div className="group relative">
                     <button className="flex items-center gap-2 font-black text-gray-800 uppercase tracking-wide hover:text-[#1a5c2a]">
                        <span className="text-lg">☰</span> DANH MỤC
                     </button>
                     <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] border border-gray-100 mt-2">
                        {navLinks.slice(0, 4).map((l, i) => (
                           <Link key={i} href={l.href} className="block px-6 py-3 hover:bg-green-50 font-bold text-gray-700 hover:text-[#1a5c2a]">{l.label}</Link>
                        ))}
                     </div>
                  </div>
                  {navLinks.slice(4).map((link, i) => (
                    <Link key={i} href={link.href} className="font-bold text-gray-600 hover:text-[#1a5c2a] uppercase text-sm tracking-wide">
                      {link.label}
                    </Link>
                  ))}
               </nav>

               <div className="flex items-center gap-4">
                  <a href="https://zalo.me/0773440966" target="_blank" className="bg-[#0068ff] text-white px-6 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg hover:bg-blue-600 transition-all active:scale-95">
                     💬 CHAT ZALO NGAY
                  </a>
                  <Link href="/gio-hang" className="relative p-2 text-gray-800 hover:text-[#1a5c2a] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#ee4d2d] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 border-2 border-white">
                        {cartCount}
                      </span>
                    )}
                  </Link>
               </div>
            </div>
          </div>
        </div>

        {/* MOBILE HEADER */}
        <div className="lg:hidden container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left: Hotline */}
          <a href="tel:0773440966" className="flex items-center gap-1 text-[13px] font-bold text-[#1a5c2a] bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
            <span>📞</span> 0773.440.966
          </a>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <div className="text-xl font-black text-[#1a5c2a] tracking-tighter">
              PhânBón<span className="text-[#f5a623]">GiáTốt</span>
            </div>
          </Link>

          {/* Right: Hamburger */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="w-11 h-11 flex items-center justify-center text-gray-800 hover:text-[#1a5c2a] transition-colors"
            aria-label="Open Menu"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </header>

      {/* MOBILE SLIDE-IN MENU */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${menuOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-[80%] bg-white shadow-2xl transition-transform duration-300 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header in Menu */}
            <div className="p-5 border-b flex justify-between items-center bg-gray-50">
              <span className="font-black text-[#1a5c2a]">DANH MỤC</span>
              <button onClick={() => setMenuOpen(false)} className="w-10 h-10 flex items-center justify-center text-gray-400 text-2xl">✕</button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-2">
              {navLinks.map((link, i) => (
                <Link 
                  key={i} 
                  href={link.href} 
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-6 py-4 text-gray-800 hover:bg-gray-50 border-b border-gray-50 font-bold text-[15px] uppercase tracking-wide"
                  style={{ minHeight: '52px' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-6 border-t bg-gray-50">
              <a 
                href={`https://zalo.me/${zaloId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#0068ff] text-white py-4 rounded-xl font-black text-center block shadow-lg active:scale-95 transition-transform"
              >
                💬 CHAT ZALO NGAY
              </a>
              <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-widest">
                Kỹ sư hỗ trợ 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
