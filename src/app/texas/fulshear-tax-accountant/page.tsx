import type { Metadata } from "next";
import TexasCityLandingPage from "@/components/TexasCityLandingPage";
import { getTexasCityPage } from "@/data/texasCityLandingData";

const page = getTexasCityPage("fulshear-tax-accountant")!;
const url = `https://integrafin.tax/texas/${page.slug}`;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: url },
  robots: { index: true, follow: true },
  openGraph: { title: page.title, description: page.description, url, type: "website", siteName: "IntegraFin" },
};

export default function FulshearTaxAccountantPage() {
  return <TexasCityLandingPage page={page} />;
}
