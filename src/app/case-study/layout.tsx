import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tax & Accounting Workflow Examples | IntegraFin",
    description: "Review illustrative tax, bookkeeping, reporting, and business-setup workflow examples. These scenarios are not client testimonials or promised results.",
    openGraph: {
        title: "Tax & Accounting Workflow Examples | IntegraFin",
        description: "Illustrative service scenarios showing how records, scope, and next steps may be organized without promising client outcomes.",
        type: "website",
        url: "https://integrafin.tax/case-study",
    },
    alternates: {
        canonical: "https://integrafin.tax/case-study",
    },
};

export default function CaseStudyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
