import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Bài viết không tồn tại" };
  
  // Ensure image is absolute URL for OG/social sharing
  let ogImage = blog.image || '';
  if (ogImage.startsWith('/')) {
    ogImage = `https://www.phanbongiatot.com${ogImage}`;
  }
  
  return {
    title: `${blog.title} | Kiến thức nông nghiệp | Phân Bón Giá Tốt`,
    description: blog.excerpt || blog.title,
    alternates: {
      canonical: `https://www.phanbongiatot.com/blog/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      url: `https://www.phanbongiatot.com/blog/${slug}`,
      siteName: 'Phân Bón Giá Tốt',
      locale: 'vi_VN',
      type: 'article',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: blog.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt || blog.title,
      images: ogImage ? [ogImage] : [],
    },
  };
}

async function getProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  if (!blog) return <div className="text-center py-20">Bài viết không tồn tại</div>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "image": blog.image,
    "datePublished": blog.createdAt,
    "description": blog.excerpt,
    "author": {
      "@type": "Organization",
      "name": "Phân Bón Giá Tốt"
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-10 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: 'Kiến thức nhà nông', href: '/blog' },
          { label: blog.title }
        ]} />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Main Content */}
          <article className="lg:flex-1 min-w-0">
              <header className="mb-10 pb-10 border-b border-gray-50 text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-[1.15] tracking-tight break-words max-w-4xl mx-auto">{blog.title}</h1>
                <div className="flex items-center justify-center gap-8 text-gray-500 text-sm font-bold">
                  <span className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full border border-emerald-100">
                    <span className="text-xl">👨‍🔬</span> Kỹ sư Phân Bón Giá Tốt
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="opacity-50">📅</span> {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </header>

              {/* Table of Contents Placeholder - We'll add logic if possible, or just style the one in HTML */}
              <div 
                className="prose prose-emerald prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed 
                prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12
                prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-l-8 prose-h2:border-emerald-600 prose-h2:pl-6
                prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
                prose-a:text-emerald-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-black
                prose-ul:list-disc prose-ol:list-decimal
                break-words overflow-hidden"
                dangerouslySetInnerHTML={{ 
                  __html: (() => {
                    let html = blog.content;
                    // Fix relative image paths to absolute for SSR
                    html = html.replace(/src="(\/images\/blog\/[^"]+)"/g, 'src="https://www.phanbongiatot.com$1"');
                    // Normalize shortcodes - strip any HTML tags wrapping them
                    html = html.replace(/<[^>]+>\s*\[BOX_SAN_PHAM\]\s*<\/[^>]+>/g, '[BOX_SAN_PHAM]');
                    html = html.replace(/<[^>]+>\s*\[\/BOX_SAN_PHAM\]\s*<\/[^>]+>/g, '[/BOX_SAN_PHAM]');
                    html = html.replace(/\[BOX_SAN_PHAM\]\s*<\/p>/g, '[BOX_SAN_PHAM]');
                    html = html.replace(/<p>\s*\[\/BOX_SAN_PHAM\]/g, '[/BOX_SAN_PHAM]');
                    // Replace shortcode with styled box using inline styles (safe from Tailwind purge)
                    html = html.replace(
                      /\[BOX_SAN_PHAM\]([\s\S]*?)\[\/BOX_SAN_PHAM\]/g,
                      '<div style="background:#f0fdf4;padding:2rem;border-radius:1rem;border:2px solid #bbf7d0;margin:2.5rem 0;box-shadow:0 1px 6px rgba(0,0,0,0.07)">'
                      + '<h3 style="font-size:1.35rem;font-weight:900;color:#14532d;margin:0 0 1.25rem 0;display:flex;align-items:center;gap:0.5rem;">📦 Sản Phẩm Đề Xuất</h3>'
                      + '<div style="color:#166534;">$1</div>'
                      + '<div style="text-align:center;margin-top:1.5rem;">'
                      + '<a href="/san-pham" style="display:inline-block;background:#1a5c2a;color:white;padding:0.75rem 2rem;border-radius:0.75rem;font-weight:700;text-decoration:none;">Xem chi tiết các sản phẩm →</a>'
                      + '</div></div>'
                    );
                    return html;
                  })()
                }}
              />
              
              {/* Social Share */}
              <div className="mt-16 pt-10 border-t border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
                  <div>
                    <h4 className="font-black text-gray-900 mb-1 italic">Chia sẻ kỹ thuật này cho bà con</h4>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Cùng nhau xây dựng nền nông nghiệp bền vững</p>
                  </div>
                  <div className="flex gap-4">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.phanbongiatot.com/blog/${slug}`} target="_blank" className="w-14 h-14 bg-[#1877F2] text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-100 hover:-translate-y-1 transition-all active:scale-90 font-bold">f</a>
                    <a href={`https://zalo.me/share?url=https://www.phanbongiatot.com/blog/${slug}`} target="_blank" className="w-14 h-14 bg-[#0068FF] text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-100 hover:-translate-y-1 transition-all active:scale-90 font-bold italic tracking-tighter">Z</a>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <RelatedPosts tags={blog.tags || []} currentSlug={slug} />
              
              {/* Internal CTA */}
              <div className="mt-16 p-10 bg-gradient-to-br from-[#1a5c2a] to-[#2d7a3e] rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                 <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-4 uppercase italic tracking-tight">Cần tư vấn kỹ thuật trực tiếp?</h3>
                    <p className="text-green-100 mb-8 text-sm md:text-lg font-medium">Gửi ảnh vườn hoặc mô tả tình trạng cây trồng để đội ngũ kỹ sư hỗ trợ phác đồ điều trị nhanh nhất.</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                       <Link href="/lien-he" className="bg-yellow-400 text-[#1a5c2a] px-10 py-5 rounded-2xl font-black text-lg hover:bg-yellow-300 transition-all shadow-xl shadow-green-900/20 active:scale-95 text-center">
                          📩 GỬI THÔNG TIN NGAY
                       </Link>
                       <a href="tel:0773440966" className="bg-white/20 backdrop-blur-md text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/30 transition-all text-center">
                          📞 GỌI KỸ SƯ
                       </a>
                    </div>
                 </div>
                 <span className="absolute -bottom-10 -right-10 text-[200px] opacity-10 rotate-12 select-none">👨‍🌾</span>
              </div>
            </article>

          {/* Sidebar - Recommended Products */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                 <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                   <span className="text-2xl">📦</span> Sản phẩm khuyên dùng
                 </h3>
                 <div className="space-y-6">
                   {featuredProducts.map((p: any) => (
                     <Link href={`/san-pham/${p.slug}`} key={p._id} className="flex gap-4 group cursor-pointer">
                        <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                           {p.images?.[0] ? <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={p.name} /> : <span className="flex items-center justify-center h-full text-2xl">🌱</span>}
                        </div>
                        <div className="flex flex-col justify-center">
                           <h4 className="font-bold text-sm text-gray-800 line-clamp-2 group-hover:text-primary transition-colors mb-1">{p.name}</h4>
                           <p className="text-primary font-black text-sm">₫{p.price.toLocaleString("vi-VN")}</p>
                        </div>
                     </Link>
                   ))}
                 </div>
                 <Link href="/danh-muc/phan-bon" className="block w-full text-center mt-8 py-3 bg-gray-50 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-colors text-sm">
                   Xem tất cả sản phẩm
                 </Link>
              </div>

              {/* Quick Contact Box */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center">
                 <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">📞</div>
                 <h4 className="font-bold text-gray-900 mb-2">Hotline Kỹ Thuật 24/7</h4>
                 <p className="text-gray-500 text-sm mb-4">Hỗ trợ chẩn đoán bệnh cây và báo giá nhanh</p>
                 <a href="tel:0773440966" className="block w-full py-4 bg-[#ee4d2d] text-white font-black text-xl rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95">
                    0773.440.966
                 </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function RelatedPosts({ tags, currentSlug }: { tags: string[], currentSlug: string }) {
  let related: any[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}/blog`);
    if (res.ok) {
      const data = await res.json();
      const all = data.blogs || data;
      if (Array.isArray(all)) {
        related = all.filter((p: any) => 
          p.slug !== currentSlug && 
          p.tags?.some((t: string) => tags.includes(t))
        ).slice(0, 3);
      }
    }
  } catch {}

  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase italic tracking-tight flex items-center gap-3">
        <span className="w-10 h-1 bg-[#1a5c2a] rounded-full"></span>
        Bài viết liên quan
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((post: any) => (
          <Link href={`/blog/${post.slug}`} key={post._id} className="group flex flex-col gap-4">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
               {post.image ? <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">📚</div>}
            </div>
            <h4 className="font-black text-gray-800 group-hover:text-[#1a5c2a] transition-colors leading-tight line-clamp-2">
              {post.title}
            </h4>
          </Link>
        ))}
      </div>
    </div>
  );
}
