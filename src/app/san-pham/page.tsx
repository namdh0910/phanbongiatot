import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/api';
import { ChevronRight, ArrowRight, MessageCircle, Filter, Search } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';

async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find({ status: 'approved' }).sort({ created_at: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export const metadata = {
  title: 'Danh mục Sản phẩm | Phân Bón Giá Tốt',
  description: 'Tổng hợp vật tư nông nghiệp, phân bón sinh học và giải pháp chăm sóc cây trồng chính hãng.',
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const products = await getProducts();

  const filteredProducts = category 
    ? products.filter((p: any) => p.category === category)
    : products;
  
  return (
    <div className="bg-white min-h-screen">
      <main className="pt-4 md:pt-20 pb-20">
        <div className="container mx-auto px-4">
          
          <Breadcrumbs 
            items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tất cả sản phẩm' }]} 
            className="mb-8"
          />

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar - Filter Placeholder */}
            <aside className="lg:w-1/4 space-y-8 hidden lg:block">
               <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <h3 className="text-xl font-black text-gray-900 uppercase italic tracking-tight mb-6 flex items-center gap-2">
                     <Filter size={20} /> Danh mục
                  </h3>
                  
                  <div className="space-y-6">
                     <div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Nhóm giải pháp</h4>
                        <div className="space-y-3">
                           {['Phục hồi rễ', 'Trị tuyến trùng', 'Xanh lá - mướt cây', 'Dưỡng bông - đậu trái'].map(item => (
                             <Link 
                               key={item} 
                               href={`/san-pham?category=${encodeURIComponent(item)}`}
                               className="flex items-center gap-3 cursor-pointer group"
                             >
                                <div className={`w-5 h-5 rounded-md border-2 transition-colors ${category === item ? 'bg-emerald-600 border-emerald-600' : 'border-gray-200 group-hover:border-emerald-600'}`} />
                                <span className={`text-sm font-bold transition-colors ${category === item ? 'text-emerald-700' : 'text-gray-600 group-hover:text-gray-900'}`}>{item}</span>
                             </Link>
                           ))}
                           {category && (
                             <Link href="/san-pham" className="text-[10px] font-black text-red-500 uppercase tracking-widest pt-4 block">
                               ✕ Xóa bộ lọc
                             </Link>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Contact Widget */}
               <div className="bg-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                     <h4 className="font-black text-xl mb-4">Cần giải pháp riêng?</h4>
                     <p className="text-sm text-emerald-100 mb-6 font-medium">Chụp ảnh vườn gửi kỹ sư tư vấn miễn phí ngay qua Zalo.</p>
                     <a href="https://zalo.me/0773440966" target="_blank" className="bg-white text-emerald-700 font-black px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                        <MessageCircle size={18} fill="currentColor" /> Chat Ngay
                     </a>
                  </div>
               </div>
            </aside>

            {/* Product Grid */}
            <div className="lg:w-3/4">

               <div className="flex items-center justify-between mb-8">
                  <p className="text-gray-400 text-xs font-bold">
                     Hiển thị <span className="text-gray-900">{filteredProducts.length}</span> sản phẩm {category && <span>trong <span className="text-emerald-700">{category}</span></span>}
                  </p>
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sắp xếp:</span>
                     <select className="bg-transparent font-bold text-sm outline-none cursor-pointer">
                        <option>Mới nhất</option>
                        <option>Giá thấp đến cao</option>
                        <option>Giá cao đến thấp</option>
                     </select>
                  </div>
               </div>

                <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
                  {filteredProducts.map((product: any) => (
                    <div 
                      key={product.slug} 
                      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <Link href={`/san-pham/${product.slug}`} className="aspect-square bg-gray-50 relative overflow-hidden block">
                        <img 
                          src={product.images?.[0] || '/og-image.png'} 
                          alt={product.name} 
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
                        />
                        {product.originalPrice > product.price && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-md">
                            Giảm giá
                          </div>
                        )}
                      </Link>
                      
                      <div className="p-3 md:p-5 flex flex-col flex-1">
                        <Link href={`/san-pham/${product.slug}`} className="block mb-2">
                          <h3 className="text-[13px] md:text-base font-black text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors uppercase italic">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="mb-3">
                          {product.originalPrice > product.price && (
                            <p className="text-[10px] text-gray-400 line-through font-bold">₫{product.originalPrice?.toLocaleString("vi-VN")}</p>
                          )}
                          <p className="text-base md:text-lg text-emerald-800 font-black">₫{product.price?.toLocaleString("vi-VN")}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2 mt-auto">
                           <a 
                             href={`https://zalo.me/0773440966?text=Tôi muốn tư vấn về ${product.name}`}
                             target="_blank"
                             className="text-[9px] font-black text-white bg-emerald-700 uppercase tracking-widest py-2.5 rounded-lg flex items-center justify-center hover:bg-emerald-800 transition-colors gap-1.5"
                           >
                             <MessageCircle size={12} fill="currentColor" /> Liên hệ ngay
                           </a>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
               
               {filteredProducts.length === 0 && (
                  <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                     <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="text-gray-300" size={32} />
                     </div>
                     <h3 className="text-2xl font-black text-gray-900 uppercase">Chưa có sản phẩm nào</h3>
                     <p className="text-gray-400 font-medium mt-2">Dữ liệu đang được kỹ sư cập nhật, bà con vui lòng quay lại sau.</p>
                  </div>
               )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
