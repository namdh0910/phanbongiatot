"use client";
import React from 'react';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import './Hero.css';

const Hero: React.FC = () => {
  const settings = useSettings();
  
  const title = settings?.heroTitle || "Tăng Năng Suất Vượt Ngưỡng Kỳ Vọng";
  const subtitle = settings?.heroSubtitle || "Giải pháp phân bón công nghệ cao, giúp cây trồng hấp thụ tối đảo dinh dưỡng, tăng năng suất vượt trội và bền vững cho nhà nông.";
  const banner = settings?.heroBanner || "/images/hero-bg.png";
  const zaloId = settings?.zaloId || "0773440966";
  const hotline = settings?.hotline || "0773.440.966";
  const primaryColor = settings?.primaryColor || "#1a5c2a";

  return (
    <section className="hero-container" style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      <img 
        src={banner} 
        alt={title} 
        className="hero-background-img"
        loading="eager"
      />
      <div className="hero-overlay" style={{ 
        background: `linear-gradient(135deg, ${primaryColor}cc 0%, rgba(0, 0, 0, 0.4) 100%)` 
      }}></div>
      
      <div className="hero-content">
        <div className="hero-badge">Giải Pháp Nông Nghiệp Xanh</div>
        
        <h1 className="hero-title">
          Tăng Năng Suất<br/><span>Vượt Ngưỡng Kỳ Vọng</span>
        </h1>

        <div className="hero-social-proof">
          ✓ Hơn 5.000 nhà vườn tin dùng | Giao hàng toàn quốc
        </div>
        
        <p className="hero-subtitle">
          {subtitle}
        </p>

        <a href="tel:0773440966" className="hero-hotline">
          📞 0773.440.966
        </a>
        
        <div className="hero-actions">
          <a 
            href="https://zalo.me/0773440966" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
          >
            💬 NHẮN ZALO TƯ VẤN MIỄN PHÍ
          </a>
          
          <Link href="/danh-muc/phan-bon" className="btn btn-secondary">
            Xem sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
