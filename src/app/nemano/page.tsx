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
  ChevronRight,
  Flame
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

export default function NemanoPerformanceLanding() {
  const landingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Nemano - Khắc tinh tuyến trùng sưng rễ",
    "image": "https://res.cloudinary.com/dztidbkhv/image/upload/v1740375836/phanbongiatot/nemano-7010.png",
    "description": "Đặc trị tuyến trùng, tiêu diệt trứng và phục hồi bộ rễ tơ trắng xóa.",
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
      
      {/* 1. ELITE STICKY CTA (MOBILE) */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <a href="#order-form" className="flex-[1.5] bg-red-600 text-white flex flex-col items-center justify-center py-3 rounded-2xl font-black uppercase shadow-lg active:scale-95 transition-all">
          <span className="text-[10px] opacity-80 italic">Diệt tận gốc tuyến trùng</span>
          <span className="text-xs">NHẬN PHÁC ĐỒ XỬ LÝ</span>
        </a>
        <a href="tel:0773440966" className="flex-1 bg-[#1a5c2a] text-white flex items-center justify-center py-3 rounded-2xl font-black uppercase shadow-lg active:scale-95 transition-all">
           GỌI NGAY
        </a>
      </div>

      {/* 2. HERO SECTION - EMOTIONAL & URGENT */}
      <section className="relative pt-24 pb-16 md:pt-48 md:pb-40 overflow-hidden bg-[#0d2a1c]">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500/10 rounded-full blur-[120px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center lg:text-left flex flex-col lg:flex-row items-center gap-12 md:gap-20">
            <div className="flex-[1.3]">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
                <Flame size={12} className="text-red-500 animate-pulse" />
                <span className="text-red-400 text-[10px] font-black uppercase tracking-widest italic">Cảnh báo: Tuyến trùng phá vườn - Xử lý ngay kẻo trễ</span>
              </div>
              
              <h1 className="text-[32px] md:text-8xl font-black text-white leading-tight mb-6 md:mb-10 tracking-tighter">
                NEMANO - <br /> 
                <span className="text-red-500 italic">"ÁN TỬ" CHO</span> <br />
                <span className="text-[#f5a623]">TUYẾN TRÙNG</span>
              </h1>
              
              <p className="text-emerald-100/80 text-base md:text-2xl mb-8 md:mb-12 leading-relaxed font-medium italic">
                "Rễ sưng cục, thối đen, bón phân cây không ăn? <br className="hidden md:block"/>
                Đó là giặc ngầm Tuyến trùng. Nemano tiêu diệt triệt để trứng và ấu trùng, hồi sinh rễ mới trắng xóa."
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#order-form" className="bg-red-600 hover:bg-red-700 text-white px-8 md:px-16 py-5 md:py-8 rounded-2xl md:rounded-[3rem] font-black uppercase tracking-widest text-xs md:text-xl shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
                  XỬ LÝ TUYẾN TRÙNG NGAY <ArrowRight size={24} />
                </a>
              </div>
            </div>

            <div className="flex-1 relative group">
               <img 
                src="https://res.cloudinary.com/dztidbkhv/image/upload/v1740375836/phanbongiatot/nemano-7010.png" 
                alt="Nemano" 
                className="w-full max-w-[280px] md:max-w-md mx-auto drop-shadow-[0_50px_100px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-red-500/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIAGNOSTIC EXPERIENCE */}
      <section className="py-12 md:py-32 bg-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <DiagnosticSection items={[
            { 
              symptom: "Rễ sưng cục, thối đầu rễ tơ", 
              root_cause: "Tuyến trùng tấn công làm rễ nổi u cục, không thể hút nước và dinh dưỡng, cây vàng lá còi cọc." 
            },
            { 
              symptom: "Lá vàng toàn bộ, bón phân không hiệu quả", 
              root_cause: "Vết thương do tuyến trùng tạo điều kiện cho nấm Phytophthora xâm nhập gây thối rễ chết nhanh." 
            },
            { 
              symptom: "Cây đứng sững, không ra đọt non", 
              root_cause: "Hệ thống 'miệng' của cây đã bị phá hủy hoàn toàn. Cần diệt tuyến trùng để phục hồi rễ mới." 
            }
          ]} />
          
          <div className="mt-12 md:mt-24">
             <ExpertAdvice advice="Tuyến trùng là 'giặc giấu mặt'. Nếu bà con chỉ trị nấm mà không diệt tuyến trùng thì cây sẽ tái phát liên tục sau mỗi trận mưa. Nemano là phác đồ cắt đứt chu kỳ sinh trưởng của chúng." />
          </div>
        </div>
      </section>

      {/* 4. RECOVERY TIMELINE */}
      <section className="py-12 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
           <RecoveryTimeline 
             title="Quy trình 3 tác động tiêu diệt tuyến trùng"
             sub="Không chỉ diệt, Nemano còn nuôi dưỡng và bảo vệ bộ rễ tơ mới."
             steps={[
               { day: "Ngày 1-2", icon: "⚔️ Tiêu diệt", effect: "Tấn công trực tiếp vào trứng và ấu trùng tuyến trùng trong đất, ngăn chặn sự lây lan." },
               { day: "Ngày 3-7", icon: "🩹 Phục hồi", effect: "Làm lành vết thương rễ, cung cấp vi lượng sinh học kích thích rễ tơ nhú trắng." },
               { day: "Ngày 10-15", icon: "🛡️ Bảo vệ", effect: "Thiết lập hệ vi sinh vật có lợi, tạo lá chắn ngăn chặn nấm bệnh tái xâm nhập." }
             ]} 
           />
        </div>
      </section>

      {/* 5. SCIENTIFIC AUTHORITY */}
      <section className="py-12 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
              <div className="flex-1 space-y-8 md:space-y-12">
                 <h2 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.95]">
                   Công nghệ <span className="text-red-600">ĐỘT PHÁ</span> <br/>
                   Diệt tận trứng
                 </h2>
                 <div className="space-y-6">
                    {[
                      { title: "Phá vỡ lớp vỏ trứng", text: "Enzyme đặc hiệu làm tan lớp màng bảo vệ trứng tuyến trùng, ngăn chặn lứa mới bùng phát." },
                      { title: "Tiêu diệt ấu trùng 48h", text: "Nồng độ vi sinh cao tấn công hệ thần kinh tuyến trùng ngay khi tiếp xúc." },
                      { title: "Hệ đệm phục hồi rễ", text: "Bổ sung hormone sinh trưởng tự nhiên giúp đầu rễ nhú trắng xóa, bám đất mạnh." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 group">
                         <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all">
                            <Zap size={24} />
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
                 <div className="aspect-square bg-[#0d2a1c] rounded-[4rem] flex items-center justify-center p-12 overflow-hidden shadow-2xl">
                    <img 
                      src="https://res.cloudinary.com/dztidbkhv/image/upload/v1776989061/phanbongiatot/nemano-micro-action.jpg" 
                      className="w-full h-full object-cover rounded-3xl opacity-60" 
                      alt="Cơ chế Nemano"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                       <Activity size={64} className="text-red-500 mb-6 animate-pulse" />
                       <p className="text-white font-black text-2xl uppercase italic tracking-widest leading-tight">Cơ chế <br/> SINH HỌC 100%</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. TRUST STACKING */}
      <section className="py-12 md:py-32 bg-gray-50">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 md:mb-24">
               <span className="text-red-600 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 block">Hiệu quả thực chiến tại vườn</span>
               <h2 className="text-2xl md:text-6xl font-black text-gray-900 uppercase italic tracking-tighter leading-tight">Nhà vườn đã cứu cây thành công</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
               {[
                 { name: "Anh Tâm (Krông Pắc)", crop: "Vườn Sầu Riêng", text: "Vườn sầu riêng 3 năm tuổi bị vàng lá, bới rễ thấy sưng như hạt đậu. Dùng Nemano được 2 lần rễ ra trắng, cơi đọt vươn mạnh lắm." },
                 { name: "Chú Năm (Lâm Đồng)", crop: "Vườn Cà Phê", text: "Nemano trị tuyến trùng hay thiệt. Trước đây bón phân hóa học mãi không hết sưng rễ, dùng cái này đất xốp mà rễ khỏe hẳn." },
                 { name: "Chị Huệ (Đắk Nông)", crop: "Vườn Hồ Tiêu", text: "Tiêu bị chết chậm, lá cứ rụng dần. Nhờ kỹ sư PBGT tư vấn Nemano mà cứu được vườn tiêu, năm nay trái đậu sai trĩu." }
               ].map((item, i) => (
                 <div key={i} className="bg-white p-8 md:p-12 rounded-[3rem] border border-white shadow-xl shadow-gray-200/40 relative group">
                    <div className="text-amber-400 flex gap-1 mb-6">
                       {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-gray-600 font-medium italic leading-relaxed text-sm md:text-lg mb-8">"{item.text}"</p>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-lg">👨‍🌾</div>
                       <div>
                          <h5 className="font-black text-gray-900 uppercase italic text-xs">{item.name}</h5>
                          <span className="text-red-600 font-bold text-[10px] uppercase tracking-widest">{item.crop}</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. PERFORMANCE CTA */}
      <section className="py-12 md:py-32 bg-white">
         <div className="container mx-auto px-4 max-w-5xl">
            <PerformanceCTA 
               title="Tiêu diệt Tuyến trùng - Bảo vệ vườn sầu"
               sub="Đừng để tuyến trùng âm thầm phá hủy tài sản của bà con. Nhận ngay phác đồ xử lý chuyên sâu từ đội ngũ kỹ sư giàu kinh nghiệm."
               btnText="NHẬN HƯỚNG DẪN XỬ LÝ NGAY"
               href="#order-form"
            />
         </div>
      </section>

      {/* 8. ORDER FORM */}
      <section id="order-form" className="py-12 md:py-32 bg-[#0d2a1c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto bg-white rounded-[3rem] md:rounded-[4.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
             <div className="lg:w-[45%] bg-[#0d2a1c] p-8 md:p-20 text-white flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-emerald-900">
                <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Hỗ trợ kỹ thuật 24/7</span>
                <h3 className="text-3xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.95] mb-8 md:mb-12">
                   Đăng ký <br /> 
                   <span className="text-red-500">Tư Vấn</span> <br/>
                   Xử Lý Vườn
                </h3>
                
                <div className="space-y-6 md:space-y-8">
                   {[
                     "Kiểm tra tình trạng rễ qua hình ảnh Zalo",
                     "Phác đồ diệt trứng & ấu trùng tuyến trùng",
                     "Kế hoạch phục hồi cơi đọt thần tốc"
                   ].map((text, i) => (
                     <div key={i} className="flex items-center gap-4 font-bold text-sm md:text-xl leading-tight text-emerald-100">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 text-white">✓</div>
                        {text}
                     </div>
                   ))}
                </div>
                
                <div className="mt-12 md:mt-20 flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
                   <div className="text-4xl">🔬</div>
                   <div>
                      <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-1">Công nghệ sinh học:</p>
                      <p className="text-white font-black text-sm md:text-lg uppercase italic tracking-tighter">Diệt giặc ngầm - Nâng tầm nông sản</p>
                   </div>
                </div>
             </div>

             <div className="flex-1 p-8 md:p-20 bg-white">
                <div className="mb-10 md:mb-16">
                   <h4 className="text-2xl md:text-4xl font-black text-gray-900 uppercase italic tracking-tighter mb-4">Nhận tư vấn ngay:</h4>
                   <p className="text-gray-500 font-medium text-sm md:text-lg italic">Bà con vui lòng để lại số điện thoại chính xác để kỹ sư liên hệ hỗ trợ phác đồ tốt nhất.</p>
                </div>
                <LeadForm initialPathology="Đặc trị tuyến trùng sưng rễ" initialCrop="Sầu riêng" />
                <div className="mt-12 flex items-center justify-center gap-3 text-[9px] md:text-xs text-gray-400 font-black uppercase tracking-widest">
                   <ShieldCheck size={16} /> Tuyệt đối bảo mật thông tin nhà vườn
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="py-12 bg-white border-t border-gray-100 text-center">
         <div className="container mx-auto px-4">
            <div className="inline-flex items-center gap-2 mb-4 opacity-50">
               <Flame className="text-red-600" size={20} />
               <span className="text-gray-900 font-black uppercase tracking-[0.3em] text-xs">Phan Bón Giá Tốt</span>
            </div>
            <p className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">© 2026 NEMANO BY PHAN BÓN GIÁ TỐT - KHẮC TINH TUYẾN TRÙNG</p>
         </div>
      </footer>
    </div>
  );
}
