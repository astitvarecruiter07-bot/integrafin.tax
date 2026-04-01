import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { localBusinessSchema, organizationSchema } from "@/lib/seo/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://integrafin.tax'),
  title: {
    default: 'Tax Accountant Katy TX | IntegraFin Tax Expert Services',
    template: '%s | IntegraFin',
  },
  description: 'IntegraFin provides tax expert services in Katy, TX offering tax preparation, bookkeeping, payroll, and IRS resolution. Schedule your free consultation today. Call (832) 647-1819.',
  keywords: ['Tax Accountant Katy TX', 'Tax Expert Services Katy Texas', 'IRS Tax Resolution Katy TX', 'Business Accounting Katy TX', 'Bookkeeping Katy TX', 'Tax Preparation Houston TX'],
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
    description: 'IntegraFin tax experts in Katy TX — tax preparation, bookkeeping, IRS help, and payroll. Free consultation available.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'IntegraFin Tax Expert Katy TX' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Accountant Katy TX | IntegraFin Tax Expert Services',
    description: 'IntegraFin tax experts in Katy TX — tax, bookkeeping, IRS help. Free consultation.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
