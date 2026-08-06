import type { Metadata } from "next";
import FocusedTaxCalculatorPage from "@/app/tax-calculator/FocusedTaxCalculatorPage";
import { calculatorLandingConfigs } from "@/app/tax-calculator/calculatorLandingConfig";

const config = calculatorLandingConfigs.capitalGains;
const pageUrl = `https://integrafin.tax${config.path}`;

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: { title: config.title, description: config.description, url: pageUrl, type: "website" },
};

export default function CapitalGainsTaxCalculatorPage() {
  return <FocusedTaxCalculatorPage variant="capitalGains" />;
}
