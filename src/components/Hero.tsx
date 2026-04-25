"use client";
import React from 'react';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import './Hero.css';

const Hero: React.FC = () => {
  const settings = useSettings();
  
  // Use settings from context or fall back to premium defaults
  const title = settings?.heroTitle || "Tăng Năng Suất Vượt Ngưỡng Kỳ Vọng";
  const subtitle = settings?.heroSubtitle || "Giải pháp phân bón công nghệ cao, giúp cây trồng hấp thụ tối đa dinh dưỡng, tăng năng suất vượt trội và bền vững cho nhà nông.";
  const banner = settings?.heroBanner || "/images/hero-bg.png";
  const zaloId = settings?.zaloId || "0773440966";
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
        <div className="hero-badge">Nông Nghiệp Thịnh Vượng</div>
        
        <h1 className="hero-title">
          {title.includes(" ") ? (
            <>
              {title.split(" ").slice(0, -2).join(" ")} <span>{title.split(" ").slice(-2).join(" ")}</span>
            </>
          ) : title}
        </h1>
        
        <p className="hero-subtitle">
          {subtitle}
        </p>
        
        <div className="hero-actions">
          <a 
            href={`https://zalo.me/${zaloId}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
          >
            <span style={{fontSize: '1.5rem'}}>💬</span> {settings?.ctaText || "TƯ VẤN ZALO MIỄN PHÍ"}
          </a>
          
          <Link href="/danh-muc/phan-bon" className="btn btn-secondary">
            XEM SẢN PHẨM
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
