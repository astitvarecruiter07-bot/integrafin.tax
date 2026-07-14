"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2, User, Scale, PlusCircle, Rocket,
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp
} from "lucide-react";

// --- Tab Content Data ---

const tabsData = [
  {
    id: "business",
    label: "Business Tax & Accounting",
    icon: <Building2 className="w-5 h-5 flex-shrink-0" />,
    title: "Business - Tax & Accounting Services",
    description: "Our Business Tax & Accounting Services help businesses organize financial operations and support compliance with applicable tax requirements. We assist with tax planning, bookkeeping, payroll records, financial reporting, business setup, and tax filings through a coordinated process focused on accurate records, clear next steps, and reliable communication.",
    services: [
      { title: "Accounting Software Selection & Implementation", desc: "We review transaction volume, reporting needs, payroll connections, user access, and current records before recommending and configuring an accounting platform within the agreed scope." },
      { title: "Accounting & Back-Office Support", desc: "Scope may include bookkeeping, payroll-record coordination, financial reporting, invoice records, and recurring close tasks. Deliverables depend on the systems, records, and written engagement." },
      { title: "QuickBooks™ Setup & Support", desc: "QuickBooks support may include file setup, chart-of-accounts review, bank-feed configuration, reconciliation, cleanup, and reporting based on the condition of the file." },
      { title: "Bookkeeping & Write-Up Services", desc: "Bookkeeping scope may include transaction classification, account reconciliation, open-question review, and financial reports based on the records provided." },
      { title: "Business Reporting Discussions", desc: "We can review bookkeeping reports, cash-flow information, and projections with business owners. Investment, legal, and valuation advice requires an appropriate separate professional scope." },
      { title: "Business Entity Tax Review", desc: "We discuss tax classification and recordkeeping considerations using the ownership, operations, payroll status, and expected activity. Legal formation and liability advice may require an attorney." },
      { title: "Buying or Selling a Business", desc: "Accounting support may include record organization, financial-report review, and tax-document coordination. Legal, valuation, and transaction advice depends on separate qualified advisers." },
      { title: "New Business Tax Setup", desc: "We assist with EIN, tax-classification, bookkeeping, payroll-record, and filing-readiness steps. State formation and legal documents remain subject to the agreed scope and legal advice." },
      { title: "EIN / Tax ID Application", desc: "We can assist with EIN and other tax-identification application information. Eligibility, issuance, processing time, and agency decisions are outside IntegraFin's control." },
      { title: "IRS & State Filing Process Support", desc: "We help organize records and prepare agreed filings or response documents. Filing requirements and outcomes depend on the taxpayer facts, applicable rules, deadlines, and agency review." },
      { title: "Financial Reports and Supporting Schedules", desc: "We prepare agreed bookkeeping reports and supporting schedules from the available records. Audit, review, attestation, and assurance services are not implied unless separately authorized and engaged." },
      { title: "IRS Notice and Representation Review", desc: "We review the notice, records, deadlines, and available authorization before defining assistance. Representation is available only when the matter and professional authorization permit it." },
      { title: "Management Reporting Support", desc: "We can organize current financial information and discuss reporting questions; business results depend on operations, decisions, market conditions, and other factors outside the engagement." },
      { title: "Payroll Record and Filing Support", desc: "Scope may include payroll reports, deposit records, filing status, wage summaries, and notice documentation. Employer obligations remain fact- and deadline-specific." },
      { title: "Invoice and AR/AP Record Support", desc: "We help organize invoice, receivable, payable, and payment records within the selected bookkeeping workflow; collection timing and cash-flow outcomes are not guaranteed." },
      { title: "Sales Tax Workflow Support", desc: "We can help identify registrations, source records, filing periods, and reporting questions. Obligations depend on jurisdictions, activities, nexus, and current rules." },
      { title: "Retirement Account Tax Coordination", desc: "We can discuss tax-record and filing considerations for retirement contributions with the client's plan provider or financial adviser. Eligibility and tax effects depend on plan terms and taxpayer facts." },
      { title: "Tax Planning Review", desc: "Planning discussions review income, deductions, credits, entity activity, timing, and documentation. Tax results depend on eligibility, records, applicable law, and actions completed on time." },
      { title: "State & Local Registrations", desc: "We can assist with unemployment, withholding, sales-tax, and other registration workflows when included in scope. Approval and processing times depend on the relevant agency." }
    ],
    benefits: [
      "Written scope and record checklist",
      "Coordinated bookkeeping and tax workflow",
      "Fact-based tax planning discussions",
      "Entity and payroll-record context",
      "IRS notice review subject to authorization",
      "Recurring accounting support when engaged",
      "Financial reports based on available records",
      "Clear client questions and next steps"
    ]
  },
  {
    id: "individual",
    label: "Individual Tax Services",
    icon: <User className="w-5 h-5 flex-shrink-0" />,
    title: "Personalized Tax Preparation",
    description: "Individual tax preparation begins with the taxpayer's filing history, income documents, payments, dependents, deductions, credits, investments, state activity, and other relevant facts. Planning, notice support, representation, payment options, and estate or trust work are scoped separately when needed. Refunds, tax due, penalties, and agency outcomes depend on records, eligibility, law, timing, and government review.",
    services: [
      { title: "Tax Filing & Preparation", desc: "We organize the return from the documents and facts provided, identify open questions, and review the prepared filing with the taxpayer before authorization." },
      { title: "Tax Planning Review", desc: "Planning discussions may address withholding, estimated payments, income timing, deductions, credits, and recordkeeping. Eligibility and results depend on taxpayer facts and current law." },
      { title: "IRS Notice and Balance Support", desc: "We review notices, balances, returns, transcripts, payment records, and deadlines before explaining response or payment procedures that may be relevant." },
      { title: "Estate & Trust Tax Preparation", desc: "Estate and trust work is accepted only after reviewing the entity, fiduciary documents, beneficiaries, income records, filing requirements, and need for legal or specialized advice." }
    ],
    benefits: [
      "Document and filing-history review",
      "Eligibility-based deduction and credit review",
      "Withholding and estimated-payment discussions",
      "Multi-state and self-employment context",
      "Notice support subject to scope and authorization",
      "Estate and trust intake review",
      "Organized document workflow",
      "Clear open questions and next steps"
    ]
  },
  {
    id: "resolution",
    label: "Tax Resolution Services",
    icon: <Scale className="w-5 h-5 flex-shrink-0" />,
    title: "Tax Resolution Services",
    description: "Tax resolution work starts with the notice, returns, transcripts, balances, payment history, filing status, deadlines, and available authorization. The next step may involve missing returns, a notice response, payment-plan information, penalty documentation, or an offer review. Eligibility, representation, approval, terms, and agency outcomes depend on the taxpayer facts, records, applicable procedures, and IRS or state review.",
    services: [
      { title: "Back Taxes Owed", desc: "We review balances, filed and missing returns, transcripts, payment records, and notices before explaining filing or payment procedures that may be relevant." },
      { title: "IRS Notice Review in Katy", desc: "Received a CP14, CP2000, Letter 12C, or identity verification letter? Visit our dedicated IRS Notice Help Katy TX page for local notice review and document organization." },
      { title: "IRS Audit and Representation Review", desc: "Representation is considered only after reviewing the matter, records, deadlines, and professional authorization. No audit or liability outcome is promised." },
      { title: "Offer in Compromise Review", desc: "We can help organize financial information and review published IRS eligibility factors. Acceptance and settlement terms are determined by the IRS." },
      { title: "Payroll Taxes Owed", desc: "We review payroll returns, deposits, balances, notices, and missing periods before outlining filing, documentation, or payment-plan questions." },
      { title: "Penalty Relief Documentation", desc: "We can help organize facts and records relevant to a penalty-relief request. Relief depends on law, agency criteria, filing history, documentation, and agency approval." },
      { title: "Tax Representation & Response Support", desc: "Available assistance depends on the dispute, deadlines, records, engagement, and professional authorization; fair treatment or financial relief cannot be guaranteed." },
      { title: "Unfiled Returns", desc: "We identify missing periods and records, prepare agreed returns, and explain the filing sequence. Penalties, collection activity, and agency action remain subject to applicable rules." },
      { title: "Professional Authorization", desc: "The ability to represent a taxpayer depends on the professional's authorization, the tax matter, and the agreed engagement. The first step is confirming what assistance is available." },
      { title: "Electronic Filing", desc: "Eligible returns may be transmitted electronically after taxpayer review and authorization. Processing time, acceptance, refunds, balances, and agency actions are outside IntegraFin's control." }
    ],
    benefits: [
      "Notice and deadline review",
      "Transcript and filing-history organization",
      "Missing-return preparation when engaged",
      "Payment-procedure information",
      "Penalty documentation review",
      "Representation only when authorized"
    ]
  },
  {
    id: "additional",
    label: "Additional Services",
    icon: <PlusCircle className="w-5 h-5 flex-shrink-0" />,
    title: "Additional Services",
    description: "Additional services may include tax-identification application support, international information-return workflows, extension filings, certification-document organization, electronic signatures, and document-retention coordination. Eligibility, filing requirements, deadlines, approval, and processing times depend on the applicant facts, current rules, and the responsible agency.",
    services: [
      { title: "ITIN, SSN, FEIN Applications", desc: "Assistance with obtaining Individual Taxpayer Identification Number (ITIN), Social Security Number (SSN), and Federal Employer Identification Number (FEIN) for tax and business purposes." },
      { title: "International Reporting (FBAR & FATCA)", desc: "We can review foreign-account and asset information for reporting questions. Filing obligations depend on ownership, balances, residency, entity status, and current rules." },
      { title: "FinCEN BOI Filing Review", desc: "We can help review reporting status and organize beneficial-ownership information when the service is available. Requirements and deadlines depend on current law and entity facts." },
      { title: "Extension Filing", desc: "We can prepare an extension request when engaged before the applicable deadline. An extension to file generally does not extend the time to pay, and penalties depend on the facts and rules." },
      { title: "Certification Application Support", desc: "We can help organize requested business documents for HUB, MBE, WOBE, WMBE, HubZone, or 8(a) applications. Eligibility and approval are determined by the program administrator." },
      { title: "Document Collection & Retention Workflow", desc: "Clients receive instructions for providing documents and retaining engagement records. Available methods and retention periods are confirmed during onboarding." },
      { title: "Electronic Signatures", desc: "Electronic signatures may be used for eligible documents when supported by the engagement process and applicable filing requirements." }
    ],
    benefits: [
      "Application-document checklist",
      "International reporting review",
      "Tax-identification support",
      "Certification-document organization",
      "Extension and signature workflows"
    ]
  },
  {
    id: "startup",
    label: "New Business Formation",
    icon: <Rocket className="w-5 h-5 flex-shrink-0" />,
    title: "New Business Formation & Consultation",
    description: "New business tax setup begins with the owners, proposed activity, state, expected income, payroll plans, accounting system, and filing needs. IntegraFin can discuss tax classification and recordkeeping, assist with EIN and account workflows, and coordinate bookkeeping and payroll-record setup. Entity formation, contracts, licenses, liability protection, funding, and legal compliance may require attorneys, agencies, lenders, or other qualified advisers.",
    services: [
      { title: "Entity Tax Classification Review", desc: "We discuss federal tax classification and recordkeeping considerations. Legal structure, liability protection, ownership documents, and state-law advice require appropriate legal review." },
      { title: "Registration and EIN Support", desc: "We can assist with EIN and selected tax-account registrations when included in scope. Agency issuance, approval, processing time, and licensing remain outside our control." },
      { title: "Tax and Recordkeeping Readiness", desc: "We identify bookkeeping, payroll-record, sales-tax, estimated-tax, and filing questions based on the planned activity and jurisdictions." },
      { title: "Bookkeeping Setup", desc: "We can help establish accounts, transaction categories, document routines, reconciliations, and reporting expectations for the new business." },
      { title: "Funding Record Preparation", desc: "We can organize bookkeeping reports and requested tax records for a lender or funding application. Funding eligibility, approval, rates, and terms are determined by the provider." },
      { title: "Owner and Adviser Coordination", desc: "Tax and accounting questions can be coordinated with the business's attorney, payroll provider, lender, insurance adviser, or other professionals when needed." },
      { title: "Ongoing Accounting Support", desc: "Recurring bookkeeping, tax preparation, planning discussions, and payroll-record support are available only when included in a separate or continuing engagement." }
    ],
    benefits: [
      "Entity and tax-classification questions",
      "EIN and registration workflow support",
      "Bookkeeping and account setup",
      "Payroll-record readiness",
      "First-year filing checklist",
      "Coordination with legal and other advisers",
      "Ongoing support only when engaged"
    ]
  }
];

