"use client";
import React from 'react';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import './ComboSection.css';

const combos = [
  {
    title: "Combo Sầu Riêng Phục Hồi Sau Thu Hoạch",
    items: ["Phân bón Acti Rooti (5L)", "Nemano Tuyến Trùng", "Combi Gold"],
    retailPrice: 1450000,
    comboPrice: 1160000,
    tag: "Bán chạy nhất",
    image: "📦",
    benefit: "Giúp cây phục hồi nhanh sau thu hoạch, kích rễ cực mạnh."
  },
  {
    title: "Gói Cà Phê Năng Suất Vàng - Hạt Chắc Cành Khỏe",
    items: ["NPK Cao Cấp", "Kích ra hoa", "Chống rụng trái"],
    retailPrice: 980000,
    comboPrice: 784000,
    tag: "Phổ biến",
    image: "☕",
    benefit: "Tối ưu năng suất cà phê, hạt to chắc, cành khỏe."
  },
  {
    title: "Combo Đặc Trị Vàng Lá Thối Rễ Cấp Tốc",
    items: ["Nemano", "Bio Root", "Amino Acid"],
    retailPrice: 1100000,
    comboPrice: 880000,
    tag: "Mới",
    image: "🍃",
    benefit: "Giải pháp toàn diện cho cây bị vàng lá thối rễ."
  }
];

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') + 'đ';
};

const ComboSection: React.FC = () => {
  const settings = useSettings();
  const primaryColor = settings?.primaryColor || "#1a5c2a";

  return (
    <section className="combo-section" style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      <div className="combo-container">
        <div className="combo-header">
          <div 
            className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4"
            style={{ backgroundColor: `${primaryColor}1a`, color: primaryColor }}
          >
            Giải Pháp Tiết Kiệm
          </div>
          <h2 style={{ color: primaryColor }}>Gói Giải Pháp & Combo</h2>
          <p className="hidden md:block">Sự kết hợp hoàn hảo giúp bà con tiết kiệm chi phí và đạt hiệu quả tối ưu.</p>
        </div>

        <div className="combo-grid">
          {combos.map((combo, index) => {
            const discountPercent = Math.round((1 - combo.comboPrice / combo.retailPrice) * 100);
            return (
              <div key={index} className="combo-card">
                <div className="combo-tag">{combo.tag}</div>
                
                <div className="combo-card-inner">
                  <div className="combo-image-box">
                    <span className="combo-image-placeholder">{combo.image}</span>
                  </div>
                  
                  <div className="combo-info">
                    <h3 className="combo-title">{combo.title}</h3>
                    <div className="combo-discount-badge">Tiết kiệm {discountPercent}%</div>
                    
                    <div className="combo-items-list-box">
                      <p>Gồm: {combo.items.join(", ")}</p>
                    </div>

                    <div className="combo-pricing">
                      <span className="price-retail">Mua riêng: {formatPrice(combo.retailPrice)}</span>
                      <span className="price-combo">Mua combo: {formatPrice(combo.comboPrice)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout" className="combo-buy-btn">
                  ĐẶT MUA COMBO NGAY
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComboSection;

export default ComboSection;
