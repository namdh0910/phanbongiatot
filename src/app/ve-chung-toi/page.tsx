"use client";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export default function AboutPage() {
  const settings = useSettings();
  if (!settings) return null;
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-gray-900 text-white py-24 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-700 opacity-10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Về Chúng Tôi</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">Người bạn đồng hành tin cậy của nhà nông Việt Nam suốt hơn 10 năm qua.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Mission */}
        <div className="bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-gray-100 -mt-12 relative z-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-emerald-600 font-black text-xs uppercase tracking-widest">Sứ mệnh của chúng tôi</span>
              <h2 className="text-3xl font-black text-gray-900 mt-3 mb-6 leading-tight uppercase tracking-tighter">Mang Lại Mùa Vụ Bội Thu Cho Người Nông Dân Việt</h2>
              <p className="text-gray-600 leading-relaxed mb-4 font-medium">Chúng tôi hiểu rằng người nông dân phải làm việc cật lực suốt ngày dưới nắng mưa. Mỗi mùa vụ thất bại là một đòn đau với cả gia đình.</p>
              <p className="text-gray-600 leading-relaxed font-medium">Vì thế, <strong className="text-emerald-700">Phân Bón Giá Tốt</strong> cam kết chỉ cung cấp những sản phẩm đã được thử nghiệm thực tế, đi kèm dịch vụ tư vấn kỹ thuật tận tâm — để bà con an tâm canh tác, an tâm thu hoạch.</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-3xl p-10 text-white text-center shadow-xl">
              <div className="text-7xl mb-4">🌾</div>
              <div className="text-5xl font-black mb-2 italic">10+</div>
              <div className="text-xl font-black uppercase tracking-widest">Năm Kinh Nghiệm</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { num: "10,000+", label: "Nhà nông tin dùng", icon: "👨‍🌾" },
            { num: "50+", label: "Sản phẩm chất lượng cao", icon: "🧪" },
            { num: "63", label: "Tỉnh thành phủ sóng", icon: "🗺️" },
            { num: "99%", label: "Khách hàng hài lòng", icon: "⭐" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">{s.icon}</div>
              <div className="text-3xl font-black text-emerald-600 mb-2 italic">{s.num}</div>
              <div className="text-gray-400 font-black text-[10px] uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Team / Values */}
        <div className="bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-gray-100 mb-16">
          <h2 className="text-3xl font-black text-gray-900 mb-12 text-center uppercase tracking-tighter italic">Giá Trị Cốt Lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🔬", title: "Khoa học & Thực tiễn", desc: "Mọi sản phẩm đều trải qua kiểm nghiệm thực địa tại các vườn sầu riêng, cà phê trước khi đưa ra thị trường." },
              { icon: "🤝", title: "Tận tâm & Đồng hành", desc: "Đội ngũ Phan Bón Giá Tốt luôn sẵn sàng tư vấn miễn phí, đồng hành cùng bà con từ khi gieo trồng đến khi thu hoạch." },
              { icon: "💰", title: "Giá Tốt & Minh Bạch", desc: "Cam kết mức giá cạnh tranh nhất thị trường, không trung gian, không phụ phí ẩn — bà con nhận hàng rồi mới thanh toán." },
            ].map((v, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
 
        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-3xl p-10 text-white text-center shadow-2xl">
          <h2 className="text-3xl font-black mb-4 uppercase italic tracking-tighter">Bắt Đầu Hành Trình Cùng Chúng Tôi</h2>
          <p className="text-emerald-100 mb-8 text-lg font-medium">Liên hệ ngay để được tư vấn miễn phí từ đội ngũ tư vấn giàu kinh nghiệm thực chiến.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${settings.hotline}`} className="px-8 py-4 bg-white text-emerald-700 rounded-xl font-black text-lg hover:bg-gray-100 transition-colors shadow-lg uppercase tracking-widest">
              📞 Gọi Ngay: {settings.phone || settings.hotline}
            </a>
            <Link href="https://zalo.me/0773440966" className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-black text-lg hover:bg-white/30 transition-colors border border-white/30 uppercase tracking-widest">
              Nhắn Zalo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
