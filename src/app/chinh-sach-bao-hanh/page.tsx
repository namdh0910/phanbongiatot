"use client";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function WarrantyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs items={[{ label: 'Chính sách bảo hành & Đổi trả' }]} />
        
        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 border-b border-gray-50 pb-6">
            Chính Sách Bảo Hành & Đổi Trả 🛡️
          </h1>

          <div className="prose prose-emerald max-w-none space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#1a5c2a] flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-sm">1</span>
                Cam kết chất lượng
              </h2>
              <p className="pl-10">
                Phân Bón Giá Tốt cam kết 100% sản phẩm được cung cấp là hàng <strong>chính hãng</strong>, đúng chủng loại và đúng mô tả kỹ thuật trên website. Chúng tôi nói không với hàng giả, hàng nhái, hàng kém chất lượng làm ảnh hưởng đến năng suất của bà con.
              </p>
            </section>

            <section className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
              <h2 className="text-xl font-bold text-orange-800 flex items-center gap-2 mb-4">
                <span className="text-2xl">🔄</span> Điều kiện đổi trả (Trong 3 ngày)
              </h2>
              <div className="space-y-4">
                <p className="font-medium text-orange-900">Quý khách được hỗ trợ đổi trả hoặc hoàn tiền 100% trong các trường hợp sau:</p>
                <ul className="list-disc pl-6 space-y-2 text-orange-800">
                  <li>Giao sai sản phẩm, sai kích cỡ, sai chủng loại so với đơn đặt hàng.</li>
                  <li>Sản phẩm bị lỗi bao bì, rò rỉ, vỡ hỏng trong quá trình vận chuyển.</li>
                  <li>Sản phẩm hết hạn sử dụng hoặc không đúng chất lượng như cam kết.</li>
                  <li>Hàng hóa không đúng mô tả trên website.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a5c2a] flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-sm">2</span>
                Trường hợp không áp dụng bảo hành
              </h2>
              <ul className="pl-10 list-disc space-y-2">
                <li>Sản phẩm đã qua sử dụng, nắp chai đã bị khui hoặc tem nhãn bị rách.</li>
                <li>Hư hỏng do lỗi bảo quản của khách hàng (để nơi ẩm ướt, ánh nắng trực tiếp...).</li>
                <li>Khách hàng tự làm hỏng hoặc sử dụng sai hướng dẫn kỹ thuật dẫn đến ảnh hưởng chất lượng.</li>
                <li>Quá thời hạn 03 ngày kể từ khi nhận hàng mà không có khiếu nại.</li>
              </ul>
            </section>

            <section className="border-2 border-dashed border-gray-200 p-8 rounded-3xl">
              <h2 className="text-xl font-bold text-gray-900 text-center mb-8 uppercase tracking-tight">Quy trình đổi trả 4 bước</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">📸</div>
                  <p className="text-xs font-black uppercase">B1: Chụp ảnh</p>
                  <p className="text-[10px] text-gray-500 mt-1">Chụp hiện trạng hàng bị lỗi/sai</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">📞</div>
                  <p className="text-xs font-black uppercase">B2: Liên hệ</p>
                  <p className="text-[10px] text-gray-500 mt-1">Gọi Hotline 0773.440.966</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">✅</div>
                  <p className="text-xs font-black uppercase">B3: Xác nhận</p>
                  <p className="text-[10px] text-gray-500 mt-1">Kỹ thuật viên xác nhận lỗi</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">💰</div>
                  <p className="text-xs font-black uppercase">B4: Hoàn tất</p>
                  <p className="text-[10px] text-gray-500 mt-1">Gửi hàng bù hoặc hoàn tiền</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 p-8 bg-emerald-900 rounded-[2rem] text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10">
                <h3 className="text-2xl font-black mb-4 uppercase italic">Quyền lợi của bà con là trên hết</h3>
                <p className="text-emerald-100 mb-0 font-medium">Chúng tôi luôn lắng nghe và giải quyết mọi khiếu nại của khách hàng dựa trên tinh thần hỗ trợ tối đa cho sản xuất nông nghiệp.</p>
             </div>
             <span className="absolute -bottom-10 -right-10 text-[150px] opacity-10 rotate-12 select-none">🛡️</span>
          </div>
        </article>
      </div>
    </div>
  );
}
