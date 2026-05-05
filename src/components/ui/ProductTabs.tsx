"use client";
import { useState, useEffect } from "react";

interface ProductTabsProps {
  hasTechnical: boolean;
}

export default function ProductTabs({ hasTechnical }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("mo-ta");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["mo-ta", "ky-thuat", "danh-gia"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveTab(id);
    }
  };

  return (
    <div className="md:hidden flex border-b border-gray-100 sticky top-[64px] bg-white z-40 shadow-sm">
      <button 
        onClick={() => scrollTo("mo-ta")}
        className={`flex-1 py-4 text-center text-xs font-black uppercase tracking-tight transition-all border-b-2 ${
          activeTab === "mo-ta" ? "text-[#ee4d2d] border-[#ee4d2d]" : "text-gray-400 border-transparent"
        }`}
      >
        Mô tả
      </button>
      {hasTechnical && (
        <button 
          onClick={() => scrollTo("ky-thuat")}
          className={`flex-1 py-4 text-center text-xs font-black uppercase tracking-tight transition-all border-b-2 ${
            activeTab === "ky-thuat" ? "text-[#ee4d2d] border-[#ee4d2d]" : "text-gray-400 border-transparent"
          }`}
        >
          Kỹ thuật
        </button>
      )}
      <button 
        onClick={() => scrollTo("danh-gia")}
        className={`flex-1 py-4 text-center text-xs font-black uppercase tracking-tight transition-all border-b-2 ${
          activeTab === "danh-gia" ? "text-[#ee4d2d] border-[#ee4d2d]" : "text-gray-400 border-transparent"
        }`}
      >
        Đánh giá
      </button>
    </div>
  );
}
