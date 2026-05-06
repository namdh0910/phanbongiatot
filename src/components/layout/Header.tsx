"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";
import { API_BASE_URL } from "@/utils/api";
import { Menu, X, ChevronRight, Phone, MessageCircle, Info, BookOpen } from "lucide-react";
import './HeaderFooter.css';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ products: any[], blogs: any[] }>({ products: [], blogs: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCrops, setExpandedCrops] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const settings = useSettings();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const history = localStorage.getItem("search_history");
    if (history) setSearchHistory(JSON.parse(history));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSearchFocused(false);
      }
    };

    if (isMenuOpen || isSearchFocused) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isSearchFocused]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        fetchSuggestions();
      } else {
        setSuggestions({ products: [], blogs: [] });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchSuggestions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(searchQuery.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setSuggestions({
          products: (data.products || []).slice(0, 5),
          blogs: (data.blogs || []).slice(0, 3)
        });
        setShowSuggestions((data.products?.length > 0) || (data.blogs?.length > 0));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = (e?: React.FormEvent, query?: string) => {
    if (e) e.preventDefault();
    const finalQuery = query || searchQuery;
    if (finalQuery.trim()) {
      // Save to history
      const newHistory = [finalQuery.trim(), ...searchHistory.filter(h => h !== finalQuery.trim())].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem("search_history", JSON.stringify(newHistory));
      
      router.push(`/tim-kiem?q=${encodeURIComponent(finalQuery.trim())}`);
      setIsSearchFocused(false);
      setShowSuggestions(false);
    }
  };

  if (pathname?.startsWith('/admin')) return null;

  const crops = [
    { 
      name: "Sầu Riêng", 
      icon: "🌳",
      slug: "sau-rieng",
      issues: [
        { label: "Vàng lá thối rễ", href: "/giai-phap/vang-la-thoi-re" },
        { label: "Tuyến trùng", href: "/giai-phap/sau-rieng-vang-la-tuyen-trung" },
        { label: "Rụng trái non", href: "/giai-phap/sau-rieng-rung-trai" },
        { label: "Xử lý ra hoa", href: "/danh-muc/sau+rieng+ra+hoa" },
      ]
    },
    { 
      name: "Cà Phê", 
      icon: "☕",
      slug: "ca-phe",
      issues: [
        { label: "Vàng lá mùa khô", href: "/danh-muc/ca+phe+vang+la" },
        { label: "Rễ yếu còi cọc", href: "/giai-phap/phuc-hoi-ca-phe" },
        { label: "Rỉ sắt - Nấm hồng", href: "/danh-muc/ca+phe+nam+hong" },
      ]
    },
    { 
      name: "Hồ Tiêu", 
      icon: "🌿",
      slug: "ho-tieu",
      issues: [
        { label: "Chết nhanh - Chết chậm", href: "/giai-phap/phuc-hoi-ho-tieu" },
        { label: "Tuyến trùng rễ", href: "/giai-phap/tuyen-trung-ho-tieu" },
      ]
    }
  ];

  const trends = ["Sầu riêng", "Cà phê", "Kích rễ", "Tuyến trùng", "Phân bón lá"];
  const hotline = settings?.hotline || "0773.440.966";

  return (
    <div className="w-full sticky top-0 z-[100] bg-white shadow-sm pt-[env(safe-area-inset-top)]">
      {/* Announcement Bar */}
      {settings?.announcementEnabled && !isSearchFocused && (
        <div className="bg-[#1a5c2a] text-white py-2 px-4 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest">
           {settings.announcementText}
        </div>
      )}
      
      <header className="w-full bg-white">
        {/* DESKTOP HEADER */}
        <div className="hidden lg:block border-b border-gray-100">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-8">
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-black text-[#1a5c2a] tracking-tighter">
                PhânBón<span className="text-[#f5a623]">GiáTốt</span>
              </div>
            </Link>

            {/* Search Bar Desktop */}
            <form onSubmit={(e) => handleSearch(e)} className="flex-1 max-w-lg relative">
               <input 
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Tìm kiếm giải pháp, sản phẩm..."
                 className="w-full bg-gray-50 border-2 border-transparent focus:border-[#1a5c2a] rounded-full py-2 pl-5 pr-12 outline-none transition-all text-sm font-medium"
               />
               <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#1a5c2a] text-white rounded-full flex items-center justify-center">
                 🔍
               </button>
            </form>

            <div className="flex items-center gap-6">
              <a href={`tel:${hotline.replace(/\./g, '')}`} className="flex items-center gap-2 group">
                 <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">📞</div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase text-gray-500">Hotline 24/7</span>
                    <span className="text-base font-black text-gray-900">{hotline}</span>
                 </div>
              </a>
              <a href="https://zalo.me/0773440966" target="_blank" className="bg-[#0068ff] text-white px-6 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all">
                💬 TƯ VẤN ZALO
              </a>
            </div>
          </div>

          {/* Main Nav Desktop */}
          <div className="border-t border-gray-100 py-3 bg-white">
            <div className="container mx-auto px-4">
              <nav className="flex items-center gap-10">
                {crops.map((crop, i) => (
                  <div key={i} className="group relative">
                    <button className="flex items-center gap-1.5 font-black text-sm uppercase tracking-wide text-gray-700 hover:text-emerald-700 transition-colors py-2">
                      <span className="text-lg">{crop.icon}</span> {crop.name} <span className="text-[10px] opacity-30 group-hover:rotate-180 transition-transform">▼</span>
                    </button>
                    <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[150] border border-gray-100 mt-1">
                       <div className="mb-3 pb-2 border-b border-gray-50">
                         <h4 className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-3">Vấn đề phổ biến</h4>
                         <div className="space-y-1">
                            {crop.issues.map((issue, idx) => (
                              <Link key={idx} href={issue.href} className="block text-[13px] font-bold text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all">
                                · {issue.label}
                              </Link>
                            ))}
                         </div>
                       </div>
                       <Link href={`/danh-muc/${crop.slug}`} className="block text-[11px] font-black text-orange-600 uppercase tracking-widest hover:translate-x-1 transition-transform px-3">
                         Sản phẩm cho {crop.name} →
                       </Link>
                    </div>
                  </div>
                ))}
                <Link href="/san-pham" className={`font-black text-sm uppercase tracking-wide transition-colors ${isActive('/san-pham') ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-700'}`}>Sản Phẩm</Link>
                <Link href="/blog" className={`font-black text-sm uppercase tracking-wide transition-colors ${isActive('/blog') ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-700'}`}>Kiến Thức</Link>
                <Link href="/ve-chung-toi" className={`font-black text-sm uppercase tracking-wide transition-colors ${isActive('/ve-chung-toi') ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-700'}`}>Về chúng tôi</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* MOBILE HEADER - BRAND FIRST DESIGN */}
        <div className="lg:hidden">
          <div className="flex items-center gap-3 px-3 h-[48px] bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white shadow-md relative z-[200]">
            <button 
              onClick={() => setIsMenuOpen(true)}
              aria-label="Mở menu"
              className="flex-shrink-0 flex flex-col items-center justify-center w-10 h-10 bg-white/10 rounded-lg active:scale-95 transition-transform"
            >
              <Menu size={20} />
              <span className="text-[7px] font-black uppercase mt-0.5 tracking-tighter leading-none">Menu</span>
            </button>
 
            <Link href="/" className="flex-shrink-0 active:scale-95 transition-transform">
               <div className="px-2 h-10 bg-white rounded-xl flex items-center justify-center text-[#1B5E20] font-black text-lg shadow-inner border border-white/20 whitespace-nowrap">PBGT</div>
            </Link>
    
            <div className="flex-1 relative">
              <div 
                onClick={() => setIsSearchFocused(true)}
                className="w-full bg-white/10 backdrop-blur-md rounded-lg py-1.5 px-3 border border-white/15 text-white/90 text-[11px] font-medium flex items-center gap-1.5"
              >
                <span className="opacity-50 text-sm">🔍</span>
                <span className="truncate opacity-80">Tìm...</span>
              </div>
            </div>
          </div>

          {/* QUICK CATEGORY SCROLLBAR - Context Aware */}
          {pathname !== '/' && (
            <div className="bg-white border-b border-gray-100 py-2.5 overflow-x-auto scrollbar-hide flex items-center gap-2 px-3 shadow-sm">
              {pathname?.startsWith('/blog') ? (
                // Blog Specific Nav
                [
                  { name: "Tất cả", icon: "📚", href: "/blog" },
                  { name: "Nhật ký", icon: "🌳", href: "/blog?category=nhat-ky-phuc-hoi" },
                  { name: "Cẩm nang", icon: "📖", href: "/blog?category=cam-nang-ky-thuat" },
                  { name: "Video", icon: "📹", href: "/blog?category=video-ky-thuat" }
                ].map((cat, i) => (
                  <Link 
                    key={i} 
                    href={cat.href}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black transition-all shadow-sm border ${
                      (cat.name === 'Tất cả' && !activeCategory) || (cat.href.includes(`category=${activeCategory}`))
                      ? 'bg-emerald-600 text-white border-emerald-600' 
                      : 'bg-white text-gray-700 border-gray-100'
                    }`}
                  >
                    <span className="text-sm">{cat.icon}</span> {cat.name}
                  </Link>
                ))
              ) : pathname?.startsWith('/giai-phap') ? (
                // Solutions Specific Nav
                [
                  { name: "Tất cả", icon: "🩺", href: "/giai-phap" },
                  { name: "Xử lý bệnh", icon: "🦠", href: "/giai-phap?category=benh-ly" },
                  { name: "Kích rễ", icon: "🌱", href: "/giai-phap?category=kich-re" },
                  { name: "Nuôi trái", icon: "🍋", href: "/giai-phap?category=nuoi-trai" },
                  { name: "Phục hồi", icon: "♻️", href: "/giai-phap?category=phuc-hoi" }
                ].map((cat, i) => (
                  <Link 
                    key={i} 
                    href={cat.href}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black transition-all shadow-sm border ${
                      (cat.name === 'Tất cả' && !activeCategory) || (cat.href.includes(`category=${activeCategory}`))
                      ? 'bg-emerald-600 text-white border-emerald-600' 
                      : 'bg-white text-gray-700 border-gray-100'
                    }`}
                  >
                    <span className="text-sm">{cat.icon}</span> {cat.name}
                  </Link>
                ))
              ) : (
                // Default Product Nav
                [
                  { name: "Trang chủ", icon: "🏠", href: "/" },
                  { name: "Sản phẩm", icon: "📦", href: "/san-pham" },
                  { name: "Sầu riêng", icon: "🌳", href: "/danh-muc/sau-rieng" },
                  { name: "Cà phê", icon: "☕", href: "/danh-muc/ca-phe" },
                  { name: "Hồ tiêu", icon: "🌿", href: "/danh-muc/ho-tieu" },
                  { name: "Kiến thức", icon: "📖", href: "/blog" },
                  { name: "Hỏi đáp", icon: "❓", href: "/hoi-dap-ky-thuat" }
                ].map((cat, i) => (
                  <Link 
                    key={i} 
                    href={cat.href}
                    className="flex-shrink-0 flex items-center gap-1.5 bg-white border border-gray-100 px-3 py-1.5 rounded-full text-[11px] font-black text-gray-700 active:bg-emerald-600 active:text-white transition-all shadow-sm"
                  >
                    <span className="text-sm">{cat.icon}</span> {cat.name}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </header>

      {/* MOBILE MENU DRAWER OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[500] animate-in fade-in duration-300">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
           
           {/* Menu Content */}
           <div className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
              <div className="p-6 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1B5E20] font-black text-2xl">P</div>
                    <span className="font-black text-sm tracking-widest uppercase italic">Menu</span>
                 </div>
                 <button 
                   onClick={() => setIsMenuOpen(false)} 
                   aria-label="Đóng menu"
                   className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full"
                 >
                    <X size={24} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6">
                 {/* Main Navigation */}
                 <div className="px-6 space-y-2 mb-8">
                    <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-5 bg-emerald-50 text-emerald-900 rounded-2xl font-black text-base uppercase tracking-tight">
                       🏠 Trang chủ <ChevronRight size={20} className="opacity-30" />
                    </Link>
                    <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between p-5 hover:bg-gray-50 text-gray-700 rounded-2xl font-black text-base uppercase tracking-tight transition-colors">
                       📖 Kiến thức nông nghiệp <ChevronRight size={20} className="opacity-30" />
                    </Link>
                 </div>

                 {/* Crops Section */}
                 <div className="px-6 mb-8">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-4">Giải pháp theo cây trồng</h4>
                    <div className="space-y-1">
                       {crops.map((crop, i) => {
                         const isExpanded = expandedCrops.includes(crop.name);
                         return (
                           <div key={i} className="border-b border-gray-50 last:border-0">
                             <button 
                               onClick={() => {
                                 setExpandedCrops(prev => 
                                   isExpanded ? prev.filter(c => c !== crop.name) : [...prev, crop.name]
                                 );
                               }}
                               className={`flex items-center justify-between w-full p-5 text-gray-800 font-black text-base transition-colors ${isExpanded ? 'bg-emerald-50 text-emerald-800' : ''}`}
                             >
                               <div className="flex items-center gap-4">
                                  <span className="text-2xl">{crop.icon}</span> {crop.name}
                               </div>
                               <ChevronRight size={20} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90 text-emerald-600' : 'text-gray-300'}`} />
                             </button>
                             
                             {isExpanded && (
                               <div className="grid grid-cols-1 pl-14 pr-4 py-3 gap-2 bg-gray-50/50 animate-in slide-in-from-top-2 duration-300">
                                  {crop.issues.map((issue, idx) => (
                                    <Link 
                                      key={idx} 
                                      href={issue.href} 
                                      onClick={() => setIsMenuOpen(false)}
                                      className="py-4 text-base font-bold text-gray-700 hover:text-emerald-700 flex items-center gap-2 border-b border-gray-100 last:border-0 active:text-emerald-800"
                                    >
                                      · {issue.label}
                                    </Link>
                                  ))}
                               </div>
                             )}
                           </div>
                         );
                       })}
                    </div>
                 </div>

                 {/* Support Section */}
                 <div className="px-6 pt-6 border-t border-gray-100">
                    <Link href="/ve-chung-toi" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-5 text-gray-700 font-black text-base uppercase tracking-tight">
                       <Info size={24} className="text-emerald-600" /> Về chúng tôi
                    </Link>
                    <Link href="/lien-he" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 p-5 text-gray-700 font-black text-base uppercase tracking-tight">
                       <MessageCircle size={24} className="text-emerald-600" /> Liên hệ
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* MOBILE SEARCH OVERLAY */}
      {isSearchFocused && (
        <div className="fixed inset-0 z-[300] bg-white flex flex-col animate-in fade-in duration-200">
          <div className="flex items-center gap-3 p-3 border-b">
            <button 
              onClick={() => setIsSearchFocused(false)}
              className="p-2 text-gray-500 active:bg-gray-100 rounded-full"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <form onSubmit={(e) => handleSearch(e)} className="flex-1">
              <input 
                ref={searchInputRef}
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm Acti Rooti, Bình Điền..."
                className="w-full bg-gray-100 rounded-full py-2 px-4 outline-none text-sm font-bold"
              />
            </form>
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-400 font-bold px-2">✕</button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* SEARCH HISTORY */}
            {searchHistory.length > 0 && !searchQuery && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest">Lịch sử tìm kiếm</h4>
                  <button 
                    onClick={() => {
                      setSearchHistory([]);
                      localStorage.removeItem("search_history");
                    }}
                    className="text-[10px] font-bold text-red-500"
                  >
                    XÓA HẾT
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((h, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleSearch(undefined, h)}
                      className="bg-gray-50 border border-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-bold"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TRENDING */}
            <div className="mb-8">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Xu hướng tìm kiếm</h4>
              <div className="grid grid-cols-2 gap-3">
                {trends.map((t, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSearch(undefined, t)}
                    className="flex items-center gap-3 p-3 bg-emerald-50 text-emerald-900 rounded-xl text-sm font-bold active:bg-emerald-100 transition-colors"
                  >
                    <span className="opacity-40">📈</span>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* SUGGESTIONS */}
            {searchQuery.trim().length >= 2 && (showSuggestions || suggestions.products.length > 0) && (
              <div>
                <h4 className="text-xs font-black text-gray-600 uppercase tracking-widest mb-4">Gợi ý cho bạn</h4>
                <div className="space-y-4">
                  {suggestions.products.map((p: any, i: number) => (
                    <a 
                      key={i} 
                      href={`https://zalo.me/0773440966?text=${encodeURIComponent(`Chào kỹ sư, tôi muốn tư vấn về sản phẩm: ${p.name}`)}`}
                      target="_blank"
                      onClick={() => setIsSearchFocused(false)}
                      className="flex items-center gap-3"
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {p.images?.[0] && <img src={p.images[0]} alt="" className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800 line-clamp-1">{p.name}</p>
                        <p className="text-xs text-emerald-700 font-black">{p.price?.toLocaleString()}đ</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
