"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from '@/utils/api';
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { trackEvent } from "@/utils/analytics";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";

const categoryMap: Record<string, { name: string; icon: string }> = {
  "phan-bon": { name: "Phân bón", icon: "🌱" },
  "thuoc-tru-sau": { name: "Thuốc trừ sâu", icon: "🐛" },
  "kich-re": { name: "Kích rễ", icon: "🧪" },
  "tuyen-trung": { name: "Tuyến trùng", icon: "🦠" },
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const slug = params?.slug as string;
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryInfo = categoryMap[slug] || { name: "Sản phẩm", icon: "📦" };

  useEffect(() => {
    setIsLoading(true);
    const categoryStr = categoryInfo.name;
    fetch(`${API_BASE_URL}/products?category=${encodeURIComponent(categoryStr)}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && typeof data === 'object' && Array.isArray((data as any).products)) {
          setProducts((data as any).products);
        } else {
          setProducts([]);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching category products:", err);
        setProducts([]);
        setIsLoading(false);
      });
  }, [slug, categoryInfo.name]);

  const handleQuickBuy = (product: any) => {
    trackEvent('QuickBuy_Category_Click', { product_name: product.name, category: slug });
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-20">
      <Breadcrumbs items={[{ label: categoryInfo.name }]} />
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

      {/* Sticky Filter Bar (Mobile) */}
      <div className="lg:hidden sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex overflow-x-auto py-3 px-4 gap-2 scrollbar-hide">
          {["Tất cả", "Sầu riêng", "Cà phê", "Tiêu", "Lúa", "Rau màu"].map((cat) => (
            <button 
              key={cat}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                cat === "Tất cả" ? "bg-[#1a5c2a] text-white" : "bg-gray-100 text-gray-600"
              }`}
              style={{ height: '36px' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar (Desktop only now) */}
          <div className="hidden lg:block w-1/4">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {products.map((product: any, i: number) => (
                  <ProductCard key={i} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-20 text-center rounded-sm border border-dashed border-gray-300">
                 <p className="text-gray-500">Chưa có sản phẩm nào trong danh mục này.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
