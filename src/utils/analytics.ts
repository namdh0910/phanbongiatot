export type AnalyticsEventType = 'page_view' | 'zalo_click' | 'call_click' | 'lead_submit' | 'ViewPopup';

export const trackEvent = async (type: AnalyticsEventType, metadata?: any) => {
  try {
    const path = window.location.pathname;
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, path, metadata }),
    });
  } catch (error) {
    // Không log lỗi ra console người dùng để tránh rác log
  }
};
