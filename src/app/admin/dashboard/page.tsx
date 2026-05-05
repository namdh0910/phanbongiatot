"use client";
import { useState, useEffect } from "react";
import { Save, Settings, Phone, Megaphone, Search, Layout } from "lucide-react";

type ConfigGroup = 'hero' | 'contact' | 'announcement' | 'seo' | 'general';

interface ConfigItem {
  key: string;
  value: string;
  group: ConfigGroup;
  label: string;
  type: 'text' | 'textarea' | 'boolean' | 'color';
}

export default function AdminDashboard() {
  const [configs, setConfigs] = useState<ConfigItem[]>([]);
  const [activeTab, setActiveTab] = useState<ConfigGroup>('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const tabs: { id: ConfigGroup; label: string; icon: any }[] = [
    { id: 'hero', label: 'Trang Chủ (Hero)', icon: Layout },
    { id: 'contact', label: 'Liên Hệ', icon: Phone },
    { id: 'announcement', label: 'Thông Báo', icon: Megaphone },
    { id: 'seo', label: 'SEO/Meta', icon: Search },
    { id: 'general', label: 'Cơ Bản', icon: Settings },
  ];

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      setConfigs(data.configs || []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setConfigs(configs.map(c => c.key === key ? { ...c, value } : c));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const currentConfigs = configs.filter(c => c.group === activeTab);

    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentConfigs)
      });

      if (res.ok) {
        setMessage("✅ Đã cập nhật cấu hình nhóm " + activeTab.toUpperCase());
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ Lỗi khi lưu cấu hình.");
      }
    } catch (err) {
      setMessage("❌ Lỗi kết nối hệ thống.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse py-10 font-black text-gray-400 text-center">Đang nạp cấu hình hệ thống...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tight">Cấu hình Hệ thống</h1>
        <p className="text-gray-500 text-sm font-medium">Quản lý nội dung động và tối ưu hóa chuyển đổi toàn diện.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-black transition-all ${
                  isActive 
                    ? 'bg-gray-900 text-white shadow-xl shadow-gray-200 translate-x-2' 
                    : 'bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form Area */}
        <div className="flex-1">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-900 p-6 text-white flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <span className="bg-emerald-600 p-2 rounded-lg">
                    {(() => {
                      const ActiveIcon = tabs.find(t => t.id === activeTab)?.icon;
                      return ActiveIcon ? <ActiveIcon size={16} /> : null;
                    })()}
                  </span>
                  <span className="font-black uppercase text-sm tracking-widest">
                    Chỉnh sửa: {tabs.find(t => t.id === activeTab)?.label}
                  </span>
               </div>
               <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">Global Config</span>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-8">
              {message && (
                <div className={`p-4 rounded-2xl text-xs font-bold border animate-in slide-in-from-top-2 duration-300 ${message.includes('✅') ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                  {message}
                </div>
              )}

              <div className="space-y-6">
                {configs.filter(c => c.group === activeTab).map((config) => (
                  <div key={config.key}>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">{config.label}</label>
                    
                    {config.type === 'textarea' ? (
                      <textarea
                        value={config.value}
                        onChange={(e) => handleInputChange(config.key, e.target.value)}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800 h-32 resize-none"
                      />
                    ) : config.type === 'boolean' ? (
                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border-2 border-gray-100">
                         <input 
                           type="checkbox" 
                           checked={config.value === 'true'}
                           onChange={(e) => handleInputChange(config.key, e.target.checked ? 'true' : 'false')}
                           className="w-5 h-5 accent-emerald-600"
                         />
                         <span className="text-sm font-black text-gray-600 uppercase">Kích hoạt chế độ này</span>
                      </div>
                    ) : config.type === 'color' ? (
                      <div className="flex items-center gap-4">
                        <input 
                          type="color" 
                          value={config.value}
                          onChange={(e) => handleInputChange(config.key, e.target.value)}
                          className="w-16 h-16 rounded-xl border-2 border-gray-100 p-1 bg-white cursor-pointer"
                        />
                        <input 
                           type="text"
                           value={config.value}
                           onChange={(e) => handleInputChange(config.key, e.target.value)}
                           className="bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-2 font-mono text-xs font-bold uppercase"
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={config.value}
                        onChange={(e) => handleInputChange(config.key, e.target.value)}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 outline-none focus:bg-white focus:border-[#1a5c2a] transition-all font-bold text-gray-800"
                      />
                    )}
                  </div>
                ))}
                
                {configs.filter(c => c.group === activeTab).length === 0 && (
                  <div className="py-20 text-center opacity-20">
                    <div className="text-6xl mb-4">⚙️</div>
                    <p className="font-black uppercase text-xs tracking-widest">Chưa có cấu hình cho mục này</p>
                  </div>
                )}
              </div>

              <button
                disabled={saving || configs.filter(c => c.group === activeTab).length === 0}
                type="submit"
                className="w-full bg-[#1a5c2a] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:bg-[#2d7a3e] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <Save size={22} />
                {saving ? "ĐANG LƯU..." : "LƯU THAY ĐỔI NGAY"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
