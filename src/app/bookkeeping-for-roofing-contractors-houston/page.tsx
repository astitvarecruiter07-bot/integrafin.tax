import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileWarning,
  HardHat,
  Mail,
  Menu,
  Phone,
  ReceiptText,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";
import RoofingLeadForm from "@/components/RoofingLeadForm";
import RoofingCampaignTracking from "@/components/RoofingCampaignTracking";
import { serializeJsonLd } from "@/lib/seo/jsonLd";

const canonicalUrl = "https://integrafin.tax/bookkeeping-for-roofing-contractors-houston";

export const metadata: Metadata = {
  title: "Bookkeeping for Roofing Contractors in Houston | IntegraFin",
  description:
    "Bookkeeping, cleanup, payroll support and job-cost tracking for roofing contractors in Houston, Katy and Sugar Land. Request a free review.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Bookkeeping for Roofing Contractors in Houston | IntegraFin",
    description:
      "Bookkeeping, cleanup, payroll support and job-cost tracking for roofing contractors in Houston, Katy and Sugar Land. Request a free review.",
    url: canonicalUrl,
    type: "website",
    siteName: "IntegraFin",
    images: [
      {
        url: "/images/campaigns/roofing-bookkeeping-hero.webp",
        width: 1600,
        height: 896,
        alt: "Roofing business owner reviewing job-cost reports at a Texas jobsite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookkeeping for Roofing Contractors in Houston | IntegraFin",
    description: "Roofing bookkeeping, cleanup and job-cost support across the Houston area.",
    images: ["/images/campaigns/roofing-bookkeeping-hero.webp"],
  },
};

const problems = [
  {
    title: "Unclear Job Profit",
    text: "Without accurate job-cost records, it can be difficult to determine which roofing projects are profitable.",
    icon: BarChart3,
  },
  {
    title: "Books Are Behind",
    text: "Uncategorized transactions and missing receipts can quickly create months of bookkeeping cleanup.",
    icon: FileWarning,
  },
  {
    title: "Payroll and Subcontractor Records",
    text: "Roofing companies need organized records for employees, crews, subcontractors and vendor payments.",
    icon: Users,
  },
  {
    title: "Tax-Time Stress",
    text: "Incomplete financial records can create unnecessary delays and confusion when tax deadlines arrive.",
    icon: ReceiptText,
  },
];

const services = [
  {
    label: "Monthly bookkeeping",
    text: "Regular transaction categorization, account reconciliation and financial reporting.",
    icon: WalletCards,
  },
  {
    label: "Catch-up bookkeeping",
    text: "Bring overdue or disorganized bookkeeping records up to date.",
    icon: ClipboardCheck,
  },
  {
    label: "Bookkeeping cleanup",
    text: "Review and correct inaccurate, duplicated or improperly categorized transactions.",
    icon: FileCheck2,
  },
  {
    label: "Job-cost tracking",
    text: "Organize labor, materials and subcontractor expenses by roofing job.",
    icon: Calculator,
  },
  {
    label: "Payroll support",
    text: "Maintain organized payroll-related records for employees and roofing crews.",
    icon: Users,
  },
  {
    label: "Tax-ready records",
    text: "Prepare organized financial records for tax preparation and compliance.",
    icon: ShieldCheck,
  },
];

const faqs = [
  [
    "Do you work specifically with roofing contractors?",
    "IntegraFin provides bookkeeping support for contractor and trade businesses, including roofing companies.",
  ],
  [
    "Can you help if my books are several months behind?",
    "Yes. Catch-up and cleanup bookkeeping can be used to organize overdue or inaccurate financial records.",
  ],
  [
    "Can you work with my existing accounting software?",
    "IntegraFin will review your current system during the consultation and explain the available options.",
  ],
  [
    "Do you provide monthly bookkeeping?",
    "Yes. Ongoing bookkeeping support may include transaction categorization, reconciliations and financial reporting.",
  ],
  [
    "Can you help organize job costs?",
    "IntegraFin can help organize labor, material, vendor and subcontractor expenses so roofing businesses can better understand project costs.",
  ],
  [
    "How much does the service cost?",
    "Pricing depends on transaction volume, the condition of the existing books and the services required. Final pricing is provided after the initial review.",
  ],
  [
    "Which areas do you serve?",
    "IntegraFin serves roofing businesses in Houston, Katy, Sugar Land and other Texas locations remotely.",
  ],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AccountingService",
      "@id": `${canonicalUrl}#service`,
      name: "IntegraFin Tax & Accounting",
      url: canonicalUrl,
      telephone: "+1-832-647-1819",
      email: "contact@integrafin.tax",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2039 N Mason Rd, Suite 604",
        addressLocality: "Katy",
        addressRegion: "TX",
        postalCode: "77449",
        addressCountry: "US",
      },
      areaServed: ["Houston, Texas", "Katy, Texas", "Sugar Land, Texas"],
      serviceType: [
        "Bookkeeping for roofing contractors",
        "Catch-up bookkeeping",
        "Job-cost tracking",
        "Payroll records support",
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[#008a96]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-[#09233f] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text && <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{text}</p>}
    </div>
  );
}

export default function RoofingBookkeepingLandingPage() {
  return (
    <main className="roofing-landing min-h-screen bg-white text-slate-700 selection:bg-[#00a9b7] selection:text-[#061d35]">
      <RoofingCampaignTracking />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071c32]/95 shadow-lg shadow-black/10 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="IntegraFin home" className="flex shrink-0 items-center">
            <Image src="/images/logo1.png" alt="IntegraFin" width={154} height={42} priority className="h-8 w-auto brightness-0 invert sm:h-9" />
          </Link>

          <nav aria-label="Roofing bookkeeping page navigation" className="hidden items-center gap-7 lg:flex">
            <a href="#services" className="text-sm font-bold text-slate-200 transition hover:text-white">Services</a>
            <a href="#how-it-works" className="text-sm font-bold text-slate-200 transition hover:text-white">How It Works</a>
            <a href="#faq" className="text-sm font-bold text-slate-200 transition hover:text-white">Frequently Asked Questions</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="#roofing-review-form" data-analytics-label="campaign_header_review" className="hidden rounded-lg bg-[#00b5c2] px-4 py-2.5 text-sm font-black text-[#061d35] transition hover:bg-[#48d0d7] sm:inline-flex">
              Request a Free Review
            </a>
            <details className="group relative lg:hidden">
              <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg border border-white/20 text-white marker:hidden" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" aria-hidden="true" />
              </summary>
              <nav aria-label="Mobile campaign navigation" className="absolute right-0 top-14 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
                <a href="#services" className="block rounded-xl px-4 py-3 text-sm font-bold text-[#09233f] hover:bg-slate-100">Services</a>
                <a href="#how-it-works" className="block rounded-xl px-4 py-3 text-sm font-bold text-[#09233f] hover:bg-slate-100">How It Works</a>
                <a href="#faq" className="block rounded-xl px-4 py-3 text-sm font-bold text-[#09233f] hover:bg-slate-100">Frequently Asked Questions</a>
                <a href="#roofing-review-form" className="mt-2 block rounded-xl bg-[#00a9b7] px-4 py-3 text-center text-sm font-black text-[#061d35]">Request a Free Review</a>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#071c32]">
        <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, rgba(0,181,194,.24), transparent 30%), radial-gradient(circle at 80% 0%, rgba(31,90,137,.22), transparent 30%)" }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:gap-12 lg:px-8 lg:py-20">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#31c4cd]/30 bg-[#00a9b7]/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-[#76e1e6]">
              <HardHat className="h-4 w-4" aria-hidden="true" /> Houston-area roofing businesses
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Bookkeeping Built for Roofing Contractors
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Understand your job costs, organize your financial records and stay prepared for tax time with bookkeeping support designed for roofing businesses.
            </p>

            <ul className="mt-7 grid gap-3 text-sm font-semibold text-slate-100 sm:text-base">
              {["Track income, expenses and job costs", "Organize payroll and subcontractor records", "Keep clean, tax-ready financial records"].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00a9b7] text-[#061d35]"><Check className="h-4 w-4" aria-hidden="true" /></span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#roofing-review-form" data-analytics-label="campaign_hero_review" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00b5c2] px-5 py-3.5 text-center font-black text-[#061d35] shadow-lg shadow-black/20 transition hover:bg-[#48d0d7]">
                Request My Free Bookkeeping Review <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="tel:+18326471819" data-analytics-label="campaign_hero_phone" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3.5 font-black text-white transition hover:bg-white/10">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call IntegraFin
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-300">
              <BadgeCheck className="h-4 w-4 text-[#58d6dd]" aria-hidden="true" /> Serving roofing contractors in Houston, Katy and Sugar Land.
            </p>

            <div className="relative mt-9 aspect-[16/8.5] overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/30">
              <Image
                src="/images/campaigns/roofing-bookkeeping-hero.webp"
                alt="Roofing business owner reviewing invoices and job-cost reports while a roofing crew works nearby"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071c32]/90 to-transparent px-4 pb-4 pt-12 text-xs font-semibold text-white/90">
                Built around the records roofing owners use to understand each job.
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/15 bg-white p-5 shadow-2xl shadow-black/25 sm:p-7 lg:sticky lg:top-24">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#008a96]">Free 15-minute review</p>
            <h2 className="mt-2 text-2xl font-black leading-tight tracking-[-0.03em] text-[#09233f] sm:text-3xl">
              Request Your Free Roofing Bookkeeping Review
            </h2>
            <p id="roofing-form-intro" className="mb-5 mt-3 text-sm leading-6 text-slate-600">
              Tell us a little about your roofing business. An IntegraFin team member will contact you to discuss your bookkeeping needs.
            </p>
            <RoofingLeadForm />
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#f4f8fa] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Common bookkeeping roadblocks" title="Are Your Books Making It Difficult to Run Your Roofing Business?" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map(({ title, text, icon: Icon }, index) => (
              <article key={title} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="absolute right-4 top-3 text-5xl font-black text-slate-100" aria-hidden="true">0{index + 1}</span>
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#e2f8f9] text-[#007982]"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                <h3 className="relative mt-5 text-xl font-black leading-tight text-[#09233f]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Services" title="Bookkeeping Support for Roofing Companies" text="Choose focused help for ongoing records, overdue books or the moving parts behind every roofing job." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ label, text, icon: Icon }) => (
              <article key={label} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#65d7dc] hover:shadow-xl hover:shadow-slate-200/60">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#09233f] text-[#66dde2] transition group-hover:bg-[#00a9b7] group-hover:text-[#061d35]"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                <h3 className="mt-5 text-lg font-black uppercase tracking-wide text-[#09233f]">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href="#roofing-review-form" data-analytics-label="campaign_services_review" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#09233f] px-6 py-3.5 font-black text-white transition hover:bg-[#123b60]">
              Discuss My Bookkeeping Needs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 overflow-hidden bg-[#09233f] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#65d7dc]">A clear starting point</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">Get Your Roofing Books Organized in Three Steps</h2>
          </div>
          <ol className="grid gap-5 lg:grid-cols-3">
            {[
              ["Request a Review", "Complete the short form and tell us what bookkeeping assistance you need."],
              ["Discuss Your Current Books", "Our team will learn about your roofing business, accounting software and current bookkeeping situation."],
              ["Receive a Recommended Plan", "We will explain the appropriate next steps for cleanup or ongoing monthly bookkeeping."],
            ].map(([title, text], index) => (
              <li key={title} className="relative rounded-2xl border border-white/15 bg-white/[0.06] p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00b5c2] text-sm font-black text-[#061d35]">{index + 1}</span>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-3xl bg-[#e8f7f8] p-7 sm:p-10">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[28px] border-white/70" aria-hidden="true" />
            <HardHat className="relative h-14 w-14 text-[#008a96]" aria-hidden="true" />
            <p className="relative mt-8 text-sm font-black uppercase tracking-[0.18em] text-[#00808a]">Roofing-industry context</p>
            <p className="relative mt-3 text-2xl font-black leading-snug tracking-tight text-[#09233f] sm:text-3xl">
              Your books should make each job easier to understand—not add another layer of guesswork.
            </p>
            <div className="relative mt-8 grid grid-cols-2 gap-3 text-center text-sm font-black text-[#09233f]">
              <div className="rounded-xl bg-white p-4">Job costs</div>
              <div className="rounded-xl bg-white p-4">Crew records</div>
              <div className="rounded-xl bg-white p-4">Vendor spend</div>
              <div className="rounded-xl bg-white p-4">Tax-ready books</div>
            </div>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#008a96]">Why IntegraFin</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] text-[#09233f] sm:text-4xl lg:text-5xl">Financial Clarity for Roofing Business Owners</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              If you are comparing bookkeeping for roofing contractors in Houston, IntegraFin offers a practical review focused on the condition of your records and the support your business actually needs.
            </p>
            <ul className="mt-7 grid gap-4">
              {[
                "Bookkeeping support designed around contractor transactions",
                "Clear communication without unnecessary accounting jargon",
                "Support for monthly bookkeeping and overdue cleanup",
                "Organized records for payroll, subcontractors and tax preparation",
                "Remote service for roofing businesses across the Houston area",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 font-semibold text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#008a96]" aria-hidden="true" /> {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8fa] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Client feedback" title="What Business Owners Say" text="Verified feedback will appear here as it becomes available." />
          <div className="grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <article key={item} className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400"><BadgeCheck className="h-5 w-5" aria-hidden="true" /></div>
                <p className="mt-5 text-sm font-bold leading-6 text-slate-500">Add a verified client testimonial here.</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Frequently asked questions" title="Straight Answers Before You Request a Review" />
          <div className="space-y-3">
            {faqs.map(([question, answer], index) => (
              <details key={question} className="group rounded-2xl border border-slate-200 bg-white p-5 open:border-[#73d8dd] open:shadow-lg open:shadow-slate-200/40" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-[#09233f] marker:hidden">
                  {question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#008a96] transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071c32] px-4 py-16 text-center text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#65d7dc]">Free 15-minute review</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">Ready to Get Your Roofing Books Organized?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Request a free 15-minute review and learn what your roofing company needs to maintain cleaner, tax-ready financial records.
          </p>
          <a href="#roofing-review-form" data-analytics-label="campaign_final_review" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#00b5c2] px-6 py-3.5 font-black text-[#061d35] transition hover:bg-[#48d0d7]">
            Request My Free Bookkeeping Review <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-4 text-sm text-slate-400">No obligation. An IntegraFin team member will contact you to discuss your needs.</p>
        </div>
      </section>

      <footer className="bg-[#041425] px-4 py-10 text-slate-300 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Image src="/images/logo1.png" alt="IntegraFin" width={154} height={42} className="h-9 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Bookkeeping, cleanup, payroll records and tax-ready support for Houston-area roofing businesses.</p>
            <a href="https://integrafin.tax" className="mt-3 inline-block text-sm font-bold text-[#66dde2] hover:underline">integrafin.tax</a>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-black text-white">Contact IntegraFin</p>
            <a href="tel:+18326471819" data-analytics-label="campaign_footer_phone" className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 text-[#66dde2]" aria-hidden="true" /> (832) 647-1819</a>
            <a href="mailto:contact@integrafin.tax" className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 text-[#66dde2]" aria-hidden="true" /> contact@integrafin.tax</a>
            <p>Serving Houston, Katy, Sugar Land and other Texas locations remotely.</p>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-black text-white">Legal</p>
            <Link href="/privacy" className="block hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="block hover:text-white">Terms of Service</Link>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs text-slate-500">Copyright {new Date().getFullYear()} IntegraFin. All rights reserved.</div>
      </footer>

      <div className="fixed inset-x-3 bottom-3 z-40 sm:hidden">
        <a href="#roofing-review-form" data-analytics-label="campaign_mobile_sticky_review" className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#00b5c2] px-4 py-3 text-sm font-black text-[#061d35] shadow-2xl shadow-black/30">
          Request My Free Review <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </main>
  );
}
