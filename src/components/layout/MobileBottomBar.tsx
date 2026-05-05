"use client";
import React from 'react';
import Link from 'next/link';

import { useSettings } from '@/context/SettingsContext';
import './MobileBottomBar.css';

const MobileBottomBar: React.FC = () => {
  const settings = useSettings();
  const phone = settings?.hotline || "0773.440.966";
  const zalo = settings?.zalo || "0773440966";
  const zaloUrl = `https://zalo.me/${zalo.replace(/\./g, '')}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000] bg-white border-t border-gray-100 flex p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] gap-2 h-auto shadow-[0_-5px_20px_rgba(0,0,0,0.05)] md:hidden">
      <a 
        href={zaloUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex-1 bg-[#0068FF] text-white rounded-xl font-black flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-100 active:scale-95 transition-transform animate-pulse h-14"
      >
        <span className="text-xl">💬</span>
        Tư vấn Zalo
      </a>
      <a 
        href={`tel:${phone.replace(/\./g, '')}`} 
        className="flex-1 bg-[#ee4d2d] text-white rounded-xl font-black flex items-center justify-center gap-2 text-sm shadow-lg shadow-red-100 active:scale-95 transition-transform h-14"
      >
        <span className="text-xl">📞</span>
        Gọi ngay
      </a>
    </div>
  );
};

export default MobileBottomBar;
