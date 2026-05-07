// Shared types for the auto-content generation pipeline

export interface GenerateArticleRequest {
  topic: string;          // e.g. "sầu riêng vàng lá thối rễ"
  keyword: string;        // primary SEO keyword
  category?: string;      // e.g. "cam-nang-ky-thuat"
  targetCrop?: string;    // "sau-rieng" | "ca-phe" | "ho-tieu"
  urgencyLevel?: 'normal' | 'urgent'; // urgent = more warning blocks
}

export interface PexelsPhoto {
  id: number;
  url: string;
  photographer: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
  };
  alt: string;
}

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
}

export interface ArticleImage {
  cloudinaryUrl: string;
  alt: string;
  caption: string;
  photographer: string;
  position: 'hero' | 'inline' | 'section';
}

export interface GenerateArticleResponse {
  success: boolean;
  article?: {
    title: string;
    metaDescription: string;
    slug: string;
    heroImage: ArticleImage;
    content: string;        // Full HTML with images injected
    images: ArticleImage[]; // All images used
    wordCount: number;
    tags: string[];
  };
  error?: string;
}
