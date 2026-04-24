import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import Link from "next/link";

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
    title: `${blog.title} | Kiến thức nông nghiệp`,
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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Main Content */}
          <article className="lg:flex-1 min-w-0">
              <header className="mb-10 pb-10 border-b border-gray-50 text-center">
                <nav className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-8 font-black uppercase tracking-widest">
                  <Link href="/" className="hover:text-emerald-600 transition-colors">Trang chủ</Link>
                  <span className="opacity-30">/</span>
                  <Link href="/blog" className="hover:text-emerald-600 transition-colors">Kiến thức nhà nông</Link>
                </nav>
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
              
              {/* Internal CTA */}
              <div className="mt-12 p-8 bg-gradient-to-br from-emerald-900 to-green-800 rounded-2xl text-white relative overflow-hidden shadow-xl">
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-3">Cần tư vấn kỹ thuật trực tiếp?</h3>
                    <p className="text-emerald-100 mb-6 text-sm md:text-base">Gửi ảnh vườn hoặc mô tả tình trạng cây trồng để kỹ sư hỗ trợ nhanh nhất.</p>
                    <Link href="/lien-he" className="inline-block bg-yellow-400 text-emerald-900 px-8 py-4 rounded-xl font-black text-lg hover:bg-yellow-300 transition-all shadow-lg active:scale-95">
                       📩 GỬI THÔNG TIN NGAY
                    </Link>
                 </div>
                 <span className="absolute -bottom-10 -right-10 text-[150px] opacity-10 rotate-12">👨‍🌾</span>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <span className="font-bold text-gray-800">Chia sẻ kinh nghiệm này cho bà con:</span>
                <div className="flex gap-3">
                  <button className="w-12 h-12 bg-[#1877F2] text-white rounded-full flex items-center justify-center font-bold shadow-md hover:-translate-y-1 transition-transform">f</button>
                  <button className="w-12 h-12 bg-[#0068FF] text-white rounded-full flex items-center justify-center font-bold shadow-md hover:-translate-y-1 transition-transform">Z</button>
                </div>
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
