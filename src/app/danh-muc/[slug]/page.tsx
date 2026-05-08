import React from 'react';
import Link from 'next/link';
import { ChevronRight, Search, Filter, MessageCircle, Phone } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';
import mongoose from 'mongoose';

async function getCategoryData(slug: string) {
  try {
    await dbConnect();
    const keyword = slug.replace(/-/g, ' ');
    
    // Fetch products
    const products = await Product.find({
      $or: [
        { category_id: slug },
        { category: { $regex: keyword, $options: 'i' } }
      ],
      status: 'approved'
    }).sort({ created_at: -1 }).lean();

    // Fetch pathologies directly from DB collection
    let pathologies: any[] = [];
    if (mongoose.connection.db) {
      pathologies = await mongoose.connection.db.collection('pathologies').find({}).toArray();
    }
    
    const filteredPathologies = pathologies.filter((p: any) => 
      p.title.toLowerCase().includes(keyword.toLowerCase()) || 
      p.slug.includes(slug)
    );

    return {
      products: JSON.parse(JSON.stringify(products)),
      pathologies: JSON.parse(JSON.stringify(filteredPathologies)),
      categoryName: keyword.charAt(0).toUpperCase() + keyword.slice(1)
    };
  } catch (err) {
    console.error("Error fetching category data:", err);
    return { products: [], pathologies: [], categoryName: slug };
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { products, pathologies, categoryName } = await getCategoryData(slug);

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* 1. Header Hero */}
      <section className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] pt-8 md:pt-24 pb-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest mb-4">
             <Link href="/">Trang chủ</Link>
             <ChevronRight size={12} />
             <span className="text-white">Danh mục</span>
             <ChevronRight size={12} />
             <span className="text-[#f5a623]">{categoryName}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Giải pháp chuyên biệt: <br />
            <span className="text-[#f5a623]">{categoryName}</span>
          </h1>
          <p className="text-white/80 max-w-2xl text-lg font-medium">
            Tổng hợp giải pháp phục hồi bệnh lý và danh mục vật tư nông nghiệp chính hãng dành riêng cho {categoryName}.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Content - Pathologies & Products */}
          <div className="flex-1">
            
            {/* 2. Technical Solutions (Pathologies) */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                    <span className="w-2 h-8 bg-[#f5a623] rounded-full" />
                    Giải pháp chuyên sâu: {categoryName}
                 </h2>
              </div>
              
              {pathologies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pathologies.map((pathology: any) => (
                    <Link 
                      key={pathology.slug} 
                      href={`/giai-phap/${pathology.slug}`}
                      className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all"
                    >
                      <div className="flex flex-col h-full">
                         <span className="text-[10px] font-black text-[#f5a623] uppercase tracking-[0.2em] mb-2">Điều trị bệnh lý</span>
                         <h3 className="text-xl font-black text-gray-900 group-hover:text-emerald-700 mb-3 leading-tight">{pathology.title}</h3>
                         <p className="text-gray-500 text-sm mb-6 line-clamp-2">{pathology.painPoint}</p>
                         <div className="mt-auto flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-widest">
                            Xem giải pháp ngay <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                         </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-100">
                   <p className="text-gray-400 font-bold italic">Đang cập nhật giải pháp cho {categoryName}...</p>
                </div>
              )}
            </div>

            {/* 3. Product Catalog */}
            <div>
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                    <span className="w-2 h-8 bg-emerald-600 rounded-full" />
                    Vật tư khuyến nghị
                 </h2>
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                  {products.map((product: any) => (
                    <div key={product.slug} className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl transition-all">
                      <div className="aspect-square bg-gray-50 relative overflow-hidden">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">📦</div>
                        )}
                        {product.isHot && (
                           <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Hot</div>
                        )}
                      </div>
                      <div className="p-4 md:p-6 text-center">
                        <h3 className="font-black text-gray-900 text-sm md:text-lg mb-2 leading-tight group-hover:text-emerald-700 transition-colors">{product.name}</h3>
                        <div className="text-[#f5a623] font-black text-sm md:text-lg mb-4">{product.price || 'Liên hệ'}</div>
                        <a 
                          href={`https://zalo.me/0339505050?text=Tôi cần tư vấn về ${product.name}`}
                          className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
                        >
                          Tư vấn ngay
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-100">
                   <p className="text-gray-400 font-bold italic">Danh mục sản phẩm cho {categoryName} đang được cập nhật...</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar - Support */}
          <div className="lg:w-80 flex-shrink-0">
             <div className="sticky top-32 space-y-6">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden relative">
                   <div className="absolute top-0 left-0 w-full h-2 bg-[#f5a623]" />
                   <h4 className="text-xl font-black text-gray-900 mb-4">Hỗ trợ kỹ thuật</h4>
                   <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
                      Gửi ngay hình ảnh vườn {categoryName} của bà con để đội ngũ PBGT hỗ trợ tư vấn chính xác và miễn phí.
                   </p>
                   <div className="space-y-3">
                      <a href="https://zalo.me/0339505050" target="_blank" className="flex items-center justify-center gap-3 w-full bg-[#0068ff] text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-100 active:scale-95 transition-transform">
                         <MessageCircle size={18} /> Chat Zalo Ngay
                      </a>
                      <a href="tel:0339505050" className="flex items-center justify-center gap-3 w-full bg-emerald-700 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-emerald-100 active:scale-95 transition-transform">
                         <Phone size={18} /> Gọi Tư Vấn
                      </a>
                   </div>
                </div>

                <div className="bg-emerald-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                   <div className="relative z-10">
                      <h4 className="text-lg font-black mb-4">Bạn chưa tìm thấy <br />vấn đề của mình?</h4>
                      <p className="text-white/60 text-xs mb-8 font-medium">Chúng tôi tư vấn tất cả các loại bệnh lý trên cây {categoryName} và các loại cây trồng khác.</p>
                      <Link href="/blog" className="flex items-center justify-between p-4 bg-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/20 transition-colors">
                         Xem thư viện kỹ thuật <ChevronRight size={16} />
                      </Link>
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
