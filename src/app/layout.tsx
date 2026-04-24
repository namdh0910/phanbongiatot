import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { CartProvider } from "@/context/CartContext";
import { SettingsProvider } from "@/context/SettingsContext";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Phân Bón Giá Tốt | Giải Pháp Nông Nghiệp Hiệu Quả",
  description: "Chuyên cung cấp phân bón, thuốc trừ sâu, kích rễ và các giải pháp bảo vệ thực vật uy tín cho sầu riêng, cà phê, cây ăn trái.",
  keywords: "phân bón, thuốc trừ sâu, kích rễ, tuyến trùng, vàng lá thối rễ, sầu riêng, cà phê",
  openGraph: {
    title: "Phân Bón Giá Tốt | Giải Pháp Nông Nghiệp Hiệu Quả",
    description: "Chuyên cung cấp phân bón, thuốc trừ sâu, kích rễ và các giải pháp bảo vệ thực vật uy tín.",
    url: "https://phanbongiatot.com",
    siteName: "Phân Bón Giá Tốt",
    locale: "vi_VN",
    type: "website",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Phân Bón Giá Tốt",
            "url": "https://phanbongiatot.com",
            "logo": "https://phanbongiatot.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+84773440966",
              "contactType": "customer service"
            }
          }) }}
        />
        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_PIXEL_ID');
          fbq('track', 'PageView');
        `}</Script>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA4_ID" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'YOUR_GA4_ID');
        `}</Script>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        <CartProvider>
          <SettingsProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <StickyCTA />
          </SettingsProvider>
        </CartProvider>
      </body>
    </html>
  );
}
