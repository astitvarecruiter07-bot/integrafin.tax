import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Tax & Accounting Services in Katy, TX | IntegraFin",
  description: "Comprehensive tax expert services in Katy, TX. We offer business tax & accounting, individual tax preparation, IRS resolution, and startup advisory. Schedule a free consultation today.",
  alternates: { canonical: "https://integrafin.tax/services" },
  openGraph: {
    title: "Tax & Accounting Services in Katy, TX | IntegraFin",
    description: "Expert tax preparation, bookkeeping, and IRS resolution services for businesses and individuals in Katy, Texas.",
    url: "https://integrafin.tax/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
