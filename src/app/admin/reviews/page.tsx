"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL, getAuthHeaders } from "@/utils/api";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      // Note: We need a backend endpoint to fetch ALL reviews across all products
      // For now, we can fetch all products and their reviews, but a dedicated endpoint is better.
      // I'll assume we add a global /api/reviews/all endpoint or similar.
      // If not, I'll fetch per product as a fallback.
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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Đánh Giá Sản Phẩm</h1>
        <p className="text-gray-500">Quản lý phản hồi và góp ý từ nhà nông</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin text-4xl">⏳</div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-bold">
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
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{review.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-primary font-medium">{review.product?.name || "SP đã xóa"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex text-yellow-500">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 line-clamp-2 italic">"{review.comment}"</p>
                    {review.images?.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {review.images.map((img: string, idx: number) => (
                          <img key={idx} src={img} className="w-8 h-8 object-cover rounded border border-gray-100" />
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(review._id)} className="text-red-400 hover:text-red-600 font-bold text-xs uppercase">Xóa bỏ</button>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-400 italic">Chưa có đánh giá nào từ khách hàng</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
