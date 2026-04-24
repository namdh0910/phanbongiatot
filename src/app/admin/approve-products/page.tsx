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
      setProducts(data);
    } catch (err) {
      console.error(err);
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
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">DUYỆT SẢN PHẨM ⚖️</h1>
        <p className="text-gray-500">Xem xét và phê duyệt các sản phẩm mới từ đối tác trước khi hiển thị công khai.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="bg-white p-10 rounded-3xl shadow-sm text-center text-gray-400">Đang tải danh sách chờ duyệt...</div>
        ) : products.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl shadow-sm text-center text-gray-400">Không có sản phẩm nào đang chờ duyệt.</div>
        ) : products.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-48 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
               {product.images?.[0] && <img src={product.images[0]} className="w-full h-full object-cover" alt="" />}
            </div>
            <div className="flex-1">
               <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-black text-gray-800">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">{product.category}</span>
                       <span className="text-xs text-gray-400">Đăng bởi: <b>{product.seller?.vendorInfo?.storeName || product.seller?.username}</b></span>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-[#ee4d2d]">₫{product.price?.toLocaleString()}</div>
               </div>
               <p className="text-sm text-gray-500 line-clamp-2 mb-4 italic">"{product.description}"</p>
               
               <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">Công dụng & HDSD:</div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                     {product.usageInstructions || "Chưa cập nhật hướng dẫn"}
                  </div>
               </div>

               <div className="flex gap-3">
                  <button onClick={() => updateStatus(product._id, 'approved')} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-black hover:bg-green-700 transition-all shadow-md">
                     Duyệt Hiển Thị
                  </button>
                  <button onClick={() => updateStatus(product._id, 'rejected')} className="flex-1 bg-white text-red-600 border border-red-200 py-3 rounded-xl font-black hover:bg-red-50 transition-all">
                     Từ Chối
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
