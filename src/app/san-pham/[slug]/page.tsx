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
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductGallery from '@/components/product/ProductGallery';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';

async function getProduct(slug: string) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).lean();
    return product ? JSON.parse(JSON.stringify(product)) : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(category: string, currentSlug: string) {
  try {
    await dbConnect();
    const products = await Product.find({ 
      category: category,
      slug: { $ne: currentSlug },
      status: 'approved'
    }).limit(4).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
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

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const relatedProducts = await getRelatedProducts(product.category, product.slug);
  const zaloUrl = `https://zalo.me/0773440966?text=${encodeURIComponent(`Tôi cần tư vấn về sản phẩm ${product.name}`)}`;
  const buyUrl = `https://zalo.me/0773440966?text=${encodeURIComponent(`Tôi muốn mua sản phẩm ${product.name}, vui lòng báo giá và giao hàng.`)}`;

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
      <main className="pb-20 md:pb-32">
        <div className="container mx-auto px-2 md:px-4">
          <div className="mb-3 md:mb-6 mt-2">
            <Breadcrumbs items={[
              { label: 'Sản phẩm', href: '/san-pham' },
              { label: product.category, href: `/danh-muc/${product.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/\s+/g, '-')}` },
              { label: product.name }
            ]} />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            
            <ProductGallery images={product.images || []} name={product.name} isHot={product.isHot} />

            {/* Right: Info & CTA Cluster */}
            <div className="lg:w-1/2 flex flex-col gap-4 md:gap-6">
              {/* Cluster 2: Name & Rating */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                   <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest">
                     {product.category}
                   </span>
                   {product.stock > 0 ? (
                     <span className="text-emerald-600 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 size={10} /> Còn hàng
                     </span>
                   ) : (
                     <span className="text-red-500 text-[9px] font-black uppercase tracking-widest">Hết hàng</span>
                   )}
                </div>

                <h1 className="text-xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3">
                   <div className="flex text-amber-400">
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                   </div>
                   <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      Đã tư vấn {product.soldCount || 150}+ vườn
                   </span>
                </div>
              </div>

              {/* Cluster 3: Price + Offer + Immediate CTA */}
              <div className="space-y-3">
                <div className="bg-[#fcf8f0] p-4 md:p-8 rounded-2xl md:rounded-[2rem] border border-orange-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 md:p-8 opacity-[0.03] select-none text-6xl md:text-8xl rotate-12">💰</div>
                   <div className="relative z-10 flex flex-col gap-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl md:text-5xl font-black text-orange-600">
                            ₫{product.price?.toLocaleString("vi-VN")}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm md:text-lg text-gray-400 line-through font-bold">
                              ₫{product.originalPrice?.toLocaleString("vi-VN")}
                          </span>
                        )}
                      </div>
                      <p className="text-emerald-700 text-[9px] md:text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
                         <Zap size={12} fill="currentColor" /> Nhận ngay ưu đãi khi mua theo quy trình
                      </p>
                   </div>
                </div>

                <div className="flex flex-col gap-2">
                    <a 
                      href={buyUrl}
                      target="_blank"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-xl font-black text-xs md:text-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-100 transition-all"
                    >
                       <Package size={18} /> MUA NGAY
                    </a>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <a 
                        href={zaloUrl}
                        target="_blank"
                        className="bg-[#0068FF] hover:bg-blue-600 text-white py-3 rounded-xl font-black text-[10px] md:text-base uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                      >
                         <MessageCircle size={16} fill="currentColor" /> ZALO PBGT
                      </a>
                      <a 
                        href="tel:0773440966"
                        className="bg-white border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-50 py-3 rounded-xl font-black text-[10px] md:text-base uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                      >
                         <Phone size={16} /> GỌI NGAY
                      </a>
                    </div>
                </div>
              </div>

              {/* Cluster 4: USPs / Trust Badges */}
              <div className="grid grid-cols-3 gap-2">
                 <div className="flex flex-col items-center text-center p-2 bg-emerald-50/50 rounded-xl border border-emerald-50">
                    <ShieldCheck className="text-emerald-700 mb-1" size={16} />
                    <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-emerald-900 leading-tight">Chính hãng 100%</span>
                 </div>
                 <div className="flex flex-col items-center text-center p-2 bg-emerald-50/50 rounded-xl border border-emerald-50">
                    <Truck className="text-emerald-700 mb-1" size={16} />
                    <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-emerald-900 leading-tight">Giao toàn quốc</span>
                 </div>
                 <div className="flex flex-col items-center text-center p-2 bg-emerald-50/50 rounded-xl border border-emerald-50">
                    <RotateCcw className="text-emerald-700 mb-1" size={16} />
                    <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-emerald-900 leading-tight">Kiểm tra tại vườn</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Detailed Info - Section Optimized */}
          <div className="mt-8 md:mt-16 pt-8 md:pt-12 border-t border-gray-100 space-y-8">
             <div className="bg-emerald-50/20 p-5 md:p-12 rounded-3xl md:rounded-[3.5rem] border border-emerald-100/30">
                <h3 className="text-lg md:text-3xl font-black text-emerald-900 uppercase italic tracking-tight mb-5 flex items-center gap-2">
                   <span className="w-1.5 h-6 bg-orange-500 rounded-full" />
                   Công dụng chuyên sâu
                </h3>
                <div 
                  className="text-gray-700 leading-relaxed font-medium prose prose-emerald prose-sm md:prose-xl max-w-none prose-p:mb-3 prose-strong:text-emerald-900 prose-ul:list-disc prose-ul:pl-5 prose-li:mb-1"
                  dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br/>') }}
                ></div>
             </div>

             {product.features && product.features.length > 0 && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(product.features || []).map((feature: string, i: number) => (
                     <div key={i} className="flex items-center gap-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="text-emerald-700" size={24} />
                        </div>
                        <span className="text-base md:text-lg font-bold text-gray-800">{feature}</span>
                     </div>
                  ))}
               </div>
             )}
          </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 md:mt-32 pt-10 md:pt-20 border-t border-gray-100">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">
                Vật tư khuyến nghị cùng bộ
              </h2>
              <Link href="/san-pham" className="text-emerald-700 font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform flex items-center gap-2">
                Xem tất cả <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {(relatedProducts || []).map((p: any) => (
                <Link key={p.slug} href={`/san-pham/${p.slug}`} className="group bg-white rounded-3xl border border-gray-100 p-4 hover:shadow-2xl hover:-translate-y-1 transition-all">
                  <div className="aspect-square rounded-2xl bg-gray-50 mb-4 overflow-hidden p-4">
                    <img src={p.images?.[0] || '/og-image.png'} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h4 className="font-black text-gray-900 text-[10px] md:text-sm mb-2 line-clamp-2 leading-tight group-hover:text-emerald-700 transition-colors uppercase italic">{p.name}</h4>
                  <div className="text-[#f5a623] font-black text-[10px] md:text-sm">₫{p.price?.toLocaleString("vi-VN")}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>

      {/* Sticky Bottom CTA for Mobile - Enhanced with Price */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3 flex items-center justify-between gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Giá ưu đãi</span>
          <span className="text-xl font-black text-orange-600 leading-none">₫{product.price?.toLocaleString("vi-VN")}</span>
        </div>
        <a 
          href={buyUrl}
          target="_blank"
          className="flex-1 bg-orange-600 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-orange-100 active:scale-95 transition-all"
        >
          <Zap size={16} fill="currentColor" /> MUA NGAY
        </a>
      </div>
    </div>
  );
}
