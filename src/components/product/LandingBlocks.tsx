"use client";
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  Phone,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

// 1. Symptoms & Pain Points Block
export const ProductSymptoms = ({ symptoms }: { symptoms: string[] }) => {
  if (!symptoms || symptoms.length === 0) return null;
  return (
    <div className="bg-red-50/50 rounded-3xl p-6 md:p-10 border border-red-100/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
          <AlertTriangle size={20} />
        </div>
        <h3 className="text-xl md:text-3xl font-black text-gray-900 uppercase italic tracking-tighter">Cây Đang Gặp Tình Trạng Gì?</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {symptoms.map((s, i) => (
          <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-red-50 shadow-sm">
            <span className="text-red-500 mt-1">⚠️</span>
            <p className="font-bold text-gray-800 leading-tight">{s}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Usage Process Block
export const ProductUsage = ({ instructions }: { instructions: string }) => {
  if (!instructions) return null;
  return (
    <div className="bg-emerald-50/30 rounded-3xl p-6 md:p-10 border border-emerald-100/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
          <Zap size={20} />
        </div>
        <h3 className="text-xl md:text-3xl font-black text-gray-900 uppercase italic tracking-tighter">Quy Trình Sử Dụng Chuẩn</h3>
      </div>
      <div className="prose prose-emerald max-w-none prose-p:font-medium prose-strong:text-emerald-900" 
           dangerouslySetInnerHTML={{ __html: instructions.replace(/\n/g, '<br/>') }} />
    </div>
  );
};

// 3. Technical FAQ Block
export const ProductFAQ = ({ faqs }: { faqs: { question: string, answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-orange-100 text-[#f5a623] rounded-xl flex items-center justify-center">
          <HelpCircle size={20} />
        </div>
        <h3 className="text-xl md:text-3xl font-black text-gray-900 uppercase italic tracking-tighter">Giải Đáp Kỹ Thuật</h3>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-100 pb-4">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between text-left gap-4"
            >
              <span className="font-black text-gray-800 text-base md:text-lg tracking-tight">{faq.question}</span>
              <ChevronDown className={`text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} size={20} />
            </button>
            {openIndex === i && (
              <div className="mt-4 text-gray-600 font-medium leading-relaxed animate-in fade-in slide-in-from-top-1">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Expert Advice Block
export const ExpertAdvice = ({ advice }: { advice: string }) => {
  if (!advice) return null;
  return (
    <div className="bg-[#0d2a1c] text-white rounded-3xl p-6 md:p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-[0.05] select-none text-8xl italic font-black">EXPERT</div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
            <Info size={20} />
          </div>
          <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">Lời Khuyên Từ Kỹ Sư PBGT</h3>
        </div>
        <p className="text-emerald-100/90 text-base md:text-xl font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-6 py-2">
          "{advice}"
        </p>
      </div>
    </div>
  );
};

// 5. Trust Badges Block
export const ProductTrustBadges = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
      { icon: ShieldCheck, title: "CHÍNH HÃNG 100%", desc: "Nguồn gốc rõ ràng" },
      { icon: CheckCircle2, title: "HIỆU QUẢ THỰC TẾ", desc: "Đã kiểm chứng tại vườn" },
      { icon: MessageCircle, title: "HỖ TRỢ 24/7", desc: "Kỹ sư đồng hành" },
      { icon: Zap, title: "HÀNG SẴN KHO", desc: "Giao hỏa tốc toàn quốc" }
    ].map((item, i) => (
      <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center group hover:border-emerald-500 transition-colors">
        <item.icon className="text-emerald-600 mb-2 group-hover:scale-110 transition-transform" size={24} />
        <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none mb-1">{item.title}</h4>
        <p className="text-[8px] text-gray-400 font-bold uppercase">{item.desc}</p>
      </div>
    ))}
  </div>
);
