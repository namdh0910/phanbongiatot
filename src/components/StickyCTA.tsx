"use client";
import { trackEvent } from "@/utils/analytics";

export default function StickyCTA() {
  const handleCall = () => {
    trackEvent('Contact', { method: 'Phone' });
  };

  const handleZalo = () => {
    trackEvent('Contact', { method: 'Zalo' });
  };

  return (
    <div className="fixed bottom-20 md:bottom-10 right-6 flex flex-col gap-4 z-[99]">
      {/* Zalo Button */}
      <a 
        href="https://zalo.me/0773440966" 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={handleZalo}
        className="group relative flex items-center"
      >
        <span className="absolute right-full mr-3 bg-white text-[#0068ff] px-3 py-1.5 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-blue-100">
          Chat Zalo ngay
        </span>
        <div className="bg-[#0068ff] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,104,255,0.4)] hover:scale-110 transition-transform relative overflow-hidden">
           <span className="font-black text-2xl">Z</span>
           <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </a>

      {/* Hotline Button */}
      <a 
        href="tel:0773440966" 
        onClick={handleCall}
        className="group relative flex items-center"
      >
        <span className="absolute right-full mr-3 bg-white text-[#ee4d2d] px-3 py-1.5 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-red-100">
          Gọi hotline tư vấn
        </span>
        <div className="bg-[#ee4d2d] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(238,77,45,0.4)] hover:scale-110 transition-transform relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-wiggle">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
      </a>
    </div>
  );
}
