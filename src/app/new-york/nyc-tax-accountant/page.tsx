import type { Metadata } from "next";
import CityServicesPage from "@/components/CityServicesPage";

export const metadata: Metadata = {
  title: "NYC Tax Accountant for Small Business Tax Help | IntegraFin",
  description:
    "Need a tax accountant in New York City? IntegraFin helps with tax filing, bookkeeping, payroll workflows, and IRS tax support for NYC clients.",
  alternates: { canonical: "https://integrafin.tax/new-york/nyc-tax-accountant" },
  openGraph: {
    title: "NYC Tax Accountant for Small Business Tax Help | IntegraFin",
    description:
      "Tax, bookkeeping, payroll, and IRS support for business owners and individuals in New York City.",
    url: "https://integrafin.tax/new-york/nyc-tax-accountant",
  },
};

export default function NycTaxAccountantPage() {
  return (
    <CityServicesPage
      cityName="New York City"
      stateName="New York"
      stateCode="NY"
      pageUrl="https://integrafin.tax/new-york/nyc-tax-accountant"
      statePageUrl="https://integrafin.tax/new-york-tax-accounting-services"
      primaryKeyword="tax accountant nyc"
      secondaryKeywords={[
        "new york city tax preparation services",
        "bookkeeping services nyc",
        "small business accountant nyc",
        "nyc payroll tax support",
        "irs tax help new york city",
      ]}
      heroDescription="IntegraFin supports New York City clients with tax preparation, bookkeeping, payroll compliance workflows, and practical support for IRS notices."
      directAnswer="NYC businesses and independent professionals often need clean records, timely filings, and predictable accounting support. We help you build an ongoing process for bookkeeping, payroll reporting, and tax planning so deadlines are easier to manage."
      serviceFocus={[
        "Business tax preparation and annual filing support",
        "Monthly bookkeeping and reporting process support",
        "Payroll workflow setup and recurring tax reporting support",
        "Sales tax process guidance for businesses with taxable activity",
        "IRS notice support and tax resolution planning",
      ]}
      whoWeHelp={[
        "NYC small businesses, agencies, and professional service firms",
        "Freelancers, creators, and independent contractors",
        "LLCs and S-Corps with multi-channel revenue",
        "Business owners who need better monthly reporting discipline",
        "Individuals with personal filing and planning needs",
      ]}
      localScenarios={[
        "Fast-moving businesses with bookkeeping backlogs before filing season",
        "Owners balancing payroll obligations with multi-source revenue",
        "Service firms needing clean records for tax planning and financing",
        "Taxpayers responding to IRS or tax authority notices",
      ]}
      whyChoose={[
        "Clear, practical support for complex city-business workflows",
        "Integrated services across bookkeeping, payroll, and taxes",
        "USA-centric process designed for SMB tax compliance",
        "Simple communication and execution-focused planning",
      ]}
      faqItems={[
        {
          question: "Do you support fully remote accounting workflows for NYC clients?",
          answer:
            "Yes. We use secure digital workflows so clients can manage tax and accounting tasks remotely and efficiently.",
        },
        {
          question: "Can you help with quarterly estimates and year-end planning?",
          answer:
            "Yes. We help estimate obligations and align bookkeeping with tax planning throughout the year.",
        },
        {
          question: "Do you work with freelancers and 1099 earners in NYC?",
          answer:
            "Yes. We support self-employed professionals with recordkeeping, deductions planning, and filing preparation.",
        },
        {
          question: "Can you help if I receive an IRS letter?",
          answer:
            "Yes. We review the notice, organize your records, and create a response plan based on your filing status.",
        },
        {
          question: "How do I start with IntegraFin?",
          answer:
            "Book a consultation and we will review your current books, tax deadlines, and immediate priorities.",
        },
      ]}
      resourceLinks={[
        { href: "/new-york-tax-accounting-services", label: "New York Tax and Accounting Services Hub" },
        { href: "/services#business", label: "Business Tax and Accounting Services" },
        { href: "/blog/small-business-accounting-tips", label: "Small Business Accounting Tips" },
        { href: "/blog/irs-compliance-guide", label: "IRS Compliance Guide" },
      ]}
      nearbyAreas={["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island", "Long Island City"]}
      lastReviewed="May 23, 2026"
    />
  );
}