const tabHashById: Record<string, string> = {
  business: "business",
  individual: "individual",
  resolution: "tax-resolution",
  additional: "additional",
  startup: "startup",
};

const focusedServiceLinks = [
  {
    href: "/business-tax-accounting",
    label: "Business Tax & Accounting",
    description: "Tax preparation, accounting, records, payroll details, and advisory workflow for business owners.",
  },
  {
    href: "/individual-tax-preparation",
    label: "Individual Tax Preparation",
    description: "Personal filing support for W-2, 1099, rental, investment, and multi-state tax situations.",
  },
  {
    href: "/tax-resolution",
    label: "Tax Resolution",
    description: "IRS notices, back taxes, unfiled returns, payment-plan questions, and response planning.",
  },
  {
    href: "/bookkeeping-cleanup",
    label: "Bookkeeping Cleanup",
    description: "Catch-up bookkeeping, reconciliations, missing records, and tax-ready reports.",
  },
  {
    href: "/payroll-tax-support",
    label: "Payroll Tax Support",
    description: "Employer payroll tax records, deposits, filings, notices, and year-end wage details.",
  },
  {
    href: "/quickbooks-bookkeeping-services",
    label: "QuickBooks Bookkeeping Services",
    description: "QuickBooks setup, cleanup, monthly bookkeeping, reconciliation, and reporting support.",
  },
];

