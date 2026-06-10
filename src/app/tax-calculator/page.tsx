import type { Metadata } from "next";
import TaxCalculatorClient from "./TaxCalculatorClient";

export const metadata: Metadata = {
    title: 'Free 2026 Federal Tax Calculator | IntegraFin',
    description: 'Calculate your 2026 federal income tax estimate instantly. Estimate liability for self-employment, capital gains, and itemized deductions with current IRS tables.',
    alternates: { canonical: 'https://integrafin.tax/tax-calculator' },
    openGraph: {
        title: 'Free 2026 Federal Tax Calculator | IntegraFin',
        url: 'https://integrafin.tax/tax-calculator',
    },
};

export default function TaxCalculatorPage() {
    return <TaxCalculatorClient />;
}
