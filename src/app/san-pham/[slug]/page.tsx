import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import { getImageUrl, isValidImageUrl } from '@/utils/image';
import Link from "next/link";
import ProductGallery from "@/components/ProductGallery";
import ProductActions from "@/components/ProductActions";
import ProductReviews from "@/components/ProductReviews";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductStickyCTA from "@/components/ProductStickyCTA";
import ProductTabs from "@/components/ProductTabs";

const CATEGORY_SLUG_MAP: Record<string, string> = {
  "Phân bón": "phan-bon",
  "Kích rễ": "kich-re",
  "Tuyến trùng": "tuyen-trung",
  "Thuốc trừ sâu": "thuoc-tru-sau",
};

/**
 * Sanitize HTML from rich-text editor (TipTap/Quill/Word paste):
 * 1. Strip ALL inline style attributes (cause font-size/color override)
 * 2. Replace &nbsp; with regular space (cause word-break to fail)
 * 3. Remove empty span tags left over from editor formatting
 * Preserves structural HTML: h1-h6, ul, ol, li, p, strong, em, br, etc.
 */
function sanitizeHtml(html: string): string {
  if (!html) return "";
  return html
    // 1. Strip ALL style="..." attributes (handles multi-value styles too)
    .replace(/\s*style="[^"]*"/gi, "")
    // 2. Convert &nbsp; to regular space so browser can line-wrap naturally
    .replace(/&nbsp;/gi, " ")
    // 3. Remove empty span tags that editors leave behind
    .replace(/<span[^>]*>\s*<\/span>/gi, "")
    // 4. Remove class attributes injected by editors (ql-*, tiptap-*)
    .replace(/\s*class="[^"]*"/gi, "")
    // 5. Collapse multiple spaces into one
    .replace(/ {2,}/g, " ");
}



