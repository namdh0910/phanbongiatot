"use client";
import React from 'react';
import './SocialProof.css';

const farmerTestimonials = [
  {
    name: "Chú Năm Bình Phước",
    crop: "🌳 Vườn sầu riêng 5ha",
    content: "Dùng bộ kích rễ Acti Rooti bên mình thấy hiệu quả thiệt sự. Cây đâm tược mạnh, lá xanh mướt mà giá lại rẻ hơn đại lý gần nhà 20%.",
    avatar: "👨‍🌾"
  },
  {
    name: "Cô Tám Đắk Lắk",
    crop: "☕ 3 héc ta Cà phê Robusta",
    content: "Đã bón phân Bình Điền nhiều năm nhưng mua ở đây yên tâm nhất, giao tới tận nơi cho kiểm tra hàng mới trả tiền, rất tiện cho bà con.",
    avatar: "👩‍🌾"
  },
  {
    name: "Anh Ba Trình Gia Lai",
    crop: "🌿 Vườn Tiêu & Chanh dây",
    content: "Cái thuốc Nemano trị tuyến trùng hay thiệt, tưới vô 1 tuần là thấy rễ trắng xóa. Nhân viên tư vấn rất tận tâm, không chê vào đâu được.",
    avatar: "🧑‍🌾"
  },
  {
    name: "Bác Sáu Đồng Nai",
    crop: "🥭 Vườn Xoài & Bưởi da xanh",
    content: "Mới đầu cũng lo mua online, mà sau thấy uy tín quá nên đặt miết. Cây trái năm nay đậu đạt, năng suất tăng rõ rệt luôn.",
    avatar: "👴"
  }
];

const SocialProof: React.FC = () => {
  return (
    <section className="social-proof-section">
      <div className="sp-container">
        {/* STATS BAR */}
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">5.000+</span>
            <span className="stat-desc">Nhà vườn đã đặt hàng</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">63</span>
            <span className="stat-desc">Tỉnh thành giao hàng</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-desc">Kiểm tra trước khi nhận</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4.8★</span>
            <span className="stat-desc">Đánh giá trung bình</span>
          </div>
        </div>

        {/* TESTIMONIALS CAROUSEL */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-[#1a5c2a] uppercase">Bà con đã tin dùng</h2>
          <div className="w-16 h-1 bg-[#f5a623] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="testimonials-grid">
          {farmerTestimonials.map((item, index) => (
            <div key={index} className="testimonial-card">
              <div className="farmer-profile">
                <div className="farmer-avatar-img">
                  {item.avatar}
                </div>
                <div className="farmer-name-box">
                  <h4>{item.name}</h4>
                  <p className="farmer-crop">{item.crop}</p>
                </div>
              </div>
              <div className="testimonial-stars-sp">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text-sp">"{item.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
