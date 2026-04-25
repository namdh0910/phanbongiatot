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
    bgColor: "#e8f5e9", // Pastel green
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8h-5a7 7 0 0 1-7 7l-2 3" />
        <path d="M7 21l-4-4" />
      </svg>
    )
  },
  {
    name: "Kích Rễ",
    slug: "kich-re",
    desc: "Phục hồi bộ rễ, kích thích rễ cám ra cực mạnh, bền vững.",
    bgColor: "#fff3e0", // Pastel orange
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#ef6c00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 22 3-3" />
        <path d="M9 18V5l4 2" />
        <path d="M12 22a9 9 0 1 0-9-9" />
      </svg>
    )
  },
  {
    name: "Tuyến Trùng",
    slug: "tuyen-trung",
    desc: "Giải pháp tiêu diệt và phòng ngừa tuyến trùng gây hại rễ.",
    bgColor: "#fce4ec", // Pastel pink
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#c2185b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    )
  },
  {
    name: "Thuốc BVTV",
    slug: "thuoc-bvtv",
    desc: "Sản phẩm chất lượng cao bảo vệ cây khỏi sâu bệnh tấn công.",
    bgColor: "#e1f5fe", // Pastel blue
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#0277bd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <path d="M5 11h14v10H5z" />
      </svg>
    )
  },
  {
    name: "Dưỡng Trái",
    slug: "duong-trai",
    desc: "Giúp trái to, đẹp màu, chắc ruột và tăng phẩm chất nông sản.",
    bgColor: "#fff9c4", // Pastel yellow
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fbc02d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3c.5 3 2 4 4 4" />
      </svg>
    )
  },
  {
    name: "Xử Lý Đất",
    slug: "xu-ly-dat",
    desc: "Cải tạo đất tơi xốp, cân bằng pH và ổn định hệ sinh thái đất.",
    bgColor: "#efebe9", // Pastel brown
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#5d4037" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
      </svg>
    )
  },
  {
    name: "Trừ Sâu",
    slug: "tru-sau",
    desc: "Tiêu diệt các loại sâu hại, côn trùng chích hút bảo vệ mùa màng.",
    bgColor: "#f3e5f5", // Pastel purple
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#7b1fa2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  },
  {
    name: "Trừ Bệnh",
    slug: "tru-benh",
    desc: "Đặc trị nấm bệnh, vi khuẩn gây thối rễ, vàng lá, xì mủ.",
    bgColor: "#e0f2f1", // Pastel teal
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#00796b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    )
  },
  {
    name: "Tăng Trưởng",
    slug: "tang-truong",
    desc: "Kích thích cây sinh trưởng mạnh, vọt đọt, xanh lá dày.",
    bgColor: "#f1f8e9", // Pastel light green
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#33691e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20V16" />
      </svg>
    )
  },
  {
    name: "Combo",
    slug: "combo",
    desc: "Các gói giải pháp tiết kiệm và hiệu quả cho từng giai đoạn.",
    bgColor: "#fffde7", // Pastel light yellow
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#fbc02d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      </svg>
    )
  }
];

const CategorySection: React.FC = () => {
  const [showAll, setShowAll] = React.useState(false);
  const settings = useSettings();
  const primaryColor = settings?.primaryColor || "#1a5c2a";

  const displayedCategories = showAll ? categories : categories.slice(0, 8);

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
          <p className="hidden md:block">Lựa chọn giải pháp phù hợp nhất cho nhu cầu canh tác của bạn</p>
        </div>

        <div className="category-grid">
          {displayedCategories.map((cat, index) => (
            <Link href={`/danh-muc/${cat.slug}`} key={index} className="category-card">
              <div 
                className="category-icon" 
                style={{ backgroundColor: cat.bgColor }}
              >
                <div className="icon-wrapper">
                  {cat.icon}
                </div>
              </div>
              <h3 className="category-name">{cat.name}</h3>
              <p className="category-desc">{cat.desc}</p>
            </Link>
          ))}
        </div>

        {!showAll && categories.length > 8 && (
          <div className="md:hidden mt-6 text-center">
            <button 
              onClick={() => setShowAll(true)}
              className="text-[#1a5c2a] font-bold text-xs flex items-center gap-2 mx-auto"
            >
              Xem thêm danh mục <span>▼</span>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .category-card:hover {
          border-color: ${primaryColor};
        }
        .category-card:hover .category-icon {
          transform: scale(1.1);
        }
        .category-card:hover .category-name {
          color: ${primaryColor};
        }
      `}</style>
    </section>
  );
};

export default CategorySection;
