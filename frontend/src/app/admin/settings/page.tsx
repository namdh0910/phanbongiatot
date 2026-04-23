import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
"use client";
import { useState, useEffect, useRef } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminGuard from "@/components/AdminGuard";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState<any>({
    siteName: "",
    hotline: "",
    zalo: "",
    shopee: "",
    address: "",
    email: "",
    facebook: "",
    freeShippingThreshold: 500000,
    heroTitle: "",
    heroSubtitle: "",
    heroBanner: "",
    primaryColor: "#0d2a1c",
    showBlogOnHome: true,
    phone: "",
    zaloId: "",
    ctaText: "",
    businessHours: "",
    announcementEnabled: false,
    announcementText: "",
    footerAddress: "",
    footerEmail: "",
    defaultSeoTitle: "",
    defaultSeoDescription: "",
    defaultSeoImage: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(settings)
      });
      if (res.ok) alert("Đã lưu cài đặt!");
      else alert("Lỗi khi lưu.");
    } catch (err) { alert("Lỗi kết nối."); }
    finally { setIsSaving(false); }
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const fd = new FormData();
    fd.append("images", e.target.files[0]);
    try {
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` },
        body: fd
      });
      if (res.ok) {
        const { urls } = await res.json();
        setSettings({ ...settings, heroBanner: urls[0] });
      }
    } catch (error) { alert("Lỗi upload."); }
  };

  return (
    <AdminGuard>
      <div className="flex bg-[#f0f0f1] min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 ml-64 p-8">
          <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Cài đặt & Tùy biến</h1>
          </div>

          <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden max-w-5xl">
            <div className="flex border-b border-gray-200 bg-[#f6f7f7]">
               <button onClick={() => setActiveTab("general")} className={`px-6 py-3 font-bold text-sm ${activeTab === 'general' ? 'bg-white border-t-2 border-t-[#2271b1] text-[#2271b1]' : 'text-gray-500 hover:text-gray-700'}`}>Cài đặt chung</button>
               <button onClick={() => setActiveTab("appearance")} className={`px-6 py-3 font-bold text-sm ${activeTab === 'appearance' ? 'bg-white border-t-2 border-t-[#2271b1] text-[#2271b1]' : 'text-gray-500 hover:text-gray-700'}`}>Giao diện</button>
               <button onClick={() => setActiveTab("seo")} className={`px-6 py-3 font-bold text-sm ${activeTab === 'seo' ? 'bg-white border-t-2 border-t-[#2271b1] text-[#2271b1]' : 'text-gray-500 hover:text-gray-700'}`}>Cấu hình SEO</button>
            </div>

            {isLoading ? (
              <div className="text-center py-20">Đang tải...</div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {activeTab === 'general' && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tên Website</label>
                          <input value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Hotline (Click to call)</label>
                          <input value={settings.hotline} onChange={e => setSettings({...settings, hotline: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Số điện thoại hiển thị</label>
                          <input value={settings.phone} onChange={e => setSettings({...settings, phone: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" placeholder="0773.440.966" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Zalo ID (Số điện thoại Zalo)</label>
                          <input value={settings.zaloId} onChange={e => setSettings({...settings, zaloId: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Giờ làm việc</label>
                          <input value={settings.businessHours} onChange={e => setSettings({...settings, businessHours: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" placeholder="7:00 - 21:00" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Shopee URL/Name</label>
                          <input value={settings.shopee} onChange={e => setSettings({...settings, shopee: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" />
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider">📢 Banner thông báo (Top Header)</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <input type="checkbox" id="announcementEnabled" checked={settings.announcementEnabled} onChange={e => setSettings({...settings, announcementEnabled: e.target.checked})} className="w-4 h-4" />
                        <label htmlFor="announcementEnabled" className="text-sm font-bold text-gray-600">Bật banner thông báo</label>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nội dung thông báo</label>
                        <input value={settings.announcementText} onChange={e => setSettings({...settings, announcementText: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" placeholder="Ví dụ: 🔥 Khuyến mãi tháng 4: Giảm 10% tất cả phân bón" />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-bold text-gray-700 mb-4 uppercase text-xs tracking-wider">🏢 Thông tin chân trang (Footer)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Địa chỉ Footer</label>
                          <textarea value={settings.footerAddress} onChange={e => setSettings({...settings, footerAddress: e.target.value})} rows={3} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1] resize-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Footer</label>
                          <input value={settings.footerEmail} onChange={e => setSettings({...settings, footerEmail: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                     <div className="bg-blue-50 p-4 rounded-sm border border-blue-100 text-blue-800 text-xs flex gap-3">
                        <span className="text-xl">🎨</span>
                        <p><b>Anh lưu ý:</b> Các thay đổi ở đây sẽ cập nhật trực tiếp lên trang chủ. Anh có thể thay đổi câu chữ và màu sắc để phù hợp với từng mùa vụ bón phân.</p>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                           <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tiêu đề Hero (Trang chủ)</label>
                              <input value={settings.heroTitle} onChange={e => setSettings({...settings, heroTitle: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" />
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Mô tả Hero</label>
                              <textarea value={settings.heroSubtitle} onChange={e => setSettings({...settings, heroSubtitle: e.target.value})} rows={2} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" />
                           </div>
                        </div>
                        
                        <div className="space-y-4">
                           <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Màu chủ đạo (Primary Color)</label>
                              <div className="flex gap-3">
                                 <input type="color" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} className="h-10 w-20 border border-gray-300 rounded cursor-pointer" />
                                 <input value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} className="flex-1 border border-gray-300 rounded px-3 text-sm outline-none" />
                              </div>
                           </div>
                           <div>
                              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Text nút CTA chính</label>
                              <input value={settings.ctaText} onChange={e => setSettings({...settings, ctaText: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" placeholder="Nhận Tư Vấn Miễn Phí" />
                           </div>
                        </div>
                     </div>

                     <div className="flex items-center gap-3 py-2">
                        <input type="checkbox" id="showBlogOnHome" checked={settings.showBlogOnHome} onChange={e => setSettings({...settings, showBlogOnHome: e.target.checked})} className="w-4 h-4" />
                        <label htmlFor="showBlogOnHome" className="text-sm font-bold text-gray-700">Hiển thị mục Blog ngoài trang chủ</label>
                     </div>

                     <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Ảnh bìa (Hero Banner)</label>
                        <div onClick={() => fileInputRef.current?.click()} className="aspect-[21/9] bg-gray-50 border-2 border-dashed border-gray-200 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-100 overflow-hidden relative group">
                           {settings.heroBanner ? (
                             <img src={settings.heroBanner} className="w-full h-full object-cover" />
                           ) : (
                             <div className="text-center text-gray-400">
                                <span className="text-4xl block">🖼️</span>
                                <span className="text-[10px] font-bold">CLICK ĐỂ TẢI ẢNH BÌA MỚI</span>
                             </div>
                           )}
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity">Thay đổi ảnh</div>
                        </div>
                        <input ref={fileInputRef} type="file" className="hidden" onChange={handleBannerUpload} accept="image/*" />
                     </div>
                  </div>
                )}

                {activeTab === 'seo' && (
                  <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                     <div className="bg-yellow-50 p-4 rounded-sm border border-yellow-100 text-yellow-800 text-xs flex gap-3">
                        <span className="text-xl">🔍</span>
                        <p><b>Tối ưu tìm kiếm:</b> Cấu hình ở đây sẽ ảnh hưởng đến việc trang web hiện ra như thế nào trên Google và khi chia sẻ lên Zalo/Facebook.</p>
                     </div>
                     
                     <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tiêu đề SEO mặc định</label>
                          <input value={settings.defaultSeoTitle} onChange={e => setSettings({...settings, defaultSeoTitle: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1]" placeholder="Phân Bón Giá Tốt - Giải Pháp Nông Nghiệp Xanh" />
                          <p className="text-[10px] text-gray-400 mt-1">Độ dài khuyên dùng: 50-60 ký tự</p>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Mô tả SEO mặc định (Description)</label>
                          <textarea value={settings.defaultSeoDescription} onChange={e => setSettings({...settings, defaultSeoDescription: e.target.value})} rows={3} className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2271b1] resize-none" placeholder="Chuyên cung cấp các sản phẩm nông nghiệp..." />
                          <p className="text-[10px] text-gray-400 mt-1">Độ dài khuyên dùng: 150-160 ký tự</p>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Ảnh chia sẻ (Social Image - Open Graph)</label>
                          <div className="flex items-start gap-6">
                             <div className="w-48 aspect-video bg-gray-100 border border-gray-200 rounded-sm flex items-center justify-center overflow-hidden">
                                {settings.defaultSeoImage ? <img src={settings.defaultSeoImage} className="w-full h-full object-cover" /> : <span className="text-2xl opacity-20">🖼️</span>}
                             </div>
                             <div className="flex-1 space-y-3">
                                <input value={settings.defaultSeoImage} onChange={e => setSettings({...settings, defaultSeoImage: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-xs outline-none focus:border-[#2271b1]" placeholder="Đường dẫn ảnh (URL)..." />
                                <p className="text-[10px] text-gray-500">Kích thước khuyên dùng: 1200x630 pixel để hiển thị đẹp nhất trên Facebook/Zalo.</p>
                             </div>
                          </div>
                        </div>
                     </div>
                  </div>
                )}

                <div className="pt-8 border-t border-gray-100">
                   <button 
                     disabled={isSaving}
                     type="submit" 
                     className="bg-[#2271b1] text-white px-8 py-2.5 rounded-sm font-bold hover:bg-[#135e96] shadow-md transition-all disabled:bg-gray-400 flex items-center gap-2"
                   >
                     {isSaving ? "⏳ ĐANG LƯU..." : "💾 LƯU TẤT CẢ THAY ĐỔI"}
                   </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
