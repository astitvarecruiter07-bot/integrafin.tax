import type { Metadata } from "next";
import CityServicesPage from "@/components/CityServicesPage";

export const metadata: Metadata = {
  title: "Pittsburgh Tax Accountant for Small Business Tax Support | IntegraFin",
  description:
    "Need a tax accountant in Pittsburgh, PA? IntegraFin supports business tax filing, bookkeeping, payroll workflows, and IRS notice response.",
  alternates: { canonical: "https://integrafin.tax/pennsylvania/pittsburgh-tax-accountant" },
  openGraph: {
    title: "Pittsburgh Tax Accountant for Small Business Tax Support | IntegraFin",
    description:
      "Tax, bookkeeping, payroll, and IRS support for Pittsburgh business owners and individuals.",
    url: "https://integrafin.tax/pennsylvania/pittsburgh-tax-accountant",
  },
};

export default function PittsburghTaxAccountantPage() {
  return (
    <CityServicesPage
      cityName="Pittsburgh"
      stateName="Pennsylvania"
      stateCode="PA"
      pageUrl="https://integrafin.tax/pennsylvania/pittsburgh-tax-accountant"
      statePageUrl="https://integrafin.tax/pennsylvania-tax-accounting-services"
      primaryKeyword="tax accountant pittsburgh"
      secondaryKeywords={[
        "pittsburgh tax preparation services",
        "bookkeeping services pittsburgh",
        "small business accountant pittsburgh",
        "pittsburgh payroll tax support",
        "irs tax help pittsburgh",
      ]}
      heroDescription="IntegraFin helps Pittsburgh clients manage tax filing, bookkeeping quality, payroll processes, and responses to IRS tax issues."
      directAnswer="If you run a business in Pittsburgh and want cleaner books with fewer tax surprises, we can help. Our team supports monthly accounting workflows, tax preparation, and compliance tasks so you can focus on operations and growth."
      serviceFocus={[
        "Business tax filing preparation and return support",
        "Bookkeeping organization, cleanup, and monthly reporting",
        "Payroll tax process setup and recurring compliance workflow support",
        "Tax planning support for owners and leadership teams",
        "IRS notice support and structured response planning",
      ]}
      whoWeHelp={[
        "Pittsburgh small businesses and owner-managed teams",
        "Independent contractors and consultants",
        "LLCs and S-Corps with recurring filing obligations",
        "Businesses improving accounting quality for better decisions",
        "Individuals needing annual tax filing support",
      ]}
      localScenarios={[
        "Owners trying to fix inconsistent books before filing deadlines",
        "Businesses with payroll filing pressure and process gaps",
        "Teams preparing records for lenders or strategic planning",
        "Taxpayers needing support after receiving formal notices",
      ]}
      whyChoose={[
        "Execution-focused support built for SMB realities",
        "Clear monthly process that improves over time",
        "Practical guidance across tax, payroll, and accounting",
        "Reliable communication during high-stress filing periods",
      ]}
      faqItems={[
        {
          question: "Do you support Pittsburgh businesses remotely?",
          answer:
            "Yes. We provide secure remote support for bookkeeping, tax filings, payroll workflows, and planning.",
        },
        {
          question: "Can you help with both bookkeeping and tax preparation?",
          answer:
            "Yes. We align bookkeeping and tax preparation so filings are based on accurate records.",
        },
        {
          question: "Do you work with businesses that have payroll complexity?",
          answer:
            "Yes. We help establish a repeatable payroll process and support related compliance obligations.",
        },
        {
          question: "Can you help us respond to IRS letters quickly?",
          answer:
            "Yes. We help review the notice, prioritize immediate actions, and prepare required documentation.",
        },
        {
          question: "What is the onboarding process?",
          answer:
            "We start with a consultation, review your current setup, then create a clear action plan by priority.",
        },
      ]}
      resourceLinks={[
        { href: "/pennsylvania-tax-accounting-services", label: "Pennsylvania Tax and Accounting Services Hub" },
        { href: "/services#business", label: "Business Tax and Accounting Services" },
        { href: "/blog/payroll-best-practices", label: "Payroll Best Practices Guide" },
        { href: "/blog/tax-resolution-options", label: "Tax Resolution Options" },
      ]}
      nearbyAreas={["Mount Lebanon", "Cranberry Township", "Monroeville", "Bethel Park", "Wexford", "Penn Hills"]}
      lastReviewed="May 23, 2026"
    />
  );
}
