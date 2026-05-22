import type { Metadata } from "next";
import StateServicesPage from "@/components/StateServicesPage";

export const metadata: Metadata = {
  title: "Pennsylvania Tax and Accounting Services | IntegraFin",
  description:
    "Pennsylvania tax and accounting services for SMBs and individuals. Get help with bookkeeping, payroll, tax filing, and IRS tax issues.",
  alternates: { canonical: "https://integrafin.tax/pennsylvania-tax-accounting-services" },
  openGraph: {
    title: "Pennsylvania Tax and Accounting Services | IntegraFin",
    description:
      "Bookkeeping, business tax, payroll compliance, and tax resolution support for Pennsylvania clients.",
    url: "https://integrafin.tax/pennsylvania-tax-accounting-services",
  },
};

export default function PennsylvaniaTaxAccountingServicesPage() {
  return (
    <StateServicesPage
      stateName="Pennsylvania"
      stateCode="PA"
      nearbyCities={["Philadelphia", "Pittsburgh", "Allentown", "Harrisburg", "Erie", "Reading"]}
    />
  );
}
