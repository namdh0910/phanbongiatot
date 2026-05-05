"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  HelpCircle
} from 'lucide-react';
import { API_BASE_URL } from '@/utils/api';
import { useSettings } from '@/context/SettingsContext';

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

const SolutionCard = ({ title, image, description }: any) => (
  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
    <div className="aspect-[4/3] overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
        <h3 className="text-white font-black text-xl leading-tight">{title}</h3>
      </div>
    </div>
    <div className="p-6">
      <p className="text-gray-600 text-sm mb-6 line-clamp-3 font-medium leading-relaxed">
        {description}
      </p>
      <Link href="/blog" className="inline-flex items-center gap-2 text-[#1a5c2a] font-black uppercase tracking-wider text-xs group-hover:gap-3 transition-all">
        Tìm Hiểu Kỹ Thuật <ArrowRight size={16} />
      </Link>
    </div>
  </div>
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
  const settings = useSettings() || {
    hotline: '0773.440.966',
    zalo: '0773440966',
    phone: '0773.440.966',
    siteName: 'Phân Bón Giá Tốt',
    address: 'Khu vực hỗ trợ: Đắk Lắk, Đắk Nông, Gia Lai, Lâm Đồng'
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Fetch real blogs
    fetch(`${API_BASE_URL}/blogs`)
      .then(res => res.json())
      .then(data => {
        let results = [];
        if (Array.isArray(data)) results = data;
        else if (data?.blogs) results = data.blogs;
        setBlogs(results.slice(0, 3));
      })
      .catch(() => setBlogs([]))
      .finally(() => setLoadingBlogs(false));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const zaloUrl = `https://zalo.me/${settings.zalo.replace(/\./g, '')}`;
  const callUrl = `tel:${settings.hotline.replace(/\./g, '')}`;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-emerald-100 selection:text-[#1a5c2a]">
      
      {/* 1. Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className={`font-black text-2xl tracking-tighter transition-colors ${scrolled ? 'text-[#1a5c2a]' : 'text-white'}`}>
              PhânBón<span className="text-[#f5a623]">GiáTốt</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: 'Giải Pháp', href: '#solutions' },
              { name: 'Kiến Thức', href: '/blog' },
              { name: 'Tư Vấn Kỹ Thuật', href: '#cta' },
              { name: 'Liên Hệ', href: '#footer' }
            ].map((item) => (
              <Link key={item.name} href={item.href} className={`font-bold text-sm hover:text-[#f5a623] transition-colors ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>
                {item.name}
              </Link>
            ))}
            <a href={callUrl} className="bg-[#f5a623] hover:bg-[#fbb940] text-white px-6 py-2.5 rounded-2xl font-black text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-orange-200">
              <Phone size={18} /> Gọi Kỹ Sư
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-gray-900 bg-gray-100' : 'text-white bg-white/20'}`}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white animate-in fade-in duration-300">
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-12">
              <span className="font-black text-2xl text-[#1a5c2a]">PhânBón<span className="text-[#f5a623]">GiáTốt</span></span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-xl"><X /></button>
            </div>
            <nav className="flex flex-col gap-6">
              {[
                { name: 'Giải Pháp', href: '#solutions' },
                { name: 'Kiến Thức', href: '/blog' },
                { name: 'Tư Vấn Kỹ Thuật', href: '#cta' },
                { name: 'Liên Hệ', href: '#footer' }
              ].map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-gray-800 flex items-center justify-between border-b border-gray-100 pb-4">
                  {item.name} <ChevronRight className="text-gray-300" />
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-10 flex flex-col gap-4">
              <a href={callUrl} className="w-full bg-[#f5a623] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3">
                <Phone /> Gọi Ngay: {settings.phone}
              </a>
              <a href={zaloUrl} className="w-full border-2 border-emerald-600 text-emerald-700 font-black py-5 rounded-2xl flex items-center justify-center gap-3">
                <MessageCircle /> Chat Zalo Kỹ Thuật
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. Hero Section - Targeted Agricultural Solution */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background Image with 40% Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Vườn sầu riêng cà phê xanh tốt" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/60 via-black/40 to-[#0d2a1c]/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#f5a623] text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-in slide-in-from-top duration-700">
              <ShieldCheck size={14} /> Chẩn đoán bệnh cây chuẩn 100%
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tight animate-in slide-in-from-bottom duration-700 delay-100 uppercase">
              CỨU VƯỜN SẦU RIÊNG, CÀ PHÊ <br className="hidden md:block" />
              <span className="text-[#f5a623]">VÀNG LÁ, SUY RỄ</span>
            </h1>
            
            <h2 className="text-xl md:text-3xl text-white/95 mb-12 max-w-3xl mx-auto font-bold leading-relaxed animate-in slide-in-from-bottom duration-700 delay-200">
              Phục Hồi Nhanh Dàn Lá, Bung Rễ Trắng Chỉ Sau 7 Ngày.
            </h2>
            
            <div className="flex flex-col items-center gap-6 animate-in slide-in-from-bottom duration-700 delay-300">
              <a 
                href={zaloUrl} 
                className="group relative px-8 md:px-12 h-20 bg-[#f5a623] hover:bg-[#fbb940] text-white rounded-2xl font-black text-lg md:text-xl shadow-2xl flex items-center justify-center gap-4 transition-all active:scale-95 animate-heartbeat"
              >
                <MessageCircle size={28} fill="currentColor" />
                Chụp Ảnh Vườn Gửi Kỹ Sư Chẩn Đoán Ngay
              </a>
              <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Tư vấn miễn phí qua Zalo 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust Badges */}
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

      {/* 4. Core Solutions */}
      <section id="solutions" className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">
              Giải Pháp <span className="text-[#1a5c2a]">Chuyên Sâu</span>
            </h2>
            <div className="w-20 h-2 bg-[#f5a623] rounded-full" />
            <p className="mt-6 text-gray-500 max-w-xl font-medium">
              Chúng tôi tập trung xử lý dứt điểm các vấn đề nan giải nhất của nhà nông khu vực Tây Nguyên.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <SolutionCard 
              title="Phục Hồi Cây Suy Giảm"
              image="https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=800&auto=format&fit=crop"
              description="Phác đồ đặc biệt phục hồi cây sau thu hoạch hoặc cây bị suy kiệt do sâu bệnh. Kích rễ mới, xanh lá thần tốc."
            />
            <SolutionCard 
              title="Xử Lý Tuyến Trùng Rễ"
              image="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"
              description="Giải pháp sinh học tiêu diệt tuyến trùng và nấm Phytophthora gây thối rễ, vàng lá trên Sầu riêng và Cà phê."
            />
            <SolutionCard 
              title="Chống Sốc & Giữ Trái"
              image="https://images.unsplash.com/photo-1615485240388-1473b6339cc0?q=80&w=800&auto=format&fit=crop" 
              description="Kỹ thuật cân bằng dinh dưỡng giúp cây giữ trái chắc chắn, hạn chế rụng sinh lý trong điều kiện thời tiết khắc nghiệt."
            />
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
              <a href={zaloUrl} className="w-full md:w-auto bg-[#0068FF] hover:bg-blue-600 text-white font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-200">
                <MessageCircle fill="currentColor" /> Chat Zalo Ngay
              </a>
              <a href={callUrl} className="w-full md:w-auto bg-[#1a5c2a] hover:bg-emerald-800 text-white font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-emerald-200">
                <Phone /> Gọi: {settings.phone}
              </a>
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

      {/* 8. Footer */}
      <footer id="footer" className="bg-gray-900 text-white pt-20 pb-24 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16 border-b border-white/10 pb-16">
            <div>
              <Link href="/" className="inline-block mb-8">
                <span className="font-black text-3xl tracking-tighter">
                  PhânBón<span className="text-[#f5a623]">GiáTốt</span>
                </span>
              </Link>
              <p className="text-gray-400 font-medium leading-relaxed mb-8">
                Nền tảng chia sẻ kiến thức kỹ thuật và cung cấp giải pháp nông nghiệp chuyên biệt cho cây trồng vùng cao nguyên.
              </p>
            </div>

            <div>
              <h4 className="font-black text-xl mb-8">Liên Hệ</h4>
              <ul className="space-y-6 text-gray-400">
                <li className="flex items-start gap-4">
                  <MapPin className="text-[#f5a623] shrink-0" size={20} />
                  <span>{settings.address}</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="text-[#f5a623] shrink-0" size={20} />
                  <span className="text-white font-black">{settings.phone}</span>
                </li>
                <li className="flex items-center gap-4">
                  <MessageCircle className="text-[#f5a623] shrink-0" size={20} />
                  <span>Zalo: {settings.zalo}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-xl mb-8">Liên Kết Nhanh</h4>
              <ul className="space-y-4">
                {['Tài liệu kỹ thuật', 'Đặt lịch tư vấn', 'Giới thiệu', 'Kết quả nhà vườn'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors">
                      <ChevronRight size={14} className="text-[#f5a623] group-hover:translate-x-1 transition-transform" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm font-bold">
            <p>© 2026 {settings.siteName}. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>

      {/* 9. Sticky Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 flex p-2 gap-2 h-16">
        <a 
          href={zaloUrl} 
          className="flex-1 bg-[#0068FF] text-white rounded-xl font-black flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-100 px-2"
        >
          <MessageCircle size={18} fill="currentColor" /> Gửi ảnh qua Zalo
        </a>
        <a 
          href={callUrl} 
          className="flex-1 bg-[#ee4d2d] text-white rounded-xl font-black flex items-center justify-center gap-2 text-sm shadow-lg shadow-red-100 px-2"
        >
          <Phone size={18} /> Gọi Kỹ Sư
        </a>
      </div>

    </div>
  );
}
