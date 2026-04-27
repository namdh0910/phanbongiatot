"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { API_BASE_URL } from "@/utils/api";
import './HeaderFooter.css';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { cartCount } = useCart();
  const settings = useSettings();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchSuggestions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products?limit=100`);
      if (res.ok) {
        const data = await res.json();
        const all = Array.isArray(data) ? data : data.products || [];
        const q = searchQuery.toLowerCase();
        const filtered = all.filter((p: any) => 
          p.name.toLowerCase().includes(q) || 
          (p.category && p.category.toLowerCase().includes(q))
        ).slice(0, 6);
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setMenuOpen(false);
      setShowSuggestions(false);
    }
  };

  if (pathname?.startsWith('/admin')) return null;

  const navLinks = [
    { href: "/danh-muc/phan-bon", label: "Phân bón" },
    { href: "/combo", label: "Combo tiết kiệm" },
    { href: "/danh-muc/phan-bon-la", label: "Phân bón lá" },
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
  const zaloId = process.env.NEXT_PUBLIC_ZALO_PHONE ?? "0773440966";

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
          <div className="container mx-auto px-4 py-4 flex items-center gap-8">
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-black text-[#1a5c2a] tracking-tighter">
                PhânBón<span className="text-[#f5a623]">GiáTốt</span>
              </div>
            </Link>

            {/* Search Bar Desktop */}
            <form onSubmit={handleSearch} className="flex-1 max-w-xl relative">
               <input 
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                 onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                 placeholder="Tìm kiếm sản phẩm, kỹ thuật sầu riêng, cà phê..."
                 className="w-full bg-gray-50 border-2 border-transparent focus:border-[#1a5c2a] rounded-full py-2.5 pl-5 pr-12 outline-none transition-all text-sm font-medium"
               />
               <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#1a5c2a] text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                 🔍
               </button>

               {/* Suggestions Dropdown */}
               {showSuggestions && suggestions.length > 0 && (
                 <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-2xl mt-2 py-3 z-[150] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-5 pb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-2">Gợi ý sản phẩm</div>
                    {suggestions.map((p) => (
                      <Link 
                        key={p._id} 
                        href={`/san-pham/${p.slug}`}
                        className="flex items-center gap-4 px-5 py-2.5 hover:bg-green-50 transition-colors group"
                        onClick={() => setShowSuggestions(false)}
                      >
                         <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-[#1a5c2a]">{p.name}</h4>
                            <p className="text-[#ee4d2d] font-black text-xs">{p.price.toLocaleString('vi-VN')}đ</p>
                         </div>
                         <span className="text-gray-300 group-hover:text-[#1a5c2a] transition-colors">➜</span>
                      </Link>
                    ))}
                    <button 
                      onClick={handleSearch}
                      className="w-full text-center py-2.5 text-xs font-bold text-gray-500 hover:text-[#1a5c2a] hover:bg-gray-50 transition-all border-t border-gray-50 mt-1"
                    >
                      Xem tất cả kết quả cho "{searchQuery}"
                    </button>
                 </div>
               )}
            </form>

            <a href={`tel:${hotline.replace(/\./g, '')}`} className="flex-shrink-0 flex items-center gap-3 bg-white border-2 border-[#1a5c2a] px-5 py-2 rounded-full hover:bg-green-50 transition-all shadow-sm group">
               <div className="w-8 h-8 bg-[#1a5c2a] text-white rounded-full flex items-center justify-center text-sm group-hover:scale-110 transition-transform">📞</div>
               <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">Hotline 24/7</span>
                  <span className="text-lg font-black text-gray-900 leading-none">{hotline}</span>
               </div>
            </a>
          </div>

          {/* Row 3: Nav Menu & Zalo */}
          <div className="border-t border-gray-100 py-3">
            <div className="container mx-auto px-4 flex items-center justify-between">
               <nav className="flex items-center gap-8">
                  <div className="group relative">
                     <button className={`flex items-center gap-2 font-black uppercase tracking-wide transition-colors ${pathname?.startsWith('/danh-muc') ? 'text-[#1a5c2a]' : 'text-gray-800 hover:text-[#1a5c2a]'}`}>
                        <span className="text-lg">☰</span> DANH MỤC
                     </button>
                     <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] border border-gray-100 mt-2">
                        {navLinks.slice(0, 4).map((l, i) => (
                           <Link 
                             key={i} 
                             href={l.href} 
                             className={`block px-6 py-3 hover:bg-green-50 font-bold transition-colors ${pathname === l.href ? 'text-[#1a5c2a] bg-green-50' : 'text-gray-700 hover:text-[#1a5c2a]'}`}
                           >
                             {l.label}
                           </Link>
                        ))}
                     </div>
                  </div>
                  {navLinks.slice(4).map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link 
                        key={i} 
                        href={link.href} 
                        className={`font-bold uppercase text-sm tracking-wide transition-all relative py-1 ${isActive ? 'text-[#1a5c2a]' : 'text-gray-600 hover:text-[#1a5c2a]'}`}
                      >
                        {link.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1a5c2a] rounded-full"></span>
                        )}
                      </Link>
                    );
                  })}
               </nav>

               <div className="flex items-center gap-4">
                  <a href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}`} target="_blank" className="bg-[#0068ff] text-white px-6 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg hover:bg-blue-600 transition-all active:scale-95">
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
        <div className="lg:hidden flex flex-col w-full bg-white">
          <div className="flex items-center justify-between gap-4 px-4 h-16 border-b border-gray-50">
            <Link href="/" className="flex-shrink-0">
              <div className="text-xl font-black text-[#1a5c2a] tracking-tighter">
                PB<span className="text-[#f5a623]">GT</span>
              </div>
            </Link>

            <form onSubmit={handleSearch} className="flex-1 relative">
               <input 
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onFocus={() => searchQuery.trim().length >= 2 && setShowSuggestions(true)}
                 onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                 placeholder="Tìm kiếm..."
                 className="w-full bg-gray-50 border border-gray-100 rounded-full py-2 pl-4 pr-10 outline-none text-xs"
               />
               <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-gray-400">
                 🔍
               </button>

               {/* Mobile Suggestions */}
               {showSuggestions && suggestions.length > 0 && (
                 <div className="absolute top-full left-0 w-screen -ml-12 bg-white shadow-2xl mt-2 py-2 z-[150] border-t border-gray-100 max-h-[60vh] overflow-y-auto">
                    {suggestions.map((p) => (
                      <Link 
                        key={p._id} 
                        href={`/san-pham/${p.slug}`}
                        className="flex items-center gap-3 px-4 py-3 border-b border-gray-50"
                        onClick={() => setShowSuggestions(false)}
                      >
                         <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-md flex-shrink-0" />
                         <div className="flex-1 min-w-0">
                            <h4 className="text-[13px] font-bold text-gray-900 truncate">{p.name}</h4>
                            <p className="text-[#ee4d2d] font-black text-[11px]">{p.price.toLocaleString('vi-VN')}đ</p>
                         </div>
                      </Link>
                    ))}
                    <button 
                      onClick={handleSearch}
                      className="w-full text-center py-3 text-xs font-bold text-[#1a5c2a] bg-green-50"
                    >
                      Xem tất cả "{searchQuery}"
                    </button>
                 </div>
               )}
            </form>

            <button 
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-gray-800 hover:text-[#1a5c2a] transition-colors"
              aria-label="Open Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>

          {/* MOBILE TRENDING TAGS ROW */}
          <div className="trending-mobile-wrapper bg-gray-50/50 py-2 px-4 relative overflow-hidden border-b border-gray-100">
            <div className="trending-mobile-scroll">
              <span className="text-[9px] font-black text-gray-400 mr-1 flex-shrink-0">HOT:</span>
              {trending.map((t, i) => (
                <Link key={i} href={t.href} className="trending-chip">
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-IN MENU */}
      <div 
        className={`fixed inset-0 z-[100] transition-all duration-300 ${menuOpen ? 'visible' : 'invisible'}`}
        aria-hidden={!menuOpen}
      >
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-[80%] bg-white shadow-2xl transition-transform duration-300 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {menuOpen && (
            <div className="flex flex-col h-full">
              {/* Header in Menu */}
              <div className="p-5 border-b flex justify-between items-center bg-gray-50">
                <span className="font-black text-[#1a5c2a]">DANH MỤC</span>
                <button onClick={() => setMenuOpen(false)} className="w-10 h-10 flex items-center justify-center text-gray-400 text-2xl">✕</button>
              </div>

              {/* Seller Link Mobile */}
              <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
                <Link 
                  href="/kenh-nguoi-ban" 
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-orange-200 shadow-sm"
                >
                  <span className="text-xl">🏪</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-orange-600 leading-none">KÊNH NGƯỜI BÁN</span>
                    <span className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">Dành cho đối tác nhà vườn</span>
                  </div>
                  <span className="ml-auto text-orange-400">➜</span>
                </Link>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto py-2">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link 
                      key={i} 
                      href={link.href} 
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center px-6 py-4 border-b border-gray-50 font-bold text-[15px] uppercase tracking-wide transition-colors ${isActive ? 'text-[#1a5c2a] bg-green-50' : 'text-gray-800 hover:bg-gray-50'}`}
                      style={{ minHeight: '52px' }}
                    >
                      {link.label}
                      {isActive && <span className="ml-auto text-xl">➜</span>}
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Actions */}
              <div className="p-6 border-t bg-gray-50">
                <a 
                  href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}`} 
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
          )}
        </div>
      </div>
    </div>
  );
}
