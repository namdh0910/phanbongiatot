import { Check, Droplets, Info, ChevronRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulvic Acid Đậm Đặc - Phục Hồi Rễ, Xanh Lá Siêu Tốc',
  description: 'Giải pháp phục hồi rễ, chống vàng lá, kích đọt non mập mạp cho sầu riêng, cà phê.',
};

export default function ProductSolutionPage() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen pb-24 font-sans">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/">Trang chủ</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/san-pham">Sản phẩm</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-green-700">Fulvic Acid Đậm Đặc</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-6 md:flex md:gap-8">
        
        {/* Cột Trái: Ảnh */}
        <div className="md:w-[45%] mb-6">
          <div className="bg-white aspect-square rounded-xl shadow-sm flex items-center justify-center text-gray-400 font-bold border-2 border-green-50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-white"></div>
            <span className="z-10 bg-white/80 px-4 py-2 rounded-lg shadow-sm">[Ảnh Sản Phẩm Thực Tế Tại Vườn]</span>
          </div>
          <div className="flex items-center gap-2 mt-4 justify-center">
             <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
             <span className="text-sm font-medium text-gray-600">Được 500+ nhà vườn tin dùng</span>
          </div>
        </div>

        {/* Cột Phải: Nội dung Giải pháp */}
        <div className="md:w-[55%]">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
            Fulvic Acid Hữu Cơ Đậm Đặc <br/>
            <span className="text-green-700">Phục Hồi Rễ, Xanh Lá Siêu Tốc</span>
          </h1>
          
          <div className="flex items-end gap-3 mb-6">
            <p className="text-[#ee4d2d] font-black text-3xl">185.000đ</p>
            <p className="text-sm text-gray-500 mb-1 font-medium">/ chai 500ml</p>
          </div>

          {/* Vấn đề được giải quyết */}
          <div className="bg-green-50 rounded-xl p-5 mb-6 border border-green-200 shadow-sm">
            <h3 className="font-bold text-green-800 mb-3 text-lg border-b border-green-200 pb-2">Sản phẩm này trị bệnh gì?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-800">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> 
                <span className="font-medium">Cây sầu riêng, cà phê bị suy sau thu hoạch, vàng lá, rụng trái sinh lý.</span>
              </li>
              <li className="flex items-start gap-2 text-gray-800">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> 
                <span className="font-medium">Rễ kém phát triển, bó rễ do bón nhiều phân hóa học.</span>
              </li>
              <li className="flex items-start gap-2 text-gray-800">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> 
                <span className="font-medium">Giúp kéo đọt mập, lá xanh bóng dầy cùi cực kỳ nhanh.</span>
              </li>
            </ul>
          </div>

          {/* Cách dùng thực tế */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-lg">
              <Droplets className="w-5 h-5 text-blue-500" /> Cách pha chuẩn (Dễ nhớ):
            </h3>
            <div className="bg-blue-50 p-4 rounded-xl font-medium text-blue-900 border border-blue-100 flex items-center gap-4">
              <div className="text-4xl">🛢️</div>
              <div>
                <strong className="block text-lg">Tưới gốc phục hồi:</strong>
                <p>1 chai 500ml pha vừa đủ 1 phuy 200 Lít nước.</p>
              </div>
            </div>
          </div>

          {/* Call To Action - Chốt Zalo */}
          <div className="flex flex-col gap-3">
            <div className="text-center text-sm font-bold text-gray-500 mb-1 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600"/> 100% Chính hãng - Kiểm tra hàng trước khi nhận
            </div>
            
            <a href="https://zalo.me/0773440966" target="_blank" rel="noopener noreferrer" className="w-full bg-blue-600 text-white font-black text-center py-4 rounded-xl shadow-lg active:bg-blue-700 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg">
              <span className="text-2xl">💬</span> Chat Zalo Đặt Hàng Ngay
            </a>
            
            <a href="tel:0773440966" className="w-full bg-white text-green-800 border-2 border-green-600 font-black text-center py-4 rounded-xl active:bg-gray-100 hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-lg">
              <span className="text-xl">📞</span> Gọi Kỹ Sư Tư Vấn (Miễn phí)
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}
