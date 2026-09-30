import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, BookOpen, Calculator, CalendarDays, Check, CheckCircle2, ClipboardCheck, FileCheck2, FileText, Landmark, Layers3, MapPin, MessageCircle, ReceiptText, ShieldCheck, TrendingUp } from "lucide-react";
import HomeCallbackForm from "@/components/HomeCallbackForm";
import { homepageWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/siteConfig";
import styles from "./page.module.css";

export const metadata = {
  title: "Katy Tax and Accounting Firm | IntegraFin Tax & Accounting",
  description: "IntegraFin is a Katy tax and accounting firm helping businesses and families with tax preparation, bookkeeping, payroll records, IRS notice help, and year-round support.",
  alternates: { canonical: "https://integrafin.tax/" },
  openGraph: {
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IntegraFin Tax & Accounting" }],
    title: "Katy Tax and Accounting Firm | IntegraFin Tax & Accounting",
    description: "Katy-based tax preparation, bookkeeping, payroll records, IRS notice help, and year-round support from IntegraFin.",
    url: "https://integrafin.tax/", type: "website", siteName: "IntegraFin",
  },
  twitter: {
    images: ["/og-image.jpg"], card: "summary_large_image",
    title: "Katy Tax and Accounting Firm | IntegraFin Tax & Accounting",
    description: "Katy-based tax preparation, bookkeeping, payroll records, IRS notice help, and year-round support from IntegraFin.",
  },
};

const consultationHref = "/contact#contact-form";
const stages = [
  { number: "01", label: "BOOKKEEPING", title: "Your books need a reliable rhythm", body: "Monthly reconciliations and organized reports make it easier to understand what happened and plan what comes next.", href: "/small-business-bookkeeping-services", icon: Layers3 },
  { number: "02", label: "TAX PLANNING", title: "Tax questions should not wait until filing", body: "Bring your records and questions into a year-round conversation so filing starts from a more organized position.", href: "/business-tax-accounting", icon: FileCheck2 },
  { number: "03", label: "CATCH-UP", title: "Behind on the books? Start here", body: "Identify missing records, prioritize the cleanup, and agree on a practical scope before work begins.", href: "/bookkeeping-cleanup", icon: ClipboardCheck },
];
const scenarios = [
  { label: "NEW BUSINESS", title: "Setting up your books", body: "Start with a bookkeeping structure and tax questions that fit your entity and the way you work.", href: "/llc-formation-tax-setup", icon: Landmark },
  { label: "GROWING TEAM", title: "Adding people and payroll", body: "Keep payroll records, filings, and accounting connected as your responsibilities grow.", href: "/payroll-tax-support", icon: TrendingUp },
  { label: "UNCLEAR NUMBERS", title: "Making sense of the month", body: "Understand transactions, expenses, and reports before making the next business decision.", href: "/small-business-bookkeeping-services", icon: BarChart3 },
  { label: "IRS LETTER", title: "Responding to a notice", body: "Understand what the notice requests and organize the records needed to decide on next steps.", href: "/tax-resolution", icon: FileText },
];
const resources = [
  { title: "Katy monthly bookkeeping checklist", body: "A practical month-end routine for cleaner records and clearer reports.", href: "/blog/katy-small-business-monthly-bookkeeping-checklist", icon: BookOpen },
  { title: "Federal tax calculator", body: "Explore an estimate and the assumptions behind it.", href: "/tax-calculator", icon: Calculator },
  { title: "Quarterly estimated tax", body: "Think through estimated payments for the year.", href: "/quarterly-estimated-tax-calculator", icon: CalendarDays },
  { title: "Bookkeeping cleanup", body: "Get a starting point for overdue financial records.", href: "/bookkeeping-cleanup-calculator", icon: ReceiptText },
  { title: "Tax and accounting guides", body: "Read practical explanations before you decide.", href: "/blog", icon: BookOpen },
];

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={styles.textLink}>{children}<ArrowUpRight size={17} aria-hidden="true" /></Link>;
}
function SectionTitle({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <div className={styles.sectionTitle}><span className={styles.eyebrow}>{eyebrow}</span><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}
function HeroLedger() {
  return <div className={styles.ledgerStage} aria-label="Illustrative monthly bookkeeping overview">
    <div className={styles.ledger}>
      <div className={styles.ledgerHead}><div className={styles.ledgerBrand}><span><Landmark size={20} /></span><div><strong>Monthly financial overview</strong><small>Example of organized bookkeeping</small></div></div><span className={styles.ledgerStatus}><Check size={13} /> Ready for review</span></div>
      <div className={styles.metricGrid}><div><span>REVENUE</span><strong>$124,500</strong><small>Illustrative example</small></div><div><span>EXPENSES</span><strong>$48,220</strong><small>Illustrative example</small></div><div><span>OPERATING RESULT</span><strong>$76,280</strong><small>Illustrative example</small></div></div>
      <div className={styles.ledgerTable}><div className={styles.tableHeading}><span>RECENT WORKFLOW</span><span>STATUS</span></div><div><span><i /> Bank transactions categorized</span><b>Reviewed</b></div><div><span><i /> Accounts reconciled</span><b>Complete</b></div><div><span><i /> Monthly reports prepared</span><b>Ready</b></div></div>
      <span className={styles.ledgerCaption}>Sample interface and figures for illustration only</span>
    </div>
    <div className={styles.floatingTax}><ShieldCheck size={19} /><span><small>YEAR-ROUND SUPPORT</small><strong>Tax questions, in context</strong></span></div>
    <div className={styles.floatingNote}><BarChart3 size={20} /><span><small>FINANCIAL CLARITY</small><strong>Know where things stand</strong></span></div>
  </div>;
}
function BookkeepingVisual() {
  return <div className={styles.visualShell} aria-hidden="true"><div className={styles.miniWindow}><div className={styles.windowHead}><span><Layers3 size={17} /> Monthly close checklist</span><small>EXAMPLE WORKFLOW</small></div>{["Transactions categorized", "Bank accounts reconciled", "Financial reports reviewed"].map((row, i) => <div className={styles.miniRow} key={row}><CheckCircle2 /> {row} <span>{i === 2 ? "Ready" : "Done"}</span></div>)}<div className={styles.miniFoot}><span>Consistent records make the next question easier.</span><ArrowRight size={16} /></div></div></div>;
}
function ReportingVisual() {
  return <div className={`${styles.visualShell} ${styles.chartShell}`} aria-hidden="true"><div className={styles.miniWindow}><div className={styles.windowHead}><span><BarChart3 size={17} /> Business performance</span><small>ILLUSTRATIVE TREND</small></div><div className={styles.chartLegend}><span><i /> Revenue</span><span><i /> Expenses</span></div><div className={styles.barChart}>{[38, 48, 45, 61, 56, 71, 78, 69].map((n, i) => <div key={i}><span style={{ height: `${n}%` }} /><span style={{ height: `${Math.max(22, n - 26)}%` }} /></div>)}</div><div className={styles.chartFoot}>Clear records lead to more useful conversations.</div></div></div>;
}
function TaxVisual() {
  return <div className={styles.visualShell} aria-hidden="true"><div className={styles.miniWindow}><div className={styles.windowHead}><span><FileCheck2 size={17} /> Tax preparation path</span><small>EXAMPLE WORKFLOW</small></div><div className={styles.taxSteps}><div><span>01</span><strong>Gather records</strong><Check size={17} /></div><div><span>02</span><strong>Review filing needs</strong><Check size={17} /></div><div><span>03</span><strong>Prepare next steps</strong><ArrowRight size={17} /></div></div><div className={styles.miniFoot}><span>Better organized before the deadline.</span><ArrowRight size={16} /></div></div></div>;
}

export default function Home() {
  return <main className={styles.home}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageWebPageSchema) }} />
    <section className={styles.hero}><div className={styles.container}>
      <div className={styles.heroCopy}><span className={styles.heroBadge}><span /> KATY, TEXAS · LOCAL & ONLINE APPOINTMENTS</span><h1>Accounting and tax services for small businesses and growing companies</h1><p>Bookkeeping, tax preparation, and year-round accounting support that helps you make decisions with clearer records and fewer surprises.</p><div className={styles.heroActions}><a className={styles.primaryButton} href={consultationHref}>Request a Consultation <ArrowUpRight size={17} /></a><Link href="#how-it-works" className={styles.ghostButton}>Explore How It Works <ArrowRight size={17} /></Link></div></div>
      <HeroLedger />
    </div></section>
    <section className={styles.trustStrip}><div className={styles.container}><span>BUILT FOR CLEARER FINANCIAL DECISIONS</span><div><span><MapPin size={17} /> Katy, Texas office</span><span><CalendarDays size={17} /> Year-round support</span><span><ShieldCheck size={17} /> Written service scope</span><span><MessageCircle size={17} /> Local + remote appointments</span></div></div></section>

    <section className={`${styles.section} ${styles.approach}`} id="how-it-works"><div className={styles.container}><SectionTitle eyebrow="ONE CONNECTED APPROACH" title="We handle bookkeeping, tax, and advisory work for growing businesses." body="Your records, filing needs, and day-to-day questions are connected. Our work begins by understanding how your business operates and where you need clarity." />
      <div className={styles.featureRows}><div className={styles.featureRow}><BookkeepingVisual /><div className={styles.featureText}><span className={styles.featureNumber}>01 / MONTHLY BOOKKEEPING</span><h3>Stay organized month after month.</h3><p>Reconciliations, categorized transactions, and financial reports help keep the numbers usable throughout the year.</p><TextLink href="/small-business-bookkeeping-services">Explore bookkeeping</TextLink></div></div><div className={`${styles.featureRow} ${styles.reverse}`}><div className={styles.featureText}><span className={styles.featureNumber}>02 / FINANCIAL REPORTING</span><h3>Understand the numbers behind your decisions.</h3><p>When your books are current, you can have a more grounded conversation about cash flow, spending, and what needs attention.</p><TextLink href="/services">Explore accounting services</TextLink></div><ReportingVisual /></div><div className={styles.featureRow}><TaxVisual /><div className={styles.featureText}><span className={styles.featureNumber}>03 / TAX SUPPORT</span><h3>Make tax time less of a scramble.</h3><p>Organized records and a defined filing process make it easier to prepare returns and address tax questions as they arise.</p><TextLink href="/business-tax-accounting">Explore tax services</TextLink></div></div></div>
    </div></section>

    <section className={`${styles.section} ${styles.clarity}`}><div className={`${styles.container} ${styles.clarityGrid}`}><div><span className={styles.eyebrow}>A CLEARER START</span><h2>Stop digging through spreadsheets for answers you need right now.</h2><p>Tell us what feels unclear. We will review the relevant records, identify priorities, and define a sensible next step.</p><ul><li><CheckCircle2 /> What is current, and what needs cleanup?</li><li><CheckCircle2 /> Which records matter for upcoming filings?</li><li><CheckCircle2 /> Where are the gaps in your monthly process?</li><li><CheckCircle2 /> What work should happen first?</li></ul><TextLink href="/contact">Tell us what you need help with</TextLink></div><div className={styles.clarityPanel}><div className={styles.clarityPanelHead}><span><ClipboardCheck size={18} /> Your starting plan</span><small>AN EXAMPLE OF OUR PROCESS</small></div>{[["Share your situation", "Tell us about your business, records, and deadlines."], ["Review the relevant information", "We identify the scope and any missing pieces."], ["Agree on the next steps", "Receive a defined scope before work begins."]].map(([title, body], i) => <div className={styles.planStep} key={title}><b>{i + 1}</b><div><strong>{title}</strong><span>{body}</span></div></div>)}<a href={consultationHref}>Request a conversation <ArrowUpRight size={16} /></a></div></div></section>

    <section className={`${styles.section} ${styles.serviceIntro}`} id="services"><div className={styles.container}><SectionTitle eyebrow="BUILT AROUND YOUR NEEDS" title="Get guidance when your business needs it." body="Choose the situation that sounds familiar. Each path leads to a service with more detail and a way to talk with us." /><div className={styles.stageGrid}>{stages.map(({ number, label, title, body, href, icon: Icon }) => <Link className={styles.stageCard} href={href} key={title}><div className={styles.stageArt}><span>{number}</span><Icon size={62} strokeWidth={1.15} /></div><div className={styles.stageBody}><span>{label}</span><h3>{title}</h3><p>{body}</p><strong>Explore this service <ArrowUpRight size={17} /></strong></div></Link>)}</div><p className={styles.sectionCallout}>Need a different kind of support? <Link href="/services">See all services <ArrowUpRight size={15} /></Link></p></div></section>

    <section className={`${styles.section} ${styles.scenarioSection}`}><div className={styles.container}><div className={styles.scenarioTop}><SectionTitle eyebrow="FIND YOUR STARTING POINT" title="Whether you are starting out, growing, or catching up, start with the right question." body="Explore the service that fits your situation, then talk with us about the records and decisions in front of you." /><TextLink href="/industries">Explore who we help</TextLink></div><div className={styles.scenarioGrid}>{scenarios.map(({ label, title, body, href, icon: Icon }) => <Link href={href} className={styles.scenarioCard} key={title}><div className={styles.scenarioArt}><Icon size={37} strokeWidth={1.3} /><span>{label}</span></div><div><span>{label}</span><h3>{title}</h3><p>{body}</p><ArrowUpRight size={19} /></div></Link>)}</div></div></section>

    <section className={`${styles.section} ${styles.problemSection}`}><div className={styles.container}><SectionTitle eyebrow="HOW WE WORK" title="Here is how we solve the problems keeping you up at night." body="Every engagement starts with your actual records and a defined scope. These are common situations we can help you work through." /><div className={styles.problemGrid}><div><span>BOOKKEEPING CLEANUP</span><h3>When the books are months behind</h3><p><strong>The problem</strong> Transactions, accounts, and reports are out of sync, leaving you unsure where to begin.</p><p><strong>Our approach</strong> Review the gaps, prioritize reconciliations, and set a cleanup scope that makes the records usable again.</p><TextLink href="/bookkeeping-cleanup">Explore cleanup support</TextLink></div><div><span>BUSINESS TAX PREPARATION</span><h3>When filing depends on incomplete records</h3><p><strong>The problem</strong> Tax documents are scattered and the financial picture is still changing close to the deadline.</p><p><strong>Our approach</strong> Identify the records needed, review the filing requirements, and prepare a plan for the return.</p><TextLink href="/business-tax-accounting">Explore business tax</TextLink></div></div></div></section>

    <section className={`${styles.section} ${styles.resourceSection}`}><div className={styles.container}><div className={styles.resourceTop}><SectionTitle eyebrow="USEFUL RESOURCES" title="Not ready to talk? Get the insights that move the needle." body="Use a calculator, read a guide, or browse services at your own pace. The tools are starting points, not personalized tax advice." /><TextLink href="/blog">Browse all resources</TextLink></div><div className={styles.resourceGrid}>{resources.map(({ title, body, href, icon: Icon }) => <Link href={href} className={styles.resourceCard} key={title}><span><Icon size={22} strokeWidth={1.5} /></span><h3>{title}</h3><p>{body}</p><strong>Explore <ArrowUpRight size={16} /></strong></Link>)}</div></div></section>

    <section className={`${styles.section} ${styles.answersSection}`}><div className={styles.container}><SectionTitle eyebrow="QUICK ANSWERS" title="Tax and bookkeeping support in Katy, Texas" body="A few common questions to help you choose the right next step." /><div className={styles.answerGrid}><article><h3>What accounting services does IntegraFin offer small businesses?</h3><p>IntegraFin helps small businesses in Katy and Fort Bend County with monthly bookkeeping, account reconciliations, tax preparation, payroll records, and IRS notice support. The right service depends on your records, deadlines, and goals. We review those first and confirm the work in a written scope.</p><Link href="/services">Explore all services <ArrowUpRight size={16} /></Link></article><article><h3>Can you help if my business books are behind?</h3><p>Yes. A cleanup project starts with the periods and accounts that need attention. We review available statements and the accounting file, identify missing information, and agree on a practical scope before work begins. Ongoing bookkeeping can follow once the records are usable.</p><Link href="/bookkeeping-cleanup">See bookkeeping cleanup <ArrowUpRight size={16} /></Link></article><article><h3>Do you offer tax and accounting support beyond filing season?</h3><p>Yes. IntegraFin offers year-round bookkeeping and tax support for businesses that want organized records and clearer next steps throughout the year. The team can discuss recurring bookkeeping, business tax needs, and payroll records during an initial consultation.</p><Link href="/business-tax-accounting">See business tax support <ArrowUpRight size={16} /></Link></article></div></div></section>

    <section className={`${styles.section} ${styles.nextSection}`}><div className={styles.container}><SectionTitle eyebrow="YOUR NEXT STEP" title="Three ways to get the support your business needs." body="Choose the route that makes sense today. You can always ask us which service fits your situation." /><div className={styles.nextGrid}><div className={styles.nextFeatured}><span>READY TO TALK?</span><h3>Start with a conversation.</h3><p>Tell us about your records, filing needs, and goals. We will help identify the most useful next step.</p><a href={consultationHref}>Request a Consultation <ArrowUpRight size={17} /></a></div><Link href="/services" className={styles.nextCard}><span>EXPLORE</span><h3>Understand our services.</h3><p>See how bookkeeping, tax, payroll, and other support fit together.</p><strong>View services <ArrowUpRight size={17} /></strong></Link><Link href="/pricing" className={styles.nextCard}><span>PLAN</span><h3>Learn how pricing works.</h3><p>Understand what affects scope and pricing before requesting a proposal.</p><strong>Explore pricing <ArrowUpRight size={17} /></strong></Link></div><div className={styles.contactBand}><div><span className={styles.eyebrow}>PREFER TO SEND DETAILS?</span><h3>Request a call back.</h3><p>Share a few details and we will follow up about the right service.</p><a href={siteConfig.contact.phoneHref}>Or call {siteConfig.contact.phoneDisplay}</a></div><div className={styles.formWrap}><HomeCallbackForm /></div></div></div></section>
  </main>;
}
