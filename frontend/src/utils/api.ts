export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const getAuthHeaders = () => {
  if (typeof window === 'undefined') return {};
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
  };
};
