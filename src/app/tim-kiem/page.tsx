"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/api";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams?.get('q') || '';
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/products?limit=100`);
        if (res.ok) {
          const data = await res.json();
          const allProducts = Array.isArray(data) ? data : data.products || [];
          
          // Filter products locally for speed (assuming catalog isn't massive)
          const searchLower = q.toLowerCase();
          const filtered = allProducts.filter((p: any) => 
            p.name.toLowerCase().includes(searchLower) || 
            (p.description && p.description.toLowerCase().includes(searchLower)) ||
            (p.category && p.category.toLowerCase().includes(searchLower))
          );
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
      } finally {
        setLoading(false);
      }
    };

    if (q) {
      fetchResults();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [q]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-[60vh]">
      <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-2">
        Kết quả tìm kiếm cho: <span className="text-[#1a5c2a]">"{q}"</span>
      </h1>
      <p className="text-gray-500 mb-10 font-medium">Tìm thấy {products.length} sản phẩm phù hợp.</p>

      {products.length === 0 ? (
        <div className="text-center bg-gray-50 rounded-3xl py-20 border border-gray-100">
          <div className="text-6xl mb-6 opacity-30">🔍</div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">Không tìm thấy sản phẩm nào!</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Rất tiếc, chúng tôi không tìm thấy sản phẩm nào khớp với từ khóa "{q}". Vui lòng thử lại với từ khóa khác chung chung hơn.
          </p>
          <Link href="/" className="inline-block bg-[#1a5c2a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2d7a3e] transition-colors shadow-lg shadow-green-100">
            Quay lại Cửa Hàng
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group relative">
              <Link href={`/san-pham/${product.slug}`} className="block relative aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4">
                <img 
                  src={product.images[0] || "https://placehold.co/400x400/e2e8f0/64748b?text=SP"} 
                  alt={product.name}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div>
                <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">{product.category}</p>
                <Link href={`/san-pham/${product.slug}`} className="block">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base leading-snug line-clamp-2 hover:text-[#1a5c2a] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-[#ee4d2d] font-black text-lg">
                    {product.price.toLocaleString('vi-VN')}đ
                  </p>
                  <Link href={`/san-pham/${product.slug}`} className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-black group-hover:bg-[#1a5c2a] group-hover:text-white transition-colors">
                    +
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải...</div>}>
      <SearchResults />
    </Suspense>
  );
}
