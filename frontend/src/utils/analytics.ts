"use client";

export const trackEvent = (eventName: string, params?: object) => {
  if (typeof window !== "undefined") {
    // Facebook Pixel
    if ((window as any).fbq) {
      (window as any).fbq('track', eventName, params);
    }
    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
    console.log(`[Tracking] ${eventName}`, params);
  }
};
