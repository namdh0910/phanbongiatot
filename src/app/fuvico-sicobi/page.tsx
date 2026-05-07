
import { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  MessageCircle, 
  Star, 
  ShoppingBag, 
  Phone, 
  ChevronRight, 
  ArrowRight, 
  Play, 
  Heart, 
  Award, 
  Leaf,
  AlertTriangle,
  HelpCircle,
  Clock,
  ThumbsUp,
  TrendingUp,
  MapPin
} from "lucide-react";
import LeadForm from "@/components/shared/LeadForm";
import SchemaMarkup from "@/components/shared/SchemaMarkup";

export const metadata: Metadata = {
  title: "SICOBI 20% OM - Hồi Sinh Đất Chai Cứng, Rễ Bung Trắng Xóa | FUVICO",
  description: "Giải pháp hữu cơ thực phẩm sạch 99.99% giúp mở khóa dinh dưỡng, cải tạo đất tơi xốp và kích rễ thần tốc. Đã được 15.000+ nhà vườn tin dùng.",
};

export default function FuvicoEliteLanding() {
  const landingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Phân bón hữu cơ SICOBI 20% OM - FUVICO",
    "image": "/images/products/photo_6332526088357088944_y.jpg",
    "description": "Dòng sản phẩm cao cấp chuyên trị đất chai cứng, bạc màu và kích rễ phục hồi cây suy.",
    "brand": { "@type": "Brand", "name": "FUVICO" },
    "offers": {
      "@type": "Offer",
      "url": "https://www.phanbongiatot.com/fuvico-sicobi",
      "priceCurrency": "VND",
      "price": "0",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <SchemaMarkup data={landingSchema} />
      
      {/* ELITE STICKY CTA (MOBILE) */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <a href="https://zalo.me/0773440966" className="flex-1 bg-[#0068FF] text-white flex flex-col items-center justify-center py-3 rounded-2xl font-black uppercase shadow-lg active:scale-95 transition-all">
          <span className="text-[10px] opacity-80">Tư vấn miễn phí</span>
          <span className="text-xs">NHẮN ZALO NGAY</span>
        </a>
        <a href="tel:0773440966" className="flex-1 bg-emerald-600 text-white flex flex-col items-center justify-center py-3 rounded-2xl font-black uppercase shadow-lg active:scale-95 transition-all animate-pulse">
          <span className="text-[10px] opacity-80">Gọi Kỹ thuật</span>
          <span className="text-xs">0773.440.966</span>
        </a>
      </div>

      {/* 1. HERO SECTION - THE EMOTIONAL HOOK */}
      <section className="relative pt-24 pb-16 md:pt-48 md:pb-40 overflow-hidden bg-[#0d2a1c]">
        {/* Visual Assets */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500 to-transparent"></div>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="flex-[1.2] text-center lg:text-left">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full mb-8 backdrop-blur-md">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0d2a1c] bg-gray-400"></div>)}
                </div>
                <span className="text-emerald-400 text-[10px] md:text-xs font-black uppercase tracking-[0.15em]">15.000+ Nhà vườn đã hồi sinh đất thành công</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
                ĐẤT KHÔNG CÒN <br /> 
                <span className="text-emerald-400 italic">CHAI CỨNG</span> <br />
                RỄ KHÔNG CÒN <br />
                <span className="text-[#f5a623]">SUY KIỆT</span>
              </h1>
              
              <p className="text-emerald-100/80 text-lg md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium italic">
                "Nhìn vườn lụi dần mà đứt từng khúc ruột..." <br/>
                Bà con ơi! Đừng để đất chết lâm sàng. Sicobi 20% OM giúp "tháo xiềng xích" cho dinh dưỡng, cho rễ bung trắng xóa chỉ sau 1 lần bón.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <a href="#order-form" className="bg-emerald-500 hover:bg-emerald-400 text-white px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
                  NHẬN GIẢI PHÁP & ƯU ĐÃI <ArrowRight size={20} />
                </a>
                <a href="tel:0773440966" className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3">
                  <Phone size={20} /> GỌI TƯ VẤN NGAY
                </a>
              </div>

              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60">
                 {[
                   { icon: ShieldCheck, text: "Sạch 99.99%" },
                   { icon: Award, text: "Chuẩn Fuvico" },
                   { icon: TrendingUp, text: "Tăng Năng Suất" },
                   { icon: Leaf, text: "Hữu Cơ 100%" }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-2">
                      <item.icon className="text-emerald-400" size={18} />
                      <span className="text-white text-[10px] font-black uppercase tracking-widest">{item.text}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-lg">
               <div className="relative z-10 w-full transform hover:scale-105 transition-transform duration-700">
                  <img 
                    src="/images/products/photo_6332526088357088944_y.jpg" 
                    alt="Sicobi 20% OM - Fuvico" 
                    className="w-full rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-8 border-white/5"
                  />
                  {/* Floating Price Badge */}
                  <div className="absolute -top-8 -left-8 bg-orange-600 text-white p-8 rounded-[2.5rem] flex flex-col items-center justify-center shadow-2xl -rotate-6 font-black border-4 border-white animate-bounce-slow">
                     <span className="text-xs uppercase opacity-80">Trọng lượng</span>
                     <span className="text-4xl">50KG</span>
                  </div>
               </div>
               {/* Background Glow */}
               <div className="absolute inset-0 bg-emerald-500/30 blur-[150px] rounded-full scale-90 translate-y-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINT SECTION - AGITATING THE PROBLEM */}
      <section className="py-24 md:py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <span className="text-orange-600 font-black text-xs md:text-sm uppercase tracking-[0.3em] mb-6 block italic">Nỗi đau của nhà vườn</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter mb-8 leading-[0.95]">
              Càng bón phân hóa học, <br/>
              <span className="text-red-600">Đất càng "Chết" lâm sàng?</span>
            </h2>
            <p className="text-gray-500 text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              Bà con bón hàng tấn phân, tốn hàng chục triệu nhưng cây vẫn vàng lá, rễ thì thối đen. Tại sao vậy?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
             {[
               { emoji: "🏜️", title: "Đất "chai" như đá", desc: "Đất bí bách, không còn oxy cho rễ thở. Rễ tơ không thể đâm xuyên, cây đứng sững không lớn." },
               { emoji: "🔒", title: "Dinh dưỡng bị "khóa"", desc: "Lân và Kali đóng cặn trong đất, cây nhìn thấy nhưng không thể hấp thụ. Bón bao nhiêu phí bấy nhiêu." },
               { emoji: "🦠", title: "Nấm bệnh bùng phát", desc: "Vi sinh vật có lợi chết sạch, tạo điều kiện cho Tuyến trùng và Phytophthora tấn công phá nát bộ rễ." }
             ].map((item, i) => (
               <div key={i} className="relative group p-12 bg-gray-50 rounded-[4rem] border border-gray-100 hover:bg-red-50 hover:border-red-100 transition-all duration-500">
                  <div className="text-6xl mb-8 group-hover:scale-110 transition-transform inline-block">{item.emoji}</div>
                  <h4 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-red-700 transition-colors">{item.title}</h4>
                  <p className="text-gray-600 font-medium leading-relaxed text-lg group-hover:text-red-900/70">{item.desc}</p>
                  <div className="absolute top-8 right-8 text-red-500/10 group-hover:text-red-500/20 transition-colors">
                     <AlertTriangle size={48} />
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. WHY THE PROBLEM HAPPENS - THE EDUCATION */}
      <section className="py-24 md:py-40 bg-[#0d2a1c] text-white relative">
         <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-20">
               <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full mb-8">
                     <HelpCircle className="text-emerald-400" size={16} />
                     <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Góc nhìn chuyên gia PBGT</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-10 leading-[0.95]">
                     Sự thật là:<br/>
                     <span className="text-emerald-400">Cây không "đói" phân,<br/> Cây chỉ đang bị "nghẹn"</span>
                  </h2>
                  <div className="space-y-8 text-emerald-100/70 text-lg md:text-xl font-medium leading-relaxed">
                     <p>Khi đất bị nén chặt, các hạt keo đất gắn kết quá mức khiến dinh dưỡng bị giữ chặt (hóa keo). Rễ cây dù có khỏe đến đâu cũng không thể tách được dinh dưỡng ra để ăn.</p>
                     <p className="border-l-4 border-emerald-500 pl-8 py-2 italic text-emerald-100">"Muốn rễ ăn được, bà con phải 'mở khóa' đất trước khi bón thêm phân bón mới."</p>
                  </div>
               </div>
               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: Zap, title: "Phá vỡ liên kết keo", text: "Sicobi cắt đứt các liên kết hóa học đang khóa chặt lân và kali." },
                    { icon: Clock, title: "Hồi sinh vi sinh", text: "Cung cấp thức ăn sạch cho Trichoderma phát triển bùng phát." },
                    { icon: TrendingUp, title: "Tăng pH đất", text: "Cân bằng độ chua, đưa đất về trạng thái lý tưởng cho rễ." },
                    { icon: ShieldCheck, title: "Thải độc đất", text: "Loại bỏ tồn dư hóa học gây độc cho đầu rễ tơ." }
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
                       <item.icon className="text-emerald-400 mb-6" size={32} />
                       <h5 className="font-black text-white text-lg mb-3 uppercase italic tracking-tighter">{item.title}</h5>
                       <p className="text-emerald-100/50 text-sm font-medium">{item.text}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 4. SOLUTION & BENEFITS - THE TRANSFORMATION */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-24">
             <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter mb-8 leading-[0.95]">
                Sicobi 20% OM: <br/>
                <span className="text-emerald-600">"Chìa Khóa Vàng" Mở Đất</span>
             </h2>
             <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto">Sản xuất từ nguồn hữu cơ thực phẩm tinh chế qua 15 bước nghiêm ngặt của FUVICO.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="relative group">
                <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full group-hover:scale-125 transition-transform"></div>
                <div className="relative bg-white rounded-[4rem] overflow-hidden shadow-2xl border-4 border-gray-50 transform group-hover:-rotate-2 transition-transform">
                   <img src="https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/oiaa2gdldtypwevu8qs6.jpg" alt="Kết quả phục hồi rễ" className="w-full h-full object-cover" />
                   <div className="absolute top-8 left-8 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">KẾT QUẢ THỰC TẾ</div>
                </div>
             </div>
             
             <div className="space-y-10">
                {[
                  { icon: Zap, title: "Đất tơi xốp sau 1 lần bón", desc: "Không cần cày xới, Sicobi tự động len lỏi vào các khe hở của đất để làm tơi xốp." },
                  { icon: TrendingUp, title: "Rễ tơ bung trắng xóa", desc: "Kích thích sinh trưởng tự nhiên, rễ ra đến đâu đất tơi đến đó, hút phân cực mạnh." },
                  { icon: ShieldCheck, title: "Sạch 99.99%, An Toàn Tuyệt Đối", desc: "Không chứa kim loại nặng như Chì, Asen. Bà con yên tâm bón tay không không lo độc hại." },
                  { icon: Award, text: "Chuẩn EU/JAPAN", desc: "Nguồn nguyên liệu hữu cơ thực phẩm tái chế cao cấp nhất thị trường." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-8 group">
                     <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                        {item.icon && <item.icon size={28} />}
                        {item.text && <Star size={28} />}
                     </div>
                     <div>
                        <h4 className="text-2xl font-black text-gray-900 mb-3 uppercase italic tracking-tighter">{item.title || "Chất lượng vượt trội"}</h4>
                        <p className="text-gray-500 text-lg font-medium leading-relaxed">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 5. SOCIAL PROOF - THE TRUST */}
      <section className="py-24 md:py-40 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter mb-8 leading-[0.95]">Nhà vườn nói về Sicobi</h2>
              <div className="flex justify-center gap-1 text-amber-400 mb-6">
                 {[1,2,3,4,5].map(i => <Star key={i} size={32} fill="currentColor" />)}
              </div>
              <p className="text-gray-500 text-xl font-bold italic">"Đã có hơn 15.000 vườn sầu riêng, cà phê tại Tây Nguyên hồi sinh rễ nhờ Sicobi"</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                { name: "Chú Bảy (Đắk Lắk)", text: "Đất vườn chú hồi xưa cứng như đá, bón NPK trôi hết. Dùng Sicobi lót được 2 bao thấy đất tơi hẳn, bới nhẹ thấy rễ trắng ra quá trời.", crop: "Vườn Sầu Riêng 5 năm" },
                { name: "Anh Hoàng (Lâm Đồng)", text: "Sicobi này sạch, không hôi thối như mấy loại phân chuồng chưa ủ. Bón vô cây cà phê lá xanh đậm, bền màu lắm.", crop: "Vườn Cà Phê" },
                { name: "Chị Thảo (Gia Lai)", text: "Mới đầu cũng lo, sau dùng thử thấy rễ ra mạnh quá nên tin luôn. Giờ cứ định kỳ 3 tháng chị bón Sicobi 1 lần cho xốp đất.", crop: "Vườn Hồ Tiêu" }
              ].map((testi, i) => (
                <div key={i} className="bg-white p-12 rounded-[4rem] shadow-xl shadow-gray-200/50 border border-white relative">
                   <div className="text-emerald-500 mb-8"><Star size={24} fill="currentColor" /></div>
                   <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10 italic">"{testi.text}"</p>
                   <div className="flex items-center gap-5 pt-8 border-t border-gray-100">
                      <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-xl">👨‍🌾</div>
                      <div>
                         <h5 className="font-black text-gray-900 uppercase italic text-sm">{testi.name}</h5>
                         <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">{testi.crop}</span>
                      </div>
                   </div>
                   <div className="absolute -top-6 -right-6 text-6xl opacity-[0.05] select-none">💬</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. HOW TO USE - THE SIMPLICITY */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-4">
           <div className="max-w-5xl mx-auto">
              <div className="bg-[#0d2a1c] rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-3xl">
                 <div className="absolute top-0 right-0 p-16 opacity-[0.03] text-[200px] font-black italic">STEP</div>
                 <div className="relative z-10">
                    <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter mb-16 text-center">Cách dùng cực kỳ đơn giản</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                       {[
                         { step: "01", title: "Bón lót/định kỳ", text: "Rải quanh tán cây 3-5kg/gốc tùy độ tuổi cây." },
                         { step: "02", title: "Tưới nước", text: "Tưới đẫm nước để hữu cơ tan và len lỏi vào đất." },
                         { step: "03", title: "Quan sát", text: "Sau 15-20 ngày bới nhẹ lớp đất mặt xem rễ mới." }
                       ].map((item, i) => (
                         <div key={i} className="text-center">
                            <div className="text-emerald-400 font-black text-5xl mb-6 italic opacity-50">#{item.step}</div>
                            <h5 className="text-xl font-black mb-4 uppercase italic tracking-tighter">{item.title}</h5>
                            <p className="text-emerald-100/60 font-medium">{item.text}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 7. FAQ - THE REASSURANCE */}
      <section className="py-24 md:py-40 bg-gray-50">
         <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-3xl md:text-5xl font-black text-center text-gray-900 uppercase italic tracking-tighter mb-20">Câu hỏi bà con hay hỏi</h3>
            <div className="space-y-6">
               {[
                 { q: "Sicobi có làm cháy rễ nếu bón quá liều không?", a: "Dạ không anh nhé! Sicobi là hữu cơ thực phẩm sạch 99.99%, đã được ủ chín hoàn toàn nên cực kỳ mát rễ. Anh bón nhiều hơn chút rễ càng ra mạnh, không lo cháy như phân hóa học." },
                 { q: "Vườn đang bị vàng lá thối rễ có dùng được không?", a: "Đây là giải pháp số 1 luôn ạ! Sicobi giúp làm tơi xốp đất, đẩy nước đọng ra ngoài và kích thích rễ mới phục hồi cực nhanh sau khi đã xử lý thuốc bệnh." },
                 { q: "Mua bao nhiêu thì được miễn phí giao hàng?", a: "Bên em có chính sách hỗ trợ vận chuyển linh hoạt tùy khu vực. Anh cứ để lại thông tin, đội ngũ PBGT sẽ gọi lại báo giá và phí ship tốt nhất cho vườn mình ạ!" }
               ].map((faq, i) => (
                 <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm group hover:shadow-xl transition-all">
                    <div className="flex gap-6 items-start">
                       <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center flex-shrink-0 font-black">Q</div>
                       <div>
                          <h5 className="font-black text-gray-900 mb-4 text-xl leading-tight">"{faq.q}"</h5>
                          <p className="text-gray-600 font-medium leading-relaxed text-lg italic">"Dạ, {faq.a}"</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 8. FINAL CTA - THE CLOSER */}
      <section id="order-form" className="py-24 md:py-40 bg-emerald-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto bg-white rounded-[4.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col lg:flex-row">
             <div className="lg:w-[42%] bg-[#0d2a1c] p-12 md:p-20 text-white flex flex-col justify-center">
                <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.4em] mb-8 block">Đăng ký ngay hôm nay</span>
                <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.95] mb-10">
                   Nhận Báo Giá <br /> 
                   <span className="text-emerald-400">& Ưu Đãi</span> <br/>
                   Từ PBGT
                </h3>
                
                <div className="space-y-6 mb-12">
                   {[
                     "Kiểm tra pH đất tại vườn MIỄN PHÍ",
                     "Tư vấn quy trình phục hồi cây suy",
                     "Giao hàng tận nơi - Kiểm hàng rồi mới trả tiền"
                   ].map((text, i) => (
                     <div key={i} className="flex items-center gap-4 font-bold text-lg">
                        <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] text-white">✓</div>
                        {text}
                     </div>
                   ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-6">
                   <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-3xl">📦</div>
                   <div>
                      <p className="text-emerald-300 text-xs font-black uppercase tracking-widest mb-1">Quy cách bao đóng gói:</p>
                      <p className="text-white font-black text-xl italic uppercase tracking-tighter">Bao 50KG - Siêu Tiết Kiệm</p>
                   </div>
                </div>
             </div>

             <div className="flex-1 p-12 md:p-20 bg-white">
                <div className="mb-12">
                   <h4 className="text-2xl md:text-3xl font-black text-gray-900 uppercase italic tracking-tighter mb-4">Để lại thông tin vườn của anh chị:</h4>
                   <p className="text-gray-500 font-medium">Đội ngũ kỹ thuật PBGT sẽ gọi lại ngay để tư vấn giải pháp chuẩn nhất cho vườn nhà mình.</p>
                </div>
                <LeadForm initialPathology="Cải tạo đất chuyên sâu" initialCrop="Sầu riêng" />
                <div className="mt-8 flex items-center justify-center gap-3 text-xs text-gray-400 font-bold uppercase tracking-widest">
                   <ShieldCheck size={14} /> Bảo mật thông tin nhà vườn 100%
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER & TRUST */}
      <footer className="py-20 bg-[#0d2a1c] border-t border-white/5">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center md:text-left">
              <div>
                 <h5 className="text-white font-black uppercase italic tracking-tighter mb-6">Liên hệ trực tiếp</h5>
                 <p className="text-emerald-100/50 text-sm font-medium mb-2">Đội ngũ PBGT trực tuyến 24/7</p>
                 <a href="tel:0773440966" className="text-2xl font-black text-emerald-400">0773.440.966</a>
              </div>
              <div>
                 <h5 className="text-white font-black uppercase italic tracking-tighter mb-6">Văn phòng hỗ trợ</h5>
                 <p className="text-emerald-100/50 text-sm font-medium leading-relaxed">
                    Khu vực Tây Nguyên: Đắk Lắk, Lâm Đồng, Gia Lai, Đắk Nông. <br/>
                    Giao hàng hỏa tốc toàn quốc.
                 </p>
              </div>
              <div className="flex flex-col items-center md:items-end justify-center">
                 <div className="flex gap-4">
                    <a href="https://zalo.me/0773440966" className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all"><MessageCircle size={20} className="text-emerald-400" /></a>
                    <a href="tel:0773440966" className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all"><Phone size={20} className="text-emerald-400" /></a>
                 </div>
              </div>
           </div>
           
           <div className="pt-12 border-t border-white/5 text-center">
              <div className="inline-flex items-center gap-3 mb-6 opacity-30">
                 <Leaf size={24} className="text-emerald-400" />
                 <span className="text-white font-black uppercase tracking-[0.5em] text-[10px]">Phan Bón Giá Tốt</span>
              </div>
              <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em]">© 2026 PHAN BÓN GIÁ TỐT - ĐỐI TÁC CHIẾN LƯỢC CỦA FUVICO VIỆT NAM</p>
           </div>
        </div>
      </footer>

      {/* ADDITIONAL ELITE STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-10px) rotate(-6deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
        .shadow-3xl {
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.4);
        }
      `}} />
    </div>
  );
}
