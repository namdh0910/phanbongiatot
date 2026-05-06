import React from 'react';
import Link from 'next/link';
import { ChevronRight, Zap, ShieldCheck, MessageCircle, Phone, Star } from 'lucide-react';
import Pathology from '@/lib/models/Pathology';
import dbConnect from '@/lib/db';

export const revalidate = 0;

async function getPathologies() {
  try {
    await dbConnect();
    const pathologies = await Pathology.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(pathologies));
  } catch (error) {
    console.error('Error fetching pathologies:', error);
    return [];
  }
}

export const metadata = {
  title: 'Giải Pháp Nông Nghiệp | Phân Bón Giá Tốt',
  description: 'Tổng hợp giải pháp phục hồi bệnh lý cây trồng: Vàng lá thối rễ, Tuyến trùng, Suy kiệt cây sau thu hoạch.',
};

export default async function SolutionsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const pathologies = await getPathologies();
  
  const filteredPathologies = category 
    ? pathologies.filter((p: any) => p.category === category)
    : pathologies;

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <main className="pt-4 md:pt-20 pb-20">
        <div className="container mx-auto px-4">
          
          {/* HERO SECTION - REFINED */}
          <div className="bg-gradient-to-br from-[#0a2e12] to-[#1a5c2a] rounded-[2.5rem] p-8 md:p-16 text-white mb-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10 text-emerald-300">
                <Zap size={14} className="fill-current" /> Hỗ trợ kỹ thuật 24/7
              </div>
              <h1 className="text-xl md:text-6xl font-bold uppercase leading-tight tracking-tighter mb-6">
                Thư viện <span className="text-emerald-400">Giải Pháp</span>
              </h1>
              <p className="text-base md:text-xl text-emerald-100/80 font-medium leading-relaxed italic">
                Hệ thống quy trình xử lý bệnh lý rễ, phục hồi cây suy kiệt và tối ưu năng suất chuẩn thực tế tại vườn.
              </p>
            </div>
          </div>

          {/* 2. Grid of Solutions - 2 Columns on Mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {filteredPathologies.map((item: any) => (
              <Link 
                key={item.slug} 
                href={`/giai-phap/${item.slug}`}
                className="group bg-white rounded-2xl md:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col"
              >
                {/* Image or Icon Section */}
                <div className="relative h-32 md:h-56 bg-emerald-50 overflow-hidden">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl md:text-6xl group-hover:scale-110 transition-transform">
                      {item.icon || '🩺'}
                    </div>
                  )}
                  <div className="absolute top-2 left-2 md:top-4 md:left-4">
                    <span className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[8px] md:text-[10px] font-black uppercase tracking-widest text-emerald-700 shadow-sm border border-emerald-100">
                      Quy trình chuẩn
                    </span>
                  </div>
                </div>

                <div className="p-3 md:p-8 flex flex-col flex-1">
                  <h2 className="text-[8px] md:text-2xl font-medium text-gray-800 mb-2 md:mb-4 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2 lowercase first-letter:uppercase">
                    {item.title}
                  </h2>
                  
                  <p className="hidden md:block text-gray-500 font-medium text-sm line-clamp-3 mb-6 leading-relaxed">
                    {item.painPoint}
                  </p>
                  
                  <div className="mt-auto pt-2 md:pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[8px] md:text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Xem chi tiết <ChevronRight size={10} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Support Card - Integrated into Grid */}
            <div className="bg-gray-900 rounded-2xl md:rounded-[2.5rem] p-5 md:p-10 text-white relative overflow-hidden flex flex-col justify-center border border-emerald-500/20 col-span-2 md:col-span-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-base md:text-2xl font-black uppercase italic tracking-tighter mb-2 md:mb-4 leading-tight">
                  Vấn đề lạ? <br className="hidden md:block" /> Gửi ảnh ngay
                </h3>
                <p className="text-gray-400 text-[10px] md:text-sm mb-4 md:mb-10 font-medium leading-relaxed opacity-80">
                  Kỹ sư chẩn đoán miễn phí qua Zalo 24/7.
                </p>
                <div className="flex flex-col gap-2">
                  <a href="https://zalo.me/0773440966" target="_blank" className="flex items-center justify-center gap-2 w-full bg-[#0068ff] text-white py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm active:scale-95 transition-transform">
                    <MessageCircle size={14} /> Zalo Ngay
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Trust Banner - Running Horizontal Marquee */}
          <div className="mt-12 md:mt-24 border-t border-gray-100 pt-10 md:pt-20 overflow-hidden">
             <div className="relative flex overflow-x-hidden">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-12 py-4">
                   {[
                      { icon: <Zap size={18} fill="currentColor" />, text: "HIỆU QUẢ TỨC THÌ", desc: "Quy trình tối ưu hấp thụ ngay" },
                      { icon: <ShieldCheck size={18} />, text: "CHÍNH HÃNG 100%", desc: "Vật tư uy tín toàn cầu" },
                      { icon: <Star size={18} fill="currentColor" />, text: "KỸ SƯ ĐỒNG HÀNH", desc: "Theo sát vườn đến khi phục hồi" }
                   ].map((trust, i) => (
                      <div key={i} className="flex items-center gap-3 bg-emerald-50/50 px-6 py-3 rounded-full border border-emerald-100">
                         <div className="text-emerald-700">{trust.icon}</div>
                         <div>
                            <div className="text-[10px] md:text-xs font-black text-gray-900 uppercase italic leading-none mb-1">{trust.text}</div>
                            <div className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">{trust.desc}</div>
                         </div>
                      </div>
                   ))}
                   {/* Duplicate for seamless loop */}
                   {[
                      { icon: <Zap size={18} fill="currentColor" />, text: "HIỆU QUẢ TỨC THÌ", desc: "Quy trình tối ưu hấp thụ ngay" },
                      { icon: <ShieldCheck size={18} />, text: "CHÍNH HÃNG 100%", desc: "Vật tư uy tín toàn cầu" },
                      { icon: <Star size={18} fill="currentColor" />, text: "KỸ SƯ ĐỒNG HÀNH", desc: "Theo sát vườn đến khi phục hồi" }
                   ].map((trust, i) => (
                      <div key={`dup-${i}`} className="flex items-center gap-3 bg-emerald-50/50 px-6 py-3 rounded-full border border-emerald-100">
                         <div className="text-emerald-700">{trust.icon}</div>
                         <div>
                            <div className="text-[10px] md:text-xs font-black text-gray-900 uppercase italic leading-none mb-1">{trust.text}</div>
                            <div className="text-[8px] md:text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">{trust.desc}</div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
