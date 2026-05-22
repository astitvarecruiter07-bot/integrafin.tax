import type { Metadata } from "next";
import StateServicesPage from "@/components/StateServicesPage";

export const metadata: Metadata = {
  title: "New York Tax and Accounting Services | IntegraFin",
  description:
    "New York tax and accounting support for small businesses and individuals. Services include bookkeeping, payroll, tax filing, and IRS resolution.",
  alternates: { canonical: "https://integrafin.tax/new-york-tax-accounting-services" },
  openGraph: {
    title: "New York Tax and Accounting Services | IntegraFin",
    description:
      "Tax planning, bookkeeping, payroll, and tax resolution support for clients in New York.",
    url: "https://integrafin.tax/new-york-tax-accounting-services",
  },
};

export default function NewYorkTaxAccountingServicesPage() {
  return (
    <StateServicesPage
      stateName="New York"
      stateCode="NY"
      nearbyCities={["New York City", "Buffalo", "Rochester", "Albany", "Yonkers", "Syracuse"]}
    />
  );
}
