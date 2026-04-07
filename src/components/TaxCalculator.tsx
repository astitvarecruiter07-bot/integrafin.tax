'use client';

import { useState } from 'react';
import { FileDown, Loader2, ArrowRight } from 'lucide-react';
import { submitLead } from '@/app/actions/leads';
import Link from 'next/link';

const FILING_STATUSES = [
  { value: "single", label: "Single" },
  { value: "married_joint", label: "Married Filing Jointly" },
  { value: "married_separate", label: "Married Filing Separately" },
  { value: "head_of_household", label: "Head of Household" },
];

const TAX_BRACKETS_2024: Record<string, { rate: number; min: number; max: number }[]> = {
  single: [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 609350 },
    { rate: 0.37, min: 609350, max: Infinity },
  ],
  married_joint: [
    { rate: 0.10, min: 0, max: 23200 },
    { rate: 0.12, min: 23200, max: 94300 },
    { rate: 0.22, min: 94300, max: 201050 },
    { rate: 0.24, min: 201050, max: 383900 },
    { rate: 0.32, min: 383900, max: 487450 },
    { rate: 0.35, min: 487450, max: 731200 },
    { rate: 0.37, min: 731200, max: Infinity },
  ],
  married_separate: [
    { rate: 0.10, min: 0, max: 11600 },
    { rate: 0.12, min: 11600, max: 47150 },
    { rate: 0.22, min: 47150, max: 100525 },
    { rate: 0.24, min: 100525, max: 191950 },
    { rate: 0.32, min: 191950, max: 243725 },
    { rate: 0.35, min: 243725, max: 365600 },
    { rate: 0.37, min: 365600, max: Infinity },
  ],
  head_of_household: [
    { rate: 0.10, min: 0, max: 16550 },
    { rate: 0.12, min: 16550, max: 63100 },
    { rate: 0.22, min: 63100, max: 100500 },
    { rate: 0.24, min: 100500, max: 191950 },
    { rate: 0.32, min: 191950, max: 243700 },
    { rate: 0.35, min: 243700, max: 609350 },
    { rate: 0.37, min: 609350, max: Infinity },
  ],
};

const STANDARD_DEDUCTION: Record<string, number> = {
  single: 14600,
  married_joint: 29200,
  married_separate: 14600,
  head_of_household: 21900,
};

export default function TaxCalculator() {
  const [revenue, setRevenue] = useState('$150,000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [isCalculating, setIsCalculating] = useState(false);
  const [savings, setSavings] = useState(12450);
  const [taxLiability, setTaxLiability] = useState(26800);

  const calculateResults = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    const revNum = parseInt(revenue.replace(/[^0-9]/g, '')) || 0;
    
    // Tax Calculation Logic
    const deduction = STANDARD_DEDUCTION[filingStatus] || 14600;
    const taxableIncome = Math.max(0, revNum - deduction);
    const brackets = TAX_BRACKETS_2024[filingStatus] || TAX_BRACKETS_2024.single;

    let totalTax = 0;
    for (const bracket of brackets) {
      if (taxableIncome <= bracket.min) break;
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      totalTax += taxableInBracket * bracket.rate;
    }
    
    // Efficiency Factor (Potential Savings) - typically 15-30% of liability with advanced strategies
    const efficiencyFactor = 0.24; 
    const potentialSavings = Math.floor(totalTax * efficiencyFactor);
    
    setTaxLiability(Math.floor(totalTax));
    setSavings(potentialSavings);
    
    // Save as a lead (passive collection)
    try {
      await submitLead({
        name: 'Tax & Savings Estimate',
        email: 'passive@visitor.com',
        phone: '000-000-0000',
        service: 'Home Tax Calculator',
        message: `Visitor calculated tax for ${revenue} (${filingStatus}). Estimated Tax: $${totalTax.toLocaleString()}. Potential Savings: $${potentialSavings.toLocaleString()}.`,
        source: 'home-page-calculator',
        revenue,
        jurisdiction: filingStatus,
      });
    } catch (err) {
      // Silent error
    }

    setTimeout(() => setIsCalculating(false), 800);
  };

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val === '') {
      setRevenue('');
      return;
    }
    setRevenue('$' + new Intl.NumberFormat('en-US').format(parseInt(val)));
  };

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-white p-6 sm:p-12 lg:p-16">
        <h2 className="text-[#0047AB] text-2xl sm:text-3xl font-black mb-4">Estimate Your <span className="text-[#00C2CB]">US Tax</span> & Efficiency</h2>
        <p className="text-[#45474c] mb-10 leading-relaxed text-sm sm:text-base">Input your annual revenue and filing status to see your estimated federal tax and potential savings through our Integra-Optima™ framework.</p>
        <form onSubmit={calculateResults} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#45474c] mb-2">Annual Gross Income</label>
            <input 
              className="w-full bg-[#f2f4f7] border-none rounded-lg p-4 focus:ring-1 focus:ring-[#00C2CB] transition-all text-[#191c1e] font-semibold" 
              placeholder="$150,000" 
              type="text" 
              value={revenue}
              onChange={handleRevenueChange}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#45474c] mb-2">Filing Status</label>
            <select 
              className="w-full bg-[#f2f4f7] border-none rounded-lg p-4 focus:ring-1 focus:ring-[#00C2CB] transition-all text-[#191c1e] font-semibold cursor-pointer"
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
            >
              {FILING_STATUSES.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
          <button 
            disabled={isCalculating}
            className="w-full bg-[#00C2CB] text-[#003580] py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-[#33ced5] transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 flex items-center justify-center gap-2 shadow-lg shadow-[#00C2CB]/20"
          >
            {isCalculating ? (
              <>
                Analyzing...
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              'Calculate My Estimate'
            )}
          </button>
        </form>
      </div>
      <div className="bg-[#003580] p-6 sm:p-12 lg:p-16 flex flex-col justify-center border-l border-white/5 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C2CB]/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
        
        <div className="space-y-10 relative z-10">
          <div>
            <div className="text-[#d7e3fc] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Estimated Tax Liability</div>
            <div className="text-white text-3xl sm:text-5xl font-black leading-none mb-2">
              {isCalculating ? 'Calculating...' : `$${taxLiability.toLocaleString()}.00*`}
            </div>
            <div className="h-1 w-12 bg-[#00C2CB]/30 rounded-full"></div>
          </div>

          <div>
            <div className="text-[#00C2CB] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">Projected Savings Efficiency</div>
            <div className="text-[#00C2CB] text-4xl sm:text-6xl font-black leading-none mb-4">
              {isCalculating ? '----' : `$${savings.toLocaleString()}.00*`}
            </div>
            <p className="text-white/50 text-xs italic max-w-sm leading-relaxed">
              *Based on 2024 IRS tax brackets and Integra-Optima™ optimization benchmarks. Actual results depend on personal deductions and credits.
            </p>
          </div>

          <div className="pt-6 space-y-4">
            <Link 
              href="/tax-calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-[#003580] px-6 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#d7e3fc] transition-all group"
            >
              Advanced Tax Calculation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button className="flex items-center gap-4 group cursor-pointer w-fit opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00C2CB]/20 transition-colors">
                <FileDown className="text-[#00C2CB] w-4 h-4" />
              </div>
              <span className="text-white/80 text-xs font-semibold group-hover:text-white transition-colors">Download Detailed Strategy PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
