"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

export default function VendorDashboard() {
  const [vendor, setVendor] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const info = JSON.parse(localStorage.getItem("vendorInfo") || "{}");
    setVendor(info);
    
    // Fetch fresh info from server to get latest status/expiry
    fetchFreshInfo();
  }, []);

  const fetchFreshInfo = async () => {
    const token = localStorage.getItem("vendorToken");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setVendor(data.vendorInfo);
        localStorage.setItem("vendorInfo", JSON.stringify(data.vendorInfo));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getTrialDays = (expiry: string) => {
    if (!expiry) return 0;
    const now = new Date();
    const exp = new Date(expiry);
    const diffTime = exp.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (!mounted || !vendor) return null;

  const trialDays = getTrialDays(vendor.trialExpiresAt);
  const isExpired = trialDays <= 0;

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-800 tracking-tight">Xin chào, {vendor.storeName || "Đại lý"}! 👋</h1>
          <p className="text-gray-500 mt-1">Chúc anh/chị một ngày kinh doanh thuận lợi.</p>
        </div>
        
        {/* Status Badge */}
        <div className="flex flex-col items-end gap-2">
           <div className={`px-6 py-2 rounded-2xl font-black text-sm uppercase shadow-sm ${
             vendor.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'
           }`}>
             {vendor.isApproved ? 'Gian hàng đã kích hoạt ✅' : 'Gian hàng đang chờ duyệt ⏳'}
           </div>
           {!vendor.isApproved && (
             <p className="text-[10px] text-gray-400 italic max-w-[200px] text-right">Sản phẩm của bạn sẽ hiện trên sàn ngay sau khi được kích hoạt.</p>
           )}
        </div>
      </div>

      {/* Subscription Card */}
      <div className={`mb-10 p-8 rounded-[2.5rem] border-2 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all ${
        isExpired ? 'bg-red-50 border-red-200' : 'bg-gradient-to-br from-blue-600 to-indigo-700 border-transparent text-white'
      }`}>
        <div className="flex items-center gap-6">
          <div className="text-5xl">📅</div>
          <div>
            <div className={`text-sm font-bold uppercase tracking-widest mb-1 ${isExpired ? 'text-red-600' : 'text-blue-200'}`}>Thời hạn sử dụng</div>
            <div className={`text-4xl font-black ${isExpired ? 'text-red-700' : 'text-white'}`}>
              {isExpired ? 'ĐÃ HẾT HẠN DÙNG THỬ' : `Còn lại ${trialDays} ngày miễn phí`}
            </div>
            <p className={`mt-2 text-sm ${isExpired ? 'text-red-500' : 'text-blue-100 opacity-80'}`}>
              {isExpired ? 'Vui lòng gia hạn để sản phẩm tiếp tục hiển thị trên sàn.' : `Gói hiện tại: ${vendor.plan?.toUpperCase() || 'TRIAL'}. Hết hạn vào: ${new Date(vendor.trialExpiresAt).toLocaleDateString("vi-VN")}`}
            </p>
          </div>
        </div>
        
        <button className="bg-white text-blue-700 px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-all hover:bg-gray-50 active:scale-95">
          NÂNG CẤP / GIA HẠN NGAY
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
           <div className="text-3xl mb-2">📦</div>
           <div className="text-xs text-gray-400 font-bold uppercase mb-1">Sản phẩm của tôi</div>
           <div className="text-2xl font-black text-gray-800">1</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
           <div className="text-3xl mb-2">🛒</div>
           <div className="text-xs text-gray-400 font-bold uppercase mb-1">Đơn hàng mới</div>
           <div className="text-2xl font-black text-blue-600">0</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
           <div className="text-3xl mb-2">💰</div>
           <div className="text-xs text-gray-400 font-bold uppercase mb-1">Doanh thu tạm tính</div>
           <div className="text-2xl font-black text-emerald-600">₫0</div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
           <div className="text-3xl mb-2">⭐</div>
           <div className="text-xs text-gray-400 font-bold uppercase mb-1">Đánh giá shop</div>
           <div className="text-2xl font-black text-yellow-500">5.0</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">🚀 Mẹo bán hàng hiệu quả</h3>
            <div className="space-y-4">
               <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-sm text-blue-800">
                 <b>1. Hình ảnh sản phẩm:</b> Hãy chụp ảnh thật, rõ ràng để bà con tin tưởng hơn.
               </div>
               <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-sm text-emerald-800">
                 <b>2. Tư vấn tận tâm:</b> Phản hồi tin nhắn Zalo nhanh giúp tỉ lệ chốt đơn tăng 80%.
               </div>
               <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-sm text-purple-800">
                 <b>3. Mô tả chi tiết:</b> Ghi rõ cách bón phân cho từng giai đoạn cây trồng.
               </div>
            </div>
         </div>

         <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm mb-4">📢</div>
            <h3 className="text-xl font-black text-gray-800 mb-2">Thông báo từ hệ thống</h3>
            <p className="text-gray-500 text-sm max-w-sm">Hiện tại hệ thống Marketplace đang trong quá trình nâng cấp. Anh/chị có thể bắt đầu đăng sản phẩm để chờ duyệt.</p>
         </div>
      </div>
    </div>
  );
}
