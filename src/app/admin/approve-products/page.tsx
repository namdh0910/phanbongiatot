"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function AdminApproveProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");

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
      if (res.ok) {
        setMessage(status === 'approved' ? "Đã duyệt sản phẩm thành công!" : "Đã từ chối sản phẩm!");
        setTimeout(() => setMessage(""), 3000);
        fetchPendingProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight uppercase">Duyệt Sản Phẩm ⚖️</h1>
          <p className="text-gray-500 text-sm">Xem xét và phê duyệt các mặt hàng mới từ đối tác.</p>
        </div>
        {message && (
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold animate-bounce shadow-lg text-sm">
            {message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="bg-white p-16 rounded-[2rem] shadow-sm text-center text-gray-400 font-medium border border-gray-50">Đang tải danh sách chờ duyệt...</div>
        ) : products.length === 0 ? (
          <div className="bg-white p-16 rounded-[2rem] shadow-sm text-center text-gray-400 border border-gray-50 font-bold">Hiện không có sản phẩm nào chờ duyệt.</div>
        ) : products.map((product) => (
          <div key={product._id} className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl border border-gray-50 flex flex-col md:flex-row gap-6 md:gap-8 hover:shadow-2xl transition-all">
            <div className="w-full md:w-56 aspect-square md:h-56 bg-gray-50 rounded-3xl overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-100 shadow-inner">
               {product.images && product.images[0] ? (
                 <img src={product.images[0]} className="w-full h-full object-cover" alt="" />
               ) : (
                 <span className="text-6xl text-gray-200">📦</span>
               )}
            </div>
            <div className="flex-1 flex flex-col">
               <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-1 leading-tight">{product.name}</h3>
                    <div className="flex flex-wrap gap-2">
                       <span className="text-[10px] bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-black uppercase tracking-wider">
                         Đại lý: {product.seller?.vendorInfo?.storeName || "Gian hàng"}
                       </span>
                       <span className="text-[10px] bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-black uppercase tracking-wider">
                         {product.category}
                       </span>
                    </div>
                  </div>
                  <div className="text-xl md:text-2xl font-black text-red-600 drop-shadow-sm">₫{product.price?.toLocaleString()}</div>
               </div>
               
               <div className="bg-gray-50/80 p-5 rounded-2xl mb-6 flex-1">
                  <div className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Nội dung mô tả:</div>
                  <div className="text-sm text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
                    {product.description || "Sản phẩm này chưa có mô tả chi tiết."}
                  </div>
               </div>

               <div className="flex flex-col md:flex-row gap-3">
                  <button onClick={() => updateStatus(product._id, 'approved')} className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-black hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all active:scale-95 text-sm">
                     PHÊ DUYỆT NGAY
                  </button>
                  <button onClick={() => updateStatus(product._id, 'rejected')} className="flex-1 bg-red-50 text-red-600 py-4 rounded-2xl font-black hover:bg-red-100 transition-all active:scale-95 text-sm">
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
