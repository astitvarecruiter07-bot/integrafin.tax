import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, Hammer, Factory, Truck, Utensils, Heart, Landmark, 
  Stethoscope, HeartPulse, Scale, Briefcase, Laptop, Users, ShoppingCart, 
  ChevronRight, Box
} from "lucide-react";

export const metadata: Metadata = {
  title: 'Industries We Serve | IntegraFin Tax & Accounting Expert Services',
  description: 'IntegraFin provides tailored tax, accounting, and financial solutions for real estate, construction, healthcare, law firms, technology, and more. Expert compliance and strategies for your business.',
  alternates: { canonical: 'https://integrafin.tax/industries' },
  openGraph: {
    title: 'Industries We Serve | IntegraFin Tax & Accounting Expert Services',
    url: 'https://integrafin.tax/industries',
  },
};

const industries = [
  {
    title: "Real Estate",
    description: "Providing tax planning, bookkeeping, and financial advisory for real estate investors, property managers, and developers to maximize deductions and ensure compliance.",
    icon: Building2
  },
  {
    title: "Construction",
    description: "Assisting construction firms with project cost tracking, payroll management, and tax strategies to improve profitability and cash flow.",
    icon: Hammer
  },
  {
    title: "Manufacturing",
    description: "Offering accounting, tax compliance, and inventory management solutions to streamline operations and optimize financial performance.",
    icon: Factory
  },
  {
    title: "Wholesale & Distribution",
    description: "Helping businesses manage supply chain finances, cash flow forecasting, and tax-efficient inventory control.",
    icon: Box
  },
  {
    title: "Transportation",
    description: "Supporting trucking companies, logistics firms, and freight businesses with tax planning, regulatory compliance, and fuel tax credits.",
    icon: Truck
  },
  {
    title: "Hospitality",
    description: "Assisting hotels, restaurants, and event businesses with payroll, expense tracking, and tax-saving strategies for profitability.",
    icon: Utensils
  },
  {
    title: "Nonprofit Organizations",
    description: "Ensuring compliance with 501(c)(3) regulations, donor tracking, and financial reporting for tax-exempt entities.",
    icon: Heart
  },
  {
    title: "Financial Services",
    description: "Providing accounting, tax, and compliance support for financial advisors, investment firms, and wealth management professionals.",
    icon: Landmark
  },
  {
    title: "Medical & Dental",
    description: "Helping healthcare professionals and private practices with tax optimization, payroll, and revenue cycle management.",
    icon: Stethoscope
  },
  {
    title: "Healthcare",
    description: "Offering financial consulting, bookkeeping, and compliance assistance to hospitals, clinics, and healthcare service providers.",
    icon: HeartPulse
  },
  {
    title: "Law Firms & Legal Services",
    description: "Managing trust accounting, financial reporting, and tax planning for attorneys and legal firms.",
    icon: Scale
  },
  {
    title: "Professional Services",
    description: "Supporting consultants, freelancers, and service providers with tax strategies, bookkeeping, and financial planning.",
    icon: Briefcase
  },
  {
    title: "Technology & Consulting",
    description: "Assisting tech startups and consulting firms with business formation, tax credits, and financial advisory.",
    icon: Laptop
  },
  {
    title: "Privately Held & Family-Owned Businesses",
    description: "Providing strategic tax planning and succession planning for privately held and family-run businesses.",
    icon: Users
  },
  {
    title: "Entrepreneurial & Small Business Retail",
    description: "Helping small retailers with inventory management, tax compliance, and cash flow optimization.",
    icon: ShoppingCart
  }
];

export default function IndustriesPage() {
  return (
    <main className="pt-20 bg-slate-50 selection:bg-[#0092df] selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center overflow-hidden bg-[#003580]">
        <div className="absolute inset-0 opacity-30">
          <Image 
            className="w-full h-full object-cover" 
            alt="financial cityscape background" 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
            fill
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#003580] via-[#003580]/90 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full py-20">
          <div className="max-w-3xl space-y-8 animate-fade-in-up">
            <span className="inline-block bg-[#00C2CB]/20 text-[#00C2CB] border border-[#00C2CB]/30 px-4 py-1 text-[10px] font-black tracking-[0.3em] uppercase rounded-full">
              Industry Specific Solutions
            </span>
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.9]">
              Industries <br className="hidden sm:block" /> We Serve
            </h1>
            <p className="text-[#D7E3FC] text-lg sm:text-xl font-medium leading-relaxed max-w-2xl">
              Tailored tax, accounting, and financial solutions designed for sustainable growth across diverse sectors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact" className="bg-[#00C2CB] text-[#003580] px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-sm shadow-xl shadow-[#00C2CB]/20 hover:scale-105 transition-all text-center">
                Contact Our Experts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="flex items-center gap-3">
                <span className="w-12 h-1.5 bg-[#0092df] rounded-full"></span>
                <span className="text-[#0092df] text-sm font-black uppercase tracking-widest">Expertise Across Sectors</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#003580] tracking-tight">Comprehensive Support for Your Business</h2>
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  We cater to a diverse range of industries, providing tailored tax, accounting, and financial solutions to meet the unique needs of businesses across various sectors. Whether you&apos;re a small startup, a family-owned business, or a large enterprise, our expert team ensures compliance, maximizes tax savings, and streamlines financial management for sustainable growth.
                </p>
                <p>
                  From real estate, construction, and manufacturing to healthcare, law firms, and technology, we help businesses navigate complex tax regulations, optimize cash flow, and make informed financial decisions. Our industry-specific expertise allows us to provide customized strategies that drive efficiency, minimize liabilities, and enhance profitability, ensuring long-term success for your business.
                </p>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                <Image 
                  className="w-full h-full object-cover grayscale brightness-110" 
                  alt="Modern business office highlighting professionalism" 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-[#003580]/10 mix-blend-multiply"></div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-[#00C2CB] p-8 rounded-2xl shadow-2xl hidden sm:block">
                <div className="text-white font-black text-4xl mb-1">15+</div>
                <div className="text-white/80 font-bold text-xs uppercase tracking-widest leading-none">Specialized Sectors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-[#003580] tracking-tight">Our Specialized Sectors</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">Customized financial strategies tailored to your industry requirements.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div 
                key={index} 
                className="group bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[#0092df]/10 transition-all duration-500 hover:-translate-y-2 flex flex-col items-start text-left"
              >
                <div className="w-16 h-16 bg-[#0092df]/5 group-hover:bg-[#0092df] rounded-2xl flex items-center justify-center mb-8 text-[#0092df] group-hover:text-white transition-all duration-500">
                  <industry.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-[#003580] mb-5 tracking-tight group-hover:text-[#0092df] transition-colors">{industry.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium mb-6">
                  {industry.description}
                </p>
                <Link href="/contact" className="mt-auto inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0092df] hover:gap-3 transition-all">
                  Get Started <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-[#003580] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#00C2CB]/5 skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Ready to Let Us Handle Your Finances?</h2>
          <p className="text-xl text-[#D7E3FC] font-medium max-w-2xl mx-auto">
            Get in touch today to discover how we can benefit your individual or business tax situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact" className="bg-[#00C2CB] text-[#003580] px-12 py-5 rounded-xl font-black tracking-widest uppercase text-sm shadow-xl hover:scale-105 transition-all">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
