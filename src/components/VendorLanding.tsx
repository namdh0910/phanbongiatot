"use client";
import React from 'react';
import Link from 'next/link';
import { useSettings } from "@/context/SettingsContext";

const VendorLanding: React.FC = () => {
  const settings = useSettings();

  const steps = [
    { id: 1, title: "Đăng ký", desc: "Chỉ mất 2 phút để tạo hồ sơ gian hàng", icon: "📝" },
    { id: 2, title: "Duyệt hồ sơ", desc: "Hệ thống phê duyệt nhanh trong 24h", icon: "🛡️" },
    { id: 3, title: "Đăng sản phẩm", desc: "Đưa giải pháp của bạn lên hệ thống", icon: "🌱" },
    { id: 4, title: "Nhận đơn & Tiền", desc: "Hệ thống tự động báo đơn & đối soát", icon: "💰" }
  ];

  const benefits = [
    { title: "Hoa hồng hấp dẫn", desc: "Mức chiết khấu lên đến 25%, cao nhất thị trường phân bón sinh học.", icon: "💎" },
    { title: "Hỗ trợ Marketing", desc: "Sản phẩm được quảng bá trên hệ thống Facebook/YouTube 500k follow.", icon: "🚀" },
    { title: "Dashboard thông minh", desc: "Quản lý đơn hàng, doanh thu, tồn kho theo thời gian thực.", icon: "📊" },
    { title: "Kỹ sư đồng hành", desc: "Đội ngũ kỹ sư hỗ trợ tư vấn kỹ thuật trực tiếp cho khách của bạn.", icon: "👨‍🔬" }
  ];

  return (
    <div className="bg-white">
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0d2a1c]">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full mb-8 animate-fade-in">
             <span className="text-orange-400 font-black text-xs uppercase tracking-[0.3em]">Cơ hội hợp tác 2024</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter italic">
            BÁN HÀNG CÙNG<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">5.000+ NHÀ VƯỜN</span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100/80 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Kết nối trực tiếp giải pháp nông nghiệp của bạn với mạng lưới nhà vườn lớn nhất Việt Nam. 
            Tăng trưởng doanh thu đột phá cùng hệ thống vận hành tự động.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/kenh-nguoi-ban/dang-ky" className="group bg-[#ee4d2d] text-white px-12 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-orange-900/40 hover:bg-[#ff5722] transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
              ĐĂNG KÝ NGAY
              <span className="group-hover:translate-x-2 transition-transform">➜</span>
            </Link>
            <Link href="/kenh-nguoi-ban/dang-nhap" className="bg-white text-[#1a5c2a] px-12 py-5 rounded-[2rem] font-black text-xl shadow-xl hover:bg-gray-50 transition-all hover:scale-105 active:scale-95">
              ĐĂNG NHẬP
            </Link>
            <a href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}`} target="_blank" className="bg-white/10 backdrop-blur-md text-white px-12 py-5 rounded-[2rem] font-black text-xl border border-white/20 hover:bg-white/20 transition-all">
              TƯ VẤN B2B
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="text-white font-black text-lg">VIETTEL POST</div>
             <div className="text-white font-black text-lg">GHTK</div>
             <div className="text-white font-black text-lg">VNPAY</div>
             <div className="text-white font-black text-lg">MOMO</div>
          </div>
        </div>
      </section>

      {/* 4-Step Visual Process */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase italic">Quy trình bắt đầu đơn giản</h2>
            <p className="text-gray-500 text-lg">Chỉ mất chưa đầy 24h để sản phẩm của bạn xuất hiện trên kệ hàng</p>
          </div>
          
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-emerald-100 -translate-y-1/2 -z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((step) => (
                <div key={step.id} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-3 transition-all duration-500 group">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center text-4xl mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500 shadow-inner">
                    {step.icon}
                  </div>
                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2">Bước 0{step.id}</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight italic">TẠI SAO CHỌN<br /><span className="text-emerald-600">CHÚNG TÔI?</span></h2>
              <p className="text-gray-500 text-xl mb-12 leading-relaxed">
                Chúng tôi không chỉ cung cấp nền tảng, chúng tôi cung cấp giải pháp tăng trưởng toàn diện cho doanh nghiệp nông nghiệp của bạn.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-3xl">{benefit.icon}</div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1">{benefit.title}</h4>
                      <p className="text-gray-500 text-sm leading-snug">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full max-w-md">
              <div className="bg-emerald-900 p-12 rounded-[4rem] text-white relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(6,78,59,0.3)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-black mb-8 italic uppercase leading-tight">Số liệu<br />tăng trưởng</h3>
                  <div className="space-y-10">
                    <div>
                      <div className="text-5xl font-black text-orange-400 mb-2">150+</div>
                      <div className="text-emerald-200 font-bold uppercase tracking-widest text-xs">Đại lý đang hoạt động</div>
                    </div>
                    <div>
                      <div className="text-5xl font-black text-orange-400 mb-2">63</div>
                      <div className="text-emerald-200 font-bold uppercase tracking-widest text-xs">Tỉnh thành phủ sóng</div>
                    </div>
                    <div>
                      <div className="text-5xl font-black text-orange-400 mb-2">500k+</div>
                      <div className="text-emerald-200 font-bold uppercase tracking-widest text-xs">Lượt theo dõi hệ thống</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase italic">Nhà vườn & Đối tác nói gì?</h2>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-sm">Hơn cả một nền tảng bán hàng</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-md p-12 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-3xl font-black">HT</div>
                <div>
                  <h4 className="font-black text-xl">Chú Hùng</h4>
                  <p className="text-emerald-400 font-medium">Nhà vườn Sầu Riêng (Đắk Lắk)</p>
                </div>
              </div>
              <p className="text-gray-300 italic text-lg leading-relaxed mb-8">
                "Hệ thống giúp tôi tìm được phân bón chuẩn, giá gốc mà lại có kỹ sư tư vấn tận vườn. Tôi đã giới thiệu cho cả hợp tác xã cùng dùng."
              </p>
              <div className="flex text-orange-400">⭐⭐⭐⭐⭐</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md p-12 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-black">DL</div>
                <div>
                  <h4 className="font-black text-xl">Anh Minh</h4>
                  <p className="text-blue-400 font-medium">Đại lý Phân bón (Tây Ninh)</p>
                </div>
              </div>
              <p className="text-gray-300 italic text-lg leading-relaxed mb-8">
                "Từ khi đăng ký gian hàng, doanh số của tôi tăng vọt. Khách hàng tin tưởng hơn nhờ dashboard minh bạch và hỗ trợ từ tổng đài."
              </p>
              <div className="flex text-orange-400">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#ee4d2d] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-7xl font-black mb-10 leading-tight tracking-tighter uppercase italic">BẮT ĐẦU KINH DOANH<br />CÙNG CHÚNG TÔI NGAY</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/kenh-nguoi-ban/dang-ky" className="bg-white text-[#ee4d2d] px-16 py-6 rounded-full font-black text-2xl shadow-2xl hover:scale-105 transition-all active:scale-95">
              ĐĂNG KÝ MIỄN PHÍ
            </Link>
            <div className="text-xl font-bold flex flex-col items-center md:items-start">
               <span className="text-orange-200 uppercase text-xs tracking-widest mb-1">Hỗ trợ đối tác 24/7</span>
               <a href="tel:0773440966" className="text-white underline text-2xl font-black">0773.440.966</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorLanding;
