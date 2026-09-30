import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Landmark, MapPin, FileText, ClipboardCheck, Map } from "lucide-react";
import WorkflowPreview from "@/components/WorkflowPreview";
import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/siteConfig";

const pageUrl = "https://integrafin.tax/about";

const aboutPageSchema = buildWebPageSchema({
  url: pageUrl,
  type: "AboutPage",
  name: "About IntegraFin | Tax & Accounting Services in Katy, TX",
  description:
    "Learn where IntegraFin is based, the tax and accounting services offered, and the documented process used to scope client work.",
});

const breadcrumbSchema = buildBreadcrumbSchema(pageUrl, [
  { name: "Home", item: "https://integrafin.tax/" },
  { name: "About IntegraFin", item: pageUrl },
]);

export const metadata: Metadata = {
  title: 'About IntegraFin | Tax & Accounting Services in Katy, TX',
  description: 'Learn where IntegraFin is based, the tax and accounting services offered, and the documented process used to scope client work.',
  alternates: { canonical: 'https://integrafin.tax/about' },
  openGraph: {
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IntegraFin Tax & Accounting" }],
    title: 'About IntegraFin | Tax & Accounting Services in Katy, TX',
    url: 'https://integrafin.tax/about',
  },
};

export default function AboutPage() {
    return (
        <main className="saas-page pt-20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-primary-dark py-14 sm:py-20">
                <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-bold tracking-[0.14em] text-cyan-200">
                            KATY TAX &amp; ACCOUNTING SERVICES
                        </span>
                        <h1 className="mx-auto mt-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                            A clearer way to handle books and taxes.
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#d7e3fc] sm:text-lg">
                            IntegraFin provides tax preparation, bookkeeping, payroll-record support, and IRS notice help from its Katy, Texas office.
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link href="/contact" className="rounded-lg bg-secondary px-7 py-3 font-bold text-white">Talk with our team</Link>
                            <Link href="/services" className="rounded-lg border border-white/30 bg-white/10 px-7 py-3 font-bold text-white">Explore services</Link>
                        </div>
                    </div>
                    <WorkflowPreview
                        label="THE INTEGRAFIN APPROACH"
                        title="Work begins with the facts and a clear scope"
                        items={[
                            "Review records, deadlines, and the immediate issue",
                            "Agree on the work, responsibilities, and next steps",
                            "Prepare, reconcile, or respond within the written scope",
                        ]}
                    />
                </div>
            </section>

            {/* About Company Content */}
            <section className="py-12 sm:py-24 bg-section-bg">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7 space-y-8">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-dark tracking-tighter">How Work Is Scoped</h2>
                            <div className="space-y-6 text-base sm:text-lg text-[#45474c] font-light leading-relaxed">
                                <p>
                                    IntegraFin supports individuals and businesses with tax preparation, bookkeeping, payroll records, IRS notices, and related accounting workflows. The first review identifies the entities, periods, records, deadlines, and immediate issue before a service scope is proposed.
                                </p>
                                <p>
                                    Work is based on the records provided and the agreed engagement. Bookkeeping cleanup, return preparation, planning, and representation are treated as distinct tasks unless a written scope combines them.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(27,42,74,0.06)]">
                                <div className="flex items-center gap-3 border-b border-slate-200 bg-[#f7f9fc] p-5">
                                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#1b2a4a] text-white"><ClipboardCheck className="h-5 w-5" /></span>
                                    <div><span className="block text-[10px] font-bold tracking-[0.13em] text-primary">WORKFLOW OVERVIEW</span><strong className="text-sm text-primary-dark">What happens after you reach out</strong></div>
                                </div>
                                <ol className="space-y-3 p-5">
                                    {["Tell us the service and deadline", "Review the relevant records", "Agree on scope and next steps"].map((step, index) => (
                                        <li key={step} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-[#f7f9fc] p-4 text-sm font-semibold text-slate-700">
                                            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-bold text-primary">{index + 1}</span>
                                            {step}
                                            <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-600" />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Approach */}
            <section className="py-12 sm:py-24 bg-lavender">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <div className="group relative bg-white p-6 sm:p-12 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150 group-hover:bg-secondary/10"></div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-4 sm:mb-6 tracking-tighter">Our Mission</h3>
                            <p className="text-[#45474c] text-base sm:text-lg font-light leading-relaxed">
                                Our mission is to make tax and accounting work easier to follow by organizing records, identifying deadlines, documenting open questions, and explaining the next step in plain language.
                            </p>
                        </div>
                        {/* Approach */}
                        <div className="group relative bg-primary-dark p-6 sm:p-12 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2CB]/10 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150"></div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 sm:mb-6 tracking-tighter">Our Approach</h3>
                            <p className="text-[#d7e3fc] text-lg font-light leading-relaxed">
                                We start with the issue, records, filing history, and deadlines. The engagement then moves through written scope, document collection, reconciliation or preparation, client review, and an agreed filing, delivery, or response plan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-primary-dark tracking-tighter">What You Can Verify</h2>
                        <p className="mx-auto max-w-3xl text-[#45474c] leading-relaxed">These details are published on the website so prospective clients can review the location, scope, process, and limitations before engaging IntegraFin.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Published Katy Office", desc: `${siteConfig.office.fullAddress}, with weekday hours and direct contact details published on the Contact page.`, icon: MapPin },
                            { title: "Written Service Scope", desc: "The requested work, records needed, client responsibilities, and known limitations are defined before broader work begins.", icon: FileText },
                            { title: "Record-First Review", desc: "Returns, statements, payroll reports, entity documents, and notices are reviewed before fact-dependent conclusions are presented.", icon: ClipboardCheck },
                            { title: "Transparent Service Areas", desc: "Katy is identified as the office; nearby Texas cities are described as service areas rather than additional office locations.", icon: Map },
                            { title: "Documented Workflow", desc: "Published service pages describe intake, scope, record collection, reconciliation, preparation, client review, and next steps.", icon: CheckCircle2 },
                            { title: "Clear Outcome Boundaries", desc: "Refunds, savings, penalty relief, settlement terms, and agency decisions are not guaranteed and depend on the facts and applicable rules.", icon: Landmark }
                        ].map((item, index) => (
                            <div key={index} className="p-8 border border-gray-100 rounded-xl hover:shadow-xl transition-shadow duration-300">
                                <item.icon className="text-[#0092df] mb-6 w-8 h-8" />
                                <h4 className="text-xl font-bold text-primary-dark mb-3">{item.title}</h4>
                                <p className="text-[#45474c] font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-12 sm:py-24 bg-primary-dark text-center">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6 sm:space-y-10">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">Ready to Organize the Next Step?</h2>
                    <p className="text-base sm:text-xl text-[#d7e3fc] font-light max-w-2xl mx-auto">Describe the filing, bookkeeping, payroll-record, or IRS notice issue and the team will identify the initial records and appropriate service scope.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#2563eb] px-8 py-3 font-bold text-white transition-colors hover:bg-[#1d4ed8]">
                            Book a Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
