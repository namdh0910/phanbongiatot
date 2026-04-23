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
  
  return {
    title: `${blog.title} | Kiến thức nông nghiệp`,
    description: blog.excerpt || blog.title,
    openGraph: {
      images: blog.image && (blog.image.startsWith("http") || blog.image.startsWith("/")) ? [blog.image] : [],
    }
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
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium uppercase tracking-wider">
              <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary transition-colors">Kiến thức nhà nông</Link>
              <span>/</span>
              <span className="text-gray-600 line-clamp-1">{blog.title}</span>
            </nav>
            
            <Link href="/blog" className="text-primary font-bold hover:underline mb-8 inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 text-sm transition-all hover:shadow-md">
              <span>&larr;</span> Quay lại danh sách
            </Link>
            
            <article className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-gray-100">
              <header className="mb-10 pb-10 border-b border-gray-50">
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">{blog.title}</h1>
                <div className="flex items-center gap-6 text-gray-500 text-sm font-medium">
                  <span className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    <span className="text-lg">👨‍🔬</span> Kỹ sư Phân Bón Giá Tốt
                  </span>
                  <span className="flex items-center gap-2">
                    <span>📅</span> {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </header>
              
              <div 
                className="prose prose-emerald prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed prose-img:rounded-2xl prose-headings:font-black prose-headings:text-gray-900 prose-a:text-primary prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: blog.content }}
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
          </div>

          {/* Sidebar - Recommended Products */}
          <div className="lg:w-1/3">
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
