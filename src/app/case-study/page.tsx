import type { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";

export const metadata: Metadata = {
    title: 'Tax & Accounting Workflow Examples | IntegraFin',
    description: 'Review illustrative tax, bookkeeping, reporting, and business-setup workflows. These scenarios are not client testimonials or promised results.',
    alternates: { canonical: 'https://integrafin.tax/case-study' },
    openGraph: {
        title: 'Tax & Accounting Workflow Examples | IntegraFin',
        url: 'https://integrafin.tax/case-study',
    },
};

export default function CaseStudyPage() {
    return <CaseStudyClient />;
}
