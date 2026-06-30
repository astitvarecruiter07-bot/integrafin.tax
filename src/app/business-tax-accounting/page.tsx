import type { Metadata } from "next";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import { serviceLandingPages } from "@/data/serviceLandingPages";

const data = serviceLandingPages["business-tax-accounting"];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: data.url },
  robots: { index: true, follow: true },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: data.url,
  },
};

export default function BusinessTaxAccountingPage() {
  return <ServiceLandingPage data={data} />;
}
