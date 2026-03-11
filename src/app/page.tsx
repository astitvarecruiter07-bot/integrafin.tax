import Image from "next/image";
import Link from "next/link";
import LogoMarquee from "@/components/LogoMarquee";
import TaxCalculatorMini from "@/components/TaxCalculatorMini";

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Tax Planning",
    desc: "Strategic tax planning and preparation to minimize liabilities and maximize deductions for individuals and businesses.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Payroll Process",
    desc: "Comprehensive payroll solutions including processing, tax compliance, and employee benefit management for businesses of all sizes.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Audit Services",
    desc: "Professional audit and assurance services to ensure financial accuracy, regulatory compliance, and stakeholder confidence.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
    title: "Finance Analysis",
    desc: "In-depth financial analysis and reporting to drive data-driven decisions, identify growth opportunities, and optimize cash flow.",
  },
];

const steps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Free Consultation",
    desc: "Schedule a free consultation with our tax experts. We'll understand your unique financial situation and goals.",
    active: false,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Choose Your Package",
    desc: "Select the service package that best fits your needs — from individual tax filing to complete business accounting.",
    active: true,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Get Your Service",
    desc: "Our expert CPAs will handle everything — ensuring compliance, maximizing deductions, and delivering results.",
    active: false,
  },
];

const testimonials = [
  {
    quote: "IntegraFin has been instrumental in helping our business stay compliant and financially healthy.",
    name: "John D",
    role: "Small Business Owner",
  },
  {
    quote: "The team at IntegraFin helped me navigate complex tax regulations with ease. Their knowledge and professionalism gave me peace of mind during tax season.",
    name: "Sarah M",
    role: "Independent Consultant",
  },
  {
    quote: "I highly recommend IntegraFin for their personalized and efficient bookkeeping services. They truly understand the needs of small businesses.",
    name: "David L",
    role: "Startup Founder",
  },
  {
    quote: "Exceptional service! The team handled my tax filings seamlessly, ensuring compliance while optimizing my returns.",
    name: "Emily R",
    role: "Real Estate Investor",
  },
];

