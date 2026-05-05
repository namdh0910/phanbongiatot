"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import StickyCTA from './StickyCTA';
import FloatingSocialProof from './FloatingSocialProof';
import TrustBar from './TrustBar';
import MobileBottomNav from './MobileBottomNav';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isSellerPortal = pathname?.startsWith('/kenh-nguoi-ban');

  if (isAdmin || isSellerPortal) {
    return (
      <main className="flex-1 w-full bg-[#f0f0f1]">
        {children}
      </main>
    );
  }

  return (
    <>
      <Header />
      <TrustBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <StickyCTA />
      <FloatingSocialProof />
    </>
  );
}


