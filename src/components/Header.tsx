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
        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex container mx-auto px-4 h-24 items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0">
            <div className="text-3xl font-black text-[#1a5c2a] tracking-tighter">
              PhânBón<span className="text-[#f5a623]">GiáTốt</span>
            </div>
          </Link>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="header-search-container">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const val = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
                  if (val.trim()) window.location.href = `/tim-kiem?q=${encodeURIComponent(val.trim())}`;
                }}
                className="relative"
              >
                <input 
                  name="q"
                  type="text" 
                  placeholder="Hôm nay anh/chị cần tìm phân bón gì?" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1a5c2a]/20 focus:border-[#1a5c2a] transition-all text-gray-900 pr-12"
                />
                <button type="submit" className="absolute right-4 top-3 text-gray-400 hover:text-[#1a5c2a]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
              </form>
              <div className="trending-tags">
                <span>Xu hướng:</span>
                {trending.map((t, i) => (
                  <Link key={i} href={t.href}>{t.label}</Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center header-right-action">
            <div className="hotline-box">
              <div className="hotline-icon">📞</div>
              <div className="hotline-info">
                <span className="hotline-label">Hotline 24/7</span>
                <span className="hotline-number">{hotline}</span>
              </div>
            </div>

            <a href={`https://zalo.me/${zaloId}`} target="_blank" className="header-zalo-btn" title="Chat Zalo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M12 7c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z"/></svg>
            </a>

            <Link href="/gio-hang" className="relative p-2 text-gray-800 hover:text-[#1a5c2a] transition-colors">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ee4d2d] text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* MOBILE HEADER */}
        <div className="lg:hidden container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left: Hotline */}
          <a href={`tel:${hotline.replace(/\./g, '')}`} className="flex items-center gap-1 text-[13px] font-bold text-[#1a5c2a] bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
            <span>📞</span> {hotline}
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
