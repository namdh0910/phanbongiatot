"use client";
import { useState } from "react";
import { API_BASE_URL } from "@/utils/api";
import { trackEvent } from "@/utils/analytics";

export default function LeadForm({ product }: { product: any }) {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent('LeadForm_Submit', { product: product.name });

    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          items: [{ name: product.name, quantity: 1 }],
          status: "pending",
          notes: "Yêu cầu kỹ sư gọi lại từ Landing Page"
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 p-8 rounded-3xl text-center animate-in zoom-in duration-300">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-green-800 font-black uppercase text-lg mb-2">Đã gửi yêu cầu thành công!</h3>
        <p className="text-green-700 text-sm">Kỹ sư của chúng tôi sẽ gọi lại cho bà con trong ít phút nữa.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
      <div className="flex flex-col items-center text-center mb-8">
         <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 italic">Hỗ trợ bà con trực tiếp</span>
         <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tight">Yêu cầu kỹ sư gọi lại</h3>
         <p className="text-gray-500 text-sm mt-2">Bà con chỉ cần để lại số điện thoại, kỹ sư sẽ gọi lại tư vấn phác đồ chuẩn nhất cho vườn của mình.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <input 
            required
            type="text" 
            placeholder="Tên của bà con..." 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#1a5c2a] transition-all font-medium text-gray-800"
          />
        </div>
        <div className="flex flex-col gap-1">
          <input 
            required
            type="tel" 
            placeholder="Số điện thoại của bà con..." 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#1a5c2a] transition-all font-medium text-gray-800"
          />
        </div>
        <button 
          disabled={isSubmitting}
          type="submit" 
          className="w-full bg-[#1a5c2a] text-white py-5 rounded-2xl font-black text-lg uppercase italic tracking-widest shadow-lg shadow-emerald-200 hover:scale-[1.02] active:scale-95 transition-all mt-4"
        >
          {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu ngay"}
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-4 font-bold uppercase tracking-tighter">🔒 Thông tin của bà con được bảo mật hoàn toàn</p>
      </form>
    </div>
  );
}
