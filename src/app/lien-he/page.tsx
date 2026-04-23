"use client";
import { useState } from "react";
import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import { useSettings } from "@/context/SettingsContext";

export default function ContactPage() {
  const settings = useSettings();
  const [form, setForm] = useState({ name: "", phone: "", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!settings) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-page" })
      });
      setSubmitted(true);
    } catch (err) {
      alert("Lỗi gửi thông tin. Vui lòng gọi trực tiếp!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Liên Hệ Tư Vấn</h1>
          <p className="text-gray-300 text-lg">Để lại thông tin, kỹ sư của chúng tôi sẽ gọi lại trong 30 phút!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-dark mb-6">Thông Tin Liên Hệ</h2>
              <div className="space-y-5">
                {[
                  { icon: "📞", label: "Hotline (24/7)", val: <a href={`tel:${settings.hotline}`} className="text-primary font-extrabold text-xl hover:underline">{settings.phone || settings.hotline}</a> },
                  { icon: "💬", label: "Zalo", val: <a href={`https://zalo.me/${settings.hotline}`} target="_blank" className="text-green-600 font-bold hover:underline">Nhắn tin Zalo ngay</a> },
                  { icon: "📍", label: "Địa chỉ", val: <p className="text-gray-600">{settings.address}</p> },
                  { icon: "🕐", label: "Giờ làm việc", val: <p className="text-gray-600">{settings.businessHours} (Tất cả các ngày)</p> },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{item.icon}</div>
                    <div><p className="font-bold text-dark">{item.label}</p>{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary to-green-700 rounded-3xl p-8 text-white shadow-xl">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-4">Cam Kết Của Chúng Tôi</h3>
              <ul className="space-y-3">
                {["Tư vấn kỹ thuật miễn phí", "Gọi lại trong 30 phút", "Giao hàng toàn quốc", "Nhận hàng – Kiểm tra – Mới thanh toán"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-7xl mb-6">🎉</div>
                <h3 className="text-2xl font-bold text-dark mb-3">Gửi Thành Công!</h3>
                <p className="text-gray-600 text-lg">Kỹ sư sẽ liên hệ lại trong vòng <strong>30 phút</strong> nhé!</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", note: "" }); }} className="mt-8 px-6 py-3 bg-primary text-white rounded-xl font-bold">Gửi thêm câu hỏi</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-dark mb-2">Để Lại Thông Tin</h2>
                <p className="text-gray-500 mb-8">Kỹ sư sẽ gọi lại miễn phí trong 30 phút.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Họ và Tên *</label>
                    <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-lg" placeholder="Chú Ba, anh Tư..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại *</label>
                    <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-lg" placeholder="0900 000 000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Vườn bị vấn đề gì? (tùy chọn)</label>
                    <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} rows={4} className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none" placeholder="VD: Sầu riêng bị vàng lá, muốn hỏi thuốc trị tuyến trùng..." />
                  </div>
                  <button type="submit" disabled={loading} className="w-full bg-primary text-white font-extrabold text-xl py-5 rounded-xl shadow-lg hover:bg-primary-hover hover:-translate-y-1 transition-all disabled:opacity-50">
                    {loading ? "Đang gửi..." : "🚀 Nhận Tư Vấn Miễn Phí Ngay"}
                  </button>
                  <p className="text-center text-xs text-gray-400">Thông tin của bạn được bảo mật tuyệt đối.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
