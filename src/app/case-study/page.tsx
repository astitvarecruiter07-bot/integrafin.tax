import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
    title: "Case Studies",
    description:
        "Explore IntegraFin's successful projects across tax management, business planning, consultation, and financial advisory services.",
    openGraph: {
        title: "Case Studies | IntegraFin",
        description: "See the successful projects and case studies by IntegraFin.",
        url: "https://integrafin.tax/case-study",
    },
};

const caseStudies = [
    {
        title: "Tax Management",
        category: "Tax Planning",
        desc: "Developed a comprehensive tax strategy for a mid-size manufacturing firm, resulting in 30% reduction in annual tax liability through strategic deductions and credits.",
    },
    {
        title: "Business Plan",
        category: "Growth Strategies",
        desc: "Created a detailed 5-year business plan for a healthcare startup, including financial projections, funding strategies, and compliance roadmap.",
    },
    {
        title: "Company Budget",
        category: "Book Keeping",
        desc: "Implemented an automated bookkeeping and budgeting system for a real estate group managing 50+ properties, streamlining their financial operations.",
    },
    {
        title: "Consultation",
        category: "Loan Management",
        desc: "Guided a construction company through SBA loan applications and financial restructuring, securing $2M in business funding.",
    },
    {
        title: "Startup Funding",
        category: "Growth Strategies",
        desc: "Assisted a tech startup in preparing investor-ready financial statements and projections, helping them raise seed funding successfully.",
    },
    {
        title: "Credible Funds",
        category: "Audit & Assurance",
        desc: "Conducted a comprehensive financial audit for a non-profit organization, ensuring transparent fund management and regulatory compliance.",
    },
];

const categoryIcons: Record<string, React.ReactNode> = {
    "Tax Planning": (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
    ),
    "Growth Strategies": (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
    ),
    "Book Keeping": (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
    "Loan Management": (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    "Audit & Assurance": (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
};

export default function CaseStudyPage() {
    return (
        <>
            <PageHeader
                title="Projects We Have Done"
                breadcrumb="Case Study"
                description="Explore our successful projects and see how we've helped businesses and individuals achieve financial excellence."
            />

            {/* ========== CASE STUDY GRID ========== */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caseStudies.map((study, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden card-hover shadow-sm group">
                                {/* Image */}
                                <div className="h-48 bg-gradient-to-br from-accent-light to-lavender relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-primary/20">
                                            {categoryIcons[study.category] || (
                                                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center text-primary">
                                            {categoryIcons[study.category] || <span className="text-xs font-bold">{study.category[0]}</span>}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">{study.title}</h3>
                                            <p className="text-xs text-text-secondary">{study.category}</p>
                                        </div>
                                        <div className="ml-auto w-8 h-8 rounded-full bg-accent-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors cursor-pointer">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-text-secondary text-sm leading-relaxed">{study.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== TESTIMONIAL ========== */}
            <section className="section-padding bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <p className="text-sm font-semibold text-text-secondary mb-2">
                                Client <span className="bg-accent-dark text-white px-2 py-0.5 rounded text-xs">Testimonial</span>
                            </p>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                                What They Say<br />About Us?
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                We&apos;ve helped hundreds of businesses and individuals achieve financial success. Here&apos;s what they have to say.
                            </p>
                            <Link href="/contact" className="inline-flex items-center px-7 py-3 bg-accent-dark text-white font-semibold rounded-full hover:bg-primary transition-colors">
                                See More
                            </Link>
                        </div>
                        <div className="bg-accent-light rounded-2xl p-8 relative">
                            <p className="text-foreground leading-relaxed mb-5 italic text-lg">
                                &quot;Exceptional service! The team handled my tax filings seamlessly, ensuring compliance while optimizing my returns. I&apos;ll definitely continue using their services.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-primary font-bold">E</span>
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Emily R</p>
                                    <p className="text-text-secondary text-sm">Real Estate Investor</p>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-8 text-accent/50">
                                <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