async function getProduct(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/slug/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data) return data;
    }
    return null;
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
      title: `${product.name} | Phân Bón Giá Tốt`,
      description: product.seoDescription || product.description?.slice(0, 160),
      url: `https://phanbongiatot.com/san-pham/${product.slug}`,
      siteName: 'Phân Bón Giá Tốt',
      locale: 'vi_VN',
      type: 'website',
      images: product.images?.[0] ? [
        {
          url: (typeof product.images?.[0] === 'string' && product.images[0].startsWith('http')) 
            ? product.images[0] 
            : `https://phanbongiatot.com${(typeof product.images?.[0] === 'string' && product.images[0].startsWith('/')) ? product.images[0] : '/og-image.png'}`,
          width: 1200,
          height: 630,
          alt: product.name,
        }
      ] : [{ url: 'https://phanbongiatot.com/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description?.slice(0, 160),
      images: product.images?.[0] ? [product.images[0]] : ['https://phanbongiatot.com/og-image.png'],
    },
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log(`[DEBUG] Rendering ProductDetail for slug: ${slug}`);
  const product = await getProduct(slug);

  if (!product) return <div className="p-20 text-center">Sản phẩm không tồn tại</div>;

  // Fetch related products and best sellers
  let relatedProducts = [];
  let bestSellers = [];
  let settings: any = null;
  try {
    const [relRes, bestRes, setRes] = await Promise.all([
      fetch(`${API_BASE_URL}/products?category=${encodeURIComponent(product.category)}`, { next: { revalidate: 3600 } }),
      fetch(`${API_BASE_URL}/products`, { next: { revalidate: 3600 } }),
      fetch(`${API_BASE_URL}/settings`, { next: { revalidate: 3600 } })
    ]);
    if (relRes.ok) {
      const relData = await relRes.json();
      const relList = Array.isArray(relData) ? relData : (relData?.data || []);
      relatedProducts = relList.filter((p: any) => p._id !== product._id).slice(0, 4);
    }
    if (bestRes.ok) {
      const bestData = await bestRes.json();
      bestSellers = (Array.isArray(bestData) ? bestData : (bestData?.data || [])).slice(0, 5);
    }
    if (setRes.ok) settings = await setRes.json();
  } catch (err) {
    console.error(err);
  }

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const catSlug = CATEGORY_SLUG_MAP[product.category] || "phan-bon";
  
  const validImages: string[] = Array.isArray(product.images) 
    ? product.images
        .map((img: any) => getImageUrl(img))
        .filter((url: string) => isValidImageUrl(url))
    : [];

  const displayRating = product.rating || 0;
  const displayReviewCount = product.numReviews || 0;
  const displaySold = product.soldCount || 0;

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-24 font-sans text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": validImages,
          "description": product.description?.slice(0, 200),
          "sku": product._id,
          "brand": {
            "@type": "Brand",
            "name": "Phân Bón Giá Tốt"
          },
          "offers": {
            "@type": "Offer",
            "url": `https://phanbongiatot.com/san-pham/${product.slug}`,
            "priceCurrency": "VND",
            "price": product.price,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": displayRating,
            "reviewCount": displayReviewCount || 1
          }
        }) }}
      />
      <div className="container mx-auto px-0 md:px-4 py-4 max-w-6xl">
        <Breadcrumbs items={[{ label: product.category, href: `/danh-muc/${catSlug}` }, { label: product.name }]} />
        <ProductStickyCTA product={product} />

        {/* Product Card */}
        <div className="bg-white md:rounded-sm shadow-sm flex flex-col md:flex-row mb-6 overflow-hidden">
          <div className="w-full md:w-[450px] p-0 flex-shrink-0">
            <ProductGallery images={validImages} name={product.name} discount={discount} />
            <div className="hidden md:flex items-center justify-center gap-6 mt-8 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔗</span> Chia sẻ: 
                <a href={`https://www.facebook.com/sharer/sharer.php?u=https://phanbongiatot.com/san-pham/${product.slug}`} target="_blank" className="hover:text-[#1a5c2a] font-bold">Facebook</a>
                <a href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}`} target="_blank" className="hover:text-[#1a5c2a] font-bold">Zalo</a>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-[#ee4d2d]">
                <span className="text-lg">❤️</span> Đã thích
              </div>
            </div>
          </div>

          <div className="w-full p-4 md:p-8 flex flex-col">
            <h1 className="text-xl md:text-2xl font-medium text-gray-900 leading-snug mb-4">
              <span className="bg-[#ee4d2d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm mr-2 uppercase">Yêu thích+</span>
              {product.name}
            </h1>
            
            {/* Seller attribution under title */}
            <div className="mb-4 flex items-center gap-2">
               <span className="text-xs text-gray-400">Bán bởi:</span>
               {product.seller ? (
                 <Link href={`/shop/${product.seller.username || 'admin'}`} className="text-sm font-bold text-[#1a5c2a] hover:underline flex items-center gap-1">
                    {product.seller.role === 'admin' ? "Phân Bón Giá Tốt" : (product.seller.vendorInfo?.storeName || "Gian hàng đối tác")}
                    {product.seller.vendorInfo?.isApproved && <span className="text-[10px] bg-blue-100 text-blue-600 px-1 rounded-sm">✓ Mall</span>}
                 </Link>
               ) : (
                 <span className="text-sm font-bold text-[#1a5c2a]">Phân Bón Giá Tốt</span>
               )}
            </div>
            <div className="flex items-center gap-4 text-xs md:text-sm mb-5">
              <div className="flex items-center text-[#ee4d2d] border-b border-[#ee4d2d] pb-[1px] cursor-pointer">
                <span className="mr-1 font-bold">{displayRating}</span>
                <div className="flex text-[10px] tracking-tighter">
                   {[1,2,3,4,5].map(s => (
                     <span key={s} className={s <= Math.floor(displayRating) ? "text-[#ee4d2d]" : "text-gray-300"}>⭐</span>
                   ))}
                </div>
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="text-gray-500 underline decoration-gray-300">
                {displayReviewCount > 0 ? `${displayReviewCount} Đánh giá` : "Chưa có đánh giá"}
              </div>
              <div className="w-px h-4 bg-gray-200"></div>
              <div className="text-gray-500 font-medium">
                {displaySold > 0
                  ? <><span className="text-gray-900">{displaySold}</span> Đã bán</>
                  : <span className="text-green-600 font-bold text-xs">✨ Hãy là người đầu tiên!</span>
                }
              </div>
            </div>

            <div className="bg-[#fafafa] px-5 py-6 mb-4 flex flex-col gap-2 rounded-sm border-y border-gray-50">
              {discount > 20 && (
                <div className="flex items-center justify-between bg-[#ee4d2d] text-white px-4 py-2 rounded-sm mb-2 animate-pulse">
                  <div className="flex items-center gap-2 font-black text-sm">
                    <span>⚡ FLASH SALE</span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-tighter">Kết thúc sau 02:45:12</div>
                </div>
              )}
              <div className="flex items-center gap-3">
                {product.originalPrice && <span className="text-gray-400 line-through text-base">₫{product.originalPrice?.toLocaleString("vi-VN")}</span>}
                <span className="text-[#ee4d2d] text-3xl font-bold">₫{product.price?.toLocaleString("vi-VN")}</span>
                {discount > 0 && <span className="bg-[#ee4d2d] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm ml-2">-{discount}% GIẢM</span>}
              </div>
              <div className="flex items-center gap-2 text-[#ee4d2d] text-xs font-bold mt-2">
                <span className="border border-[#ee4d2d] px-1 rounded-sm">Gì cũng rẻ</span>
                <span className="text-gray-500 font-normal">Giá tốt nhất thị trường nông nghiệp</span>
              </div>
            </div>

            {/* Vouchers Section */}
            <div className="flex items-center gap-4 mb-6 text-sm">
               <span className="w-24 md:w-28 flex-shrink-0 text-gray-400">Mã Giảm Giá</span>
               <div className="flex flex-wrap gap-2">
                  <span className="bg-[#fff5f3] text-[#ee4d2d] border border-dashed border-[#ee4d2d] px-2 py-0.5 text-[11px] font-medium rounded-sm">Giảm ₫20k</span>
                  <span className="bg-[#fff5f3] text-[#ee4d2d] border border-dashed border-[#ee4d2d] px-2 py-0.5 text-[11px] font-medium rounded-sm">Giảm ₫50k</span>
                  <span className="bg-[#fff5f3] text-[#ee4d2d] border border-dashed border-[#ee4d2d] px-2 py-0.5 text-[11px] font-medium rounded-sm">Mua 2 giảm 5%</span>
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
            <div className={`relative w-20 h-20 rounded-full border ${product.seller?.role === 'admin' ? 'border-[#ee4d2d]' : 'border-gray-100'} overflow-hidden bg-gray-50 flex items-center justify-center p-1 shadow-sm`}>
              <img
                src={product.seller?.role === 'admin' ? "https://img.icons8.com/bubbles/100/000000/administrator-male.png" : (product.seller?.vendorInfo?.logo || "https://img.icons8.com/bubbles/100/000000/shop.png")} 
                className="w-full h-full object-cover rounded-full"
                alt="Store Logo"
              />
              {product.seller?.role === 'admin' && (
                <div className="absolute bottom-0 left-0 right-0 bg-[#ee4d2d] text-white text-[8px] text-center font-bold py-0.5">YÊU THÍCH</div>
              )}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                {product.seller?.role === 'admin' ? "Phân Bón Giá Tốt (Chính hãng)" : (product.seller?.vendorInfo?.storeName || "Gian hàng đối tác")}
                {product.seller?.role === 'admin' && (
                  <span className="bg-[#ee4d2d] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-black uppercase tracking-tighter">Mall</span>
                )}
              </h3>
              <p className="text-xs text-gray-500 mb-2">Online 5 phút trước</p>
              <div className="flex gap-2">
                <a href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}`} target="_blank" className="border border-[#ee4d2d] text-[#ee4d2d] px-3 py-1 rounded-sm text-xs font-medium flex items-center gap-1 hover:bg-red-50">
                  <span>💬</span> Chat Ngay
                </a>
                {product.seller?.role !== 'admin' && (
                  <Link href={`/shop/${product.seller?.username || 'admin'}`} className="border border-gray-200 text-gray-600 px-3 py-1 rounded-sm text-xs font-medium flex items-center gap-1 hover:bg-gray-50">
                    <span>🏪</span> Xem Shop
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-10 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Đánh Giá</span>
              <span className="text-[#ee4d2d] font-medium">{product.seller?.vendorInfo?.numReviews || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tham Gia</span>
              <span className="text-[#ee4d2d] font-medium" suppressHydrationWarning>
                {(() => {
                  if (!product.seller?.createdAt) return 'Mới';
                  const d = new Date(product.seller.createdAt);
                  return isNaN(d.getTime()) ? 'Mới' : d.toLocaleDateString('vi-VN');
                })()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Sản Phẩm</span>
              <span className="text-[#ee4d2d] font-medium">{product.seller?.vendorInfo?.numProducts || 0}</span>
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
              <span className="text-[#ee4d2d] font-medium">{product.seller?.vendorInfo?.numFollowers || 0}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
           <div className="flex-1 space-y-6">
                 {/* Product Info Sections */}
              <div className="bg-white md:rounded-sm shadow-sm overflow-hidden">
                {/* Desktop Titles */}
                <h2 className="hidden md:block bg-[#f5f5f5] px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Thông Tin Chi Tiết</h2>
                
                <ProductTabs hasTechnical={!!(product.usageInstructions?.trim() || product.dosage?.trim())} />

                <div className="px-4 py-5 md:p-6 space-y-6">

                   {/* Main Description */}
                   <div className="relative">
                      {/* Anchor offset = header (64px) + tabs (48px) + gap (8px) = 120px */}
                      <span id="mo-ta" className="absolute -top-[120px]" aria-hidden="true"></span>
                      
                      <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: sanitizeHtml(
                            product.description?.includes('<') 
                              ? product.description 
                              : product.description?.replace(/\n/g, '<br/>') || ""
                          )
                        }}
                      />
                   </div>

                   {/* Technical Protocol Section */}
                   {(product.usageInstructions?.trim() || product.dosage?.trim()) && (
                   <div className="relative pt-8 mt-4 border-t border-gray-50">
                      <span id="ky-thuat" className="absolute -top-[130px]" aria-hidden="true"></span>
                      <div className="bg-[#f0f9f4] p-5 md:p-8 rounded-3xl border-2 border-emerald-50 shadow-sm shadow-emerald-100/50">
                      <h3 className="text-xl font-black text-[#1a5c2a] uppercase mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1a5c2a] text-white rounded-xl flex items-center justify-center text-lg shadow-lg shadow-emerald-200">📋</div>
                        Phác đồ kỹ thuật & Hướng dẫn
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {product.usageInstructions?.trim() && (
                         <div className="space-y-4">
                            <p className="font-bold text-gray-900 flex items-center gap-3 text-sm">
                              <span className="w-7 h-7 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-[11px] font-black shadow-md">01</span>
                              Cách sử dụng (Hướng dẫn chuẩn):
                            </p>
                            <div className="text-gray-700 text-[13px] md:text-sm ml-10 leading-relaxed whitespace-pre-line bg-white/50 p-4 rounded-xl border border-emerald-50">
                               {product.usageInstructions}
                            </div>
                         </div>
                         )}

                         {product.dosage?.trim() && (
                         <div className="space-y-4">
                            <p className="font-bold text-gray-900 flex items-center gap-3 text-sm">
                              <span className="w-7 h-7 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-[11px] font-black shadow-md">02</span>
                              Liều lượng & Thời điểm:
                            </p>
                            <div className="text-gray-700 text-[13px] md:text-sm ml-10 leading-relaxed whitespace-pre-line bg-white/50 p-4 rounded-xl border border-emerald-50">
                               {product.dosage}
                            </div>
                         </div>
                         )}
                      </div>
                   </div>
                   </div>
                   )}

                   {/* Benefits */}
                   {Array.isArray(product.benefits) && product.benefits.length > 0 && (
                     <div className="space-y-4 pt-4">
                        <p className="font-black text-gray-900 text-lg uppercase flex items-center gap-2">✨ Lợi ích vượt trội:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {product.benefits.map((b: string, i: number) => (
                            <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                              <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs">✓</span>
                              <span className="text-gray-700 text-sm font-bold">{b}</span>
                            </div>
                          ))}
                        </div>
                     </div>
                   )}

                </div>
              </div>

              {/* Related Products Widget */}
              <div className="bg-white md:rounded-sm shadow-sm overflow-hidden p-6">
                 <h2 className="font-bold text-gray-800 uppercase tracking-wider mb-6 pb-2 border-b">Sản phẩm liên quan</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relatedProducts.length > 0 ? relatedProducts.map((p: any) => (
                       <Link href={`/san-pham/${p.slug}`} key={p._id} className="group cursor-pointer">
                          <div className="aspect-square bg-gray-50 rounded-sm mb-2 flex items-center justify-center overflow-hidden group-hover:bg-gray-100 transition-colors">
                            {p.images?.[0] ? <img src={getImageUrl(p.images[0])} className="w-full h-full object-cover" alt={p.name} /> : <span className="text-3xl">🌿</span>}
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
              <div className="relative">
                <span id="danh-gia" className="absolute -top-[130px]" aria-hidden="true"></span>
                <ProductReviews productId={product._id} />
              </div>

              {/* FAQ */}
              {Array.isArray(product.faq) && product.faq.length > 0 && (
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
                           {p.images?.[0] ? <img src={getImageUrl(p.images[0])} className="w-full h-full object-cover" alt={p.name} /> : <span className="text-4xl">🌱</span>}
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
