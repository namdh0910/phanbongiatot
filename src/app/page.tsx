"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  Wallet,
  BookOpen,
  ArrowRight,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { API_BASE_URL } from '@/utils/api';
import { useSettings } from '@/context/SettingsContext';
import LiteYouTube from '@/components/shared/LiteYouTube';

// Reusable Components for the Landing Page
const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const variants = {
    primary: 'bg-[#f5a623] hover:bg-[#fbb940] text-white shadow-lg shadow-orange-200',
    secondary: 'bg-white border-2 border-white text-white hover:bg-white/10',
    outline: 'border-2 border-[#1a5c2a] text-[#1a5c2a] hover:bg-emerald-50',
    ghost: 'text-gray-600 hover:text-[#1a5c2a]'
  };
  
  return (
    <button 
      className={`px-6 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const DiseaseCard = ({ title, slug, painPoint }: any) => (
  <Link href={`/giai-phap/${slug}`} className="bg-white rounded-2xl p-3 md:p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden flex flex-col h-full">
    <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
       <AlertTriangle size={60} />
    </div>
    <div className="relative z-10">
      <div className="w-8 h-8 md:w-12 md:h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-2 md:mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
        <AlertTriangle size={18} />
      </div>
      <h3 className="text-sm md:text-2xl font-black text-gray-900 mb-1 md:mb-4 leading-tight group-hover:text-[#1a5c2a] transition-colors">{title}</h3>
      <p className="text-[10px] md:text-sm text-gray-500 mb-3 md:mb-8 line-clamp-2 md:line-clamp-3 font-medium leading-relaxed italic">
        "{painPoint.length > 80 ? painPoint.substring(0, 80) + '...' : painPoint}"
      </p>
      <div className="mt-auto inline-flex items-center gap-1 md:gap-2 text-[#1a5c2a] font-black uppercase tracking-widest text-[8px] md:text-xs group-hover:gap-3 transition-all">
        Xem ngay <ArrowRight size={10} className="md:w-4 md:h-4" />
      </div>
    </div>
  </Link>
);

const KnowledgeCard = ({ title, excerpt, image, category, slug }: any) => (
  <Link href={`/blog/${slug}`} className="flex-shrink-0 w-[70vw] md:w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
    <div className="aspect-[16/10] relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <span className="absolute top-2 left-2 bg-[#1a5c2a] text-white px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">
        {category}
      </span>
    </div>
    <div className="p-3 md:p-6">
      <h3 className="font-black text-gray-900 text-[13px] md:text-lg mb-1 md:mb-3 line-clamp-2 leading-tight group-hover:text-[#1a5c2a] transition-colors">{title}</h3>
      <p className="text-gray-500 text-[10px] md:text-xs mb-2 md:mb-4 line-clamp-2 font-medium">{excerpt}</p>
      <div className="w-6 h-0.5 bg-[#f5a623] rounded-full group-hover:w-12 transition-all" />
    </div>
  </Link>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-3 md:py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left gap-3 md:gap-4"
      >
        <span className="font-black text-gray-800 text-sm md:text-lg">{question}</span>
        <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronRight className="text-gray-400 w-4 h-4 md:w-6 md:h-6" />
        </div>
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 text-xs md:text-base leading-relaxed font-medium animate-in fade-in slide-in-from-top-2">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activePathologies, setActivePathologies] = useState<any[]>([]);
  const [loadingPathologies, setLoadingPathologies] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const settings = useSettings() || {
    hotline: '0339.505.050',
    zalo: '0339505050',
    phone: '0339.505.050',
    siteName: 'Phân Bón Giá Tốt',
    address: 'Khu vực hỗ trợ: Kon Tum, Đắk Nông, Gia Lai, Lâm Đồng'
  };

  useEffect(() => {
    const handleScroll = () => {
      // 1. Scrolled state for header/elements
      setScrolled(window.scrollY > 20);
      
      // 2. Progress bar calculation
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial fetch of data
    console.log("Fetching from:", API_BASE_URL);
    Promise.all([
      fetch(`${API_BASE_URL}/blogs`).then(res => res.json()),
      fetch(`${API_BASE_URL}/pathologies`).then(res => res.json()),
      fetch(`${API_BASE_URL}/products`).then(res => res.json())
    ]).then(([blogsData, pathologiesData, productsData]) => {
      // Handle Blogs
      let bResults = blogsData.data || blogsData.blogs || (Array.isArray(blogsData) ? blogsData : []);
      setBlogs(bResults.slice(0, 3));
      setLoadingBlogs(false);
      
      // Handle Pathologies
      let pResults = pathologiesData.data || pathologiesData.pathologies || (Array.isArray(pathologiesData) ? pathologiesData : []);
      setActivePathologies(pResults.slice(0, 4));
      setLoadingPathologies(false);

      // Handle Products
      let prResults = productsData.data || productsData.products || (Array.isArray(productsData) ? productsData : []);
      setProducts(prResults.slice(0, 4));
      setLoadingProducts(false);
    }).catch(err => {
      console.error("Data fetch error", err);
      setLoadingBlogs(false);
      setLoadingProducts(false);
      setLoadingPathologies(false);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const zaloUrl = `https://zalo.me/${settings.zalo.replace(/\./g, '')}`;
  const callUrl = `tel:${settings.hotline.replace(/\./g, '')}`;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-emerald-100 selection:text-[#1a5c2a] overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[110] pointer-events-none">
        <div className="h-full bg-gradient-to-r from-[#f5a623] to-[#ff6b35] transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* 2. Hero Section - Targeted Agricultural Solution */}
      <section className="relative min-h-[30vh] md:min-h-[85vh] flex items-center pt-8 pb-6 md:py-32 overflow-hidden">
        {/* Background Image Optimized for LCP */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-bg.png" 
            alt="Vườn sầu riêng cà phê xanh tốt" 
            fill
            priority
            loading="eager"
            className="object-cover"
            sizes="100vw"
            {...({ fetchPriority: "high" } as any)}
          />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-black/40 to-[#0d2a1c]/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Removed badge as requested */}
            
            <h1 className="text-2xl md:text-7xl lg:text-8xl font-black text-white mb-3 md:mb-4 leading-tight tracking-tight animate-in slide-in-from-bottom duration-700 delay-100 uppercase">
              {settings.heroTitle || "CỨU VƯỜN SẦU RIÊNG, CÀ PHÊ"} <br className="hidden md:block" />
              <span className="text-[#f5a623]">{settings.heroSubtitle ? "" : "VÀNG LÁ, SUY RỄ"}</span>
            </h1>
            
            {/* Removed subtitle as requested */}
            
            <div className="flex flex-col items-center gap-4 animate-in slide-in-from-bottom duration-700 delay-300">
              <a 
                href={zaloUrl} 
                className="group relative px-6 md:px-12 py-2.5 md:h-20 bg-[#f5a623] hover:bg-[#fbb940] text-white rounded-lg md:rounded-2xl font-black text-xs md:text-xl shadow-2xl flex items-center justify-center gap-2 transition-all active:scale-95 animate-heartbeat"
              >
                <MessageCircle className="w-4 h-4 md:w-7 md:h-7" fill="currentColor" />
                Chụp Ảnh Vườn Gửi PBGT
              </a>
              <div className="flex flex-col items-center gap-2">
                 <p className="text-white/60 text-[9px] md:text-sm font-bold uppercase tracking-widest">Tư vấn miễn phí qua Zalo 24/7</p>
                 <Link href="/blog" className="text-emerald-400 text-[10px] md:text-sm font-black uppercase tracking-widest border-b border-emerald-400/30 pb-1 hover:text-white transition-colors">
                    Hoặc tự tra cứu tại Thư viện kỹ thuật ➔
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Removing Quick Category Links to reduce clutter as requested by user */}

      {/* 3. Brand Marquee - Building Credibility */}
      <section className="bg-gray-50 py-4 md:py-10 border-y border-gray-100 overflow-hidden">
         <div className="container mx-auto px-4 mb-2 md:mb-6">
            <p className="text-center text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Đối tác kỹ thuật & Giải pháp chính hãng</p>
         </div>
         <div className="flex gap-8 md:gap-12 whitespace-nowrap animate-marquee px-4">
            {(settings.brand_marquee || "Bình Điền, Yara, DAP, Phú Mỹ, Hợp Trí, Nemano")
              .split(',')
              .map(s => s.trim())
              .concat((settings.brand_marquee || "Bình Điền, Yara, DAP, Phú Mỹ, Hợp Trí, Nemano").split(',').map(s => s.trim()))
              .map((brand, i) => (
                <span key={i} className="text-sm md:text-2xl font-black text-gray-300 hover:text-gray-400 transition-colors cursor-default uppercase tracking-tighter italic">
                  {brand}
                </span>
              ))}
         </div>
      </section>

      {/* 3.5 Featured Products - Replacing Trust Badges */}
      <section className="bg-white py-6 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-6 md:mb-10">
            <span className="text-[#f5a623] font-black uppercase tracking-widest text-[9px] mb-1">Giải pháp hàng đầu</span>
            <h2 className="text-xl md:text-4xl font-black text-gray-900 uppercase">Sản phẩm chủ lực</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
            {loadingProducts ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[3/4] bg-gray-50 rounded-3xl animate-pulse" />
              ))
            ) : products.map((product, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
              >
                <Link href={`/san-pham/${product.slug}`} className="aspect-square bg-gray-50 relative overflow-hidden block">
                  <img src={product.images?.[0] || '/product-placeholder.png'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {product.originalPrice > product.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Giảm giá</div>
                  )}
                </Link>
                <div className="p-3 md:p-5 flex flex-col flex-1">
                  <Link href={`/san-pham/${product.slug}`} className="block">
                    <h3 className="text-[15px] md:text-sm font-black text-gray-900 line-clamp-2 mb-2 leading-tight hover:text-[#1a5c2a] transition-colors">{product.name}</h3>
                  </Link>
                  <div className="mb-4">
                    {product.originalPrice > product.price && (
                      <p className="text-[10px] md:text-xs text-gray-400 line-through font-bold">{product.originalPrice?.toLocaleString()}đ</p>
                    )}
                    <p className="text-xs md:text-base text-emerald-700 font-black mb-2 md:mb-4">{product.price?.toLocaleString()}đ</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <Link 
                      href={`/san-pham/${product.slug}`}
                      className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest py-2 border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      Chi tiết
                    </Link>
                    <a 
                      href={`https://zalo.me/${settings.zalo.replace(/\./g, '')}?text=${encodeURIComponent(`Tôi muốn tư vấn về sản phẩm: ${product.name}`)}`}
                      target="_blank"
                      className="text-[9px] md:text-[10px] font-black text-white bg-[#1a5c2a] uppercase tracking-widest py-2 rounded-xl flex items-center justify-center hover:bg-[#144620] transition-colors"
                    >
                      Liên hệ
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 md:mt-10 text-center">
             <Link href="/san-pham" className="inline-flex items-center gap-2 text-[#1a5c2a] font-black uppercase tracking-widest text-[10px] md:text-xs hover:gap-3 transition-all">
                Xem tất cả sản phẩm <ArrowRight size={12} className="md:w-3.5 md:h-3.5" />
             </Link>
          </div>
        </div>
      </section>

      {/* 4. Core Solutions - Now dynamically rendering Pathologies */}
      <section id="solutions" className="bg-gray-50 py-8 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-6 md:mb-16">
            <span className="text-[#f5a623] font-black uppercase tracking-widest text-[10px] mb-2">Dấu hiệu nhận biết</span>
            <h2 className="text-xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-2">
              Vườn Bà Con Đang <span className="text-red-600">Gặp Vấn Đề Gì?</span>
            </h2>
            <div className="w-12 h-1 bg-[#f5a623] rounded-full" />
            <p className="mt-4 text-gray-500 max-w-xl font-medium text-[11px] md:text-base">
              Chọn đúng dấu hiệu vườn đang mắc phải để nhận giải pháp phục hồi sinh học chuyên sâu từ đội ngũ PBGT.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-10 max-w-6xl mx-auto">
            {!loadingPathologies ? (
              activePathologies.length > 0 ? activePathologies.map((pathology, idx) => (
                <Link 
                  key={idx} 
                  href={`/giai-phap/${pathology.slug}`} 
                  className="bg-white rounded-2xl md:rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden flex flex-col h-full"
                >
                  <div className="w-full h-24 md:h-48 bg-emerald-50/50 shrink-0 overflow-hidden relative flex items-center justify-center">
                    <div className="absolute top-2 left-2 z-20">
                      <span className="bg-white/90 backdrop-blur-sm text-[#1a5c2a] px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter border border-emerald-100 shadow-sm">
                        Quy trình chuẩn
                      </span>
                    </div>
                    {pathology.image ? (
                      <img src={pathology.image} alt={pathology.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="text-3xl md:text-5xl transform group-hover:scale-110 transition-transform duration-500">{pathology.icon || '🩺'}</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent md:hidden" />
                  </div>
                  <div className="p-3 md:p-8 flex flex-col flex-1 bg-white">
                    <h3 className="text-[16px] md:text-xl font-bold text-gray-800 mb-1 md:mb-3 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2 md:line-clamp-none" style={{ textTransform: 'none' }}>
                      {pathology.title.charAt(0).toUpperCase() + pathology.title.slice(1).toLowerCase()}
                    </h3>
                    <p className="hidden md:block text-gray-500 text-xs mb-4 line-clamp-2 font-medium italic opacity-80">
                      {pathology.painPoint}
                    </p>
                    <div className="mt-auto inline-flex items-center gap-1 md:gap-2 text-emerald-600 font-black uppercase tracking-widest text-[8px] md:text-[10px] group-hover:gap-3 transition-all">
                      Xem ngay <ArrowRight size={10} className="md:w-4 md:h-4" />
                    </div>
                  </div>
                </Link>
              )) : (
                <p className="text-gray-400 text-center col-span-full py-10 font-bold uppercase tracking-widest text-xs">Chưa có giải pháp phục hồi nào được cập nhật</p>
              )
            ) : (
              <div className="col-span-full flex flex-col items-center py-10 gap-4">
                <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">Đang tải dữ liệu kỹ thuật...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Knowledge Hub */}
      <section className="bg-white py-8 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-6 md:mb-12 gap-4 md:gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-2">
                Kiến Thức <span className="text-[#f5a623]">Nhà Nông</span>
              </h2>
              <p className="text-gray-500 font-medium text-[11px] md:text-base">Cập nhật kỹ thuật mới nhất từ đội ngũ giàu kinh nghiệm thực chiến tại vườn.</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-[#1a5c2a] font-black uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
              Xem tất cả tài liệu <ChevronRight size={18} />
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
            {loadingBlogs ? (
              [1, 2, 3].map(i => (
                <div key={i} className="flex-shrink-0 w-[85vw] md:w-full h-80 bg-gray-100 rounded-3xl animate-pulse" />
              ))
            ) : blogs.length > 0 ? (
              blogs.map((blog, idx) => (
                <KnowledgeCard 
                  key={idx} 
                  title={blog.title}
                  excerpt={blog.excerpt}
                  image={blog.coverImage || blog.image || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop'}
                  category={blog.category || 'Kỹ thuật'}
                  slug={blog.slug}
                />
              ))
            ) : (
              <p className="text-gray-400">Đang cập nhật kiến thức bài viết...</p>
            )}
          </div>

          <Link href="/blog" className="md:hidden flex items-center justify-center gap-2 text-[#1a5c2a] font-black uppercase tracking-widest text-[10px] mt-4">
            Xem tất cả tài liệu <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section id="cta" className="bg-[#1a5c2a] py-8 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl md:rounded-[4rem] p-6 md:p-20 text-center shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 md:h-2 bg-gradient-to-r from-[#f5a623] via-yellow-300 to-[#f5a623]" />
            
            <div className="inline-flex items-center gap-2 text-[#1a5c2a] font-black uppercase tracking-widest text-[10px] md:text-sm mb-4 md:mb-6">
              <BookOpen size={16} className="md:w-5 md:h-5" /> Tư vấn kỹ thuật miễn phí
            </div>
            <h2 className="text-xl md:text-5xl font-black text-gray-900 mb-4 md:mb-6 leading-tight">
              Vườn Yếu? <span className="text-[#f5a623]">Gặp PBGT Ngay!</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-xl mb-6 md:mb-12 max-w-2xl mx-auto font-medium">
              Gửi tình trạng vườn (ảnh/video) qua Zalo để nhận giải pháp phục hồi miễn phí trong vòng 15 phút.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
              <a href={zaloUrl} className="w-full md:w-auto bg-[#f5a623] hover:bg-[#fbb940] text-white font-black px-6 py-3.5 md:px-10 md:py-5 rounded-xl text-xs md:text-base flex items-center justify-center gap-2 md:gap-3 transition-all active:scale-95 shadow-xl shadow-orange-100">
                <MessageCircle fill="currentColor" className="w-4 h-4 md:w-5 md:h-5" /> Chat Zalo Ngay
              </a>
              <a href={callUrl} className="w-full md:w-auto bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-black px-6 py-3.5 md:px-10 md:py-5 rounded-xl text-xs md:text-base flex items-center justify-center gap-2 md:gap-3 transition-all active:scale-95">
                <Phone className="w-4 h-4 md:w-5 md:h-5" /> Gọi: {settings.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5. Practical Video Guide Section */}
      <section className="bg-gray-50 py-8 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-2 md:mb-4">
                Hướng dẫn kỹ thuật <span className="text-[#f5a623]">thực tế tại vườn</span>
              </h2>
              <div className="w-12 md:w-20 h-1 md:h-2 bg-[#1a5c2a] rounded-full mx-auto" />
            </div>
            
            {/* 9:16 Vertical Video Container */}
            <div className="flex justify-center">
              <div className="w-full max-w-[350px]">
                <LiteYouTube 
                  videoId="17SIPDywIXk" 
                  title="Hướng dẫn kỹ thuật thực tế" 
                  className="rounded-[2.5rem] border-[8px] border-gray-900 shadow-2xl"
                />
              </div>
            </div>
            
            <div className="mt-8 md:mt-12 text-center">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[9px] md:text-sm mb-4 md:mb-6">Theo dõi các video kỹ thuật mới nhất</p>
              <div className="flex justify-center gap-4 md:gap-6">
                <a 
                  href="https://www.facebook.com/phanbongiatot1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-14 md:h-14 bg-[#1877F2] rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-blue-100"
                >
                  <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a 
                  href="https://www.youtube.com/@phanbongiatot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-14 md:h-14 bg-[#FF0000] rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-red-100"
                >
                  <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="bg-white py-8 md:py-24 pb-20 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6 md:mb-10">
              <div className="p-2 md:p-3 bg-orange-100 rounded-xl md:rounded-2xl text-[#f5a623]"><HelpCircle size={20} className="md:w-6 md:h-6" /></div>
              <h2 className="text-xl md:text-4xl font-black text-gray-900 uppercase">Giải đáp thắc mắc</h2>
            </div>
            
            <div className="space-y-2">
              <FAQItem 
                question="Quy trình tư vấn kỹ thuật diễn ra như thế nào?"
                answer="Bước 1: Bạn nhắn tin qua Zalo hoặc gọi Hotline. Bước 2: Bạn gửi hình ảnh/video thực tế tại vườn. Bước 3: Đội ngũ PBGT hỗ trợ chẩn đoán và đưa ra giải pháp (loại thuốc, liều lượng, thời điểm xịt). Bước 4: Chúng tôi theo dõi hiệu quả sau khi bạn xử lý."
              />
              <FAQItem 
                question="Làm sao để PBGT hỗ trợ đúng bệnh cho vườn?"
                answer="Hình ảnh rõ nét về lá, thân, và đặc biệt là bộ rễ tơ là quan trọng nhất. Bạn nên quay video ngắn toàn cảnh vườn và cận cảnh cây bị bệnh gửi qua Zalo để chúng tôi nắm bắt chính xác tình hình."
              />
              <FAQItem 
                question="Các giải pháp có thực sự an toàn và hiệu quả?"
                answer="Tất cả giải pháp của Phân Bón Giá Tốt đều ưu tiên hướng sinh học, bảo vệ hệ sinh thái đất và sức khỏe nhà nông. Chúng tôi cam kết hiệu quả thấy rõ bằng mắt thường (ra đọt, xanh lá, phục hồi rễ) sau 7-10 ngày thực hiện đúng quy trình."
              />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
