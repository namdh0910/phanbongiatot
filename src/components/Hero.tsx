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

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
           <Link 
              href={settings?.heroCtaUrl || "/danh-muc/phan-bon"} 
              className="bg-yellow-400 text-[#1a5c2a] px-10 py-4 rounded-2xl font-black text-xl shadow-2xl hover:bg-yellow-300 transition-all uppercase text-center active:scale-95"
           >
              {settings?.heroCtaText || "XEM GIẢI PHÁP"} ➜
           </Link>
           <a 
              href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE || settings?.zalo || '0773440966'}`} 
              target="_blank" 
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-black text-xl hover:bg-white/20 transition-all uppercase text-center active:scale-95"
           >
              {settings?.heroSecondaryCtaText || "NHẬN TƯ VẤN"}
           </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
