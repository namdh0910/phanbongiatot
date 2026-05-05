"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSettings } from "@/context/SettingsContext";
import { API_BASE_URL } from "@/utils/api";
import './HeaderFooter.css';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ products: any[], blogs: any[] }>({ products: [], blogs: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { cartCount } = useCart();
  const settings = useSettings();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const history = localStorage.getItem("search_history");
    if (history) setSearchHistory(JSON.parse(history));
  }, []);

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
        { label: "Vàng lá thối rễ", href: "/giai-phap/sau-rieng-vang-la-thoi-re" },
        { label: "Tuyến trùng", href: "/giai-phap/sau-rieng-vang-la-tuyen-trung" },
        { label: "Rụng trái non", href: "/giai-phap/sau-rieng-rung-trai" },
        { label: "Xử lý ra hoa", href: "/tim-kiem?q=sau+rieng+ra+hoa" },
      ]
    },
    { 
      name: "Cà Phê", 
      icon: "☕",
      slug: "ca-phe",
      issues: [
        { label: "Vàng lá mùa khô", href: "/tim-kiem?q=ca+phe+vang+la" },
        { label: "Rễ yếu còi cọc", href: "/giai-phap/phuc-hoi-ca-phe" },
        { label: "Rỉ sắt - Nấm hồng", href: "/tim-kiem?q=ca+phe+nam+hong" },
      ]
    },
    { 
      name: "Hồ Tiêu", 
      icon: "🌿",
      slug: "ho-tieu",
      issues: [
        { label: "Chết nhanh - Chết chậm", href: "/tim-kiem?q=ho+tieu+chet+nhanh" },
        { label: "Tuyến trùng rễ", href: "/giai-phap/tuyen-trung-ho-tieu" },
      ]
    }
  ];

  const trends = ["Sầu riêng", "Cà phê", "Kích rễ", "Tuyến trùng", "Phân bón lá"];
  const hotline = settings?.hotline || "0773.440.966";

  return (
    <div className="w-full sticky top-0 z-[100] bg-white shadow-sm">
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
                 placeholder="Tìm kiếm phác đồ, sản phẩm..."
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
                       <Link href={`/tim-kiem?q=${crop.slug}`} className="block text-[11px] font-black text-orange-600 uppercase tracking-widest hover:translate-x-1 transition-transform px-3">
                         Sản phẩm cho {crop.name} →
                       </Link>
                    </div>
                  </div>
                ))}
                <Link href="/blog" className="font-black text-sm uppercase tracking-wide text-gray-700 hover:text-emerald-700 transition-colors">Kiến Thức</Link>
                <Link href="/ve-chung-toi" className="font-black text-sm uppercase tracking-wide text-gray-700 hover:text-emerald-700 transition-colors">Về chúng tôi</Link>
              </nav>
            </div>
          </div>
        </div>

        {/* MOBILE HEADER - NEW DESIGN */}
        <div className="lg:hidden flex items-center gap-3 px-3 h-[56px] bg-[#1B5E20] text-white">
          <Link href="/" className="flex-shrink-0">
             <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#1B5E20] font-black text-xl">P</div>
          </Link>

          <div className="flex-1 relative">
            <form onSubmit={(e) => handleSearch(e)}>
              <input 
                type="text"
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Tìm Acti Rooti, Bình Điền..."
                className="w-full bg-white/10 backdrop-blur-md rounded-full py-1.5 px-4 outline-none border border-white/20 text-white text-[13px] placeholder:text-white/70"
              />
            </form>
          </div>

          <a 
            href={`tel:${hotline.replace(/\./g, '')}`}
            className="flex-shrink-0 bg-[#FF6B35] text-white text-[11px] font-black px-4 py-2 rounded-full shadow-lg active:scale-95 transition-transform uppercase tracking-tighter"
          >
            Gọi ngay
          </a>
        </div>
      </header>

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
                    <Link 
                      key={i} 
                      href={`/san-pham/${p.slug}`}
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
                    </Link>
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

