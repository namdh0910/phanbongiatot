import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyCTA from "@/components/shared/StickyCTA";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import { SettingsProvider } from "@/context/SettingsContext";

const inter = Inter({ subsets: ["latin", "vietnamese"], display: 'swap' });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Phân Bón Đắk Lắk | Giải Pháp Cứu Vườn Sầu Riêng, Cà Phê",
  description: "Mua phân bón Đắk Lắk chính hãng. Kỹ sư Tây Nguyên tư vấn phục hồi sầu riêng vàng lá, tuyến trùng miễn phí. Giao hàng toàn quốc, kiểm tra tại vườn.",
  keywords: "phân bón, thuốc trừ sâu, kích rễ, tuyến trùng, vàng lá thối rễ, sầu riêng, cà phê, phan bong gia tot",
  metadataBase: new URL("https://www.phanbongiatot.com"),
  openGraph: {
    title: "Phân Bón Giá Tốt | Giải Pháp Nông Nghiệp Hiệu Quả",
    description: "Phân bón chính hãng giá tốt cho sầu riêng, cà phê, tiêu. Giao hàng toàn quốc, kiểm tra trước khi nhận.",
    url: "https://www.phanbongiatot.com/",
    siteName: "Phân Bón Giá Tốt",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://phanbongiatot.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Phân Bón Giá Tốt - Giải Pháp Nông Nghiệp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phân Bón Giá Tốt | Giải Pháp Nông Nghiệp Hiệu Quả",
    description: "Phân bón chính hãng giá tốt cho sầu riêng, cà phê, tiêu. Giao hàng toàn quốc.",
    images: ["https://www.phanbongiatot.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://zalo.me" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://zalo.me" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="preload" as="image" href="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Logo_Bo_Cong_Thuong.svg/1200px-Logo_Bo_Cong_Thuong.svg.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Phân Bón Giá Tốt",
            "url": "https://www.phanbongiatot.com/",
            "logo": "https://www.phanbongiatot.com/logo.png",
            "sameAs": [
              "https://www.facebook.com/phanbongiatot",
              "https://www.youtube.com/@phanbongiatot"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+84773440966",
              "contactType": "customer service",
              "areaServed": "VN",
              "availableLanguage": "Vietnamese"
            }
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Phân Bón Giá Tốt",
            "image": "https://www.phanbongiatot.com/og-image.png",
            "telephone": "0773440966",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Kho hàng Tây Nguyên",
              "addressLocality": "Buôn Ma Thuột",
              "addressRegion": "Đắk Lắk",
              "addressCountry": "VN"
            },
            "priceRange": "$$",
            "openingHours": "Mo-Su 07:00-21:00"
          }) }}
        />
        {/* Facebook Pixel - only load if NEXT_PUBLIC_FB_PIXEL_ID is set */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <Script id="facebook-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}</Script>
        )}
        {/* Google Analytics - only load if NEXT_PUBLIC_GA4_ID is set */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
            `}</Script>
          </>
        )}
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <SettingsProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </SettingsProvider>
      </body>
    </html>
  );
}

// Separate client component to handle conditional rendering
import LayoutWrapper from "@/components/layout/LayoutWrapper";
