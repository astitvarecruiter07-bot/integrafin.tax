import type { Metadata } from "next";
import Link from "next/link";
import { focusedServiceLinks } from "@/data/serviceLandingPages";
import { highTaxStateServiceLinks } from "@/data/highTaxStateServicePages";

export const metadata: Metadata = {
  title: "HTML Sitemap | IntegraFin",
  description:
    "Browse all important IntegraFin pages including services, locations, blog posts, and legal pages.",
  alternates: { canonical: "https://integrafin.tax/site-map" },
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "Core Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "Blog" },
      { href: "/case-study", label: "Case Study" },
      { href: "/tax-calculator", label: "2025 and 2026 Federal Tax Calculator" },
      { href: "/tax-calculator-guide", label: "Federal Tax Calculator Guide" },
      { href: "/industries", label: "Industries Served" },
    ],
  },
  {
    title: "State Service Hubs",
    links: [
      { href: "/texas-tax-accounting-services", label: "Texas Tax and Accounting Services" },
      { href: "/new-york-tax-accounting-services", label: "New York Tax and Accounting Services" },
      { href: "/pennsylvania-tax-accounting-services", label: "Pennsylvania Tax and Accounting Services" },
      ...highTaxStateServiceLinks.map((link) => ({
        href: link.href,
        label: link.label,
      })),
    ],
  },
  {
    title: "Focused Service Pages",
    links: focusedServiceLinks.map((link) => ({
      href: link.href,
      label: link.label,
    })),
  },
  {
    title: "City Service Pages",
    links: [
      { href: "/texas/katy-tax-accountant", label: "Katy Tax Accountant" },
      { href: "/texas/houston-tax-accountant", label: "Houston Tax Accountant" },
      { href: "/texas/sugar-land-small-business-accountant", label: "Sugar Land Small Business Accountant" },
      { href: "/texas/cypress-bookkeeping-services", label: "Cypress Bookkeeping Services" },
      { href: "/texas/spring-tax-accountant", label: "Spring Tax Accountant" },
      { href: "/texas/the-woodlands-tax-accountant", label: "The Woodlands Tax Accountant" },
      { href: "/texas/fulshear-tax-accountant", label: "Fulshear Tax Accountant" },
      { href: "/texas/richmond-tax-accountant", label: "Richmond Tax Accountant" },
      { href: "/texas/rosenberg-bookkeeping-services", label: "Rosenberg Bookkeeping Services" },
      { href: "/texas/missouri-city-tax-accountant", label: "Missouri City Tax Accountant" },
      { href: "/texas/dallas-tax-accountant", label: "Dallas Tax Accountant" },
      { href: "/new-york/nyc-tax-accountant", label: "NYC Tax Accountant" },
      { href: "/new-york/buffalo-tax-accountant", label: "Buffalo Tax Accountant" },
      { href: "/pennsylvania/philadelphia-tax-accountant", label: "Philadelphia Tax Accountant" },
      { href: "/pennsylvania/pittsburgh-tax-accountant", label: "Pittsburgh Tax Accountant" },
    ],
  },
  {
    title: "Local Service Pages",
    links: [
      { href: "/texas/irs-notice-help-katy-tx", label: "IRS Notice Help Katy TX" },
      { href: "/texas/katy-bookkeeping-services", label: "Bookkeeping Services Katy TX" },
      { href: "/llc-formation-tax-setup", label: "LLC Formation Tax Setup" },
    ],
  },
  {
    title: "Featured Blog Posts",
    links: [
      { href: "/blog/financial-planning-for-startups", label: "Financial Planning for Startups" },
      { href: "/blog/tax-planning-strategies-2025", label: "Top Tax Planning Strategies for 2025" },
      { href: "/blog/small-business-accounting-tips", label: "Essential Accounting Tips for Small Businesses" },
      { href: "/blog/irs-compliance-guide", label: "Complete Guide to IRS Compliance" },
      { href: "/blog/payroll-best-practices", label: "Payroll Best Practices" },
      { href: "/blog/tax-resolution-options", label: "Tax Resolution Options" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms and Conditions" },
    ],
  },
];

export default function HtmlSitemapPage() {
  return (
    <main className="bg-slate-50 min-h-screen pt-28 pb-16">
      <section className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-black text-[#003580] tracking-tight mb-4">
          HTML Sitemap
        </h1>
        <p className="text-slate-600 mb-8">
          Use this page to quickly navigate important services, location pages, and tax resources.
        </p>

        <div className="space-y-6">
          {sections.map((section) => (
            <article key={section.title} className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-[#003580] mb-4">{section.title}</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#0057b8] hover:text-[#003580] hover:underline font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
