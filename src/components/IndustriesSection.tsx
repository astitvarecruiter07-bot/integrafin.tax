"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, Hammer, HeartPulse, Laptop, ShoppingCart, Factory, Scale, Heart, Utensils, Leaf, Plane, GraduationCap, Sprout, Film, Users, ArrowRight 
} from "lucide-react";

export const industries = [
  {
    title: "Real Estate",
    desc: "Complex property portfolios require specialized tax structuring, 1031 exchanges, and REIT advisory.",
    icon: <Building2 className="w-10 h-10 text-[#0047AB]" />,
    category: "Real Estate",
    featured: true
  },
  {
    title: "Construction",
    desc: "Percentage-of-completion accounting, joint venture structuring, and overhead optimization for heavy civil.",
    icon: <Hammer className="w-10 h-10 text-[#0047AB]" />,
    category: "Construction",
    featured: true
  },
  {
    title: "Healthcare",
    desc: "Revenue cycle management and compliance for private practices, ambulatory centers, and hospitals.",
    icon: <HeartPulse className="w-10 h-10 text-[#0047AB]" />,
    category: "Healthcare",
    featured: true
  },
  {
    title: "Technology",
    desc: "R&D tax credits, SaaS revenue recognition (ASC 606), and equity compensation scaling strategies.",
    icon: <Laptop className="w-10 h-10 text-[#0047AB]" />,
    category: "Technology",
    featured: true
  },
  {
    title: "E-commerce",
    desc: "Multi-state nexus compliance, inventory management auditing, and global marketplace tax strategy.",
    icon: <ShoppingCart className="w-10 h-10 text-[#0047AB]" />,
    category: "Retail & E-comm",
    featured: true
  },
  {
    title: "Manufacturing",
    desc: "Cost accounting, supply chain tax optimization, and capital equipment depreciation strategies.",
    icon: <Factory className="w-10 h-10 text-[#0047AB]" />,
    category: "Manufacturing",
    featured: true
  },
  {
    title: "Legal Services",
    desc: "Partner compensation structures and IOLTA compliance.",
    icon: <Scale className="w-6 h-6 text-[#0047AB]" />,
    category: "Legal Services",
    featured: false
  },
  {
    title: "Non-Profits",
    desc: "Form 990 preparation and fund accounting excellence.",
    icon: <Heart className="w-6 h-6 text-[#0047AB]" />,
    category: "Non-Profit",
    featured: false
  },
  {
    title: "Hospitality",
    desc: "Tip reporting and high-volume cash flow modeling.",
    icon: <Utensils className="w-6 h-6 text-[#0047AB]" />,
    category: "Hospitality",
    featured: false
  },
  {
    title: "Energy & GreenTech",
    desc: "Tax credits for sustainable initiatives and depletion allowances.",
    icon: <Leaf className="w-6 h-6 text-[#0047AB]" />,
    category: "Energy & GreenTech",
    featured: false
  },
  {
    title: "Logistics",
    desc: "Global trade compliance and fleet asset management.",
    icon: <Plane className="w-6 h-6 text-[#0047AB]" />,
    category: "Logistics",
    featured: false
  },
  {
    title: "Education",
    desc: "Endowment management and institutional reporting.",
    icon: <GraduationCap className="w-6 h-6 text-[#0047AB]" />,
    category: "Education",
    featured: false
  },
  {
    title: "Agribusiness",
    desc: "Drought relief credits and complex land valuation.",
    icon: <Sprout className="w-6 h-6 text-[#0047AB]" />,
    category: "Agribusiness",
    featured: false
  },
  {
    title: "Media & Ent.",
    desc: "Royalty audits and production tax incentives.",
    icon: <Film className="w-6 h-6 text-[#0047AB]" />,
    category: "Media & Ent.",
    featured: false
  },
  {
    title: "Family Office",
    desc: "Generational wealth transfer and private philanthropy.",
    icon: <Users className="w-6 h-6 text-[#0047AB]" />,
    category: "Family Office",
    featured: false
  }
];

export const categories = [
  "All Sectors", "Real Estate", "Construction", "Healthcare", "Technology", "Retail & E-comm", "Manufacturing", "Legal Services", "Non-Profit"
];

export default function IndustriesSection() {
  const [activeCategory, setActiveCategory] = useState("All Sectors");

  const filteredIndustries = activeCategory === "All Sectors" 
    ? industries 
    : industries.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-slate-50 text-left" id="industries">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12 space-y-2">
          <span className="text-[#00C2CB] text-xs font-black uppercase tracking-widest">Global Expertise</span>
          <h2 className="text-[#0047AB] text-4xl md:text-5xl font-black tracking-tight">Industries We Serve</h2>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md shadow-sm border-y border-slate-100 mb-12 rounded-xl overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
            <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar whitespace-nowrap text-[10px] font-bold uppercase tracking-widest w-full">
              {categories.map((cat, i) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-colors duration-300 pb-1 border-b-2 ${
                    activeCategory === cat 
                      ? "text-[#00C2CB] border-[#00C2CB]" 
                      : "text-slate-500 hover:text-[#0047AB] border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIndustries.map((item, i) => (
            item.featured ? (
              // Featured Card style
              <div 
                key={item.title} 
                className="group bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 border border-slate-100 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00C2CB]/10 to-transparent rounded-bl-[100px] transition-all group-hover:scale-125"></div>
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#0047AB]/5 text-[#0047AB] group-hover:bg-[#0047AB] group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0047AB]">{item.title}</h3>
                <p className="text-slate-600 font-normal text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>
                <Link href="#" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-[#00C2CB] group-hover:gap-4 gap-2 transition-all mt-auto group/link">
                  View Blueprint <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ) : (
              // Simplified Card style
              <div 
                key={item.title} 
                className="p-8 bg-white rounded-xl border border-slate-100 hover:border-[#00C2CB]/30 hover:shadow-md transition-all duration-500 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#00C2CB]/10 flex items-center justify-center text-[#00C2CB] group-hover:bg-[#00C2CB] group-hover:text-[#003580] transition-colors duration-300 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#0047AB] mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
