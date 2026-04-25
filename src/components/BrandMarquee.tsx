"use client";
import React from 'react';
import './BrandMarquee.css';

const brands = [
  "BÌNH ĐIỀN",
  "ĐẠM PHÚ MỸ",
  "PHÂN BÓN MIỀN NAM",
  "YARA",
  "HAIFA GROUP",
  "BEHN MEYER",
  "DAP ĐÌNH VŨ",
  "ACTI AGRI"
];

const BrandMarquee: React.FC = () => {
  return (
    <section className="brand-section">
      <div className="brand-header">
        <h2>Thương hiệu chính hãng chúng tôi phân phối</h2>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {/* Duplicate for seamless scrolling */}
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="brand-logo">
              <svg width="150" height="60" viewBox="0 0 150 60">
                <text 
                  x="50%" 
                  y="50%" 
                  dominantBaseline="middle" 
                  textAnchor="middle" 
                  fill="#333" 
                  fontSize="14" 
                  fontWeight="900"
                  fontFamily="sans-serif"
                >
                  {brand}
                </text>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
