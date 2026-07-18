import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HoustonIrsServicePage from "@/components/HoustonIrsServicePage";
import {
  houstonIrsServicePageList,
  houstonIrsServicePages,
  isHoustonIrsServiceSlug,
} from "@/data/houstonIrsServicePages";

const siteUrl = "https://integrafin.tax";

export const dynamicParams = false;

export function generateStaticParams() {
  return houstonIrsServicePageList.map(({ slug }) => ({ service: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;

  if (!isHoustonIrsServiceSlug(service)) {
    return { robots: { index: false, follow: false } };
  }

  const data = houstonIrsServicePages[service];
  const url = `${siteUrl}${data.path}`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: [data.primaryKeyword, ...data.supportingKeywords],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url,
      type: "website",
      siteName: "IntegraFin",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: data.serviceName }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function HoustonIrsPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;

  if (!isHoustonIrsServiceSlug(service)) {
    notFound();
  }

  return <HoustonIrsServicePage data={houstonIrsServicePages[service]} />;
}
