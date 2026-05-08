"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  ArrowRight,
  MessageCircle,
  Phone
} from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SchemaMarkup from '@/components/shared/SchemaMarkup';

const faqData = [
  {
    id: "sau-rieng",
    category: "Sầu riêng",
    icon: "🌳",
    questions: [
      {
        q: "Tại sao sầu riêng bị rụng bông và trái non hàng loạt?",
        a: "Rụng bông và trái non thường do 3 nguyên nhân chính: sốc nhiệt/nước, mất cân bằng dinh dưỡng, hoặc nấm bệnh tấn công. Khi mưa quá nhiều hoặc nắng gắt đột ngột, cây bị sốc sinh lý. Bà con cần chú ý quản lý nước tưới ổn định, bổ sung Canxi-Bo để tăng sức sống hạt phấn và xịt thuốc nấm định kỳ.",
        link: "/giai-phap/vang-la-thoi-re",
        linkText: "Xem giải pháp rụng trái"
      },
      {
        q: "Sầu riêng vàng lá thối rễ mùa mưa chữa thế nào?",
        a: "Đây là bệnh do nấm Phytophthora và Fusarium gây ra khi đất bị úng nước. Bước đầu tiên là phải khơi rãnh thoát nước, sau đó dùng bộ đôi sát khuẩn rễ Phytopin và Nemano tưới đẫm vùng rễ. Sau 7 ngày rễ đã sạch nấm, mới tiến hành kích rễ bằng Humic K-Max.",
        link: "/giai-phap/vang-la-thoi-re",
        linkText: "Xem giải pháp điều trị"
      },
      {
        q: "Làm sao để sầu riêng ra bông đồng loạt?",
        a: "Bà con cần siết nước tạo khô hạn khoảng 10-15 ngày, kết hợp phun phân hóa mầm hoa giàu Lân và Kali. Khi thấy mắt cua sáng đều mới bắt đầu nhấp nước nhẹ trở lại.",
        link: "https://zalo.me/0339505050",
        linkText: "Nhắn PBGT hỗ trợ"
      }
    ]
  },
  {
    id: "ca-phe",
    category: "Cà phê",
    icon: "☕",
    questions: [
      {
        q: "Tại sao cà phê bị vàng lá mùa khô?",
        a: "Do thiếu nước và rễ bị nghẹt, hoặc rệp sáp rễ tấn công. Cần kết hợp tưới nước đủ và bón Humic để giữ ẩm đất, kích rễ sâu.",
        link: "/san-pham/humic-k-max",
        linkText: "Xem Humic K-Max"
      },
      {
        q: "Cách trị rệp sáp gốc cà phê sinh học?",
        a: "Sử dụng chế phẩm Nemano kết hợp nấm xanh nấm trắng. Tưới đẫm vào gốc khi đất đủ ẩm để thuốc len lỏi vào tổ rệp.",
        link: "/giai-phap/tuyen-trung-rep-sap-re-ca-phe",
        linkText: "Giải pháp trị rệp sáp"
      }
    ]
  },
  {
    id: "ho-tieu",
    category: "Hồ tiêu",
    icon: "🌿",
    questions: [
      {
        q: "Cách phòng bệnh chết nhanh trên hồ tiêu?",
        a: "Cần đảm bảo thoát nước tốt, bón vôi nâng pH và tưới nấm đối kháng Trichoderma định kỳ vào gốc cây.",
        link: "/giai-phap/chet-nhanh-chet-cham-ho-tieu",
        linkText: "Phòng trị chết nhanh"
      },
      {
        q: "Tiêu bị chết chậm xử lý như thế nào?",
        a: "Cần xử lý tuyến trùng bằng Nemano trước, sau đó sát khuẩn bằng Phytopin và cuối cùng là kích rễ lại bằng Humic.",
        link: "tel:0339505050",
        linkText: "Gọi Hotline hỗ trợ"
      }
    ]
  },
  {
    id: "phan-bon",
    category: "Phân bón & Đất",
    icon: "🧪",
    questions: [
      {
        q: "Phân Humic có tác dụng gì cho đất?",
        a: "Humic giúp làm xốp đất, giữ nước, giữ phân bón và kích thích rễ tơ phát phát triển. Giúp cây hấp thụ dinh dưỡng tốt hơn 30-50%.",
        link: "/san-pham/humic-k-max",
        linkText: "Tìm hiểu Humic K-Max"
      },
      {
        q: "Tại sao nên dùng phân sinh học thay hóa học?",
        a: "Phân sinh học bảo vệ đất, giúp cây khỏe từ gốc, ít sâu bệnh và cho chất lượng nông sản an toàn, giá cao hơn.",
        link: "/blog",
        linkText: "Đọc kiến thức nhà nông"
      }
    ]
  }
];

