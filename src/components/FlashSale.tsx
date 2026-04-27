"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { API_BASE_URL } from '@/utils/api';
import './FlashSale.css';

const FlashSale: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [sales, setSales] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/flash-sales/active`);
        if (res.ok) {
          const data = await res.json();
          setSales(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSales();
  }, []);

  useEffect(() => {
    if (sales.length === 0) return;
    
    const endTime = Math.min(...sales.map(s => new Date(s.endAt).getTime()));

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = endTime - now;
      if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

      return {
        hours: Math.floor((difference / (1000 * 60 * 60))),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [sales]);

  if (isLoading || sales.length === 0) return null;

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
          {sales.map(sale => {
            const product = sale.product;
            const discount = Math.round((1 - sale.salePrice / product.originalPrice) * 100);
            return (
              <div key={sale._id} className="sale-card">
                <div className="discount-badge">-{discount}%</div>
                <div className="sale-image">
                  <img 
                    src={product.images?.[0] || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"} 
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
                    <span className="price-current">₫{sale.salePrice.toLocaleString()}</span>
                    <span className="price-old">₫{product.originalPrice?.toLocaleString()}</span>
                  </div>
                  <Link href={`/san-pham/${product.slug}`} className="buy-btn">
                    MUA NGAY
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
