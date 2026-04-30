const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const API_BASE_URL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl.replace(/\/$/, '')}/api`;

export const getAuthHeaders = (isMultipart = false): any => {
  if (typeof window === 'undefined') return {};
  
  // Try adminToken first, then vendorToken
  const token = localStorage.getItem("adminToken") || localStorage.getItem("vendorToken");
  
  const headers: any = {
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
  
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  
  return headers;
};
