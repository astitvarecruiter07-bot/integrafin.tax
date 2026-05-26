import type { Metadata } from "next";
import StateServicesPage from "@/components/StateServicesPage";

export const metadata: Metadata = {
  title: "Tax Accountant New York Services for Businesses | IntegraFin",
  description:
    "Need a tax accountant in New York? IntegraFin supports bookkeeping, payroll, tax filing, tax planning, and IRS resolution for businesses and individuals.",
  keywords: [
    "tax accountant new york",
    "new york tax preparation",
    "bookkeeping services new york",
    "small business accountant ny",
    "irs help new york",
  ],
  alternates: { canonical: "https://integrafin.tax/new-york-tax-accounting-services" },
  openGraph: {
    title: "Tax Accountant New York Services for Businesses | IntegraFin",
    description:
      "Tax planning, bookkeeping, payroll, and tax resolution support for clients in New York.",
    url: "https://integrafin.tax/new-york-tax-accounting-services",
  },
};

export default function NewYorkTaxAccountingServicesPage() {
  return (
    <StateServicesPage
      stateName="New York"
      stateCode="NY"
      primaryKeyword="tax accountant new york"
      secondaryKeywords={[
        "new york tax preparation",
        "bookkeeping services new york",
        "small business accountant ny",
        "irs help new york",
        "new york payroll compliance",
      ]}
      heroDescription="If you need a tax accountant in New York, IntegraFin helps businesses and individuals manage bookkeeping, payroll, tax filing, and tax resolution with a structured process."
      directAnswer="We support New York clients with practical tax and accounting workflows built for ongoing compliance. From bookkeeping cleanup to filing coordination and IRS support, we help you stay organized, reduce filing risk, and make smarter planning decisions."
      serviceFocus={[
        "Business tax filing support and strategic tax planning",
        "Monthly bookkeeping, reconciliation, and financial reporting support",
        "Payroll workflow setup and recurring compliance guidance",
        "Sales tax process support for businesses with taxable activity",
        "IRS notice handling support and tax resolution preparation",
      ]}
      whoWeHelp={[
        "New York small businesses and growth-stage companies",
        "LLCs, S-Corps, partnerships, and self-employed professionals",
        "Service businesses with multi-state or remote operations",
        "Founders who need accounting systems and process stability",
        "Individuals who need reliable annual tax preparation",
      ]}
      compliancePoints={[
        "Federal and New York filing workflow support for businesses and individuals",
        "Sales tax process guidance for registration, filing, and record readiness",
        "Payroll withholding and reporting workflow support for employers",
        "Support for local tax process considerations for NYC-based operations",
        "Document retention and reporting process support for audit readiness",
      ]}
      whyChoose={[
        "Clear communication and deadline-focused service delivery",
        "Integrated support for bookkeeping, tax, payroll, and resolution",
        "Process-based approach that improves reporting quality over time",
        "Practical recommendations designed for owner-operated businesses",
      ]}
      nearbyCities={["New York City", "Buffalo", "Rochester", "Albany", "Yonkers", "Syracuse"]}
      cityPageLinks={[
        { href: "/new-york/nyc-tax-accountant", label: "NYC Tax Accountant Services" },
        { href: "/new-york/buffalo-tax-accountant", label: "Buffalo Tax Accountant Services" },
      ]}
      faqItems={[
        {
          question: "Do you work with New York City and upstate clients?",
          answer:
            "Yes. We support clients across New York, including NYC and upstate regions, with remote-first workflows.",
        },
        {
          question: "Can you support both business and personal tax filing?",
          answer:
            "Yes. We help with business tax filings and individual tax preparation, including planning coordination.",
        },
        {
          question: "Do you help with payroll and sales tax process setup?",
          answer:
            "Yes. We help create a repeatable workflow for payroll and sales tax so filings stay accurate and timely.",
        },
        {
          question: "Can you help if my bookkeeping is behind?",
          answer:
            "Yes. We provide bookkeeping cleanup and monthly reporting support to restore financial clarity.",
        },
        {
          question: "How should I start with IntegraFin?",
          answer:
            "Schedule a consultation and we will map your filing obligations, current gaps, and next-step plan.",
        },
      ]}
      resourceLinks={[
        { href: "/new-york/nyc-tax-accountant", label: "NYC Tax Accountant Services" },
        { href: "/new-york/buffalo-tax-accountant", label: "Buffalo Tax Accountant Services" },
        { href: "/blog/tax-planning-strategies-2025", label: "Top Tax Planning Strategies for 2025" },
        { href: "/blog/payroll-best-practices", label: "Payroll Best Practices for Business Owners" },
        { href: "/blog/irs-compliance-guide", label: "Complete Guide to IRS Compliance for Businesses" },
        { href: "/services#business", label: "Business Tax and Accounting Services" },
      ]}
      pageUrl="https://integrafin.tax/new-york-tax-accounting-services"
      lastReviewed="May 23, 2026"
    />
  );
}
