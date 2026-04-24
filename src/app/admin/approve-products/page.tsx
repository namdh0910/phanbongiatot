"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function AdminApproveProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/products/admin/pending`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}/approve`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchPendingProducts();
    } catch (err) {
      console.error(err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Duyệt Sản Phẩm ⚖️</h1>
        <p className="text-gray-500">Xem xét và phê duyệt các mặt hàng mới từ đối tác.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="bg-white p-10 rounded-3xl shadow-sm text-center text-gray-400 font-medium">Đang tải danh sách chờ duyệt...</div>
        ) : products.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl shadow-sm text-center text-gray-400">Không có sản phẩm nào cần duyệt.</div>
        ) : products.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-40 h-40 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center">
               {product.images && product.images[0] ? (
                 <img src={product.images[0]} className="w-full h-full object-cover" alt="" />
               ) : (
                 <span className="text-4xl text-gray-200">📦</span>
               )}
            </div>
            <div className="flex-1">
               <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-black text-gray-800 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-xs text-gray-400 font-medium">Shop: <b>{product.seller?.vendorInfo?.storeName || "Đại lý"}</b></span>
                    </div>
                  </div>
                  <div className="text-xl font-black text-[#ee4d2d]">₫{product.price?.toLocaleString()}</div>
               </div>
               
               <div className="bg-gray-50 p-3 rounded-xl mb-4 text-xs text-gray-500 line-clamp-2 italic">
                  "{product.description || "Chưa có mô tả"}"
               </div>

               <div className="flex gap-3 mt-4">
                  <button onClick={() => updateStatus(product._id, 'approved')} className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-black hover:bg-emerald-700 shadow-md">
                     DUYỆT
                  </button>
                  <button onClick={() => updateStatus(product._id, 'rejected')} className="flex-1 bg-white text-red-600 border border-red-100 py-3 rounded-xl font-black hover:bg-red-50">
                     TỪ CHỐI
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
