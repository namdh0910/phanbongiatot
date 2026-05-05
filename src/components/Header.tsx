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
  const [suggestions, setSuggestions] = useState<{ products: any[], blogs: any[] }>({ products: [], blogs: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { cartCount } = useCart();
  const settings = useSettings();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(searchQuery.trim())}`);
      setMenuOpen(false);
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

  const hotline = settings?.hotline || "0773.440.966";

  return (
    <div className="w-full sticky top-0 z-[100] bg-white shadow-sm border-b border-gray-100">
      {/* Announcement Bar */}
      {settings?.announcementEnabled && (
        <div className="bg-[#1a5c2a] text-white py-2 px-4 text-center text-[10px] md:text-xs font-bold uppercase tracking-widest">
           {settings.announcementText}
        </div>
      )}
      
      <header className="w-full bg-white border-b border-gray-100">
        {/* DESKTOP HEADER */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-8">
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-black text-[#1a5c2a] tracking-tighter">
                PhânBón<span className="text-[#f5a623]">GiáTốt</span>
              </div>
            </Link>

            {/* Search Bar Desktop */}
            <form onSubmit={handleSearch} className="flex-1 max-w-lg relative">
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
                    <span className="text-[9px] font-black uppercase text-gray-400">Hotline 24/7</span>
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

        {/* MOBILE HEADER */}
        <div className="lg:hidden flex items-center justify-between px-4 h-16 bg-white border-b border-gray-50">
          <button 
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 flex items-center justify-center text-gray-800"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>

          <Link href="/" className="flex-shrink-0">
            <div className="text-xl font-black text-[#1a5c2a] tracking-tighter">
              PhânBón<span className="text-[#f5a623]">GiáTốt</span>
            </div>
          </Link>

          <a href={`tel:${hotline.replace(/\./g, '')}`} className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center active:scale-95 transition-transform">
            📞
          </a>
        </div>
      </header>

      {/* MOBILE SLIDE-IN MENU (LEFT SIDE) */}
      <div 
        className={`fixed inset-0 z-[200] transition-all duration-300 ${menuOpen ? 'visible' : 'invisible'}`}
      >
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        
        <div className={`absolute top-0 left-0 h-full w-[80%] bg-white shadow-2xl transition-transform duration-300 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-5 border-b flex justify-between items-center bg-gray-50">
              <span className="font-black text-emerald-800 uppercase italic">Danh mục tư vấn</span>
              <button onClick={() => setMenuOpen(false)} className="text-2xl text-gray-400">✕</button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              {[
                { name: "Sầu Riêng", icon: "🌳", href: "/tim-kiem?q=sau-rieng" },
                { name: "Cà Phê", icon: "☕", href: "/tim-kiem?q=ca-phe" },
                { name: "Hồ Tiêu", icon: "🌿", href: "/tim-kiem?q=ho-tieu" },
                { name: "Kiến Thức", icon: "📖", href: "/blog" },
                { name: "Về chúng tôi", icon: "🏢", href: "/ve-chung-toi" }
              ].map((item, i) => (
                <Link 
                  key={i} 
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 px-6 py-4 border-b border-gray-50 text-base font-black text-gray-800 active:bg-emerald-50 transition-colors"
                >
                  <span className="text-2xl">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="p-6 bg-white border-t space-y-4">
               <a href="https://zalo.me/0773440966" className="block w-full bg-[#0068FF] text-white py-4 rounded-2xl font-black text-center shadow-xl active:scale-95 transition-transform">
                 💬 CHAT ZALO NGAY
               </a>
               <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest opacity-60">Kỹ sư hỗ trợ miễn phí 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
