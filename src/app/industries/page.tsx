import type { Metadata } from "next";
import Link from "next/link";
import WorkflowPreview from "@/components/WorkflowPreview";
import { 
  Building2, Hammer, Factory, Truck, Utensils, Heart, Landmark, 
  Stethoscope, HeartPulse, Scale, Briefcase, Laptop, Users, ShoppingCart, 
  ChevronRight, Box
} from "lucide-react";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";

const pageUrl = "https://integrafin.tax/industries";
const pageDescription = "Review tax, bookkeeping, payroll-record, and accounting service contexts for real estate, construction, healthcare, professional services, technology, and other businesses.";

const breadcrumbSchema = buildBreadcrumbSchema(pageUrl, [
  { name: "Home", item: "https://integrafin.tax/" },
  { name: "Industries", item: pageUrl },
]);

const webPageSchema = buildWebPageSchema({
  url: pageUrl,
  name: "Industry Tax & Accounting Services | IntegraFin",
  description: pageDescription,
});

export const metadata: Metadata = {
  title: 'Industry Tax & Accounting Services | IntegraFin',
  description: pageDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IntegraFin Tax & Accounting" }],
    title: 'Industry Tax & Accounting Services | IntegraFin',
    url: pageUrl,
  },
};

const industries = [
  {
    title: "Real Estate",
    description: "Bookkeeping, entity-activity review, rental and property records, and tax-planning discussions for real estate investors, property managers, and developers.",
    icon: Building2
  },
  {
    title: "Construction",
    description: "Project-cost records, contractor and payroll details, bookkeeping, and tax-preparation support for construction firms.",
    icon: Hammer
  },
  {
    title: "Manufacturing",
    description: "Accounting, inventory records, payroll details, and tax-filing support for manufacturing businesses.",
    icon: Factory
  },
  {
    title: "Wholesale & Distribution",
    description: "Inventory, purchasing, sales, cash-flow reporting, and tax-record support for wholesale and distribution businesses.",
    icon: Box
  },
  {
    title: "Transportation",
    description: "Bookkeeping, vehicle and fuel records, payroll details, and tax-planning discussions for transportation and logistics businesses.",
    icon: Truck
  },
  {
    title: "Hospitality",
    description: "Sales, payroll, tip, expense, and bookkeeping workflows for hotels, restaurants, and event businesses.",
    icon: Utensils
  },
  {
    title: "Nonprofit Organizations",
    description: "Donor records, bookkeeping, reporting support, and tax-filing workflows for tax-exempt entities, subject to organization facts and scope.",
    icon: Heart
  },
  {
    title: "Financial Services",
    description: "Accounting, tax-record, payroll, and filing support for financial-service businesses, subject to applicable professional and regulatory boundaries.",
    icon: Landmark
  },
  {
    title: "Medical & Dental",
    description: "Bookkeeping, payroll records, owner activity, and tax-preparation support for medical and dental practices.",
    icon: Stethoscope
  },
  {
    title: "Healthcare",
    description: "Bookkeeping, financial reporting, payroll-record, and tax-filing support for clinics and healthcare service providers.",
    icon: HeartPulse
  },
  {
    title: "Law Firms & Legal Services",
    description: "Bookkeeping, financial reporting, payroll records, and tax-planning discussions for law firms; legal trust-account rules require firm-specific review.",
    icon: Scale
  },
  {
    title: "Professional Services",
    description: "Income and expense records, bookkeeping, estimated-tax discussions, and filing support for consultants and service providers.",
    icon: Briefcase
  },
  {
    title: "Technology & Consulting",
    description: "Entity and bookkeeping setup, payroll records, filing support, and tax-credit documentation review for technology and consulting businesses.",
    icon: Laptop
  },
  {
    title: "Privately Held & Family-Owned Businesses",
    description: "Bookkeeping, owner activity, entity returns, tax-planning discussions, and adviser coordination for privately held and family-run businesses.",
    icon: Users
  },
  {
    title: "Entrepreneurial & Small Business Retail",
    description: "Sales, inventory, payment-processor, payroll, bookkeeping, and tax-filing records for small retailers.",
    icon: ShoppingCart
  }
];

export default function IndustriesPage() {
  return (
    <main className="saas-page pt-20 bg-slate-50 selection:bg-[#0092df] selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-dark py-14 sm:py-20">
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold tracking-[0.14em] text-cyan-200">
              INDUSTRY-SPECIFIC ACCOUNTING
            </span>
            <h1 className="mx-auto mt-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Accounting shaped around the way your business works.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#d7e3fc] sm:text-lg">
              Tax, bookkeeping, payroll-record, and accounting workflows organized around the records and filing needs of different business sectors.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-secondary px-7 py-3 font-bold text-white">
                Talk about your business
              </Link>
            </div>
          </div>
          <WorkflowPreview
            label="INDUSTRY SERVICE OVERVIEW"
            title="A process adapted to your records"
            items={[
              "Identify the records specific to your business",
              "Define bookkeeping, reporting, and filing needs",
              "Agree on the service scope and next steps",
            ]}
          />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="flex items-center gap-3">
                <span className="w-12 h-1.5 bg-[#0092df] rounded-full"></span>
                <span className="text-[#0092df] text-sm font-black uppercase tracking-widest">Service Contexts Across Sectors</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-primary-dark tracking-tight">Industry Context Shapes the Records We Review</h2>
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  Different businesses produce different records. A construction company may need job-cost and contractor detail, while a retailer may need inventory, sales-tax, and payment-processor reconciliation. The engagement begins by identifying the entity, filing history, accounting system, and records involved.
                </p>
                <p>
                  Industry context helps identify relevant questions, but it does not guarantee a tax result, filing outcome, cost reduction, or business performance. Recommendations depend on complete records, applicable rules, timing, eligibility, and the written scope.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(27,42,74,0.06)]">
              <div className="border-b border-slate-200 bg-[#f7f9fc] px-6 py-5">
                <span className="block text-[10px] font-bold tracking-[0.13em] text-primary">RECORDS IN CONTEXT</span>
                <strong className="mt-1 block text-base text-primary-dark">Different work calls for different detail</strong>
              </div>
              <div className="space-y-3 p-5">
                {[
                  ["Construction", "Job costs, contractor payments, and payroll records"],
                  ["Retail", "Inventory, sales tax, and payment-processor activity"],
                  ["Healthcare", "Practice revenue, payroll, and owner activity"],
                ].map(([sector, records], index) => (
                  <div key={sector} className="flex gap-3 rounded-lg border border-slate-200 bg-[#f7f9fc] p-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-bold text-primary">{index + 1}</span>
                    <div><strong className="block text-sm text-primary-dark">{sector}</strong><p className="mt-1 text-xs leading-relaxed text-slate-600">{records}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-primary-dark tracking-tight">Business Sectors We Support</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">Examples of bookkeeping, payroll-record, tax-preparation, and planning contexts that may be included in an engagement.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div 
                key={index} 
                className="group flex flex-col items-start rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <industry.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-primary-dark transition-colors group-hover:text-primary">{industry.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium mb-6">
                  {industry.description}
                </p>
                <Link href="/contact" className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3">
                  Discuss this sector <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-primary-dark overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#00C2CB]/5 skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Get support for the records behind your business.</h2>
          <p className="text-xl text-[#D7E3FC] font-medium max-w-2xl mx-auto">
            Tell us about your industry, records, deadlines, and the work you need. We will explain the next step and what should be scoped separately.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#2563eb] px-8 py-3 font-bold text-white transition-colors hover:bg-[#1d4ed8]">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
