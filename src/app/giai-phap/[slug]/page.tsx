import { notFound } from "next/navigation";
import LeadForm from "@/components/shared/LeadForm";
import pathologies from "@/data/pathologies.json";

interface Pathology {
  slug: string;
  title: string;
  painPoint: string;
  wrongAction: string;
  biologicalSolution: string;
}

export default async function SolutionDetail({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const pathology = (pathologies as Pathology[]).find((p) => p.slug === slug);

  if (!pathology) {
    notFound();
  }

  // Pre-mapping pathology name for LeadForm select
  const pathologyName = slug.includes('tuyen-trung') ? 'Tuyến trùng' : 
                        slug.includes('vang-la') ? 'Vàng lá thối rễ' : '';

  return (
    <div className="bg-white min-h-screen">
      {/* Section 1: Hero Banner (Pain) */}
      <section className="bg-[#111] py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 animate-pulse">
               🚨 CẢNH BÁO NGUY CẤP
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white uppercase italic leading-[0.9] tracking-tighter mb-8">
              {pathology.title}
            </h1>
            <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 max-w-2xl">
               <span className="text-4xl">⚠️</span>
               <p className="text-xl md:text-2xl text-gray-300 font-bold leading-tight italic">
                 "{pathology.painPoint}"
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Bóc Trần Sai Lầm (The Trap) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-orange-50 rounded-[3rem] border-2 border-orange-200 p-8 md:p-16 relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white w-20 h-20 rounded-full border-2 border-orange-200 flex items-center justify-center text-4xl">
              ❌
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic text-center mb-8">
              Sai lầm chí mạng bà con hay mắc phải:
            </h2>
            <p className="text-lg md:text-2xl text-orange-900 font-bold leading-relaxed text-center italic">
              {pathology.wrongAction}
            </p>
            <div className="mt-8 pt-8 border-t border-orange-200 text-center">
               <p className="text-orange-700 text-sm font-black uppercase tracking-widest">Hệ quả: Cây suy kiệt, nấm bệnh bùng phát, mất trắng vườn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Phác Đồ Phục Hồi Hữu Cơ (The Cure) */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-5xl mb-4">🌿</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#1a5c2a] uppercase italic tracking-tight leading-none">
                Giải Pháp Phục Hồi Sinh Học Từ Kỹ Sư:
              </h2>
            </div>
            
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-xl shadow-green-100/50 border border-green-100">
               <div className="prose prose-xl prose-green max-w-none">
                  <ul className="space-y-6">
                    {pathology.biologicalSolution.split('.').filter(s => s.trim()).map((step, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-[#1a5c2a] text-white rounded-full flex items-center justify-center font-black text-sm mt-1">
                          {i + 1}
                        </span>
                        <p className="text-lg md:text-2xl font-bold text-gray-800 leading-tight">
                          {step.trim()}.
                        </p>
                      </li>
                    ))}
                  </ul>
               </div>
               
               <div className="mt-12 p-8 bg-green-50 rounded-2xl border border-green-100 border-dashed">
                  <p className="text-[#1a5c2a] font-black uppercase italic tracking-widest text-center">
                    Ưu tiên: Trichoderma, Humic, Fulvic, Nemano - Tuyệt đối không thuốc hóa học
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Chốt Chặn Bắt Bệnh (Lead Capture) */}
      <section className="py-20 md:py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tight">
                 Nhận Phác Đồ Tư Vấn Riêng Cho Vườn Bà Con
               </h2>
               <p className="text-gray-500 text-lg mt-4 font-medium">
                 Kỹ sư sẽ gọi lại ngay để hướng dẫn bà con cách xử lý {pathologyName.toLowerCase()} chuẩn nhất.
               </p>
            </div>
            <LeadForm initialPathology={pathologyName} initialCrop="Sầu riêng" />
          </div>
        </div>
      </section>

      {/* Mobile Sticky Zalo/Call Bar is handled by global StickyCTA component */}
    </div>
  );
}
