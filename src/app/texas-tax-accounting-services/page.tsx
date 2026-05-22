import type { Metadata } from "next";
import StateServicesPage from "@/components/StateServicesPage";

export const metadata: Metadata = {
  title: "Texas Tax and Accounting Services | IntegraFin",
  description:
    "Tax and accounting services in Texas for businesses and individuals. Get support for bookkeeping, payroll, tax planning, and IRS tax resolution.",
  alternates: { canonical: "https://integrafin.tax/texas-tax-accounting-services" },
  openGraph: {
    title: "Texas Tax and Accounting Services | IntegraFin",
    description:
      "Business tax preparation, bookkeeping, payroll, and IRS support for Texas clients.",
    url: "https://integrafin.tax/texas-tax-accounting-services",
  },
};

export default function TexasTaxAccountingServicesPage() {
  return (
    <StateServicesPage
      stateName="Texas"
      stateCode="TX"
      nearbyCities={["Houston", "Dallas", "Austin", "San Antonio", "Katy", "Fort Worth"]}
    />
  );
}
