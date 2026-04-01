"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  TrendingUp, 
  BookOpen, 
  ShieldCheck, 
  DollarSign,
  Target
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
  "Tax Planning": <ShieldCheck className="w-6 h-6" />,
  "Growth Strategies": <TrendingUp className="w-6 h-6" />,
  "Bookkeeping": <BookOpen className="w-6 h-6" />,
  "Loan Management": <DollarSign className="w-6 h-6" />,
  "Audit & Assurance": <Target className="w-6 h-6" />,
};

export default function CaseStudyClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStudies = selectedCategory === 'All'
    ? caseStudies
    : caseStudies.filter(study => study.category === selectedCategory);

  return (
    <div className="bg-[#f7f9fc]">
      {/* SECTION 1: HERO BANNER */}
      <section className="relative min-h-[420px] sm:min-h-[520px] pt-28 sm:pt-32 pb-14 sm:pb-20 flex items-center justify-center hero-gradient overflow-hidden">
        <div className="absolute -inset-10 bg-[#00C2CB]/5 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
          <nav className="flex justify-center items-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#00C2CB]">Case Studies</span>
          </nav>

          <div className="inline-flex items-center bg-[#00C2CB]/10 border border-[#00C2CB]/20 px-4 py-1.5 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-[#00C2CB] mr-2" />
            <span className="text-[#00C2CB] text-[10px] font-black uppercase tracking-[0.2em]">CLIENT SUCCESS STORIES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-4 sm:mb-6 max-w-4xl mx-auto">
            <span className="bg-gradient-to-r from-[#00C2CB] to-blue-400 bg-clip-text text-transparent">Real Results</span> for Real Businesses
          </h1>

          <p className="text-slate-400 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mb-8 sm:mb-12">
            Explore how IntegraFin has helped businesses and individuals achieve financial excellence through rigorous engineering and sovereign strategy.
          </p>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 px-4 sm:px-6 py-3 sm:py-4 rounded-xl flex flex-col items-center">
                <span className="text-[#00C2CB] text-2xl font-black tracking-tighter">{stat.value}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#00C2CB] text-[#003580] shadow-lg shadow-[#00C2CB]/20'
                    : 'border border-white/20 text-white hover:border-[#00C2CB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED CASE STUDY */}
      <section className="bg-[#003580] py-12 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-0 overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-900/40 group">
            <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[400px]">
              <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
              <Image 
                alt="Modern manufacturing floor" 
                className="w-full h-full object-cover grayscale opacity-60 transition-transform duration-700 group-hover:scale-110" 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                fill
              />
              <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-between">
                <span className="self-start px-4 py-1.5 bg-[#003580]/80 backdrop-blur-md text-[#00C2CB] text-[10px] font-black uppercase tracking-[0.2em] border border-[#00C2CB]/30">
                  Manufacturing Industry
                </span>
                <div className="bg-[#00C2CB]/90 p-5 sm:p-8 w-32 h-32 sm:w-48 sm:h-48 rounded-full flex flex-col items-center justify-center text-[#003580] shadow-2xl">
                  <span className="text-2xl sm:text-4xl font-black tracking-tighter leading-none">30%</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-center leading-tight mt-2">Reduction in Liability</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-12 lg:p-20 flex flex-col justify-center">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-px w-8 bg-[#00C2CB]"></div>
                <span className="text-[#00C2CB] text-[11px] font-black uppercase tracking-[0.3em]">Featured Strategy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight mb-6 sm:mb-8">
                Comprehensive Tax Strategy for Mid-Size Manufacturing Firm
              </h2>
              <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
                <div className="space-y-1">
                  <span className="block text-2xl font-bold text-white tracking-tighter">30%</span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tax Liability Reduced</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-bold text-white tracking-tighter">12 Wks</span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">Implementation</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-2xl font-bold text-white tracking-tighter">100%</span>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">IRS Compliant</span>
                </div>
              </div>
              <Link href="/contact" className="self-start group flex items-center bg-[#00C2CB] text-[#003580] px-10 py-4 rounded-lg font-black uppercase tracking-widest text-xs transition-all hover:scale-105 shadow-lg shadow-[#00C2CB]/20">
                View Full Case Study
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CASE STUDIES GRID SECTION */}
      <section className="bg-[#F5F7FA] py-12 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4">
            <div>
              <span className="text-[#00C2CB] text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">Proven Performance</span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0047AB] tracking-tight">Projects We Have Done</h2>
            </div>
            <div className="text-slate-500 text-sm max-w-xs font-light">
              A clinical review of recent institutional deployments across the financial spectrum.
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredStudies.map((study, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-5 sm:p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full border-t-4 border-transparent hover:border-[#00C2CB]"
              >
                <div className="mb-8">
                  <span className="px-3 py-1 bg-slate-100 text-blue-700 text-[9px] font-black uppercase tracking-widest rounded flex items-center gap-1 w-fit">
                    {categoryIcons[study.category]}
                    {study.category}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#0047AB] tracking-tight leading-snug mb-6 flex-grow">
                  {study.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {study.desc}
                </p>
                <Link href="/contact" className="flex items-center text-[#0047AB] font-black uppercase tracking-[0.2em] text-[10px] group/link hover:text-[#00C2CB] transition-colors">
                  View Case
                  <ChevronRight className="w-4 h-4 ml-2 text-[#00C2CB] transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            ))}

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl p-8 opacity-60">
              <Briefcase className="w-10 h-10 text-slate-400 mb-4" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 text-center">Your Success Story Starts Here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
