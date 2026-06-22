import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TexasCityLandingPage from "@/components/TexasCityLandingPage";
import { dynamicTexasCityPages, getTexasCityPage } from "@/data/texasCityLandingData";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return dynamicTexasCityPages.map(({ slug }) => ({ city: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const page = getTexasCityPage(city);
  if (!page || !dynamicTexasCityPages.some(({ slug }) => slug === city)) return {};

  const url = `https://integrafin.tax/texas/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: "website",
      siteName: "IntegraFin",
    },
  };
}

export default async function TexasCityPage({ params }: Props) {
  const { city } = await params;
  const page = getTexasCityPage(city);
  if (!page || !dynamicTexasCityPages.some(({ slug }) => slug === city)) notFound();

  return <TexasCityLandingPage page={page} />;
}
