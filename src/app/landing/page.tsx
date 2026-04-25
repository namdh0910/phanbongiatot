"use client";
import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import { useState } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function LandingPage() {
  const settings = useSettings();
  const [form, setForm] = useState({ name: "", phone: "", note: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!settings) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "facebook-ads" })
      });
      setSubmitted(true);
    } catch { alert("Lỗi! Vui lòng gọi trực tiếp."); }
  };

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-dark to-black opacity-90"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-20 rounded-full blur-3xl"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-red-500 text-white font-bold text-sm px-4 py-2 rounded-full mb-6 animate-pulse shadow-lg">
              🔥 ƯU ĐÃI ĐẶC BIỆT – CHỈ HÔM NAY
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Giải Pháp <br />
              <span className="text-green-400">Phòng Ngừa Vàng Lá</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-300 font-bold mb-4">
              ✅ Bảo Vệ Bộ Rễ Khỏe Mạnh – Ngừa Thối Rễ Từ Sớm
            </p>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Đừng để bệnh mới trị. Hãy phòng ngừa ngay hôm nay với bộ giải pháp sinh học tiên tiến. Tư vấn từ kỹ sư 10+ năm kinh nghiệm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: "🛡️", bad: "Phòng ngừa: Ngăn chặn nấm bệnh xâm nhập ngay từ đầu" },
                { icon: "🌳", good: "Phục hồi: Giúp cây xanh lá, bung đọt, phát triển bền vững" },
              ].map((item, i) => (
                <div key={i} className={`p-5 rounded-2xl flex items-start gap-4 ${i === 0 ? 'bg-blue-900/40 border border-blue-700/50' : 'bg-green-900/40 border border-green-600/50'}`}>
                  <span className="text-3xl">{item.icon}</span>
                  <p className="text-lg font-medium">{item.bad || item.good}</p>
                </div>
              ))}

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4 text-secondary">Bộ Giải Pháp Phòng Ngừa & Phục Hồi:</h3>
                <ul className="space-y-3">
                  {["Chế phẩm sinh học phòng ngừa nấm bệnh", "Phân kích rễ tơ cực mạnh", "Vitamin & khoáng chất phục hồi cây", "Hướng dẫn quy trình canh tác sạch"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-green-300 font-medium">
                      <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-white font-bold flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-white/20 flex items-end gap-4">
                  <div>
                    <p className="text-gray-400 text-sm line-through">Giá gốc: 350.000đ</p>
                    <p className="text-4xl font-extrabold text-secondary">280.000đ</p>
                  </div>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-20%</span>
                </div>
              </div>
            </div>

            {/* Lead Form */}
            <div className="bg-white text-dark rounded-3xl p-8 shadow-2xl">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-7xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold mb-3">Chúng tôi đã nhận được!</h3>
                  <p className="text-gray-600">Kỹ sư sẽ gọi lại cho bạn trong <strong>15 phút</strong>. Vui lòng để ý điện thoại!</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-extrabold text-dark mb-2">🎁 Nhận Tư Vấn + Giảm Thêm 10%</h2>
                  <p className="text-gray-500 mb-6">Điền thông tin bên dưới để được kỹ sư gọi tư vấn miễn phí và nhận mã giảm thêm 10%:</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Họ và Tên *</label>
                      <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 focus:border-primary focus:bg-white outline-none text-base font-medium placeholder:text-gray-400" placeholder="VD: Chú Ba, Anh Tư..." />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại *</label>
                      <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 focus:border-primary focus:bg-white outline-none text-base font-medium placeholder:text-gray-400" placeholder="Để kỹ sư gọi lại tư vấn" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Ghi chú vườn (tùy chọn)</label>
                      <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} rows={3} className="w-full border-2 border-gray-100 bg-gray-50 rounded-xl px-4 py-3 focus:border-primary focus:bg-white outline-none resize-none text-base placeholder:text-gray-400" placeholder="VD: Sầu riêng bị vàng lá, cà phê bị tuyến trùng..." />
                    </div>
                    <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-extrabold text-lg py-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all">
                      🚀 NHẬN TƯ VẤN MIỄN PHÍ NGAY!
                    </button>
                    <p className="text-center text-[10px] text-gray-400 uppercase tracking-wider font-bold">🔒 Bảo mật thông tin • Gọi lại trong 15 phút</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-white">Bà Con Nói Gì Về Sản Phẩm?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Chú Tư Lúa", place: "Đắk Lắk", review: "Vườn sầu riêng 3 héc ta của tui giờ xanh mướt. Tưới 2 lần là thấy rễ ra trắng xóa rồi!", stars: 5 },
              { name: "Anh Minh Nông", place: "Lâm Đồng", review: "Tui thử nhiều loại thuốc nhưng chỉ bên này mới cứu được mấy cây sầu riêng 7 năm tuổi.", stars: 5 },
              { name: "Chị Lan Vườn", place: "Bình Phước", review: "Điện tư vấn xong, kỹ sư cũng cẩn thận hỏi han. Hàng về đúng hẹn, chất lượng chuẩn.", stars: 5 },
            ].map((r, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="flex gap-1 mb-3">{"⭐".repeat(r.stars)}</div>
                <p className="text-gray-300 italic mb-4">"{r.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-xl">👨‍🌾</div>
                  <div><p className="font-bold">{r.name}</p><p className="text-gray-400 text-sm">{r.place}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
