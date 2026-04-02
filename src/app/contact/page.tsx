import type { Metadata } from "next";
import { Mail, MessageSquare, MapPin, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: 'Contact IntegraFin | Tax Accountant Katy TX',
  description: 'Contact IntegraFin in Katy TX at (832) 647-1819. Located at 2039 N Mason Rd Suite 604. Book a free tax consultation with our tax expert team today. Open Mon–Fri 9AM–6PM.',
  alternates: { canonical: 'https://integrafin.tax/contact' },
  openGraph: {
    title: 'Contact IntegraFin | Tax Accountant Katy TX',
    url: 'https://integrafin.tax/contact',
  },
};

export default function ContactPage() {
    return (
        <>
            {/* Hero Section */}
            <header className="relative bg-[#0A1628] overflow-hidden py-16 sm:py-24 md:py-32">
                <div 
                    className="absolute inset-0 opacity-20 bg-cover bg-center" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIhhzL_6DrqJErXL51mOsoGwc-5kpm0Yntn1CFMGPkhbw-RFnUfzJZcqHkMpROhE4e5n7QnTL-RljoQaVK1pugbWaGvVleExURhnBwUpTZx2e3qVhE8TJdLMHfdV1DfxKTY-_FaikaNbQ4KUY1OxnEw5LYhlDgGHIhHS2-JAHHJ2P1g14KcpAARNv7dO96w5Xd0qJ3YsBUplKtXDq_d_qZZR4ZLLcAFFZ5XLARsndVNDVwKvq6KvAC0F1XamxLcx3id5kXzp2Nh1Y')" }}
                />
                <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at top right, rgba(0, 194, 203, 0.15), transparent 400px)' }} />
                <div className="relative max-w-7xl mx-auto px-5 sm:px-8 text-center md:text-left">
                    <div className="inline-block px-3 py-1 bg-[#00C2CB]/10 border border-[#00C2CB]/30 text-[#00C2CB] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        Institutional Authority
                    </div>
                    <h1 className="text-white text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-4 sm:mb-6 leading-tight max-w-4xl">
                        Get in Touch with Our Tax & <span className="text-[#00C2CB]">Accounting Experts</span>
                    </h1>
                    <p className="text-white/70 text-sm sm:text-lg md:text-xl font-light max-w-2xl mb-6 sm:mb-10 leading-relaxed">
                        Whether you need US tax filing, business bookkeeping, or cross-border tax resolution, our certified professionals are ready to help.
                    </p>
                    <button className="bg-[#00C2CB] text-[#0A1628] px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-black text-xs sm:text-sm uppercase tracking-[0.2em] shadow-2xl hover:bg-[#00cedb] transition-all">
                        Schedule a Consultation
                    </button>
                </div>
            </header>

            {/* Main Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 sm:-mt-12 md:-mt-20 pb-16 sm:pb-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-7 bg-white shadow-2xl p-5 sm:p-8 md:p-12 rounded-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2CB]/5 rounded-bl-full"></div>
                        <h2 className="text-3xl font-extrabold text-[#003580] tracking-tight mb-2">How Can We Help You?</h2>
                        <p className="text-gray-600 text-sm mb-10 font-light">Fill out the form below, and a tax advisor will reach out to you within 24 hours.</p>
                        <ContactForm />
                    </div>

                    {/* Right Column: Info */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Contact Direct Card */}
                        <div className="bg-[#003580] p-6 sm:p-10 rounded-xl text-white shadow-xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
                            <h3 className="text-2xl font-extrabold tracking-tight mb-8">Reach Us Directly</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                                        <Mail className="text-[#00C2CB] w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00C2CB] mb-1">Email Support</p>
                                        <a className="text-lg font-light hover:text-[#00C2CB] transition-colors" href="mailto:contact@integrafin.tax">contact@integrafin.tax</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                                        <MessageSquare className="text-[#00C2CB] w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00C2CB] mb-1">WhatsApp Support</p>
                                        <a className="text-lg font-light hover:text-[#00C2CB] transition-colors" href="https://wa.me/18326471819">+1-832-647-1819</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Locations Grid */}
                        <div className="grid grid-cols-1 gap-6">
                            {/* USA Location */}
                            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#0047AB]">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-black text-[#003580] tracking-tight uppercase text-sm">USA Head Office</h4>
                                    <MapPin className="text-[#0047AB]/40 w-5 h-5" />
                                </div>
                                <p className="text-gray-600 font-light text-sm leading-relaxed mb-4">
                                    IntegraFin LLC<br />
                                    2039 N Mason Rd, Suite 604<br />
                                    Katy, TX 77449
                                </p>
                                <div className="flex items-center gap-2 text-[#0047AB] font-bold text-sm">
                                    <Phone className="w-4 h-4" />
                                    <a href="tel:+18326471819" className="hover:text-[#00C2CB] transition-colors">+1-832-647-1819</a>
                                </div>
                            </div>
                            {/* India Location */}
                            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#D4A017]">
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-black text-[#003580] tracking-tight uppercase text-sm">India Operations Center</h4>
                                    <MapPin className="text-[#D4A017]/40 w-5 h-5" />
                                </div>
                                <p className="text-gray-600 font-light text-sm leading-relaxed mb-4">
                                    Block No. 214, 1st Floor, Brij Bhumi Complex<br />
                                    Nagpur, Maharashtra - 440008
                                </p>
                                <div className="flex items-center gap-2 text-[#D4A017] font-bold text-sm">
                                    <Phone className="w-4 h-4" />
                                    <a href="tel:+918855075450" className="hover:text-[#D4A017] transition-colors">+91 88550 75450</a>
                                </div>
                            </div>
                        </div>

                        {/* Trust Section */}
                        <div className="bg-white p-8 rounded-xl shadow-lg flex items-center gap-6 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full shrink-0">
                                <ShieldCheck className="text-[#0047AB] w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-[#003580] tracking-tight text-lg mb-1">Quick & Secure Payments</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    We accept <span className="font-bold text-[#0047AB]">Zelle</span> for immediate, secure processing. Every transaction is handled with institutional-grade security for IntegraFin clients.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Map Section Area */}
            <section className="pb-0 px-4 sm:px-6 mb-12">
                <div className="max-w-7xl mx-auto rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.1234!2d-95.8244!3d29.7858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s2039+N+Mason+Rd+Suite+604+Katy+TX+77449!5e0!3m2!1sen!2sus!4v1"
                        width="100%"
                        height="400"
                        style={{ border: 0, borderRadius: '12px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="IntegraFin Office Location - 2039 N Mason Rd Suite 604, Katy TX 77449"
                    />
                </div>
            </section>

            {/* ContactPoint Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        name: "Contact IntegraFin",
                        description: "Get in touch with IntegraFin for expert tax and accounting services.",
                        mainEntity: {
                            "@type": "Organization",
                            name: "IntegraFin LLC",
                            contactPoint: [
                                {
                                    "@type": "ContactPoint",
                                    telephone: "+1-832-647-1819",
                                    contactType: "customer service",
                                    areaServed: "US",
                                    availableLanguage: ["English"],
                                },
                            ],
                        },
                    }),
                }}
            />
            {/* Breadcrumb Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://integrafin.tax/" },
                  { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://integrafin.tax/contact" }
                ]
              })}}
            />
        </>
    );
}
