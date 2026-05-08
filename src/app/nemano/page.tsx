import { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  Star, 
  Phone, 
  ArrowRight, 
  AlertTriangle,
  HelpCircle,
  Clock,
  TrendingUp,
  Leaf,
  Activity,
  Award
} from "lucide-react";
import LeadForm from "@/components/shared/LeadForm";
import SchemaMarkup from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
  title: "NEMANO - Khắc Tinh Tuyến Trùng, Phục Hồi Bộ Rễ Thần Tốc | PBGT",
  description: "Giải pháp sinh học hàng đầu giúp tiêu diệt tuyến trùng gây sưng rễ, lở cổ rễ và kích thích ra rễ mới trắng xóa chỉ sau 1 lần xử lý.",
};

export default function NemanoEliteLanding() {
  const landingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Chế phẩm sinh học NEMANO - Phân Bón Giá Tốt",
    "image": "https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/nemano-hero.jpg",
    "description": "Đặc trị tuyến trùng, nấm đất và phục hồi bộ rễ cây suy kiệt.",
    "brand": { "@type": "Brand", "name": "PBGT" },
    "offers": {
      "@type": "Offer",
      "url": "https://www.phanbongiatot.com/nemano",
      "priceCurrency": "VND",
      "price": "0",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="bg-[#fcfdfc] min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <SchemaMarkup data={landingSchema} />
      
      {/* ELITE STICKY CTA (MOBILE) */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <a href="https://zalo.me/0773440966" className="flex-1 bg-[#0068FF] text-white flex flex-col items-center justify-center py-3 rounded-2xl font-black uppercase shadow-lg active:scale-95 transition-all">
          <span className="text-[10px] opacity-80">Tư vấn miễn phí</span>
          <span className="text-xs">NHẮN ZALO NGAY</span>
        </a>
        <a href="tel:0773440966" className="flex-1 bg-[#1a5c2a] text-white flex flex-col items-center justify-center py-3 rounded-2xl font-black uppercase shadow-lg active:scale-95 transition-all animate-pulse">
          <span className="text-[10px] opacity-80">Gọi Kỹ thuật</span>
          <span className="text-xs">0773.440.966</span>
        </a>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-12 md:pt-48 md:pb-40 overflow-hidden bg-[#0d2a1c]">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-[1.2] text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-6 backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-emerald-400 text-[10px] md:text-xs font-black uppercase tracking-[0.15em]">Phát hiện Tuyến Trùng - Xử lý ngay kẻo trễ</span>
              </div>
              
              <h1 className="text-3xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-6 md:mb-10 tracking-tighter">
                NEMANO - <br /> 
                <span className="text-emerald-400 italic">"ÁN TỬ" CHO</span> <br />
                TUYẾN TRÙNG <br />
                <span className="text-[#f5a623]">SƯNG RỄ</span>
              </h1>
              
              <p className="text-emerald-100/80 text-base md:text-2xl mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium italic">
                "Bới rễ lên thấy sưng cục, rễ tơ thối đen... <br className="hidden md:block"/>
                Đừng để vườn đổ sập chỉ vì lũ giặc ngầm dưới đất. Nemano tiêu diệt triệt để Tuyến trùng, hồi sinh rễ mới trắng xóa."
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#order-form" className="bg-[#f5a623] hover:bg-[#fbb940] text-white px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-[2.5rem] font-black uppercase tracking-widest text-xs md:text-sm shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
                  XỬ LÝ TUYẾN TRÙNG NGAY <ArrowRight size={20} />
                </a>
                <a href="tel:0773440966" className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-[2.5rem] font-black uppercase tracking-widest text-xs md:text-sm transition-all flex items-center justify-center gap-3">
                  <Phone size={20} /> GỌI KỸ THUẬT
                </a>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-md md:max-w-xl">
               <div className="relative z-10 w-full transform hover:scale-105 transition-transform duration-700">
                  <img 
                    src="https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/nemano-product.png" 
                    alt="Nemano - Đặc trị tuyến trùng" 
                    className="w-full drop-shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
                  />
                  <div className="absolute -top-4 md:-top-8 -left-4 md:-left-8 bg-red-600 text-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] flex flex-col items-center justify-center shadow-2xl -rotate-12 font-black border-2 md:border-4 border-white animate-bounce-slow">
                     <span className="text-[8px] md:text-xs uppercase opacity-80">Hiệu quả</span>
                     <span className="text-2xl md:text-4xl leading-none">100%</span>
                  </div>
               </div>
               <div className="absolute inset-0 bg-emerald-500/20 blur-[150px] rounded-full scale-90 translate-y-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS */}
      <section className="py-12 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-24">
            <span className="text-red-600 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 block italic">Cảnh báo đỏ từ vườn</span>
            <h2 className="text-3xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter mb-6 md:mb-8 leading-[0.95]">
              Cây Vàng Lá, Chậm Lớn <br/>
              <span className="text-red-600">Đừng Chủ Quan!</span>
            </h2>
            <p className="text-gray-500 text-base md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              Tuyến trùng không gây chết cây ngay, chúng "gặm nhấm" rễ tơ, tạo vết thương cho nấm Phytophthora tấn công gây thối rễ chết nhanh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
             {[
               { emoji: "🪱", title: "Sưng rễ, thối đầu rễ", desc: "Rễ tơ nổi u cục, sần sùi như da cóc. Đầu rễ thối đen, không thể hút nước và dinh dưỡng." },
               { emoji: "🍂", title: "Vàng lá, còi cọc", desc: "Lá ngả vàng toàn bộ hoặc theo gân, cây đứng sững, đọt non không ra dù bón đủ phân." },
               { emoji: "💀", title: "Cây chết dần mòn", desc: "Cây suy kiệt sức đề kháng, nấm bệnh tấn công gây thối rễ, xì mủ và chết cây hàng loạt." }
             ].map((item, i) => (
               <div key={i} className="group p-8 md:p-12 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-red-50 hover:border-red-100 transition-all duration-500 text-center">
                  <div className="text-5xl md:text-7xl mb-6 group-hover:scale-110 transition-transform">{item.emoji}</div>
                  <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-4 group-hover:text-red-700 transition-colors uppercase italic tracking-tighter">{item.title}</h4>
                  <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-lg">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. SOLUTION - THE SCIENCE */}
      <section className="py-12 md:py-32 bg-[#0d2a1c] text-white overflow-hidden relative">
         <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
               <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-8">
                     <Activity className="text-emerald-400" size={16} />
                     <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Cơ chế tiêu diệt triệt để</span>
                  </div>
                  <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-[0.95]">
                     Nemano: <br/>
                     <span className="text-emerald-400">Khắc tinh của <br/> Giặc ngầm</span>
                  </h2>
                  <div className="space-y-6 md:space-y-8 text-emerald-100/70 text-base md:text-xl font-medium leading-relaxed">
                     <p>Nemano sử dụng công nghệ vi sinh nồng độ cao, tấn công trực tiếp vào trứng và ấu trùng tuyến trùng trong đất. Phá vỡ chu kỳ sinh trưởng của chúng.</p>
                     <div className="bg-white/5 border-l-4 border-emerald-500 p-6 md:p-8 rounded-r-2xl italic text-emerald-100">
                        "Không chỉ diệt tuyến trùng, Nemano còn tạo 'lá chắn sinh học' bảo vệ rễ tơ mới hình thành khỏi sự xâm nhập của nấm Phytophthora."
                     </div>
                  </div>
               </div>
               
               <div className="flex-1 relative">
                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                     {[
                       { icon: Zap, title: "Diệt tận gốc", text: "Tiêu diệt 99% tuyến trùng và trứng chỉ sau 48h." },
                       { icon: TrendingUp, title: "Kích rễ tơ", text: "Hormone sinh trưởng tự nhiên kích rễ nhú trắng." },
                       { icon: ShieldCheck, title: "An toàn tuyệt đối", text: "Dòng sinh học, không gây hại cho đất và người." },
                       { icon: Award, title: "Bảo vệ 3 lớp", text: "Ngăn nấm bệnh, phục hồi rễ, ổn định đất." }
                     ].map((item, i) => (
                       <div key={i} className="bg-white/5 p-6 md:p-8 rounded-[2rem] border border-white/10 backdrop-blur-sm group hover:bg-emerald-500/10 transition-all">
                          <item.icon className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform" size={24} />
                          <h5 className="font-black text-white text-sm md:text-lg mb-2 uppercase italic tracking-tighter">{item.title}</h5>
                          <p className="text-emerald-100/50 text-[10px] md:text-xs font-medium leading-relaxed">{item.text}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. TRANSFORMATION - BEFORE / AFTER */}
      <section className="py-12 md:py-32 bg-white">
         <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12 md:mb-24">
               <h2 className="text-3xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter mb-6 md:mb-8 leading-[0.95]">Hiệu quả nhìn thấy <br/><span className="text-emerald-600">bằng mắt thường</span></h2>
               <p className="text-gray-500 text-base md:text-xl font-medium">Bà con chỉ cần dùng 1 lần, sau 15-20 ngày bới rễ lên sẽ thấy sự khác biệt kinh ngạc.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                     <div className="relative rounded-[2rem] overflow-hidden border-4 border-red-50">
                        <img src="https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/nemano-before.jpg" alt="Trước khi xử lý" className="w-full h-48 md:h-64 object-cover" />
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">TRƯỚC KHI XỬ LÝ</div>
                     </div>
                     <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100">
                        <p className="text-red-700 font-bold text-sm italic">"Rễ sưng cục, thối đen, cây đứng sững cả năm không ra cơi đọt."</p>
                     </div>
                  </div>
                  <div className="space-y-4 md:translate-y-12">
                     <div className="relative rounded-[2rem] overflow-hidden border-4 border-emerald-50">
                        <img src="https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/nemano-after.jpg" alt="Sau khi xử lý" className="w-full h-48 md:h-64 object-cover" />
                        <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">SAU 15 NGÀY</div>
                     </div>
                     <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                        <p className="text-emerald-700 font-bold text-sm italic">"Rễ tơ nhú trắng xóa, đọt non vươn mạnh, lá xanh đậm trở lại."</p>
                     </div>
                  </div>
               </div>
               
               <div className="space-y-8 md:space-y-12">
                  {[
                    { title: "Cắt đứt chu kỳ tuyến trùng", desc: "Nemano tiêu diệt trứng và ấu trùng, ngăn chặn sự tái phát sau mùa mưa." },
                    { title: "Mở khóa rễ tơ", desc: "Cung cấp dinh dưỡng sinh học giúp đầu rễ nhú trắng, hút phân cực mạnh." },
                    { title: "Kháng nấm bệnh", desc: "Thiết lập hệ vi sinh vật có lợi, đẩy lùi nấm Phytophthora, Fusarium." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                       <div className="w-12 md:w-16 h-12 md:h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                          <CheckCircle2 size={28} />
                       </div>
                       <div>
                          <h4 className="text-xl md:text-2xl font-black text-gray-900 mb-2 uppercase italic tracking-tighter">{item.title}</h4>
                          <p className="text-gray-500 text-sm md:text-lg font-medium leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section className="py-12 md:py-32 bg-gray-50">
         <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12 md:mb-24">
               <h2 className="text-3xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter mb-6 md:mb-8 leading-[0.95]">Chia sẻ của nhà vườn</h2>
               <div className="flex justify-center gap-1 text-amber-400 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
               </div>
               <p className="text-gray-500 text-sm md:text-lg font-bold italic">Hàng ngàn nhà vườn đã cứu thành công vườn sầu riêng, cà phê nhờ Nemano.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
               {[
                 { name: "Anh Nam (Krông Pắc)", crop: "Vườn Sầu Riêng", text: "Vườn tôi bị tuyến trùng nặng, dùng đủ loại thuốc hóa học không hết. Từ lúc chuyển qua Nemano, rễ ra quá trời, đọt vươn xanh mướt." },
                 { name: "Chú Tư (Di Linh)", crop: "Vườn Cà Phê", text: "Nemano này mát lắm, xịt vô cây không bị sốc như thuốc hóa học. Mà quan trọng là diệt tuyến trùng sạch bách luôn." },
                 { name: "Chị Lan (Gia Lai)", crop: "Vườn Tiêu", text: "Tiêu nhà chị bị chết chậm, bới rễ thấy sưng. Dùng Nemano được 1 đợt thấy cây hồi tỉnh hẳn, lá không còn rụng nữa." }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-white">
                    <p className="text-gray-600 text-sm md:text-lg font-medium italic leading-relaxed mb-8 md:mb-12">"{item.text}"</p>
                    <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                       <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-xl">👨‍🌾</div>
                       <div>
                          <h5 className="font-black text-gray-900 uppercase italic text-xs md:text-sm">{item.name}</h5>
                          <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">{item.crop}</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-12 md:py-32 bg-white">
         <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-2xl md:text-5xl font-black text-center text-gray-900 uppercase italic tracking-tighter mb-12 md:mb-20">Giải đáp thắc mắc</h3>
            <div className="space-y-4 md:space-y-6">
               {[
                 { q: "Nên dùng Nemano vào thời điểm nào tốt nhất?", a: "Tốt nhất là vào đầu mùa mưa và cuối mùa mưa - thời điểm tuyến trùng bùng phát mạnh nhất. Tuy nhiên nếu vườn đã có biểu hiện sưng rễ thì bà con cần xử lý ngay lập tức bất kể mùa vụ." },
                 { q: "Sản phẩm có dùng chung được với phân bón không?", a: "Dạ được! Nemano có thể pha chung với các loại phân bón lá sinh học hoặc trung vi lượng để cây vừa được trị bệnh vừa được bồi bổ." },
                 { q: "Vườn đang khỏe mạnh có nên dùng không?", a: "Rất nên ạ! Phòng bệnh luôn tốt hơn chữa bệnh. Dùng Nemano định kỳ 3-4 tháng 1 lần giúp bảo vệ đất và rễ tơ luôn khỏe mạnh." }
               ].map((faq, i) => (
                 <div key={i} className="bg-gray-50 p-6 md:p-10 rounded-2xl md:rounded-[3rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                    <div className="flex gap-4 md:gap-6 items-start">
                       <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1a5c2a] text-white rounded-xl flex items-center justify-center flex-shrink-0 font-black">Q</div>
                       <div>
                          <h5 className="font-black text-gray-900 mb-3 md:mb-4 text-base md:text-xl leading-tight">{faq.q}</h5>
                          <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-lg italic">{faq.a}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. FINAL CTA */}
      <section id="order-form" className="py-12 md:py-32 bg-[#0d2a1c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto bg-white rounded-[3rem] md:rounded-[4.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
             <div className="lg:w-[42%] bg-[#0d2a1c] p-8 md:p-20 text-white flex flex-col justify-center">
                <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Ưu đãi hôm nay</span>
                <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.95] mb-8 md:mb-10">
                   Nhận Báo Giá <br /> 
                   <span className="text-emerald-400">& Tư Vấn</span> <br/>
                   Nemano
                </h3>
                
                <div className="space-y-4 md:space-y-6 mb-10 md:mb-12">
                   {[
                     "Phác đồ xử lý tuyến trùng chuẩn Kỹ sư",
                     "Kiểm tra tình trạng vườn qua Zalo 24/7",
                     "Hỗ trợ giao hàng tận vườn toàn quốc"
                   ].map((text, i) => (
                     <div key={i} className="flex items-center gap-3 font-bold text-sm md:text-lg leading-tight">
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] text-white">✓</div>
                        {text}
                     </div>
                   ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 flex items-center gap-6">
                   <div className="text-3xl">🪱</div>
                   <div>
                      <p className="text-emerald-300 text-[10px] font-black uppercase tracking-widest mb-1">Chế phẩm Nemano:</p>
                      <p className="text-white font-black text-base md:text-xl italic uppercase tracking-tighter">Trị dứt điểm sưng thối rễ</p>
                   </div>
                </div>
             </div>

             <div className="flex-1 p-8 md:p-20 bg-white">
                <div className="mb-10">
                   <h4 className="text-2xl md:text-3xl font-black text-gray-900 uppercase italic tracking-tighter mb-4">Thông tin đăng ký:</h4>
                   <p className="text-gray-500 font-medium">Anh chị vui lòng để lại số điện thoại, đội ngũ PBGT sẽ gọi lại ngay để hỗ trợ phác đồ chuẩn nhất.</p>
                </div>
                <LeadForm initialPathology="Đặc trị tuyến trùng sưng rễ" initialCrop="Sầu riêng" />
                <div className="mt-8 flex items-center justify-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                   <ShieldCheck size={14} /> Hệ thống bảo mật thông tin nhà vườn 100%
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER LIGHT */}
      <footer className="py-12 bg-white border-t border-gray-100 text-center">
         <div className="container mx-auto px-4">
            <div className="inline-flex items-center gap-2 mb-4 opacity-50">
               <Leaf className="text-emerald-600" size={20} />
               <span className="text-gray-900 font-black uppercase tracking-[0.3em] text-xs">Phan Bón Giá Tốt</span>
            </div>
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">© 2026 NEMANO BY PHAN BÓN GIÁ TỐT - GIẢI PHÁP NÔNG NGHIỆP THỰC CHIẾN</p>
         </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(-12deg); }
          50% { transform: translateY(-10px) rotate(-12deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}} />
    </div>
  );
}
