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
          ✓ Cam kết chính hãng | Hỗ trợ tư vấn 24/7 | Giao hàng toàn quốc
        </div>
        
        <p className="hero-subtitle">
          {subtitle}
        </p>

        {/* Hero CTAs */}
        <div className="hero-actions">
          <Link
            href="/blog"
            className="hero-btn hero-btn-primary"
          >
            🌿 Xem giải pháp
          </Link>
          <a
            href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0339505050'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-secondary"
          >
            💬 Tư vấn miễn phí
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
