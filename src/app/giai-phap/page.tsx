import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Zap, ShieldCheck, MessageCircle, Phone, Star } from 'lucide-react';
import dbConnect from '@/lib/db';
import mongoose from 'mongoose';

async function getPathologies() {
  try {
    await dbConnect();
    if (!mongoose.connection.db) return [];
    const pathologies = await mongoose.connection.db.collection('pathologies').find({}).toArray();
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
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-[#1a5c2a] to-[#2e7d32] rounded-[3rem] p-12 md:p-20 relative overflow-hidden mb-12 shadow-2xl shadow-emerald-900/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-3xl">
              <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Kỹ sư nông nghiệp 24/7</span>
              <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 italic">
                Thư viện <br />
                <span className="text-[#f5a623]">Giải pháp & Phác đồ</span>
              </h1>
              <p className="text-white/70 font-medium text-lg md:text-xl leading-relaxed max-w-xl">
                Hệ thống quy trình phục hồi cây trồng suy kiệt, xử lý bệnh lý rễ và tối ưu năng suất được kiểm chứng bởi đội ngũ kỹ sư thực địa.
              </p>
            </div>
          </div>

          {/* Grid of Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pathologies.map((item: any) => (
              <Link 
                key={item.slug} 
                href={`/giai-phap/${item.slug}`}
                className="group bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                      🩺
                    </div>
                    <span className="text-[10px] font-black text-[#f5a623] uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">
                      Phác đồ chuẩn
                    </span>
                  </div>
                  
                  <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors uppercase italic">
                    {item.title}
                  </h2>
                  
                  <p className="text-gray-500 font-medium text-sm line-clamp-3 mb-8 leading-relaxed">
                    {item.painPoint}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-2 transition-transform">
                      Xem giải pháp chi tiết <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Support Card */}
            <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 leading-tight">
                  Vườn bà con đang <br /> gặp vấn đề lạ?
                </h3>
                <p className="text-gray-400 text-sm mb-10 font-medium leading-relaxed">
                  Đừng tự ý xử lý sai cách làm cây suy kiệt nặng hơn. Gửi ngay ảnh vườn để kỹ sư chẩn đoán miễn phí.
                </p>
                <div className="space-y-3">
                  <a href="https://zalo.me/0773440966" target="_blank" className="flex items-center justify-center gap-3 w-full bg-[#0068ff] text-white py-4 rounded-2xl font-black text-sm active:scale-95 transition-transform">
                    <MessageCircle size={18} /> Chat Zalo Ngay
                  </a>
                  <a href="tel:0773440966" className="flex items-center justify-center gap-3 w-full bg-white text-gray-900 py-4 rounded-2xl font-black text-sm active:scale-95 transition-transform">
                    <Phone size={18} /> Gọi Kỹ Sư: 0773.440.966
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Section */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-20">
             <div className="text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Zap size={30} fill="currentColor" />
                </div>
                <h4 className="text-lg font-black text-gray-900 uppercase italic mb-3">Hiệu quả tức thì</h4>
                <p className="text-gray-500 text-sm font-medium">Quy trình tối ưu giúp cây hấp thụ dinh dưỡng ngay lập tức.</p>
             </div>
             <div className="text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                   <ShieldCheck size={30} />
                </div>
                <h4 className="text-lg font-black text-gray-900 uppercase italic mb-3">Chính hãng 100%</h4>
                <p className="text-gray-500 text-sm font-medium">Toàn bộ vật tư sử dụng đều từ các tập đoàn nông nghiệp uy tín.</p>
             </div>
             <div className="text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Star size={30} fill="currentColor" />
                </div>
                <h4 className="text-lg font-black text-gray-900 uppercase italic mb-3">Kỹ sư đồng hành</h4>
                <p className="text-gray-500 text-sm font-medium">Theo sát vườn từ lúc xử lý đến khi phục hồi hoàn toàn.</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
