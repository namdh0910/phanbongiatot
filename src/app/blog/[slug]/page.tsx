
import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import LeadForm from '@/components/shared/LeadForm';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  Share2, 
  MessageCircle, 
  Phone, 
  ChevronRight, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Camera,
  Star,
  Award,
  AlertTriangle,
  HelpCircle,
  ThumbsUp,
  MapPin
} from 'lucide-react';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';
import Product from '@/lib/models/Product';
import TableOfContents from '@/components/blog/TableOfContents';
import { cleanExpertContent } from '@/utils/tableRepair';
import Script from 'next/script';

// --- DATA FETCHING ---
async function getBlog(slug: string) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug }).lean();
    return blog ? JSON.parse(JSON.stringify(blog)) : null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

async function getRelatedBlogs(category: string, currentSlug: string) {
  try {
    await dbConnect();
    const blogs = await Blog.find({ 
      category: category, 
      slug: { $ne: currentSlug },
      isPublished: true
    }).limit(3).lean();
    return JSON.parse(JSON.stringify(blogs)) || [];
  } catch (error) {
    return [];
  }
}

async function getFeaturedProducts() {
  try {
    await dbConnect();
    const products = await Product.find({ isFeatured: true }).limit(3).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    return [];
  }
}

// --- STYLE SYSTEM ---
const globalBlogStyles = `
  article.prose {
    line-height: 1.85 !important;
    color: #334155 !important;
    font-size: 1.125rem !important; /* 18px */
    max-width: 100% !important;
  }
  article.prose p { margin-bottom: 2rem !important; }
  article.prose h2 {
    font-size: 2.25rem !important;
    line-height: 1.2 !important;
    margin-top: 4.5rem !important;
    margin-bottom: 2rem !important;
    color: #0f172a !important;
    font-weight: 900 !important;
    letter-spacing: -0.04em !important;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  article.prose h2::before {
    content: ''; display: block; width: 8px; height: 40px; background: #059669; border-radius: 4px;
  }
  article.prose h3 {
    font-size: 1.75rem !important;
    line-height: 1.3 !important;
    margin-top: 3.5rem !important;
    margin-bottom: 1.25rem !important;
    font-weight: 800 !important;
    color: #1e293b !important;
  }
  .prose .expert-insight {
    background: #f0fdf4 !important;
    border-left: 6px solid #059669 !important;
    padding: 2.5rem !important;
    border-radius: 2rem !important;
    margin: 3.5rem 0 !important;
  }
  .prose .warning-callout {
    background: #fef2f2 !important;
    border: 1px solid #fee2e2 !important;
    padding: 2.5rem !important;
    border-radius: 2rem !important;
    margin: 3.5rem 0 !important;
  }
  .prose table {
    width: 100% !important;
    border-collapse: separate !important;
    margin: 3.5rem 0 !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 24px !important;
    overflow: hidden !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05) !important;
  }
  .prose th { background: #f8fafc !important; padding: 1.5rem !important; font-weight: 800 !important; }
  .prose td { padding: 1.5rem !important; border-bottom: 1px solid #f1f5f9 !important; }
  .prose img { border-radius: 2.5rem !important; margin: 4rem 0 !important; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1) !important; }
  .diagnosis-card {
    background: white; border: 2px solid #f1f5f9; border-radius: 2.5rem; padding: 2.5rem; margin-bottom: 4rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.02);
  }
  .article-cta {
    background: #0d2a1c; border-radius: 3rem; padding: 3.5rem; color: white; margin-top: 5rem; text-align: center; position: relative; overflow: hidden;
  }
`;

function StyleInjector() {
  return <style dangerouslySetInnerHTML={{ __html: globalBlogStyles }} />;
}

