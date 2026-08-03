import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { rootSchemaGraph } from "@/lib/seo/schema";
import Script from "next/script";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { serializeJsonLd } from "@/lib/seo/jsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://integrafin.tax'),
  title: 'IntegraFin Tax & Accounting | Katy Tax and Accounting Firm',
  description: 'IntegraFin is a Katy-based tax and accounting firm offering tax preparation, bookkeeping, payroll records support, and IRS notice help. Call (832) 647-1819.',
  authors: [{ name: 'IntegraFin Tax & Accounting' }],
  creator: 'IntegraFin',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://integrafin.tax/',
    siteName: 'IntegraFin',
    title: 'IntegraFin Tax & Accounting | Katy Tax and Accounting Firm',
    description: 'Katy-based tax preparation, bookkeeping, payroll records support, and IRS notice help from IntegraFin.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'IntegraFin Tax & Accounting' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IntegraFin Tax & Accounting | Katy Tax and Accounting Firm',
    description: 'Katy-based tax preparation, bookkeeping, payroll records support, and IRS notice help from IntegraFin.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const configuredGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
  const gaMeasurementId = /^G-[A-Z0-9]+$/.test(configuredGaId)
    ? configuredGaId
    : "G-GRMDY21D72";
  const configuredGtmId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || "";
  const googleTagManagerId = /^GTM-[A-Z0-9]+$/.test(configuredGtmId)
    ? configuredGtmId
    : "";
  const configuredMetaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
  const metaPixelId = /^\d{6,20}$/.test(configuredMetaPixelId)
    ? configuredMetaPixelId
    : "";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}');
          `}
        </Script>
        {googleTagManagerId && (
          <Script id="google-tag-manager">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManagerId}');
            `}
          </Script>
        )}
        {metaPixelId && (
          <Script id="meta-pixel">
            {`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(rootSchemaGraph) }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Navbar />
        <AnalyticsTracker />
        <div id="site-content">{children}</div>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
