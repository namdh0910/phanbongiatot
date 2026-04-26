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
        <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: title.replace('Vượt', '<br/><span>Vượt') }}>
        </h1>

        <div className="hero-social-proof">
          ✓ Hơn 5.000 nhà vườn tin dùng | Giao hàng toàn quốc
        </div>
        
        <p className="hero-subtitle">
          {subtitle}
        </p>

        <div className="mt-8 flex gap-4">
           <a href={settings?.heroCtaUrl || "/san-pham"} className="bg-yellow-400 text-[#1a5c2a] px-8 py-3 rounded-xl font-black text-lg shadow-xl hover:bg-yellow-300 transition-all uppercase">
              XEM GIẢI PHÁP ➜
           </a>
           <a href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}`} target="_blank" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-xl font-black text-lg hover:bg-white/20 transition-all uppercase">
              NHẬN TƯ VẤN
           </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
