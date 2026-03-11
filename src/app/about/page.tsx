import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Discover IntegraFin — your trusted partner for professional tax, accounting, and business advisory services in Katy, TX. Experienced CPAs and financial experts.",
    openGraph: {
        title: "About Us | IntegraFin",
        description:
            "Discover IntegraFin and our commitment to delivering reliable tax, accounting, and business advisory services.",
        url: "https://integrafin.tax/about",
    },
};

const whyChooseUs = [
    { title: "Expert Guidance", desc: "A team of seasoned professionals with deep industry knowledge." },
    { title: "Trust & Security", desc: "Confidential and secure handling of financial data." },
    { title: "Tailored Solutions", desc: "Personalized services to suit your specific needs." },
    { title: "Technology-Driven", desc: "Support for QuickBooks, Xero, Zoho, and other accounting software." },
    { title: "Seamless Compliance", desc: "IRS & State tax process support, tax resolution, and audit representation." },
    { title: "Comprehensive Services", desc: "From business entity formation to payroll, bookkeeping, and IRS representation." },
];

const steps = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
        title: "Free Consultation",
        desc: "Schedule a free consultation with our tax experts to understand your unique financial situation.",
        active: false,
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
        title: "Choose Your Package",
        desc: "Select the service package that best fits your needs — individual or business, we have you covered.",
        active: true,
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "Get Your Service",
        desc: "Our expert CPAs handle everything, ensuring compliance, maximizing deductions, and delivering results.",
        active: false,
    },
];

export default function AboutPage() {
    return (
        <>
            <PageHeader
                title="About Us"
                breadcrumb="About Us"
                description="Learn about IntegraFin and how we empower businesses and individuals with expert financial services."
            />

            {/* ========== WHO WE ARE ========== */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                        {/* Left - Image & Stats */}
                        <div className="relative">
                            <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-accent-light to-lavender shadow-lg">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center p-6">
                                        <svg className="w-12 h-12 mx-auto text-primary mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <p className="font-bold text-accent-dark text-lg">Financial Planning</p>
                                        <p className="text-text-secondary text-sm mt-1">Expert guidance for your future</p>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                                    <p className="text-2xl font-bold text-foreground">21+</p>
                                    <p className="text-xs text-text-secondary mt-1">Years Of Experience</p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                                    <p className="text-2xl font-bold text-foreground">100+</p>
                                    <p className="text-xs text-text-secondary mt-1">Expert Advisors</p>
                                </div>
                                <div className="bg-white border border-gray-100 rounded-xl p-4 text-center shadow-sm">
                                    <p className="text-2xl font-bold text-foreground">1050+</p>
                                    <p className="text-xs text-text-secondary mt-1">Projects Complete</p>
                                </div>
                            </div>
                        </div>

                        {/* Right - Content */}
                        <div>
                            <p className="text-sm font-semibold text-text-secondary mb-2">
                                <span className="bg-accent-dark text-white px-2 py-0.5 rounded text-xs mr-1">Who</span> We Are?
                            </p>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-5 leading-tight">
                                Your Financial Partner For Success
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-4">
                                IntegraFin is a trusted leader in tax and accounting services, committed to delivering accuracy and compliance for businesses. We tailor our solutions to meet the unique financial needs of each client, ensuring smooth operations and strategic growth.
                            </p>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                At IntegraFin, we are dedicated to providing comprehensive tax, accounting, and business advisory services tailored to meet the unique needs of individuals and businesses. With a team of highly skilled CPAs, Chartered Accountants, and financial experts, we bring years of expertise in tax compliance, bookkeeping, payroll, and financial planning.
                            </p>
                            <div className="flex items-center gap-4 bg-accent-light rounded-xl p-4 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Cost-Effective</p>
                                    <p className="text-text-secondary text-sm">Affordable, high-quality financial solutions tailored to your budget</p>
                                </div>
                            </div>
                            <Link href="/contact" className="inline-flex items-center px-7 py-3 bg-accent-dark text-white font-semibold rounded-full hover:bg-primary transition-colors">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== HOW IT WORKS ========== */}
            <section className="section-padding bg-section-bg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0">
                    <svg viewBox="0 0 1440 80" fill="none" className="w-full">
                        <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V0H0V40Z" fill="#F5F7FA" opacity="0.5" />
                    </svg>
                </div>
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
                    <p className="text-sm font-semibold text-text-secondary mb-2">
                        How It <span className="bg-accent-dark text-white px-2 py-0.5 rounded text-xs">Works?</span>
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Check Out The Easy Way<br />To Get Our Services
                    </h2>
                    <p className="text-text-secondary max-w-xl mx-auto mb-12">
                        Getting started with IntegraFin is simple. Follow these three easy steps.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        {steps.map((step, i) => (
                            <div key={i} className={`rounded-2xl p-7 card-hover ${step.active ? "bg-accent-dark text-white shadow-xl" : "bg-white shadow-md border border-gray-100"}`}>
                                <div className={`w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center ${step.active ? "bg-white/20 text-white" : "bg-accent-light text-primary"}`}>
                                    {step.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                                <p className={`text-sm leading-relaxed ${step.active ? "text-white/80" : "text-text-secondary"}`}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== WHY CHOOSE US ========== */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose IntegraFin?</h2>
                        <p className="text-text-secondary max-w-xl mx-auto">Here&apos;s what sets us apart in the tax and accounting industry.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyChooseUs.map((item, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 card-hover shadow-sm">
                                <div className="w-12 h-12 rounded-lg bg-accent-light flex items-center justify-center text-primary mb-4">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

