"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const menus = {
  Services: [
    { label: "Monthly bookkeeping", href: "/small-business-bookkeeping-services", description: "Keep your books current" },
    { label: "Business tax", href: "/business-tax-accounting", description: "Prepare with organized records" },
    { label: "Individual tax", href: "/individual-tax-preparation", description: "Personal filing support" },
    { label: "Catch-up bookkeeping", href: "/bookkeeping-cleanup", description: "Get overdue books in order" },
    { label: "QuickBooks services", href: "/quickbooks-bookkeeping-services", description: "Setup, cleanup & reporting" },
    { label: "Payroll tax support", href: "/payroll-tax-support", description: "Records, filings & notices" },
    { label: "IRS notice help", href: "/tax-resolution", description: "Understand your next steps" },
    { label: "LLC tax setup", href: "/llc-formation-tax-setup", description: "Start with a sound foundation" },
    { label: "CPA & EA outsourcing", href: "/outsourced-accounting-for-cpa-ea-firms", description: "Capacity for your firm" },
  ],
  Industries: [
    { label: "Construction", href: "/contractor-bookkeeping-services", description: "Job costs & subcontractors" },
    { label: "Real estate", href: "/industries", description: "Property financials" },
    { label: "Healthcare", href: "/industries", description: "Practice accounting" },
    { label: "Professional services", href: "/industries", description: "Project & cash visibility" },
    { label: "Retail & eCommerce", href: "/industries", description: "Sales channels & inventory" },
    { label: "Startups", href: "/industries", description: "A stronger financial base" },
  ],
  Resources: [
    { label: "Tax calculators", href: "/tax-calculator", description: "Explore free planning tools" },
    { label: "Bookkeeping cleanup calculator", href: "/bookkeeping-cleanup-calculator", description: "Assess your records" },
    { label: "Tax guides & blog", href: "/blog", description: "Practical business guidance" },
    { label: "Case studies", href: "/case-study", description: "Explore client stories" },
  ],
} as const;
type MenuName = keyof typeof menus;
const consultationHref = "/contact#contact-form";

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const content = document.getElementById("site-content");
    const footer = document.querySelector<HTMLElement>("body > footer");
    const previousOverflow = document.body.style.overflow;
    const previousContentInert = content?.inert ?? false;
    const previousFooterInert = footer?.inert ?? false;
    document.body.style.overflow = "hidden";
    if (content) content.inert = true;
    if (footer) footer.inert = true;
    const desktop = window.matchMedia("(min-width: 941px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (content) content.inert = previousContentInert;
      if (footer) footer.inert = previousFooterInert;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileOpen]);
  const close = () => { setMobileOpen(false); setOpenMenu(null); };
  const dropdown = (name: MenuName) => <div className={styles.megaMenu} id={`menu-${name.toLowerCase()}`}><div className={styles.megaIntro}><span>EXPLORE {name.toUpperCase()}</span><strong>{name === "Services" ? "The right support, at the right time." : name === "Industries" ? "Built around your business." : "Helpful answers, on your terms."}</strong><Link href={name === "Services" ? "/services" : name === "Industries" ? "/industries" : "/blog"} onClick={close}>View all {name.toLowerCase()} <ArrowUpRight size={16} /></Link></div><div className={styles.megaLinks}>{menus[name].map(item => <Link href={item.href} key={item.label} onClick={close}><span>{item.label}</span><small>{item.description}</small></Link>)}</div></div>;

  return <header ref={headerRef} className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} onKeyDown={event => {
    if (event.key === "Escape") {
      close();
      if (mobileOpen) headerRef.current?.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]')?.focus();
    }
    if (mobileOpen && event.key === "Tab") {
      const focusable = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("a[href],button,summary") ?? []).filter(element => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  }}>
    <nav className={styles.nav} aria-label="Main navigation">
      <Link href="/" className={styles.logo} aria-label="IntegraFin home" onClick={close}><Image src="/images/logo1.png" alt="IntegraFin Tax & Accounting" width={158} height={35} priority /></Link>
      <div className={styles.desktopLinks}>
        {(Object.keys(menus) as MenuName[]).slice(0,2).map(name => <div className={styles.menuWrap} key={name}><button type="button" className={`${styles.navButton} ${openMenu === name ? styles.active : ""}`} aria-expanded={openMenu === name} aria-controls={`menu-${name.toLowerCase()}`} onClick={() => setOpenMenu(openMenu === name ? null : name)}>{name} <ChevronDown size={15} /></button>{openMenu === name && dropdown(name)}</div>)}
        <Link href="/industries" onClick={close}>Who We Help</Link>
        <div className={styles.menuWrap}><button type="button" className={`${styles.navButton} ${openMenu === "Resources" ? styles.active : ""}`} aria-expanded={openMenu === "Resources"} aria-controls="menu-resources" onClick={() => setOpenMenu(openMenu === "Resources" ? null : "Resources")}>Resources <ChevronDown size={15} /></button>{openMenu === "Resources" && dropdown("Resources")}</div>
        <Link href="/pricing" onClick={close}>Pricing</Link>
        <Link href="/about" onClick={close}>About</Link>
      </div>
      <div className={styles.navEnd}><Link href={consultationHref} className={styles.navCta}>Request a Consultation <ArrowUpRight size={16} /></Link><button type="button" className={styles.mobileToggle} aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-controls="mobile-navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={24} /> : <Menu size={24} />}</button></div>
    </nav>
    {openMenu && <button type="button" className={styles.menuBackdrop} aria-label="Close menu" onClick={() => setOpenMenu(null)} />}
    {mobileOpen && <div className={styles.mobilePanel} id="mobile-navigation">
      <div className={styles.mobileScroll}><Link href="/" onClick={close}>Home</Link>{(Object.keys(menus) as MenuName[]).map(name => <details key={name}><summary>{name}<ChevronDown size={18} /></summary><div>{menus[name].map(item => <Link href={item.href} onClick={close} key={item.label}>{item.label}</Link>)}</div></details>)}<Link href="/pricing" onClick={close}>Pricing</Link><Link href="/about" onClick={close}>About</Link><Link href="/contact" onClick={close}>Contact</Link><Link href={consultationHref} className={styles.mobileCta} onClick={close}>Request a Consultation <ArrowUpRight size={18} /></Link></div>
    </div>}
  </header>;
}
