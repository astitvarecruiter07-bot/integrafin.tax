import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with IntegraFin for expert tax, accounting, and business advisory services. Offices in Katy, TX and Nagpur, India. Call +1-832-647-1819.",
    openGraph: {
        title: "Contact Us | IntegraFin",
        description: "Contact IntegraFin for professional tax and accounting services.",
        url: "https://integrafin.tax/contact",
    },
};

const contactInfo = [
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        title: "Phone Number",
        value: "+1-832-647-1819",
        href: "tel:+18326471819",
        highlight: false,
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        title: "Email Address",
        value: "contact@integrafin.tax",
        href: "mailto:contact@integrafin.tax",
        highlight: true,
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "Work Hours",
        value: "9AM – 6PM Weekdays",
        href: null,
        highlight: false,
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: "Our Location",
        value: "2039 N Mason Rd, Suite 604, Katy, TX",
        href: "https://maps.google.com/?q=2039+N+Mason+Rd+Suite+604+Katy+TX+77449",
        highlight: false,
    },
];

export default function ContactPage() {
    return (
        <>
            <PageHeader
                title="Contact Us Now!"
                breadcrumb="Contact Us"
                description="Get in touch with our team for expert tax, accounting, and business advisory services."
            />

            {/* ========== CONTACT FORM & QUOTE ========== */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-10">
                        {/* Left - CEO Quote */}
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/80 to-accent-dark min-h-[300px] sm:min-h-[400px] flex items-end p-6 sm:p-8">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="relative z-10 text-white">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                                    </svg>
                                </div>
                                <p className="text-white/90 leading-relaxed mb-4 text-sm">
                                    Our mission is to simplify tax and accounting complexities, enabling businesses and individuals to maximize deductions, optimize financial strategies, and stay compliant with evolving tax regulations.
                                </p>
                                <div className="border-t border-white/20 pt-4">
                                    <p className="font-bold text-lg">IntegraFin Team</p>
                                    <p className="text-white/70 text-sm">Expert CPAs & Financial Advisors</p>
                                </div>
                            </div>
                        </div>

                        {/* Right - Contact Form */}
                        <div className="bg-[#1B2A4A] rounded-2xl p-6 sm:p-8 md:p-10">
                            <form className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        aria-label="Your name"
                                        className="w-full px-5 py-3.5 bg-[#2D2347] text-white rounded-xl placeholder:text-gray-400 border border-[#3D3357] focus:border-primary focus:outline-none transition-colors"
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        aria-label="Phone number"
                                        className="w-full px-5 py-3.5 bg-[#2D2347] text-white rounded-xl placeholder:text-gray-400 border border-[#3D3357] focus:border-primary focus:outline-none transition-colors"
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    aria-label="Email address"
                                    className="w-full px-5 py-3.5 bg-[#2D2347] text-white rounded-xl placeholder:text-gray-400 border border-[#3D3357] focus:border-primary focus:outline-none transition-colors"
                                />
                                <textarea
                                    placeholder="Message"
                                    rows={5}
                                    required
                                    aria-label="Your message"
                                    className="w-full px-5 py-3.5 bg-[#2D2347] text-white rounded-xl placeholder:text-gray-400 border border-[#3D3357] focus:border-primary focus:outline-none transition-colors resize-none"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-accent text-accent-dark font-bold text-lg rounded-xl hover:bg-primary hover:text-white transition-colors duration-300"
                                >
                                    Send Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== CONTACT INFO ========== */}
            <section className="section-padding bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center mb-12">
                        <div>
                            <p className="text-sm font-semibold text-text-secondary mb-2">
                                <span className="bg-accent-dark text-white px-2 py-0.5 rounded text-xs mr-1">Contact</span> Information
                            </p>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                                Let&apos;s Begin Your Financial Success Story
                            </h2>
                            <p className="text-text-secondary leading-relaxed">
                                We&apos;re here to help! Whether you need expert guidance on tax planning, accounting solutions, or business compliance, our team at IntegraFin is ready to assist you.
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <a
                                href="https://wa.me/+18327741882"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-7 py-3 bg-accent-dark text-white font-semibold rounded-full hover:bg-primary transition-colors"
                            >
                                Start To Chat
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        {contactInfo.map((info, i) => (
                            <div
                                key={i}
                                className={`rounded-2xl p-6 text-center card-hover ${info.highlight
                                    ? "bg-accent-dark text-white"
                                    : "bg-white border border-gray-100 shadow-sm"
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${info.highlight ? "bg-white/20 text-white" : "bg-accent-light text-primary"
                                    }`}>
                                    {info.icon}
                                </div>
                                <h3 className="font-bold mb-1">{info.title}</h3>
                                {info.href ? (
                                    <a
                                        href={info.href}
                                        className={`text-sm ${info.highlight ? "text-white/80 hover:text-white" : "text-text-secondary hover:text-primary"} transition-colors`}
                                        target={info.href.startsWith("http") ? "_blank" : undefined}
                                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    >
                                        {info.value}
                                    </a>
                                ) : (
                                    <p className={`text-sm ${info.highlight ? "text-white/80" : "text-text-secondary"}`}>
                                        {info.value}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== MAP ========== */}
            <section className="pb-0">
                <div className="w-full h-[400px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.5!2d-95.75!3d29.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQ4JzAwLjAiTiA5NcKwNDUnMDAuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="IntegraFin Office Location - Katy, TX"
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
                                {
                                    "@type": "ContactPoint",
                                    telephone: "+91-88550-75450",
                                    contactType: "customer service",
                                    areaServed: "IN",
                                    availableLanguage: ["English", "Hindi"],
                                },
                            ],
                        },
                    }),
                }}
            />
        </>
    );
}
