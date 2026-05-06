"use client";
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/utils/analytics';

export default function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Chỉ track khi pathname thay đổi (người dùng chuyển trang)
    trackEvent('page_view', {
      search: searchParams.toString()
    });
  }, [pathname, searchParams]);

  return null; // Component này không hiển thị gì cả
}
