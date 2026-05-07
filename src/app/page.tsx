"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  ShieldCheck, 
  UserCheck, 
  MapPin, 
  BookOpen,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Award,
  Zap,
  ThumbsUp,
  Star
} from 'lucide-react';
import { API_BASE_URL } from '@/utils/api';
import { useSettings } from '@/context/SettingsContext';
import LiteYouTube from '@/components/shared/LiteYouTube';

// --- PREMIUM UI COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const variants = {
    primary: 'bg-[#f5a623] hover:bg-[#fbb940] text-white shadow-[0_10px_30px_-10px_rgba(245,166,35,0.5)]',
    secondary: 'bg-emerald-900/10 border-2 border-emerald-900/20 text-emerald-900 hover:bg-emerald-900/20',
    outline: 'border-2 border-[#1a5c2a] text-[#1a5c2a] hover:bg-emerald-50',
    ghost: 'text-gray-600 hover:text-[#1a5c2a]'
  };
  
  return (
    <button 
      className={`px-8 py-4 rounded-2xl font-black text-sm md:text-lg transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const DiseaseCard = ({ title, slug, painPoint, image }: any) => (
  <Link href={`/giai-phap/${slug}`} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 group overflow-hidden flex flex-col h-full">
    <div className="h-28 md:h-40 relative overflow-hidden shrink-0">
       <img src={image || '/placeholder-pathology.jpg'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
       <div className="absolute bottom-3 left-4">
          <span className="bg-red-500 text-white text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Khẩn cấp</span>
       </div>
    </div>
    <div className="p-4 md:p-6 flex flex-col flex-1">
      <h3 className="text-base md:text-xl font-black text-gray-900 mb-2 leading-tight group-hover:text-emerald-700 transition-colors uppercase italic tracking-tighter">{title}</h3>
      <p className="text-gray-400 text-[10px] md:text-xs mb-4 line-clamp-2 font-medium italic leading-relaxed">
        "{painPoint}"
      </p>
      <div className="mt-auto inline-flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[9px] group-hover:gap-3 transition-all">
        Phác đồ xử lý <ArrowRight size={14} />
      </div>
    </div>
  </Link>
);

const KnowledgeCard = ({ title, excerpt, image, category, slug }: any) => (
  <Link href={`/blog/${slug}`} className="flex-shrink-0 w-[80vw] md:w-full bg-white rounded-[2.5rem] border border-gray-50 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
    <div className="aspect-[4/3] relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
      <span className="absolute top-6 left-6 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
        {category}
      </span>
    </div>
    <div className="p-8">
      <h3 className="font-black text-gray-900 text-xl mb-4 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors uppercase italic tracking-tighter">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">{excerpt}</p>
      <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px]">
         Đọc chi tiết <ArrowRight size={14} />
      </div>
    </div>
  </Link>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-50/50 rounded-2xl mb-4 overflow-hidden border border-gray-100 transition-all hover:bg-white hover:shadow-md">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left gap-4"
      >
        <span className="font-black text-gray-800 text-sm md:text-lg uppercase italic tracking-tighter">{question}</span>
        <div className={`w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform ${isOpen ? 'rotate-180 bg-emerald-600 text-white' : 'text-gray-400'}`}>
          <ChevronRight size={18} />
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-gray-600 text-sm md:text-base leading-relaxed font-medium border-t border-gray-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};

// --- MAIN PAGE ---

export default function LandingPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activePathologies, setActivePathologies] = useState<any[]>([]);
  const [loadingPathologies, setLoadingPathologies] = useState(true);
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
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    Promise.all([
      fetch(`${API_BASE_URL}/blogs`).then(res => res.json()),
      fetch(`${API_BASE_URL}/pathologies`).then(res => res.json()),
      fetch(`${API_BASE_URL}/products`).then(res => res.json())
    ]).then(([blogsData, pathologiesData, productsData]) => {
      let bResults = blogsData.data || blogsData.blogs || (Array.isArray(blogsData) ? blogsData : []);
      setBlogs(bResults.slice(0, 3));
      setLoadingBlogs(false);
      
      let pResults = pathologiesData.data || pathologiesData.pathologies || (Array.isArray(pathologiesData) ? pathologiesData : []);
      setActivePathologies(pResults.slice(0, 4));
      setLoadingPathologies(false);

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
      <div className="fixed top-0 left-0 w-full h-1.5 z-[110] pointer-events-none">
        <div className="h-full bg-gradient-to-r from-[#f5a623] via-[#ff6b35] to-red-600 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* 1. Hero Section - Direct Response Optimized */}
      <section className="relative min-h-[50vh] md:min-h-[95vh] flex items-center pt-24 pb-12 md:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-105">
          <Image 
            src="/hero-bg.png" 
            alt="Vườn sầu riêng cà phê xanh tốt" 
            fill
            priority
            className="object-cover"
            sizes="100vw"
            {...({ fetchPriority: "high" } as any)}
          />
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/80 via-black/40 to-[#0d2a1c]/95" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Trust Proof Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2.5 rounded-full mb-10 animate-in fade-in slide-in-from-top duration-1000 shadow-2xl">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-emerald-900 bg-gray-400 overflow-hidden shadow-lg">
                       <img src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
               <span className="text-white text-[10px] md:text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2">
                  <Star size={14} className="text-[#f5a623]" fill="currentColor" />
                  Đã giúp 50.000+ vườn hồi sinh
               </span>
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black text-white mb-8 leading-[0.9] tracking-tighter animate-in slide-in-from-bottom duration-1000 delay-200 uppercase italic">
              {settings.heroTitle || "CỨU VƯỜN, GIỮ"} <br className="hidden md:block" />
              <span className="text-[#f5a623]">{settings.heroSubtitle ? "" : "VỤ MÙA TRÚNG LỚN"}</span>
            </h1>
            
            <p className="text-white/80 text-sm md:text-2xl font-medium mb-16 max-w-3xl mx-auto leading-relaxed animate-in fade-in duration-1000 delay-500 italic">
               Chẩn đoán bệnh cây chuẩn xác - Giải pháp phục hồi sinh học hàng đầu Tây Nguyên.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-in slide-in-from-bottom duration-1000 delay-700">
              <a 
                href={zaloUrl} 
                className="group relative px-12 md:px-16 py-6 bg-[#f5a623] hover:bg-[#fbb940] text-white rounded-2xl font-black text-sm md:text-2xl shadow-[0_20px_60px_-10px_rgba(245,166,35,0.6)] flex items-center justify-center gap-4 transition-all active:scale-95 animate-heartbeat"
              >
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
                Chụp Ảnh Vườn Gửi PBGT
              </a>
              <div className="flex flex-col items-center gap-2">
                 <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
                    <ShieldCheck className="text-emerald-400" size={24} />
                    <p className="text-white text-[10px] md:text-sm font-black uppercase tracking-widest">Tư vấn miễn phí 24/7</p>
                 </div>
                 <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Kỹ sư đồng hành suốt vụ mùa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
           <span className="text-white text-[9px] uppercase font-black tracking-[0.3em] vertical-text">Scroll</span>
           <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* 2. Authority & Trust Section */}
      <section className="bg-white py-16 md:py-24 border-y border-gray-100">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 max-w-6xl mx-auto">
               <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                     <Zap size={32} />
                  </div>
                  <div>
                     <h4 className="font-black text-gray-900 uppercase italic tracking-tighter text-lg">Phục hồi thần tốc</h4>
                     <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Rễ tơ ra sau 7-10 ngày</p>
                  </div>
               </div>
               <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                     <Award size={32} />
                  </div>
                  <div>
                     <h4 className="font-black text-gray-900 uppercase italic tracking-tighter text-lg">Kỹ sư thực chiến</h4>
                     <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Tư vấn tại vườn Đắk Lắk</p>
                  </div>
               </div>
               <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-600 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                     <ThumbsUp size={32} />
                  </div>
                  <div>
                     <h4 className="font-black text-gray-900 uppercase italic tracking-tighter text-lg">Hiệu quả bền vững</h4>
                     <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Sản phẩm sinh học chính hãng</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. Featured Products - Premium Presentation */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16 md:mb-24">
            <span className="text-[#f5a623] font-black uppercase tracking-[0.3em] text-[11px] mb-4">Premium Solutions</span>
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-6">Sản phẩm <span className="text-emerald-700 italic">chủ lực</span></h2>
            <div className="w-24 h-2 bg-[#f5a623] rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {loadingProducts ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[3/4] bg-gray-50 rounded-[2.5rem] animate-pulse" />
              ))
            ) : products.map((product, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] transition-all duration-700"
              >
                <Link href={`/san-pham/${product.slug}`} className="aspect-square bg-gray-50 relative overflow-hidden block">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img src={product.images?.[0] || '/product-placeholder.png'} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  
                  {/* Premium Glow Effect */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#f5a623]/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {product.originalPrice > product.price && (
                    <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] z-20 shadow-xl">Sale</div>
                  )}
                </Link>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <Link href={`/san-pham/${product.slug}`} className="block mb-4">
                    <h3 className="text-base md:text-xl font-black text-gray-900 line-clamp-2 leading-[1.2] group-hover:text-emerald-700 transition-colors uppercase italic tracking-tighter">{product.name}</h3>
                  </Link>
                  <div className="mb-8 flex items-end gap-3">
                    <p className="text-2xl md:text-3xl text-emerald-800 font-black tracking-tighter leading-none">{product.price?.toLocaleString()}đ</p>
                    {product.originalPrice > product.price && (
                      <p className="text-[11px] text-gray-400 line-through font-bold opacity-60 mb-1">{product.originalPrice?.toLocaleString()}đ</p>
                    )}
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-gray-50">
                    <Link 
                      href={`/san-pham/${product.slug}`}
                      className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
                    >
                      Chi tiết
                    </Link>
                    <a 
                      href={`https://zalo.me/${settings.zalo.replace(/\./g, '')}?text=${encodeURIComponent(`Tôi muốn tư vấn về sản phẩm: ${product.name}`)}`}
                      target="_blank"
                      className="bg-emerald-900 text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-800 shadow-xl shadow-emerald-100 transition-all active:scale-95"
                    >
                      Tư vấn ngay
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Diagnostic Solutions Section */}
      <section id="solutions" className="bg-gray-50 py-20 md:py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20 md:mb-32">
            <span className="bg-[#f5a623]/10 text-[#f5a623] px-6 py-1.5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] mb-8 inline-block shadow-sm">Diagnostic System</span>
            <h2 className="text-5xl md:text-[6rem] font-black text-gray-900 uppercase tracking-tighter mb-10 leading-[0.85]">
              Chẩn đoán <span className="text-red-600 italic">đúng bệnh</span> <br /> Phục hồi <span className="text-emerald-700 italic">đúng cách</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed italic">
              "Đừng bón phân khi chưa hiểu bệnh. Hãy dựa vào biểu hiện lá và rễ để có phác đồ phục hồi khoa học nhất."
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 max-w-7xl mx-auto">
            {!loadingPathologies ? (
              activePathologies.length > 0 ? activePathologies.map((pathology, idx) => (
                <DiseaseCard 
                  key={idx}
                  title={pathology.title}
                  slug={pathology.slug}
                  painPoint={pathology.painPoint}
                  image={pathology.image}
                />
              )) : (
                <p className="text-gray-400 text-center col-span-full">Đang cập nhật phác đồ...</p>
              )
            ) : (
              [1,2,3,4].map(i => (
                <div key={i} className="aspect-[3/4] bg-gray-200 rounded-[2.5rem] animate-pulse" />
              ))
            )}
          </div>

          {/* Expert Insight Block - Authority Accelerator */}
          <div className="mt-32 md:mt-48 max-w-6xl mx-auto bg-emerald-900 rounded-[3rem] md:rounded-[5rem] p-10 md:p-24 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(6,78,59,0.4)]">
             <div className="absolute top-0 right-0 p-16 opacity-[0.03] text-[20rem] rotate-12 select-none pointer-events-none">👨‍🔬</div>
             <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                <div className="relative shrink-0">
                  <div className="w-40 h-40 md:w-64 md:h-64 rounded-[3rem] border-8 border-white/10 overflow-hidden shadow-2xl relative z-10 transform -rotate-3">
                     <img src="https://i.pravatar.cc/400?img=68" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-[#f5a623] text-emerald-950 px-6 py-2 rounded-2xl font-black uppercase tracking-widest text-xs z-20 shadow-xl rotate-3">
                     Kỹ sư PBGT
                  </div>
                </div>
                <div>
                   <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-1.5 rounded-full mb-8">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400 font-black uppercase tracking-[0.2em] text-[10px]">Expert Insight</span>
                   </div>
                   <h3 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter mb-8 leading-tight">
                      "80% trường hợp vàng lá là do hỏng rễ. <span className="text-emerald-400">Đừng bón thêm phân</span> lúc này!"
                   </h3>
                   <div className="space-y-6 text-emerald-100/70 text-sm md:text-xl font-medium leading-relaxed italic border-l-4 border-emerald-500/30 pl-8">
                      <p>"Khi rễ tơ bị thối, cây không thể hấp thụ dinh dưỡng. Bón thêm phân lúc này chỉ làm đất thêm chua, rễ càng thối nhanh và cây sẽ chết lâm sàng trong vài tuần."</p>
                      <p>"Giải pháp duy nhất là: Diệt nấm rễ - Kích rễ tơ - Sau đó mới bổ sung dinh dưỡng nhẹ nhàng để cây hồi sức."</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. Video Guide & Knowledge Hub */}
      <section className="bg-white py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-24 md:mb-32">
             <div className="lg:w-1/2">
                <span className="text-[#f5a623] font-black uppercase tracking-[0.3em] text-[11px] mb-6 block">Practical Wisdom</span>
                <h2 className="text-4xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-[0.95] mb-8">
                  Kỹ thuật <span className="text-emerald-700 italic">Thực Chiến</span> <br /> Tại Vườn
                </h2>
                <p className="text-gray-500 text-lg md:text-xl font-medium mb-10 leading-relaxed italic">
                   Không chỉ là bán phân bón, chúng tôi đồng hành cùng bà con bằng những kiến thức thực tế nhất, giúp giảm chi phí và tăng năng suất bền vững.
                </p>
                <div className="flex flex-wrap gap-4">
                   <div className="bg-gray-50 px-6 py-4 rounded-2xl flex items-center gap-3 border border-gray-100">
                      <Zap className="text-emerald-600" size={20} />
                      <span className="font-black text-gray-800 uppercase text-xs">Mẹo phục hồi rễ</span>
                   </div>
                   <div className="bg-gray-50 px-6 py-4 rounded-2xl flex items-center gap-3 border border-gray-100">
                      <Zap className="text-emerald-600" size={20} />
                      <span className="font-black text-gray-800 uppercase text-xs">Phác đồ vàng lá</span>
                   </div>
                   <div className="bg-gray-50 px-6 py-4 rounded-2xl flex items-center gap-3 border border-gray-100">
                      <Zap className="text-emerald-600" size={20} />
                      <span className="font-black text-gray-800 uppercase text-xs">Cách bón phân hiệu quả</span>
                   </div>
                </div>
             </div>
             <div className="lg:w-1/2 w-full">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-emerald-100 rounded-[3rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
                  <div className="relative aspect-video rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl">
                     <LiteYouTube 
                        videoId="17SIPDywIXk" 
                        title="Hướng dẫn kỹ thuật thực tế" 
                     />
                  </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {loadingBlogs ? (
              [1, 2, 3].map(i => (
                <div key={i} className="aspect-[4/5] bg-gray-50 rounded-[2.5rem] animate-pulse" />
              ))
            ) : blogs.map((blog, idx) => (
              <KnowledgeCard 
                key={idx} 
                title={blog.title}
                excerpt={blog.excerpt}
                image={blog.image || 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=800&auto=format&fit=crop'}
                category={blog.category || 'Kỹ thuật'}
                slug={blog.slug}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Link href="/blog" className="inline-flex items-center gap-3 bg-emerald-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-800 transition-all shadow-xl active:scale-95">
                Vào thư viện kỹ thuật <ArrowRight size={18} />
             </Link>
          </div>
        </div>
      </section>

      {/* 6. High-Conversion CTA Section */}
      <section id="cta" className="bg-[#0d2a1c] py-24 md:py-48 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-[#f5a623]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto bg-white rounded-[3rem] md:rounded-[6rem] p-10 md:p-32 text-center shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)] overflow-hidden relative border border-white/20">
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#f5a623] via-yellow-400 to-[#f5a623]" />
            
            <span className="inline-flex items-center gap-3 text-emerald-700 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-10 bg-emerald-50 px-6 py-2 rounded-full">
               <BookOpen size={18} /> Tư vấn kỹ thuật miễn phí 24/7
            </span>
            
            <h2 className="text-4xl md:text-8xl font-black text-gray-900 mb-10 leading-[0.9] uppercase tracking-tighter italic">
              Vườn Anh Chị <br /> <span className="text-[#f5a623]">Đang Bị Suy Kiệt?</span>
            </h2>
            
            <p className="text-gray-500 text-base md:text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed italic">
               "Đừng để đất chết lâm sàng mới cứu. Gửi ảnh vườn ngay để kỹ sư PBGT chẩn đoán và đưa ra phác đồ hồi sinh miễn phí trong 15 phút."
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href={zaloUrl} className="w-full md:w-auto bg-[#f5a623] hover:bg-[#fbb940] text-white font-black px-12 py-6 rounded-3xl flex items-center justify-center gap-4 transition-all active:scale-95 shadow-[0_20px_50px_-10px_rgba(245,166,35,0.4)] text-base md:text-xl uppercase tracking-widest">
                <MessageCircle fill="currentColor" size={28} /> Chat Zalo Ngay
              </a>
              <a href={callUrl} className="w-full md:w-auto bg-white border-4 border-emerald-900/10 text-emerald-900 hover:bg-gray-50 font-black px-12 py-6 rounded-3xl flex items-center justify-center gap-4 transition-all active:scale-95 text-base md:text-xl uppercase tracking-widest">
                <Phone size={28} /> Hotline: {settings.phone}
              </a>
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 opacity-40">
               <ShieldCheck size={40} className="text-gray-400" />
               <MapPin size={40} className="text-gray-400" />
               <UserCheck size={40} className="text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Trust Section (FAQ) */}
      <section className="bg-white py-24 md:py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-16">
              <div className="w-16 h-16 bg-[#f5a623]/10 rounded-3xl flex items-center justify-center text-[#f5a623] shadow-inner">
                 <HelpCircle size={32} />
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter">Hỏi đáp <span className="text-[#f5a623]">nhà nông</span></h2>
            </div>
            
            <div className="space-y-4">
              <FAQItem 
                question="Tại sao PBGT không tư vấn mua phân hóa học ngay?"
                answer="Bởi vì PBGT tin vào sự bền vững. Khi cây đang yếu, bộ rễ đang bị nấm tấn công, việc tống thêm phân hóa học chỉ làm rễ thối nhanh hơn. Chúng tôi ưu tiên chẩn đoán bệnh, xử lý rễ sạch nấm và kích rễ tơ trước, sau đó mới đến bước bón phân để cây hấp thụ hiệu quả nhất."
              />
              <FAQItem 
                question="Làm sao để tôi biết giải pháp của PBGT có hiệu quả?"
                answer="Bà con có thể kiểm chứng bằng mắt thường sau 7-14 ngày thực hiện đúng phác đồ. Rễ tơ sẽ bắt đầu ra (trắng kem, mập mạp), đọt bắt đầu nhú và lá xanh trở lại. Nếu không thấy thay đổi, kỹ sư của chúng tôi sẽ hỗ trợ điều chỉnh phác đồ hoàn toàn miễn phí."
              />
              <FAQItem 
                question="PBGT có hỗ trợ kỹ thuật tận vườn không?"
                answer="Có, với khu vực Đắk Lắk và các vùng lân cận Tây Nguyên, đội ngũ kỹ sư của chúng tôi sẵn sàng xuống tận vườn để khảo sát thực tế và lấy mẫu đất chẩn đoán trong các trường hợp bệnh nặng hoặc vườn diện tích lớn."
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
