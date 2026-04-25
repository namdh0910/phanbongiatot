"use client";
import React from 'react';
import Link from 'next/link';
import './VendorLanding.css';

const VendorLanding: React.FC = () => {
  return (
    <div className="vendor-landing">
      {/* Hero Section */}
      <section className="vendor-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Kiếm Thêm Thu Nhập Ổn Định<br />Từ Mạng Lưới Nhà Nông
          </h1>
          <p className="text-xl md:text-2xl text-green-50 mb-10 max-w-3xl mx-auto font-medium">
            Trở thành đại lý Phân Bón Giá Tốt — nhập hàng giá gốc, bán giá thị trường.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link href="/kenh-nguoi-ban/dang-ky" className="bg-[#f5a623] text-white px-10 py-4 rounded-full font-black text-lg shadow-2xl hover:scale-105 transition-all">
              Đăng ký ngay — Miễn phí
            </Link>
            <a href="https://zalo.me/0773440966" target="_blank" className="bg-white text-[#1a5c2a] px-10 py-4 rounded-full font-black text-lg shadow-xl hover:bg-gray-50 transition-all border-2 border-transparent hover:border-white/20">
              Nhắn Zalo tư vấn
            </a>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 320"><path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar py-12 bg-white -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="stat-item text-center">
              <div className="text-3xl md:text-4xl font-black text-[#1a5c2a]">150+</div>
              <div className="text-sm text-gray-500 font-bold uppercase mt-1">Đại lý đang hoạt động</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-3xl md:text-4xl font-black text-[#1a5c2a]">63</div>
              <div className="text-sm text-gray-500 font-bold uppercase mt-1">Tỉnh thành phủ sóng</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-3xl md:text-4xl font-black text-[#f5a623]">15-25%</div>
              <div className="text-sm text-gray-500 font-bold uppercase mt-1">Chiết khấu giá lẻ</div>
            </div>
            <div className="stat-item text-center">
              <div className="text-3xl md:text-4xl font-black text-[#1a5c2a]">24h</div>
              <div className="text-sm text-gray-500 font-bold uppercase mt-1">Hỗ trợ kỹ thuật</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Lợi Ích Khi Trở Thành Đại Lý</h2>
            <div className="w-20 h-1.5 bg-[#f5a623] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="benefit-card bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-5xl mb-6">🏷️</div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Giá Gốc Từ Kho</h3>
              <p className="text-gray-600 leading-relaxed">
                Không qua trung gian, nhập hàng trực tiếp với mức chiết khấu cực cao từ 15-25% so với giá bán lẻ.
              </p>
            </div>
            <div className="benefit-card bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-5xl mb-6">📱</div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Hệ Thống Quản Lý</h3>
              <p className="text-gray-600 leading-relaxed">
                Sử dụng miễn phí hệ thống quản lý đơn hàng, tồn kho và doanh thu ngay trên điện thoại của bạn.
              </p>
            </div>
            <div className="benefit-card bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              <div className="text-5xl mb-6">👨‍🔬</div>
              <h3 className="text-xl font-black text-gray-900 mb-4">Kỹ Sư Đồng Hành</h3>
              <p className="text-gray-600 leading-relaxed">
                Đội ngũ kỹ sư hỗ trợ tư vấn kỹ thuật trực tiếp cho khách hàng của bạn 24/7, giúp bạn chốt đơn dễ dàng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Quy Trình Hợp Tác</h2>
            <p className="text-gray-500">Đơn giản, nhanh chóng và minh bạch</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
            <div className="hidden md:block absolute top-10 left-20 right-20 h-0.5 bg-gray-100 -z-10"></div>
            <div className="process-item flex-1 text-center group">
              <div className="w-20 h-20 bg-green-50 text-[#1a5c2a] rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 border-4 border-white shadow-lg group-hover:bg-[#1a5c2a] group-hover:text-white transition-all">1</div>
              <h4 className="font-black text-xl mb-2">Đăng ký</h4>
              <p className="text-gray-500 text-sm italic">Chỉ mất 5 phút</p>
            </div>
            <div className="process-item flex-1 text-center group">
              <div className="w-20 h-20 bg-green-50 text-[#1a5c2a] rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 border-4 border-white shadow-lg group-hover:bg-[#1a5c2a] group-hover:text-white transition-all">2</div>
              <h4 className="font-black text-xl mb-2">Được duyệt</h4>
              <p className="text-gray-500 text-sm italic">Xử lý trong 24-48h</p>
            </div>
            <div className="process-item flex-1 text-center group">
              <div className="w-20 h-20 bg-green-50 text-[#1a5c2a] rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6 border-4 border-white shadow-lg group-hover:bg-[#1a5c2a] group-hover:text-white transition-all">3</div>
              <h4 className="font-black text-xl mb-2">Bán hàng</h4>
              <p className="text-gray-500 text-sm italic">Bắt đầu kiếm thu nhập</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="case-studies py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Câu Chuyện Thành Công</h2>
            <p className="text-gray-400 italic">"Những đại lý đầu tiên cùng chúng tôi vươn xa"</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="case-card bg-gray-800 p-8 rounded-[2rem] border border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-3xl">👤</div>
                <div>
                  <h4 className="font-black text-xl">Anh Tuấn</h4>
                  <p className="text-green-400 font-bold text-sm">Đại lý Đắk Lắk</p>
                </div>
              </div>
              <p className="text-gray-300 italic mb-6 leading-relaxed">
                "Từ khi hợp tác với Phân Bón Giá Tốt, tôi có thêm trung bình 80 đơn mỗi tháng. Thu nhập thêm hơn 15 triệu giúp gia đình ổn định hơn rất nhiều."
              </p>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Hiệu quả: +15 triệu/tháng</div>
            </div>
            <div className="case-card bg-gray-800 p-8 rounded-[2rem] border border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-3xl">👩</div>
                <div>
                  <h4 className="font-black text-xl">Chị Hoa</h4>
                  <p className="text-green-400 font-bold text-sm">Cửa hàng Bình Phước</p>
                </div>
              </div>
              <p className="text-gray-300 italic mb-6 leading-relaxed">
                "Hệ thống phân bón sinh học ở đây rất tốt. Bà con tin dùng vì có kỹ sư hỗ trợ tận vườn. Tôi đã mở rộng được thêm dòng sản phẩm mới rất tiềm năng."
              </p>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Đánh giá: 5/5 ⭐</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Câu Hỏi Thường Gặp</h2>
          </div>
          <div className="space-y-6">
            <div className="faq-item p-6 bg-gray-50 rounded-3xl">
              <h4 className="font-black text-gray-900 mb-2">Phí đăng ký tham gia là bao nhiêu?</h4>
              <p className="text-gray-600">Hoàn toàn MIỄN PHÍ. Chúng tôi không thu bất kỳ khoản phí khởi tạo hay duy trì nào từ đại lý.</p>
            </div>
            <div className="faq-item p-6 bg-gray-50 rounded-3xl">
              <h4 className="font-black text-gray-900 mb-2">Mức chiết khấu cụ thể là bao nhiêu?</h4>
              <p className="text-gray-600">Tùy vào dòng sản phẩm và số lượng đơn hàng, mức chiết khấu dao động từ 15% đến 25% so với giá bán lẻ niêm yết.</p>
            </div>
            <div className="faq-item p-6 bg-gray-50 rounded-3xl">
              <h4 className="font-black text-gray-900 mb-2">Vấn đề giao hàng được xử lý như thế nào?</h4>
              <p className="text-gray-600">Hàng được xuất trực tiếp từ kho tổng và giao tận nơi qua các đơn vị vận chuyển uy tín (Viettel Post, GHTK). Đại lý chỉ cần lên đơn trên hệ thống.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta py-20 bg-gradient-to-br from-[#1a5c2a] to-[#123d1c] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-8">Sẵn Sàng Bắt Đầu Hành Trình?</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/kenh-nguoi-ban/dang-ky" className="bg-[#f5a623] text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:scale-105 transition-all">
              Đăng ký đại lý ngay
            </Link>
            <div className="text-xl font-bold">
              Hoặc gọi hỗ trợ: <a href="tel:0773440966" className="text-[#f5a623] underline">0773.440.966</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorLanding;
