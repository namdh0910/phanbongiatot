import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import Link from "next/link";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";
import ProductReviews from "@/components/ProductReviews";

const CATEGORY_SLUG_MAP: Record<string, string> = {
  "Phân bón": "phan-bon",
  "Kích rễ": "kich-re",
  "Tuyến trùng": "tuyen-trung",
  "Thuốc trừ sâu": "thuoc-tru-sau",
};

async function getProduct(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/slug/${slug}`, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error("API failed");
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Sản phẩm không tồn tại" };
  
  return {
    title: `${product.name} | Phân Bón Giá Tốt`,
    description: product.seoDescription || product.description?.slice(0, 160),
    openGraph: {
      images: product.images?.[0] ? [product.images[0]] : [],
    }
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return <div className="p-20 text-center">Sản phẩm không tồn tại</div>;

  // Fetch related products and best sellers
  let relatedProducts = [];
  let bestSellers = [];
  try {
    const [relRes, bestRes] = await Promise.all([
      fetch(`${API_BASE_URL}/products?category=${encodeURIComponent(product.category)}`, { next: { revalidate: 3600 } }),
      fetch(`${API_BASE_URL}/products`, { next: { revalidate: 3600 } })
    ]);
    if (relRes.ok) relatedProducts = (await relRes.json()).filter((p: any) => p._id !== product._id).slice(0, 4);
    if (bestRes.ok) bestSellers = (await bestRes.json()).slice(0, 5);
  } catch (err) {
    console.error(err);
  }

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const catSlug = CATEGORY_SLUG_MAP[product.category] || "phan-bon";
  
  const validImages: string[] = Array.isArray(product.images) 
    ? product.images.filter((i: string) => i && (i.startsWith("http") || i.startsWith("/"))) 
    : [];

  const fakeSold = Math.floor(Math.random() * 500) + 120;
  const fakeRating = (Math.random() * (5.0 - 4.7) + 4.7).toFixed(1);

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-24 font-sans text-gray-800">
      <div className="container mx-auto px-0 md:px-4 py-4 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4 px-4 md:px-0 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/" className="hover:text-[#ee4d2d]">Trang chủ</Link>
          <span className="text-[10px] text-gray-400">▶</span>
          <Link href={`/danh-muc/${catSlug}`} className="hover:text-[#ee4d2d]">{product.category}</Link>
          <span className="text-[10px] text-gray-400">▶</span>
          <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Card */}
        <div className="bg-white md:rounded-sm shadow-sm flex flex-col md:flex-row mb-6 overflow-hidden">
          <div className="w-full md:w-[450px] p-0 md:p-4 flex-shrink-0">
            <ProductGallery images={validImages} name={product.name} discount={discount} />
            <div className="hidden md:flex items-center justify-center gap-6 mt-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2 cursor-pointer hover:text-[#ee4d2d]">
                <span className="text-lg">🔗</span> Chia sẻ: f t p
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-[#ee4d2d]">
                <span className="text-lg text-[#ee4d2d]">❤️</span> Đã thích (2.5k)
              </div>
            </div>
          </div>

          <div className="w-full p-4 md:p-8 flex flex-col">
            <h1 className="text-xl md:text-2xl font-medium text-gray-900 leading-snug mb-4">
              <span className="bg-[#ee4d2d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm mr-2 uppercase">Yêu thích+</span>
              {product.name}
            </h1>
            <div className="flex items-center gap-4 text-xs md:text-sm mb-5">
              <div className="flex items-center text-[#ee4d2d] border-b border-[#ee4d2d] pb-[1px] cursor-pointer">
                <span className="mr-1 font-bold">{fakeRating}</span>
                <span className="text-[10px] tracking-tighter">⭐⭐⭐⭐⭐</span>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="text-gray-500 underline decoration-gray-300">2.1k Đánh giá</div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="text-gray-500 font-medium"><span className="text-gray-900">{fakeSold}</span> Đã bán</div>
            </div>

            <div className="bg-[#fafafa] px-5 py-6 mb-8 flex flex-col gap-2 rounded-sm border-y border-gray-50">
              <div className="flex items-center gap-3">
                {product.originalPrice && <span className="text-gray-400 line-through text-base">₫{product.originalPrice.toLocaleString("vi-VN")}</span>}
                <span className="text-[#ee4d2d] text-3xl font-bold">₫{product.price.toLocaleString("vi-VN")}</span>
                {discount > 0 && <span className="bg-[#ee4d2d] text-white text-[10px] font-bold px-1 py-0.5 rounded-sm ml-2">-{discount}% GIẢM</span>}
              </div>
              <div className="flex items-center gap-2 text-[#ee4d2d] text-xs font-bold mt-2">
                <span className="border border-[#ee4d2d] px-1 rounded-sm">Gì cũng rẻ</span>
                <span className="text-gray-500 font-normal">Giá tốt nhất thị trường nông nghiệp</span>
              </div>
            </div>

            <div className="space-y-6 text-sm text-gray-600 mb-8">
              <div className="flex items-start">
                <span className="w-24 md:w-28 flex-shrink-0 text-gray-400">Vận Chuyển</span>
                <div className="flex flex-col gap-2 text-gray-900">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00bfa5] text-xl">🚚</span>
                    <span className="font-medium">Miễn phí vận chuyển toàn quốc</span>
                  </div>
                  <div className="pl-7 text-xs text-gray-500">Miễn phí vận chuyển cho đơn hàng từ ₫250.000</div>
                </div>
              </div>
            </div>

            <ProductActions product={product} />
            
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
               <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
                  <span className="text-[#ee4d2d] text-lg">🛡️</span> Phân Bón Giá Tốt Đảm Bảo
                  <span className="text-gray-400 font-normal">3 Ngày Trả Hàng / Hoàn Tiền</span>
               </div>
            </div>
          </div>
        </div>

        {/* Shop Info Section */}
        <div className="bg-white md:rounded-sm shadow-sm p-6 mb-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-4 md:border-r md:pr-10">
            <div className="w-20 h-20 rounded-full border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center p-1">
              <img 
                src={product.seller?.vendorInfo?.logo || "https://img.icons8.com/bubbles/100/000000/shop.png"} 
                className="w-full h-full object-cover rounded-full"
                alt="Store Logo"
              />
              {product.seller?.role === 'admin' && (
                <div className="absolute bottom-0 right-0 bg-[#ee4d2d] text-white text-[8px] px-1 rounded-sm font-bold">Yêu thích</div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {product.seller?.role === 'admin' ? "Phân Bón Giá Tốt (Chính hãng)" : (product.seller?.vendorInfo?.storeName || "Gian hàng đối tác")}
              </h3>
              <p className="text-xs text-gray-500 mb-2">Online 5 phút trước</p>
              <div className="flex gap-2">
                <button className="border border-[#ee4d2d] text-[#ee4d2d] px-3 py-1 rounded-sm text-xs font-medium flex items-center gap-1 hover:bg-red-50">
                  <span>💬</span> Chat Ngay
                </button>
                <Link href={`/shop/${product.seller?.username || 'admin'}`} className="border border-gray-200 text-gray-600 px-3 py-1 rounded-sm text-xs font-medium flex items-center gap-1 hover:bg-gray-50">
                  <span>🏪</span> Xem Shop
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-10 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Đánh Giá</span>
              <span className="text-[#ee4d2d] font-medium">12.5k</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tham Gia</span>
              <span className="text-[#ee4d2d] font-medium">2 năm trước</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sản Phẩm</span>
              <span className="text-[#ee4d2d] font-medium">85</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tỉ Lệ Phản Hồi</span>
              <span className="text-[#ee4d2d] font-medium">99%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Thời Gian Phản Hồi</span>
              <span className="text-[#ee4d2d] font-medium">trong vài giờ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Người Theo Dõi</span>
              <span className="text-[#ee4d2d] font-medium">45.2k</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
           <div className="flex-1 space-y-6">
              {/* Product Info Sections */}
              <div className="bg-white md:rounded-sm shadow-sm overflow-hidden">
                <h2 className="bg-[#f5f5f5] p-4 text-sm font-bold text-gray-800 uppercase tracking-wider">Thông Tin Chi Tiết</h2>
                <div className="p-6 space-y-8">
                   {/* Benefits */}
                   {product.benefits?.length > 0 && (
                     <div className="space-y-4">
                        <p className="font-bold text-gray-900 flex items-center gap-2">💎 Lợi ích vượt trội:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-2">
                          {product.benefits.map((b: string, i: number) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="text-green-500 mt-0.5">✓</span>
                              <span className="text-gray-700 text-sm">{b}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}

                   {/* Main Description */}
                   <div className="space-y-4">
                      <p className="font-bold text-gray-900 flex items-center gap-2">📝 Mô tả sản phẩm:</p>
                      <div 
                        className="text-gray-700 text-sm leading-relaxed ml-2 prose prose-emerald max-w-none prose-p:my-2 prose-headings:mb-4 prose-headings:mt-6 prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5 prose-li:my-1"
                        dangerouslySetInnerHTML={{ 
                          __html: product.description?.includes('<') 
                            ? product.description 
                            : product.description?.replace(/\n/g, '<br/>') || "" 
                        }}
                      />
                   </div>

                   {/* Usage & Dosage */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {product.usageInstructions && (
                        <div className="bg-green-50/50 p-5 rounded-sm border border-green-100/50">
                          <p className="font-bold text-green-900 text-sm mb-3 flex items-center gap-2">🚀 Hướng dẫn sử dụng:</p>
                          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                            {product.usageInstructions}
                          </div>
                        </div>
                      )}
                      {product.dosage && (
                        <div className="bg-yellow-50/50 p-5 rounded-sm border border-yellow-100/50">
                          <p className="font-bold text-yellow-900 text-sm mb-3 flex items-center gap-2">⚖️ Liều lượng:</p>
                          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                            {product.dosage}
                          </div>
                        </div>
                      )}
                   </div>
                </div>
              </div>

              {/* Related Products Widget */}
              <div className="bg-white md:rounded-sm shadow-sm overflow-hidden p-6">
                 <h2 className="font-bold text-gray-800 uppercase tracking-wider mb-6 pb-2 border-b">Sản phẩm liên quan</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.length > 0 ? relatedProducts.map((p: any) => (
                       <Link href={`/san-pham/${p.slug}`} key={p._id} className="group cursor-pointer">
                          <div className="aspect-square bg-gray-50 rounded-sm mb-2 flex items-center justify-center overflow-hidden group-hover:bg-gray-100 transition-colors">
                            {p.images?.[0] ? <img src={p.images[0]} className="w-full h-full object-cover" /> : <span className="text-3xl">🌿</span>}
                          </div>
                          <p className="text-xs font-medium text-gray-700 line-clamp-2 group-hover:text-[#ee4d2d]">{p.name}</p>
                          <p className="text-sm font-bold text-[#ee4d2d] mt-1">₫{p.price.toLocaleString("vi-VN")}</p>
                       </Link>
                    )) : (
                      <div className="col-span-4 text-center py-4 text-gray-400 text-xs italic">Đang cập nhật sản phẩm cùng danh mục...</div>
                    )}
                 </div>
              </div>

              {/* Reviews Section */}
              <ProductReviews productId={product._id} />

              {/* FAQ */}
              {product.faq?.length > 0 && (
                <div className="bg-white md:rounded-sm shadow-sm overflow-hidden">
                  <h2 className="bg-[#f5f5f5] p-4 text-sm font-bold text-gray-800 uppercase tracking-wider">Giải đáp thắc mắc</h2>
                  <div className="p-6 space-y-6">
                    {product.faq.map((f: any, i: number) => (
                      <div key={i} className="bg-gray-50/50 p-4 rounded-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-2 flex items-start gap-2 text-sm">
                           <span className="bg-[#ee4d2d] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">Q</span>
                           {f.q}
                        </h3>
                        <p className="text-gray-600 text-sm pl-6 leading-relaxed">
                          <span className="text-green-600 font-bold mr-1 italic">Kỹ sư trả lời:</span> {f.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
           </div>

           {/* Sidebar - Desktop Only */}
           <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-white p-4 shadow-sm sticky top-24">
                 <h3 className="text-gray-400 text-xs font-bold uppercase mb-6 border-b border-gray-100 pb-2">Sản phẩm bán chạy</h3>
                 <div className="space-y-8">
                    {bestSellers.map((p: any) => (
                      <Link href={`/san-pham/${p.slug}`} key={p._id} className="flex flex-col gap-3 group cursor-pointer">
                         <div className="aspect-square bg-gray-50 rounded-sm flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                           {p.images?.[0] ? <img src={p.images[0]} className="w-full h-full object-cover" /> : <span className="text-4xl">🌱</span>}
                         </div>
                         <p className="text-xs font-medium line-clamp-2 group-hover:text-[#ee4d2d]">{p.name}</p>
                         <p className="text-sm font-bold text-[#ee4d2d]">₫{p.price.toLocaleString("vi-VN")}</p>
                      </Link>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
