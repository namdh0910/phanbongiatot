import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/gio-hang',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/checkout',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/huong-dan-mua-hang',
        destination: '/ve-chung-toi',
        permanent: true,
      },
      {
        source: '/tra-cuu-don-hang/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/combo',
        destination: '/blog',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
