import type { Metadata } from 'next';
import Script from 'next/script';
import BookkeepingCleanupCalculatorClient from './BookkeepingCleanupCalculatorClient';
import { serializeJsonLd } from '@/lib/seo/jsonLd';

const title = 'Bookkeeping Cleanup Calculator | IntegraFin';
const description = 'Answer nine simple questions to estimate your bookkeeping cleanup complexity, deadline urgency, and next steps. No records or account details required.';
const canonical = 'https://integrafin.tax/bookkeeping-cleanup-calculator';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: 'website', images: ['/og-image.jpg'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${canonical}#calculator`,
      name: 'Bookkeeping Cleanup Calculator',
      url: canonical,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      description,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      provider: { '@type': 'Organization', name: 'IntegraFin Tax & Accounting', url: 'https://integrafin.tax' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://integrafin.tax/' },
        { '@type': 'ListItem', position: 2, name: 'Bookkeeping Cleanup Calculator', item: canonical },
      ],
    },
  ],
};

export default function BookkeepingCleanupCalculatorPage() {
  return (
    <>
      <Script id="bookkeeping-cleanup-schema" type="application/ld+json">
        {serializeJsonLd(structuredData)}
      </Script>
      <BookkeepingCleanupCalculatorClient />
    </>
  );
}
