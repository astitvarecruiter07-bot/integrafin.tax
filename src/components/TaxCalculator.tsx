'use client';

import { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import { submitLead } from '@/app/actions/leads';

export default function TaxCalculator() {
  const [revenue, setRevenue] = useState('$5,000,000');
  const [jurisdiction, setJurisdiction] = useState('North America');
  const [isCalculating, setIsCalculating] = useState(false);
  const [savings, setSavings] = useState(142500);

  const calculateSavings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate calculation logic
    const revNum = parseInt(revenue.replace(/[^0-9]/g, '')) || 0;
    const factor = jurisdiction === 'North America' ? 0.0285 : 0.0315;
    const result = Math.floor(revNum * factor);
    
    setSavings(result);
    
    // Save as a lead (passive collection)
    try {
      await submitLead({
        name: 'Calculated Potential Savings',
        email: 'passive@visitor.com', // Placeholder if not provided
        phone: '000-000-0000',
        service: 'Tax Calculator',
        message: `Visitor calculated savings for ${revenue} in ${jurisdiction}. Potential savings: $${result.toLocaleString()}.`,
        source: 'home-page-calculator',
        revenue,
        jurisdiction,
      });
    } catch (err) {
      // Silent error for passive collection
    }

    setTimeout(() => setIsCalculating(false), 800);
  };

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-white p-6 sm:p-12 lg:p-16">
        <h2 className="text-[#0047AB] text-2xl sm:text-3xl font-black mb-4">Estimate Your <span className="text-[#00C2CB]">Tax Efficiency</span></h2>
        <p className="text-[#45474c] mb-10 leading-relaxed">Input your annual revenue to see potential savings through our Integra-Optima™ framework.</p>
        <form onSubmit={calculateSavings} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#45474c] mb-2">Annual Gross Revenue</label>
            <input 
              className="w-full bg-[#f2f4f7] border-none rounded-lg p-4 focus:ring-1 focus:ring-[#00C2CB] transition-all" 
              placeholder="$5,000,000" 
              type="text" 
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#45474c] mb-2">Current Tax Jurisdiction</label>
            <select 
              className="w-full bg-[#f2f4f7] border-none rounded-lg p-4 focus:ring-1 focus:ring-[#00C2CB] transition-all"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
            >
              <option value="North America">North America</option>
              <option value="European Union">European Union</option>
              <option value="APAC">APAC</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button 
            disabled={isCalculating}
            className="w-full bg-[#00C2CB] text-[#003580] py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-[#33ced5] transition-colors mt-4 flex items-center justify-center gap-2"
          >
            {isCalculating ? (
              <>
                Calculating...
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              'Calculate Potential Savings'
            )}
          </button>
        </form>
      </div>
      <div className="bg-[#003580] p-6 sm:p-12 lg:p-16 flex flex-col justify-center border-l border-white/5">
        <div className="space-y-8">
          <div className="text-[#d7e3fc] text-xs font-bold uppercase tracking-[0.3em]">Projected Advantage</div>
          <div className="text-[#00C2CB] text-4xl sm:text-6xl font-black leading-none">
            {isCalculating ? '----' : `$${savings.toLocaleString()}.00*`}
          </div>
          <p className="text-white/60 text-sm italic max-w-sm leading-relaxed">
            *This estimate is based on average performance metrics for firms in your bracket. Actual results vary by industry and current structure.
          </p>
          <div className="pt-8 flex items-center gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00C2CB]/20 transition-colors">
              <FileDown className="text-[#00C2CB]" />
            </div>
            <span className="text-white font-semibold group-hover:text-[#00C2CB] transition-colors">Download Detailed Savings Report</span>
          </div>
        </div>
      </div>
    </div>
  );
}
