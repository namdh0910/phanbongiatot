import { Metadata } from "next";
import { notFound } from "next/navigation";
import LeadForm from "@/components/shared/LeadForm";
import pathologies from "@/data/pathologies.json";
import products from "@/data/products.json";
import Link from "next/link";
import { ChevronRight, CheckCircle2, AlertTriangle, ShieldCheck, Zap, MessageCircle, Star, ShoppingBag } from "lucide-react";
import SchemaMarkup from "@/components/shared/SchemaMarkup";

interface Pathology {
  slug: string;
  title: string;
  painPoint: string;
  wrongAction: string;
  biologicalSolution: string;
  symptoms?: string[];
  cause?: string;
  steps?: { name: string; time: string; description: string; product: string }[];
  wrongActions?: string[];
  stats?: { successVouchers: string; recoveryTime: string };
  testimonials?: { name: string; location: string; quote: string }[];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const pathology = (pathologies as Pathology[]).find((p) => p.slug === slug);

  if (!pathology) {
    return {
      title: "Giải Pháp Nông Nghiệp | Phân Bón Giá Tốt",
    };
  }

  const description = pathology.painPoint.length > 160 
    ? pathology.painPoint.substring(0, 157) + "..." 
    : pathology.painPoint;

  return {
    title: `${pathology.title} | Phân Bón Giá Tốt`,
    description: description,
    alternates: {
      canonical: `/giai-phap/${slug}`,
    },
  };
}

export default async function SolutionDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const pathology = (pathologies as Pathology[]).find((p) => p.slug === slug);

  if (!pathology) {
    notFound();
  }

  const pathologyName = slug.includes('tuyen-trung') ? 'Tuyến trùng' : 
                        slug.includes('vang-la') ? 'Vàng lá thối rễ' : '';

  const videoId = slug === 'vang-la-thoi-re' ? 'WQGLo4yJjI0' : '8Idd0GyGA-4';

  // Schema Markup Generation
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (pathology.wrongActions || []).map(wa => ({
      "@type": "Question",
      "name": "Sai lầm thường gặp khi xử lý là gì?",
      "acceptedAnswer": { "@type": "Answer", "text": wa }
    }))
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Phác đồ phục hồi ${pathology.title}`,
    "step": (pathology.steps || []).map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.name,
      "text": step.description
    })),
    "totalTime": "P21D"
  };

  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup data={faqSchema} />
      <SchemaMarkup data={howToSchema} />

      {/* 1. HERO SECTION (PAIN) */}
      <section className="relative bg-gray-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-8 animate-pulse">
             CẢNH BÁO NGUY CẤP
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase italic leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
            {pathology.title}
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 font-bold max-w-3xl mx-auto italic leading-tight">
            "{pathology.painPoint}"
          </p>
        </div>
      </section>

      {/* 2. VIDEO SECTION (TRUST) */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-black text-[#1a5c2a] uppercase italic mb-10">Video Hướng Dẫn Thực Tế Tại Vườn</h2>
              <div className="aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white ring-1 ring-gray-200">
                <iframe 
                  src={`https://www.youtube.com/embed/${videoId}`} 
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
           </div>
        </div>
      </section>

      {/* 3. SYMPTOMS SECTION (DIAGNOSIS) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase italic mb-8 border-l-8 border-[#f5a623] pl-6">
                Vườn bà con có<br/>những dấu hiệu này?
              </h2>
              <div className="space-y-6">
                {(pathology.symptoms || pathology.painPoint.split('.')).map((sign, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="text-[#f5a623] flex-shrink-0 mt-1" size={24} />
                    <p className="text-xl font-bold text-gray-700 leading-tight">{sign.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
                 <img src="https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg" alt="Triệu chứng rễ" className="w-full h-full object-cover" />
               </div>
               <div className="aspect-square rounded-3xl overflow-hidden shadow-xl mt-8">
                 <img src="https://res.cloudinary.com/dztidbkhv/image/upload/v1776989073/phanbongiatot/y6imlcebopgmarsfpp8e.jpg" alt="Triệu chứng lá" className="w-full h-full object-cover" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAUSE SECTION (AUTHORITY) */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-8 text-[#f5a623]">Nguyên nhân gốc rễ là gì?</h2>
            <p className="text-xl md:text-3xl font-medium leading-relaxed text-gray-300 italic">
              {pathology.cause || pathology.painPoint}
            </p>
          </div>
        </div>
      </section>

      {/* 5. PROTOCOL SECTION (THE CURE) */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-black text-[#1a5c2a] uppercase italic">Phác đồ phục hồi 3 bước</h2>
            {pathology.stats && (
              <p className="mt-4 text-xl font-bold text-emerald-800 uppercase tracking-widest">
                Đã xử lý thành công cho {pathology.stats.successVouchers} nhà vườn - Phục hồi sau {pathology.stats.recoveryTime}
              </p>
            )}
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {(pathology.steps || []).map((step, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border-l-[12px] border-[#1a5c2a] flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 w-20 h-20 bg-[#1a5c2a] text-white rounded-3xl flex flex-col items-center justify-center font-black">
                   <span className="text-xs uppercase tracking-tighter">{step.time}</span>
                   <span className="text-3xl">0{i+1}</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{step.name}</h3>
                  <p className="text-lg text-gray-600 font-medium leading-tight mb-4">{step.description}</p>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full text-sm font-black uppercase">
                     <ShoppingBag size={14} /> SP Dùng: {step.product}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MISTAKES SECTION (THE TRAP) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-red-50 rounded-[3rem] p-8 md:p-16 border-2 border-red-100">
             <div className="flex items-center gap-4 mb-8 justify-center">
                <AlertTriangle className="text-red-600" size={48} />
                <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic">Bà con thường sai ở đâu?</h2>
             </div>
             <div className="space-y-6">
                {(pathology.wrongActions || [pathology.wrongAction]).map((wa, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-red-50">
                    <span className="text-red-600 font-black text-xl">✕</span>
                    <p className="text-lg font-bold text-gray-800 leading-tight">{wa}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS (SOCIAL PROOF) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black text-center text-gray-900 uppercase italic mb-16">Kết quả từ nhà vườn thực tế</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {(pathology.testimonials || []).map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-100 relative">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl">👤</div>
                    <div>
                       <h4 className="font-black text-gray-900 text-xl">{t.name}</h4>
                       <p className="text-emerald-600 font-bold text-sm uppercase">{t.location}</p>
                    </div>
                    <div className="ml-auto text-orange-400 flex">
                       {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                    </div>
                 </div>
                 <p className="text-gray-600 text-lg italic leading-relaxed">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION (LEAD CAPTURE) */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter">
                 Nhận phác đồ tư vấn riêng
               </h2>
               <p className="text-emerald-700 text-xl md:text-2xl mt-6 font-bold italic max-w-2xl mx-auto leading-tight">
                 "Vườn của bà con đang có những triệu chứng như trên phải không? Nhắn Zalo kỹ sư để nhận phác đồ riêng cho vườn mình miễn phí."
               </p>
            </div>
            <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-16 border border-gray-100">
               <LeadForm initialPathology={pathologyName} initialCrop="Sầu riêng" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
