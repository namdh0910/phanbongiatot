"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/utils/api";

export default function VendorProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("vendorToken");
    if (!token) {
      router.push("/kenh-nguoi-ban/dang-nhap");
      return;
    }
    fetchProducts(token);
  }, []);

  const fetchProducts = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/seller/products`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/seller/products/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchProducts(token!);
      }
    } catch (error) {
      alert("Lỗi cập nhật trạng thái.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': 
        return <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">✅ Đang bán</span>;
      case 'pending_review': 
        return <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">🟡 Chờ duyệt</span>;
      case 'rejected': 
        return <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">❌ Bị từ chối</span>;
      case 'hidden': 
        return <span className="bg-gray-100 text-gray-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">⏸ Đang ẩn</span>;
      default: 
        return <span className="bg-gray-50 text-gray-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24 px-4 md:px-6">
      {/* Header */}
      <div className="container mx-auto py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase italic">Kho hàng của tôi</h1>
          <p className="text-gray-500 font-medium mt-1">Quản lý và theo dõi trạng thái sản phẩm</p>
        </div>
        <Link href="/kenh-nguoi-ban/san-pham/them-moi" className="bg-[#1a5c2a] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-100 hover:bg-[#2d7a3e] transition-all active:scale-95">
          + ĐĂNG SẢN PHẨM MỚI
        </Link>
      </div>

      {/* Product List */}
      <div className="container mx-auto">
        {loading ? (
          <div className="text-center py-20 animate-pulse text-gray-400 font-bold uppercase tracking-widest text-xs">Đang tải sản phẩm...</div>
        ) : products.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100">
             <div className="text-7xl mb-6 opacity-20">📦</div>
             <h3 className="text-xl font-black text-gray-800 mb-2">Chưa có sản phẩm nào</h3>
             <p className="text-gray-400 font-medium mb-8">Hãy bắt đầu kinh doanh bằng cách đăng sản phẩm đầu tiên.</p>
             <Link href="/kenh-nguoi-ban/san-pham/them-moi" className="text-[#1a5c2a] font-black hover:underline">ĐĂNG NGAY ➜</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p._id} className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-all group">
                 <div className="flex gap-4 mb-6">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                       {p.images?.[0] ? <img src={p.images[0]} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl">📦</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="mb-2">{getStatusBadge(p.status)}</div>
                       <h3 className="font-black text-gray-900 leading-tight line-clamp-2">{p.name}</h3>
                       <div className="flex items-center gap-2 mt-1">
                          <p className="text-[#ee4d2d] font-black text-lg">₫{p.price.toLocaleString()}</p>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">/ {p.unit || 'chai'}</span>
                       </div>
                       <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">Tồn kho: {p.stock || 0}</p>
                    </div>
                 </div>

                 {p.status === 'rejected' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                       <p className="text-[10px] font-black text-red-500 uppercase mb-1">Lý do từ chối:</p>
                       <p className="text-xs text-red-600 font-medium leading-relaxed">{p.rejectionReason || "Sản phẩm không đạt yêu cầu nội dung hoặc hình ảnh."}</p>
                    </div>
                 )}

                 <div className="mt-auto pt-6 border-t border-gray-50 flex flex-wrap gap-2">
                    {p.status === 'approved' && (
                       <>
                         <button className="flex-1 bg-gray-50 text-gray-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-tight hover:bg-gray-100 transition-colors">Sửa</button>
                         <button 
                           onClick={() => handleStatusUpdate(p._id, 'hidden')}
                           className="flex-1 bg-gray-50 text-gray-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-tight hover:bg-orange-50 hover:text-orange-600 transition-colors"
                         >
                           Tạm ẩn
                         </button>
                       </>
                    )}
                    {p.status === 'pending_review' && (
                       <button className="w-full bg-gray-50 text-gray-400 py-3 rounded-xl text-[10px] font-black uppercase tracking-tight cursor-not-allowed">Đang chờ Admin duyệt</button>
                    )}
                    {p.status === 'rejected' && (
                       <button className="w-full bg-[#1a5c2a] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-tight hover:bg-[#2d7a3e] transition-colors">Sửa và gửi lại</button>
                    )}
                    {p.status === 'hidden' && (
                       <>
                         <button className="flex-1 bg-gray-50 text-gray-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-tight hover:bg-gray-100 transition-colors">Sửa</button>
                         <button 
                           onClick={() => handleStatusUpdate(p._id, 'approved')}
                           className="flex-1 bg-emerald-50 text-emerald-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-tight hover:bg-emerald-100 transition-colors"
                         >
                           Hiện lại
                         </button>
                       </>
                    )}
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action for Mobile */}
      <Link href="/kenh-nguoi-ban/san-pham/them-moi" className="fixed bottom-24 right-6 w-16 h-16 bg-[#1a5c2a] text-white rounded-full shadow-2xl flex items-center justify-center text-3xl md:hidden z-50 animate-bounce">
         +
      </Link>
    </div>
  );
}
