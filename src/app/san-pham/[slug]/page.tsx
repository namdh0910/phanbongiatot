import React from 'react';
import { API_BASE_URL } from '@/utils/api';
import Link from 'next/link';
import { 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star,
  CheckCircle2,
  ArrowRight,
  Package,
  Zap
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

async function getProduct(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

async function getRelatedProducts(category: string, currentSlug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/products?category=${category}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products || []).filter((p: any) => p.slug !== currentSlug).slice(0, 4);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: 'Sản phẩm | Phân Bón Giá Tốt' };

  return {
    title: `${product.name} | Giải Pháp Nông Nghiệp Chính Hãng`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.category, product.slug);
  const zaloUrl = `https://zalo.me/0773440966?text=${encodeURIComponent(`Tôi cần tư vấn về sản phẩm ${product.name}`)}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "sku": product.sku || product.id,
    "brand": {
      "@type": "Brand",
      "name": "Phân Bón Giá Tốt"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.phanbongiatot.com/san-pham/${product.slug}`,
      "priceCurrency": "VND",
      "price": product.price,
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "128"
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={[
              { label: 'Sản phẩm', href: '/danh-muc/tat-ca' },
              { label: product.category, href: `/danh-muc/${product.category.toLowerCase().replace(/\s+/g, '-')}` },
              { label: product.name }
            ]} />
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Left: Images */}
            <div className="lg:w-1/2 space-y-6">
              <div className="aspect-square rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group relative">
                <img 
                  src={product.images?.[0] || '/og-image.png'} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700" 
                />
                {product.isHot && (
                  <div className="absolute top-8 left-8 bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg">
                    Hot Product
                  </div>
                )}
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {(product.images || []).map((img: string, i: number) => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 cursor-pointer hover:border-emerald-500 transition-all">
                      <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover p-2" />
                    </div>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                 <div className="flex flex-col items-center text-center p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                    <ShieldCheck className="text-emerald-700 mb-2" size={20} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-900">Chính hãng 100%</span>
                 </div>
                 <div className="flex flex-col items-center text-center p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                    <Truck className="text-emerald-700 mb-2" size={20} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-900">Giao toàn quốc</span>
                 </div>
                 <div className="flex flex-col items-center text-center p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                    <RotateCcw className="text-emerald-700 mb-2" size={20} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-900">Kiểm tra tại vườn</span>
                 </div>
              </div>
            </div>

            {/* Right: Info & CTA */}
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                   <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                     {product.category}
                   </span>
                   {product.stock > 0 ? (
                     <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 size={12} /> Còn hàng
                     </span>
                   ) : (
                     <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">Hết hàng</span>
                   )}
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4">
                   <div className="flex text-amber-400">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                   </div>
                   <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                      Đã tư vấn {product.soldCount || 150}+ vườn thành công
                   </span>
                </div>

                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none text-8xl rotate-12">💰</div>
                   <div className="relative z-10">
                      <div className="flex items-baseline gap-4 mb-2">
                         <span className="text-4xl md:text-5xl font-black text-[#f5a623]">
                            ₫{product.price?.toLocaleString("vi-VN")}
                         </span>
                         {product.originalPrice > product.price && (
                           <span className="text-xl text-gray-400 line-through font-bold">
                              ₫{product.originalPrice?.toLocaleString("vi-VN")}
                           </span>
                         )}
                      </div>
                      <p className="text-emerald-700 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                         <Zap size={14} fill="currentColor" /> Nhận ngay ưu đãi khi mua theo phác đồ
                      </p>
                   </div>
                </div>

                <div className="space-y-4 pt-6">
                   <a 
                     href={zaloUrl}
                     target="_blank"
                     className="w-full bg-[#0068FF] hover:bg-blue-600 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-[0.1em] flex items-center justify-center gap-3 shadow-xl shadow-blue-100 transition-all active:scale-95 animate-heartbeat"
                   >
                      <MessageCircle fill="currentColor" /> Chat Zalo Nhận Phác Đồ
                   </a>
                   <a 
                     href="tel:0773440966"
                     className="w-full bg-white border-2 border-[#1a5c2a] text-[#1a5c2a] hover:bg-emerald-50 py-6 rounded-2xl font-black text-lg uppercase tracking-[0.1em] flex items-center justify-center gap-3 transition-all active:scale-95"
                   >
                      <Phone /> Gọi kỹ sư ngay
                   </a>
                </div>

                <div className="pt-10 border-t border-gray-100 space-y-8">
                   <div>
                      <h3 className="text-xl font-black text-gray-900 uppercase italic tracking-tight mb-4 flex items-center gap-2">
                         <span className="w-1.5 h-6 bg-[#f5a623] rounded-full" />
                         Công dụng chuyên sâu
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-medium">
                        {product.description}
                      </p>
                   </div>

                   {product.features && product.features.length > 0 && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(product.features || []).map((feature: string, i: number) => (
                           <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl">
                              <CheckCircle2 className="text-emerald-600 mt-0.5 flex-shrink-0" size={18} />
                              <span className="text-sm font-bold text-gray-700">{feature}</span>
                           </div>
                        ))}
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-32 pt-20 border-t border-gray-100">
               <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">
                     Vật tư khuyến nghị cùng bộ
                  </h2>
                  <Link href="/danh-muc/tat-ca" className="text-emerald-700 font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform flex items-center gap-2">
                    Xem tất cả <ArrowRight size={16} />
                  </Link>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {(relatedProducts || []).map((p: any) => (
                    <Link key={p.slug} href={`/san-pham/${p.slug}`} className="group bg-white rounded-3xl border border-gray-100 p-4 hover:shadow-2xl hover:-translate-y-1 transition-all">
                       <div className="aspect-square rounded-2xl bg-gray-50 mb-4 overflow-hidden p-4">
                          <img src={p.images?.[0] || '/og-image.png'} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                       </div>
                       <h4 className="font-black text-gray-900 text-sm mb-2 line-clamp-1 group-hover:text-emerald-700 transition-colors uppercase">{p.name}</h4>
                       <div className="text-[#f5a623] font-black text-sm">₫{p.price?.toLocaleString("vi-VN")}</div>
                    </Link>
                  ))}
               </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
