"use client";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ShippingPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs items={[{ label: 'Chính sách vận chuyển' }]} />
        
        <article className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 border-b border-gray-50 pb-6">
            Chính Sách Vận Chuyển 🚚
          </h1>

          <div className="prose prose-emerald max-w-none space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#1a5c2a] flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-sm">1</span>
                Phạm vi giao hàng
              </h2>
              <p className="pl-10">
                Phân Bón Giá Tốt hỗ trợ giao hàng toàn quốc thông qua các đơn vị vận chuyển uy tín như <strong>Bưu điện Việt Nam (VNPost)</strong>, <strong>Giao Hàng Nhanh (GHN)</strong>, và <strong>Viettel Post</strong>. Đảm bảo hàng hóa đến tận tay nhà vườn dù ở vùng sâu, vùng xa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a5c2a] flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-sm">2</span>
                Thời gian nhận hàng
              </h2>
              <ul className="pl-10 list-disc space-y-2">
                <li><strong>Khu vực Tây Nguyên & Tỉnh lân cận:</strong> 2 - 3 ngày làm việc.</li>
                <li><strong>Các tỉnh thành khác:</strong> 3 - 5 ngày làm việc.</li>
                <li><strong>Vùng sâu, vùng xa, hải đảo:</strong> 5 - 7 ngày làm việc.</li>
              </ul>
              <p className="pl-10 mt-4 text-sm italic text-gray-500">* Thời gian có thể thay đổi tùy thuộc vào điều kiện thời tiết hoặc các sự cố khách quan từ đơn vị vận chuyển.</p>
            </section>

            <section className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2 mb-4">
                <span className="text-2xl">💰</span> Phí vận chuyển
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                  <span className="font-bold">Đơn hàng từ 250.000đ</span>
                  <span className="text-emerald-600 font-black">MIỄN PHÍ SHIP</span>
                </div>
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                  <span className="font-bold">Đơn hàng dưới 250.000đ</span>
                  <span className="text-gray-700 font-black">30.000đ / đơn</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a5c2a] flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-sm">3</span>
                Kiểm tra hàng & Thanh toán (COD)
              </h2>
              <p className="pl-10">
                Chúng tôi áp dụng hình thức <strong>Thanh toán khi nhận hàng (COD)</strong>. Quý khách được quyền <strong>KIỂM TRA HÀNG</strong> trước khi thanh toán cho nhân viên bưu tá. Nếu hàng bị đổ vỡ, móp méo hoặc không đúng chủng loại, quý khách có quyền từ chối nhận hàng mà không mất bất kỳ chi phí nào.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a5c2a] flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-sm">4</span>
                Chính sách đổi trả nhanh
              </h2>
              <p className="pl-10">
                Trong vòng <strong>3 ngày</strong> kể từ khi nhận hàng, nếu phát hiện sản phẩm bị lỗi do nhà sản xuất hoặc giao sai mẫu mã, Phân Bón Giá Tốt sẽ hỗ trợ đổi trả hoặc gửi bù hàng hoàn toàn miễn phí.
              </p>
            </section>
          </div>

          <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <p className="font-bold text-gray-800 mb-2">Cần hỗ trợ gấp về vận chuyển?</p>
            <p className="text-sm text-gray-500 mb-4">Vui lòng gọi Hotline Kỹ thuật để được xử lý nhanh nhất</p>
            <a href="tel:0773440966" className="text-2xl font-black text-[#1a5c2a]">0773.440.966</a>
          </div>
        </article>
      </div>
    </div>
  );
}
