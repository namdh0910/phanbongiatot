"use client";
import { API_BASE_URL } from '@/utils/api';
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
        alert("✨ Cảm ơn anh/chị đã đánh giá! Ý kiến của anh/chị rất quý giá với Phân Bón Giá Tốt.");
      }
    } catch (error) {
      alert("Gửi đánh giá thất bại.");
    }
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <div className="bg-white md:rounded-sm shadow-sm overflow-hidden">
      <div className="bg-[#f5f5f5] p-4 flex justify-between items-center border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Đánh giá từ nhà nông</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#ee4d2d] text-white px-4 py-1.5 rounded-sm font-bold text-[10px] hover:bg-[#d73211] transition-all shadow-sm"
        >
          {showForm ? "ĐÓNG FORM" : "VIẾT ĐÁNH GIÁ"}
        </button>
      </div>

      <div className="p-6">
        {/* Rating Summary */}
        {!showForm && reviews.length > 0 && (
          <div className="flex flex-col md:flex-row gap-8 mb-10 p-6 bg-orange-50/30 rounded-sm border border-orange-100/50">
            <div className="text-center">
              <p className="text-4xl font-black text-[#ee4d2d] mb-1">{avgRating}</p>
              <div className="text-yellow-500 text-lg mb-1">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i}>{i < Math.floor(Number(avgRating)) ? "★" : "☆"}</span>
                ))}
              </div>
              <p className="text-xs text-gray-500">{reviews.length} đánh giá thực tế</p>
            </div>
            <div className="flex-1 flex flex-wrap gap-2 items-center">
               {["Tất cả", "5 Sao", "4 Sao", "3 Sao", "2 Sao", "1 Sao", "Có Hình Ảnh"].map(tag => (
                 <button key={tag} className="bg-white border border-gray-200 px-4 py-1.5 rounded-sm text-xs hover:border-[#ee4d2d] hover:text-[#ee4d2d] transition-colors">
                   {tag}
                 </button>
               ))}
            </div>
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-12 p-6 bg-gray-50 rounded-sm border border-gray-100 space-y-6 animate-in fade-in slide-in-from-top-4">
            <h3 className="font-bold text-gray-900">Viết đánh giá của anh/chị</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Tên của anh/chị *</label>
                <input 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#ee4d2d] bg-white rounded-sm"
                  placeholder="Ví dụ: Anh Nam - Nhà vườn Lâm Đồng"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Mức độ hài lòng</label>
                <div className="flex gap-3">
                   {[1,2,3,4,5].map(s => (
                     <button key={s} type="button" onClick={() => setFormData({...formData, rating: s})} className={`text-3xl transition-transform hover:scale-110 ${formData.rating >= s ? 'text-yellow-500' : 'text-gray-200'}`}>
                       ★
                     </button>
                   ))}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Cảm nhận của anh/chị *</label>
              <textarea 
                required 
                value={formData.comment} 
                onChange={e => setFormData({...formData, comment: e.target.value})} 
                className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#ee4d2d] h-32 bg-white rounded-sm resize-none"
                placeholder="Chia sẻ trải nghiệm của anh/chị về sản phẩm này..."
              />
            </div>
            <div className="flex justify-end gap-3">
               <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 text-sm font-bold text-gray-400">HỦY BỎ</button>
               <button type="submit" className="bg-[#ee4d2d] text-white px-10 py-2.5 rounded-sm font-black text-sm shadow-lg shadow-orange-100 hover:bg-[#d73211] transition-all">GỬI ĐÁNH GIÁ NGAY</button>
            </div>
          </form>
        )}

        <div className="space-y-0 divide-y divide-gray-100">
          {loading ? (
            <div className="animate-pulse space-y-6 py-10">
              <div className="h-4 bg-gray-50 w-1/4"></div>
              <div className="h-32 bg-gray-50/50"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20 bg-gray-50/50 rounded-sm">
              <div className="text-6xl mb-4 opacity-20">💬</div>
              <p className="text-gray-400 text-sm italic">Chưa có đánh giá nào cho sản phẩm này.<br/>Hãy là người đầu tiên đánh giá!</p>
            </div>
          ) : (
            reviews.map((review, i) => (
              <div key={i} className="py-8 animate-in fade-in duration-500">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-black text-xs flex-shrink-0">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">{review.name}</h4>
                      <span className="text-[10px] text-gray-400">{new Date(review.createdAt).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <div className="flex text-yellow-500 text-[10px] mb-3">
                      {Array(5).fill(0).map((_, idx) => (
                        <span key={idx}>{idx < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{review.comment}</p>
                    
                    {review.images?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {review.images.map((img: string, idx: number) => (
                          <div key={idx} className="w-20 h-20 rounded-sm border border-gray-100 overflow-hidden cursor-zoom-in hover:opacity-90 transition-opacity">
                            <img src={img} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                       <button className="hover:text-[#ee4d2d]">Hữu ích (0)</button>
                       <button className="hover:text-[#ee4d2d]">Báo cáo</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}      ))
          )}
        </div>
      </div>
    </div>
  );
}
