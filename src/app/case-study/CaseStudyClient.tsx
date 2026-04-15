"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  ArrowRight,
  Briefcase,
  TrendingUp,
  BookOpen,
  ShieldCheck,
  DollarSign,
  Target,
  CheckCircle2,
} from 'lucide-react';

const stats = [
  { label: 'Projects', value: '1,050+' },
  { label: 'Happy Clients', value: '217K+' },
  { label: 'Years Experience', value: '21' },
  { label: 'Funding Secured', value: '$2M+' },
];

const categories = [
  'All',
  'Tax Planning',
  'Bookkeeping',
  'Growth Strategies',
  'Audit & Assurance',
  'Loan Management',
];

const caseStudies = [
  {
    title: "5-Year Business Plan for Healthcare Startup",
    category: "Growth Strategies",
    desc: "Created a detailed 5-year business plan for a healthcare startup, including financial projections, funding strategies, and compliance roadmap.",
  },
  {
    title: "Automated Bookkeeping for 50+ Property Real Estate Group",
    category: "Bookkeeping",
    desc: "Implemented an automated bookkeeping and budgeting system for a real estate group managing 50+ properties, streamlining their financial operations.",
  },
  {
    title: "Loan Management Strategy for Private School",
    category: "Loan Management",
    desc: "Guided institutional clients through SBA loan applications and financial restructuring, securing critical business funding and better rates.",
  },
  {
    title: "Financial Audit for Multi-State Retail Chain",
    category: "Audit & Assurance",
    desc: "Conducted a comprehensive financial audit for a non-profit organization, ensuring transparent fund management and regulatory compliance.",
  },
  {
    title: "Tax Compliance Strategy for Tech Startup",
    category: "Tax Planning",
    desc: "Developed a comprehensive tax strategy for a mid-size firm, resulting in significant reduction in liability through strategic credits.",
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Tax Planning": <ShieldCheck className="w-5 h-5" />,
  "Growth Strategies": <TrendingUp className="w-5 h-5" />,
  "Bookkeeping": <BookOpen className="w-5 h-5" />,
  "Loan Management": <DollarSign className="w-5 h-5" />,
  "Audit & Assurance": <Target className="w-5 h-5" />,
};

export default function CaseStudyClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStudies = selectedCategory === 'All'
    ? caseStudies
    : caseStudies.filter(study => study.category === selectedCategory);

  return (
    <div className="bg-slate-50 font-sans text-slate-800">

      {/* SECTION 1: HERO BANNER */}
      <section className="relative pt-28 sm:pt-40 pb-16 sm:pb-24 bg-[#003580] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0092df 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0092df]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#0092df]">Case Studies</span>
          </nav>

          <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-4 block">
            Client Success Stories
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
            Real Results &{" "}
            <br />
            <span className="bg-gradient-to-r from-[#0092df] to-[#00C2CB] bg-clip-text text-transparent">
              Real Businesses
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-300 text-base sm:text-lg mb-8 sm:mb-12 font-medium leading-relaxed">
            Explore how IntegraFin has helped businesses and individuals achieve financial excellence through rigorous strategy and expert guidance.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl flex flex-col items-center">
                <span className="text-[#0092df] text-2xl sm:text-3xl font-black tracking-tight">{stat.value}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all ${selectedCategory === cat
                  ? 'border-[#0092df] text-[#0092df] bg-[#0092df]/10'
                  : 'border-white/20 text-slate-300 hover:border-[#0092df]/50 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED CASE STUDY */}
      <section className="bg-white py-12 sm:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 group overflow-hidden bg-slate-50 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-5 sm:p-8 hover:shadow-2xl hover:shadow-[#0092df]/10 transition-all duration-500">
            {/* Image Side */}
            <div className="lg:w-1/2 w-full overflow-hidden rounded-2xl relative h-[250px] sm:h-[400px]">
              <Image
                alt="Modern manufacturing floor"
                className="object-cover grayscale-[30%] group-hover:scale-105 transition-transform duration-700"
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
                fill
              />
              {/* Result Badge */}
              <div className="absolute bottom-6 left-6 bg-[#0092df] text-white px-5 py-3 rounded-2xl shadow-lg shadow-[#0092df]/30">
                <span className="text-3xl font-black block leading-none">30%</span>
                <span className="text-[10px] font-black uppercase tracking-widest block mt-1">Liability Reduced</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-1/2 w-full">
              <span className="inline-block px-3 py-1 bg-[#0092df]/10 text-[#0092df] rounded font-black text-[10px] uppercase tracking-widest mb-6 border border-[#0092df]/20">
                Featured Strategy
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#003580] mb-4 sm:mb-6 leading-tight tracking-tight">
                Comprehensive Tax Strategy for Mid-Size Manufacturing Firm
              </h2>

              {/* KPIs */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-10 py-6 border-y border-slate-100">
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-[#003580] tracking-tight">30%</span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tax Liability Reduced</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-[#003580] tracking-tight">12 Wks</span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Implementation</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-black text-[#003580] tracking-tight">100%</span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">IRS Compliant</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#003580] hover:bg-[#002050] text-white px-8 py-3.5 rounded-xl font-black tracking-widest uppercase text-xs transition-all duration-300 shadow-lg shadow-[#003580]/20 hover:-translate-y-0.5"
              >
                View Full Case Study
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CASE STUDIES GRID */}
      <section className="bg-slate-50 py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-2 block">Proven Performance</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#003580] tracking-tight">Projects We Have Done</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStudies.map((study, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0092df]/10 hover:border-[#0092df]/20 transition-all duration-500 flex flex-col p-5 sm:p-8"
              >
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0092df]/10 text-[#0092df] rounded-lg font-black text-[9px] uppercase tracking-widest border border-[#0092df]/15">
                    {categoryIcons[study.category]}
                    {study.category}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#003580] mb-4 hover:text-[#0092df] transition-colors leading-snug tracking-tight flex-grow">
                  {study.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  {study.desc}
                </p>
                <div className="pt-6 border-t border-slate-100 mt-auto">
                  <Link
                    href="/contact"
                    className="text-[#0092df] font-black text-xs uppercase tracking-widest hover:text-[#003580] transition-colors inline-flex items-center gap-1"
                  >
                    View Case
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Placeholder CTA Card */}
            <div className="bg-[#003580] rounded-3xl p-6 sm:p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0092df]/20 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <Briefcase className="w-12 h-12 text-[#0092df] mb-6 relative z-10" />
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight relative z-10">Your Story Next</h3>
              <p className="text-slate-300 mb-8 font-medium text-sm leading-relaxed relative z-10">
                Let IntegraFin engineer your path to financial excellence and measurable results.
              </p>
              <Link
                href="/contact"
                className="w-full py-4 bg-[#0092df] hover:bg-[#007bc0] text-white font-black uppercase tracking-widest text-xs rounded-xl transition-colors relative z-10 text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="py-12 sm:py-24 bg-white border-t border-slate-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0092df]/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-4 block">Our Track Record</span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#003580] mb-4 sm:mb-6 tracking-tight">Why Clients Choose IntegraFin</h2>
            <p className="text-slate-600 text-sm sm:text-lg mb-4 max-w-xl mx-auto font-medium leading-relaxed">
              A consistent record of measurable outcomes, transparent communication, and expert financial engineering.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              "Proven Track Record", "Transparent Reporting", "IRS Compliant", "Timely Delivery",
              "Industry Expertise", "Strategic Planning", "Client-First Approach", "Reliable Outcomes",
              "Multi-State Experience", "Tech-Enabled Ops", "CPA-Led Teams", "Regulatory Mastery"
            ].map((item, idx) => (
              <div key={idx} className="group flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:border-[#0092df]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#0092df] transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-[#0092df] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-bold text-[#003580]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA BANNER */}
      <section className="py-16 sm:py-24 bg-[#003580] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0092df 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0092df]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-4 block">Ready to Begin?</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight">
            Start Your Success Story
          </h2>
          <p className="text-slate-300 text-sm sm:text-lg mb-8 sm:mb-12 max-w-xl mx-auto font-medium leading-relaxed">
            Connect with our team to discuss how we can engineer a tailored financial strategy for your business.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0092df] hover:bg-[#007bc0] text-white px-10 py-4 rounded-xl font-black tracking-widest uppercase text-xs transition-all duration-300 shadow-lg shadow-[#0092df]/20 hover:-translate-y-0.5"
          >
            Schedule a Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
