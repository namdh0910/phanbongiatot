import React from 'react';
import { 
  CheckCircle2, ShieldCheck, Zap, MessageCircle, Phone, ArrowRight, Leaf,
  Droplet, Activity, Award, ChevronDown, Info, Clock, PlayCircle, Star
} from "lucide-react";
import LeadForm from "@/components/shared/LeadForm";

export const metadata = {
  title: 'Phân bón hữu cơ SICOBI 20% OM | FUVICO VIỆT NAM',
  description: 'Phân bón hữu cơ SICOBI 20% OM – Từ nguyên liệu tái chế, xử lý 15 bước nghiêm ngặt, giàu dinh dưỡng cho mọi loại cây.',
  keywords: "phân bón hữu cơ, phân bón FUVICO, SICOBI 20% OM"
};

export default function SicobiLandingPage() {
  return (
    <div className="bg-[#fcfbf7] min-h-screen font-sans selection:bg-[#1a5c2a] selection:text-white overflow-x-hidden">
      
      {/* Minimal Landing Header */}
      <header className="fixed top-0 left-0 right-0 z-[60] bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 md:py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#1a5c2a] text-white p-1.5 rounded-lg">
              <Leaf size={20} />
            </div>
            <span className="font-black text-[#1a5c2a] text-xl tracking-tighter uppercase">FUVICO</span>
          </div>
          <a href="tel:0339505050" className="bg-[#f5a623] text-[#1a5c2a] px-4 py-2 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Phone size={14} /> 0339.505.050
          </a>
        </div>
      </header>

      {/* Urgency Banner */}
      <div className="mt-[60px] md:mt-[72px] bg-[#f5a623] text-[#1a5c2a] py-2 px-4 text-center text-sm md:text-base font-bold flex items-center justify-center gap-2 relative z-50">
        <Zap size={18} className="animate-pulse" />
        ƯU ĐÃI ĐẶC BIỆT: MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC CHO ĐƠN TỪ 1 TẤN!
        <Zap size={18} className="animate-pulse" />
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        <a href="tel:0339505050" className="bg-[#1a5c2a] text-white w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-bounce border-2 border-white" title="Hotline: 0339.505.050">
          <Phone size={24} />
        </a>
        <a href="https://zalo.me/0339505050" className="bg-[#0068FF] text-white w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-2 border-white" title="Zalo hỗ trợ">
          <MessageCircle size={28} />
        </a>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-[#1a5c2a]">
        <div className="absolute inset-0 z-0 bg-[#0d2a1c]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a5c2a] to-transparent opacity-80"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-[1.2] text-center lg:text-left">
              <div className="inline-block bg-[#f5f0e0]/10 backdrop-blur-md border border-[#f5f0e0]/20 text-[#f5f0e0] px-5 py-2 rounded-full mb-6 text-sm font-bold tracking-widest uppercase">
                THƯƠNG HIỆU FUVICO VIỆT NAM
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6 uppercase tracking-tight">
                CAM KẾT CHẤT LƯỢNG <br />
                <span className="text-[#f5a623]">THỊNH VƯỢNG NHÀ NÔNG</span>
              </h1>
              <p className="text-white/90 text-lg md:text-2xl mb-10 leading-relaxed font-medium">
                Phân bón hữu cơ SICOBI 20% OM – Từ nguyên liệu tái chế, xử lý 15 bước nghiêm ngặt, bung rễ mạnh, xanh lá bền.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#order-form" className="bg-[#f5a623] hover:bg-[#fbb940] text-[#1a5c2a] px-8 py-5 rounded-2xl font-black uppercase text-lg md:text-xl shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3 border-2 border-[#f5a623] hover:border-white">
                  ĐẶT HÀNG NGAY – 0339.505.050 <ArrowRight size={24} />
                </a>
              </div>
            </div>
            
            <div className="flex-1 relative w-full max-w-md mx-auto mt-10 lg:mt-0">
              <div className="relative group perspective-1000">
                <img 
                  src="/images/products/fuvico-bag-front-hd.jpg" 
                  alt="Bao bì Sicobi 20% OM" 
                  className="w-full rounded-[2rem] shadow-2xl group-hover:scale-105 transition-transform duration-700 relative z-10 border-4 border-white/10"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl z-20 border-4 border-[#1a5c2a] transform rotate-12">
                   <span className="text-[#1a5c2a] font-black text-2xl leading-none">20%</span>
                   <span className="text-[#f5a623] font-bold text-sm uppercase">Hữu cơ</span>
                </div>
                <div className="absolute inset-0 bg-[#f5a623]/20 blur-[100px] rounded-full -z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-16 bg-[#0d2a1c]">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase mb-10">
            Cận Cảnh <span className="text-[#f5a623]">Chất Lượng Thực Tế</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative group">
              <video 
                className="w-full h-auto aspect-video object-cover group-hover:scale-105 transition-transform duration-500" 
                controls 
                preload="metadata"
                poster="/images/products/fuvico-bag-front-hd.jpg"
              >
                <source src="/videos/fuvico-product-1.mp4" type="video/mp4" />
              </video>
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <PlayCircle size={14} /> Review Bao Bì
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative group">
              <video 
                className="w-full h-auto aspect-video object-cover group-hover:scale-105 transition-transform duration-500" 
                controls 
                preload="metadata"
                poster="/images/products/fuvico-bag-back-hd.jpg"
              >
                <source src="/videos/fuvico-product-2.mp4" type="video/mp4" />
              </video>
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                <PlayCircle size={14} /> Chất Lượng Hạt
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THÀNH PHẦN & THÔNG SỐ */}
      <section className="py-16 md:py-24 bg-[#fcfbf7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#1a5c2a] uppercase">Thành phần & Thông số</h2>
            <div className="w-24 h-1.5 bg-[#f5a623] mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
            {[
              { label: "Chất hữu cơ", value: "20%", icon: <Leaf size={40} className="text-[#1a5c2a]" /> },
              { label: "Tỷ lệ C/N", value: "12", icon: <Activity size={40} className="text-[#1a5c2a]" /> },
              { label: "pHH₂O", value: "5", icon: <Droplet size={40} className="text-[#1a5c2a]" /> },
              { label: "Độ ẩm", value: "30%", icon: <Zap size={40} className="text-[#1a5c2a]" />, desc: "(dạng rắn)" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-[#1a5c2a]/5 text-center hover:-translate-y-2 transition-transform duration-300 border-b-4 border-[#1a5c2a]">
                <div className="bg-[#fcfbf7] w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 shadow-inner">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-[#1a5c2a] mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-bold uppercase tracking-wide text-sm md:text-base">{stat.label}</p>
                {stat.desc && <p className="text-gray-400 text-xs mt-1 font-medium">{stat.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ĐẶC TÍNH NỔI BẬT */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#fcfbf7] -skew-x-12 transform origin-top hidden lg:block pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-[1.2]">
              <h2 className="text-3xl md:text-5xl font-black text-[#1a5c2a] uppercase mb-10 leading-tight">
                Đặc tính <br/>
                <span className="text-[#f5a623]">Nổi bật</span>
              </h2>
              <div className="space-y-5">
                {[
                  "Sản xuất từ hữu cơ thực phẩm, qua 15 bước kiểm định nghiêm ngặt",
                  "Không chứa kim loại nặng (asen, cadimi, chì) - An toàn tuyệt đối",
                  "Làm tơi xốp đất, hoạt hoá dinh dưỡng tồn dư hiệu quả",
                  "Tăng sức khoẻ cây trồng đáng kinh ngạc, bộ rễ bung mạnh"
                ].map((feature, i) => (
                  <div key={i} className="flex gap-5 p-6 bg-[#fcfbf7] rounded-[2rem] border border-[#1a5c2a]/5 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                    <div className="text-[#1a5c2a] mt-1 bg-white p-2 rounded-full shadow-sm group-hover:scale-110 group-hover:bg-[#f5a623] group-hover:text-white transition-all">
                      <CheckCircle2 size={24} />
                    </div>
                    <p className="text-lg font-bold text-gray-700 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative w-full">
               <img src="/images/products/fuvico-bag-back-hd.jpg" alt="Mặt sau bao bì SICOBI" className="w-full rounded-[3rem] shadow-2xl border-8 border-white z-10 relative object-cover max-h-[600px]" />
               <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#f5a623]/20 rounded-full blur-[60px] -z-10"></div>
               
               <div className="absolute -right-4 -top-4 bg-white p-4 rounded-2xl shadow-xl z-20 border border-gray-100 rotate-6 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1a5c2a] rounded-full flex items-center justify-center text-white">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase text-gray-400">Độ sạch</p>
                      <p className="text-xl font-black text-[#1a5c2a]">99.99%</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HƯỚNG DẪN SỬ DỤNG VỚI TIMING */}
      <section className="py-16 md:py-24 bg-[#1a5c2a] text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase">Hướng dẫn sử dụng</h2>
            <p className="mt-4 text-[#f5f0e0] text-lg font-medium">Liều lượng chuẩn & Thời điểm cho từng loại cây trồng</p>
            <div className="w-24 h-1.5 bg-[#f5a623] mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="bg-white text-gray-800 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
            {[
              { crop: "Cây lương thực", dosage: "650–850 kg/ha/lần", timing: "Bón lót trước khi gieo trồng, bón thúc vào giai đoạn sau trồng 7-10 ngày và 20-25 ngày." },
              { crop: "Cây rau màu", dosage: "700–900 kg/ha/lần", timing: "Bón 2 lần/vụ vào giai đoạn trước khi gieo trồng và sau 15-20 ngày." },
              { crop: "Cây ăn trái", dosage: "900–1.200 kg/ha/lần", timing: "Kiến thiết cơ bản: bón lót, định kỳ 3-4 tháng/lần. Kinh doanh: sau thu hoạch, trước khi ra hoa và nuôi trái." },
              { crop: "Cây công nghiệp dài ngày", dosage: "850–1.100 kg/ha/lần", timing: "Bón lót khi trồng mới và bón thúc định kỳ 55-60 ngày/lần." },
              { crop: "Cây công nghiệp ngắn ngày", dosage: "900–1.100 kg/ha/lần", timing: "Bón 2 lần/vụ vào giai đoạn trước khi gieo trồng và sau 25-30 ngày." },
              { crop: "Cây lâu năm/Cây gốc", dosage: "950–1.100 kg/ha/lần", timing: "Bón lót khi trồng mới/sau thu hoạch và bón định kỳ 50-60 ngày/lần." },
              { crop: "Cây hoa, cảnh", dosage: "1.000–1.200 kg/ha/lần (Cảnh: 1-3 kg/gốc)", timing: "Giai đoạn đâm chồi, trước khi ra hoa. Bón định kỳ 60-70 ngày/lần." }
            ].map((item, i) => (
              <details key={i} className="group border-b border-gray-100 py-4 last:border-0 cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-[#1a5c2a] text-lg md:text-xl outline-none select-none list-none [&::-webkit-details-marker]:hidden hover:bg-gray-50 p-2 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#f5f0e0] rounded-full flex items-center justify-center text-[#f5a623] shrink-0">
                       <Leaf size={18} />
                    </div>
                    {item.crop}
                  </div>
                  <span className="transition-transform duration-300 group-open:rotate-180 bg-[#f5f0e0] p-2 rounded-full text-[#1a5c2a] shrink-0">
                    <ChevronDown size={20} />
                  </span>
                </summary>
                <div className="mt-3 pl-4 ml-5 border-l-4 border-[#f5a623] text-base md:text-lg font-medium text-gray-600 bg-[#fcfbf7] py-4 px-5 rounded-r-2xl space-y-2">
                  <p>Liều lượng: <span className="text-[#1a5c2a] font-black text-xl ml-1">{item.dosage}</span></p>
                  <p className="flex gap-2 items-start text-sm md:text-base text-gray-500">
                    <Clock size={18} className="mt-0.5 text-[#f5a623] shrink-0" /> {item.timing}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-[#fcfbf7]">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#1a5c2a] uppercase">Nhà Nông Tin Dùng</h2>
            <div className="w-24 h-1.5 bg-[#f5a623] mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { name: "Anh Quang", location: "Đắk Lắk", quote: "Từ lúc dùng Sicobi 20% OM bón lót cho vườn cà phê, rễ ra trắng xóa, cây chịu hạn tốt hơn hẳn mùa khô năm nay.", crop: "Cà phê" },
               { name: "Chú Tư", location: "Lâm Đồng", quote: "Trồng rau màu sợ nhất đất chai, từ ngày xài phân này đất xốp hẳn, năng suất xà lách tăng thấy rõ mà an toàn.", crop: "Rau màu" },
               { name: "Anh Hải", location: "Đồng Nai", quote: "Sầu riêng phục hồi sau thu hoạch cực nhanh. Dàn lá xanh dày, bóng mượt. Hàng Việt Nam mà chất lượng rất chuẩn.", crop: "Sầu riêng" }
             ].map((review, i) => (
               <div key={i} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative pt-12">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#f5a623] text-white p-3 rounded-full shadow-lg">
                    <Star size={24} className="fill-white" />
                  </div>
                  <div className="flex gap-1 mb-4 justify-center text-[#f5a623]">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-[#f5a623]" />)}
                  </div>
                  <p className="text-gray-600 italic mb-6 text-center text-lg">"{review.quote}"</p>
                  <div className="text-center border-t border-gray-100 pt-4">
                    <p className="font-black text-[#1a5c2a]">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.location} • Vườn {review.crop}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. TRUST BLOCK */}
      <section className="py-16 bg-[#f5a623] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-white/50">
            <div className="w-24 h-24 bg-[#1a5c2a] rounded-[2rem] flex items-center justify-center flex-shrink-0 text-white shadow-inner transform -rotate-6">
              <Info size={48} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-[#1a5c2a] uppercase mb-4 tracking-tight">BẠN CÓ BIẾT?</h3>
              <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                Hữu cơ tái chế từ thực phẩm dư thừa là nguồn hữu cơ cực tốt cho đất. 
                <strong className="text-[#1a5c2a] font-black"> FUVICO</strong> chọn nguồn gắt gao, bảo đảm <strong className="text-red-600 bg-red-50 px-2 py-1 rounded-md font-black border border-red-100 mx-1">99,99% tỉ lệ sạch</strong> từ đầu nguồn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THÔNG TIN DOANH NGHIỆP & 7. FORM LIÊN HỆ */}
      <section id="order-form" className="py-16 md:py-24 bg-[#fcfbf7]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* THÔNG TIN */}
            <div className="flex-1 bg-[#1a5c2a] text-white p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <ShieldCheck size={240} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase mb-10 text-[#f5a623] relative z-10 tracking-tight">Thông tin doanh nghiệp</h3>
              <ul className="space-y-8 relative z-10">
                <li className="flex gap-5">
                  <div className="bg-white/10 p-3 rounded-2xl h-fit">
                    <Award size={28} className="text-[#f5a623]" />
                  </div>
                  <div>
                    <span className="block text-xs text-[#f5f0e0]/70 uppercase font-black tracking-widest mb-1">Thương hiệu độc quyền</span>
                    <strong className="text-xl font-bold">CÔNG TY TNHH FUVICO VIỆT NAM</strong>
                  </div>
                </li>
                <li className="flex gap-5">
                  <div className="bg-white/10 p-3 rounded-2xl h-fit">
                    <ShieldCheck size={28} className="text-[#f5a623]" />
                  </div>
                  <div>
                    <span className="block text-xs text-[#f5f0e0]/70 uppercase font-black tracking-widest mb-1">Đơn vị đăng ký</span>
                    <strong className="text-lg font-medium">CÔNG TY TNHH SX TM NHẬP KHẨU QUỐC TẾ DANAMA</strong>
                  </div>
                </li>
                <li className="flex gap-5">
                  <div className="bg-white/10 p-3 rounded-2xl h-fit">
                    <CheckCircle2 size={28} className="text-[#f5a623]" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 w-full">
                    <div>
                      <span className="block text-xs text-[#f5f0e0]/70 uppercase font-black tracking-widest mb-1">Mã số phân bón</span>
                      <strong className="text-lg font-bold text-[#f5a623]">27426</strong>
                    </div>
                    <div>
                      <span className="block text-xs text-[#f5f0e0]/70 uppercase font-black tracking-widest mb-1">Xuất xứ</span>
                      <strong className="text-lg font-bold text-[#f5a623]">Việt Nam</strong>
                    </div>
                  </div>
                </li>
                <li className="flex gap-5">
                  <div className="bg-white/10 p-3 rounded-2xl h-fit">
                    <Clock size={28} className="text-[#f5a623]" />
                  </div>
                  <div className="grid grid-cols-2 gap-6 w-full">
                    <div>
                      <span className="block text-xs text-[#f5f0e0]/70 uppercase font-black tracking-widest mb-1">Hạn sử dụng</span>
                      <strong className="text-lg font-bold">36 tháng từ NSX</strong>
                    </div>
                    <div>
                      <span className="block text-xs text-[#f5f0e0]/70 uppercase font-black tracking-widest mb-1">Chứng nhận</span>
                      <strong className="text-lg font-bold">ISO 9001:2015</strong>
                    </div>
                  </div>
                </li>
                <li className="flex gap-5 mt-8 pt-8 border-t border-white/10">
                  <div className="w-full">
                     <span className="block text-xs text-[#f5f0e0]/70 uppercase font-black tracking-widest mb-3">Địa chỉ</span>
                     <p className="text-lg leading-relaxed font-medium text-[#f5f0e0]">137/2 Huỳnh Thúc Kháng, Phường Kon Tum, Tỉnh Quảng Ngãi</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* FORM */}
            <div className="flex-[1.2] bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-black text-[#1a5c2a] uppercase tracking-tight">Đặt hàng hoặc<br/>tư vấn miễn phí</h3>
                <p className="text-gray-500 mt-3 font-medium text-lg">Điền thông tin, chuyên gia FUVICO sẽ gọi lại ngay!</p>
              </div>
              
              <LeadForm 
                initialPathology="Tư vấn phân bón SICOBI 20% OM" 
                initialCrop="" 
                submitButtonText="GỬI YÊU CẦU TƯ VẤN" 
              />
              
              <div className="mt-8 text-center p-6 bg-[#fcfbf7] rounded-3xl border border-[#1a5c2a]/5 shadow-inner">
                 <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Hotline hỗ trợ trực tiếp</span>
                 <a href="tel:0339505050" className="block text-4xl font-black text-[#f5a623] mt-2 tracking-tighter hover:scale-105 transition-transform">0339.505.050</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#0d2a1c] py-16 text-center text-white border-t-8 border-[#f5a623]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-center mb-10">
            <div className="bg-white text-[#1a5c2a] px-8 py-3 rounded-full font-black text-3xl tracking-widest uppercase shadow-xl flex items-center gap-3">
              <Leaf size={28} className="text-[#f5a623]" /> FUVICO
            </div>
          </div>
          <p className="text-white/70 text-sm font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
            Địa chỉ: 137/2 Huỳnh Thúc Kháng, Phường Kon Tum, Tỉnh Quảng Ngãi<br/>
            CÔNG TY TNHH FUVICO VIỆT NAM - CÔNG TY TNHH SX TM NHẬP KHẨU QUỐC TẾ DANAMA
          </p>
          <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-2xl max-w-xl mx-auto inline-block">
            <p className="text-red-400 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
              <ShieldCheck size={18} /> CẢNH BÁO AN TOÀN SỬ DỤNG
            </p>
            <p className="text-white/60 text-[11px] mt-2 font-medium uppercase tracking-wide">
              Bảo quản nơi khô ráo, thoáng mát. Tránh xa tầm tay trẻ em. Mặc đồ bảo hộ khi sử dụng.
            </p>
          </div>
          <div className="mt-12 text-white/30 text-[10px] uppercase font-bold tracking-widest">
            © 2026 FUVICO VIỆT NAM. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
