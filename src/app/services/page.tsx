import { Metadata } from "next";
import ServicesContent from "./ServicesContent";
import { buildBreadcrumbSchema, buildWebPageSchema, SCHEMA_IDS } from "@/lib/seo/schema";

const pageUrl = "https://integrafin.tax/services";

const servicesPageSchema = buildWebPageSchema({
  url: pageUrl,
  type: "CollectionPage",
  name: "Tax & Accounting Services in Katy, TX | IntegraFin",
  description:
    "IntegraFin service hub for business tax accounting, individual tax preparation, tax resolution, bookkeeping cleanup, payroll tax support, QuickBooks bookkeeping, and startup advisory.",
  mainEntityId: SCHEMA_IDS.localBusiness,
});

const breadcrumbSchema = buildBreadcrumbSchema(pageUrl, [
  { name: "Home", item: "https://integrafin.tax/" },
  { name: "Services", item: pageUrl },
]);

export const metadata: Metadata = {
  title: "Tax & Accounting Services in Katy, TX | IntegraFin",
  description: "IntegraFin service hub for business tax accounting, individual tax preparation, tax resolution, bookkeeping cleanup, payroll tax support, QuickBooks bookkeeping, and startup advisory.",
  alternates: { canonical: "https://integrafin.tax/services" },
  openGraph: {
    title: "Tax & Accounting Services in Katy, TX | IntegraFin",
    description: "Explore focused IntegraFin tax, bookkeeping, payroll, QuickBooks, tax resolution, and business formation service pages.",
    url: "https://integrafin.tax/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ServicesContent />
    </>
  );
}
