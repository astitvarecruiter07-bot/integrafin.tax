import type { Metadata } from "next";
import TaxCalculatorClient from "./TaxCalculatorClient";

const pageUrl = "https://integrafin.tax/tax-calculator";

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

const calculatorFaqs = [
    {
        question: "How accurate is this tax calculator?",
        answer:
            "It provides a planning estimate using selected-year federal brackets, standard deductions, Child Tax Credit amounts, Social Security wage bases, and capital-gain thresholds. Final tax can change after full Form 1040 details, phaseouts, state taxes, penalties, and refundable-credit rules are reviewed.",
    },
    {
        question: "Does this calculator estimate my 2025 tax refund?",
        answer:
            "Yes. Choose 2025 filing, enter income, withholding, deductions, credits, and qualifying children, and the calculator estimates a federal refund or balance due.",
    },
    {
        question: "Can I use this for 2026 tax planning?",
        answer:
            "Yes. Choose 2026 planning to estimate federal income tax, self-employment tax, long-term capital gains, and quarterly planning amounts using 2026 IRS and SSA figures.",
    },
    {
        question: "Does this include self-employment tax?",
        answer:
            "Yes. The self-employment tab estimates Social Security and Medicare tax on 92.35% of net self-employment earnings and coordinates with optional W-2 wages.",
    },
    {
        question: "Does this include state income tax?",
        answer:
            "No. This calculator currently focuses on federal estimates. State income tax, local tax, franchise tax, and sales tax are outside the calculator scope.",
    },
    {
        question: "Does this include capital gains tax?",
        answer:
            "Yes. The capital gains tab estimates short-term gains as ordinary income and long-term gains using selected-year 0%, 15%, and 20% thresholds. It does not include NIIT or special capital-gain rates.",
    },
    {
        question: "What tax brackets does this calculator use?",
        answer:
            "It uses IRS-published 2025 federal income tax brackets and 2026 inflation-adjusted federal tax brackets, plus selected-year standard deduction and long-term capital-gain thresholds.",
    },
    {
        question: "Why is my refund different from my tax liability?",
        answer:
            "Tax liability is the estimated tax after deductions and credits. Refund or balance due compares that liability with withholding and estimated payments already paid.",
    },
    {
        question: "Should I use standard or itemized deductions?",
        answer:
            "Use the larger deduction only after reviewing your actual deductible expenses. The calculator lets you compare the standard deduction with an itemized deduction estimate.",
    },
    {
        question: "When are 2026 estimated tax payments due?",
        answer:
            "For 2026 planning, the calculator displays estimated payment dates of April 15, 2026, June 15, 2026, September 15, 2026, and January 15, 2027.",
    },
];

const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
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
    publisher: {
        "@type": "Organization",
        name: "IntegraFin Tax & Accounting",
        url: "https://integrafin.tax",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: calculatorFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://integrafin.tax/",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Federal Tax Calculator",
            item: pageUrl,
        },
    ],
};

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
            <TaxCalculatorClient />
        </>
    );
}
