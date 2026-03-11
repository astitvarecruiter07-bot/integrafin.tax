import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IntegraFin | Expert Tax, Accounting & Business Advisory Services",
    template: "%s | IntegraFin",
  },
  description:
    "Professional tax, accounting, and business advisory services in Katy, TX. Expert CPAs & financial advisors for individuals and businesses. Maximize deductions, ensure compliance.",
  keywords: [
    "tax services",
    "accounting services",
    "business advisory",
    "CPA",
    "tax filing",
    "bookkeeping",
    "payroll",
    "Katy TX",
    "IntegraFin",
    "tax planning",
    "IRS compliance",
    "tax resolution",
  ],
  authors: [{ name: "IntegraFin LLC" }],
  creator: "IntegraFin",
  publisher: "IntegraFin LLC",
  metadataBase: new URL("https://integrafin.tax"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://integrafin.tax",
    siteName: "IntegraFin",
    title: "IntegraFin | Expert Tax, Accounting & Business Advisory Services",
    description:
      "Professional tax, accounting, and business advisory services by IntegraFin. Trusted CPAs in Katy, TX.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IntegraFin - Tax & Accounting Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IntegraFin | Expert Tax, Accounting & Business Advisory Services",
    description:
      "Professional tax, accounting, and business advisory services by IntegraFin.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://integrafin.tax",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "IntegraFin LLC",
  url: "https://integrafin.tax",
  logo: "https://integrafin.tax/logo.png",
  description:
    "Professional tax, accounting, and business advisory services. Expert CPAs & financial advisors for individuals and businesses.",
  telephone: "+1-832-647-1819",
  email: "contact@integrafin.tax",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "2039 N Mason Rd, Suite 604",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77449",
      addressCountry: "US",
    },
    {
      "@type": "PostalAddress",
      streetAddress:
        "Block No. 214, 1st Floor, Brij Bhumi Complex, CA Road, Near Telephone Exchange Square, Lakadganj",
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      postalCode: "440008",
      addressCountry: "IN",
    },
  ],
  sameAs: [
    "https://www.facebook.com/integrafintax",
    "https://www.instagram.com/integrafinllc/",
    "https://www.linkedin.com/company/integrafin/",
    "https://x.com/Integrafintax/",
  ],
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tax and Accounting Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax Preparation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Accounting Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bookkeeping" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Payroll Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Advisory" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax Planning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tax Resolution" } }
    ]
  },
  priceRange: "$$",
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
