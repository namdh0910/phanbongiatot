import { API_BASE_URL } from '@/utils/api';
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";

async function getShopInfo(username: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/profile?username=${username}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getShopProducts(sellerId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/products?seller_id=${sellerId}&limit=20`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function ShopPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: username } = await params;
  const seller = await getShopInfo(username);

  if (!seller) return <div className="p-20 text-center">Cửa hàng không tồn tại</div>;

  const products = await getShopProducts(seller._id);
  const vendorInfo = seller.vendorInfo || {};

  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-24">
      {/* Shop Header Banner */}
      <div className="bg-emerald-900 h-48 md:h-64 relative">
         <div className="absolute inset-0 bg-black/30"></div>
         <div className="container mx-auto h-full flex items-end pb-8 px-4 relative z-10">
            <Breadcrumbs items={[{ label: 'Cửa hàng', href: '#' }, { label: vendorInfo.storeName || username }]} light />
         </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20">
         {/* Shop Info Card */}
         <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-10 flex flex-col md:flex-row gap-8 items-center border border-emerald-50">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-50 flex-shrink-0 -mt-24 md:-mt-20">
               <img 
                 src={vendorInfo.logo || "https://img.icons8.com/bubbles/100/000000/shop.png"} 
                 className="w-full h-full object-cover" 
                 alt={vendorInfo.storeName}
               />
            </div>
            
            <div className="flex-1 text-center md:text-left">
               <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
                  <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">
                    {vendorInfo.storeName || "Gian hàng đối tác"}
                  </h1>
                  {vendorInfo.isApproved && (
                    <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                      ✓ Mall Verified
                    </span>
                  )}
               </div>
               
               <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                     <span className="text-lg">📍</span> {vendorInfo.address || "Việt Nam"}
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-lg">📦</span> {products.length} Sản phẩm
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-lg">⭐</span> {vendorInfo.rating || 4.9} Đánh giá
                  </div>
               </div>
            </div>

            <div className="flex gap-4">
               <a href={`https://zalo.me/${vendorInfo.phone || '0773440966'}`} target="_blank" className="bg-[#1a5c2a] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-[#2d7a3e] transition-all active:scale-95">
                  CHAT VỚI SHOP
               </a>
               <button className="bg-gray-100 text-gray-600 px-8 py-4 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all active:scale-95">
                  THEO DÕI
               </button>
            </div>
         </div>

         {/* Shop Tabs */}
         <div className="flex gap-10 mb-8 border-b border-gray-200 pb-px">
            <button className="text-[#1a5c2a] font-black uppercase text-sm border-b-2 border-[#1a5c2a] pb-4">Tất cả sản phẩm</button>
            <button className="text-gray-400 font-black uppercase text-sm pb-4 hover:text-gray-600">Hồ sơ năng lực</button>
            <button className="text-gray-400 font-black uppercase text-sm pb-4 hover:text-gray-600">Đánh giá shop</button>
         </div>

         {/* Products Grid */}
         {products.length > 0 ? (
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-700">
             {products.map((p: any) => (
               <ProductCard key={p._id} product={p} />
             ))}
           </div>
         ) : (
           <div className="bg-white rounded-[2rem] p-20 text-center">
              <div className="text-6xl mb-6">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có sản phẩm nào</h3>
              <p className="text-gray-500">Shop đang cập nhật danh mục sản phẩm mới, quý khách vui lòng quay lại sau.</p>
           </div>
         )}
      </div>
    </div>
  );
}
