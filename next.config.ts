import type { NextConfig } from "next";
// Force Vercel rebuild - sync config 01

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
      },
      {
        source: '/giai-phap/sau-rieng-vang-la-thoi-re',
        destination: '/giai-phap/vang-la-thoi-re',
        permanent: true,
      }
    ]
  },
};

export default nextConfig;
