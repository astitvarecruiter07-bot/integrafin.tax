import type { Metadata } from 'next';
import Script from 'next/script';
import BookkeepingCostCalculatorClient from './BookkeepingCostCalculatorClient';
import { serializeJsonLd } from '@/lib/seo/jsonLd';

const title = 'Bookkeeping Cost Calculator | IntegraFin';
const description = 'Estimate monthly bookkeeping costs, catch-up pricing, workload, and first-year cost based on transactions, accounts, payroll, and service scope.';
const canonical = 'https://integrafin.tax/bookkeeping-cost-calculator';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  robots: { index: false, follow: true },
  openGraph: { title, description, url: canonical, type: 'website', images: ['/og-image.jpg'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'IntegraFin Bookkeeping Cost Calculator',
  url: canonical,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  description,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  provider: { '@type': 'Organization', name: 'IntegraFin Tax & Accounting', url: 'https://integrafin.tax' },
};

export default function BookkeepingCostCalculatorPage() {
  return (
    <>
      <Script id="bookkeeping-cost-schema" type="application/ld+json">
        {serializeJsonLd(structuredData)}
      </Script>
      <BookkeepingCostCalculatorClient />
    </>
  );
}
