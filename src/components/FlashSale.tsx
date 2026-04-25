"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './FlashSale.css';

const FlashSale: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
        
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = [
    {
      id: 1,
      name: "Acti Rooti - Siêu Kích Rễ Cực Mạnh (Can 5L)",
      image: "ROOTI",
      oldPrice: "850.000đ",
      price: "680.000đ",
      discount: "-20%",
    },
    {
      id: 2,
      name: "Nemano - Đặc Trị Tuyến Trùng Bảo Vệ Rễ",
      image: "NEMANO",
      oldPrice: "320.000đ",
      price: "255.000đ",
      discount: "-25%",
    },
    {
      id: 3,
      name: "Amino Acid - Vọt Đọt, Xanh Lá Cấp Tốc",
      image: "AMINO",
      oldPrice: "150.000đ",
      price: "99.000đ",
      discount: "-34%",
    },
    {
      id: 4,
      name: "Combo Phục Hồi Cây Suy - Sau Thu Hoạch",
      image: "COMBO",
      oldPrice: "1.200.000đ",
      price: "890.000đ",
      discount: "-26%",
    }
  ];

  return (
    <section className="flash-sale-section">
      <div className="flash-sale-container">
        <div className="flash-sale-header">
          <div className="flash-sale-title">
            <span className="flash-sale-icon">⚡</span>
            <h2>Deal Hot Hôm Nay</h2>
          </div>
          
          <div className="countdown-timer">
            <span>Kết thúc trong:</span>
            <div className="time-box">
              <span className="time-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="time-label">Giờ</span>
            </div>
            <div className="time-box">
              <span className="time-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="time-label">Phút</span>
            </div>
            <div className="time-box">
              <span className="time-value">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="time-label">Giây</span>
            </div>
          </div>
        </div>

        <div className="flash-sale-grid">
          {flashProducts.map(product => (
            <div key={product.id} className="sale-card">
              <div className="discount-badge">{product.discount}</div>
              <div className="sale-image">
                <span className="text-[10px] font-black text-gray-400">{product.image}</span>
              </div>
              <div className="sale-info">
                <h3 className="sale-name">{product.name}</h3>
                <div className="sale-prices">
                  <span className="price-current">{product.price}</span>
                  <span className="price-old">{product.oldPrice}</span>
                </div>
                <Link href={`/san-pham/${product.id}`} className="buy-btn">
                  MUA NGAY
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
