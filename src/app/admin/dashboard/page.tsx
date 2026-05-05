"use client";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [settings, setSettings] = useState({
    hotline: "",
    zalo: "",
    announcementText: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings({
          hotline: data.hotline || "",
          zalo: data.zalo || "",
          announcementText: data.announcementText || ""
        });
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch('/api/settings', {
        method: 'POST', // Theo API route đã viết hỗ trợ POST để update
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        setMessage("✅ Đã lưu cấu hình thành công!");
      } else {
        setMessage("❌ Lỗi khi lưu cấu hình.");
      }
    } catch (err) {
      setMessage("❌ Lỗi kết nối hệ thống.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse py-10">Đang tải cấu hình...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tight">Cấu hình hệ thống</h1>
        <p className="text-gray-500 text-sm font-medium">Quản lý Hotline, Zalo và thông điệp hiển thị toàn website.</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden max-w-2xl">
        <div className="bg-[#1a5c2a] p-6 text-white flex items-center justify-between">
           <span className="font-black uppercase text-sm tracking-widest">Thông tin liên hệ</span>
           <span className="text-xs opacity-60">Cập nhật thời gian thực</span>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-6">
          {message && (
            <div className={`p-4 rounded-xl text-xs font-bold border animate-in slide-in-from-top-2 duration-300 ${message.includes('✅') ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
              {message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Số điện thoại Hotline</label>
              <input 
                required
                type="text" 
                value={settings.hotline}
                onChange={(e) => setSettings({...settings, hotline: e.target.value})}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800"
                placeholder="Ví dụ: 0773.440.966"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Số điện thoại Zalo</label>
              <input 
                required
                type="text" 
                value={settings.zalo}
                onChange={(e) => setSettings({...settings, zalo: e.target.value})}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800"
                placeholder="Ví dụ: 0773440966"
              />
              <p className="text-[10px] text-gray-400 mt-2 italic">* Số này sẽ dùng để tạo link zalo.me/số_điện_thoại</p>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Thông điệp Banner (Thông báo)</label>
              <textarea 
                value={settings.announcementText}
                onChange={(e) => setSettings({...settings, announcementText: e.target.value})}
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800 h-24"
                placeholder="Ví dụ: Nhận phác đồ phục hồi vàng lá miễn phí ngay hôm nay!"
              />
            </div>
          </div>

          <button 
            disabled={saving}
            type="submit"
            className="w-full bg-[#1a5c2a] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:bg-[#2d7a3e] transition-all active:scale-95 disabled:opacity-50"
          >
            {saving ? "ĐANG LƯU..." : "LƯU CẤU HÌNH NGAY"}
          </button>
        </form>
      </div>
    </div>
  );
}
