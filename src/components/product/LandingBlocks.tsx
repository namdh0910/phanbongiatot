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
  Info,
  Clock,
  TrendingUp,
  Search,
  ArrowRight
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

// 6. Diagnostic Symptom Checker (PREMIUM)
export const DiagnosticSection = ({ items }: { items: { symptom: string, root_cause: string }[] }) => (
  <div className="bg-white rounded-3xl p-6 md:p-12 border-2 border-orange-100 shadow-xl shadow-orange-50/50">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-12">
      <div>
        <span className="text-orange-600 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2 block italic">Hệ thống chẩn đoán nhanh</span>
        <h3 className="text-2xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">
          Dấu Hiệu Đất Đang <br/> <span className="text-red-600">"CHẾT LÂM SÀNG"</span>
        </h3>
      </div>
      <div className="hidden md:block w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-5xl animate-pulse">🩺</div>
    </div>
    
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="group p-5 md:p-8 bg-gray-50 rounded-2xl md:rounded-[2rem] border border-gray-100 hover:bg-white hover:border-orange-200 transition-all">
          <div className="flex gap-4 md:gap-6">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-red-500 font-black text-xs md:text-lg shrink-0">!</div>
            <div>
              <h4 className="text-base md:text-2xl font-black text-gray-900 mb-2 md:mb-3 tracking-tight group-hover:text-orange-700 transition-colors">{item.symptom}</h4>
              <div className="flex items-start gap-2 text-gray-500 font-medium text-xs md:text-lg italic leading-relaxed">
                <span className="text-emerald-600 shrink-0 font-black">→ Lý do:</span>
                <span>{item.root_cause}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 7. Authority Recovery Timeline
export const RecoveryTimeline = ({ steps, title, sub }: { steps: { day: string, effect: string, icon: string }[], title?: string, sub?: string }) => (
  <div className="bg-[#0d2a1c] text-white rounded-[3rem] p-8 md:p-20 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
    <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none text-9xl font-black italic">TIMELINE</div>
    <div className="relative z-10">
      <div className="max-w-2xl mb-12 md:mb-20">
        <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter leading-tight mb-6">
          {title || "Lộ trình hồi sinh vườn sau xử lý"}
        </h3>
        <p className="text-emerald-100/60 font-medium text-sm md:text-xl">{sub || "Cam kết hiệu quả nhìn thấy bằng mắt thường theo từng giai đoạn kỹ thuật."}</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-16 md:gap-16">
        {steps.map((step, i) => (
          <div key={i} className="relative flex-1">
            {i < steps.length - 1 && <div className="hidden md:block absolute top-10 left-full w-full border-t-2 border-dashed border-emerald-800 z-0"></div>}
            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 text-white rounded-3xl flex flex-col items-center justify-center shadow-xl shadow-emerald-900/50 mb-8 md:mb-10">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-80 leading-none mb-1">Ngày</span>
                <span className="text-xl md:text-3xl font-black leading-none">{step.day.replace('Ngày ', '')}</span>
              </div>
              <h4 className="text-xl md:text-2xl font-black mb-3 md:mb-4 uppercase italic tracking-tight text-emerald-400 leading-tight flex items-center gap-2">
                 {step.icon}
              </h4>
              <p className="text-emerald-100/80 font-medium text-sm md:text-lg leading-relaxed px-4 md:px-0">{step.effect}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 8. Performance CTA
export const PerformanceCTA = ({ title, sub, btnText, href }: { title: string, sub: string, btnText: string, href: string }) => (
  <div className="bg-[#f5a623] rounded-[3rem] p-8 md:p-20 text-center text-white shadow-2xl shadow-orange-200">
    <h3 className="text-2xl md:text-7xl font-black uppercase italic tracking-tighter leading-tight md:leading-[0.9] mb-6 md:mb-10">
      {title}
    </h3>
    <p className="text-white/80 font-bold text-sm md:text-2xl mb-8 md:mb-16 max-w-3xl mx-auto italic leading-relaxed">
      "{sub}"
    </p>
    <a 
      href={href} 
      className="inline-flex items-center gap-4 bg-white text-orange-600 px-10 md:px-20 py-5 md:py-8 rounded-[2rem] md:rounded-[3rem] font-black uppercase tracking-widest text-xs md:text-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
    >
      {btnText} <ArrowRight size={24} />
    </a>
    <div className="mt-8 md:mt-12 flex items-center justify-center gap-6 opacity-60">
       <div className="flex items-center gap-2 text-[8px] md:text-xs font-black uppercase tracking-widest">
         <ShieldCheck size={14} /> Kỹ sư hỗ trợ 24/7
       </div>
       <div className="flex items-center gap-2 text-[8px] md:text-xs font-black uppercase tracking-widest">
         <Clock size={14} /> Xử lý ngay trong ngày
       </div>
    </div>
  </div>
);
