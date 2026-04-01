"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Building2, User, Scale, PlusCircle, Rocket, 
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  ChevronRight
} from "lucide-react";

// --- Tab Content Data ---

const tabsData = [
  {
    id: "business",
    label: "Business Tax & Accounting",
    icon: <Building2 className="w-5 h-5 flex-shrink-0" />,
    title: "Corporate Accounting & Tax Services",
    description: "Our Business Tax & Accounting Services are designed to help businesses of all sizes manage their financial operations efficiently while ensuring compliance with tax regulations. We provide expert guidance on tax planning, bookkeeping, payroll, and financial analysis, allowing businesses to optimize deductions, maximize savings, and stay compliant with IRS and state requirements. Whether you're starting a new business, managing financial records, or need assistance with tax filings, our qualified team of Tax Experts ensures accuracy, reliability, and strategic financial planning to help your business thrive.",
    services: [
      { title: "Accounting Software Selection & Implementation", desc: "Expert guidance in choosing, setting up, and integrating the perfect accounting software (QuickBooks, Xero, etc.) tailored to your business operations." },
      { title: "Full-Service Monthly Accounting & Back-Office Support", desc: "Complete management of your foundational accounting needs, ensuring books are balanced and financials are perfectly maintained every month." },
      { title: "QuickBooks™ Setup & Support", desc: "Professional setup, training, and ongoing troubleshooting for QuickBooks to keep your daily bookkeeping seamless and error-free." },
      { title: "Bookkeeping & Write-Up Services", desc: "Accurate daily and monthly transcription of your financial transactions, giving you a clear picture of cash flow and profitability." },
      { title: "Business Consulting", desc: "Strategic advisory focused on operational efficiency, financial health, and long-term scaling opportunities for your enterprise." },
      { title: "Business Entity Selection", desc: "Consultation to help you choose the most advantageous legal structure (LLC, S-Corp, C-Corp) for liability protection and tax benefits." },
      { title: "Buying or Selling a Business", desc: "Thorough financial analysis, valuation, and transition strategy for individuals looking to acquire or exit a business." },
      { title: "Incorporation & New Business Advisory", desc: "End-to-end guidance for startups, handling incorporation filing, initial compliance, and baseline financial architecture." },
      { title: "EIN / Tax ID Application", desc: "Fast and reliable processing of your Employer Identification Number applications directly with the IRS." },
      { title: "IRS & State Government Process Support", desc: "Dedicated assistance managing communications, paperwork, and compliance filings with state and federal financial authorities." },
      { title: "Financial Analysis & Statements (Compilation, Review, Audit)", desc: "Preparation of pristine, audit-ready financial statements to secure loans, attract investors, and inform executive decisions." },
      { title: "IRS Representation", desc: "Professional defense and mediation on your behalf in the event of an IRS audit or financial inquiry." },
      { title: "Management Advisory Services", desc: "High-level insights helping your leadership team optimize processes, mitigate risks, and maximize profit margins." },
      { title: "Payroll Services (Full-Service Payroll)", desc: "Comprehensive payroll management including direct deposits, tax withholdings, and timely filings to keep your team paid and your company compliant." },
      { title: "Invoice Management & AR/AP Back-Office Support", desc: "Efficient handling of Accounts Receivable and Accounts Payable to accelerate your cash cycle and eliminate late fees." },
      { title: "Sales Tax Services", desc: "Accurate calculation, collection guidance, and timely reporting of state and local sales taxes to prevent costly penalties." },
      { title: "401K & IRA Advisory for Business Owners", desc: "Strategic setup of retirement accounts designed to benefit business owners while remaining compliant with federal regulations." },
      { title: "Tax Optimization & Maximization of Deductions", desc: "Proactive, year-round strategies to legally minimize your tax burden and retain more of your hard-earned revenue." },
      { title: "State & Local Registrations (Unemployment Insurance, Withholding)", desc: "Proper registration and management of mandatory state-level insurance and tax withholding accounts." }
    ],
    benefits: [
      "Expert Guidance and Support",
      "Time and Cost Savings",
      "Tax Optimization and Deductions",
      "Comprehensive Services for All Business Stages",
      "Risk Mitigation and IRS Representation",
      "Efficient Back-Office Support",
      "Reliable Financial Reporting and Analysis",
      "Dedicated Customer Support"
    ]
  },
  {
    id: "individual",
    label: "Individual Tax Services",
    icon: <User className="w-5 h-5 flex-shrink-0" />,
    title: "Personalized Tax Preparation",
    description: "Our Individual Tax Services ensure hassle-free tax filing, maximizing deductions while keeping you compliant with IRS regulations. Whether you're a salaried employee, freelancer, or retiree, we provide expert guidance on tax preparation, planning, and optimization. Our team helps you minimize liabilities, maximize refunds, and navigate complex tax situations with ease. We also assist with IRS audit representation, back taxes, penalty abatements, and installment agreements, ensuring a stress-free resolution to tax issues. If you need estate and trust tax preparation, we offer strategic planning to minimize tax burdens and protect your financial legacy. With secure e-filing and dedicated support, we make tax filing simple, accurate, and reliable.",
    services: [
      { title: "Tax Filing & Preparation", desc: "Accurate, timely preparation of your annual tax returns ensuring full compliance and proactive error-checking." },
      { title: "Tax Planning & Optimization", desc: "Strategic forecasting throughout the year to align your personal finances for the lowest possible tax bracket." },
      { title: "Tax Resolution Services", desc: "Expert negotiation and settlement strategies to help you overcome back taxes, penalties, or conflicts with the IRS." },
      { title: "Estate & Trust Tax Preparation", desc: "Specialized filing and strategic wealth protection ensuring your legacy is preserved for future generations with minimal tax impact." }
    ],
    benefits: [
      "Expert Guidance and Support",
      "Maximized Refunds & Tax Savings",
      "Time-Saving & Hassle-Free Filing",
      "Comprehensive Tax Planning & Optimization",
      "IRS Audit Representation & Tax Resolution",
      "Estate & Trust Tax Preparation",
      "Secure & Confidential Tax Processing",
      "Dedicated Customer Support"
    ]
  },
  {
    id: "resolution",
    label: "Tax Resolution",
    icon: <Scale className="w-5 h-5 flex-shrink-0" />,
    title: "IRS Tax Relief & Audit Representation in Katy, TX",
    description: "Our professional Tax Resolution Services in Katy, TX, help individuals and businesses resolve complex tax issues with the IRS and state tax authorities efficiently. Whether you owe back taxes, face severe IRS penalties, or have years of unfiled returns, our local tax experts work to find the best tax relief solution for your situation. We provide expert IRS audit representation, establish Offer in Compromise settlements, file for penalty abatement, and negotiate IRS installment agreements, helping you significantly reduce tax liabilities and avoid wage garnishment or legal complications. Our team of Enrolled Agents and tax professionals fiercely negotiates with the IRS on your behalf, ensuring fair resolutions while protecting your financial assets. With our dependable tax resolution expertise, you can achieve full IRS compliance and lasting financial peace of mind.",
    services: [
      { title: "Back Taxes Help & Relief", desc: "Comprehensive IRS tax relief strategies to seamlessly catch up on prior-year tax liabilities through structured, legal relief avenues." },
      { title: "Expert IRS Audit Representation", desc: "Fierce professional defense during official IRS audits and inquiries, ensuring your rights, income, and assets are fully protected." },
      { title: "IRS Offer in Compromise (OIC)", desc: "Aggressive tax negotiation aiming to legally settle your outstanding IRS tax debt for significantly less than the total amount owed." },
      { title: "Payroll Tax Debt Resolution", desc: "Specialized tax resolution strategies for businesses struggling with unpaid payroll tax liabilities, Trust Fund Recovery Penalties, and associated fines." },
      { title: "Tax Penalty & Interest Abatement", desc: "Formal penalty abatement appeals to the IRS designed to drastically reduce or entirely eliminate crippling tax penalties and interest charges." },
      { title: "Tax Representation & Dispute Resolution", desc: "End-to-end management of your IRS dispute by licensed tax resolution experts across Texas, restoring your financial peace of mind." },
      { title: "Filing Unfiled & Overdue Tax Returns", desc: "Safe, IRS-compliant assistance in compiling, preparing, and filing multiple years of overdue tax returns to immediately restore your good standing." },
      { title: "Federally Licensed Enrolled Agents", desc: "Leverage the expertise of federally licensed tax practitioners equipped with unlimited representation rights to fight for you before all administrative levels of the IRS." },
      { title: "Secure IRS E-Filing Services", desc: "Fast, secure, and fully compliant electronic filing protocols for immediate transmission and rapid receipt confirmation from the IRS." }
    ],
    benefits: [
      "Legally Reduce Back Tax Debt",
      "Professional IRS Audit Protection",
      "IRS Penalty & Interest Relief",
      "Stop IRS Wage Garnishment & Bank Levies",
      "Financial Peace of Mind",
      "Negotiate Affordable Flexible Payment Plans"
    ]
  },
  {
    id: "additional",
    label: "Additional Services",
    icon: <PlusCircle className="w-5 h-5 flex-shrink-0" />,
    title: "Compliance & Secure Filing",
    description: "We offer a range of additional tax and compliance services to help individuals and businesses meet legal requirements and simplify financial processes. Our services include assistance with tax identification applications, international tax compliance, electronic filings, and secure document management. Whether you need help obtaining an ITIN, SSN, or FEIN, ensuring compliance with FBAR & FATCA regulations, or filing for business certifications such as HUB, MBE, or SBA HubZone, our experts provide professional guidance to streamline the process. We also offer FinCEN BOI (Beneficial Ownership Interest) Filing, ensuring compliance with anti-money laundering regulations, as well as tax extension filings to help avoid penalties and meet IRS deadlines. Our goal is to make tax and compliance processes hassle-free, secure, and efficient for individuals and businesses alike.",
    services: [
      { title: "ITIN, SSN, FEIN Applications", desc: "Streamlined assistance in acquiring crucial tax identification numbers for individuals, dependents, and businesses." },
      { title: "International Compliance (FBAR & FATCA)", desc: "Expert guidance reporting foreign bank accounts and assets to avoid severe international non-compliance penalties." },
      { title: "FinCEN BOI (Beneficial Ownership Interest) Filing", desc: "Ensuring your business fully complies with the latest federal anti-money laundering and ownership reporting mandates." },
      { title: "Extension Filing", desc: "Timely submission of tax extensions to protect you from late-filing penalties while your documents are finalized." },
      { title: "Certification Support (HUB, MBE, WOBE, WMBE, SBA HubZone & 8(a))", desc: "Comprehensive processing support helping you achieve specialized business certifications to win major contracts." },
      { title: "Secure Online Document Storage & Retention", desc: "Digital, bank-level encrypted storage allowing you safe, 24/7 access to your historical financial and tax documents." },
      { title: "E-Signing of Documents, Forms & Filings", desc: "Modern, unified digital signature solutions that keep corporate workflows entirely paperless and legally binding." },
      { title: "Mailing Support for Paper Forms", desc: "Reliable physical handling and certified mailing of specialized forms that the IRS does not currently accept electronically." }
    ],
    benefits: [
      "Simplified Compliance",
      "Secure Digital Solutions",
      "Seamless Tax Identification",
      "Hassle-Free Business Certifications",
      "Timely Filing & Extensions"
    ]
  },
  {
    id: "startup",
    label: "New Business Formation",
    icon: <Rocket className="w-5 h-5 flex-shrink-0" />,
    title: "Launch Your Startup Properly",
    description: "Starting a new business is an exciting yet challenging process that requires careful planning and strategic decision-making. From choosing the right business structure to registering with state and federal authorities, every step plays a crucial role in the success and legal compliance of your business. Our New Business Formation & Consultation services are designed to provide entrepreneurs and small business owners with expert guidance, ensuring a smooth and hassle-free startup experience. We assist in selecting the ideal entity type—whether it's a Sole Proprietorship, Partnership, LLC, S-Corp, or C-Corp—based on your financial goals, liability concerns, and tax considerations. Our team ensures that your business is properly registered, obtains the necessary tax identification numbers (EIN, FEIN, SSN), and complies with state and federal regulations. We also offer support in setting up financial systems, securing licenses, and understanding tax obligations. Beyond initial setup, our consultation services extend to business planning, risk assessment, financial structuring, and growth strategies. We help you navigate the complexities of business operations, ensuring that you have a solid foundation to scale successfully. Whether you need help with filing your business formation documents, tax planning, or industry-specific compliance requirements, we provide tailored solutions to meet your unique needs. By leveraging our expertise, you can focus on what matters most—growing your business. Our team ensures that all legal, financial, and regulatory aspects are covered so that you can operate with confidence and peace of mind.",
    services: [
      { title: "Expert Entity Selection", desc: "Consultative review to choose the most protective and tax-efficient structure (LLC vs S-Corp) for your specific industry." },
      { title: "Complete Business Registration", desc: "Hassle-free, exact processing of your Articles of Organization and state-level business licenses." },
      { title: "Compliance & Tax Readiness", desc: "Setup of foundational accounting systems and regulatory checks so your operations are spotless from Day One." },
      { title: "Financial Planning & Advisory", desc: "Strategic mapping of your initial capital runway, projected cash flows, and early-stage budgeting." },
      { title: "Access to Business Funding", desc: "Guidance on positioning your financial architecture to appeal to lenders, SBA loans, or venture capital." },
      { title: "Long-Term Business Strategy", desc: "Executive-level advisory to shape your growth phases, hiring economics, and product scaling milestones." },
      { title: "Ongoing Support & Advisory", desc: "A continuous partnership acting as your fractional CFO to ensure you never have to make tough financial decisions alone." }
    ],
    benefits: [
      "Avoid Costly Structure Mistakes",
      "Liability Protection Setup",
      "Optimized Tax Structures from Day One",
      "Fast Launch Timelines",
      "Ongoing Tax Expert Support"
    ]
  }
];