const FAQItem = ({ question, answer, link, linkText, index }: any) => {
  const [isOpen, setIsOpen] = useState(index === 0); // Open the first item by default
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-start gap-4 text-left group"
      >
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm transition-colors ${isOpen ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
          H
        </div>
        <div className="flex-1 pr-4">
          <h3 className={`font-black text-[15px] md:text-lg leading-tight transition-colors ${isOpen ? 'text-emerald-700' : 'text-gray-800 group-hover:text-emerald-600'}`}>
            {question}
          </h3>
        </div>
        <div className={`mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-700' : 'text-gray-300'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[800px] pb-6' : 'max-h-0'}`}>
        <div className="flex gap-4 pl-12 pr-4">
           <div className="flex-1">
              <div className="bg-gray-50 p-4 rounded-2xl relative">
                 <div className="absolute -left-2 top-4 w-4 h-4 bg-gray-50 rotate-45"></div>
                 <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 font-medium italic">
                    <span className="text-emerald-700 font-black not-italic mr-2">TRẢ LỜI:</span>
                    {answer}
                 </p>
                 {link && (
                    <Link href={link} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                       {linkText} <ArrowRight size={14} />
                    </Link>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(cat => cat.questions).map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a
      }
    }))
  };

  return (
    <div className="bg-white min-h-screen">
      <SchemaMarkup data={faqSchema} />
      
      <Breadcrumbs items={[{ label: 'Hỏi đáp kỹ thuật', href: '/hoi-dap-ky-thuat' }]} />

      {/* Hero Section - Optimized for compact view */}
      <section className="bg-gray-900 pt-10 md:pt-20 pb-20 md:pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <HelpCircle size={14} /> Thư viện hỏi đáp kỹ thuật
          </div>
          <h1 className="text-xl md:text-5xl font-black text-white mb-4 md:mb-8 uppercase tracking-tighter italic leading-[1.1]">
            Bà con hỏi, <br className="md:hidden" /> <span className="text-emerald-500">PBGT phản hồi</span>
          </h1>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm câu hỏi của bà con..."
              className="w-full bg-white/10 border border-white/20 rounded-xl md:rounded-2xl px-12 md:px-16 py-2.5 md:py-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition-all text-xs md:text-lg font-bold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* FAQ Content - Compact gaps */}
      <section className="py-6 md:py-20 -mt-8 md:-mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-12">
            {faqData.map((category, idx) => {
              const filteredQuestions = category.questions.filter(q => 
                q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
                q.a.toLowerCase().includes(searchTerm.toLowerCase())
              );

              if (filteredQuestions.length === 0) return null;

              return (
                <div key={idx} id={category.id} className="scroll-mt-32 bg-white rounded-xl md:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
                  <div className="bg-[#f0f9f1] px-5 md:px-8 py-3 md:py-4 border-b border-emerald-100 flex items-center gap-3 md:gap-4">
                    <span className="text-xl md:text-3xl">{category.icon}</span>
                    <h2 className="text-base md:text-xl font-black text-[#1b5e20] uppercase tracking-tight italic">
                      {category.category}
                    </h2>
                  </div>
                  <div className="px-4 md:px-8 divide-y divide-gray-100">
                    {filteredQuestions.map((item, qIdx) => (
                      <FAQItem 
                        key={qIdx} 
                        question={item.q} 
                        answer={item.a} 
                        link={item.link} 
                        linkText={item.linkText} 
                        index={qIdx}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* No Results */}
            {faqData.every(cat => cat.questions.filter(q => q.q.toLowerCase().includes(searchTerm.toLowerCase())).length === 0) && (
              <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-black text-gray-900 uppercase mb-2">Không tìm thấy câu hỏi phù hợp</h3>
                <p className="text-gray-500">Bà con có thể nhấn nút Zalo bên dưới để được chúng tôi tư vấn trực tiếp.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-emerald-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10 select-none text-[200px] rotate-12">?</div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 md:mb-6">Chưa tìm thấy câu trả lời?</h2>
              <p className="text-emerald-100 text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto font-medium">Đừng ngần ngại, đội ngũ Phan Bón Giá Tốt luôn sẵn sàng hỗ trợ bà con 24/7 hoàn toàn miễn phí.</p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <a href="https://zalo.me/0339505050" className="w-full md:w-auto bg-[#0068FF] hover:bg-blue-600 text-white font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl">
                  <MessageCircle fill="currentColor" /> Chat Zalo PBGT
                </a>
                <a href="tel:0339505050" className="w-full md:w-auto bg-white text-emerald-900 font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl">
                  <Phone /> Gọi: 0339.505.050
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
