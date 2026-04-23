"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from '@/utils/api';
import Link from "next/link";
import { useParams } from "next/navigation";
import CheckoutModal from "@/components/CheckoutModal";
import { trackEvent } from "@/utils/analytics";

const categoryMap: Record<string, { name: string; icon: string }> = {
  "phan-bon": { name: "Phân bón", icon: "🌱" },
  "thuoc-tru-sau": { name: "Thuốc trừ sâu", icon: "🐛" },
  "kich-re": { name: "Kích rễ", icon: "🧪" },
  "tuyen-trung": { name: "Tuyến trùng", icon: "🦠" },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoryInfo = categoryMap[slug] || { name: "Sản phẩm", icon: "📦" };

  useEffect(() => {
    setIsLoading(true);
    const categoryStr = categoryInfo.name;
    fetch(`${API_BASE_URL}/products?category=${encodeURIComponent(categoryStr)}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [slug, categoryInfo.name]);

  const handleQuickBuy = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    trackEvent('QuickBuy_Category_Click', { product_name: product.name, category: slug });
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-20">
      {/* Category Hero */}
      <div className="bg-white border-b border-gray-200 mb-8 pt-6 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl border border-green-100 shadow-inner">
               {categoryInfo.icon}
             </div>
             <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{categoryInfo.name}</h1>
                <p className="text-gray-500 text-sm mt-1">Giải pháp nông nghiệp chuyên nghiệp cho bà con</p>
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 sticky top-28 z-30">
              <h3 className="font-black text-sm mb-6 border-b pb-4 text-gray-900 uppercase tracking-widest">Danh mục</h3>
              <ul className="space-y-3">
                {Object.entries(categoryMap).map(([catSlug, info]) => (
                  <li key={catSlug}>
                    <Link 
                      href={`/danh-muc/${catSlug}`} 
                      className={`flex items-center justify-between group py-1 ${slug === catSlug ? 'text-[#ee4d2d] font-bold' : 'text-gray-600 hover:text-[#ee4d2d]'} transition-colors text-sm`}
                    >
                      <span>{info.name}</span>
                      <span className={`text-[10px] transform group-hover:translate-x-1 transition-transform ${slug === catSlug ? 'opacity-100' : 'opacity-0'}`}>▶</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => <div key={i} className="aspect-[4/5] bg-gray-200 animate-pulse rounded-sm"></div>)}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
                {products.map((product: any, i: number) => {
                  const imgSrc = product.images?.[0];
                  const isUrl = imgSrc && (imgSrc.startsWith("http") || imgSrc.startsWith("/"));
                  return (
                    <Link href={`/san-pham/${product.slug}`} key={i} className="bg-white rounded-sm overflow-hidden shadow-sm border border-transparent hover:border-[#ee4d2d] hover:shadow-lg transition-all group flex flex-col h-full relative">
                      {/* Image area */}
                      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
                        {isUrl ? (
                          <img src={imgSrc} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="text-center p-4">
                             <span className="text-5xl group-hover:scale-110 transition-transform block mb-2">🌱</span>
                             <span className="font-bold text-green-700 text-[10px] uppercase tracking-tighter line-clamp-1">{product.name}</span>
                          </div>
                        )}
                        <div className="absolute top-0 right-0 flex flex-col gap-1 items-end">
                          {product.isBestSeller && <div className="bg-[#ee4d2d] text-white font-bold px-1.5 py-0.5 text-[9px] uppercase shadow-sm">Bán chạy</div>}
                          {product.isNewArrival && <div className="bg-[#00bfa5] text-white font-bold px-1.5 py-0.5 text-[9px] uppercase shadow-sm">Hàng mới</div>}
                          {(!product.isBestSeller && !product.isNewArrival) && <div className="bg-[#fce015] text-[#ee4d2d] font-bold px-1.5 py-0.5 text-[9px] uppercase shadow-sm">HOT</div>}
                        </div>
                      </div>
                      {/* Info */}
                      <div className="p-3 md:p-5 flex flex-col flex-1">
                        <h3 className="font-medium text-xs md:text-sm text-gray-800 group-hover:text-[#ee4d2d] transition-colors line-clamp-2 mb-3 min-h-[32px] md:min-h-[40px]">{product.name}</h3>
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-3">
                             <span className="font-black text-[#ee4d2d] text-sm md:text-lg">₫{(product.price).toLocaleString("vi-VN")}</span>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              handleQuickBuy(product);
                            }}
                            className="w-full bg-[#ee4d2d] text-white py-1.5 rounded-sm font-bold text-[10px] md:text-xs hover:bg-[#d73211] transition-colors uppercase"
                          >
                            Mua ngay
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white p-20 text-center rounded-sm border border-dashed border-gray-300">
                 <p className="text-gray-500">Chưa có sản phẩm nào trong danh mục này.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CheckoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} />
    </div>
  );
}
