import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Landmark, BarChart3, BookOpen, Gavel, ArrowRight } from "lucide-react";

export const metadata = {
  title: 'About IntegraFin | CPA Firm in Katy, TX',
  description: 'Learn about IntegraFin\'s team of licensed CPAs serving Katy TX. 21+ years of experience in tax compliance, bookkeeping, payroll, and financial planning for businesses.',
  alternates: { canonical: 'https://integrafin.tax/about' },
  openGraph: {
    title: 'About IntegraFin | CPA Firm in Katy, TX',
    url: 'https://integrafin.tax/about',
  },
};

export default function AboutPage() {
    return (
        <main className="pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[819px] flex items-center overflow-hidden bg-[#003580]">
                <div className="absolute inset-0 opacity-20">
                    <Image 
                        className="w-full h-full object-cover" 
                        alt="high-angle shot of a minimalist modern office desk with architectural blueprints and a laptop in cool blue tones" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoC7k9XbO4pUeh2HOHpbt_KzIV4fThZP-T3G-6CUG5AXIImdgUQtavhElM3BZo1MtaO2mMCf3CYiypVlf4q28brw1RqGnLItvluLyJq8VzgckbfOaEJnTqsPA1Wu2txE-HrdxnOKfUKqwYFUjcCPj04Msd5cfy5zmE9OQVZ3YoolgPWpXc6MwX7GdMzshtZErAt6w5d3_N29bcBwfeAhjTy2XONvvBzMc7TZZqOaT1ZE5SVNKQfOj_P0sAC0CVxAlML_4aNoXVGx8"
                        fill
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#003580] via-[#003580]/80 to-transparent"></div>
                <div className="relative max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <span className="inline-block bg-[#00C2CB]/20 text-[#97f0ff] border border-[#00C2CB]/30 px-4 py-1 text-[10px] font-black tracking-[0.3em] uppercase rounded-full">
                            Institutional Authority
                        </span>
                        <h1 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] transition-all">
                            About IntegraFin | Expert CPA Firm
                        </h1>
                        <p className="text-[#d7e3fc] text-lg md:text-xl font-light max-w-xl leading-relaxed">
                            Navigate the complexities of IRS regulations with precision. We maximize your tax refunds while providing dedicated audit support and strategic financial engineering.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="/contact" className="bg-[#00C2CB] text-[#001f24] px-10 py-4 rounded-lg font-bold tracking-widest uppercase text-sm shadow-xl shadow-[#00C2CB]/20 hover:scale-105 transition-transform">
                                Get Started
                            </Link>
                            <Link href="/services" className="border border-white/30 text-white px-10 py-4 rounded-lg font-bold tracking-widest uppercase text-sm hover:bg-white/5 transition-colors">
                                View Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Stats */}
            <section className="bg-[#f2f4f7] py-12 border-y border-gray-200/10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <span className="text-4xl font-black text-[#0047AB] tracking-tighter">217K+</span>
                            <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase leading-tight">Happy<br/>Clients</span>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4 border-x border-gray-200 px-8">
                            <span className="text-4xl font-black text-[#0047AB] tracking-tighter">21+ Years</span>
                            <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase leading-tight">Industry<br/>Experience</span>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <span className="text-4xl font-black text-[#0047AB] tracking-tighter uppercase">ISO</span>
                            <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase leading-tight">Certified<br/>Standard</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 bg-[#f7f9fc]">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-7 space-y-8">
                            <label className="text-[10px] font-black text-[#00C2CB] tracking-[0.3em] uppercase">The Sovereign Blueprint</label>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-[#003580] tracking-tighter">Our Story: Why Integrafin Was Started</h2>
                            <div className="space-y-6 text-lg text-[#45474c] font-light leading-relaxed">
                                <p>
                                    Integrafin was born from a singular realization: the American tax system had become a source of immense stress rather than a structured path to financial health. Our founders, veterans of big-four accounting firms, saw a gap between automated "one-size-fits-all" software and prohibitively expensive private counsel.
                                </p>
                                <p>
                                    We built a firm that combines algorithmic precision with human-centric expertise. Our relief-focused approach ensures that every client feels heard, protected, and empowered to reclaim their financial narrative from the complexities of the IRS.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-5 relative">
                            <div className="aspect-square bg-[#003580] rounded-2xl overflow-hidden shadow-2xl">
                                <Image 
                                    className="w-full h-full object-cover grayscale contrast-125 opacity-80" 
                                    alt="collaborative business environment with professional consultants reviewing documents in a bright sunlit glass office" 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4b17aucdOQWxdndSvAuG_JkO9Y7zBXxfiGg6ia2f5gqTWOWlJG4fp6DRuCOjbt0VnSPWS9Q7OnjMGsVmonVtFMKYd6Xu74bPmc4Zr769i9AEyg9kKdUjS_GIszZEvfTIy4trJV6F3cNI_JIhibYRalswoQXWj6pqpXxCdN94VGFtlT0kqgMUyw9Gb9Yc42pS02iM2CmMg3o1UW9zhV21eVENCWwWqXCNhfAvt-wDt3oFKEYLBF-XtoFF5IUf-TsNJae63zhU0p5g"
                                    width={600}
                                    height={600}
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-[#00C2CB] p-8 rounded-xl shadow-2xl">
                                <ShieldCheck className="text-white w-10 h-10" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-[#f2f4f7]">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <div className="group relative bg-white p-12 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2CB]/5 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150 group-hover:bg-[#00C2CB]/10"></div>
                            <label className="text-[10px] font-black text-[#D4A017] tracking-[0.3em] uppercase block mb-6">Foundation</label>
                            <h3 className="text-3xl font-extrabold text-[#003580] mb-6 tracking-tighter">Our Mission</h3>
                            <p className="text-[#45474c] text-lg font-light leading-relaxed">
                                To democratize high-end financial engineering for small businesses, providing the help and strategic leverage typically reserved for large-scale corporations.
                            </p>
                        </div>
                        {/* Vision */}
                        <div className="group relative bg-[#003580] p-12 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2CB]/10 rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150"></div>
                            <label className="text-[10px] font-black text-[#00C2CB] tracking-[0.3em] uppercase block mb-6">Aspiration</label>
                            <h3 className="text-3xl font-extrabold text-white mb-6 tracking-tighter">Our Vision</h3>
                            <p className="text-[#d7e3fc] text-lg font-light leading-relaxed">
                                To be recognized as the most trusted online tax filing partner in the USA, defined by our clinical precision and unwavering commitment to client growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16 space-y-4">
                        <label className="text-[10px] font-black text-[#00C2CB] tracking-[0.3em] uppercase">Core Competencies</label>
                        <h2 className="text-4xl font-extrabold text-[#003580] tracking-tighter">Strategic Tax Architectures</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
                        {[
                            { icon: Landmark, title: "US Tax Filing", desc: "Comprehensive federal and state filing for complex financial profiles." },
                            { icon: BarChart3, title: "Planning", desc: "Year-round tax strategy to minimize liabilities and maximize future wealth." },
                            { icon: BookOpen, title: "Bookkeeping", desc: "Meticulous financial record keeping that ensures audit-ready compliance." },
                            { icon: Gavel, title: "Compliance", desc: "Strict adherence to evolving IRS mandates and regulatory frameworks." }
                        ].map((item, index) => (
                            <div key={index} className={`p-8 group hover:bg-[#0047AB] transition-colors duration-300 ${index % 2 === 0 ? 'bg-[#f2f4f7]' : 'bg-[#eceef1]'}`}>
                                <item.icon className="text-[#00C2CB] mb-6 w-10 h-10 group-hover:text-white transition-colors" />
                                <h4 className="text-lg font-bold text-[#0047AB] group-hover:text-white mb-2 uppercase tracking-wide">{item.title}</h4>
                                <p className="text-sm text-[#45474c] group-hover:text-white/80 font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-[#f2f4f7]">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: "Maximum Refund Guarantee", desc: "Our proprietary optimization engine scans thousands of deductions to ensure you retain every dollar you're legally entitled to." },
                            { title: "Expert Guidance", desc: "Direct access to certified tax architects who understand the nuance of your specific industry and financial situation." },
                            { title: "Transparent Pricing", desc: "No hidden surcharges or volume-based fees. Just clear, flat-rate institutional pricing designed for long-term partnership." }
                        ].map((item, index) => (
                            <div key={index} className="space-y-6">
                                <div className="w-16 h-1 bg-[#00C2CB]"></div>
                                <h3 className="text-2xl font-black text-[#003580] tracking-tight leading-none">{item.title}</h3>
                                <p className="text-[#45474c] font-light leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Who We Serve */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold text-[#003580] tracking-tighter">Engineered For Your Profile</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { tier: "01", title: "Individuals", desc: "Personal tax optimization for high-net-worth individuals and families seeking privacy and precision.", border: "border-[#0047AB]" },
                            { tier: "02", title: "Freelancers", desc: "Strategic expense tracking and quarterly estimates for the modern independent professional.", border: "border-[#00C2CB]" },
                            { tier: "03", title: "Small Businesses", desc: "Entity structuring, payroll compliance, and comprehensive corporate filing for growth-focused SMEs.", border: "border-[#D4A017]" }
                        ].map((item, index) => (
                            <div key={index} className={`bg-[#f7f9fc] p-10 rounded-xl border-t-4 ${item.border} shadow-lg`}>
                                <h5 className="text-xs font-black tracking-[0.2em] text-gray-400 uppercase mb-4">Tier {item.tier}</h5>
                                <h4 className="text-2xl font-extrabold text-[#003580] mb-6">{item.title}</h4>
                                <p className="text-[#45474c] font-light mb-8">{item.desc}</p>
                                <Link href="/services" className="inline-flex items-center text-[#0047AB] font-bold text-xs uppercase tracking-widest hover:text-[#00C2CB] transition-colors">
                                    View Roadmap <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section className="py-24 bg-[#003580] text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-20">
                        <label className="text-[10px] font-black text-[#00C2CB] tracking-[0.3em] uppercase">The Lifecycle</label>
                        <h2 className="text-4xl font-extrabold tracking-tighter mt-2">The Integrafin Protocol</h2>
                    </div>
                    <div className="relative flex flex-col md:flex-row justify-between gap-8">
                        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-white/20 z-0"></div>
                        {[
                            { num: "01", title: "Connect", desc: "Securely upload your financial documents via our encrypted portal." },
                            { num: "02", title: "Calculate", desc: "Our architects analyze your data to optimize every possible credit." },
                            { num: "03", title: "Review", desc: "Collaborative finalization to ensure 100% accuracy and clarity." },
                            { num: "04", title: "File", desc: "Direct submission to the IRS with institutional-grade confirmation." }
                        ].map((item, index) => (
                            <div key={index} className="relative z-10 flex-1 text-center md:text-left group">
                                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:bg-[#00C2CB] transition-colors duration-500">
                                    <span className="text-2xl font-black">{item.num}</span>
                                </div>
                                <h5 className="text-xl font-bold mb-2">{item.title}</h5>
                                <p className="text-[#d7e3fc] text-sm font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-[#f7f9fc] flex items-center justify-center">
                <div className="max-w-4xl mx-auto px-8 text-center space-y-10">
                    <h2 className="text-4xl md:text-6xl font-black text-[#003580] tracking-tighter leading-none">Ready to Maximize Your Tax Refund?</h2>
                    <p className="text-xl text-[#45474c] font-light max-w-2xl mx-auto">Join thousands of businesses and individuals who have secured their financial future with Integrafin.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/contact" className="bg-[#00C2CB] text-[#001f24] px-12 py-5 rounded font-black tracking-widest uppercase shadow-2xl shadow-[#00C2CB]/30 hover:scale-105 transition-all">
                            Book a Consultation
                        </Link>
                        <Link href="/services" className="text-[#0047AB] font-bold tracking-widest uppercase text-sm border-b-2 border-[#0047AB]/20 hover:border-[#0047AB] transition-all pb-1">
                            Explore Pricing
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
