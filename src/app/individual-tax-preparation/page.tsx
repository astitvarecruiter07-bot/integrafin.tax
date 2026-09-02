import type { Metadata } from "next";
import ServiceLandingPage from "@/components/ServiceLandingPage";
import { serviceLandingPages } from "@/data/serviceLandingPages";

const data = serviceLandingPages["individual-tax-preparation"];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: data.url },
  robots: { index: true, follow: true },
  openGraph: {
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IntegraFin Tax & Accounting" }],
    title: data.metaTitle,
    description: data.metaDescription,
    url: data.url,
  },
};

export default function IndividualTaxPreparationPage() {
  return <ServiceLandingPage data={data} />;
}
