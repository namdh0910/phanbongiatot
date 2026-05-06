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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <main className="pt-4 md:pt-20 pb-20">
        <div className="container mx-auto px-4">
          
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs items={[
              { label: 'Sản phẩm', href: '/san-pham' },
              { label: product.category, href: `/danh-muc/${product.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').replace(/\s+/g, '-')}` },
              { label: product.name }
            ]} />
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            
            {/* Left: Images */}
            <div className="lg:w-1/2 space-y-4">
              {/* Main Image - Reduced padding for better space utilization */}
              <div className="aspect-square max-h-[320px] md:max-h-none rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group relative mx-auto">
                <img 
                  src={product.images?.[0] || '/og-image.png'} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-2 md:p-6 group-hover:scale-105 transition-transform duration-700" 
                />
                {product.isHot && (
                  <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse shadow-lg">
                    HOT
                  </div>
                )}
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

                <h1 className="text-2xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4">
                   <div className="flex text-amber-400">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                   </div>
                   <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                      Đã tư vấn {product.soldCount || 150}+ vườn
                   </span>
                </div>

                {/* Thumbnails moved here to optimize space */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {(product.images || []).map((img: string, i: number) => (
                      <div key={i} className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 cursor-pointer hover:border-emerald-500 transition-all">
                        <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover p-1" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-[#fcf8f0] p-6 md:p-8 rounded-[2rem] border border-orange-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-[0.05] select-none text-8xl rotate-12">💰</div>
                   <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-4xl md:text-5xl font-black text-[#e67e22]">
                            ₫{product.price?.toLocaleString("vi-VN")}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-400 line-through font-bold">
                              ₫{product.originalPrice?.toLocaleString("vi-VN")}
                          </span>
                        )}
                      </div>
                      <p className="text-emerald-700 text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2">
                         <Zap size={14} fill="currentColor" /> Nhận ngay ưu đãi khi mua theo quy trình
                      </p>
                   </div>
                </div>

                 <div className="flex flex-col gap-3 pt-6">
                    <a 
                      href={buyUrl}
                      target="_blank"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-black text-sm md:text-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-100 transition-all active:scale-95"
                    >
                       <Package size={20} /> MUA NGAY
                    </a>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <a 
                        href={zaloUrl}
                        target="_blank"
                        className="bg-[#0068FF] hover:bg-blue-600 text-white py-4 rounded-2xl font-black text-sm md:text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-100 transition-all active:scale-95"
                      >
                         <MessageCircle size={18} fill="currentColor" /> LIÊN HỆ ZALO
                      </a>
                      <a 
                        href="tel:0773440966"
                        className="bg-white border-2 border-emerald-800 text-emerald-800 hover:bg-emerald-50 py-4 rounded-2xl font-black text-sm md:text-base uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                      >
                         <Phone size={18} /> GỌI KỸ SƯ
                      </a>
                    </div>
                </div>

                {/* Trust Badges - Moved here for better conversion flow */}
                <div className="grid grid-cols-3 gap-3 pt-6">
                   <div className="flex flex-col items-center text-center p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                      <ShieldCheck className="text-emerald-700 mb-2" size={18} />
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-emerald-900">Chính hãng</span>
                   </div>
                   <div className="flex flex-col items-center text-center p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                      <Truck className="text-emerald-700 mb-2" size={18} />
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-emerald-900">Giao toàn quốc</span>
                   </div>
                   <div className="flex flex-col items-center text-center p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                      <RotateCcw className="text-emerald-700 mb-2" size={18} />
                      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-emerald-900">Kiểm tra vườn</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Info - Now Full Width for better readability */}
          <div className="mt-12 pt-10 border-t border-gray-100 space-y-12">
             <div className="bg-emerald-50/30 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-emerald-100/50">
                <h3 className="text-2xl md:text-3xl font-black text-emerald-900 uppercase italic tracking-tight mb-8 flex items-center gap-3">
                   <span className="w-2 h-10 bg-orange-500 rounded-full" />
                   Công dụng chuyên sâu
                </h3>
                <div 
                  className="text-gray-700 leading-relaxed font-medium prose prose-emerald prose-base md:prose-xl max-w-none prose-p:mb-6 prose-strong:text-emerald-900 prose-strong:font-black"
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

      {/* Sticky Bottom CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 flex gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
        <a 
          href={buyUrl}
          target="_blank"
          className="flex-[1.5] bg-orange-600 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
        >
          <Zap size={16} fill="currentColor" /> Mua ngay
        </a>
        <a 
          href={zaloUrl}
          target="_blank"
          className="flex-1 bg-[#0068FF] text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
        >
          <MessageCircle size={16} fill="currentColor" /> Liên hệ
        </a>
      </div>
    </div>
  );
}
