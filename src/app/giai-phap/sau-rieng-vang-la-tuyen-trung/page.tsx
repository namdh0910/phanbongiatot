import Link from 'next/link';
import { CheckCircle2, Phone, MessageCircle, PlayCircle, Star, ShoppingBag, AlertCircle, ChevronRight } from 'lucide-react';

export const metadata = {
  title: "Sầu Riêng Vàng Lá Do Tuyến Trùng — Cách Xử Lý Triệt Để | Phân Bón Giá Tốt",
  description: "Giải pháp đặc trị tuyến trùng cho sầu riêng. Phác đồ 3 bước phục hồi vườn sầu riêng vàng lá, thối rễ dứt điểm sau 15 ngày.",
};

export default function DurianNematodeSolution() {
  const zaloId = "0773440966";
  const hotline = "0773440966";

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 pb-20">
      {/* BLOCK 1 - HEADER + CTA FLOATING (Zalo button handled by global StickyCTA but I'll add a specific one if needed) */}
      <header className="bg-gradient-to-br from-[#2d7a2d] to-[#1e5c1e] text-white pt-8 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-emerald-100/70 mb-4 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <ChevronRight size={10} />
            <Link href="/tim-kiem?q=sau+rieng" className="hover:text-white transition-colors">Sầu riêng</Link>
            <ChevronRight size={10} />
            <span className="text-white">Tuyến trùng</span>
          </nav>
          <h1 className="text-2xl md:text-5xl font-black leading-tight uppercase italic tracking-tighter">
            Sầu Riêng Vàng Lá Gốc, Rễ Thối — <span className="text-[#f59e0b]">Dấu Hiệu Tuyến Trùng</span> Đang Phá Vườn Bạn
          </h1>
          <div className="mt-6 flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center border border-emerald-400/30">
               <AlertCircle className="text-emerald-300" size={20} />
             </div>
             <p className="text-sm font-medium text-emerald-50">Kỹ sư tư vấn: Bà con cần xử lý ngay để tránh chết cây hàng loạt.</p>
          </div>
        </div>
      </header>

      {/* BLOCK 2 - TRIỆU CHỨNG */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-3xl font-black text-[#2d7a2d] uppercase mb-8 border-l-4 border-[#f59e0b] pl-4">
          Vườn Sầu Riêng Của Bạn Có Những Dấu Hiệu Này Không?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            {[
              "Lá già bị vàng cả gân và phiến lá, bắt đầu từ gốc cành đi lên.",
              "Đọt non ra chậm, yếu hoặc không ra đọt dù đã bón phân.",
              "Trái nhỏ, méo mó, rụng nhiều dù chưa đến lúc thu hoạch.",
              "Nhổ rễ lên thấy rễ tơ bị thối đen, có các nốt sưng (u nang).",
              "Cây còi cọc, kém phát triển so với các cây khác trong vườn.",
              "Cây bị xuống sức nhanh chóng sau mùa thu hoạch hoặc mùa mưa."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="text-[#f59e0b] flex-shrink-0 mt-0.5" size={20} />
                <p className="text-base font-medium text-gray-700 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=400" alt="Lá sầu riêng bị vàng" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=400" alt="Rễ sầu riêng bị thối" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400" alt="Tuyến trùng phá rễ" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative group">
               <img src="https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=400" alt="Phục hồi vườn sầu riêng" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 3 - NGUYÊN NHÂN */}
      <section className="py-16 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-3xl font-black text-[#2d7a2d] uppercase mb-6">Tại Sao Cây Bị Như Vậy?</h2>
          <p className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Tuyến trùng là những con giun cực nhỏ sống trong đất. Chúng chích hút nhựa ở đầu rễ non, tạo ra các vết thương. 
            Từ đó, nấm nấm thối rễ (Phytophthora) tấn công vào khiến rễ bị đen và không còn hút được nước, phân bón nuôi cây. 
            Đó là lý do bà con bón bao nhiêu phân cây cũng không xanh lại được.
          </p>
          <div className="aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-20 h-20 bg-[#f59e0b] rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <PlayCircle size={40} fill="white" />
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=1200" alt="Video hướng dẫn" className="w-full h-full object-cover opacity-60" />
            <div className="absolute bottom-6 left-6 text-left text-white z-10">
               <p className="text-xs font-black uppercase tracking-widest text-[#f59e0b] mb-1">Video thực tế</p>
               <h4 className="font-bold text-lg">Cách nhận biết tuyến trùng tại vườn</h4>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 4 - QUY TRÌNH XỬ LÝ 3 BƯỚC */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-3xl font-black text-[#2d7a2d] uppercase mb-12 text-center">Xử Lý Như Thế Nào?</h2>
        <div className="relative space-y-12">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 -translate-x-1/2 hidden md:block"></div>
          
          {[
            { 
              step: "1", 
              name: "Diệt Tuyến Trùng & Nấm", 
              time: "Tuần 1", 
              product: "Nemano + Phytopin", 
              dose: "Pha 500ml mỗi loại cho 400 lít nước, tưới đẫm vùng rễ.",
              color: "bg-[#f59e0b]"
            },
            { 
              step: "2", 
              name: "Phục Hồi Hệ Rễ Cám", 
              time: "Tuần 2", 
              product: "Siêu Kích Rễ Phốt-pho", 
              dose: "Pha 1kg cho 600 lít nước, giúp rễ ra trắng sau 7 ngày.",
              color: "bg-[#2d7a2d]"
            },
            { 
              step: "3", 
              name: "Bung Đọt & Xanh Lá", 
              time: "Tuần 3", 
              product: "Amino Plus + Vi Lượng", 
              dose: "Phun lên lá giúp bộ lá xanh dày, bóng mượt trở lại.",
              color: "bg-blue-600"
            }
          ].map((item, i) => (
            <div key={i} className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-1 w-full">
                <div className="bg-white p-6 rounded-3xl border-2 border-gray-50 shadow-xl hover:border-emerald-100 transition-all">
                  <div className={`inline-block ${item.color} text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4`}>
                    {item.time}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">{item.name}</h3>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-emerald-700 flex items-center gap-2">
                      <ShoppingBag size={14} /> SP dùng: {item.product}
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed italic">
                      <span className="font-bold text-gray-700 not-italic">Liều lượng:</span> {item.dose}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`absolute left-0 md:left-1/2 -translate-x-1/2 w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white font-black text-xl z-10 shadow-lg border-4 border-white`}>
                {item.step}
              </div>
              
              <div className="flex-1 hidden md:block"></div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCK 5 - CTA GIỮA TRANG */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-600 to-green-700 rounded-[2.5rem] p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black mb-4 uppercase italic">Vườn Bạn Có Triệu Chứng Này?</h3>
            <p className="text-emerald-50 text-base md:text-lg mb-8 max-w-xl mx-auto">Gửi ngay ảnh vườn, ảnh lá và rễ qua Zalo để kỹ sư xem trực tiếp và tư vấn phác đồ miễn phí.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href={`https://zalo.me/${zaloId}`} className="group bg-[#0068FF] text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-95">
                <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" /> Gửi Ảnh Qua Zalo
              </a>
              <a href={`tel:${hotline}`} className="bg-white text-emerald-800 px-8 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-3 active:scale-95 border-2 border-emerald-100">
                <Phone size={24} /> Gọi Kỹ Sư Ngay
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 6 - KẾT QUẢ THỰC TẾ */}
      <section className="py-16 px-4 bg-gray-50 mt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-3xl font-black text-[#2d7a2d] uppercase mb-12 text-center">Kết Quả Từ Nhà Vườn Thực Tế</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Chú Sáu",
                loc: "Gia Nghĩa, Đắk Nông",
                size: "2 ha Sầu Riêng",
                quote: "Cây tôi bị vàng lá 2 năm trời, đổ bao nhiêu tiền phân không khỏi. Dùng phác đồ 3 bước của kỹ sư giờ vườn xanh đen, trái đậu kít cành.",
                img: "https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=400"
              },
              {
                name: "Anh Ba",
                loc: "Chư Sê, Gia Lai",
                size: "800 gốc Cà Phê + Tiêu",
                quote: "Tuyến trùng phá rễ làm tiêu chết nhanh, sầu riêng đứng đọt. Cảm ơn kỹ sư đã cứu vườn tiêu nhà tôi kịp lúc.",
                img: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=400"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 relative group">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-emerald-50">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <h4 className="font-black text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-500 font-bold uppercase">{item.loc}</p>
                   </div>
                   <div className="ml-auto text-[#f59e0b] flex">
                      {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="#f59e0b" />)}
                   </div>
                </div>
                <div className="mb-4">
                   <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded uppercase tracking-widest">{item.size}</span>
                </div>
                <p className="text-gray-600 italic leading-relaxed text-sm">"{item.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCK 7 - SẢN PHẨM ĐƯỢC DÙNG */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-xl md:text-3xl font-black text-[#2d7a2d] uppercase mb-12 text-center">Sản Phẩm Trong Phác Đồ Này</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {[
            { name: "Phân bón Nemano", case: "Đặc trị Tuyến trùng" },
            { name: "Phytopin Siêu Cấp", case: "Diệt Nấm Thối Rễ" },
            { name: "Amino Plus", case: "Phục Hồi Bộ Lá" }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-3xl border border-gray-100 p-4 md:p-6 text-center hover:shadow-2xl transition-all group">
              <div className="aspect-square bg-gray-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
                {i === 0 ? '🛡️' : i === 1 ? '🧪' : '🍃'}
              </div>
              <h4 className="font-black text-gray-900 text-sm md:text-base mb-1 line-clamp-1">{item.name}</h4>
              <p className="text-[10px] md:text-xs text-emerald-600 font-bold uppercase mb-4 tracking-tighter">{item.case}</p>
              <a href={`https://zalo.me/${zaloId}?text=${encodeURIComponent(`Tôi muốn hỏi giá sản phẩm ${item.name}`)}`} className="block w-full py-3 bg-gray-50 text-gray-500 rounded-xl font-black text-[10px] md:text-xs uppercase hover:bg-emerald-600 hover:text-white transition-all tracking-widest">
                Hỏi Giá Ngay
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCK 8 - CTA CUỐI TRANG */}
      <section className="mt-12 px-4 pb-12">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-[3rem] overflow-hidden text-white relative">
          <img src="https://images.unsplash.com/photo-1590779033100-9f60705a2f3b?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Vườn sầu riêng xanh tốt" />
          <div className="relative z-10 p-10 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight italic">
               Đừng để tuyến trùng<br/>phá thêm vườn của bạn
            </h2>
            <p className="text-gray-300 text-base md:text-xl mb-12 max-w-2xl mx-auto font-medium">Chúng tôi đồng hành cùng bà con cho đến khi vườn xanh tốt trở lại. Tư vấn là miễn phí!</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a href={`https://zalo.me/${zaloId}`} className="bg-[#0068FF] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-4">
                💬 Zalo: {zaloId}
              </a>
              <a href={`tel:${hotline}`} className="bg-[#2d7a2d] text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-4">
                📞 Hotline: {hotline}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
