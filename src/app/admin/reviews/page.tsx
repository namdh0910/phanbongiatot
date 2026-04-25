"use client";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/admin/list?status=${activeTab}`, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [activeTab]);

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}/status`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (error) {
      alert("Lỗi cập nhật trạng thái.");
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Xóa vĩnh viễn đánh giá này?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (res.ok) fetchReviews();
    } catch (error) {
      alert("Lỗi xóa đánh giá.");
    }
  };

  return (
    <AdminGuard>
      <div className="flex bg-[#f0f0f1] min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
               <h1 className="text-2xl font-black text-gray-800 tracking-tight">Quản lý Đánh giá</h1>
               <p className="text-sm text-gray-500 font-medium">Duyệt và phản hồi ý kiến từ nhà vườn</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mb-8 px-1 text-sm font-black uppercase tracking-widest">
             <button 
               onClick={() => setActiveTab('pending')}
               className={`pb-2 border-b-2 transition-all ${activeTab === 'pending' ? 'border-[#1a5c2a] text-[#1a5c2a]' : 'border-transparent text-gray-400'}`}
             >
               Chờ duyệt ({activeTab === 'pending' ? reviews.length : '...'})
             </button>
             <button 
               onClick={() => setActiveTab('approved')}
               className={`pb-2 border-b-2 transition-all ${activeTab === 'approved' ? 'border-[#1a5c2a] text-[#1a5c2a]' : 'border-transparent text-gray-400'}`}
             >
               Đã hiển thị
             </button>
             <button 
               onClick={() => setActiveTab('rejected')}
               className={`pb-2 border-b-2 transition-all ${activeTab === 'rejected' ? 'border-[#1a5c2a] text-[#1a5c2a]' : 'border-transparent text-gray-400'}`}
             >
               Đã từ chối
             </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
             {isLoading ? (
               <div className="bg-white p-20 text-center rounded-3xl text-gray-400 animate-pulse font-bold">Đang tải dữ liệu...</div>
             ) : reviews.length === 0 ? (
               <div className="bg-white p-20 text-center rounded-3xl text-gray-400 border border-dashed border-gray-200">
                  <span className="text-5xl block mb-4">📭</span>
                  <p className="font-bold uppercase tracking-widest text-xs">Không có đánh giá nào trong mục này</p>
               </div>
             ) : reviews.map(review => (
               <div key={review._id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="flex gap-6">
                     <div className="w-16 h-16 bg-green-50 text-[#1a5c2a] rounded-2xl flex items-center justify-center font-black text-2xl flex-shrink-0">
                        {review.name.charAt(0).toUpperCase()}
                     </div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                           <div>
                              <h3 className="font-black text-gray-800 text-lg flex items-center gap-2">
                                {review.name}
                                {review.province && <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">📍 {review.province}</span>}
                              </h3>
                              <p className="text-xs text-gray-400 font-bold mt-1">
                                Sản phẩm: <span className="text-[#1a5c2a]">{review.product?.name || "N/A"}</span>
                              </p>
                              <div className="flex text-yellow-400 text-sm mt-2">
                                {Array(5).fill(0).map((_, i) => <span key={i}>{i < review.rating ? '★' : '☆'}</span>)}
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-xs font-bold text-gray-300 uppercase">{new Date(review.createdAt).toLocaleString("vi-VN")}</p>
                           </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl mb-6 italic text-gray-700 leading-relaxed">
                           "{review.comment}"
                        </div>

                        {review.images?.length > 0 && (
                          <div className="flex gap-3 mb-8">
                             {review.images.map((img: string, i: number) => (
                               <a key={i} href={img} target="_blank" className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                  <img src={img} className="w-full h-full object-cover" />
                               </a>
                             ))}
                          </div>
                        )}

                        <div className="flex gap-3 pt-6 border-t border-gray-50">
                           {activeTab === 'pending' && (
                             <>
                                <button onClick={() => updateStatus(review._id, 'approved')} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black text-xs hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">DUYỆT HIỂN THỊ</button>
                                <button onClick={() => updateStatus(review._id, 'rejected')} className="bg-red-50 text-red-600 px-8 py-3 rounded-xl font-black text-xs hover:bg-red-100 transition-all">TỪ CHỐI</button>
                             </>
                           )}
                           {activeTab === 'approved' && (
                             <button onClick={() => updateStatus(review._id, 'rejected')} className="bg-orange-50 text-orange-600 px-8 py-3 rounded-xl font-black text-xs hover:bg-orange-100 transition-all">GỠ XUỐNG</button>
                           )}
                           {activeTab === 'rejected' && (
                             <button onClick={() => updateStatus(review._id, 'approved')} className="bg-emerald-50 text-emerald-600 px-8 py-3 rounded-xl font-black text-xs hover:bg-emerald-100 transition-all">KHÔI PHỤC</button>
                           )}
                           <button onClick={() => deleteReview(review._id)} className="ml-auto text-gray-300 hover:text-red-500 transition-colors">🗑️ Xóa vĩnh viễn</button>
                        </div>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
