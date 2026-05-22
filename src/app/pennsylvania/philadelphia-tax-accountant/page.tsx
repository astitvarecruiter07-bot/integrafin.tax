import type { Metadata } from "next";
import CityServicesPage from "@/components/CityServicesPage";

export const metadata: Metadata = {
  title: "Philadelphia Tax Accountant for Small Business Growth | IntegraFin",
  description:
    "Need a tax accountant in Philadelphia, PA? IntegraFin provides tax filing, bookkeeping, payroll support, and IRS tax resolution guidance.",
  keywords: [
    "tax accountant philadelphia",
    "philadelphia tax preparation services",
    "bookkeeping services philadelphia",
    "small business accountant philadelphia",
    "irs tax help philadelphia",
  ],
  alternates: { canonical: "https://integrafin.tax/pennsylvania/philadelphia-tax-accountant" },
  openGraph: {
    title: "Philadelphia Tax Accountant for Small Business Growth | IntegraFin",
    description:
      "Tax preparation, bookkeeping, payroll, and IRS support for Philadelphia businesses and individuals.",
    url: "https://integrafin.tax/pennsylvania/philadelphia-tax-accountant",
  },
};

export default function PhiladelphiaTaxAccountantPage() {
  return (
    <CityServicesPage
      cityName="Philadelphia"
      stateName="Pennsylvania"
      stateCode="PA"
      pageUrl="https://integrafin.tax/pennsylvania/philadelphia-tax-accountant"
      statePageUrl="https://integrafin.tax/pennsylvania-tax-accounting-services"
      primaryKeyword="tax accountant philadelphia"
      secondaryKeywords={[
        "philadelphia tax preparation services",
        "bookkeeping services philadelphia",
        "small business accountant philadelphia",
        "philadelphia payroll tax support",
        "irs tax help philadelphia",
      ]}
      heroDescription="IntegraFin helps Philadelphia clients with tax filing, monthly bookkeeping, payroll compliance workflows, and support for IRS notices."
      directAnswer="Philadelphia business owners need accurate records and reliable filing workflows to avoid costly delays. We help you organize bookkeeping, maintain payroll process discipline, and plan tax obligations early so filing season is less stressful."
      serviceFocus={[
        "Business tax filing support and annual preparation workflows",
        "Monthly bookkeeping support and reporting process setup",
        "Payroll process support and filing workflow guidance",
        "Tax planning support for owner-managed businesses",
        "IRS correspondence support and resolution planning",
      ]}
      whoWeHelp={[
        "Philadelphia small businesses in service and retail sectors",
        "Owner-operators and independent professionals",
        "LLCs and S-Corps that need reliable monthly close workflows",
        "Businesses preparing for expansion or hiring",
        "Individuals who need filing support and tax planning",
      ]}
      localScenarios={[
        "Businesses combining personal and business expenses that need cleanup",
        "Teams with inconsistent payroll workflows and filing stress",
        "Owners preparing for tax deadlines without monthly books",
        "Clients responding to notices and needing documentation support",
      ]}
      whyChoose={[
        "Practical workflow guidance for real business operations",
        "Integrated support across bookkeeping, payroll, and tax filing",
        "Clear communication and transparent next-step planning",
        "USA-centric tax and accounting process support",
      ]}
      faqItems={[
        {
          question: "Do you help Philadelphia small businesses year-round?",
          answer:
            "Yes. We support clients year-round with bookkeeping, tax planning, payroll workflow, and filing preparation.",
        },
        {
          question: "Can you help if we are behind on bookkeeping?",
          answer:
            "Yes. We provide cleanup and a recurring monthly process so your records are filing-ready.",
        },
        {
          question: "Do you provide support for IRS notices?",
          answer:
            "Yes. We help review notices, gather records, and create a practical response workflow.",
        },
        {
          question: "Do you support both business and individual tax returns?",
          answer:
            "Yes. We support both, and align planning when business ownership impacts personal filing.",
        },
        {
          question: "How do we begin?",
          answer:
            "Book a consultation and we will assess your current system, deadlines, and immediate priorities.",
        },
      ]}
      resourceLinks={[
        { href: "/pennsylvania-tax-accounting-services", label: "Pennsylvania Tax and Accounting Services Hub" },
        { href: "/services#business", label: "Business Tax and Accounting Services" },
        { href: "/blog/irs-compliance-guide", label: "IRS Compliance Guide" },
        { href: "/blog/small-business-accounting-tips", label: "Small Business Accounting Tips" },
      ]}
      nearbyAreas={["Camden", "Upper Darby", "King of Prussia", "Bensalem", "Cherry Hill", "Norristown"]}
      lastReviewed="May 23, 2026"
    />
  );
}