// --- MAIN COMPONENT ---
export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const relatedBlogs = await getRelatedBlogs(blog.category, blog.slug);
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="bg-white min-h-screen">
      <StyleInjector />
      
      <main className="pb-20 md:pb-32 pt-24 md:pt-32">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-7xl mx-auto">
            <Breadcrumbs items={[
              { label: 'Kiến thức', href: '/blog' },
              { label: blog?.category || 'Nông nghiệp', href: `/blog?category=${encodeURIComponent(blog?.category || '')}` },
              { label: blog?.title || 'Bài viết' }
            ]} />
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-7xl mx-auto">
            {/* CONTENT AREA */}
            <div className="lg:w-2/3 xl:w-[70%]">
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {blog.category}
                  </span>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                    <Calendar size={14} />
                    {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString('vi-VN') : 'Mới cập nhật'}
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.05] tracking-tighter mb-10">
                  {blog.title}
                </h1>

                {blog.coverImage ? (
                  <div className="aspect-[21/9] w-full rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 border-8 border-gray-50/50">
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="aspect-[21/9] w-full rounded-[3rem] bg-emerald-900/5 flex items-center justify-center border-4 border-dashed border-emerald-100">
                    <span className="text-emerald-300 font-black italic opacity-20">Kỹ Thuật Nông Nghiệp PBGT</span>
                  </div>
                )}
              </header>

              {/* ARTICLE BODY */}
              <article 
                id="expert-content-root"
                className="prose prose-emerald prose-lg md:prose-xl max-w-3xl mx-auto selection:bg-emerald-100"
                style={{ wordBreak: 'normal', overflowWrap: 'break-word', hyphens: 'none' }}
                dangerouslySetInnerHTML={{ __html: cleanExpertContent(blog.content) }}
              />

              {/* CLEANUP SCRIPT */}
              <Script id="cleanup-script" strategy="afterInteractive">
                {`
                  (function() {
                    function clean() {
                      var root = document.getElementById('expert-content-root');
                      if (root) root.innerHTML = root.innerHTML.replace(/[\\n\\r\\t]+/g, '');
                    }
                    clean();
                    setTimeout(clean, 500);
                  })();
                `}
              </Script>

              {/* FINAL CTA */}
              <div className="article-cta">
                 <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl rotate-12">👨‍🌾</div>
                 <h3 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                    Cây vườn anh chị <br /> đang bị suy kiệt?
                 </h3>
                 <p className="text-emerald-100/70 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto italic">
                    "Đừng để đất chết lâm sàng mới cứu. Hãy nhắn tin ngay để kỹ sư PBGT tư vấn phác đồ hồi sinh vườn miễn phí."
                 </p>
                 <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
                    <a href="https://zalo.me/0773440966" className="bg-emerald-500 hover:bg-emerald-400 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl transition-all">Tư vấn Zalo 24/7</a>
                    <a href="tel:0773440966" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all">Gọi kỹ sư ngay</a>
                 </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="lg:w-1/3 xl:w-[30%]">
              <div className="sticky top-32 space-y-12">
                {/* Authority Profile */}
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">👨‍🔬</div>
                      <div>
                         <h4 className="font-black text-gray-900 uppercase italic text-sm">Kỹ sư Trần Văn Tốt</h4>
                         <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">12 năm kinh nghiệm</span>
                      </div>
                   </div>
                   <p className="text-xs font-medium text-gray-500 leading-relaxed italic border-l-2 border-emerald-500 pl-4">
                      "Kiến thức nông nghiệp là để chia sẻ. Tôi mong muốn mỗi bài viết giúp bà con giảm chi phí, tăng năng suất bền vững."
                   </p>
                </div>

                {/* Table of Contents */}
                <div className="space-y-6 px-4">
                  <h3 className="text-lg font-black text-gray-900 uppercase italic tracking-tighter flex items-center gap-2">
                    <span className="w-1 h-5 bg-emerald-500 rounded-full" />
                    Mục lục bài viết
                  </h3>
                  <TableOfContents content={blog.content} />
                </div>

                {/* Send Garden Photo CTA */}
                <div className="bg-gray-900 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                   <div className="relative z-10">
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                         Gửi Ảnh Vườn <br /> Nhận Chẩn Đoán <br /> <span className="text-emerald-500">Từ PBGT 24/7</span>
                      </h3>
                      <div className="space-y-4 mb-8">
                         <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
                            <div className="w-6 h-6 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center"><Camera size={14} /></div>
                            Chụp lá & rễ cây bị suy
                         </div>
                         <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
                            <div className="w-6 h-6 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center"><MessageCircle size={14} /></div>
                            Gửi qua Zalo cho Kỹ Thuật
                         </div>
                      </div>
                      <a href="https://zalo.me/0773440966" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all">
                         Bấm gửi ảnh ngay <ChevronRight size={16} />
                      </a>
                   </div>
                </div>

                {/* Related Solutions */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100">
                   <h4 className="font-black text-gray-900 uppercase italic tracking-tight mb-8">Giải pháp tin dùng</h4>
                   <div className="space-y-6">
                      <Link href="/san-pham/phan-bon-huu-co-sicobi-20-om-fuvico" className="flex items-center gap-4 group">
                         <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">📦</div>
                         <div>
                            <p className="font-black text-gray-900 text-sm line-clamp-2 uppercase italic tracking-tighter italic leading-tight">Sicobi 20% OM</p>
                            <span className="text-[9px] font-black text-emerald-600 uppercase">Phục hồi rễ ➔</span>
                         </div>
                      </Link>
                      <Link href="/giai-phap/vang-la-thoi-re" className="flex items-center gap-4 group">
                         <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-red-600 group-hover:text-white transition-all">⚠️</div>
                         <div>
                            <p className="font-black text-gray-900 text-sm line-clamp-2 uppercase italic tracking-tighter italic leading-tight">Trị Vàng Lá</p>
                            <span className="text-[9px] font-black text-emerald-600 uppercase">Xem phác đồ ➔</span>
                         </div>
                      </Link>
                   </div>
                </div>
              </div>
            </aside>
          </div>

          {/* BOTTOM RELATED BLOGS */}
          {relatedBlogs && relatedBlogs.length > 0 && (
            <div className="mt-32 pt-24 border-t border-gray-100 max-w-7xl mx-auto">
               <div className="flex items-center justify-between mb-16">
                  <h3 className="text-3xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">Kiến thức cùng chủ đề</h3>
                  <Link href="/blog" className="text-emerald-700 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
                    Xem tất cả <ArrowRight size={16} />
                  </Link>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {relatedBlogs.map((item: any) => (
                    <Link key={item.slug} href={`/blog/${item.slug}`} className="group block space-y-6">
                      <div className="aspect-[16/10] overflow-hidden rounded-[3rem] shadow-lg bg-gray-100">
                        <img 
                          src={item.coverImage || item.image || '/images/blog/default-cover.jpg'} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2 uppercase italic tracking-tighter italic">
                        {item.title}
                      </h4>
                    </Link>
                  ))}
               </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
