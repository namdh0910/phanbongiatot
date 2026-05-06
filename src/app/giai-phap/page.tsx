import React from 'react';
import Link from 'next/link';
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
  description: 'Tổng hợp phác đồ điều trị bệnh lý cây trồng: Vàng lá thối rễ, Tuyến trùng, Suy kiệt cây sau thu hoạch.',
};

export default async function SolutionsPage() {
  const pathologies = await getPathologies();

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <main className="pt-4 md:pt-20 pb-20">
        <div className="container mx-auto px-4">
          
          {/* 1. Compact & Clear Hero */}
          <div className="bg-[#0d2a1c] rounded-3xl md:rounded-[3rem] p-6 md:p-20 relative overflow-hidden mb-6 md:mb-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <span className="inline-block bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4">
                 🩺 KỸ SƯ NÔNG NGHIỆP 24/7
              </span>
              <h1 className="text-3xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4 italic">
                Thư viện <span className="text-[#f5a623]">Phác đồ</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-xl leading-relaxed max-w-xl opacity-80">
                Hệ thống quy trình xử lý bệnh lý rễ, phục hồi cây suy kiệt và tối ưu năng suất chuẩn kỹ thuật.
              </p>
            </div>
          </div>

          {/* 2. Grid of Solutions - 2 Columns on Mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {pathologies.map((item: any) => (
              <Link 
                key={item.slug} 
                href={`/giai-phap/${item.slug}`}
                className="group bg-white rounded-2xl md:rounded-[2.5rem] border border-gray-100 p-4 md:p-8 shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3 md:mb-6">
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-emerald-50 text-emerald-700 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      {item.icon || '🩺'}
                    </div>
                  </div>
                  
                  <h2 className="text-sm md:text-2xl font-black text-gray-900 mb-2 md:mb-4 leading-tight group-hover:text-emerald-700 transition-colors uppercase italic line-clamp-2">
                    {item.title}
                  </h2>
                  
                  <p className="hidden md:block text-gray-500 font-medium text-sm line-clamp-3 mb-8 leading-relaxed">
                    {item.painPoint}
                  </p>
                  
                  <div className="mt-auto pt-3 md:pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[8px] md:text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform">
                      Chi tiết <ChevronRight size={10} />
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
