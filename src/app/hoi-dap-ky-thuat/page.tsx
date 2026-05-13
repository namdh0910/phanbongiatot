"use client";

import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle,
  Phone
} from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CommunityQA from '@/components/community/CommunityQA';

export default function FAQPage() {
  return (
    <div className="bg-white min-h-screen">
      <Breadcrumbs items={[{ label: 'Hỏi đáp kỹ thuật', href: '/hoi-dap-ky-thuat' }]} />

      {/* Hero Section */}
      <section className="bg-gray-900 pt-10 md:pt-20 pb-20 md:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <HelpCircle size={14} /> Diễn đàn nông nghiệp PBGT
          </div>
          <h1 className="text-xl md:text-5xl font-black text-white mb-4 md:mb-8 uppercase tracking-tighter italic leading-[1.1]">
            Cộng đồng <br className="md:hidden" /> <span className="text-emerald-500">Hỏi đáp kỹ thuật</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-lg mb-8 max-w-2xl mx-auto font-medium">Bà con chia sẻ - Chuyên gia phản hồi - Nông nghiệp xanh bền vững</p>
        </div>
      </section>

      {/* Community Content */}
      <section className="py-6 md:py-20 -mt-8 md:-mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
             <div className="bg-white rounded-3xl md:rounded-[3rem] p-6 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-50">
                <CommunityQA />
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-emerald-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 select-none text-[200px] rotate-12">?</div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 md:mb-6">Chưa tìm thấy câu trả lời?</h2>
              <p className="text-emerald-100 text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto font-medium">Đừng ngần ngại, đội ngũ Phan Bón Giá Tốt luôn sẵn sàng hỗ trợ bà con 24/7 hoàn toàn miễn phí.</p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <a href="https://zalo.me/0339505050" className="w-full md:w-auto bg-[#0068FF] hover:bg-blue-600 text-white font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl">
                  <MessageCircle fill="currentColor" /> Chat Zalo PBGT
                </a>
                <a href="tel:0339505050" className="w-full md:w-auto bg-white text-emerald-900 font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl">
                  <Phone /> Gọi: 0339.505.050
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
