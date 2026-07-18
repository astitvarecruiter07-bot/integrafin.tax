import type { Metadata } from "next";
import TexasCityLandingPage from "@/components/TexasCityLandingPage";
import { getTexasCityPage } from "@/data/texasCityLandingData";

const page = getTexasCityPage("houston-tax-accountant")!;
const url = `https://integrafin.tax/texas/${page.slug}`;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  keywords: [page.primaryKeyword, ...page.supportingKeywords],
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: {
    title: page.title,
    description: page.description,
    url,
    type: "website",
    siteName: "IntegraFin",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IntegraFin Houston-area tax and accounting services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
    images: ["/og-image.jpg"],
  },
};

export default function HoustonTaxAccountantPage() {
  return <TexasCityLandingPage page={page} />;
}