export default function Home() {
  return (
    <>
      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 overflow-hidden">
        {/* Decorative background rectangles - matching reference */}
        <div className="absolute top-0 right-0 w-[40%] sm:w-[55%] h-[90%] bg-lavender rounded-bl-[40px] sm:rounded-bl-[60px] -z-10" />
        <div className="absolute top-[15%] right-[5%] w-[100px] sm:w-[200px] h-[100px] sm:h-[200px] bg-accent rounded-full opacity-30 -z-10 hidden sm:block" />
        <div className="absolute bottom-[10%] right-[35%] w-[60px] sm:w-[120px] h-[60px] sm:h-[120px] bg-primary/10 rounded-2xl rotate-12 -z-10 hidden sm:block" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up relative">
              {/* Subtle background glow for left content */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl -z-10" />
              <p className="text-sm font-semibold text-primary mb-3">
                Welcome To <span className="bg-primary text-white px-2 py-0.5 rounded text-xs">IntegraFin</span> Accounting Firm
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-tight text-foreground mb-4 sm:mb-5">
                We Specialize in{" "}
                <span className="gradient-text">Accounting, Financial & Tax</span>{" "}
                Services
              </h1>
              <p className="text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
                IntegraFin provides trusted tax and business advisory services,
                simplifying your finances with expert accounting, tax filing, and
                business advisory solutions tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Contact Us
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-sm sm:text-base"
                >
                  Our Services
                </Link>
              </div>

              {/* Video thumbnail card */}
              <div className="mt-6 sm:mt-10 flex items-center gap-4">
                <div className="relative w-52 h-28 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-primary/30 hover:border-primary group cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(31,114,184,0.4)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-dark/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-primary ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground font-medium">
                  Seamless Tax Filing<br />
                  <span className="text-text-secondary font-normal">& Maximized Returns</span>
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative animate-slide-in-right hidden lg:block">
              {/* Main image - professional person */}
              <div className="relative w-full h-[480px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero-professional.png"
                  alt="Professional financial advisor at IntegraFin"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Rating badge */}
              <div className="absolute -top-2 -right-2 bg-white/95 backdrop-blur-sm border border-primary/20 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-primary/50 transition-colors p-4 animate-float">
                <p className="text-3xl font-bold text-foreground">4.9/5</p>
                <p className="text-text-secondary text-xs mt-1">Client Rating</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Get to know card */}
              <div className="absolute bottom-8 -right-4 bg-white/95 backdrop-blur-sm border border-primary/20 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-primary/50 transition-colors p-4 max-w-[180px]">
                <div className="flex -space-x-2 mb-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      style={{ background: ["#1F72B8", "#D6E4F0", "#0D4F8A"][i] }}
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-accent-light flex items-center justify-center text-xs font-bold text-primary">
                    +
                  </div>
                </div>
                <p className="text-sm font-bold text-foreground">Get To Know Our Business</p>
                <Link href="/about" className="text-xs text-primary font-medium inline-flex items-center mt-1 hover:underline">
                  Let&apos;s Get Started →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== LOGO MARQUEE ========== */}
      <LogoMarquee />

      {/* ========== WHO WE ARE SECTION ========== */}
      <section className="section-padding relative overflow-hidden border-t border-primary/20 bg-white" id="about-preview">
        {/* Decorative background rectangle */}
        <div className="absolute top-[10%] left-0 w-[40%] h-[70%] bg-lavender/40 rounded-r-[40px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Left - Image & Stats */}
            <div className="relative">
              <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[#EBF2FA] to-lavender shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <svg className="w-12 h-12 mx-auto text-primary mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="font-bold text-primary text-lg">Financial Planning</p>
                    <p className="text-text-secondary text-sm mt-1">Expert guidance for your financial future</p>
                  </div>
                </div>
                {/* Arrow button */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white border-2 border-accent hover:border-primary/50 rounded-xl p-4 text-center shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                  <p className="text-2xl font-bold text-foreground">21+</p>
                  <p className="text-xs text-text-secondary mt-1">Years Of Experience</p>
                </div>
                <div className="bg-white border-2 border-accent hover:border-primary/50 rounded-xl p-4 text-center shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                  <p className="text-2xl font-bold text-foreground">100+</p>
                  <p className="text-xs text-text-secondary mt-1">Expert Advisors</p>
                </div>
                <div className="bg-white border-2 border-accent hover:border-primary/50 rounded-xl p-4 text-center shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                  <p className="text-2xl font-bold text-foreground">1050+</p>
                  <p className="text-xs text-text-secondary mt-1">Projects Complete</p>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div>
              <p className="text-sm font-semibold text-text-secondary mb-2">
                <span className="bg-primary text-white px-2 py-0.5 rounded text-xs mr-1">Who</span>
                We Are?
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-5 leading-tight">
                Your Financial Partner For Success
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                IntegraFin is a trusted leader in tax and accounting services, committed to delivering accuracy and compliance for businesses. We tailor our solutions to meet the unique financial needs of each client, ensuring smooth operations and strategic growth.
              </p>

              {/* Key Benefits List */}
              <ul className="space-y-3 mb-6">
                {["Certified Tax Experts", "Year-Round Strategic Planning", "Customized Business Solutions"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </div>
                    <span className="text-foreground font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Cost-Effective Badge */}
              <div className="flex items-center gap-4 bg-accent-light rounded-xl p-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-foreground">Cost-Effective</p>
                  <p className="text-text-secondary text-sm">Affordable, high-quality financial solutions tailored to your budget</p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section className="section-padding bg-accent-light/30 relative overflow-hidden border-t border-primary/20" id="services-preview">
        {/* Decorative background rectangle */}
        <div className="absolute top-[5%] right-0 w-[35%] h-[80%] bg-[#EBF2FA]/40 rounded-l-[40px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Left */}
            <div>
              <p className="text-sm font-semibold text-text-secondary mb-2">
                We Have An Amazing <span className="bg-primary text-white px-2 py-0.5 rounded text-xs">Service</span>
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-5 leading-tight">
                Real Accounting Services For You
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                IntegraFin offers a full range of accounting and tax services. From
                business tax preparation to individual filing, bookkeeping, payroll,
                and financial advisory — we handle it all with precision.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg"
              >
                See More
              </Link>
            </div>

            {/* Right - Service Cards */}
            <div className="grid sm:grid-cols-2 gap-5">
              {services.map((service, i) => (
                <div key={i} className="bg-white/95 backdrop-blur-md border border-primary/20 hover:border-primary rounded-2xl p-6 card-hover shadow-lg hover:shadow-[0_10px_40px_rgba(31,114,184,0.15)] transition-all duration-300 group flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#EBF2FA] group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center text-primary mb-4">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-grow mb-4">{service.desc}</p>
                  <Link href="/services" className="text-primary font-semibold text-sm inline-flex items-center hover:underline mt-auto">
                    Learn More
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== TAX CALCULATOR SECTION ========== */}
      <TaxCalculatorMini />

      {/* ========== HOW IT WORKS SECTION ========== */}
      <section className="py-20 relative overflow-hidden border-t border-primary/20 bg-white">
        {/* Full-width rounded lavender background container like reference */}
        <div className="absolute inset-x-3 sm:inset-x-6 inset-y-0 bg-lavender rounded-[20px] sm:rounded-[32px] -z-10" />
        <div className="absolute top-6 right-12 w-[100px] h-[100px] bg-accent/40 rounded-2xl rotate-12 -z-[5]" />
        <div className="absolute bottom-8 left-10 w-[80px] h-[80px] bg-primary/10 rounded-full -z-[5]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <p className="text-sm font-semibold text-text-secondary mb-2">
            How It <span className="bg-primary text-white px-2 py-0.5 rounded text-xs">Works?</span>
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Check Out The Easy Way<br />To Get Our Services
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">
            Getting started with IntegraFin is simple. Follow these three easy steps to access expert tax and accounting services.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`rounded-2xl p-5 sm:p-6 card-hover transition-all duration-300 ${step.active
                  ? "bg-primary text-white shadow-[0_15px_40px_rgba(31,114,184,0.4)] border-2 border-primary-dark"
                  : "bg-white/95 backdrop-blur-md shadow-lg border-2 border-primary/10 hover:border-primary/50 hover:shadow-[0_15px_40px_rgba(31,114,184,0.15)]"
                  }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center ${step.active
                    ? "bg-white/20 text-white"
                    : "bg-accent-light text-primary"
                    }`}
                >
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                <p className={`text-sm leading-relaxed ${step.active ? "text-white/80" : "text-text-secondary"}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section className="section-padding bg-accent-light/30 relative overflow-hidden border-y border-primary/20">
        {/* Decorative background rectangle */}
        <div className="absolute top-[5%] left-0 w-[30%] h-[85%] bg-lavender/30 rounded-r-[40px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Left */}
            <div>
              <p className="text-sm font-semibold text-text-secondary mb-2">
                Client <span className="bg-primary text-white px-2 py-0.5 rounded text-xs">Testimonial</span>
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-5 leading-tight">
                What They Say<br />About Us?
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Our clients trust us for reliable, professional, and personalized financial services. Here&apos;s what they have to say.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-7 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>

            {/* Right - Testimonial Cards */}
            <div className="space-y-6">
              {testimonials.slice(0, 3).map((t, i) => (
                <div key={i} className="bg-white border-2 border-primary/15 hover:border-primary/40 rounded-3xl p-7 relative shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(31,114,184,0.15)] transition-all duration-300 transform hover:-translate-y-1">
                  <p className="text-foreground leading-relaxed mb-5 italic text-lg">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-dark flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{t.name}</p>
                      <p className="text-primary text-xs font-semibold">{t.role}</p>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 text-primary/10">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA / REQUEST CALLBACK ========== */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">
            Get in touch with our expert team for a free consultation. We&apos;re here to simplify your tax and accounting needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 bg-white text-primary font-semibold rounded-full hover:bg-[#EBF2FA] transition-colors duration-200"
            >
              Request a Call Back
            </Link>
            <a
              href="tel:+18326471819"
              className="inline-flex items-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1-832-647-1819
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-10 border-t border-white/10">
            {[
              { val: "1050+", label: "Projects Completed" },
              { val: "217K", label: "Happy Clients" },
              { val: "100", label: "Expert Advisors" },
              { val: "21+", label: "Years of Experience" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold">{stat.val}</p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ Schema (Hidden) ========== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What tax services does IntegraFin offer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "IntegraFin offers comprehensive tax services including business tax & accounting, individual tax preparation, tax resolution services, payroll processing, bookkeeping, and financial advisory. We serve businesses of all sizes and individuals in Katy, TX and nationwide.",
                },
              },
              {
                "@type": "Question",
                name: "How can I schedule a free consultation with IntegraFin?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can schedule a free consultation by contacting us at +1-832-647-1819, emailing contact@integrafin.tax, or visiting our Contact Us page. Our expert CPAs will assess your financial needs and recommend the best service package.",
                },
              },
              {
                "@type": "Question",
                name: "Where is IntegraFin located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "IntegraFin LLC is located at 2039 N Mason Rd, Suite 604, Katy, TX 77449, USA. We also have an office in Nagpur, Maharashtra, India.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
