import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, User, Scale, PlusCircle, Rocket, TrendingUp, ShieldCheck, Gauge, Shield, 
  FileEdit, PiggyBank, CalendarDays, CheckCircle, Calculator, CreditCard, Globe, Eye, History, ArrowRight, Check, ArrowUpRight
} from "lucide-react";
import { faqSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: 'CPA Services Katy TX | Tax & Accounting | IntegraFin',
  description: 'Explore IntegraFin\'s full CPA services in Katy TX — business tax, individual filing, IRS resolution, payroll, bookkeeping, and business advisory. Free consultation.',
  alternates: { canonical: 'https://integrafin.tax/services' },
  openGraph: {
    title: 'CPA Services Katy TX | Tax & Accounting | IntegraFin',
    url: 'https://integrafin.tax/services',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const navItems = [
    { id: "business-tax", label: "Business Tax & Accounting", icon: <Building2 className="w-5 h-5" /> },
    { id: "individual-tax", label: "Individual Tax", icon: <User className="w-5 h-5" /> },
    { id: "tax-resolution", label: "Tax Resolution", icon: <Scale className="w-5 h-5" /> },
    { id: "additional-services", label: "Additional Services", icon: <PlusCircle className="w-5 h-5" /> },
    { id: "new-business", label: "New Business Formation", icon: <Rocket className="w-5 h-5" /> },
];

const businessSubServices = [
    "Accounting Software", "Full-Service Accounting", "QuickBooks Support", 
    "Monthly Bookkeeping", "Business Consulting", "Entity Selection", "M&A Advisory"
];

const businessAccordions = [
    {
        title: "Accounting Software Setup & Integration",
        desc: "Streamlining your operations with the right digital infrastructure. We specialize in QuickBooks, Xero, and Sage integrations tailored to your specific industry workflow."
    },
    {
        title: "Full-Service Monthly Accounting",
        desc: "High-level oversight for small-to-mid-sized enterprises. We manage reconciliations, financial statements, and performance metrics so you can focus on growth."
    },
    {
        title: "M&A Advisory & Strategy",
        desc: "Strategic guidance for mergers and acquisitions. We perform due diligence, structure deals for tax efficiency, and support business valuation processes."
    }
];

const personalServices = [
    {
        title: "Expert Preparation",
        desc: "Precision filing for W-2, 1099, and complex investment portfolios.",
        icon: <FileEdit className="w-7 h-7" />
    },
    {
        title: "Maximum Refund",
        desc: "Identifying every possible deduction and credit legally allowed.",
        icon: <PiggyBank className="w-7 h-7" />
    },
    {
        title: "Year-Round Planning",
        desc: "Strategic guidance through quarterly life changes, not just April.",
        icon: <CalendarDays className="w-7 h-7" />
    },
    {
        title: "Compliance Check",
        desc: "Advanced review to minimize red flags and audit risk.",
        icon: <CheckCircle className="w-7 h-7" />
    }
];

const resolutionServices = [
    {
        title: "Back Taxes",
        desc: "Structured relief strategies for prior-year liabilities and unpaid balances."
    },
    {
        title: "Audit Representation",
        desc: "Expert defense during official IRS or State inquiries to protect your interests."
    },
    {
        title: "Offer in Compromise",
        desc: "Negotiating settlements for less than what you owe based on your situation."
    }
];

const additionalServices = [
    { title: "ITIN Application & Renewal", icon: <CreditCard className="w-6 h-6" /> },
    { title: "International (FBAR/FATCA)", icon: <Globe className="w-6 h-6" /> },
    { title: "FinCEN BOI Reporting", icon: <Eye className="w-6 h-6" /> },
    { title: "Tax Filing Extension", icon: <History className="w-6 h-6" /> }
];

export default function ServicesPage() {
    return (
        <main className="text-left bg-white">
            {/* ========== HERO SECTION ========== */}
            <section className="relative hero-gradient py-24 lg:py-32 overflow-hidden min-h-[500px] flex items-center">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00C2CB]/10 border border-[#00C2CB]/30 mb-8">
                        <span className="text-[#00C2CB] text-xs font-bold tracking-[0.2em] uppercase">Elite Financial Architecture</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight max-w-4xl mb-6 leading-[1.1]">
                        Comprehensive <span className="text-[#00C2CB]">Tax & Accounting</span> Services
                    </h1>
                    <p className="text-xl text-[#d7e3fc] max-w-2xl leading-relaxed mb-10">
                        From individual tax filing to full business accounting — expert CPAs and CAs ready to help you at every step.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact" className="bg-[#00C2CB] text-[#003580] px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest shadow-lg shadow-[#00C2CB]/20 hover:scale-105 transition-transform">
                            Schedule Consultation
                        </Link>
                        <a href="tel:+18326471819" className="border border-white/30 text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-colors flex items-center gap-2">
                             Call +1-832-647-1819
                        </a>
                    </div>
                </div>
            </section>

            {/* ========== STICKY NAV ========== */}
            <nav className="sticky top-[72px] z-40 bg-white border-b border-slate-100 shadow-sm backdrop-blur-md bg-white/90">
                <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar whitespace-nowrap px-8">
                    {navItems.map((item, index) => (
                        <a 
                            key={item.id} 
                            href={`#${item.id}`} 
                            className={`px-6 py-5 text-sm font-bold flex items-center gap-2 transition-colors border-b-2 hover:text-[#0047AB] ${
                                index === 0 ? "border-[#00C2CB] text-[#00C2CB]" : "border-transparent text-[#45474c]"
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </a>
                    ))}
                </div>
            </nav>

            {/* ========== SECTION: BUSINESS TAX & ACCOUNTING ========== */}
            <section id="business-tax" className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row gap-16 scroll-mt-24 border-b border-slate-100">
                {/* Sidebar */}
                <aside className="lg:w-[30%] space-y-1">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#00C2CB] mb-6">Sub-Services</h3>
                    <div className="flex flex-col gap-1">
                        {businessSubServices.map((service, index) => (
                            <button 
                                key={index} 
                                className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                                    index === 0 
                                        ? "bg-[#0047AB] text-white font-bold" 
                                        : "hover:bg-slate-50 text-[#45474c]"
                                }`}
                            >
                                {service}
                            </button>
                        ))}
                    </div>
                </aside>
                {/* Content */}
                <div className="lg:w-[70%] text-left">
                    <header className="mb-12">
                        <h2 className="text-4xl font-black text-[#0047AB] tracking-tight mb-4">What Business Tax & Accounting Services Do We Offer?</h2>
                        <p className="text-lg text-[#45474c] leading-relaxed font-medium">Scale your business with professional-grade accounting. Our team provides high-level oversight for small-to-mid-sized enterprises.</p>
                    </header>
                    <div className="space-y-4 mb-12">
                        {businessAccordions.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-lg transition-all group">
                                <div className="flex justify-between items-center cursor-pointer">
                                    <h3 className="text-xl font-black text-[#0047AB] group-hover:text-[#00C2CB] transition-colors">{item.title}</h3>
                                    <span className="text-[#00C2CB]">
                                        <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </span>
                                </div>
                                <p className="mt-4 text-[#45474c] font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-[#003580] rounded-2xl p-10 mb-12">
                        <h3 className="text-[#00C2CB] text-xs font-black uppercase tracking-widest mb-8 text-center">Key Strategic Benefits</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { icon: <TrendingUp className="w-8 h-8 text-[#00C2CB]" />, label: "Max Profit" },
                                { icon: <ShieldCheck className="w-8 h-8 text-[#00C2CB]" />, label: "Audit Ready" },
                                { icon: <Gauge className="w-8 h-8 text-[#00C2CB]" />, label: "Real-time Data" },
                                { icon: <Shield className="w-8 h-8 text-[#00C2CB]" />, label: "Legal Shield" },
                            ].map((benefit, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 border border-white/5">
                                    <div className="mb-3">{benefit.icon}</div>
                                    <span className="text-white text-xs font-bold uppercase tracking-wider">{benefit.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link href="/contact" className="w-full bg-[#00C2CB] text-[#003580] py-5 rounded-xl font-black text-lg uppercase tracking-widest shadow-lg shadow-[#00C2CB]/20 hover:bg-[#33ced5] transition-all flex justify-center items-center gap-3">
                        Book a Business Consultation <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* ========== SECTION: INDIVIDUAL TAX SERVICES ========== */}
            <section id="individual-tax" className="bg-slate-50 py-24 scroll-mt-24 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-10 gap-16 items-center">
                    <div className="lg:col-span-6 text-left">
                        <div className="mb-12">
                            <span className="text-[#00C2CB] text-xs font-black uppercase tracking-widest">Personalized Strategy</span>
                            <h2 className="text-4xl font-black text-[#0047AB] tracking-tight mt-2">What Are Our Individual Tax Services?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {personalServices.map((service, index) => (
                                <div key={index} className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="w-14 h-14 bg-[#00C2CB]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00C2CB] group-hover:text-white text-[#00C2CB] transition-all">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-black mb-3 text-[#0047AB] group-hover:text-[#00C2CB] transition-colors">{service.title}</h3>
                                    <p className="text-sm text-[#45474c] font-medium leading-relaxed">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-4">
                        <div className="bg-[#003580] p-12 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden text-left">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Calculator className="w-[120px] h-[120px] text-white" />
                            </div>
                            <h3 className="text-3xl font-black text-white mb-6">Free Tax Estimate</h3>
                            <p className="text-[#d7e3fc] mb-8 leading-relaxed">Curious about your 2024 liability? Our experts provide assessments based on your current earnings.</p>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center gap-3 text-white text-sm font-medium"><Check className="text-[#00C2CB] w-5 h-5" /> No-obligation consultation</li>
                                <li className="flex items-center gap-3 text-white text-sm font-medium"><Check className="text-[#00C2CB] w-5 h-5" /> 15-minute rapid review</li>
                                <li className="flex items-center gap-3 text-white text-sm font-medium"><Check className="text-[#00C2CB] w-5 h-5" /> Clear path to filing</li>
                            </ul>
                            <Link href="/contact" className="w-full bg-[#00C2CB] text-[#003580] py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-[#33ced5] transition-all text-center block">
                                Get My Estimate Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== SECTION: TAX RESOLUTION SERVICES ========== */}
            <section id="tax-resolution" className="py-24 max-w-7xl mx-auto px-8 scroll-mt-24 border-b border-slate-100 text-left">
                <div className="text-center mb-16">
                    <span className="text-[#00C2CB] text-xs font-black uppercase tracking-widest">Resolution Experts</span>
                    <h2 className="text-4xl font-black text-[#0047AB] tracking-tight mt-2">How Do We Handle Tax Resolution with the IRS?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {resolutionServices.map((service, index) => (
                        <div key={index} className="bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                            <h3 className="text-xl font-black text-[#0047AB] mb-3 group-hover:text-[#00C2CB] transition-colors">{service.title}</h3>
                            <p className="text-sm text-[#45474c] font-medium leading-relaxed">{service.desc}</p>
                            <Link href="/contact" className="inline-flex items-center gap-2 text-[#00C2CB] font-bold text-xs uppercase tracking-widest mt-6 group-hover:underline">
                                Learn More <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="bg-[#003580] p-6 rounded-full flex flex-wrap justify-center gap-6">
                    {[
                        { icon: <Shield className="w-4 h-4 text-[#00C2CB]" />, label: "IRS Approved" },
                        { icon: <Scale className="w-4 h-4 text-[#00C2CB]" />, label: "Legal Defense" },
                        { icon: <User className="w-4 h-4 text-[#00C2CB]" />, label: "Enrolled Agent" },
                    ].map((badge, i) => (
                        <span key={i} className="px-6 py-2 bg-white/10 rounded-full text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            {badge.icon} {badge.label}
                        </span>
                    ))}
                </div>
            </section>

            {/* ========== SECTION: ADDITIONAL SERVICES ========== */}
            <section id="additional-services" className="bg-slate-50 py-24 scroll-mt-24 border-b border-slate-100 text-left">
                <div className="max-w-4xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <span className="text-[#00C2CB] text-xs font-black uppercase tracking-widest">Specialized Support</span>
                        <h2 className="text-4xl font-black text-[#0047AB] tracking-tight mt-2">Additional Services</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {additionalServices.map((service, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-[#00C2CB]">
                                    {service.icon}
                                </div>
                                <div className="font-bold text-[#0047AB]">{service.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== SECTION: NEW BUSINESS FORMATION ========== */}
            <section id="new-business" className="py-24 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-10 gap-20 items-center scroll-mt-24 border-b border-slate-100 text-left">
                <div className="lg:col-span-5">
                    <div className="mb-12">
                        <span className="text-[#00C2CB] text-xs font-black uppercase tracking-widest">Startup Foundation</span>
                        <h2 className="text-4xl font-black text-[#0047AB] tracking-tight mt-2">New Business Formation</h2>
                    </div>
                    <div className="space-y-8">
                        <div className="flex gap-6 items-start">
                            <span className="flex-shrink-0 w-12 h-12 bg-[#00C2CB]/10 text-[#00C2CB] rounded-2xl flex items-center justify-center font-black">1</span>
                            <div>
                                <h3 className="font-black text-xl text-[#0047AB]">Entity Selection</h3>
                                <p className="text-[#45474c] font-medium leading-relaxed">LLC, S-Corp, or C-Corp? We choose the path of least liability and optimal tax structure.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <span className="flex-shrink-0 w-12 h-12 bg-[#00C2CB]/10 text-[#00C2CB] rounded-2xl flex items-center justify-center font-black">2</span>
                            <div>
                                <h3 className="font-black text-xl text-[#0047AB]">State Registration</h3>
                                <p className="text-[#45474c] font-medium leading-relaxed">Seamless filing with Secretary of State and local regulators to get you operational fast.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-5">
                    <div className="bg-[#003580] p-12 rounded-2xl text-center shadow-2xl">
                        <h3 className="text-3xl font-black text-white mb-6">Ready to Start Your Business?</h3>
                        <p className="text-[#d7e3fc] mb-10 text-lg leading-relaxed">Don't risk your vision on DIY templates. Get the professional foundation your enterprise deserves.</p>
                        <Link href="/contact" className="bg-[#00C2CB] text-[#003580] px-12 py-5 rounded-lg font-black text-sm uppercase tracking-widest shadow-lg shadow-[#00C2CB]/20 hover:bg-[#33ced5] transition-all inline-block">
                            Launch My Venture
                        </Link>
                    </div>
                </div>
            </section>

            {/* ========== FAQ SECTION ========== */}
            <section id="faq" className="py-24 max-w-4xl mx-auto px-8 scroll-mt-24 border-b border-slate-100 text-left">
                <div className="text-center mb-16">
                    <span className="text-[#00C2CB] text-xs font-black uppercase tracking-widest">Questions</span>
                    <h2 className="text-4xl font-black text-[#0047AB] tracking-tight mt-2">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                    {faqSchema.mainEntity.map((item: any, index: number) => (
                        <div key={index} className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-lg transition-all group">
                            <div className="flex justify-between items-center cursor-pointer">
                                <h3 className="text-xl font-black text-[#0047AB] group-hover:text-[#00C2CB] transition-colors">{item.name}</h3>
                                <PlusCircle className="w-5 h-5 text-[#00C2CB] group-hover:scale-110 transition-transform flex-shrink-0" />
                            </div>
                            <p className="mt-4 text-[#45474c] font-medium leading-relaxed text-sm">{item.acceptedAnswer.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========== CALLBACK FORM ========== */}
            <section id="consultation" className="py-24 px-8 bg-slate-50 text-left">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white">
                    <div className="md:w-1/2 relative min-h-[400px]">
                        <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqIPXCUDvGTyS7-6C5y5tdzXQP-YV9Klp6GqmaoCIBcO02CXd0UVW1-lybvnnVC4YcJWR8xaKNB3yRqpHgJEiti9g1_rl5kr6lvTiI41qPag5qD9RBYY6pF4Yo5PEV_P3U8nR4e2mJvVqBZM7k2GeRO7cOIizlk3fmgeGmTwjqbVEs57z-NE8qZuBjI4ebOuqKWWJmKgB_Tj24_bPk4Xp_ZiV0x-rt1hh_uErnPUSCtBPPpM-gszKEyk02v0F1UjUvcImFL0L5Fl8" alt="IntegraFin Tax Consultant reviewing strategy" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                        <div className="absolute inset-0 bg-[#0047AB]/20"></div>
                    </div>
                    <div className="md:w-1/2 p-12 lg:p-16">
                        <h3 className="text-[#0047AB] text-3xl font-black mb-8">Request a Free Callback</h3>
                        <form className="space-y-4">
                            <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all" placeholder="Full Name" type="text" />
                            <div className="grid grid-cols-2 gap-4">
                                <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all" placeholder="Email" type="email" />
                                <input className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all" placeholder="Phone" type="tel" />
                            </div>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#45474c] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all">
                                <option>Service Interested In</option>
                                <option>Business Tax & Accounting</option>
                                <option>Individual Tax Preparation</option>
                                <option>Tax Resolution Services</option>
                                <option>New Business Formation</option>
                            </select>
                            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all" placeholder="Message" rows={4}></textarea>
                            <button className="w-full bg-[#00C2CB] text-[#003580] py-5 rounded-lg font-black uppercase tracking-[0.2em] shadow-lg shadow-[#00C2CB]/20 hover:bg-[#33ced5] transition-all">Request Callback</button>
                            <div className="pt-4 text-center">
                                <p className="text-xs text-[#45474c]">Prefer to call? <a href="tel:+18326471819" className="text-[#0047AB] font-bold hover:underline">+1-832-647-1819</a> • Available 24/7</p>
                            </div>
                        </form>
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
                        itemListElement: [
                            { "@type": "ListItem", position: 1, item: { "@type": "Service", name: "Business Tax & Accounting" } },
                            { "@type": "ListItem", position: 2, item: { "@type": "Service", name: "Individual Tax Services" } },
                            { "@type": "ListItem", position: 3, item: { "@type": "Service", name: "Tax Resolution Services" } },
                            { "@type": "ListItem", position: 4, item: { "@type": "Service", name: "Additional Services" } },
                            { "@type": "ListItem", position: 5, item: { "@type": "Service", name: "New Business Formation" } },
                        ].map((s, i) => ({
                            ...s,
                            item: {
                                ...s.item,
                                description: "Expert accounting and tax services.",
                                provider: { "@type": "Organization", name: "IntegraFin LLC" }
                            }
                        }))
                    }),
                }}
            />
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </main>
    );
}
