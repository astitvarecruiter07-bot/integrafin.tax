import Link from "next/link";
import Image from "next/image";

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/case-study", label: "Case Study" },
    { href: "/contact", label: "Contact" },
];

const serviceLinks = [
    { href: "/services#business-tax", label: "Business Tax & Accounting" },
    { href: "/services#individual-tax", label: "Individual Tax Services" },
    { href: "/services#tax-resolution", label: "Tax Resolution" },
    { href: "/services#additional-services", label: "Additional Services" },
    { href: "/services#consultation", label: "Consultation" },
    { href: "/#industries", label: "Industries Served" },
];

const socialLinks = [
    { href: "https://www.facebook.com/integrafintax/", icon: "facebook", label: "Facebook" },
    { href: "https://www.instagram.com/integrafinllc/", icon: "instagram", label: "Instagram" },
    { href: "https://www.linkedin.com/company/integrafin/?viewAsMember=true", icon: "linkedin", label: "LinkedIn" },
    { href: "https://x.com/Integrafintax", icon: "x", label: "X (Twitter)" },
];

function SocialIcon({ icon }: { icon: string }) {
    const icons: Record<string, React.ReactNode> = {
        facebook: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        ),
        instagram: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
        ),
        linkedin: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
        ),
        x: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        ),
    };
    return icons[icon] || null;
}

export default function Footer() {
    // Mock user for Auth Guard (replace with real auth hook like useSession)
    const user = { role: 'admin' };

    return (
        <footer className="bg-[#1B2A4A] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/logo.png"
                                alt="IntegraFin Tax Expert Katy TX - Tax and Accounting Services"
                                width={150}
                                height={38}
                                className="h-9 w-auto brightness-0 invert"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            IntegraFin is a trusted provider of comprehensive tax, accounting,
                            and business advisory services. With a team of experienced tax experts,
                            CAs, and financial experts.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.icon}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                                >
                                    <SocialIcon icon={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-5">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-bold mb-5">Services</h3>
                        <ul className="space-y-3">
                            {serviceLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-5">Join Us Now!</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to our newsletter for tax tips and financial insights.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2 mb-6">
                            <input
                                type="email"
                                placeholder="Email"
                                aria-label="Email for newsletter"
                                className="flex-1 px-4 py-2.5 bg-white/10 rounded-full text-sm text-white placeholder:text-gray-500 border border-white/10 focus:border-primary focus:outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-accent text-accent-dark font-semibold text-sm rounded-full hover:bg-primary hover:text-white transition-colors duration-200"
                            >
                                Subscribe
                            </button>
                        </form>
                        <div className="space-y-3 text-sm text-gray-400">
                            <p className="text-white font-semibold flex flex-col gap-1">
                                <span>IntegraFin Tax & Accounting</span>
                                <span className="font-normal">2039 N Mason Rd, Suite 604</span>
                                <span className="font-normal">Katy, TX 77449</span>
                            </p>
                            <p>Phone: <a href="tel:+18326471819" className="hover:text-white transition-colors">(832) 647-1819</a></p>
                            <p>Email: <a href="mailto:contact@integrafin.tax" className="hover:text-white transition-colors">contact@integrafin.tax</a></p>
                            <p>Hours: Mon–Fri, 9AM–6PM</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} IntegraFin. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">

                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
