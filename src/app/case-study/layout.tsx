import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Case Studies & Client Success",
    description: "Explore IntegraFin's client success stories and case studies demonstrating real results in tax planning, bookkeeping, and growth strategies for businesses.",
    keywords: [
        "case studies",
        "client success",
        "tax planning case study",
        "accounting success stories",
        "IntegraFin",
    ],
    openGraph: {
        title: "Case Studies & Client Success | IntegraFin",
        description: "Explore IntegraFin's client success stories and case studies demonstrating real results in tax planning and growth strategies.",
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
