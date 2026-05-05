"use client";
import React from 'react';
import './TrustBar.css';

const TrustBar: React.FC = () => {
  const items = [
    "✓ Chính hãng 100%",
    "✓ Giao toàn quốc",
    "✓ Kỹ sư 24/7",
    "✓ Bồi thường 200% nếu giả",
    "✓ Kiểm tra nhận hàng",
  ];

  // Duplicate items for seamless marquee
  const displayItems = [...items, ...items, ...items];

  return (
    <div className="trust-bar-marquee">
      <div className="marquee-content">
        {displayItems.map((item, index) => (
          <div key={index} className="marquee-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;

