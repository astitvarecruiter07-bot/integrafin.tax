import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Target, Lightbulb, CheckCircle2, ArrowRight, Landmark } from "lucide-react";
import { personSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: 'About IntegraFin | Trusted Tax Professionals in Katy, TX',
  description: 'Discover IntegraFin and our commitment to delivering reliable tax, accounting, and business advisory services.',
  alternates: { canonical: 'https://integrafin.tax/about' },
  openGraph: {
    title: 'About IntegraFin | Trusted Tax Professionals in Katy, TX',
    url: 'https://integrafin.tax/about',
  },
};

export default function AboutPage() {
    return (
        <main className="pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[400px] sm:min-h-[600px] flex items-center overflow-hidden bg-primary-dark">
                <div className="absolute inset-0 opacity-20">
                    <Image 
                        className="w-full h-full object-cover" 
                        alt="high-angle shot of a minimalist modern office desk" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoC7k9XbO4pUeh2HOHpbt_KzIV4fThZP-T3G-6CUG5AXIImdgUQtavhElM3BZo1MtaO2mMCf3CYiypVlf4q28brw1RqGnLItvluLyJq8VzgckbfOaEJnTqsPA1Wu2txE-HrdxnOKfUKqwYFUjcCPj04Msd5cfy5zmE9OQVZ3YoolgPWpXc6MwX7GdMzshtZErAt6w5d3_N29bcBwfeAhjTy2XONvvBzMc7TZZqOaT1ZE5SVNKQfOj_P0sAC0CVxAlML_4aNoXVGx8"
                        fill
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/80 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full py-12 sm:py-0">
                    <div className="max-w-3xl space-y-8">
                        <span className="inline-block bg-secondary/20 text-[#97f0ff] border border-secondary/30 px-4 py-1 text-[10px] font-black tracking-[0.3em] uppercase rounded-full">
                            Trusted Tax & Accounting Professionals
                        </span>
                        <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] transition-all">
                            About Our Company
                        </h1>
                        <p className="text-[#d7e3fc] text-base sm:text-lg md:text-xl font-light leading-relaxed">
                            IntegraFin is a trusted leader in tax and accounting services, committed to delivering accuracy and compliance for businesses.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
                            <Link href="/contact" className="bg-secondary text-[#003580] px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg font-bold tracking-widest uppercase text-xs sm:text-sm shadow-xl shadow-secondary/20 hover:scale-105 transition-transform text-center">
                                Contact Us
                            </Link>
                            <Link href="/services" className="border border-white/30 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-lg font-bold tracking-widest uppercase text-xs sm:text-sm hover:bg-white/5 transition-colors text-center">
                                View Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Company Content */}
            <section className="py-12 sm:py-24 bg-section-bg">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7 space-y-8">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-dark tracking-tighter">Committed to Accuracy and Compliance</h2>
                            <div className="space-y-6 text-base sm:text-lg text-[#45474c] font-light leading-relaxed">
                                <p>
                                    At IntegraFin, we are dedicated to providing comprehensive tax, accounting, and business advisory services tailored to meet the unique needs of individuals and businesses. With a team of highly skilled tax experts and financial professionals, we bring years of expertise in tax compliance, bookkeeping, payroll, and financial planning.
                                </p>
                                <p>
                                    We tailor our solutions to meet the unique financial needs of each client, ensuring smooth operations and strategic growth. Our expertise in tax planning, bookkeeping, and financial management helps businesses stay efficient and competitive.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-5 relative">
                            <div className="aspect-square bg-primary-dark rounded-2xl overflow-hidden shadow-2xl">
                                <Image 
                                    className="w-full h-full object-cover grayscale contrast-125 opacity-80" 
                                    alt="professional consultants reviewing documents in an office" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4b17aucdOQWxdndSvAuG_JkO9Y7zBXxfiGg6ia2f5gqTWOWlJG4fp6DRuCOjbt0VnSPWS9Q7OnjMGsVmonVtFMKYd6Xu74bPmc4Zr769i9AEyg9kKdUjS_GIszZEvfTIy4trJV6F3cNI_JIhibYRalswoQXWj6pqpXxCdN94VGFtlT0kqgMUyw9Gb9Yc42pS02iM2CmMg3o1UW9zhV21eVENCWwWqXCNhfAvt-wDt3oFKEYLBF-XtoFF5IUf-TsNJae63zhU0p5g"
                                    width={600}
                                    height={600}
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-secondary p-4 sm:p-8 rounded-xl shadow-2xl hidden sm:block">
                                <Target className="text-white w-10 h-10" />
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
                                Our mission is to simplify tax and accounting complexities, enabling businesses and individuals to maximize deductions, optimize financial strategies, and stay compliant with evolving tax regulations. We aim to be a trusted partner in your financial success, offering seamless support with precision, integrity, and reliability.
                            </p>
                        </div>
                        {/* Approach */}
                        <div className="group relative bg-[#003580] p-6 sm:p-12 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2CB]/10 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150"></div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 sm:mb-6 tracking-tighter">Our Approach</h3>
                            <p className="text-[#d7e3fc] text-lg font-light leading-relaxed">
                                We take a client-first approach, ensuring every business and individual gets strategic, proactive financial advice to drive growth, reduce tax liabilities, and remain compliant. Whether you are a startup, a growing enterprise, or an individual seeking tax optimization, we have the expertise to guide you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-12 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-5 sm:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003580] tracking-tighter">Why Choose IntegraFin</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Expert Guidance", desc: "A team of seasoned professionals with deep industry knowledge.", icon: Lightbulb },
                            { title: "Trust & Security", desc: "Confidential and secure handling of financial data.", icon: ShieldCheck },
                            { title: "Tailored Solutions", desc: "Personalized services to suit your specific needs.", icon: Target },
                            { title: "Technology-Driven", desc: "Support for QuickBooks, Xero, Zoho, and other accounting software.", icon: ArrowRight },
                            { title: "Seamless Compliance", desc: "IRS & State tax process support, tax resolution services, and audit representation.", icon: CheckCircle2 },
                            { title: "Comprehensive Services", desc: "From business entity formation to payroll, bookkeeping, and IRS representation, we handle it all.", icon: Landmark }
                        ].map((item, index) => (
                            <div key={index} className="p-8 border border-gray-100 rounded-xl hover:shadow-xl transition-shadow duration-300">
                                <item.icon className="text-[#0092df] mb-6 w-8 h-8" />
                                <h4 className="text-xl font-bold text-[#003580] mb-3">{item.title}</h4>
                                <p className="text-[#45474c] font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-12 sm:py-24 bg-[#003580] text-center">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6 sm:space-y-10">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">Ready to Let Us Handle Your Finances?</h2>
                    <p className="text-base sm:text-xl text-[#d7e3fc] font-light max-w-2xl mx-auto">Get in touch today to discover how we can benefit your individual or business tax situation.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact" className="bg-[#00C2CB] text-[#003580] px-12 py-5 rounded font-black tracking-widest uppercase shadow-xl hover:scale-105 transition-all">
                            Book a Consultation
                        </Link>
                    </div>
                </div>
            </section>
            {/* Person Schema for E-E-A-T */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
        </main>
    );
}
