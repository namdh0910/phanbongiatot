"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/admin/all`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        setReviews(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (err) {
      alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Duyệt đánh giá ⚖️</h1>
            <p className="text-xs text-gray-500 font-medium">Kiểm soát chất lượng nội dung từ nhà vườn</p>
          </div>
          <div className="flex gap-2">
             <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase">Chờ duyệt: {reviews.filter(r => r.status === 'pending').length}</span>
             </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="px-6 py-4">Sản phẩm / Nhà vườn</th>
                <th className="px-6 py-4">Số điện thoại</th>
                <th className="px-6 py-4">Nội dung đánh giá</th>
                <th className="px-6 py-4">Hình ảnh</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr><td colSpan={6} className="text-center py-20 text-gray-400 font-bold italic">Đang tải...</td></tr>
              ) : reviews.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-20 text-gray-400 font-bold italic">Chưa có đánh giá nào</td></tr>
              ) : reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-gray-900 line-clamp-1">{review.product?.name || "SP đã xóa"}</p>
                    <p className="text-[10px] text-emerald-600 font-bold uppercase">{review.reviewer_name} - {review.reviewer_province}</p>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">{review.reviewer_phone}</code>
                  </td>
                  <td className="px-6 py-4 max-w-xs md:max-w-md">
                    <div className="flex text-yellow-400 text-[10px] mb-1">
                      {"★★★★★".split("").map((s, i) => <span key={i}>{i < review.rating ? "★" : "☆"}</span>)}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed italic">"{review.content}"</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                       {review.images?.map((img: string, i: number) => (
                         <img key={i} src={img} className="w-10 h-10 rounded-lg object-cover border border-gray-100 hover:scale-150 transition-transform cursor-zoom-in" />
                       ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${
                      review.status === 'approved' ? 'bg-green-100 text-green-700' :
                      review.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {review.status === 'approved' ? 'Đã duyệt' : 
                       review.status === 'rejected' ? 'Bị từ chối' : 'Chờ duyệt'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       {review.status === 'pending' && (
                         <>
                           <button onClick={() => handleStatusUpdate(review._id, 'approved')} className="bg-[#1a5c2a] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-[#2d7a3e] transition-all shadow-md">Duyệt</button>
                           <button onClick={() => handleStatusUpdate(review._id, 'rejected')} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-100 transition-all">Hủy</button>
                         </>
                       )}
                       {review.status === 'approved' && (
                         <button onClick={() => handleStatusUpdate(review._id, 'rejected')} className="text-gray-400 hover:text-red-500 text-[10px] font-bold uppercase underline">Gỡ bỏ</button>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
