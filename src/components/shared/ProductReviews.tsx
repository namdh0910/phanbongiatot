"use client";
import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import { useState, useEffect, useRef } from "react";

const PROVINCES = [
  "Lâm Đồng", "Đắk Lắk", "Gia Lai", "Đắk Nông", "Kon Tum", "Bình Phước", "Đồng Nai", "Long An", "Tiền Giang", "Bến Tre", "Vĩnh Long", "Trà Vinh", "Hậu Giang", "Sóc Trăng", "An Giang", "Kiên Giang", "Cần Thơ"
];

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reviewsPerPage = 5;

  const [formData, setFormData] = useState({
    reviewer_name: "",
    reviewer_phone: "",
    reviewer_province: "",
    rating: 5,
    content: "",
    images: [] as string[]
  });

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reviews?product_id=${productId}&status=approved`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    if (formData.images.length + e.target.files.length > 3) {
      alert("Chỉ được tải lên tối đa 3 ảnh.");
      return;
    }

    setUploadingImages(true);
    const fd = new FormData();
    Array.from(e.target.files).forEach(file => fd.append("images", file));

    try {
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: fd
      });
      if (res.ok) {
        const { urls } = await res.json();
        setFormData(prev => ({ ...prev, images: [...prev.images, ...urls] }));
      }
    } catch (error) {
      alert("Lỗi tải ảnh lên.");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.content.length < 20) {
      alert("Nội dung đánh giá phải ít nhất 20 ký tự.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          product: productId
        })
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ reviewer_name: "", reviewer_phone: "", reviewer_province: "", rating: 5, content: "", images: [] });
        alert("✨ Cảm ơn! Đánh giá của bạn đang chờ duyệt và sẽ hiển thị trong 24h.");
      }
    } catch (error) {
      alert("Gửi đánh giá thất bại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  // Pagination logic
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="bg-white md:rounded-sm shadow-sm overflow-hidden border border-gray-100">
      <div className="bg-[#fcfcfc] p-5 flex justify-between items-center border-b border-gray-100">
        <h2 className="text-base font-black text-gray-900 uppercase tracking-tight">Đánh giá thực tế từ nhà vườn</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#1a5c2a] text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-[#2d7a3e] transition-all shadow-md active:scale-95"
        >
          {showForm ? "ĐÓNG FORM" : "VIẾT ĐÁNH GIÁ"}
        </button>
      </div>

      <div className="p-6 md:p-8">
        {/* Rating Summary */}
        {!showForm && (
          <div className="flex flex-col md:flex-row gap-8 mb-12 p-8 bg-green-50/30 rounded-[1.5rem] border border-green-100/50">
            <div className="text-center md:border-r border-green-100 md:pr-10">
              <p className="text-5xl font-black text-[#1a5c2a] mb-2">{avgRating}</p>
              <div className="text-yellow-500 text-xl mb-2">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className={i < Math.floor(Number(avgRating)) ? "text-yellow-400" : "text-gray-200"}>{star}</span>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{reviews.length} nhà vườn đã đánh giá</p>
            </div>
            <div className="flex-1">
               <div className="flex flex-wrap gap-2 items-center">
                  {["Tất cả", "5 Sao", "4 Sao", "3 Sao", "Có Hình Ảnh"].map(tag => (
                    <button key={tag} className="bg-white border border-gray-100 px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:border-[#1a5c2a] hover:text-[#1a5c2a] transition-all shadow-sm">
                      {tag}
                    </button>
                  ))}
               </div>
               <p className="text-xs text-gray-400 mt-4 italic">* Các đánh giá đều từ nhà vườn đã sử dụng sản phẩm thực tế.</p>
            </div>
          </div>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-12 p-8 bg-white rounded-[2rem] border-2 border-green-100 shadow-2xl shadow-green-100/20 space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center">
              <h3 className="font-black text-xl text-gray-900 uppercase">Chia sẻ trải nghiệm của anh/chị</h3>
              <div className="flex gap-2">
                 {[1,2,3,4,5].map(s => (
                   <button key={s} type="button" onClick={() => setFormData({...formData, rating: s})} className={`text-4xl transition-all hover:scale-110 ${formData.rating >= s ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-100'}`}>
                     ★
                   </button>
                 ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Họ tên *</label>
                <input 
                  required 
                  value={formData.reviewer_name} 
                  onChange={e => setFormData({...formData, reviewer_name: e.target.value})} 
                  className="w-full border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#1a5c2a] bg-gray-50/50 transition-all font-medium"
                  placeholder="Ví dụ: Anh Nam"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Số điện thoại *</label>
                <input 
                  required 
                  type="tel"
                  value={formData.reviewer_phone} 
                  onChange={e => setFormData({...formData, reviewer_phone: e.target.value})} 
                  className="w-full border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#1a5c2a] bg-gray-50/50 transition-all font-medium"
                  placeholder="Để xác minh mua hàng..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tỉnh/Thành phố *</label>
                <select 
                  required
                  value={formData.reviewer_province} 
                  onChange={e => setFormData({...formData, reviewer_province: e.target.value})} 
                  className="w-full border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#1a5c2a] bg-gray-50/50 transition-all font-medium"
                >
                  <option value="">-- Chọn tỉnh --</option>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cảm nhận chi tiết * (Tối thiểu 20 ký tự)</label>
              <textarea 
                required 
                value={formData.content} 
                onChange={e => setFormData({...formData, content: e.target.value})} 
                className="w-full border-2 border-gray-50 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#1a5c2a] h-40 bg-gray-50/50 transition-all resize-none font-medium leading-relaxed"
                placeholder="Phân bón dùng rất tốt, rễ ra mạnh, cây xanh lá..."
              />
              <p className={`text-[10px] mt-2 font-bold ${formData.content.length < 20 ? 'text-gray-400' : 'text-emerald-500'}`}>
                Đã nhập: {formData.content.length}/20 ký tự
              </p>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Ảnh vườn thực tế (Tối đa 3 ảnh)</label>
              <div className="flex flex-wrap gap-4">
                 {formData.images.map((img, idx) => (
                   <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
                      <img src={img} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setFormData(f => ({...f, images: f.images.filter((_, i) => i !== idx)}))} className="absolute top-1 right-1 bg-black/50 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                   </div>
                 ))}
                 {formData.images.length < 3 && (
                   <button 
                     type="button" 
                     onClick={() => fileInputRef.current?.click()}
                     className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-[#1a5c2a] hover:bg-green-50 transition-all group"
                   >
                     <span className="text-2xl group-hover:scale-110 transition-transform">📸</span>
                     <span className="text-[8px] font-black uppercase mt-1">{uploadingImages ? "Đang tải..." : "Thêm ảnh"}</span>
                   </button>
                 )}
              </div>
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-50">
               <button type="button" onClick={() => setShowForm(false)} className="px-8 py-3 text-sm font-black text-gray-400 hover:text-gray-600">HỦY BỎ</button>
               <button 
                type="submit" 
                disabled={isSubmitting || uploadingImages}
                className="bg-[#1a5c2a] text-white px-12 py-4 rounded-2xl font-black text-sm shadow-xl shadow-green-100 hover:bg-[#2d7a3e] transition-all disabled:opacity-50 disabled:scale-100 active:scale-95"
               >
                 {isSubmitting ? "ĐANG GỬI..." : "GỬI ĐÁNH GIÁ NGAY"}
               </button>
            </div>
          </form>
        )}

        <div className="space-y-0">
          {loading ? (
            <div className="animate-pulse space-y-10 py-10">
              <div className="h-4 bg-gray-50 w-1/4 rounded"></div>
              <div className="h-40 bg-gray-50/50 rounded-3xl"></div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-24 bg-gray-50/30 rounded-[2rem] border-2 border-dashed border-gray-100">
              <div className="text-7xl mb-6 opacity-20 filter grayscale">💬</div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Chưa có đánh giá nào cho sản phẩm này.</p>
              <p className="text-gray-400 text-[10px] mt-2">Hãy là người đầu tiên chia sẻ trải nghiệm với bà con!</p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-100">
                {currentReviews.map((review, i) => (
                  <div key={i} className="py-10 first:pt-0 last:pb-0 animate-in fade-in duration-700">
                    <div className="flex gap-5 md:gap-8">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 text-[#1a5c2a] rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0 shadow-inner">
                        {review.reviewer_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-black text-gray-900 text-base flex items-center gap-2">
                              {review.reviewer_name}
                              {review.reviewer_province && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">📍 {review.reviewer_province}</span>}
                              {review.reviewer_phone && (
                                <span className="text-[10px] font-bold text-gray-400">
                                  ({review.reviewer_phone.slice(0, 3)}****{review.reviewer_phone.slice(-3)})
                                </span>
                              )}
                            </h4>
                            <div className="flex text-yellow-400 text-xs mt-1">
                              {Array(5).fill(0).map((_, idx) => (
                                <span key={idx}>{idx < review.rating ? "★" : "☆"}</span>
                              ))}
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">{new Date(review.createdAt).toLocaleDateString("vi-VN")}</span>
                        </div>
                        
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line mt-4 font-medium italic">"{review.content}"</p>
                        
                        {review.images?.length > 0 && (
                          <div className="flex flex-wrap gap-3 mt-6">
                            {review.images.map((img: string, idx: number) => (
                              <div key={idx} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-gray-100 overflow-hidden cursor-zoom-in hover:scale-[1.02] transition-transform shadow-sm">
                                <img src={img} className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-8 flex items-center gap-6 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                           <button className="flex items-center gap-1.5 hover:text-[#1a5c2a] transition-colors">
                              <span className="text-base">👍</span> Hữu ích ({review.helpfulVotes || 0})
                           </button>
                           <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                              <span className="text-base">🚩</span> Báo cáo
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-3">
                  <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 disabled:opacity-30 hover:bg-gray-50 transition-all"
                  >
                    ◀
                  </button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-[#1a5c2a] text-white shadow-lg shadow-green-100' : 'bg-white border border-gray-100 text-gray-400 hover:border-green-200'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 disabled:opacity-30 hover:bg-gray-50 transition-all"
                  >
                    ▶
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
