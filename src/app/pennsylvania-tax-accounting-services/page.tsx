import type { Metadata } from "next";
import StateServicesPage from "@/components/StateServicesPage";

export const metadata: Metadata = {
  title: "Tax Accountant Pennsylvania Services for Businesses | IntegraFin",
  description:
    "Need a tax accountant in Pennsylvania? IntegraFin supports bookkeeping, payroll, tax filing, tax planning, and IRS resolution for businesses and individuals.",
  alternates: { canonical: "https://integrafin.tax/pennsylvania-tax-accounting-services" },
  openGraph: {
    title: "Tax Accountant Pennsylvania Services for Businesses | IntegraFin",
    description:
      "Bookkeeping, business tax, payroll compliance, and tax resolution support for Pennsylvania clients.",
    url: "https://integrafin.tax/pennsylvania-tax-accounting-services",
  },
};

export default function PennsylvaniaTaxAccountingServicesPage() {
  return (
    <StateServicesPage
      stateName="Pennsylvania"
      stateCode="PA"
      primaryKeyword="tax accountant pennsylvania"
      secondaryKeywords={[
        "pennsylvania tax services",
        "bookkeeping services pennsylvania",
        "small business tax accountant pa",
        "tax resolution pennsylvania",
        "pennsylvania payroll compliance",
      ]}
      heroDescription="If you need a tax accountant in Pennsylvania, IntegraFin provides business and individual support for tax filing, bookkeeping, payroll, and IRS tax issue resolution."
      directAnswer="We help Pennsylvania clients build a reliable accounting and tax process that works all year, not only at filing time. Our approach combines monthly bookkeeping discipline, tax planning, payroll workflow support, and practical guidance when tax notices or compliance issues arise."
      serviceFocus={[
        "Business tax preparation and proactive planning support",
        "Monthly bookkeeping, reconciliations, and reporting support",
        "Payroll process setup and payroll compliance workflow guidance",
        "Sales and use tax filing process support for qualified businesses",
        "IRS communication support and tax resolution preparation",
      ]}
      whoWeHelp={[
        "Pennsylvania small businesses and family-owned companies",
        "LLCs, S-Corps, partnerships, and independent professionals",
        "Contractors, consultants, and service businesses with growth plans",
        "Business owners who need clean books before tax season",
        "Individuals who need year-end tax filing and planning guidance",
      ]}
      compliancePoints={[
        "Federal and Pennsylvania filing workflow support for accurate submissions",
        "Support for Pennsylvania sales and use tax process requirements",
        "Payroll tax and withholding workflow support for employers",
        "Guidance on local tax process coordination where applicable",
        "Structured recordkeeping process to strengthen audit readiness",
      ]}
      whyChoose={[
        "Hands-on support that turns complex filings into clear steps",
        "Consistent bookkeeping and tax process alignment throughout the year",
        "Timely follow-through on deadlines, notices, and reporting tasks",
        "Actionable recommendations tailored to small business operations",
      ]}
      nearbyCities={["Philadelphia", "Pittsburgh", "Allentown", "Harrisburg", "Erie", "Reading"]}
      cityPageLinks={[
        { href: "/pennsylvania/philadelphia-tax-accountant", label: "Philadelphia Tax Accountant Services" },
        { href: "/pennsylvania/pittsburgh-tax-accountant", label: "Pittsburgh Tax Accountant Services" },
      ]}
      faqItems={[
        {
          question: "Can you support businesses in Philadelphia and Pittsburgh?",
          answer:
            "Yes. We support clients across Pennsylvania, including Philadelphia, Pittsburgh, and other major business areas.",
        },
        {
          question: "Do you offer both bookkeeping and tax filing support?",
          answer:
            "Yes. We combine monthly bookkeeping support with tax filing and planning so your records stay aligned.",
        },
        {
          question: "Can you help with IRS letters and tax debt issues?",
          answer:
            "Yes. We help review notices, prepare documentation, and support a structured response plan.",
        },
        {
          question: "Is remote service available for Pennsylvania clients?",
          answer:
            "Yes. We work remotely through secure document sharing and virtual consultations.",
        },
        {
          question: "What should I prepare before the first consultation?",
          answer:
            "Bring recent returns, bookkeeping reports, payroll summaries, and any notices so we can map your priorities quickly.",
        },
      ]}
      resourceLinks={[
        { href: "/pennsylvania/philadelphia-tax-accountant", label: "Philadelphia Tax Accountant Services" },
        { href: "/pennsylvania/pittsburgh-tax-accountant", label: "Pittsburgh Tax Accountant Services" },
        { href: "/blog/small-business-accounting-tips", label: "Essential Accounting Tips for Small Businesses" },
        { href: "/blog/tax-resolution-options", label: "Understanding Your Tax Resolution Options" },
        { href: "/blog/irs-compliance-guide", label: "Complete Guide to IRS Compliance for Businesses" },
        { href: "/services#tax-resolution", label: "Tax Resolution Services" },
      ]}
      pageUrl="https://integrafin.tax/pennsylvania-tax-accounting-services"
      lastReviewed="May 23, 2026"
    />
  );
}
