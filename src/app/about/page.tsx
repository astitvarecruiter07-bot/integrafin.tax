import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Target, CheckCircle2, Landmark, MapPin, FileText, ClipboardCheck, Map } from "lucide-react";

export const metadata: Metadata = {
  title: 'About IntegraFin | Tax & Accounting Services in Katy, TX',
  description: 'Learn where IntegraFin is based, the tax and accounting services offered, and the documented process used to scope client work.',
  alternates: { canonical: 'https://integrafin.tax/about' },
  openGraph: {
    title: 'About IntegraFin | Tax & Accounting Services in Katy, TX',
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
                        alt="Illustrative office workspace"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoC7k9XbO4pUeh2HOHpbt_KzIV4fThZP-T3G-6CUG5AXIImdgUQtavhElM3BZo1MtaO2mMCf3CYiypVlf4q28brw1RqGnLItvluLyJq8VzgckbfOaEJnTqsPA1Wu2txE-HrdxnOKfUKqwYFUjcCPj04Msd5cfy5zmE9OQVZ3YoolgPWpXc6MwX7GdMzshtZErAt6w5d3_N29bcBwfeAhjTy2XONvvBzMc7TZZqOaT1ZE5SVNKQfOj_P0sAC0CVxAlML_4aNoXVGx8"
                        fill
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/80 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full py-12 sm:py-0">
                    <div className="max-w-3xl space-y-8">
                        <span className="inline-block bg-secondary/20 text-[#97f0ff] border border-secondary/30 px-4 py-1 text-[10px] font-black tracking-[0.3em] uppercase rounded-full">
                            Katy Tax &amp; Accounting Services
                        </span>
                        <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] transition-all">
                            About Our Company
                        </h1>
                        <p className="text-[#d7e3fc] text-base sm:text-lg md:text-xl font-light leading-relaxed">
                            IntegraFin provides tax preparation, bookkeeping, payroll-record support, and IRS notice help from its Katy, Texas office.
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
                        <div className="lg:col-span-5 relative">
                            <div className="aspect-square bg-primary-dark rounded-2xl overflow-hidden shadow-2xl">
                                <Image 
                                    className="w-full h-full object-cover grayscale contrast-125 opacity-80" 
                                    alt="Illustrative document-review workspace"
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
                                Our mission is to make tax and accounting work easier to follow by organizing records, identifying deadlines, documenting open questions, and explaining the next step in plain language.
                            </p>
                        </div>
                        {/* Approach */}
                        <div className="group relative bg-[#003580] p-6 sm:p-12 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
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
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#003580] tracking-tighter">What You Can Verify</h2>
                        <p className="mx-auto max-w-3xl text-[#45474c] leading-relaxed">These details are published on the website so prospective clients can review the location, scope, process, and limitations before engaging IntegraFin.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Published Katy Office", desc: "2039 N Mason Rd, Suite 604, Katy, TX 77449, with weekday hours and direct contact details published on the Contact page.", icon: MapPin },
                            { title: "Written Service Scope", desc: "The requested work, records needed, client responsibilities, and known limitations are defined before broader work begins.", icon: FileText },
                            { title: "Record-First Review", desc: "Returns, statements, payroll reports, entity documents, and notices are reviewed before fact-dependent conclusions are presented.", icon: ClipboardCheck },
                            { title: "Transparent Service Areas", desc: "Katy is identified as the office; nearby Texas cities are described as service areas rather than additional office locations.", icon: Map },
                            { title: "Documented Workflow", desc: "Published service pages describe intake, scope, record collection, reconciliation, preparation, client review, and next steps.", icon: CheckCircle2 },
                            { title: "Clear Outcome Boundaries", desc: "Refunds, savings, penalty relief, settlement terms, and agency decisions are not guaranteed and depend on the facts and applicable rules.", icon: Landmark }
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
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">Ready to Organize the Next Step?</h2>
                    <p className="text-base sm:text-xl text-[#d7e3fc] font-light max-w-2xl mx-auto">Describe the filing, bookkeeping, payroll-record, or IRS notice issue and the team will identify the initial records and appropriate service scope.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact" className="bg-[#00C2CB] text-[#003580] px-12 py-5 rounded font-black tracking-widest uppercase shadow-xl hover:scale-105 transition-all">
                            Book a Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
