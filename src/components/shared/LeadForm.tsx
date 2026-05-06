"use client";
import { useState, useEffect } from "react";

interface LeadFormProps {
  product?: any;
  initialPathology?: string;
  initialCrop?: string;
}

export default function LeadForm({ product, initialPathology, initialCrop }: LeadFormProps) {
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    cropType: initialCrop || "", 
    pathology: initialPathology || "",
    note: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync props to state if they change
  useEffect(() => {
    if (initialPathology || initialCrop) {
      setFormData(prev => ({
        ...prev,
        pathology: initialPathology || prev.pathology,
        cropType: initialCrop || prev.cropType
      }));
    }
  }, [initialPathology, initialCrop]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: product ? `Product: ${product.name}` : 'Website_Lead_Form',
          note: formData.note || `Yêu cầu kỹ sư gọi lại từ trang ${product?.name || 'giải pháp'}`
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: "", phone: "", cropType: "", pathology: "", note: "" });
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
        <p className="text-green-700 text-sm font-medium">Kỹ sư của chúng tôi sẽ gọi lại cho bà con trong ít phút nữa.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
      <div className="flex flex-col items-center text-center mb-8">
         <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 italic">Hỗ trợ bà con trực tiếp</span>
         <h3 className="text-2xl font-black text-gray-900 uppercase italic tracking-tight">Yêu cầu kỹ sư gọi lại</h3>
         <p className="text-gray-500 text-sm mt-2">Bà con điền thông tin, kỹ sư sẽ gọi lại tư vấn quy trình chuẩn nhất cho vườn của mình.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-gray-400 ml-4 tracking-widest">Tên của bà con</label>
            <input 
              required
              type="text" 
              placeholder="Ví dụ: Chú Ba, Anh Tuấn..." 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#1a5c2a] transition-all font-bold text-gray-800 text-base"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-gray-400 ml-4 tracking-widest">Số điện thoại</label>
            <input 
              required
              type="tel" 
              placeholder="0773.440.966" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#1a5c2a] transition-all font-bold text-gray-800 text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-gray-400 ml-4 tracking-widest">Loại cây trồng</label>
            <select 
              value={formData.cropType}
              onChange={(e) => setFormData({...formData, cropType: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#1a5c2a] transition-all font-bold text-gray-800 appearance-none text-base"
            >
              <option value="">Chọn loại cây...</option>
              <option value="Sầu riêng">Sầu riêng</option>
              <option value="Cà phê">Cà phê</option>
              <option value="Hồ tiêu">Hồ tiêu</option>
              <option value="Cây ăn trái khác">Cây ăn trái khác</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase text-gray-400 ml-4 tracking-widest">Tình trạng vườn</label>
            <select 
              value={formData.pathology}
              onChange={(e) => setFormData({...formData, pathology: e.target.value})}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#1a5c2a] transition-all font-bold text-gray-800 appearance-none text-base"
            >
              <option value="">Chọn tình trạng...</option>
              <option value="Vàng lá thối rễ">Vàng lá thối rễ</option>
              <option value="Tuyến trùng">Tuyến trùng</option>
              <option value="Rụng trái/Bông">Rụng trái/Bông</option>
              <option value="Cây còi cọc/Suy">Cây còi cọc/Suy</option>
              <option value="Khác">Khác...</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black uppercase text-gray-400 ml-4 tracking-widest">Ghi chú thêm cho kỹ sư</label>
          <textarea 
            placeholder="Ví dụ: Vườn sầu riêng 3 năm tuổi, diện tích 2ha..." 
            value={formData.note}
            onChange={(e) => setFormData({...formData, note: e.target.value})}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 outline-none focus:border-[#1a5c2a] transition-all font-bold text-gray-800 h-28 text-base"
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
