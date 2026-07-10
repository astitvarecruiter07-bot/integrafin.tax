import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { localBusinessSchema, organizationSchema } from "@/lib/seo/schema";
import Script from "next/script";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-GRMDY21D72" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GRMDY21D72');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Navbar />
        <div id="site-content">{children}</div>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
