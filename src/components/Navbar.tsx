"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/tax-calculator", label: "Tax Calculator" },
    { href: "/blog", label: "Blog" },
    { href: "/case-study", label: "Case Study" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"
                }`}
        >
            <nav
                className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg py-2.5 sm:py-3 rounded-full"
                    : "bg-[#0047AB] text-white shadow-2xl shadow-[#0047AB]/20 py-2 sm:py-4 w-full max-w-none px-4 sm:px-8 rounded-none border-t border-[#00C2CB]"
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="flex-shrink-0 relative z-10">
                    <Image
                        src="/logo.png"
                        alt="IntegraFin Tax Expert Katy TX - Tax and Accounting Services"
                        width={120}
                        height={32}
                        className={`h-5 sm:h-6 w-auto max-w-[100px] sm:max-w-[140px] transition-all duration-300 ${!scrolled ? 'mix-blend-screen' : ''}`}
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors duration-200 ${pathname === link.href
                                    ? "text-[#00C2CB]"
                                    : !scrolled
                                        ? "text-white/90 hover:text-[#00C2CB]"
                                        : "text-foreground/80 hover:text-primary"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <Link
                    href="/contact"
                    className={`hidden md:inline-flex items-center px-6 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 ${!scrolled
                        ? "bg-[#00C2CB] text-[#003580] hover:bg-[#33ced5]"
                        : "bg-accent-dark text-white hover:bg-primary"
                        }`}
                >
                    Contact Us
                </Link>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`md:hidden relative z-10 p-2 ${!scrolled ? 'text-white' : 'text-foreground'}`}
                    aria-label="Toggle navigation menu"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <>
                    <div
                        className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="md:hidden mt-2 mx-4 sm:mx-6 bg-white rounded-2xl shadow-xl p-5 sm:p-6 animate-fade-in relative z-50">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-[15px] font-medium py-2.5 px-4 rounded-xl transition-colors ${pathname === link.href
                                        ? "bg-accent-light text-primary"
                                        : "text-foreground/80 hover:bg-accent-light"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="text-center py-3 mt-2 bg-accent-dark text-white font-semibold rounded-full hover:bg-primary transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
