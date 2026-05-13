
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
        
        // We use a generic event type for global clicks
        trackEvent('button_click', {
          text,
          href,
          id,
          pageTitle,
          tag: clickable.tagName,
          className: className.substring(0, 50)
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null; // This component doesn't render anything
}
