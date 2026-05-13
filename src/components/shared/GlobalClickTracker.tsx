
"use client";
import { useEffect } from "react";
import { trackEvent } from "@/utils/analytics";

export default function GlobalClickTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Find the closest button or link
      const clickable = target.closest("button, a");
      
      if (clickable) {
        // Extract some useful info
        const text = clickable.textContent?.trim() || "";
        const href = clickable.getAttribute("href") || "";
        const id = clickable.id || "";
        const className = clickable.className || "";
        const pageTitle = typeof document !== 'undefined' ? document.title.split('|')[0].trim() : "";
        
        const lowerText = text.toLowerCase();
        const lowerHref = href.toLowerCase();
        
        // Smart Detection: Identify if this is a high-value contact button
        const isZalo = lowerHref.includes('zalo.me') || lowerText.includes('zalo') || lowerText.includes('nhắn tin') || lowerText.includes('chat');
        const isCall = lowerHref.includes('tel:') || lowerText.includes('gọi') || lowerText.includes('hotline') || lowerText.includes('liên hệ');
        const isBuy = lowerText.includes('mua') || lowerText.includes('đặt hàng') || lowerText.includes('tư vấn') || lowerText.includes('chụp ảnh');
        
        if (isZalo || isCall || isBuy) {
          const type = isZalo ? 'zalo_click' : (isCall ? 'call_click' : 'QuickBuy_Click');
          
          trackEvent(type, {
            text,
            href,
            pageTitle,
            position: 'auto_detected'
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null; // This component doesn't render anything
}
