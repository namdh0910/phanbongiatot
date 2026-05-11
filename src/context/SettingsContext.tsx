"use client";
// Global Settings Context for Phân Bón Giá Tốt
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
  brands: string;
  brand_marquee: string;
}

const SettingsContext = createContext<any>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Phân Bón Giá Tốt',
    hotline: '0339505050',
    zalo: '0339505050',
    shopee: 'phanbongiatot',
    address: 'Kho hàng: Phường Đăk Cấm, TP. Kon Tum, Tỉnh Kon Tum',
    email: 'hotro@phanbongiatot.com',
    facebook: '',
    freeShippingThreshold: 500000,
    heroTitle: '',
    heroSubtitle: '',
    heroBanner: '',
    primaryColor: '#0d2a1c',
    showBlogOnHome: true,
    phone: '0339.50.50.50',
    zaloId: '0339505050',
    ctaText: 'Nhận Tư Vấn Miễn Phí',
    businessHours: '7:00 - 21:00',
    announcementEnabled: false,
    announcementText: '',
    footerAddress: 'Kho hàng: Phường Đăk Cấm, TP. Kon Tum, Tỉnh Kon Tum',
    footerEmail: 'hotro@phanbongiatot.com',
    brands: 'BÌNH ĐIỀN, ĐẠM PHÚ MỸ, PHÂN BÓN MIỀN NAM, YARA, HAIFA GROUP, BEHN MEYER, DAP ĐÌNH VŨ, ACTI AGRI',
    brand_marquee: 'Bình Điền, Yara, DAP, Phú Mỹ, Hợp Trí, Nemano'
  });

  useEffect(() => {
    // Fetch from new Modular Config API
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data && data.configs) {
          const configObject = data.configs.reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
          }, {});
          
          setSettings(prev => ({ 
            ...prev, 
            ...configObject,
            // Map keys if they differ
            phone: configObject.phone_primary || prev.phone,
            hotline: configObject.phone_primary || prev.hotline,
            zalo: configObject.zalo_id || prev.zalo,
            zaloId: configObject.zalo_id || prev.zaloId,
            heroTitle: configObject.hero_title || prev.heroTitle,
            heroSubtitle: configObject.hero_subtitle || prev.heroSubtitle,
            brand_marquee: configObject.brand_marquee || prev.brand_marquee,
            address: configObject.address_main || prev.address,
            announcementText: configObject.announcement_message || prev.announcementText,
            announcementEnabled: configObject.announcement_enabled === 'true'
          }));
        }
      })
      .catch(err => console.error('Settings context fetch failed', err));
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