export default function ServicesContent() {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(null);
  const [isScrolledRight, setIsScrolledRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeContent = tabsData.find(t => t.id === activeTab) || tabsData[0];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setOpenAccordionIdx(null); // Reset open accordions when changing categories
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
      <section className="bg-[#003580] pt-28 sm:pt-32 pb-12 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 sm:mb-6">
                Comprehensive <span className="text-[#00C2CB]">Tax Expert</span> Services
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-[#d7e3fc] max-w-2xl mx-auto leading-relaxed">
                From individual tax filing to full business accounting—our integrated solutions are built specifically for your modern financial life.
            </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 -mt-6 sm:-mt-10 relative z-20">
        
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
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl text-[13px] sm:text-sm font-bold transition-all duration-300 ${
                                    isActive 
                                    ? "bg-[#0047AB] text-white shadow-md transform scale-[1.01]" 
                                    : "text-slate-500 hover:bg-slate-50 hover:text-[#0047AB]"
                                }`}
                            >
                                <span className={isActive ? "text-[#00C2CB]" : "text-slate-400 group-hover:text-[#0047AB]"}>
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
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00C2CB]/10 border border-[#00C2CB]/20 mb-6 w-fit">
                    <span className="text-[#00C2CB] text-[10px] sm:text-xs font-bold tracking-widest uppercase">{activeContent.label}</span>
                </div>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#0047AB] tracking-tight mb-4 sm:mb-6">
                    {activeContent.title}
                </h2>
                <div className="text-sm sm:text-base md:text-lg text-[#45474c] leading-relaxed mb-6 sm:mb-10 space-y-4">
                    {activeContent.description.split('. ').map((sentence, idx) => (
                      <span key={idx}>{sentence}{(idx !== activeContent.description.split('. ').length - 1) && '. '}</span>
                    ))}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#003580] mb-6 border-b border-slate-100 pb-2">Includes:</h3>
                
                {/* Specific exact services laid out as functionally interactive accordions */}
                <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-12">
                    {activeContent.services.map((service, idx) => {
                        const isOpen = openAccordionIdx === idx;
                        return (
                          <div 
                              key={idx} 
                              onClick={() => toggleAccordion(idx)}
                              className={`border rounded-lg bg-white overflow-hidden transition-all duration-300 cursor-pointer ${
                                isOpen ? 'border-[#00C2CB] shadow-md ring-1 ring-[#00C2CB]/20' : 'border-slate-200 hover:border-[#0047AB]/50 hover:shadow-sm'
                              }`}
                          >
                              {/* Accordion Header */}
                              <div className="flex items-center justify-between p-3 sm:p-4 group">
                                  <span className={`text-[13px] sm:text-sm font-bold transition-colors pr-4 ${isOpen ? 'text-[#00C2CB]' : 'text-[#0047AB] group-hover:text-[#00C2CB]'}`}>
                                      {service.title}
                                  </span>
                                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded shrink-0 flex items-center justify-center transition-colors ${
                                      isOpen ? 'bg-[#00C2CB]/10' : 'bg-slate-50 group-hover:bg-[#00C2CB]/10'
                                  }`}>
                                      {isOpen ? (
                                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#00C2CB]" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#0047AB] group-hover:text-[#00C2CB]" />
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

                <Link href="/contact" className="inline-flex items-center justify-center gap-2 w-full sm:w-max bg-[#00C2CB] text-[#003580] px-6 sm:px-10 py-3.5 sm:py-4 mt-auto rounded-xl font-bold uppercase tracking-widest hover:bg-[#33ced5] transition-colors text-sm">
                    Schedule a Consultation <ArrowRight className="w-5 h-5" />
                </Link>
            </div>

            {/* Right Col: Benefits Panel */}
            <div className="bg-[#003580] p-6 sm:p-10 lg:p-14 lg:w-1/3 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C2CB] rounded-full mix-blend-multiply opacity-20 filter blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                
                <h3 className="text-xl sm:text-2xl font-black text-white mb-6 sm:mb-8 relative z-10">Why Choose Us?</h3>
                
                <div className="space-y-4 sm:space-y-6 relative z-10">
                    {activeContent.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex gap-3 sm:gap-4 items-center">
                            <div className="bg-white/10 rounded-full p-1.5 flex-shrink-0">
                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00C2CB]" />
                            </div>
                            <span className="text-white/90 text-[14px] sm:text-base font-bold leading-relaxed">{benefit}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-10 sm:mt-14 pt-8 border-t border-white/10 relative z-10">
                    <p className="text-xs sm:text-sm text-[#d7e3fc] mb-3 font-bold uppercase tracking-widest">Need Immediate Help?</p>
                    <a href="tel:+18326471819" className="text-white text-xl sm:text-2xl md:text-3xl font-black hover:text-[#00C2CB] transition-colors flex items-center gap-2">
                        +1-832-647-1819
                    </a>
                </div>
            </div>

        </div>

      </section>
    </main>
  );
}
