"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/all`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Lỗi lấy danh sách đánh giá:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (res.ok) {
        fetchReviews();
      }
    } catch (error) {
      alert("Lỗi khi xóa");
    }
  };

  return (
    <div className="flex bg-[#f0f0f1] min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Đánh giá sản phẩm</h1>
          <p className="text-xs text-gray-500">Quản lý phản hồi và góp ý từ nhà nông</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin text-4xl">⏳</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f6f7f7] text-gray-700 font-bold border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Khách hàng</th>
                  <th className="px-6 py-4">Sản phẩm</th>
                  <th className="px-6 py-4">Đánh giá</th>
                  <th className="px-6 py-4 w-1/3">Nội dung</th>
                  <th className="px-6 py-4">Ngày gửi</th>
                  <th className="px-6 py-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.map((review) => (
                  <tr key={review._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold">{review.name}</td>
                    <td className="px-6 py-4 text-primary text-xs">{review.product?.name || "SP đã xóa"}</td>
                    <td className="px-6 py-4">
                      <div className="flex text-yellow-500">
                        {Array(5).fill(0).map((_, i) => (
                          <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 line-clamp-2 italic">"{review.comment}"</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(review._id)} className="text-[#d63638] font-bold text-xs hover:underline">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
