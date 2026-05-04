export const getImageUrl = (img: any): string => {
  if (!img) return "";
  if (typeof img === 'string') return img;
  if (typeof img === 'object' && img.url) return img.url;
  return "";
};

export const isValidImageUrl = (url: string): boolean => {
  return typeof url === 'string' && (url.startsWith("http") || url.startsWith("/"));
};
