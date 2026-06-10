import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Advanced Tax Calculator | Free Federal Tax Estimator 2026",
    description:
        "Free advanced tax calculator for 2026. Calculate federal income tax, self-employment tax, capital gains tax, and compare filing scenarios using current IRS tax tables.",
    openGraph: {
        title: "Advanced Tax Calculator | IntegraFin",
        description:
            "Free advanced tax calculator with federal income tax, self-employment tax, capital gains, and scenario comparison.",
        type: "website",
        url: "https://integrafin.tax/tax-calculator",
    },
    alternates: {
        canonical: "https://integrafin.tax/tax-calculator",
    },
};

const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "IntegraFin Tax Calculator 2026",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    description: "A comprehensive free tool to calculate federal income tax, self-employment tax, and capital gains for the 2026 tax year.",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
    },
    publisher: {
        "@type": "Organization",
        name: "IntegraFin LLC",
        url: "https://integrafin.tax"
    }
};

export default function TaxCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
            />
            {children}
        </>
    );
}
