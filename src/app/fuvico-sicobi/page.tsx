import React from 'react';
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
  Search,
  Activity,
  Award,
  ChevronRight
} from "lucide-react";
import LeadForm from "@/components/shared/LeadForm";
import SchemaMarkup from "@/components/shared/SchemaMarkup";
import { 
  DiagnosticSection, 
  RecoveryTimeline, 
  PerformanceCTA,
  ProductTrustBadges,
  ExpertAdvice
} from "@/components/product/LandingBlocks";

export default function SicobiPerformanceLanding() {
  const landingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Fuvico Sicobi 20% OM - Giải pháp phục hồi đất chai cứng",
    "image": "https://res.cloudinary.com/dztidbkhv/image/upload/v1740375836/phanbongiatot/sicobi-50kg.png",
    "description": "Mở khóa đất chai cứng, phục hồi rễ tơ thần tốc và tăng cường hấp thụ phân bón.",
    "brand": { "@type": "Brand", "name": "PBGT" },
    "offers": {
      "@type": "Offer",
      "url": "https://www.phanbongiatot.com/fuvico-sicobi",
      "priceCurrency": "VND",
      "price": "0",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="bg-[#fcfdfc] min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <SchemaMarkup data={landingSchema} />
      
      {/* 1. ELITE STICKY CTA (MOBILE) */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <a href="#order-form" className="flex-[1.5] bg-[#f5a623] text-white flex flex-col items-center justify-center py-3 rounded-2xl font-black uppercase shadow-lg active:scale-95 transition-all">
          <span className="text-[10px] opacity-80 italic">Cấp cứu vườn suy</span>
          <span className="text-xs">NHẬN PHÁC ĐỒ NGAY</span>
        </a>
        <a href="https://zalo.me/0773440966" className="flex-1 bg-[#0068FF] text-white flex items-center justify-center py-3 rounded-2xl font-black uppercase shadow-lg active:scale-95 transition-all">
          <MessageCircle size={18} className="mr-2" /> ZALO
        </a>
      </div>

      {/* 2. HERO SECTION - EMOTIONAL & CLEAR */}
      <section className="relative pt-24 pb-16 md:pt-48 md:pb-40 overflow-hidden bg-[#0d2a1c]">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center lg:text-left flex flex-col lg:flex-row items-center gap-12 md:gap-20">
            <div className="flex-[1.3]">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
                <div className="flex text-amber-400">
                  {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                </div>
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest italic">15.000+ Nhà vườn đã hồi sinh đất thành công</span>
              </div>
              
              <h1 className="text-[32px] md:text-8xl font-black text-white leading-tight mb-6 md:mb-10 tracking-tighter">
                ĐẤT <span className="text-emerald-400 italic">MỞ KHÓA</span> <br /> 
                RỄ <span className="text-[#f5a623]">BUNG TRẮNG</span>
              </h1>
              
              <p className="text-emerald-100/80 text-base md:text-2xl mb-8 md:mb-12 leading-relaxed font-medium italic">
                "Bón phân mãi mà cây vẫn vàng, rễ không ra? <br className="hidden md:block"/>
                Do đất đã 'bị khóa'. Sicobi giúp mở cấu trúc đất, kích rễ tơ thần tốc sau 7 ngày."
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#order-form" className="bg-[#f5a623] hover:bg-[#fbb940] text-white px-8 md:px-16 py-5 md:py-8 rounded-2xl md:rounded-[3rem] font-black uppercase tracking-widest text-xs md:text-xl shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
                  ĐĂNG KÝ TƯ VẤN NGAY <ArrowRight size={24} />
                </a>
              </div>
            </div>

            <div className="flex-1 relative group">
               <img 
                src="/images/products/photo_6332526088357088944_y.jpg" 
                alt="Sicobi 50kg" 
                className="w-full max-w-[280px] md:max-w-md mx-auto rounded-[2rem] shadow-2xl group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIAGNOSTIC EXPERIENCE - THE MOST IMPORTANT UPGRADE */}
      <section className="py-2 md:py-32 bg-white relative">
        <div className="w-full max-w-6xl mx-auto">
          <DiagnosticSection items={[
            { 
              symptom: "Đất chai cứng, nén chặt như đá", 
              root_cause: "Lạm dụng phân hóa học lâu ngày làm mất cấu trúc keo đất, vi sinh vật chết sạch." 
            },
            { 
              symptom: "Bón phân nhưng cây không ăn, lá vẫn vàng", 
              root_cause: "Đất bị 'khóa' dinh dưỡng. Rễ tơ thối đen, không có khả năng hút đạm, lân, kali." 
            },
            { 
              symptom: "Tưới nước không thấm, chảy tràn bề mặt", 
              root_cause: "Đất mất độ xốp, rễ cây bị 'ngạt thở', thiếu oxy trầm trọng gây chết rễ tơ." 
            }
          ]} />
          
          <div className="mt-2 md:mt-24 px-1 md:px-0">
             <ExpertAdvice advice="Bà con thường lầm tưởng cây vàng là thiếu phân nên bón thêm phân hóa học. Nhưng thực tế là đất đang bị 'bội thực', rễ đang bị 'bỏng'. Muốn cứu cây, việc đầu tiên phải là MỞ ĐẤT và GIẢI ĐỘC RỄ." />
          </div>
        </div>
      </section>

      {/* 4. RECOVERY TIMELINE - AUTHORITY & PROOF */}
      <section className="py-12 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
           <RecoveryTimeline steps={[
             { day: "Ngày 1-3", icon: "💧 Giải Độc", effect: "Sicobi phân giải muối tồn dư, mở cấu trúc keo đất, giúp đất bắt đầu 'thở' trở lại." },
             { day: "Ngày 4-7", icon: "🌱 Kích Rễ", effect: "Kích thích hormone sinh trưởng tự nhiên, rễ tơ nhú trắng xóa, bám chắc vào đất mới." },
             { day: "Ngày 10-15", icon: "🌳 Hồi Sinh", effect: "Cây bắt đầu đi đọt non xanh mướt, lá bóng mượt, khả năng hấp thụ phân tăng 300%." }
           ]} />
        </div>
      </section>

      {/* 5. SCIENTIFIC AUTHORITY SECTION */}
      <section className="py-12 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
              <div className="flex-1 space-y-8 md:space-y-12">
                 <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.95]">
                   Cơ chế <span className="text-emerald-600">MỞ KHÓA</span> <br/>
                   Độc quyền từ Fuvico
                 </h2>
                 <div className="space-y-6">
                    {[
                      { title: "Hoạt hóa Keo Đất", text: "Phá vỡ liên kết nén chặt của đất hóa học, tạo khe hở cho nước và oxy len lỏi." },
                      { title: "Cân bằng pH nội vùng", text: "Đưa pH về mức lý tưởng 5.5 - 6.5 để rễ cây hoạt động mạnh nhất." },
                      { title: "Nhân sinh khối Vi sinh", text: "Cung cấp nguồn hữu cơ 20% OM cực nhanh để hệ vi sinh vật bản địa bùng phát." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 group">
                         <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                            <CheckCircle2 size={24} />
                         </div>
                         <div>
                            <h4 className="text-xl font-black text-gray-900 mb-2 uppercase italic tracking-tight">{item.title}</h4>
                            <p className="text-gray-500 font-medium leading-relaxed">{item.text}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="flex-1 relative">
                 <div className="aspect-square bg-emerald-900 rounded-[4rem] flex items-center justify-center p-12 overflow-hidden shadow-2xl">
                    <img 
                      src="https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/soil-micro-science.jpg" 
                      className="w-full h-full object-cover rounded-3xl opacity-60" 
                      alt="Cấu trúc đất"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                       <Award size={64} className="text-[#f5a623] mb-6 animate-pulse" />
                       <p className="text-white font-black text-2xl uppercase italic tracking-widest leading-tight">Chứng chỉ <br/> Sinh Học An Toàn</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. TRUST STACKING - REAL VOICES */}
      <section className="py-12 md:py-32 bg-gray-50">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-emerald-600 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 block">Chứng thực từ vườn thực tế</span>
               <h2 className="text-2xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter leading-tight">Bà con nói gì về Sicobi?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
               {[
                 { name: "Anh Hoàng (Bảo Lộc)", crop: "Vườn Sầu Riêng", text: "Đất vườn tôi trước chai như đá, tưới nước trôi tuồn tuột. Xử lý Sicobi được 10 ngày, đất xốp hẳn, rễ tơ nhú trắng xóa thấy ham luôn." },
                 { name: "Chú Sáu (Cái Bè)", crop: "Vườn Mít Thái", text: "Cây mít bị vàng lá cả năm không hết, bón phân hóa học càng bón càng suy. Từ hồi dùng Sicobi này cây hồi tỉnh, đọt vươn mạnh lắm." },
                 { name: "Chị Mai (Gia Lai)", crop: "Vườn Cà Phê", text: "Tôi dùng Sicobi để phục hồi sau thu hoạch. Cây hồi sức nhanh, lá xanh dày, năm nay đậu trái rất đạt." }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-8 md:p-12 rounded-[3rem] border border-white shadow-xl shadow-gray-200/40 relative group">
                    <div className="text-amber-400 flex gap-1 mb-6">
                       {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-600 font-medium italic leading-relaxed text-sm md:text-lg mb-8">"{item.text}"</p>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-lg">👨‍🌾</div>
                       <div>
                          <h5 className="font-black text-gray-900 uppercase italic text-xs">{item.name}</h5>
                          <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">{item.crop}</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. PERFORMANCE CTA - THE FINAL PUSH */}
      <section className="py-12 md:py-32 bg-white">
         <div className="container mx-auto px-4 max-w-5xl">
            <PerformanceCTA 
               title="Đừng để vườn suy kiệt thêm 1 ngày nào nữa!"
               sub="Để lại thông tin, đội ngũ Kỹ sư PBGT sẽ gọi điện tư vấn giải pháp 'Mở Đất - Kích Rễ' chuẩn xác nhất cho tình trạng vườn của bà con."
               btnText="ĐĂNG KÝ TƯ VẤN NGAY"
               href="#order-form"
            />
         </div>
      </section>

      {/* 8. ORDER FORM - CONVERSION HUB */}
      <section id="order-form" className="py-12 md:py-32 bg-[#0d2a1c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto bg-white rounded-[3rem] md:rounded-[4.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
             <div className="lg:w-[45%] bg-[#0d2a1c] p-8 md:p-20 text-white flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-emerald-900">
                <span className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Chương trình hỗ trợ kỹ thuật</span>
                <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter leading-tight mb-8 md:mb-12">
                   Gửi thông tin <br /> 
                   <span className="text-[#f5a623]">Kỹ sư hỗ trợ</span> <br/>
                   Tận vườn
                </h3>
                
                <div className="space-y-6 md:space-y-8">
                   {[
                     "Phân tích tình trạng đất chai cứng miễn phí",
                     "Phác đồ kích rễ tơ sau 7 ngày",
                     "Hướng dẫn bón phân tiết kiệm 30% chi phí"
                   ].map((text, i) => (
                     <div key={i} className="flex items-center gap-4 font-bold text-sm md:text-xl leading-tight">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">✓</div>
                        {text}
                     </div>
                   ))}
                </div>
                
                <div className="mt-12 md:mt-20 flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                   <div className="text-4xl">🚚</div>
                   <div>
                      <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1">Hỗ trợ vận chuyển:</p>
                      <p className="text-white font-black text-sm md:text-lg uppercase italic tracking-tighter">Giao hàng tận vườn - Kiểm tra mới thanh toán</p>
                   </div>
                </div>
             </div>

             <div className="flex-1 p-4 md:p-20 bg-white">
                <div className="mb-6 md:mb-16 text-center lg:text-left">
                   <h4 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tighter mb-4">YÊU CẦU TƯ VẤN NGAY:</h4>
                   <p className="text-gray-500 font-medium text-xs md:text-lg italic px-4 md:px-0">Bà con vui lòng nhập đúng số điện thoại để kỹ thuật viên liên hệ hỗ trợ kịp thời.</p>
                </div>
                <LeadForm initialPathology="Phục hồi đất chai cứng & kích rễ" initialCrop="Sầu riêng" />
                <div className="mt-12 flex items-center justify-center gap-3 text-[9px] md:text-xs text-gray-400 font-black uppercase tracking-widest">
                   <ShieldCheck size={16} /> Thông tin được bảo mật bởi Phân Bón Giá Tốt
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER LIGHT */}
      <footer className="py-12 bg-white border-t border-gray-100 text-center">
         <div className="container mx-auto px-4">
            <div className="inline-flex items-center gap-2 mb-4 opacity-50">
               <Zap className="text-emerald-600" size={20} />
               <span className="text-gray-900 font-black uppercase tracking-[0.3em] text-xs">Phan Bón Giá Tốt</span>
            </div>
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">© 2026 FUVICO SICOBI BY PHAN BÓN GIÁ TỐT - GIẢI PHÁP NÔNG NGHIỆP THỰC CHIẾN</p>
         </div>
      </footer>
    </div>
  );
}
