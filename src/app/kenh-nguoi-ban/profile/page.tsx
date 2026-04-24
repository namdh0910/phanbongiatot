"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function VendorProfile() {
  const [formData, setFormData] = useState({
    storeName: "",
    phone: "",
    address: "",
    description: "",
    logo: "",
    banner: "",
    zaloPhone: "",
    facebookUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setFormData({
          storeName: data.vendorInfo?.storeName || "",
          phone: data.vendorInfo?.phone || "",
          address: data.vendorInfo?.address || "",
          description: data.vendorInfo?.description || "",
          logo: data.vendorInfo?.logo || "",
          banner: data.vendorInfo?.banner || "",
          zaloPhone: data.vendorInfo?.zaloPhone || "",
          facebookUrl: data.vendorInfo?.facebookUrl || ""
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "banner") => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(type);
    const token = localStorage.getItem("vendorToken");
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("images", file);

    try {
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: uploadData
      });
      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, [type]: data.urls[0] }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ vendorInfo: formData })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Cập nhật thông tin thành công!");
        localStorage.setItem("vendorInfo", JSON.stringify(data.vendorInfo));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-800 tracking-tight">Hồ Sơ Gian Hàng 🏪</h1>
        <p className="text-gray-500 mt-2">Xây dựng thương hiệu chuyên nghiệp để thu hút bà con nông dân.</p>
      </div>

      {message && (
        <div className="mb-8 bg-emerald-500 text-white p-5 rounded-[2rem] font-black text-center shadow-lg animate-bounce">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Visual Assets */}
        <div className="lg:col-span-1 space-y-8">
           {/* Logo Section */}
           <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 text-center">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Logo Cửa Hàng</label>
              <div className="relative w-32 h-32 mx-auto mb-4 group">
                 <div className="w-full h-full rounded-full border-4 border-gray-50 overflow-hidden shadow-inner bg-gray-100 flex items-center justify-center">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">🏢</span>
                    )}
                 </div>
                 <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-xs font-bold">
                    Thay đổi
                    <input type="file" className="hidden" onChange={e => handleImageUpload(e, "logo")} accept="image/*" />
                 </label>
                 {uploading === "logo" && (
                    <div className="absolute inset-0 bg-white/80 rounded-full flex items-center justify-center">
                       <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                 )}
              </div>
              <p className="text-[10px] text-gray-400 italic">Nên dùng ảnh vuông, nền trắng hoặc trong suốt.</p>
           </div>

           {/* Banner Section */}
           <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 text-center">Ảnh Bìa Gian Hàng</label>
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-100 border-4 border-gray-50 shadow-inner group">
                 {formData.banner ? (
                    <img src={formData.banner} alt="Banner" className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                       Chưa có ảnh bìa
                    </div>
                 )}
                 <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-sm font-black">
                    TẢI ẢNH BÌA MỚI
                    <input type="file" className="hidden" onChange={e => handleImageUpload(e, "banner")} accept="image/*" />
                 </label>
                 {uploading === "banner" && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                       <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                 )}
              </div>
              <p className="text-[10px] text-gray-400 italic mt-4 text-center">Ảnh bìa sẽ hiện ở đầu trang cửa hàng của bạn.</p>
           </div>
        </div>

        {/* Right Column: Form Data */}
        <div className="lg:col-span-2">
           <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Tên Cửa Hàng / Đại Lý</label>
                  <input required value={formData.storeName} onChange={e => setFormData({...formData, storeName: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-4 focus:ring-blue-100 outline-none font-bold transition-all" placeholder="Ví dụ: Đại Lý Phân Bón Tám Sang" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Số Điện Thoại Kinh Doanh</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-4 focus:ring-blue-100 outline-none font-bold transition-all" placeholder="0333 xxx xxx" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Địa Chỉ Văn Phòng / Kho Hàng</label>
                <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-gray-900 focus:ring-4 focus:ring-blue-100 outline-none font-bold transition-all" placeholder="Số nhà, đường, tỉnh thành..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                  <label className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 ml-1">Số Zalo Tư Vấn</label>
                  <input value={formData.zaloPhone} onChange={e => setFormData({...formData, zaloPhone: e.target.value})} className="w-full bg-white border-none rounded-xl px-4 py-3 text-blue-700 focus:ring-4 focus:ring-blue-200 outline-none font-bold transition-all" placeholder="Dùng để hiện nút Chat Zalo" />
                </div>
                <div className="p-6 bg-indigo-50 rounded-[2rem] border border-indigo-100">
                  <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2 ml-1">Link Facebook (Nếu có)</label>
                  <input value={formData.facebookUrl} onChange={e => setFormData({...formData, facebookUrl: e.target.value})} className="w-full bg-white border-none rounded-xl px-4 py-3 text-indigo-700 focus:ring-4 focus:ring-indigo-200 outline-none font-bold transition-all" placeholder="https://facebook.com/..." />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Giới thiệu chi tiết</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border-none rounded-3xl px-6 py-4 text-gray-900 focus:ring-4 focus:ring-blue-100 outline-none h-40 resize-none font-medium leading-relaxed" placeholder="Hãy viết về lịch sử, kinh nghiệm và cam kết chất lượng của đại lý để bà con yên tâm mua hàng..." />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 rounded-3xl font-black text-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50">
                {loading ? "ĐANG LƯU THÔNG TIN..." : "LƯU TẤT CẢ THAY ĐỔI"}
              </button>
           </form>
        </div>
      </div>
    </div>
  );
}
