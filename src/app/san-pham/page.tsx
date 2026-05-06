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

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div className="bg-white min-h-screen">
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          
          {/* Hero Section for Category */}
          <div className="bg-[#1a5c2a] rounded-[3rem] p-12 md:p-20 relative overflow-hidden mb-12">
             <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="relative z-10 max-w-2xl">
                <Breadcrumbs 
                  items={[{ label: 'Trang chủ', href: '/' }, { label: 'Tất cả sản phẩm' }]} 
                  className="mb-6 text-white/60"
                  activeColor="text-[#f5a623]"
                />
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                   Danh mục <br />
                   <span className="text-[#f5a623]">Vật tư nông nghiệp</span>
                </h1>
                <p className="text-emerald-100/70 font-medium text-lg leading-relaxed">
                   Tổng hợp các dòng phân bón sinh học, thuốc bảo vệ thực vật và kích rễ chuyên sâu cho Sầu Riêng, Cà Phê, Hồ Tiêu.
                </p>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar - Filter Placeholder */}
            <aside className="lg:w-1/4 space-y-8">
               <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <h3 className="text-xl font-black text-gray-900 uppercase italic tracking-tight mb-6 flex items-center gap-2">
                     <Filter size={20} /> Bộ lọc
                  </h3>
                  
                  <div className="space-y-6">
                     <div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Loại cây trồng</h4>
                        <div className="space-y-3">
                           {['Sầu riêng', 'Cà phê', 'Hồ tiêu', 'Cây ăn trái'].map(item => (
                             <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-5 h-5 rounded-md border-2 border-gray-200 group-hover:border-emerald-600 transition-colors" />
                                <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">{item}</span>
                             </label>
                           ))}
                        </div>
                     </div>
                     
                     <div className="pt-6 border-t border-gray-200">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Nhóm giải pháp</h4>
                        <div className="space-y-3">
                           {['Phục hồi rễ', 'Trị tuyến trùng', 'Xanh lá - mướt cây', 'Dưỡng bông - đậu trái'].map(item => (
                             <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-5 h-5 rounded-md border-2 border-gray-200 group-hover:border-emerald-600 transition-colors" />
                                <span className="text-sm font-bold text-gray-600 group-hover:text-gray-900">{item}</span>
                             </label>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
               
               {/* Contact Widget */}
               <div className="bg-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                     <h4 className="font-black text-xl mb-4">Cần phác đồ riêng?</h4>
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
                  <p className="text-gray-400 text-sm font-bold">
                     Hiển thị <span className="text-gray-900">{products.length}</span> sản phẩm phù hợp
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

               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {products.map((product: any) => (
                    <div 
                      key={product.slug} 
                      className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                    >
                      <Link href={`/san-pham/${product.slug}`} className="aspect-square bg-gray-50 relative overflow-hidden block">
                        <img 
                          src={product.images?.[0] || '/og-image.png'} 
                          alt={product.name} 
                          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500" 
                        />
                        {product.originalPrice > product.price && (
                          <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                            Khuyến mãi
                          </div>
                        )}
                      </Link>
                      
                      <div className="p-6 flex flex-col flex-1">
                        <div className="mb-2">
                           <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">
                              {product.category}
                           </span>
                        </div>
                        <Link href={`/san-pham/${product.slug}`} className="block">
                          <h3 className="text-lg font-black text-gray-900 line-clamp-2 mb-4 leading-tight group-hover:text-emerald-700 transition-colors uppercase italic">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="mt-auto mb-6">
                          {product.originalPrice > product.price && (
                            <p className="text-xs text-gray-400 line-through font-bold">₫{product.originalPrice?.toLocaleString("vi-VN")}</p>
                          )}
                          <p className="text-xl text-emerald-800 font-black">₫{product.price?.toLocaleString("vi-VN")}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                           <Link 
                             href={`/san-pham/${product.slug}`}
                             className="text-[10px] font-black text-gray-400 uppercase tracking-widest py-3 border border-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
                           >
                             Chi tiết
                           </Link>
                           <a 
                             href={`https://zalo.me/0773440966?text=Tôi muốn tư vấn về ${product.name}`}
                             target="_blank"
                             className="text-[10px] font-black text-white bg-emerald-700 uppercase tracking-widest py-3 rounded-xl flex items-center justify-center hover:bg-emerald-800 transition-colors gap-2"
                           >
                             <MessageCircle size={14} fill="currentColor" /> Liên hệ
                           </a>
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
               
               {products.length === 0 && (
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
