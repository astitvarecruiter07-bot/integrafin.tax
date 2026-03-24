import type { Metadata } from "next";
import TaxCalculatorClient from "./TaxCalculatorClient";

export const metadata: Metadata = {
    title: 'Free 2024 Tax Refund Calculator | IntegraFin',
    description: 'Calculate your 2024 federal income tax refund or balance due instantly. Estimate liability for self-employment, capital gains, and itemized deductions with precision.',
    alternates: { canonical: 'https://integrafin.tax/tax-calculator' },
    openGraph: {
        title: 'Free 2024 Tax Refund Calculator | IntegraFin',
        url: 'https://integrafin.tax/tax-calculator',
    },
};

export default function TaxCalculatorPage() {
    return <TaxCalculatorClient />;
}
