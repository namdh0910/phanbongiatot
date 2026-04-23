import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
"use client";
import { useState, useEffect } from "react";

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
    images: [] as string[]
  });

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews/${productId}`);
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, product: productId })
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ name: "", rating: 5, comment: "", images: [] });
        fetchReviews();
        alert("Cảm ơn anh/chị đã đánh giá!");
      }
    } catch (error) {
      alert("Gửi đánh giá thất bại.");
    }
  };

  return (
    <div className="bg-white md:rounded-sm shadow-sm overflow-hidden">
      <div className="bg-[#f5f5f5] p-4 flex justify-between items-center">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Đánh giá từ nhà nông</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="text-[#ee4d2d] font-bold text-xs hover:underline"
        >
          {showForm ? "Đóng lại" : "Viết đánh giá"}
        </button>
      </div>

      <div className="p-6">
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-sm border border-gray-100 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Tên của anh/chị *</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#ee4d2d]" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Đánh giá (1-5 sao)</label>
                <div className="flex gap-2">
                   {[1,2,3,4,5].map(s => (
                     <button key={s} type="button" onClick={() => setFormData({...formData, rating: s})} className={`text-xl ${formData.rating >= s ? 'text-yellow-500' : 'text-gray-300'}`}>
                       ★
                     </button>
                   ))}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Cảm nhận của anh/chị *</label>
              <textarea required value={formData.comment} onChange={e => setFormData({...formData, comment: e.target.value})} className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#ee4d2d] h-20" />
            </div>
            <button type="submit" className="bg-[#ee4d2d] text-white px-6 py-2 rounded-sm font-bold text-sm">GỬI ĐÁNH GIÁ</button>
          </form>
        )}

        <div className="space-y-8">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-100 w-1/4"></div>
              <div className="h-20 bg-gray-50"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm italic">Chưa có đánh giá nào cho sản phẩm này.</p>
            </div>
          ) : (
            reviews.map((review, i) => (
              <div key={i} className="border-b border-gray-50 pb-6 last:border-0">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400 text-xs">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                      <div className="flex text-yellow-500 text-[10px]">
                        {Array(5).fill(0).map((_, idx) => (
                          <span key={idx}>{idx < review.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400">{new Date(review.createdAt).toLocaleDateString("vi-VN")}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed ml-11">{review.comment}</p>
                {review.images?.length > 0 && (
                  <div className="flex gap-2 mt-3 ml-11">
                    {review.images.map((img: string, idx: number) => (
                      <img key={idx} src={img} className="w-16 h-16 object-cover rounded-sm border border-gray-100" />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
