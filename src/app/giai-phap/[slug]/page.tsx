import { Metadata } from "next";
import { notFound } from "next/navigation";
import LeadForm from "@/components/shared/LeadForm";
import { API_BASE_URL } from '@/utils/api';
import Link from "next/link";
import { ChevronRight, CheckCircle2, AlertTriangle, ShieldCheck, Zap, MessageCircle, Star, ShoppingBag, Phone } from "lucide-react";
import SchemaMarkup from "@/components/shared/SchemaMarkup";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

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

import dbConnect from '@/lib/db';
import mongoose from 'mongoose';
import Product from '@/lib/models/Product';

async function getPathology(slug: string) {
  try {
    await dbConnect();
    if (!mongoose.connection.db) return null;
    const pathology = await mongoose.connection.db.collection('pathologies').findOne({ slug });
    return pathology ? JSON.parse(JSON.stringify(pathology)) : null;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

async function getPathologies() {
  try {
    await dbConnect();
    if (!mongoose.connection.db) return [];
    const pathologies = await mongoose.connection.db.collection('pathologies').find({}).toArray();
    return JSON.parse(JSON.stringify(pathologies));
  } catch (error) {
    return [];
  }
}

async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find({ status: 'approved' }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    return [];
  }
}

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pathology = await getPathology(slug);

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

export default async function SolutionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pathology = await getPathology(slug);
  const products = await getProducts();
  const allPathologies = await getPathologies();

  if (!pathology) {
    notFound();
  }

  const pathologyName = slug.includes('tuyen-trung') ? 'Tuyến trùng' : 
                        slug.includes('vang-la') ? 'Vàng lá thối rễ' : '';

  const videoId = pathology.videoId || '8Idd0GyGA-4';

  // Schema Markup Generation
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (pathology.wrongActions || []).map((wa: string) => ({
      "@type": "Question",
      "name": "Sai lầm thường gặp khi xử lý là gì?",
      "acceptedAnswer": { "@type": "Answer", "text": wa }
    }))
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Quy trình xử lý ${pathology.title}`,
    "step": (pathology.steps || []).map((step: any, i: number) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.name,
      "text": step.description
    })),
    "totalTime": "P21D"
  };

  const combinedSchema = [faqSchema, howToSchema];

  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup data={combinedSchema} />
      
      {/* 0. Breadcrumbs (Directive 03) */}
      <Breadcrumbs items={[
        { label: (pathology.slug.includes('sau-rieng') || pathology.title.includes('Sầu riêng')) ? 'Sầu riêng' : 
                 (pathology.slug.includes('ca-phe') || pathology.title.includes('Cà phê')) ? 'Cà phê' : 
                 (pathology.slug.includes('ho-tieu') || pathology.title.includes('Hồ tiêu')) ? 'Hồ tiêu' : 'Giải pháp', href: '/giai-phap' },
        { label: pathology.title }
      ]} />

      {/* 1. HERO SECTION - REFINED & MODERN */}
      <section className="relative pt-12 md:pt-24 pb-8 md:pb-16 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-orange-50/30"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-5 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
             <div className="flex items-center gap-2 mb-4 md:mb-6">
                <span className="h-[2px] w-6 md:w-8 bg-orange-500"></span>
                <span className="text-orange-600 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">Thông tin kỹ thuật chuyên sâu</span>
             </div>
             <h1 className="text-2xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-4 md:mb-6">
               {pathology.title}
             </h1>
             <div className="bg-gray-900/5 backdrop-blur-sm border-l-4 border-emerald-600 p-4 md:p-6 rounded-r-xl md:rounded-r-2xl mb-6 md:mb-8">
                <p className="text-sm md:text-lg text-gray-700 font-bold italic leading-relaxed">
                  "{pathology.painPoint}"
                </p>
             </div>
             <div className="flex flex-wrap gap-2 md:gap-3">
                <div className="bg-emerald-600 text-white px-4 py-1.5 md:px-5 md:py-2 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20">
                   Giải pháp sinh học
                </div>
                <div className="bg-white border border-gray-200 text-gray-500 px-4 py-1.5 md:px-5 md:py-2 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                   Tiết kiệm chi phí
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. VIDEO SECTION (TRUST) */}
      <section className="py-6 md:py-12 bg-white">
        <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4 md:mb-8">
                 <h2 className="text-lg md:text-2xl font-black text-gray-900 uppercase italic">Hướng dẫn thực tế</h2>
                 <div className="hidden md:flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                    <Zap size={14} fill="currentColor" /> Đã kiểm chứng hiệu quả
                 </div>
              </div>
              <div className="aspect-video bg-gray-900 rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100 relative group">
                {['WQGLo4yJjI0', 'dQw4w9WgXcQ'].includes(videoId) ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-900 to-[#1a5c2a]">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                      <Zap className="text-[#f5a623]" size={30} />
                    </div>
                    <h3 className="text-white text-lg font-black uppercase italic mb-1">Video đang cập nhật</h3>
                    <p className="text-gray-400 font-bold mb-8 text-[11px] uppercase tracking-widest">Đội ngũ PBGT đang thực hiện quay tại vườn...</p>
                    <a 
                      href="tel:0339505050" 
                      className="bg-white text-gray-900 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-2"
                    >
                      <Phone size={14} /> TƯ VẤN NGAY: 0339.505.050
                    </a>
                  </div>
                ) : (
                  <iframe 
                    src={`https://www.youtube.com/embed/${videoId}`} 
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
           </div>
        </div>
      </section>

      {/* 3. SYMPTOMS SECTION (DIAGNOSIS) */}
      <section className="py-10 md:py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-xl md:text-4xl font-black text-gray-900 uppercase italic mb-6 md:mb-8 text-center md:text-left">
                Dấu hiệu nhận biết<br/><span className="text-orange-600">trên vườn bà con</span>
              </h2>
              <div className="space-y-3 md:space-y-4">
                {(pathology.symptoms || pathology.painPoint.split('.')).map((sign: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 md:gap-4 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
                    <CheckCircle2 className="text-emerald-500 flex-shrink-0 mt-0.5 w-4 h-4 md:w-5 md:h-5" />
                    <p className="text-sm md:text-base font-bold text-gray-700 leading-tight">{sign.trim()}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
               <div className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                 <img src="https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg" alt="Triệu chứng rễ" className="w-full h-full object-cover" />
               </div>
               <div className="aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border-4 border-white mt-6 md:mt-12">
                 <img src="https://res.cloudinary.com/dztidbkhv/image/upload/v1776989073/phanbongiatot/y6imlcebopgmarsfpp8e.jpg" alt="Triệu chứng lá" className="w-full h-full object-cover" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAUSE SECTION (AUTHORITY) */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl md:rounded-[3rem] p-6 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl"></div>
            <h2 className="text-xl md:text-4xl font-black uppercase italic mb-4 md:mb-8 text-white">Nguyên nhân <span className="text-emerald-400">gốc rễ</span></h2>
            <p className="text-base md:text-2xl font-medium leading-relaxed text-gray-300 italic">
              {pathology.cause || pathology.painPoint}
            </p>
          </div>
        </div>
      </section>

      {/* 5. PROTOCOL SECTION (THE CURE) */}
      <section className="py-10 md:py-20 bg-emerald-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-black text-gray-900 uppercase italic">Quy trình xử lý chuẩn</h2>
            {pathology.stats && (
              <p className="mt-2 md:mt-4 text-[8px] md:text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                Đã thành công trên {pathology.stats.successVouchers} vườn • Hiệu quả sau {pathology.stats.recoveryTime}
              </p>
            )}
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
            {(pathology.steps || []).map((step: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl md:rounded-[2.5rem] p-4 md:p-12 shadow-xl border-l-[8px] md:border-l-[12px] border-[#1a5c2a] flex flex-col md:flex-row gap-4 md:gap-8 items-center">
                <div className="flex-shrink-0 w-12 h-12 md:w-20 md:h-20 bg-[#1a5c2a] text-white rounded-xl md:rounded-3xl flex flex-col items-center justify-center font-black">
                   <span className="text-[8px] md:text-xs uppercase tracking-tighter">{step.time}</span>
                   <span className="text-xl md:text-3xl">0{i+1}</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg md:text-2xl font-black text-gray-900 mb-1 md:mb-2">{step.name}</h3>
                  <p className="text-sm md:text-lg text-gray-600 font-medium leading-tight mb-3 md:mb-4">{step.description}</p>
                  {typeof step.product === 'object' && step.product !== null ? (
                    <Link 
                      href={`/san-pham/${step.product.slug}`} 
                      className="group inline-flex items-center gap-2 md:gap-3 bg-emerald-50 text-emerald-700 px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl text-[10px] md:text-sm font-black uppercase hover:bg-emerald-700 hover:text-white transition-all shadow-sm border border-emerald-100"
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 border border-emerald-200">
                        <img src={step.product.images?.[0] || '/og-image.png'} className="w-full h-full object-contain p-1" alt={step.product.name} />
                      </div>
                      <div className="flex flex-col items-start leading-tight">
                        <span className="text-[8px] opacity-60">Vật tư:</span>
                        <span className="line-clamp-1">{step.product.name}</span>
                      </div>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform ml-1 md:ml-2" />
                    </Link>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-[9px] md:text-sm font-black uppercase">
                       <ShoppingBag size={12} /> SP Dùng: {step.product || 'Đang cập nhật'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MISTAKES SECTION (THE TRAP) */}
      <section className="py-10 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-red-50 rounded-2xl md:rounded-[3rem] p-6 md:p-16 border-2 border-red-100">
             <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 justify-center text-center">
                <AlertTriangle className="text-red-600 w-8 h-8 md:w-12 md:h-12" />
                <h2 className="text-xl md:text-4xl font-black text-gray-900 uppercase italic">Bà con thường sai ở đâu?</h2>
             </div>
             <div className="space-y-4 md:space-y-6">
                {(pathology.wrongActions || [pathology.wrongAction]).map((wa: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl md:rounded-2xl shadow-sm border border-red-50">
                    <span className="text-red-600 font-black text-lg md:text-xl">✕</span>
                    <p className="text-sm md:text-lg font-bold text-gray-800 leading-tight">{wa}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS (SOCIAL PROOF) */}
      <section className="py-10 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-5xl font-black text-center text-gray-900 uppercase italic mb-10 md:mb-16">Kết quả từ nhà vườn thực tế</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {(pathology.testimonials || []).map((t: any, i: number) => (
              <div key={i} className="bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-lg border border-gray-100 relative">
                 <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center text-xl md:text-3xl">👤</div>
                    <div>
                       <h4 className="font-black text-gray-900 text-base md:text-xl">{t.name}</h4>
                       <p className="text-emerald-600 font-bold text-[10px] md:text-sm uppercase">{t.location}</p>
                    </div>
                    <div className="ml-auto text-orange-400 flex">
                       {[1,2,3,4,5].map(s => <Star key={s} size={12} className="md:w-4 md:h-4" fill="currentColor" />)}
                    </div>
                 </div>
                 <p className="text-sm md:text-lg text-gray-600 italic leading-relaxed">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION (LEAD CAPTURE) */}
      <section className="py-10 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
               <h2 className="text-2xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter">
                 Nhận hướng dẫn riêng
               </h2>
               <p className="text-emerald-700 text-sm md:text-2xl mt-4 md:mt-6 font-bold italic max-w-2xl mx-auto leading-tight">
                 "Vườn của bà con đang có triệu chứng như trên? Nhắn Zalo PBGT để nhận quy trình xử lý riêng miễn phí."
               </p>
            </div>
            <div className="bg-white rounded-2xl md:rounded-[3rem] shadow-2xl p-6 md:p-16 border border-gray-100">
               <LeadForm initialPathology={pathologyName} initialCrop="Sầu riêng" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Related Solutions (Directive 03) */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tight">Các giải pháp kỹ thuật khác</h3>
            <Link href="/giai-phap" className="text-emerald-700 font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform">Tất cả giải pháp ➔</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allPathologies
              .filter((p: any) => p.slug !== pathology.slug && 
                ((pathology.slug.includes('sau-rieng') && p.slug.includes('sau-rieng')) ||
                 (pathology.slug.includes('ca-phe') && p.slug.includes('ca-phe')) ||
                 (pathology.slug.includes('ho-tieu') && p.slug.includes('ho-tieu'))))
              .slice(0, 2)
              .map((p: any) => (
                <Link key={p.slug} href={`/giai-phap/${p.slug}`} className="bg-white border border-gray-100 p-8 rounded-[2rem] hover:shadow-xl transition-all group">
                  <h4 className="font-black text-gray-900 text-lg mb-3 leading-tight group-hover:text-emerald-700">{p.title}</h4>
                  <p className="text-gray-500 text-sm line-clamp-2 font-medium mb-4">{p.painPoint}</p>
                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Xem quy trình xử lý ➔</div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* 7. Final Consultation CTA */}
      <section className="bg-emerald-900 py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6">Bà con cần hỗ trợ ngay?</h2>
          <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">Đừng để vườn suy kiệt thêm nữa. Nhắn Zalo ngay để chúng tôi xem ảnh vườn và hỗ trợ miễn phí.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href={`https://zalo.me/0339505050`} className="bg-[#0068FF] px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all">Nhắn Zalo PBGT</a>
            <a href="tel:0339505050" className="bg-white text-emerald-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all">Gọi Hotline: 0339.505.050</a>
          </div>
        </div>
      </section>
    </div>
  );
}
