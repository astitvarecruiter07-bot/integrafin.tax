import type { Metadata } from "next";
import FocusedTaxCalculatorPage from "@/app/tax-calculator/FocusedTaxCalculatorPage";
import { calculatorLandingConfigs } from "@/app/tax-calculator/calculatorLandingConfig";

const config = calculatorLandingConfigs["1099"];
const pageUrl = `https://integrafin.tax${config.path}`;

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: { title: config.title, description: config.description, url: pageUrl, type: "website" },
};

export default function Tax1099CalculatorPage() {
  return <FocusedTaxCalculatorPage variant="1099" />;
}
