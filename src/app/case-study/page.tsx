import type { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

const pageUrl = "https://integrafin.tax/case-study";
const pageDescription = "Review illustrative tax, bookkeeping, reporting, and business-setup workflows. These scenarios are not client testimonials or promised results.";

const breadcrumbSchema = buildBreadcrumbSchema(pageUrl, [
    { name: "Home", item: "https://integrafin.tax/" },
    { name: "Workflow Examples", item: pageUrl },
]);

const webPageSchema = buildWebPageSchema({
    url: pageUrl,
    name: "Tax & Accounting Workflow Examples | IntegraFin",
    description: pageDescription,
});

export const metadata: Metadata = {
    title: 'Tax & Accounting Workflow Examples | IntegraFin',
    description: pageDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
        title: 'Tax & Accounting Workflow Examples | IntegraFin',
        url: pageUrl,
    },
};

export default function CaseStudyPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <CaseStudyClient />
        </>
    );
}
