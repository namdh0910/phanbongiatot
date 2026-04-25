"use client";
import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import './TrustBar.css';

const TrustBar: React.FC = () => {
  const settings = useSettings();
  const primaryColor = settings?.primaryColor || "#1a5c2a";

  const items = [
    {
      label: "Chính Hãng 100%",
      sub: "Bồi thường 200% nếu giả",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      label: "Kỹ Sư Tư Vấn 24/7",
      sub: "Hỗ trợ kỹ thuật tận vườn",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M12 7v6" />
          <path d="M9 10h6" />
        </svg>
      )
    },
    {
      label: "Giao Toàn Quốc",
      sub: "Kiểm tra trước khi trả tiền",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    },
    {
      label: "Giá Tốt Nhất",
      sub: "Tiết kiệm 15-20% chi phí",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
          <path d="M12 1v22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    }
  ];

  return (
    <div className="trust-bar" style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      <div className="trust-container">
        <div className="trust-main">
          {items.map((item, index) => (
            <div key={index} className="trust-item">
              <div className="trust-icon">{item.icon}</div>
              <div className="trust-text">
                <span className="trust-label">{item.label}</span>
                <span className="trust-sublabel">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="trust-stats">
          <div className="stat-box">
            <span className="stat-value">500+</span>
            <span className="stat-label">Đơn/Tháng</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">4.8/5</span>
            <span className="stat-label">Đánh Giá Sao</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
