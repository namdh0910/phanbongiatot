"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/utils/api";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShopPage() {
  const { id } = useParams();
  const [shop, setShop] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const [shopRes, prodRes] = await Promise.all([
          fetch(`${API_BASE_URL}/users/${id}`), // Assuming this endpoint exists or I'll create it
          fetch(`${API_BASE_URL}/products?seller=${id}`)
        ]);

        if (shopRes.ok) setShop(await shopRes.json());
        if (prodRes.ok) {
          const data = await prodRes.json();
          setProducts(data.products || data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopData();
  }, [id]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Đang tải gian hàng...</div>;
  if (!shop) return <div className="min-h-screen flex items-center justify-center">Không tìm thấy gian hàng</div>;

  const vendor = shop.vendorInfo || {};

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Header />
      
      {/* Shop Header Banner */}
      <div className="bg-[#1a5c2a] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={vendor.banner || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000"} className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full border-4 border-white/20 p-1 bg-white shadow-2xl">
             <img src={vendor.logo || "https://img.icons8.com/bubbles/100/000000/shop.png"} className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="text-center md:text-left flex-1">
             <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-4xl font-black italic tracking-tighter uppercase">{vendor.storeName || "Gian Hàng Đối Tác"}</h1>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Shop Uy Tín</span>
             </div>
             <p className="text-green-100 max-w-2xl text-lg font-medium italic opacity-90">{vendor.description || "Chuyên cung cấp các giải pháp phân bón và kỹ thuật canh tác bền vững cho bà con nông dân."}</p>
             
             <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6 text-sm font-bold">
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
                   <span>⭐</span> 4.9/5 (1.2k Đánh giá)
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
                   <span>📦</span> {products.length} Sản phẩm
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
                   <span>🕒</span> Tham gia: 2 năm trước
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
           <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
             <span className="w-8 h-8 bg-[#1a5c2a] text-white rounded-lg flex items-center justify-center text-sm">📦</span>
             TẤT CẢ SẢN PHẨM
           </h2>
           <div className="flex gap-2">
              <select className="bg-white border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-500 shadow-sm focus:ring-2 focus:ring-[#1a5c2a] outline-none">
                 <option>Mới nhất</option>
                 <option>Giá: Thấp đến Cao</option>
                 <option>Giá: Cao đến Thấp</option>
                 <option>Bán chạy nhất</option>
              </select>
           </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
             <p className="text-gray-400 font-bold italic">Gian hàng hiện chưa đăng sản phẩm nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
