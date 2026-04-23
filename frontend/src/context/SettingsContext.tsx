"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '@/utils/api';

interface Settings {
  siteName: string;
  hotline: string;
  zalo: string;
  shopee: string;
  address: string;
  email: string;
  facebook: string;
  freeShippingThreshold: number;
  heroTitle: string;
  heroSubtitle: string;
  heroBanner: string;
  primaryColor: string;
  showBlogOnHome: boolean;
  phone: string;
  zaloId: string;
  ctaText: string;
  businessHours: string;
  announcementEnabled: boolean;
  announcementText: string;
  footerAddress: string;
  footerEmail: string;
}

const SettingsContext = createContext<any>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Phân Bón Giá Tốt',
    hotline: '0773440966',
    zalo: '0773440966',
    shopee: 'phanbongiatot',
    address: 'Trụ sở: 123 Đường Nông Nghiệp, Quận 12, TP. Hồ Chí Minh',
    email: 'hotro@phanbongiatot.com',
    facebook: '',
    freeShippingThreshold: 500000,
    heroTitle: '',
    heroSubtitle: '',
    heroBanner: '',
    primaryColor: '#0d2a1c',
    showBlogOnHome: true,
    phone: '0773.440.966',
    zaloId: '0773440966',
    ctaText: 'Nhận Tư Vấn Miễn Phí',
    businessHours: '7:00 - 21:00',
    announcementEnabled: false,
    announcementText: '',
    footerAddress: '',
    footerEmail: ''
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/settings`)
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Settings context fetch failed', err));
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
