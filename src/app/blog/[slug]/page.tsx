import { API_BASE_URL } from '@/utils/api';
import Link from "next/link";
import { Clock, User, Share2, ArrowLeft, Play, Camera, MessageCircle, ChevronRight } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import LeadForm from "@/components/shared/LeadForm";
import products from "@/data/products.json";
import SchemaMarkup from "@/components/shared/SchemaMarkup";

async function getBlog(slug: string) {
  try {
    // Standardizing slug handling for Vietnamese URLs
    const res = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (error) {
    // Fallback logic for demo/build
    return {
      title: "Hành trình phục hồi 5ha Sầu riêng suy kiệt tại Đắk Nông",
      excerpt: "Từ vườn cây vàng lá trơ cành, sau 3 tháng áp dụng phác đồ phục hồi sinh học rễ đã bung trắng xóa.",
      content: "<p>Nội dung chi tiết đang được cập nhật. Kỹ sư đã sử dụng bộ đôi Humic K-Max và Nemano để xử lý tuyến trùng trước khi kích rễ...</p><h2>Bước 1: Xử lý nền đất</h2><p>Đất tại vườn bị chai cứng, pH thấp...</p>",
      image: "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg",
      videoUrl: "https://www.youtube.com/embed/8Idd0GyGA-4",
      category: "Nhật ký phục hồi vườn",
      createdAt: new Date().toISOString(),
      tags: ["sau-rieng", "phuc-hoi"]
    };
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Bài viết kỹ thuật | Phân Bón Giá Tốt" };
  
  return {
    title: `${blog.title} | Thư viện kỹ thuật | Phân Bón Giá Tốt`,
    description: blog.excerpt || blog.title,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      images: [blog.image]
    },
  };
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const paramsData = await params;
  const slug = paramsData?.slug;
  const blog = await getBlog(slug);

  if (!blog) return <div className="text-center py-20 font-black uppercase">Không tìm thấy bài viết</div>;

  // Auto-Related Products Logic
  const blogTags = (blog.tags || []).map((t: string) => t.toLowerCase());
  const blogCat = (blog.category || "").toLowerCase();
  
  const relatedProducts = products.filter(p => 
    p.tags.some(tag => {
      const t = tag.toLowerCase();
      return blogTags.some((bt: string) => t.includes(bt) || bt.includes(t)) || blogCat.includes(t) || t.includes(blogCat);
    })
  ).slice(0, 3);

  const displayedProducts = relatedProducts.length > 0 ? relatedProducts : products.slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.image,
    "author": {
      "@type": "Organization",
      "name": "Kỹ sư Phân Bón Giá Tốt"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Phân Bón Giá Tốt",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.phanbongiatot.com/logo.png"
      }
    },
    "datePublished": blog.createdAt,
    "dateModified": blog.updatedAt || blog.createdAt
  };

  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup data={articleSchema} />
      {/* 1. Progress Bar / Header */}
      <div className="pt-[calc(56px+env(safe-area-inset-top))] pb-4 md:pt-24 md:pb-8 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs items={[
              { label: 'Thư viện kỹ thuật', href: '/blog' },
              { label: blog.category, href: `/blog?cat=${blog.category}` },
              { label: 'Chi tiết' }
            ]} />
            
            <h1 className="text-xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 mt-3 leading-tight tracking-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-bold text-gray-500">
               <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm text-xs md:text-sm">
                  <User size={14} className="text-emerald-600" /> Kỹ sư Phân Bón Giá Tốt
               </span>
               <span className="flex items-center gap-2 text-xs md:text-sm"><Clock size={14} /> {new Date(blog.createdAt).toLocaleDateString('vi-VN')}</span>
               <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest">{blog.category}</span>
            </div>

            {/* Video-First Section - Repositioned to be above-the-fold */}
            {blog.videoUrl && (
              <div className="mt-8 mb-4">
                 <div className="relative aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 md:border-4 border-white ring-1 ring-gray-200">
                    <iframe 
                      src={`${blog.videoUrl}${blog.videoUrl.includes('?') ? '&' : '?'}autoplay=1&mute=1&rel=0&playsinline=1`}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="eager"
                    ></iframe>
                 </div>
                 
                 {/* Zalo Hook - High conversion CTA directly under video */}
                 <div className="mt-4 md:mt-6">
                    <a 
                      href={`https://zalo.me/0773440966?text=${encodeURIComponent(`Chào kỹ sư, tôi vừa xem video về cách chữa ${blog.title} và muốn nhận phác đồ cho vườn ở [Tỉnh của tôi] của tôi.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#0068FF] hover:bg-blue-600 text-white py-4 md:py-6 rounded-2xl font-black text-sm md:text-lg uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-100 transition-all active:scale-95 animate-heartbeat"
                    >
                       <span className="text-xl md:text-2xl">💬</span> 
                       Nhận phác đồ như video này
                    </a>
                    <div className="mt-3 flex items-center justify-center gap-2 text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">
                       <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                       Kỹ sư đang trực tuyến hỗ trợ bà con
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
          {/* MAIN CONTENT AREA */}
          <div className="lg:flex-1 min-w-0">
            {!blog.videoUrl && (
               <div className="-mx-4 md:mx-0 mb-8 md:mb-16 md:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] md:aspect-auto">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
               </div>
            )}

            {/* SEO Content */}
            <article 
              className="prose prose-emerald prose-base md:prose-xl max-w-none text-gray-700 leading-relaxed 
              prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tighter
              prose-h2:text-xl md:text-3xl prose-h2:mt-10 md:prose-h2:mt-16 prose-h2:mb-4 md:prose-h2:mb-8 prose-h2:bg-emerald-50 prose-h2:p-4 md:prose-h2:p-6 prose-h2:rounded-xl md:prose-h2:rounded-2xl prose-h2:border-l-4 md:prose-h2:border-l-8 prose-h2:border-emerald-600
              prose-img:rounded-2xl md:prose-img:rounded-[2.5rem] prose-img:shadow-xl
              prose-strong:text-gray-900 prose-strong:font-black"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Hashtags Display (Directive 04) */}
            {blog.hashtags && blog.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12">
                {blog.hashtags.map((tag: string) => (
                  <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-100">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Social Share Bottom */}
            <div className="mt-12 py-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center">
                     <Share2 size={18} />
                  </div>
                  <h4 className="font-black text-gray-900 uppercase italic text-sm">Chia sẻ kỹ thuật</h4>
               </div>
               <div className="flex gap-2 w-full md:w-auto">
                  <button className="flex-1 md:flex-none bg-[#1877F2] text-white px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Facebook</button>
                  <button className="flex-1 md:flex-none bg-[#0068FF] text-white px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Zalo</button>
               </div>
            </div>

            {/* Auto Related Products Widget */}
            <div className="mt-20">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-[#f5a623] text-white rounded-xl flex items-center justify-center text-xl shadow-lg">📦</div>
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase italic tracking-tight">Sản phẩm khuyên dùng cho vườn</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {displayedProducts.map((product: any) => (
                    <Link 
                      key={product.id} 
                      href={`/san-pham/${product.slug}`}
                      className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                    >
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                        {product.icon}
                      </div>
                      <h4 className="font-black text-gray-900 mb-2 leading-tight group-hover:text-emerald-700 transition-colors">{product.name}</h4>
                      <p className="text-gray-500 text-xs line-clamp-2 mb-4 font-medium">{product.description}</p>
                      <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                        Xem chi tiết <ChevronRight size={12} />
                      </div>
                    </Link>
                  ))}
               </div>
            </div>

            {/* Final Lead Form */}
            <div className="mt-24 p-10 bg-gray-50 rounded-[3rem] border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none text-[150px] rotate-12">👨‍🌾</div>
               <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tighter mb-6">
                     Vườn bà con đang gặp <br /> tình trạng tương tự?
                  </h3>
                  <p className="text-gray-600 text-lg mb-10 font-medium">Để lại thông tin, Kỹ sư sẽ gọi lại tư vấn phác đồ chuẩn nhất cho vườn nhà mình.</p>
                  <LeadForm initialPathology={blog.category} initialCrop="Sầu riêng" />
               </div>
            </div>
          </div>

          {/* SIDEBAR CTA AREA */}
          <aside className="lg:w-[380px] flex-shrink-0">
            <div className="sticky top-28 space-y-8">
               {/* Primary Conversion Box */}
               <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                  <div className="relative z-10">
                     <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4 block">Hỗ trợ khẩn cấp</span>
                     <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                        Gửi Ảnh Vườn <br /> Nhận Chẩn Đoán <br /> <span className="text-emerald-500">Từ Kỹ Sư 24/7</span>
                     </h3>
                     
                     <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
                           <div className="w-6 h-6 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center flex-shrink-0"><Camera size={14} /></div>
                           Chụp cận cảnh lá & rễ cây
                        </div>
                        <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
                           <div className="w-6 h-6 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center flex-shrink-0"><MessageCircle size={14} /></div>
                           Gửi qua Zalo Kỹ Thuật
                        </div>
                     </div>

                     <a href="https://zalo.me/0773440966" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/50 transition-all active:scale-95">
                        Bấm để nhắn Zalo ngay <ChevronRight size={16} />
                     </a>
                  </div>
               </div>

               {/* Related Pathology Box */}
               <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                  <h4 className="font-black text-gray-900 uppercase italic tracking-tight mb-6">Phác đồ liên quan</h4>
                  <div className="space-y-6">
                     <Link href="/giai-phap/vang-la-thoi-re" className="flex items-center gap-4 group">
                        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-red-600 group-hover:text-white transition-all">⚠️</div>
                        <div>
                           <p className="font-black text-gray-900 text-sm line-clamp-2">Trị Vàng lá thối rễ</p>
                           <span className="text-[9px] font-black text-emerald-600 uppercase">Xem giải pháp ➔</span>
                        </div>
                     </Link>
                     <Link href="/giai-phap/tuyen-trung-suy-re" className="flex items-center gap-4 group">
                        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-red-600 group-hover:text-white transition-all">🛡️</div>
                        <div>
                           <p className="font-black text-gray-900 text-sm line-clamp-2">Tiêu diệt Tuyến trùng</p>
                           <span className="text-[9px] font-black text-emerald-600 uppercase">Xem giải pháp ➔</span>
                        </div>
                     </Link>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
