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
import { useSettings } from "@/context/SettingsContext";

const BrandMarquee: React.FC = () => {
  const settings = useSettings();
  
  const brandsString = settings?.brands || "BÌNH ĐIỀN, ĐẠM PHÚ MỸ, PHÂN BÓN MIỀN NAM, YARA, HAIFA GROUP, BEHN MEYER, DAP ĐÌNH VŨ, ACTI AGRI";
  const brandsList = brandsString.split(',').map((b: string) => b.trim()).filter(Boolean);
  return (
    <section className="brand-section bg-gray-50/50 py-16">
      <div className="brand-container max-w-7xl mx-auto px-4">
        <div className="brand-header text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-green-50 text-[#1a5c2a] text-[10px] font-black uppercase tracking-widest mb-4">
            Đối Tác Chiến Lược
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">Thương hiệu chính hãng phân phối</h2>
          <div className="w-20 h-1.5 bg-[#f5a623] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="marquee-container relative overflow-hidden py-8">
          <div className="marquee-track flex items-center">
            {/* Duplicate for seamless scrolling */}
            {[...brandsList, ...brandsList, ...brandsList].map((brand: string, index: number) => (
              <div key={index} className="brand-logo px-8 md:px-12 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
                <div className="text-xl md:text-2xl font-black text-gray-800 tracking-tighter whitespace-nowrap">
                  {brand}
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50/50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50/50 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
