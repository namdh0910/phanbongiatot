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
  <Link href={`/giai-phap/${slug}`} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
       <AlertTriangle size={120} />
    </div>
    <div className="relative z-10">
      <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
        <AlertTriangle size={24} />
      </div>
      <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-[#1a5c2a] transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm mb-8 line-clamp-3 font-medium leading-relaxed italic">
        "{painPoint.length > 100 ? painPoint.substring(0, 100) + '...' : painPoint}"
      </p>
      <div className="inline-flex items-center gap-2 text-[#1a5c2a] font-black uppercase tracking-widest text-xs group-hover:gap-3 transition-all">
        Xem phác đồ cứu cây <ArrowRight size={16} />
      </div>
    </div>
  </Link>
);

const KnowledgeCard = ({ title, excerpt, image, category, slug }: any) => (
  <Link href={`/blog/${slug}`} className="flex-shrink-0 w-[85vw] md:w-full bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
    <div className="aspect-video relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <span className="absolute top-4 left-4 bg-[#1a5c2a] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
        {category}
      </span>
    </div>
    <div className="p-6">
      <h3 className="font-black text-gray-900 text-lg mb-3 line-clamp-2 leading-tight group-hover:text-[#1a5c2a] transition-colors">{title}</h3>
      <p className="text-gray-500 text-xs mb-4 line-clamp-2 font-medium">{excerpt}</p>
      <div className="w-8 h-1 bg-[#f5a623] rounded-full group-hover:w-16 transition-all" />
    </div>
  </Link>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left gap-4"
      >
        <span className="font-black text-gray-800 text-base md:text-lg">{question}</span>
        <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronRight className="text-gray-400" />
        </div>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600 text-sm md:text-base leading-relaxed font-medium animate-in fade-in slide-in-from-top-2">
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
  const [activePathologies, setActivePathologies] = useState<any[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const settings = useSettings() || {
    hotline: '0773.440.966',
    zalo: '0773440966',
    phone: '0773.440.966',
    siteName: 'Phân Bón Giá Tốt',
    address: 'Khu vực hỗ trợ: Đắk Lắk, Đắk Nông, Gia Lai, Lâm Đồng'
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
    Promise.all([
      fetch(`${API_BASE_URL}/blogs`).then(res => res.json()),
      fetch(`${API_BASE_URL}/pathologies`).then(res => res.json())
    ]).then(([blogsData, pathologiesData]) => {
      // Handle Blogs
      let bResults = Array.isArray(blogsData) ? blogsData : (blogsData?.blogs || []);
      setBlogs(bResults.slice(0, 3));
      setLoadingBlogs(false);
      
      // Handle Pathologies
      let pResults = Array.isArray(pathologiesData) ? pathologiesData : (pathologiesData?.pathologies || []);
      setActivePathologies(pResults.slice(0, 4));
    }).catch(err => {
      console.error("Data fetch error", err);
      setLoadingBlogs(false);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-emerald-100 selection:text-[#1a5c2a] overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[110] pointer-events-none">
        <div className="h-full bg-gradient-to-r from-[#f5a623] to-[#ff6b35] transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>



      {/* 2. Hero Section - Targeted Agricultural Solution */}
      <section className="relative min-h-[50vh] md:min-h-[85vh] flex items-center pt-20 pb-10 md:py-32 overflow-hidden">
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
            <div className="inline-flex items-center gap-2 bg-[#f5a623] text-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 animate-in slide-in-from-top duration-700">
              <ShieldCheck size={14} /> Chẩn đoán bệnh cây chuẩn 100%
            </div>
            
            <h1 className="text-3xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight tracking-tight animate-in slide-in-from-bottom duration-700 delay-100 uppercase">
              {settings.heroTitle || "CỨU VƯỜN SẦU RIÊNG, CÀ PHÊ"} <br className="hidden md:block" />
              <span className="text-[#f5a623]">{settings.heroSubtitle ? "" : "VÀNG LÁ, SUY RỄ"}</span>
            </h1>
            
            <h2 className="text-lg md:text-3xl text-white/95 mb-8 max-w-3xl mx-auto font-bold leading-relaxed animate-in slide-in-from-bottom duration-700 delay-200">
              {settings.heroSubtitle || "Phục Hồi Nhanh Dàn Lá, Bung Rễ Trắng Chỉ Sau 7 Ngày."}
            </h2>
            
            <div className="flex flex-col items-center gap-4 animate-in slide-in-from-bottom duration-700 delay-300">
              <a 
                href={zaloUrl} 
                className="group relative px-8 md:px-12 py-3 md:h-20 bg-[#f5a623] hover:bg-[#fbb940] text-white rounded-xl md:rounded-2xl font-black text-sm md:text-xl shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 animate-heartbeat"
              >
                <MessageCircle className="w-5 h-5 md:w-7 md:h-7" fill="currentColor" />
                Chụp Ảnh Vườn Gửi Kỹ Sư
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

      {/* 2.5 Quick Category Links (Mobile Only) */}
      <section className="md:hidden py-8 bg-white overflow-hidden">
        <div className="px-4 flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
          {[
            { name: "Sầu riêng", icon: "🌳", bg: "bg-emerald-50", text: "text-emerald-700", href: "/danh-muc/sau-rieng" },
            { name: "Cà phê", icon: "☕", bg: "bg-amber-50", text: "text-amber-700", href: "/danh-muc/ca-phe" },
            { name: "Hồ tiêu", icon: "🌿", bg: "bg-green-50", text: "text-green-700", href: "/danh-muc/ho-tieu" },
            { name: "Kích rễ", icon: "⚡", bg: "bg-orange-50", text: "text-orange-700", href: "/danh-muc/kich-re" },
            { name: "Kiến thức", icon: "📖", bg: "bg-blue-50", text: "text-blue-700", href: "/blog" }
          ].map((item, i) => (
            <Link key={i} href={item.href} className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center text-2xl shadow-sm active:scale-90 transition-transform`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${item.text}`}>{item.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Brand Marquee - Building Credibility */}
      <section className="bg-gray-50 py-10 border-y border-gray-100 overflow-hidden">
         <div className="container mx-auto px-4 mb-6">
            <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Đối tác kỹ thuật & Giải pháp chính hãng</p>
         </div>
         <div className="flex gap-12 whitespace-nowrap animate-marquee px-4">
            {["Bình Điền", "Yara", "DAP", "Phú Mỹ", "Hợp Trí", "Nemano", "Bình Điền", "Yara", "DAP", "Phú Mỹ", "Bình Điền", "Yara", "DAP", "Phú Mỹ", "Hợp Trí", "Nemano", "Bình Điền", "Yara", "DAP", "Phú Mỹ"].map((brand, i) => (
              <span key={i} className="text-xl md:text-2xl font-black text-gray-300 hover:text-gray-400 transition-colors cursor-default uppercase tracking-tighter italic">
                {brand}
              </span>
            ))}
         </div>
      </section>

      {/* 3.5 Trust Badges */}
      <section className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12">
            {[
              { icon: <UserCheck className="text-[#1a5c2a]" />, title: 'Kỹ Sư Tận Tâm', sub: 'Tư vấn 1-1' },
              { icon: <ShieldCheck className="text-[#1a5c2a]" />, title: 'Giải Pháp Chuẩn', sub: 'Đã qua kiểm chứng' },
              { icon: <MapPin className="text-[#1a5c2a]" />, title: 'Hỗ Trợ Tận Vườn', sub: 'Kỹ thuật tại chỗ' },
              { icon: <Wallet className="text-[#1a5c2a]" />, title: 'Tiết Kiệm Chi Phí', sub: 'Hiệu quả tối ưu' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100 hover:border-[#1a5c2a] transition-all">
                <div className="mb-4 p-3 bg-white rounded-2xl shadow-sm">{item.icon}</div>
                <div className="font-black text-gray-900 text-sm md:text-lg mb-1">{item.title}</div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Solutions - Now dynamically rendering Pathologies */}
      <section id="solutions" className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <span className="text-[#f5a623] font-black uppercase tracking-widest text-xs mb-3">Dấu hiệu nhận biết</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
              Vườn Bà Con Đang <span className="text-red-600">Gặp Vấn Đề Gì?</span>
            </h2>
            <div className="w-20 h-2 bg-[#f5a623] rounded-full" />
            <p className="mt-6 text-gray-500 max-w-xl font-medium">
              Chọn đúng dấu hiệu vườn đang mắc phải để nhận phác đồ phục hồi sinh học chuyên sâu từ kỹ sư.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
            {activePathologies.length > 0 ? activePathologies.map((pathology, idx) => (
              <DiseaseCard 
                key={idx}
                title={pathology.title}
                slug={pathology.slug}
                painPoint={pathology.painPoint}
              />
            )) : (
              <p className="text-gray-400 text-center col-span-full">Đang tải phác đồ điều trị...</p>
            )}
          </div>
        </div>
      </section>

      {/* 5. Knowledge Hub */}
      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                Kiến Thức <span className="text-[#f5a623]">Nhà Nông</span>
              </h2>
              <p className="text-gray-500 font-medium">Cập nhật kỹ thuật mới nhất từ các kỹ sư giàu kinh nghiệm thực chiến tại vườn.</p>
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
                  image={blog.image || 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=800&auto=format&fit=crop'}
                  category={blog.category || 'Kỹ thuật'}
                  slug={blog.slug}
                />
              ))
            ) : (
              <p className="text-gray-400">Đang cập nhật kiến thức bài viết...</p>
            )}
          </div>

          <Link href="/blog" className="md:hidden flex items-center justify-center gap-2 text-[#1a5c2a] font-black uppercase tracking-widest text-sm mt-6">
            Xem tất cả tài liệu <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section id="cta" className="bg-[#1a5c2a] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] md:rounded-[4rem] p-8 md:p-20 text-center shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#f5a623] via-yellow-300 to-[#f5a623]" />
            
            <div className="inline-flex items-center gap-2 text-[#1a5c2a] font-black uppercase tracking-widest mb-6">
              <BookOpen size={20} /> Tư vấn kỹ thuật miễn phí
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Vườn Yếu? <span className="text-[#f5a623]">Gặp Kỹ Sư Ngay!</span>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
              Gửi tình trạng vườn (ảnh/video) qua Zalo để nhận phác đồ điều trị miễn phí trong vòng 15 phút.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a href={zaloUrl} className="w-full md:w-auto bg-[#f5a623] hover:bg-[#fbb940] text-white font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-orange-100">
                <MessageCircle fill="currentColor" /> Chat Zalo Ngay
              </a>
              <a href={callUrl} className="w-full md:w-auto bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95">
                <Phone /> Gọi: {settings.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5. Practical Video Guide Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
                Kỹ sư hướng dẫn <span className="text-[#f5a623]">thực tế tại vườn</span>
              </h2>
              <div className="w-20 h-2 bg-[#1a5c2a] rounded-full mx-auto" />
            </div>
            
            {/* 9:16 Vertical Video Container */}
            <div className="flex justify-center">
              <div className="w-full max-w-[350px]">
                <LiteYouTube 
                  videoId="17SIPDywIXk" 
                  title="Kỹ sư hướng dẫn thực tế" 
                  className="rounded-[2.5rem] border-[8px] border-gray-900 shadow-2xl"
                />
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-6">Theo dõi các video kỹ thuật mới nhất</p>
              <div className="flex justify-center gap-6">
                <a 
                  href="https://www.facebook.com/phanbongiatot1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[#1877F2] rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-blue-100"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a 
                  href="https://www.youtube.com/@phanbongiatot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[#FF0000] rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-red-100"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-orange-100 rounded-2xl text-[#f5a623]"><HelpCircle /></div>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase">Giải đáp thắc mắc</h2>
            </div>
            
            <div className="space-y-2">
              <FAQItem 
                question="Quy trình tư vấn kỹ thuật diễn ra như thế nào?"
                answer="Bước 1: Bạn nhắn tin qua Zalo hoặc gọi Hotline. Bước 2: Bạn gửi hình ảnh/video thực tế tại vườn. Bước 3: Kỹ sư chẩn đoán và đưa ra phác đồ (loại thuốc, liều lượng, thời điểm xịt). Bước 4: Kỹ sư theo dõi hiệu quả sau khi bạn xử lý."
              />
              <FAQItem 
                question="Làm sao để kỹ sư chẩn đoán đúng bệnh cho vườn?"
                answer="Hình ảnh rõ nét về lá, thân, và đặc biệt là bộ rễ tơ là quan trọng nhất. Bạn nên quay video ngắn toàn cảnh vườn và cận cảnh cây bị bệnh gửi qua Zalo để kỹ sư nắm bắt chính xác tình hình."
              />
              <FAQItem 
                question="Các giải pháp có thực sự an toàn và hiệu quả?"
                answer="Tất cả phác đồ của Phân Bón Giá Tốt đều ưu tiên hướng sinh học, bảo vệ hệ sinh thái đất và sức khỏe nhà nông. Chúng tôi cam kết hiệu quả thấy rõ bằng mắt thường (ra đọt, xanh lá, phục hồi rễ) sau 7-10 ngày thực hiện đúng phác đồ."
              />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
