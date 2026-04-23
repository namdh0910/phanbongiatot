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
              Vườn Sầu Riêng Bị <br />
              <span className="text-red-400">Vàng Lá Thối Rễ?</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-300 font-bold mb-4">
              ✅ Cam Kết Phục Hồi 100% Chỉ Sau 15 Ngày
            </p>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Hơn 10,000 vườn sầu riêng, cà phê đã được cứu thành công. Tư vấn miễn phí từ kỹ sư 10+ năm kinh nghiệm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Benefits */}
            <div className="space-y-4">
              {[
                { icon: "💀", bad: "Trước: Rễ thối đen, lá vàng héo, cây kiệt sức" },
                { icon: "✅", good: "Sau 15 ngày: Rễ tơ trắng mập, lá xanh bung đọt" },
              ].map((item, i) => (
                <div key={i} className={`p-5 rounded-2xl flex items-start gap-4 ${i === 0 ? 'bg-red-900/40 border border-red-700/50' : 'bg-green-900/40 border border-green-600/50'}`}>
                  <span className="text-3xl">{item.icon}</span>
                  <p className="text-lg font-medium">{item.bad || item.good}</p>
                </div>
              ))}

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold mb-4 text-secondary">Bộ Sản Phẩm Đặc Trị Bao Gồm:</h3>
                <ul className="space-y-3">
                  {["Thuốc diệt tuyến trùng & nấm Phytophthora", "Phân kích rễ tơ cực mạnh", "Vitamin & khoáng chất phục hồi cây", "Hướng dẫn phun xịt tận tình"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-green-300 font-medium">
                      <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs text-white font-bold flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-white/20 flex items-end gap-4">
                  <div>
                    <p className="text-gray-400 text-sm line-through">Giá gốc: 700.000đ</p>
                    <p className="text-4xl font-extrabold text-secondary">350.000đ</p>
                  </div>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">-50%</span>
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
                    <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-primary outline-none text-lg font-medium" placeholder="Tên của bạn (Chú Ba, anh Tư...)" />
                    <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-primary outline-none text-lg font-medium" placeholder="Số điện thoại *" />
                    <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} rows={3} className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:border-primary outline-none resize-none" placeholder="Mô tả tình trạng vườn của bạn..." />
                    <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-extrabold text-xl py-5 rounded-xl shadow-lg hover:-translate-y-1 transition-all">
                      🚀 NHẬN TƯ VẤN MIỄN PHÍ NGAY!
                    </button>
                    <p className="text-center text-xs text-gray-400">Bảo mật thông tin. Không spam. Gọi lại trong 15 phút.</p>
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

      {/* Sticky CTA for mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-dark border-t border-white/10 flex gap-3 z-50 md:hidden">
        <a href={`tel:${settings.hotline}`} className="flex-1 bg-primary text-white font-bold py-3 rounded-xl text-center">📞 Gọi Ngay</a>
        <a href={`https://zalo.me/${settings.hotline}`} target="_blank" className="flex-1 bg-blue-500 text-white font-bold py-3 rounded-xl text-center">💬 Zalo</a>
      </div>
    </div>
  );
}
