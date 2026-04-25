import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import MobileBottomBar from "@/components/MobileBottomBar";
import { CartProvider } from "@/context/CartContext";
import { SettingsProvider } from "@/context/SettingsContext";

const inter = Inter({ subsets: ["latin", "vietnamese"], display: 'swap' });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Phân Bón Giá Tốt | Giải Pháp Nông Nghiệp Hiệu Quả",
  description: "Phân bón chính hãng giá tốt cho sầu riêng, cà phê, tiêu. Giao hàng toàn quốc, kiểm tra trước khi nhận. Tư vấn kỹ sư miễn phí: 0773.440.966",
  keywords: "phân bón, thuốc trừ sâu, kích rễ, tuyến trùng, vàng lá thối rễ, sầu riêng, cà phê, phan bong gia tot",
  alternates: {
    canonical: "https://phanbongiatot.com",
  },
  openGraph: {
    title: "Phân Bón Giá Tốt | Giải Pháp Nông Nghiệp Hiệu Quả",
    description: "Phân bón chính hãng giá tốt cho sầu riêng, cà phê, tiêu. Giao hàng toàn quốc, kiểm tra trước khi nhận.",
    url: "https://phanbongiatot.com",
    siteName: "Phân Bón Giá Tốt",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://phanbongiatot.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Phân Bón Giá Tốt",
      },
    ],
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
        <link rel="preconnect" href="https://connect.facebook.net" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Phân Bón Giá Tốt",
            "url": "https://phanbongiatot.com",
            "logo": "https://phanbongiatot.com/logo.png",
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
            "image": "https://phanbongiatot.com/og-image.png",
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
        <CartProvider>
          <SettingsProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <StickyCTA />
            <MobileBottomBar />
          </SettingsProvider>
        </CartProvider>
      </body>
    </html>
  );
}
