"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import './MobileBottomBar.css';

const MobileBottomBar: React.FC = () => {
  const { cartCount } = useCart();
  const settings = useSettings();
  const phone = settings?.hotline || "0773440966";
  const zaloId = settings?.zalo || "0773440966";

  return (
    <div className="mobile-bottom-bar">
      <a href={`tel:${phone}`} className="m-btn m-btn-call">
        <span style={{fontSize: '1.2rem'}}>📞</span>
        Gọi ngay
      </a>
      <a href={`https://zalo.me/${zaloId}`} target="_blank" rel="noopener noreferrer" className="m-btn m-btn-zalo">
        <span style={{fontSize: '1.2rem'}}>💬</span>
        Chat Zalo
      </a>
      <Link href="/gio-hang" className="m-btn m-btn-cart">
        <span style={{fontSize: '1.2rem'}}>🛒</span>
        Giỏ hàng
        {cartCount > 0 && (
          <span className="cart-badge-m">{cartCount}</span>
        )}
      </Link>
    </div>
  );
};

export default MobileBottomBar;