export default function ServicesContent() {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(null);
  const activeContent = tabsData.find(t => t.id === activeTab) || tabsData[0];

  useEffect(() => {
    const hashToTab: Record<string, string> = {
      "#business": "business",
      "#business-tax": "business",
      "#individual": "individual",
      "#individual-tax": "individual",
      "#resolution": "resolution",
      "#tax-resolution": "resolution",
      "#additional": "additional",
      "#additional-services": "additional",
      "#startup": "startup",
      "#consultation": "startup",
    };

    const applyHashTab = () => {
      const tabId = hashToTab[window.location.hash.toLowerCase()];
      if (tabId) {
        setActiveTab(tabId);
        setOpenAccordionIdx(null);
      }
    };

    applyHashTab();
    window.addEventListener("hashchange", applyHashTab);
    return () => window.removeEventListener("hashchange", applyHashTab);
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setOpenAccordionIdx(null); // Reset open accordions when changing categories
    const nextHash = `#${tabHashById[tabId] ?? tabId}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, "", nextHash);
    }
  };

  const toggleAccordion = (idx: number) => {
    setOpenAccordionIdx(prev => prev === idx ? null : idx);
  };

  // No longer needed for revised responsive layout
  // const handleScroll = () => {
  //   if (scrollRef.current) {
  //     const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
  //     setIsScrolledRight(scrollLeft + clientWidth < scrollWidth - 10);
  //   }
  // };

  // useEffect(() => {
  //   handleScroll();
  //   window.addEventListener("resize", handleScroll);
  //   return () => window.removeEventListener("resize", handleScroll);
  // }, []);

  return (
    <main className="bg-slate-50 min-h-screen text-left">
      {/* ========== HERO SECTION ========== */}
      <section className="bg-primary-dark pt-28 sm:pt-32 pb-12 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 sm:mb-6">
            Comprehensive <span className="text-secondary">Tax Expert</span> Services
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-[#d7e3fc] max-w-2xl mx-auto leading-relaxed">
            From individual tax filing to full business accounting—our integrated solutions are built specifically for your modern financial life.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 -mt-6 sm:-mt-10 relative z-20">

        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-8 border border-slate-100 mb-8 sm:mb-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-primary">
                Focused Tax And Accounting Services
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
                Use the services hub for the full overview, or choose the dedicated page that matches the help you need now.
              </p>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold text-sm">
              Get Help <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {focusedServiceLinks.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-xl border border-slate-200 bg-slate-50 p-4 hover:border-secondary hover:bg-white hover:shadow-sm transition-all"
              >
                <h3 className="text-sm sm:text-base font-black text-primary-dark group-hover:text-primary">
                  {service.label}
                </h3>
                <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed mt-2">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Toggle / Tabs Navigation */}
        <div className="relative group mb-8 sm:mb-12">
          <div
            className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2 sm:p-3 border border-slate-100/50"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-2 sm:gap-3">
              {tabsData.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={tabHashById[tab.id]}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl text-[13px] sm:text-sm font-bold transition-all duration-300 ${isActive
                      ? "bg-primary text-white shadow-md transform scale-[1.01]"
                      : "text-slate-500 hover:bg-slate-50 hover:text-primary"
                      }`}
                  >
                    <span className={isActive ? "text-secondary" : "text-slate-400 group-hover:text-primary"}>
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden transform transition-all duration-500 min-h-[400px] sm:min-h-[600px] flex flex-col lg:flex-row">

          {/* Left Col: Details */}
          <div className="p-5 sm:p-10 lg:p-14 lg:w-2/3 flex flex-col pt-8 sm:pt-12 key={activeTab}">

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary tracking-tight mb-4 sm:mb-6">
              {activeContent.label}
            </h2>
            <div className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed mb-6 sm:mb-10 space-y-4">
              {activeContent.description.split('. ').map((sentence, idx) => (
                <span key={idx}>{sentence}{(idx !== activeContent.description.split('. ').length - 1) && '. '}</span>
              ))}
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-primary-dark mb-6 border-b border-slate-100 pb-2">Includes:</h3>

            {/* Specific exact services laid out as functionally interactive accordions */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-12">
              {activeContent.services.map((service, idx) => {
                const isOpen = openAccordionIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleAccordion(idx)}
                    className={`border rounded-lg bg-white overflow-hidden transition-all duration-300 cursor-pointer ${isOpen ? 'border-secondary shadow-md ring-1 ring-secondary/20' : 'border-slate-200 hover:border-primary/50 hover:shadow-sm'
                      }`}
                  >
                    {/* Accordion Header */}
                    <div className="flex items-center justify-between p-3 sm:p-4 group">
                      <span className={`text-[13px] sm:text-sm font-bold transition-colors pr-4 ${isOpen ? 'text-secondary' : 'text-primary group-hover:text-secondary'}`}>
                        {service.title}
                      </span>
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded shrink-0 flex items-center justify-center transition-colors ${isOpen ? 'bg-secondary/10' : 'bg-slate-50 group-hover:bg-secondary/10'
                        }`}>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                        ) : (
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-secondary" />
                        )}
                      </div>
                    </div>

                    {/* Accordion Body */}
                    <div className={`px-3 sm:px-4 pb-3 sm:pb-4 text-[13px] sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
                      <div className="pt-3 sm:pt-4">
                        {service.desc}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link href="/contact" className="inline-flex items-center justify-center gap-2 w-full sm:w-max bg-secondary text-primary-dark px-6 sm:px-10 py-3.5 sm:py-4 mt-auto rounded-xl font-bold uppercase tracking-widest hover:bg-[#33ced5] transition-colors text-sm">
              Schedule a Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Right Col: Benefits Panel */}
          <div className="bg-primary-dark p-6 sm:p-10 lg:p-14 lg:w-1/3 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full mix-blend-multiply opacity-20 filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-6 sm:mb-8 relative z-10">Why Choose Us?</h3>

            <div className="space-y-4 sm:space-y-6 relative z-10">
              {activeContent.benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-3 sm:gap-4 items-center">
                  <div className="bg-white/10 rounded-full p-1.5 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                  </div>
                  <span className="text-white/90 text-[14px] sm:text-base font-bold leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 sm:mt-14 pt-8 border-t border-white/10 relative z-10">
              <p className="text-xs sm:text-sm text-[#d7e3fc] mb-3 font-bold uppercase tracking-widest">Need Immediate Help?</p>
              <a href="tel:+18326471819" className="text-white text-xl sm:text-2xl md:text-3xl font-black hover:text-secondary transition-colors flex items-center gap-2">
                +1-832-647-1819
              </a>
            </div>
          </div>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-primary mb-3">
            Estimate Federal Tax Before You File
          </h2>
          <p className="text-slate-600 mb-5">
            Use our 2025 tax refund estimator and 2026 federal tax calculator to compare
            filing status, deductions, self-employment tax, and capital gains before a reviewed estimate.
          </p>
          <Link href="/tax-calculator" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold">
            Open Federal Tax Calculator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-primary mb-3">
            Services By State
          </h2>
          <p className="text-slate-600 mb-5">
            Looking for state-focused tax and accounting support? Explore our dedicated pages:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/texas-tax-accounting-services" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Texas Tax and Accounting Services
            </Link>
            <Link href="/new-york-tax-accounting-services" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              New York Tax and Accounting Services
            </Link>
            <Link href="/pennsylvania-tax-accounting-services" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Pennsylvania Tax and Accounting Services
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-primary mb-3">
            Need Bookkeeping Services In Katy?
          </h2>
          <p className="text-slate-600 mb-5">
            If your business books are behind or you need a cleaner monthly process, review our
            local Katy bookkeeping page for cleanup, reconciliation, and tax-ready records.
          </p>
          <Link href="/texas/katy-bookkeeping-services" className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold">
            Bookkeeping Services Katy TX <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
        <div className="bg-primary-dark border border-primary-dark rounded-2xl p-5 sm:p-8 shadow-sm text-white">
          <h2 className="text-xl sm:text-2xl font-black mb-3">
            Need Help With An IRS Notice In Katy?
          </h2>
          <p className="text-[#d7e3fc] mb-5">
            If you received a CP14, CP2000, Letter 12C, identity verification letter, or another
            IRS notice, review our local Katy IRS notice help page before you respond.
          </p>
          <Link href="/texas/irs-notice-help-katy-tx" className="inline-flex items-center justify-center gap-2 bg-secondary text-primary-dark px-6 py-3 rounded-xl font-bold">
            IRS Notice Help Katy TX <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
