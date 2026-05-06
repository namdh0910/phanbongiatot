"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyCTA from '@/components/shared/StickyCTA';
import FloatingSocialProof from '@/components/shared/FloatingSocialProof';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

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
      <React.Suspense fallback={<div className="h-[48px] bg-[#1B5E20]" />}>
        <Header />
      </React.Suspense>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <div className="hidden lg:block">
        <StickyCTA />
      </div>
      <MobileBottomNav />
    </>
  );
}
