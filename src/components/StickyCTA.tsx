"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/utils/analytics";
import { useSettings } from "@/context/SettingsContext";

export default function StickyCTA() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const settings = useSettings();

  if (pathname?.startsWith('/admin')) return null;

  const handleCall = () => trackEvent('Contact', { method: 'Phone' });
  const handleZalo = () => trackEvent('Contact', { method: 'Zalo' });
  const handleMessenger = () => trackEvent('Contact', { method: 'Messenger' });

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col items-end gap-4 z-[99]">
      
      {/* Expanded Menu Items */}
      <div className={`flex flex-col items-end gap-4 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-10 pointer-events-none'}`}>
        
        {/* Messenger Button */}
        <a 
          href="https://m.me/61574432962859" 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={handleMessenger}
          className="group relative flex items-center"
        >
          <span className="absolute right-full mr-3 bg-white text-[#0084ff] px-3 py-1.5 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-[#0084ff]/20">
            Chat Messenger
          </span>
          <div className="bg-gradient-to-tr from-[#00b2ff] via-[#006aff] to-[#c13584] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
             <svg viewBox="0 0 36 36" fill="currentColor" width="24" height="24">
               <path d="M18 2C9.163 2 2 8.706 2 17c0 4.708 2.308 8.897 5.86 11.751.343.276.54.697.514 1.144-.06 1.05-.246 2.378-.838 3.655a.658.658 0 0 0 .863.85c1.785-.694 3.326-1.576 4.38-2.261.272-.178.599-.236.91-.16A16.89 16.89 0 0 0 18 32c8.837 0 16-6.706 16-15S26.837 2 18 2zm1.205 19.34l-3.356-3.585a1.134 1.134 0 0 0-1.638-.052l-4.782 4.723c-.66.652-1.74-.08-1.32-.958l3.966-8.293a1.442 1.442 0 0 1 2.222-.52l3.36 3.59a1.134 1.134 0 0 0 1.636.05l4.783-4.721c.66-.653 1.74.08 1.32.957l-3.966 8.293a1.444 1.444 0 0 1-2.225.516z"/>
             </svg>
          </div>
        </a>

        {/* Zalo Button */}
        <a 
          href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0773440966'}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={handleZalo}
          className="group relative flex items-center"
        >
          <span className="absolute right-full mr-3 bg-white text-[#0068ff] px-3 py-1.5 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-blue-100">
            Chat Zalo ngay
          </span>
          <div className="bg-[#0068ff] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
             <span className="font-black text-xl">Z</span>
          </div>
        </a>

        {/* Hotline Button */}
        <a 
          href={`tel:${settings?.hotline || '0773440966'}`} 
          onClick={handleCall}
          className="group relative flex items-center"
        >
          <span className="absolute right-full mr-3 bg-white text-[#ee4d2d] px-3 py-1.5 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-red-100">
            Gọi hotline tư vấn
          </span>
          <div className="bg-[#ee4d2d] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-wiggle">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
        </a>
      </div>

      {/* Main FAB Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1a5c2a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(26,92,42,0.4)] hover:scale-110 transition-transform relative z-10"
      >
        <span className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-50"></span>
        {isOpen ? (
          <span className="text-2xl font-bold leading-none select-none">✕</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        )}
      </button>

    </div>
  );
}
