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
    title: "Business - Tax & Accounting Services",
    description: "Our Business Tax & Accounting Services are designed to help businesses of all sizes manage their financial operations efficiently while ensuring compliance with tax regulations. We provide expert guidance on tax planning, bookkeeping, payroll, and financial analysis, allowing businesses to optimize deductions, maximize savings, and stay compliant with IRS and state requirements. Whether you're starting a new business, managing financial records, or need assistance with tax filings, our qualified team of CPAs (Certified Public Accountants) and CAs (Chartered Accountants) ensures accuracy, reliability, and strategic financial planning to help your business thrive.",
    services: [
      { title: "Accounting Software Selection & Implementation", desc: "Choosing the right accounting software is crucial for your business. We evaluate your needs and recommend the best solution, whether it's QuickBooks™, Xero, Zoho Books, or other platforms. Our team handles the complete setup, customization, integration, and training to ensure a smooth transition, enabling you to manage your finances efficiently." },
      { title: "Full-Service Accounting & Back-Office Support", desc: "We provide end-to-end accounting and back-office support, including bookkeeping, payroll processing, financial reporting, tax compliance, and invoice management. Our services allow you to focus on growing your business while we take care of your financial operations with accuracy and efficiency." },
      { title: "QuickBooks™ Setup & Support", desc: "We provide expert assistance in setting up and managing accounting software like QuickBooks™, Zoho Books, Xero, and other platforms. Our team ensures that your financial data is organized efficiently, allowing for accurate bookkeeping, expense tracking, and financial reporting." },
      { title: "Bookkeeping & Write-Up Services", desc: "Our bookkeeping services help businesses maintain accurate financial records. We handle daily transactions, reconcile bank statements, and prepare financial reports, ensuring compliance with accounting standards. With our write-up services, you get detailed insights into your business’s financial health." },
      { title: "Business Consulting", desc: "We offer strategic business consulting to help you make informed financial decisions. Whether it’s cash flow management, investment strategies, or financial forecasting, our experts provide valuable guidance to support business growth." },
      { title: "Business Entity Selection", desc: "Choosing the right business structure—LLC, Corporation, or Sole Proprietorship—affects your tax obligations and legal protections. We provide expert advice on entity selection to ensure tax efficiency and compliance." },
      { title: "Business Entity Selection", desc: "Choosing the right business structure—LLC, Corporation, or Sole Proprietorship—affects your tax obligations and legal protections. We provide expert advice on entity selection to ensure tax efficiency and compliance." },
      { title: "Buying or Selling a Business", desc: "Navigating the complexities of business acquisitions and sales can be challenging. Our team provides due diligence, financial analysis, and valuation support to ensure a smooth transition during business purchases or sales." },
      { title: "Incorporation & New Business Advisory", desc: "Starting a business? We assist in company incorporation, drafting essential documents, and guiding you through tax and legal requirements to ensure a successful launch." },
      { title: "EIN / Tax ID Application", desc: "Every business needs an Employer Identification Number (EIN) for tax filing and compliance. We handle the application process for you, ensuring timely registration with the IRS." },
      { title: "IRS & State Government Process Support", desc: "We assist with IRS and state-mandated tax filings, compliance processes, and necessary documentation to keep your business legally compliant." },
      { title: "Financial Analysis & Statements (Compilation, Review, Audit)", desc: "Get accurate financial statements prepared, reviewed, or audited to ensure compliance, transparency, and informed decision-making for your business." },
      { title: "IRS Representation", desc: "Facing an IRS audit or tax dispute? Our experts provide professional representation to negotiate, resolve issues, and ensure a fair outcome." },
      { title: "Management Advisory Services", desc: "We offer expert business advisory services, helping you optimize operations, increase efficiency, and develop long-term financial strategies." },
      { title: "Payroll Services (Full-Service Payroll)", desc: "Our payroll solutions handle salary processing, tax deductions, compliance, and employee payments, ensuring a smooth and accurate payroll system." },
      { title: "Invoice Management & AR/AP Back-Office Suppor", desc: "We streamline your invoicing, manage accounts receivable/payable, and ensure timely payments to improve your business’s cash flow." },
      { title: "Sales Tax Services", desc: "Ensure compliance with sales tax regulations through our expert assistance in tax registration, accurate calculations, and timely filings." },
      { title: "401K & IRA Advisory for Business Owners", desc: "Plan for the future with our 401K and IRA advisory services, helping business owners maximize retirement savings and tax benefits." },
      { title: "Tax Optimization & Maximization of Deductions", desc: "Reduce your tax burden legally by leveraging deductions, credits, and expert tax-saving strategies tailored to your financial situation." },
      { title: "State & Local Registrations (Unemployment Insurance, Withholding)", desc: "We handle your business’s state and local tax registrations, including unemployment insurance and tax withholdings, ensuring compliance." }
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
    description: "Our Individual Tax Services ensure hassle-free tax filing, maximizing deductions while keeping you compliant with IRS regulations. Whether you're a salaried employee, freelancer, or retiree, we provide expert guidance on tax preparation, planning, and optimization. Our team helps you minimize liabilities, maximize refunds, and navigate complex tax situations with ease.  We also assist with IRS audit representation, back taxes, penalty abatements, and installment agreements, ensuring a stress-free resolution to tax issues. If you need estate and trust tax preparation, we offer strategic planning to minimize tax burdens and protect your financial legacy. With secure e-filing and dedicated support, we make tax filing simple, accurate, and reliable.",
    services: [
      { title: "Tax Filing & Preparation", desc: "Hassle-free tax filing with accurate preparation to ensure compliance while maximizing refunds and minimizing liabilities." },
      { title: "Tax Planning & Optimization", desc: "Proactive tax planning to reduce your tax burden legally by identifying deductions, credits, and strategies tailored to your financial goals." },
      { title: "Tax Resolution Services", desc: "Struggling with tax issues? We assist with IRS disputes, back taxes, audit representation, and penalty relief to resolve your tax challenges." },
      { title: "Estate & Trust Tax Preparation", desc: "Expert guidance in estate and trust tax filings, ensuring compliance while preserving wealth and minimizing tax implications for beneficiaries." }
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
    label: "Tax Resolution Services",
    icon: <Scale className="w-5 h-5 flex-shrink-0" />,
    title: "Tax Resolution Services",
    description: "Our Tax Resolution Services help individuals and businesses resolve tax issues with the IRS and state tax authorities efficiently. Whether you owe back taxes, face penalties, or have unfiled returns, our experts work to find the best solution for your situation. We assist with IRS audit representation, offer in compromise, penalty abatement, and installment agreements, helping you reduce tax liabilities and avoid legal complications. Our team negotiates with the IRS on your behalf, ensuring fair resolutions while protecting your financial interests. With our expertise, you can achieve tax compliance and financial peace of mind.",
    services: [
      { title: "Back Taxes Owed", desc: "We help you resolve unpaid taxes by negotiating payment plans, reducing penalties, and ensuring compliance with IRS regulations." },
      { title: "IRS Audit Representation", desc: "Our experts represent you before the IRS, handling audits professionally to minimize liabilities and protect your rights." },
      { title: "Offer in Compromise", desc: "Settle your tax debt for less than the full amount owed through IRS-approved negotiation strategies." },
      { title: "Payroll Taxes Owed", desc: "Avoid penalties by resolving overdue payroll tax issues with structured repayment plans and compliance assistance." },
      { title: "Penalty/Interest Abatement", desc: "Reduce or eliminate IRS penalties and interest charges by proving reasonable cause or negotiating relief options." },
      { title: "Tax Representation & Resolution", desc: "We advocate on your behalf to resolve complex tax disputes, ensuring fair treatment and financial relief." },
      { title: "Unfiled Returns", desc: "Get back on track by filing overdue tax returns, minimizing penalties, and preventing legal action from the IRS." },
      { title: "Why Choose an Enrolled Agent?", desc: "Enrolled Agents are federally authorized tax professionals who specialize in tax resolution and IRS negotiations." },
      { title: "E-Filing Services", desc: "Secure and accurate electronic tax filing ensures faster processing, quicker refunds, and reduced risk of error." }
    ],
    benefits: [
      "Reduce Tax Debt",
      "IRS Audit Protection",
      "Penalty & Interest Relief",
      "Legal Compliance & Avoiding Wage Garnishment",
      "Peace of Mind",
      "Flexible Payment Plans"
    ]
  },
  {
    id: "additional",
    label: "Additional Services",
    icon: <PlusCircle className="w-5 h-5 flex-shrink-0" />,
    title: "Additional Services",
    description: "We offer a range of additional tax and compliance services to help individuals and businesses meet legal requirements and simplify financial processes. Our services include assistance with tax identification applications, international tax compliance, electronic filings, and secure document management. Whether you need help obtaining an ITIN, SSN, or FEIN, ensuring compliance with FBAR & FATCA regulations, or filing for business certifications such as HUB, MBE, or SBA HubZone, our experts provide professional guidance to streamline the process. We also offer FinCEN BOI (Beneficial Ownership Interest) Filing, ensuring compliance with anti-money laundering regulations, as well as tax extension filings to help avoid penalties and meet IRS deadlines. Our goal is to make tax and compliance processes hassle-free, secure, and efficient for individuals and businesses alike.",
    services: [
      { title: "ITIN, SSN, FEIN Applications", desc: "Assistance with obtaining Individual Taxpayer Identification Number (ITIN), Social Security Number (SSN), and Federal Employer Identification Number (FEIN) for tax and business purposes." },
      { title: "International Compliance (FBAR & FATCA)", desc: "Ensure compliance with foreign financial reporting requirements, including FBAR (Foreign Bank Account Reporting) and FATCA (Foreign Account Tax Compliance Act)." },
      { title: "FinCEN BOI (Beneficial Ownership Interest) Filing", desc: "Meet FinCEN reporting requirements by disclosing beneficial ownership information to comply with anti-money laundering laws." },
      { title: "Extension Filing", desc: "Request tax return extensions to avoid penalties and ensure compliance with IRS deadlines." },
      { title: "Certification Support (HUB, MBE, WOBE, WMBE, SBA HubZone & 8(a))", desc: "Assistance with obtaining business certifications to qualify for government contracts and minority business benefits." },
      { title: "Secure Online Document Storage & Retention", desc: "Safely store tax documents online with secure access and long-term retention options." },
      { title: "E-Signing of Documents, Forms & Filings", desc: "Digitally sign and submit tax documents securely and conveniently from anywhere." }
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
    title: "New Business Formation & Consultation",
    description: "Starting a new business is an exciting yet challenging process that requires careful planning and strategic decision-making. From choosing the right business structure to registering with state and federal authorities, every step plays a crucial role in the success and legal compliance of your business. Our New Business Formation & Consultation services are designed to provide entrepreneurs and small business owners with expert guidance, ensuring a smooth and hassle-free startup experience. We assist in selecting the ideal entity type—whether it's a Sole Proprietorship, Partnership, LLC, S-Corp, or C-Corp—based on your financial goals, liability concerns, and tax considerations. Our team ensures that your business is properly registered, obtains the necessary tax identification numbers (EIN, FEIN, SSN), and complies with state and federal regulations. We also offer support in setting up financial systems, securing licenses, and understanding tax obligations. Beyond initial setup, our consultation services extend to business planning, risk assessment, financial structuring, and growth strategies. We help you navigate the complexities of business operations, ensuring that you have a solid foundation to scale successfully. Whether you need help with filing your business formation documents, tax planning, or industry-specific compliance requirements, we provide tailored solutions to meet your unique needs. By leveraging our expertise, you can focus on what matters most—growing your business. Our team ensures that all legal, financial, and regulatory aspects are covered so that you can operate with confidence and peace of mind.",
    services: [
      { title: "Expert Entity Selection", desc: "We help you choose the best legal structure for your business (LLC, S-Corp, C-Corp, Partnership, etc.) to maximize tax advantages and liability protection." },
      { title: "Complete Business Registration", desc: "Hassle-free assistance with registering your business, obtaining an EIN (Employer Identification Number), state tax IDs, and business licenses." },
      { title: "Compliance & Tax Readiness", desc: "Ensure that your business meets IRS, state, and local tax regulations, including payroll setup and sales tax compliance." },
      { title: "Financial Planning & Advisory", desc: "Guidance on setting up business bank accounts, bookkeeping systems, and financial reporting structures for smooth operations." },
      { title: "Access to Business Funding", desc: "Get insights on securing business loans, venture capital, and grants to support your startup’s growth." },
      { title: "Long-Term Business Strategy", desc: "From initial formation to expansion, we provide strategic consultation on marketing, operations, and risk management." },
      { title: "Ongoing Support & Advisory", desc: "Our team is available beyond the formation process, offering continued tax planning, accounting, and financial advisory services as your business grows." }
    ],
    benefits: [
      "Expert Entity Selection",
      "Complete Business Registration",
      "Compliance & Tax Readiness",
      "Financial Planning & Advisory",
      "Access to Business Funding",
      "Long-Term Business Strategy",
      "Ongoing Support & Advisory"
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
    </main>
  );
}
