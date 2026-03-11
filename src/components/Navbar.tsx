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
                className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between rounded-full transition-all duration-300 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg py-2.5 sm:py-3"
                    : "bg-white/90 backdrop-blur-sm shadow-md py-3 sm:py-4"
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="flex-shrink-0 relative z-10">
                    <Image
                        src="/logo.png"
                        alt="IntegraFin - Expert Tax & Accounting Services"
                        width={160}
                        height={40}
                        className="h-7 sm:h-9 w-auto"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${pathname === link.href
                                ? "text-primary"
                                : "text-foreground/80"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <Link
                    href="/contact"
                    className="hidden md:inline-flex items-center px-6 py-2.5 bg-accent-dark text-white text-sm font-semibold rounded-full hover:bg-primary transition-colors duration-200"
                >
                    Contact Us
                </Link>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden relative z-10 p-2 text-foreground"
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
