"use client";
import React from 'react';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import './CategorySection.css';

const categories = [
  {
    name: "Phân Bón",
    slug: "phan-bon",
    desc: "Cung cấp dinh dưỡng thiết yếu cho cây trồng phát triển mạnh mẽ.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8h-5a7 7 0 0 1-7 7l-2 3" />
        <path d="M7 21l-4-4" />
        <path d="M12 22a7 7 0 0 0 7-7" />
      </svg>
    )
  },
  {
    name: "Kích Rễ",
    slug: "kich-re",
    desc: "Phục hồi bộ rễ, kích thích rễ cám ra cực mạnh, bền vững.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <path d="m3 22 3-3" />
        <path d="M9 18V5l4 2" />
        <path d="M12 22a9 9 0 1 0-9-9" />
        <path d="M19 13a9 9 0 0 1-9 9" />
        <path d="M10 12c.5 0 1 .5 1 1" />
      </svg>
    )
  },
  {
    name: "Tuyến Trùng",
    slug: "tuyen-trung",
    desc: "Giải pháp tiêu diệt và phòng ngừa tuyến trùng gây hại rễ.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    )
  },
  {
    name: "Thuốc Bảo Vệ Thực Vật",
    slug: "thuoc-bvtv",
    desc: "Sản phẩm chất lượng cao bảo vệ cây khỏi sâu bệnh tấn công.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <path d="M12 18v-4" />
        <path d="M5 11h14v10H5z" />
        <path d="M12 7V3" />
      </svg>
    )
  },
  {
    name: "Dưỡng Trái",
    slug: "duong-trai",
    desc: "Giúp trái to, đẹp màu, chắc ruột và tăng phẩm chất nông sản.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3c.5 3 2 4 4 4" />
        <path d="M12 3c-.5 3-2 4-4 4" />
      </svg>
    )
  },
  {
    name: "Xử Lý Đất",
    slug: "xu-ly-dat",
    desc: "Cải tạo đất tơi xốp, cân bằng pH và ổn định hệ sinh thái đất.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40">
        <path d="M11 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
        <path d="m15 3 3 3-3 3" />
        <path d="M18 6H12" />
        <path d="M15 13H9" />
        <path d="M13 17H9" />
      </svg>
    )
  }
];

const CategorySection: React.FC = () => {
  const settings = useSettings();
  const primaryColor = settings?.primaryColor || "#1a5c2a";

  return (
    <section className="category-section" style={{ '--primary-color': primaryColor } as React.CSSProperties}>
      <div className="category-container">
        <div className="category-header">
          <div 
            className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4"
            style={{ backgroundColor: `${primaryColor}1a`, color: primaryColor }}
          >
            Giải Pháp Chuyên Sâu
          </div>
          <h2 style={{ color: primaryColor }}>Danh Mục Sản Phẩm</h2>
          <p>Lựa chọn giải pháp phù hợp nhất cho nhu cầu canh tác của bạn</p>
        </div>

        <div className="category-grid">
          {categories.map((cat, index) => (
            <Link href={`/danh-muc/${cat.slug}`} key={index} className="category-card">
              <div 
                className="category-icon" 
                style={{ color: primaryColor, backgroundColor: `${primaryColor}0d` }}
              >
                {cat.icon}
              </div>
              <h3 className="category-name">{cat.name}</h3>
              <p className="category-desc">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .category-card:hover {
          border-color: ${primaryColor};
        }
        .category-card:hover .category-icon {
          background-color: ${primaryColor} !important;
          color: #ffffff !important;
        }
        .category-card:hover .category-name {
          color: ${primaryColor};
        }
      `}</style>
    </section>
  );
};

export default CategorySection;
