
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
async function getBlogSafe(slug: string) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return null;
    
    // Nếu là bản nháp, chỉ cho phép Admin xem (Preview)
    if (!blog.isPublished) {
      const { verifyAdmin } = await import('@/lib/auth');
      const isAdmin = await verifyAdmin();
      if (!isAdmin) return null;
    }

    let content = String(blog.content || '');
    content = content.replace(/<table/g, '<div class="table-responsive-wrapper" style="width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 2rem 0; border-radius: 12px; border: 1px solid #e2e8f0;"><table');
    content = content.replace(/<\/table>/g, '</table></div>');

    return {
      ...JSON.parse(JSON.stringify(blog)),
      content: content
    };
  } catch (error) {
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
    return JSON.parse(JSON.stringify(products)) || [];
  } catch (error) {
    return [];
  }
}

// --- STYLE SYSTEM ---
const globalBlogStyles = `
  html {
    overflow-x: clip; /* Modern way to hide overflow without breaking sticky */
    scroll-behavior: smooth;
  }
  
  body {
    max-width: 100vw !important;
    overflow-x: clip !important;
    position: relative;
  }

  article.prose {
    line-height: 1.85 !important;
    color: #334155 !important;
    font-size: 1.125rem !important;
    max-width: 100% !important;
    width: 100% !important;
    overflow-x: clip !important;
  }
  article.prose p { margin-bottom: 2rem !important; }
  article.prose h2 {
    font-size: 1.875rem !important;
    line-height: 1.2 !important;
    margin-top: 3.5rem !important;
    margin-bottom: 1.5rem !important;
    color: #0f172a !important;
    font-weight: 900 !important;
    letter-spacing: -0.04em !important;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  @media (min-width: 768px) {
    article.prose h2 { font-size: 2.5rem !important; }
  }
  article.prose h2::before {
    content: ''; display: block; width: 6px; height: 32px; background: #059669; border-radius: 3px;
  }

  .table-responsive-wrapper table {
    width: 100% !important;
    border-collapse: collapse !important;
    table-layout: auto !important;
    font-size: 0.875rem !important;
    line-height: 1.5 !important;
  }
  .table-responsive-wrapper th { 
    background: #f8fafc !important; 
    padding: 0.75rem 1rem !important; 
    font-weight: 800 !important; 
    white-space: nowrap; 
    border: 1px solid #e2e8f0;
    font-size: 0.75rem !important;
    color: #1e293b !important;
    text-transform: uppercase;
  }
  .table-responsive-wrapper td { 
    padding: 0.75rem 1rem !important; 
    border: 1px solid #f1f5f9 !important; 
    min-width: 120px;
    color: #475569 !important;
  }
  
  .prose img { border-radius: 2rem !important; margin: 3rem 0 !important; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1) !important; max-width: 100%; height: auto; }
  
  .article-cta {
    background: #0d2a1c; border-radius: 2.5rem; padding: 2.5rem; color: white; margin-top: 4rem; text-align: center; position: relative; overflow: hidden;
  }
  @media (min-width: 768px) {
    .article-cta { padding: 4rem; }
  }

  /* Sticky Element MUST be a direct child of a stretching container */
  .sticky-toc-box {
    position: sticky !important;
    top: 120px !important;
    z-index: 50 !important;
    transition: all 0.3s ease;
  }
`;

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogSafe(slug);
  if (!blog) notFound();

  const relatedBlogs = await getRelatedBlogs(blog.category, blog.slug);
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="bg-white min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: globalBlogStyles }} />
      
      <main className="pb-20 md:pb-32 pt-20 md:pt-28">
        <div className="container mx-auto px-4">
          <div className="mb-4 max-w-7xl mx-auto">
            <Breadcrumbs 
              className="bg-transparent border-none py-0 px-0 mb-4"
              items={[
                { label: 'Kiến thức', href: '/blog' },
                { label: blog.category || 'Nông nghiệp', href: `/blog?category=${encodeURIComponent(blog.category || '')}` }
              ]} 
            />
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
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('vi-VN') : 'Mới cập nhật'}
                  </div>
                </div>
                
                <h1 className="text-3xl md:text-6xl font-black text-gray-900 leading-tight md:leading-[1.05] tracking-tighter mb-10">
                  {blog.title}
                </h1>

                {(blog.coverImage || blog.image) && (
                  <div className="aspect-[21/9] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 border-4 md:border-8 border-gray-50/50">
                    <img 
                      src={blog.coverImage || blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
              </header>

              <article 
                id="expert-content-root"
                className="prose prose-emerald prose-lg md:prose-xl max-w-3xl mx-auto selection:bg-emerald-100"
                style={{ wordBreak: 'normal', overflowWrap: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: cleanExpertContent(blog.content) }}
              />

              <div className="article-cta">
                 <div className="absolute top-0 right-0 p-8 opacity-10 text-7xl md:text-9xl rotate-12">👨‍🌾</div>
                 <h3 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                    Cây vườn anh chị <br /> đang bị suy kiệt?
                 </h3>
                 <p className="text-emerald-100/70 text-sm md:text-xl font-medium mb-12 max-w-xl mx-auto italic">
                    "Đừng để đất chết lâm sàng mới cứu. Hãy nhắn tin ngay để kỹ sư PBGT tư vấn giải pháp hồi sinh vườn miễn phí."
                 </p>
                 <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
                    <a href="https://zalo.me/0339505050" className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 md:px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm shadow-2xl transition-all">Tư vấn Zalo 24/7</a>
                    <a href="tel:0339505050" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 md:px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm transition-all">Gọi kỹ sư ngay</a>
                 </div>
              </div>
            </div>

            {/* SIDEBAR - This stretches to content height */}
            <aside className="lg:w-1/3 xl:w-[30%] flex flex-col gap-12">
              {/* Static Top Part 1 */}
              <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">👨‍🔬</div>
                    <div>
                       <h4 className="font-black text-gray-900 uppercase italic text-sm">Kỹ sư PBGT</h4>
                       <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">12 năm kinh nghiệm</span>
                    </div>
                 </div>
                 <p className="text-xs font-medium text-gray-500 leading-relaxed italic border-l-2 border-emerald-500 pl-4">
                    "Kiến thức nông nghiệp là để chia sẻ. Tôi mong muốn mỗi bài viết giúp bà con giảm chi phí, tăng năng suất bền vững."
                 </p>
              </div>

              {/* Static Top Part 2 */}
              <div className="bg-gray-900 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                 <div className="relative z-10">
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 leading-tight">
                       Gửi Ảnh Vườn <br /> Nhận Chẩn Đoán <br /> <span className="text-emerald-500">Từ PBGT 24/7</span>
                    </h3>
                    <a href="https://zalo.me/0339505050" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all">
                       Bấm gửi ảnh ngay <ChevronRight size={16} />
                    </a>
                 </div>
              </div>

              {/* STICKY Table of Contents - Now a direct child of the stretched ASIDE */}
              <div className="sticky-toc-box">
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-black text-gray-900 uppercase italic tracking-tighter flex items-center gap-2 mb-6">
                    <span className="w-1 h-5 bg-emerald-500 rounded-full" />
                    Mục lục động
                  </h3>
                  <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    <TableOfContents content={blog.content} />
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* BOTTOM RELATED BLOGS */}
          {relatedBlogs && relatedBlogs.length > 0 && (
            <div className="mt-32 pt-24 border-t border-gray-100 max-w-7xl mx-auto">
               <div className="flex items-center justify-between mb-16">
                  <h3 className="text-2xl md:text-5xl font-black text-gray-900 uppercase italic tracking-tighter leading-none">Kiến thức cùng chủ đề</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {relatedBlogs.map((item: any) => (
                    <Link key={item.slug} href={`/blog/${item.slug}`} className="group block space-y-6">
                      <div className="aspect-[16/10] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-lg bg-gray-100">
                        <img src={item.coverImage || item.image || '/images/blog/default-cover.jpg'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <h4 className="text-lg md:text-2xl font-black text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2 uppercase italic tracking-tighter">
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
