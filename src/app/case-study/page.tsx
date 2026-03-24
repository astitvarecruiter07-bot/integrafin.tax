import type { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";

export const metadata: Metadata = {
    title: 'Client Success Stories & Tax Case Studies | IntegraFin',
    description: 'Explore how IntegraFin helps businesses and individuals optimize taxes, resolve IRS audits, and scale financial operations with CPA precision.',
    alternates: { canonical: 'https://integrafin.tax/case-study' },
    openGraph: {
        title: 'Client Success Stories & Tax Case Studies | IntegraFin',
        url: 'https://integrafin.tax/case-study',
    },
};

export default function CaseStudyPage() {
    return <CaseStudyClient />;
}
