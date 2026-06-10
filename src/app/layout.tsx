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
  title: 'Tax Accountant Katy TX | IntegraFin Tax Expert Services',
  description: 'IntegraFin provides tax expert services in Katy, TX offering tax preparation, bookkeeping, payroll, and IRS resolution. Schedule your free consultation today. Call (832) 647-1819.',
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
    title: 'Tax Accountant Katy TX | IntegraFin Tax Expert Services',
    description: 'IntegraFin tax experts in Katy TX - tax preparation, bookkeeping, IRS help, and payroll. Free consultation available.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'IntegraFin Tax Expert Katy TX' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Accountant Katy TX | IntegraFin Tax Expert Services',
    description: 'IntegraFin tax experts in Katy TX - tax, bookkeeping, IRS help. Free consultation.',
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
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
