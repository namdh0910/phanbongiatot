import Link from 'next/link';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sầu Riêng Vàng Lá Thối Rễ: Phác Đồ Điều Trị Dứt Điểm | Phân Bón Giá Tốt',
  description: 'Cách nhận biết và phác đồ 3 bước xử lý dứt điểm bệnh vàng lá thối rễ trên cây sầu riêng chi phí thấp, hiệu quả sau 7 ngày.',
};

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Trong thực tế, bạn sẽ fetch data từ Database dựa vào slug.
  // Ở đây chúng ta mockup nội dung cho bài mẫu.
  
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <article className="max-w-3xl mx-auto px-4 pb-24 pt-6 bg-white shadow-sm min-h-screen">
        
        {/* Tiêu đề đập vào mắt */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-green-900 mb-4 leading-tight">
          Sầu Riêng Vàng Lá Thối Rễ: Phác Đồ Điều Trị Dứt Điểm Cứu Vườn
        </h1>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 pb-4 border-b">
          <span>Kỹ sư Nông nghiệp tư vấn</span>
          <span>•</span>
          <span>Đã kiểm duyệt chuyên môn</span>
        </div>
        
        {/* Nhận diện triệu chứng */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-yellow-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            Vườn của bạn có đang bị thế này?
          </h2>
          <p className="text-gray-700 mb-4 text-base leading-relaxed">
            Lá vàng nhạt từ gân lá, rụng lác đác. Đào rễ lên thấy rễ tơ bị đen, tuột vỏ. Nếu có các dấu hiệu này, <strong>90% vườn nhà bạn đã dính nấm Phytophthora và Tuyến trùng.</strong>
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-200 h-32 md:h-48 rounded-lg flex items-center justify-center text-sm text-gray-500 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <span className="font-bold z-10 text-gray-600 bg-white/80 px-2 py-1 rounded">Ảnh thực tế lá vàng</span>
            </div>
            <div className="bg-gray-200 h-32 md:h-48 rounded-lg flex items-center justify-center text-sm text-gray-500 overflow-hidden relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <span className="font-bold z-10 text-gray-600 bg-white/80 px-2 py-1 rounded">Ảnh thực tế rễ đen</span>
            </div>
          </div>
        </section>

        {/* Giải phẫu nguyên nhân */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Nguyên nhân từ đâu?</h2>
          <p className="text-gray-700 leading-relaxed">
            Do mưa nhiều, nấm bệnh tích tụ trong đất tấn công thẳng vào rễ tơ khiến rễ bị thối đen. Cây không hút được nước và dinh dưỡng đưa lên lá, làm lá vàng và rụng. Việc bón phân hóa học lúc này <strong>chỉ làm cây chết nhanh hơn!</strong>
          </p>
        </section>

        {/* Phác đồ điều trị */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-[#1a5c2a] mb-4 border-b-2 border-green-500 pb-2 inline-block">
            Phác Đồ 3 Bước Xử Lý (Cứu Cây)
          </h2>
          
          <div className="space-y-4">
            {/* Bước 1 */}
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-black text-lg">1</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Cắt đứt mầm bệnh (Nấm & Tuyến trùng)</h3>
                <p className="text-gray-600 mb-3 text-sm md:text-base">Sử dụng bộ đôi Thuốc Tuyến Trùng kết hợp trị nấm tưới ướt đẫm vùng rễ quanh tán cây.</p>
                <div className="bg-gray-100 px-3 py-2 rounded text-sm font-mono flex items-center gap-2 border-l-4 border-blue-500">
                  <span>💧 <strong>Cách pha:</strong> 1 chai 500ml / 1 phuy 200L nước</span>
                </div>
              </div>
            </div>

            {/* Bước 2 */}
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-black text-lg">2</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Kích rễ tơ phát triển trở lại</h3>
                <p className="text-gray-600 mb-2 text-sm md:text-base">Tưới <Link href="/san-pham/fulvic-acid" className="text-blue-600 font-bold underline">Fulvic Acid Đậm Đặc</Link> sau khi xử lý nấm 3 ngày để bung rễ tơ trắng xóa.</p>
              </div>
            </div>

            {/* Bước 3 */}
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-black text-lg">3</div>
              <div>
                <h3 className="font-bold text-lg mb-1">Phục hồi cơi đọt (Trên lá)</h3>
                <p className="text-gray-600 mb-2 text-sm md:text-base">Phun Amino Acid + Vi lượng qua lá để kéo đọt non, giúp cây quang hợp mạnh mẽ trở lại.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Lời kêu gọi hành động (CTA) cực mạnh */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 md:p-8 text-center text-white shadow-xl mb-8">
          <h3 className="text-2xl font-black mb-3">Mỗi vườn một mức độ bệnh khác nhau!</h3>
          <p className="mb-6 text-green-50 text-base md:text-lg">Bà con đừng vội đi mua thuốc bừa bãi. Hãy chụp ảnh lá và gốc cây gửi qua Zalo, kỹ sư sẽ xem trực tiếp và tư vấn phác đồ chuẩn xác nhất.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://zalo.me/0773440966" target="_blank" rel="noopener noreferrer" className="bg-white text-green-800 font-black px-8 py-4 rounded-full text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-gray-100">
              <span className="text-2xl">💬</span> Gửi Ảnh Nhận Tư Vấn Zalo
            </a>
            <a href="tel:0773440966" className="bg-transparent border-2 border-white text-white font-black px-8 py-4 rounded-full text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-white/10">
              <span className="text-xl">📞</span> Gọi Kỹ Sư Ngay
            </a>
          </div>
        </section>

      </article>
    </div>
  );
}
