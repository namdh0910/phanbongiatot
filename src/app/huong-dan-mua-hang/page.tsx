"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

export default function BuyingGuide() {
  const steps = [
    {
      id: 1,
      title: "Chọn sản phẩm",
      desc: "Tham khảo các giải pháp phân bón, kích rễ phù hợp với vườn cây của anh/chị.",
      icon: "🔍"
    },
    {
      id: 2,
      title: "Thêm vào giỏ hàng",
      desc: "Kiểm tra số lượng, chọn nút 'Mua Ngay' hoặc 'Thêm vào giỏ' để tích lũy sản phẩm.",
      icon: "🛒"
    },
    {
      id: 3,
      title: "Điền địa chỉ",
      desc: "Cung cấp Tên, Số điện thoại và Địa chỉ chính xác để nhân viên bưu tá giao hàng tận nơi.",
      icon: "📍"
    },
    {
      id: 4,
      title: "Kiểm tra & Thanh toán",
      desc: "Nhận hàng, kiểm tra sản phẩm đúng mẫu mã rồi mới thanh toán tiền cho người giao hàng (COD).",
      icon: "📦"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumbs items={[{ label: 'Hướng dẫn mua hàng' }]} />
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase italic tracking-tight">
            Hướng Dẫn Mua Hàng ➜
          </h1>
          <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">
            Chỉ với 4 bước đơn giản, bà con có thể sở hữu ngay các giải pháp nông nghiệp chất lượng cao, giao tận vườn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-6 group-hover:bg-emerald-50 transition-colors">
                {step.icon}
              </div>
              <div className="w-8 h-8 bg-[#1a5c2a] text-white rounded-full flex items-center justify-center font-black text-sm mb-4 shadow-lg">
                {step.id}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-emerald-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase italic leading-tight">Mọi thắc mắc đã có kỹ sư lo!</h2>
                 <p className="text-emerald-100 text-lg mb-8 font-medium">Nếu bà con gặp khó khăn khi đặt hàng online, đừng ngần ngại gọi trực tiếp để kỹ thuật viên lên đơn giúp mình.</p>
                 <div className="flex flex-col sm:flex-row gap-4">
                    <a href="tel:0773440966" className="bg-[#f5a623] text-white px-8 py-4 rounded-2xl font-black text-lg text-center hover:bg-[#fbb940] transition-all shadow-xl shadow-green-900/40">
                       📞 GỌI 0773.440.966
                    </a>
                    <Link href="/san-pham" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-8 py-4 rounded-2xl font-black text-lg text-center hover:bg-white/20 transition-all">
                       MUA HÀNG NGAY ➜
                    </Link>
                 </div>
              </div>
              <div className="hidden lg:block relative">
                 <div className="absolute inset-0 bg-white/5 rounded-full animate-pulse"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop" 
                   alt="Nông dân" 
                   className="rounded-[2.5rem] shadow-2xl relative z-10 rotate-3 group-hover:rotate-0 transition-all"
                 />
              </div>
           </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
           <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
             <span className="text-2xl">❓</span> Câu hỏi thường gặp
           </h3>
           <div className="space-y-6">
              <div className="border-b border-gray-50 pb-4">
                 <p className="font-bold text-gray-800 mb-1">Tôi có cần đăng ký tài khoản không?</p>
                 <p className="text-sm text-gray-500">Dạ không cần, anh/chị có thể đặt hàng trực tiếp mà không cần đăng ký. Hệ thống sẽ tự động lưu thông tin cho lần sau.</p>
              </div>
              <div className="border-b border-gray-100 pb-4">
                 <p className="font-bold text-gray-800 mb-1">Thanh toán như thế nào?</p>
                 <p className="text-sm text-gray-500">Anh/chị chọn hình thức COD để nhận hàng, kiểm tra rồi mới trả tiền mặt cho nhân viên bưu tá.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
