import type { Metadata } from "next";
import StateServicesPage from "@/components/StateServicesPage";
import { highTaxStateServicePages } from "@/data/highTaxStateServicePages";

const pageData = highTaxStateServicePages["new-jersey-tax-accounting-services"];

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  alternates: { canonical: pageData.pageProps.pageUrl },
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.openGraphDescription,
    url: pageData.pageProps.pageUrl,
  },
};

export default function NewJerseyTaxAccountingServicesPage() {
  return <StateServicesPage {...pageData.pageProps} />;
}
