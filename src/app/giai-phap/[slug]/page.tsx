import { Metadata } from "next";
import { notFound } from "next/navigation";
import LeadForm from "@/components/shared/LeadForm";
import pathologies from "@/data/pathologies.json";
import products from "@/data/products.json";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Pathology {
  slug: string;
  title: string;
  painPoint: string;
  wrongAction: string;
  biologicalSolution: string;
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
    openGraph: {
      title: `${pathology.title} | Phân Bón Giá Tốt`,
      description: description,
      type: "article",
      images: [
        {
          url: "/images/default-og-share.jpg",
          width: 1200,
          height: 630,
          alt: pathology.title,
        },
      ],
    },
  };
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

      {/* Section 1.5: Video Phác Đồ (Ưu tiên load trước) */}
      <section className="py-12 bg-gray-50 border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-0 md:px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-3xl font-black text-[#1a5c2a] uppercase mb-8 px-4">Video Hướng Dẫn Phục Hồi Thực Tế</h2>
            <div className="aspect-video bg-black md:rounded-[2.5rem] overflow-hidden shadow-2xl relative group border-b-4 md:border-4 border-white ring-1 ring-gray-100">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="eager"
              ></iframe>
            </div>
            <div className="mt-6 mx-4 p-4 bg-emerald-100/50 rounded-2xl border border-emerald-200 flex items-center gap-4 text-left">
               <div className="w-10 h-10 bg-[#1a5c2a] text-white rounded-full flex items-center justify-center animate-pulse flex-shrink-0">▶</div>
               <p className="text-sm font-bold text-emerald-900 italic leading-snug">Kỹ sư hướng dẫn bà con cách nhận biết và xử lý {pathology.title.toLowerCase()} ngay tại vườn.</p>
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

      {/* Section 3.5: Sản Phẩm Khuyên Dùng (New from Directive 03) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                 <div className="w-12 h-12 bg-[#f5a623] text-white rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-orange-100">📦</div>
                 <h3 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tighter">Bộ giải pháp chuyên dụng</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {products.filter(p => p.relatedPathologies?.includes(slug)).map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/san-pham/${product.slug}`}
                      className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-8 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all group"
                    >
                       <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                          {product.icon}
                       </div>
                       <h4 className="text-lg font-black text-gray-900 mb-2 leading-tight group-hover:text-emerald-700 transition-colors">{product.name}</h4>
                       <p className="text-gray-500 text-xs font-medium line-clamp-2 mb-6 leading-relaxed">{product.description}</p>
                       <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                          Xem phác đồ chi tiết <ChevronRight size={14} />
                       </div>
                    </Link>
                 ))}
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
