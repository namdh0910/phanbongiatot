"use client";
import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import './Testimonials.css';

const testimonials = [
  {
    name: "Chú Năm Hữu",
    location: "Cư M'gar, Đắk Lắk",
    crop: "Cà phê & Hồ tiêu",
    avatar: "H",
    content: "Hồi đầu năm vườn tiêu nhà tui bị vàng lá dữ quá, tưởng bỏ rồi. May có mấy chú kỹ sư bên Phân Bón Giá Tốt tư vấn dùng bộ Nemano với kích rễ. Nay rễ ra trắng xóa, lá xanh đậm trở lại rồi, mừng húm luôn bà con ơi!",
    stars: 5
  },
  {
    name: "Anh Ba Trình",
    location: "Long Khánh, Đồng Nai",
    crop: "Sầu riêng Ri6",
    avatar: "T",
    content: "Sầu riêng nhà tui năm nay đậu trái đạt lắm. Dùng đúng phác đồ nuôi trái bên mình mà trái nào trái nấy xanh gai, cơm vàng mướt. Mấy anh thương lái vô vườn khen quá trời, giá bán cũng được nhỉnh hơn mọi năm.",
    stars: 5
  },
  {
    name: "Bác Sáu Lộc",
    location: "Di Linh, Lâm Đồng",
    crop: "Cà phê Robusta",
    avatar: "L",
    content: "Làm nông mấy chục năm, tui sợ nhất là hàng giả. Mua bên Phân Bón Giá Tốt này thì yên tâm cái bụng, có giấy tờ đàng hoàng. Bón vô cây phát triển bền, đất tơi xốp hẳn ra, không còn bị chai cứng như hồi trước.",
    stars: 5
  },
  {
    name: "Chị Lan",
    location: "Cai Lậy, Tiền Giang",
    crop: "Mít Thái & Thanh long",
    avatar: "L",
    content: "Mít nhà em đợt rồi bị xơ đen nhiều, dùng thuốc bên mình tư vấn thấy cải thiện rõ rệt. Trái lớn đều, bóng da, bán được giá cao. Đội ngũ tư vấn rất nhiệt tình, gọi lúc nào cũng có mặt hỗ trợ kỹ thuật.",
    stars: 5
  },
  {
    name: "Chú Bảy Nghĩa",
    location: "Gia Nghĩa, Đắk Nông",
    crop: "Cà phê & Bơ",
    avatar: "N",
    content: "Đã bón qua nhiều loại nhưng tui ưng nhất là dòng Acti Rooti bên này. Kích rễ cực mạnh, cây hấp thụ phân bón tốt nên tiết kiệm được mớ tiền phân. Năng suất vườn năm nay tăng cũng được 20-30% đó.",
    stars: 5
  }
];

const Testimonials: React.FC = () => {
  const settings = useSettings();
  const primaryColor = settings?.primaryColor || "#1a5c2a";

  return (
    <section className="testimonial-section" style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      <div className="testimonial-container">
        <div className="testimonial-header">
          <div 
            className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4"
            style={{ backgroundColor: `${primaryColor}1a`, color: primaryColor }}
          >
            Tiếng Nói Nhà Nông
          </div>
          <h2>Bà Con Nói Gì Về Chúng Tôi?</h2>
          <p>Hàng ngàn vườn cây đã thay đổi diện mạo nhờ giải pháp từ Phân Bón Giá Tốt</p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <div key={index} className="testimonial-card">
              <span className="quote-icon">"</span>
              <div className="farmer-info">
                <div className="farmer-avatar" style={{ backgroundColor: primaryColor }}>
                  {item.avatar}
                </div>
                <div className="farmer-details">
                  <h3>{item.name}</h3>
                  <p>{item.location} - {item.crop}</p>
                </div>
              </div>
              
              <div className="testimonial-stars">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>

              <p className="testimonial-content">
                "{item.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
