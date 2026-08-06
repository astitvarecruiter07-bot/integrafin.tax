import type { Metadata } from "next";
import TaxCalculatorClient from "./TaxCalculatorClient";
import {
    buildBreadcrumbSchema,
    buildFaqSchema,
    buildWebPageSchema,
    organizationRef,
} from "@/lib/seo/schema";
import { calculatorLandingConfigs } from "./calculatorLandingConfig";

const pageUrl = "https://integrafin.tax/tax-calculator";
const applicationId = `${pageUrl}#application`;

export const metadata: Metadata = {
    title: "2025 & 2026 Federal Tax Calculator | Refund Estimator",
    description:
        "Estimate 2025 or 2026 federal income tax, refund or balance due, self-employment tax, capital gains, deductions, credits, and filing scenarios using IRS-sourced tables.",
    alternates: { canonical: pageUrl },
    robots: { index: true, follow: true },
    openGraph: {
        title: "2025 & 2026 Federal Tax Calculator | Refund Estimator",
        description:
            "Free federal tax estimator for income tax, refund or balance due, self-employment tax, capital gains, deductions, credits, and filing scenarios.",
        url: pageUrl,
        type: "website",
    },
};

const calculatorFaqs = calculatorLandingConfigs.hub.faqs;

const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": applicationId,
    name: "2025 and 2026 Federal Tax Calculator & Refund Estimator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    url: pageUrl,
    isAccessibleForFree: true,
    description:
        "A free federal tax estimator for 2025 and 2026 income tax, refund or balance due, self-employment tax, capital gains, deductions, credits, and filing scenarios.",
    featureList: [
        "2025 federal income tax estimate",
        "2026 federal tax planning estimate",
        "Refund or balance due estimate",
        "Self-employment tax estimate",
        "Capital gains tax estimate",
        "Filing scenario comparison",
    ],
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    publisher: organizationRef,
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
};

const faqSchema = buildFaqSchema(pageUrl, calculatorFaqs);

const breadcrumbSchema = buildBreadcrumbSchema(pageUrl, [
    { name: "Home", item: "https://integrafin.tax/" },
    { name: "Federal Tax Calculator", item: pageUrl },
]);

const webPageSchema = buildWebPageSchema({
    url: pageUrl,
    name: "2025 & 2026 Federal Tax Calculator | Refund Estimator",
    description:
        "Estimate 2025 or 2026 federal income tax, refund or balance due, self-employment tax, capital gains, deductions, credits, and filing scenarios using IRS-sourced tables.",
    mainEntityId: applicationId,
});

export default function TaxCalculatorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
            />
            <TaxCalculatorClient />
        </>
    );
}
