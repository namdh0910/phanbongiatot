"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './FlashSale.css';

const FlashSale: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const difference = endOfDay.getTime() - now.getTime();
      
      if (difference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = [
    {
      slug: "rooti-4339",
      name: "Acti Rooti - Siêu Kích Rễ Cực Mạnh (Can 5L)",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop",
      oldPrice: "850.000đ",
      price: "680.000đ",
      discount: "-20%",
    },
    {
      slug: "nemano-9989",
      name: "Nemano - Đặc Trị Tuyến Trùng Bảo Vệ Rễ",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800&auto=format&fit=crop",
      oldPrice: "320.000đ",
      price: "255.000đ",
      discount: "-25%",
    },
    {
      slug: "amino-acid-7822",
      name: "Amino Acid - Vọt Đọt, Xanh Lá Cấp Tốc",
      image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=800&auto=format&fit=crop",
      oldPrice: "150.000đ",
      price: "99.000đ",
      discount: "-34%",
    },
    {
      slug: "combo-phuc-hoi-sau-thu-hoach",
      name: "Combo Phục Hồi Cây Suy - Sau Thu Hoạch",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
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
            <div key={product.slug} className="sale-card">
              <div className="discount-badge">{product.discount}</div>
              <div className="sale-image">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="sale-info">
                <h3 className="sale-name">{product.name}</h3>
                <div className="sale-prices">
                  <span className="price-current">{product.price}</span>
                  <span className="price-old">{product.oldPrice}</span>
                </div>
                <Link href={`/san-pham/${product.slug}`} className="buy-btn">
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
