import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

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
  return <ServicesContent />;
}
