import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
    title: "Our Services",
    description:
        "Explore IntegraFin's comprehensive tax, accounting, and business advisory services including business tax, individual tax, tax resolution, payroll, bookkeeping, and more.",
    openGraph: {
        title: "Our Services | IntegraFin",
        description: "Comprehensive tax and accounting services for businesses and individuals.",
        url: "https://integrafin.tax/services",
    },
};

const mainServices = [
    {
        id: "business-tax",
        title: "Business Tax & Accounting",
        desc: "Comprehensive accounting and bookkeeping solutions, including software implementation, payroll, financial statements, and tax compliance for businesses of all sizes.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
    },
    {
        id: "individual-tax",
        title: "Individual Tax Services",
        desc: "Expert tax preparation and planning to maximize deductions and ensure compliance with IRS regulations for individuals and families.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
    },
    {
        id: "tax-resolution",
        title: "Tax Resolution Services",
        desc: "Assistance with back taxes, IRS audits, penalty abatements, and tax negotiations to resolve outstanding tax issues efficiently.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        id: "additional",
        title: "Additional Services",
        desc: "Support for ITIN, SSN, FEIN applications, international compliance (FBAR & FATCA), business certifications, and secure document management.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        ),
    },
    {
        id: "consultation",
        title: "New Business & Consultation",
        desc: "Starting a new business is exciting yet challenging. We provide strategic decision-making support, entity formation, and financial planning for startups.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        id: "industries",
        title: "Industries Served",
        desc: "We cater to real estate, construction, manufacturing, healthcare, financial services, legal, retail, and technology industries with tailored solutions.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

const steps = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
        title: "Consultation Section",
        desc: "Schedule a free consultation to discuss your tax and accounting needs with our expert team.",
        active: false,
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),
        title: "Choose Your Package",
        desc: "Select the service package that fits your needs — from individual filing to full business accounting.",
        active: true,
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "Get Your Service",
        desc: "Our expert CPAs handle everything, ensuring compliance and maximizing your returns.",
        active: false,
    },
];

export default function ServicesPage() {
    return (
        <>
            <PageHeader
                title="Our Services"
                breadcrumb="Services"
                description="IntegraFin offers a full range of accounting and tax services tailored to businesses and individuals."
            />

            {/* ========== SERVICES GRID ========== */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold text-text-secondary mb-2">
                            We Have An Amazing <span className="bg-accent-dark text-white px-2 py-0.5 rounded text-xs">Service</span>
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Real Accounting Services For You
                        </h2>
                        <p className="text-text-secondary max-w-xl mx-auto">
                            Comprehensive financial solutions designed to keep your business compliant and thriving.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mainServices.map((service) => (
                            <div key={service.id} id={service.id} className="bg-white border border-gray-100 rounded-xl p-6 card-hover shadow-sm">
                                <div className="w-14 h-14 rounded-xl bg-accent-light flex items-center justify-center text-primary mb-5">
                                    {service.icon}
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-3">{service.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed mb-4">{service.desc}</p>
                                <Link href="/contact" className="text-primary text-sm font-semibold inline-flex items-center hover:underline">
                                    Learn More
                                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        ))}
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

            {/* ========== TESTIMONIALS ========== */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                        <div>
                            <p className="text-sm font-semibold text-text-secondary mb-2">
                                Client <span className="bg-accent-dark text-white px-2 py-0.5 rounded text-xs">Testimonial</span>
                            </p>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-5 leading-tight">
                                What They Say<br />About Us?
                            </h2>
                            <p className="text-text-secondary leading-relaxed mb-6">
                                Our clients trust us for reliable, professional, and personalized financial services.
                            </p>
                            <Link href="/contact" className="inline-flex items-center px-7 py-3 bg-accent-dark text-white font-semibold rounded-full hover:bg-primary transition-colors">
                                See More
                            </Link>
                        </div>
                        <div className="bg-accent-light rounded-2xl p-8 relative">
                            <p className="text-foreground leading-relaxed mb-5 italic text-lg">
                                &quot;The team at IntegraFin helped me navigate complex tax regulations with ease. Their knowledge and professionalism gave me peace of mind during tax season.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-primary font-bold">S</span>
                                </div>
                                <div>
                                    <p className="font-bold text-foreground">Sarah M</p>
                                    <p className="text-text-secondary text-sm">Independent Consultant</p>
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

            {/* Service Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        itemListElement: mainServices.map((s, i) => ({
                            "@type": "ListItem",
                            position: i + 1,
                            item: {
                                "@type": "Service",
                                name: s.title,
                                description: s.desc,
                                provider: {
                                    "@type": "Organization",
                                    name: "IntegraFin LLC",
                                },
                            },
                        })),
                    }),
                }}
            />
        </>
    );
}
