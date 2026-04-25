"use client";
import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import './Hero.css';

const Hero: React.FC = () => {
  const settings = useSettings();
  
  const title = settings?.heroTitle || "Tăng Năng Suất Vượt Ngưỡng Kỳ Vọng";
  const subtitle = settings?.heroSubtitle || "Giải pháp phân bón công nghệ cao, giúp cây trồng hấp thụ tối đảo dinh dưỡng, tăng năng suất vượt trội và bền vững cho nhà nông.";
  const banner = settings?.heroBanner || "/images/hero-bg.png";
  const primaryColor = settings?.primaryColor || "#1a5c2a";

  return (
    <section className="hero-container" style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      <picture>
        <source srcSet="/images/hero-bg.webp" type="image/webp" />
        <img 
          src="/images/hero-bg.png" 
          alt={title} 
          className="hero-background-img"
          fetchPriority="high"
          width="1920"
          height="400"
          style={{ objectPosition: 'center 30%' }}
        />
      </picture>
      <div className="hero-overlay" style={{ 
        background: `linear-gradient(135deg, ${primaryColor}cc 0%, rgba(0, 0, 0, 0.4) 100%)` 
      }}></div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          Tăng Năng Suất<br/><span>Vượt Ngưỡng Kỳ Vọng</span>
        </h1>

        <div className="hero-social-proof">
          ✓ Hơn 5.000 nhà vườn tin dùng | Giao hàng toàn quốc
        </div>
        
        <p className="hero-subtitle">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default Hero;
