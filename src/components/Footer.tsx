import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { highTaxStateServiceLinks } from "@/data/highTaxStateServicePages";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./Footer.module.css";

const groups = [
  { title: "Services", links: [
    { label: "Bookkeeping", href: "/small-business-bookkeeping-services" },
    { label: "Business tax", href: "/business-tax-accounting" },
    { label: "Individual tax", href: "/individual-tax-preparation" },
    { label: "Catch-up bookkeeping", href: "/bookkeeping-cleanup" },
    { label: "IRS notice support", href: "/tax-resolution" },
    { label: "CPA & EA outsourcing", href: "/outsourced-accounting-for-cpa-ea-firms" },
    { label: "All services", href: "/services" },
  ] },
  { title: "Explore", links: [
    { label: "Industries", href: "/industries" },
    { label: "Pricing & scope", href: "/pricing" },
    { label: "Case studies", href: "/case-study" },
    { label: "About IntegraFin", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] },
  { title: "Resources", links: [
    { label: "Tax calculators", href: "/tax-calculator" },
    { label: "Cleanup calculator", href: "/bookkeeping-cleanup-calculator" },
    { label: "Tax guides & blog", href: "/blog" },
    { label: "Texas services", href: "/texas-tax-accounting-services" },
    { label: "Locations & sitemap", href: "/site-map" },
  ] },
];
const socials = [
  { label: "Instagram", href: "https://www.instagram.com/integrafinllc/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/integrafintax/", icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/integrafin/", icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com/@IntegraFinTax", icon: Youtube },
];
const extraLocations = [
  { label: "Katy bookkeeping", href: "/texas/katy-bookkeeping-services" },
  { label: "Katy tax accountant", href: "/texas/katy-tax-accountant" },
  { label: "Houston tax accountant", href: "/texas/houston-tax-accountant" },
  { label: "New York", href: "/new-york-tax-accounting-services" },
  { label: "Pennsylvania", href: "/pennsylvania-tax-accounting-services" },
  ...highTaxStateServiceLinks.map(link => ({ label: link.label.replace(" Tax and Accounting Services", ""), href: link.href })),
];

export default function Footer() {
  return <footer className={styles.footer}>
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link href="/" aria-label="IntegraFin home"><Image src="/images/logo1.png" alt="IntegraFin Tax & Accounting" width={175} height={39} /></Link>
          <p>Modern tax, accounting, and bookkeeping support for growing businesses and individuals.</p>
          <div className={styles.socials}>{socials.map(({label,href,icon:Icon}) => <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} key={label}><Icon size={18} /></a>)}</div>
        </div>
        {groups.map(group => <div className={styles.group} key={group.title}><h3>{group.title}</h3>{group.links.map(link => <Link href={link.href} key={link.href}>{link.label}</Link>)}</div>)}
        <div className={styles.contact}><h3>Get in touch</h3><span>{siteConfig.office.street}<br />{siteConfig.office.cityStatePostal}</span><a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phoneDisplay}</a><a href={siteConfig.contact.emailHref}>{siteConfig.contact.email}</a><span>{siteConfig.office.hoursShort}</span><Link href="/contact">Contact our team <ArrowUpRight size={16} /></Link></div>
      </div>
      <details className={styles.locations}><summary>More service locations</summary><div>{extraLocations.map(link => <Link href={link.href} key={link.href}>{link.label}</Link>)}</div></details>
      <div className={styles.bottom}><span>© {new Date().getFullYear()} IntegraFin Tax & Accounting. All rights reserved.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/site-map">Sitemap</Link></div></div>
    </div>
  </footer>;
}
