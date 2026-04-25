"use client";
import React from 'react';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import './ComboSection.css';

const combos = [
  {
    title: "Combo Sầu Riêng Phục Hồi",
    items: ["Phân bón Acti Rooti (5L)", "Đặc trị Tuyến Trùng Nemano", "Vi lượng Combi Gold"],
    retailPrice: "1.450.000đ",
    comboPrice: "1.160.000đ",
    saveAmount: "Tiết kiệm 290k",
    discount: "-20%",
    benefit: "Giúp cây phục hồi nhanh sau thu hoạch, kích rễ cực mạnh và bảo vệ bộ rễ khỏi nấm bệnh."
  },
  {
    title: "Gói Cà Phê Năng Suất Vàng",
    items: ["Phân bón NPK Cao Cấp", "Kích ra hoa đồng loạt", "Chống rụng trái non"],
    retailPrice: "980.000đ",
    comboPrice: "784.000đ",
    saveAmount: "Tiết kiệm 196k",
    discount: "-20%",
    benefit: "Tối ưu năng suất cà phê, hạt to chắc, cành khỏe và hạn chế tối đa tình trạng rụng trái."
  },
  {
    title: "Combo Đặc Trị Vàng Lá",
    items: ["Thuốc trị thối rễ Nemano", "Kích rễ Bio Root", "Phân bón lá Amino"],
    retailPrice: "1.100.000đ",
    comboPrice: "880.000đ",
    saveAmount: "Tiết kiệm 220k",
    discount: "-20%",
    benefit: "Giải pháp toàn diện cho cây bị vàng lá thối rễ, giúp cây xanh lá trở lại sau 7-10 ngày."
  }
];

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
          <h2>Gói Giải Pháp & Combo</h2>
          <p>Sự kết hợp hoàn hảo giữa các sản phẩm chuyên dụng, giúp bà con tiết kiệm chi phí và đạt hiệu quả tối ưu trên từng loại cây trồng.</p>
        </div>

        <div className="combo-grid">
          {combos.map((combo, index) => (
            <div key={index} className="combo-card">
              <div className="combo-save-badge">{combo.saveAmount}</div>
              <h3 className="combo-title">{combo.title}</h3>
              
              <div className="combo-items">
                <h4>Sản phẩm trong gói:</h4>
                <ul className="combo-item-list">
                  {combo.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="combo-benefits">
                <p>"{combo.benefit}"</p>
              </div>

              <div className="combo-pricing">
                <span className="price-total-retail">Mua lẻ tổng cộng: {combo.retailPrice}</span>
                <div className="price-combo-row">
                  <span className="price-combo">{combo.comboPrice}</span>
                  <span className="price-discount-percent">{combo.discount}</span>
                </div>
              </div>

              <Link href="/checkout" className="combo-btn">
                ĐẶT COMBO NGAY
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComboSection;
