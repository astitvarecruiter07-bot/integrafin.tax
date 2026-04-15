import Image from "next/image";
import Link from "next/link";
import { Check, CheckCircle2, ChevronRight } from "lucide-react";
import HomeCallbackForm from "@/components/HomeCallbackForm";
import HeroCarousel from "@/components/HeroCarousel";

export const metadata = {
  title: 'Tax Accountant Katy TX | IntegraFin Tax Expert Services',
  description: 'IntegraFin provides tax expert services in Katy, TX offering tax preparation, bookkeeping, payroll, and IRS resolution. Schedule your free consultation today. Call (832) 647-1819.',
  alternates: { canonical: 'https://integrafin.tax/' },
};

export default function Home() {
  return (
    <div className="bg-slate-50 selection:bg-[#0092df] selection:text-white relative">
      {/* Navbar space is handled by layout.tsx */}
      
      {/* Hero Section */}
      <HeroCarousel />

      {/* Core Services We Offer */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto -mt-16 z-30 relative">
        <div className="text-center mb-16">
           <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-2 block">Our Expertise</span>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003580] tracking-tight">Core Services We Offer</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#0092df]/10 border border-slate-100 hover:border-[#0092df]/20 transition-all duration-500 flex flex-col text-left hover:-translate-y-2 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#0092df]/5 rounded-bl-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="w-20 h-20 bg-[#0092df]/10 group-hover:bg-[#0092df] rounded-2xl flex items-center justify-center mb-8 text-[#0092df] group-hover:text-white transition-colors duration-500 relative z-10">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><path d="M14 2v6h6"/><path d="m3 12.5 3 3 6-6"/></svg>
             </div>
             <h3 className="text-2xl font-black text-[#003580] mb-5 leading-snug">Worry-Free Tax and Accounting Services</h3>
             <p className="text-slate-600 mb-8 text-sm leading-relaxed flex-grow">
               Managing taxes and accounting can be stressful, but we make it easy. Our experts handle everything from bookkeeping to tax preparation, ensuring accuracy and compliance. Focus on growing your business while we take care of your financials.
             </p>
             <ul className="space-y-4 relative z-10">
               <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0092df]/10 flex items-center justify-center mt-0.5">
                   <Check className="w-3.5 h-3.5 text-[#0092df]" />
                 </div>
                 <span>Expert tax preparation and accounting services</span>
               </li>
               <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0092df]/10 flex items-center justify-center mt-0.5">
                   <Check className="w-3.5 h-3.5 text-[#0092df]" />
                 </div>
                 <span>Accurate and compliant bookkeeping</span>
               </li>
               <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0092df]/10 flex items-center justify-center mt-0.5">
                   <Check className="w-3.5 h-3.5 text-[#0092df]" />
                 </div>
                 <span>Personalized tax saving strategies</span>
               </li>
             </ul>
          </div>
          
          {/* Card 2 */}
          <div className="group bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#0092df]/10 border border-slate-100 hover:border-[#0092df]/20 transition-all duration-500 flex flex-col text-left hover:-translate-y-2 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#0092df]/5 rounded-bl-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="w-20 h-20 bg-[#0092df]/10 group-hover:bg-[#0092df] rounded-2xl flex items-center justify-center mb-8 text-[#0092df] group-hover:text-white transition-colors duration-500 relative z-10">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/><path d="m15 14-3 3-3-3"/></svg>
             </div>
             <h3 className="text-2xl font-black text-[#003580] mb-5 leading-snug">Get the Highest Refund</h3>
             <p className="text-slate-600 mb-8 text-sm leading-relaxed flex-grow">
               Maximize your tax refund with our expert filing services. We analyze every deduction and credit available to ensure you get the best possible return. Our team stays updated with the latest tax laws to help you save more.
             </p>
             <ul className="space-y-4 relative z-10">
               <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0092df]/10 flex items-center justify-center mt-0.5">
                   <Check className="w-3.5 h-3.5 text-[#0092df]" />
                 </div>
                 <span>Hassle-free online and in-person filing</span>
               </li>
               <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0092df]/10 flex items-center justify-center mt-0.5">
                   <Check className="w-3.5 h-3.5 text-[#0092df]" />
                 </div>
                 <span>Secure document handling and filing</span>
               </li>
               <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0092df]/10 flex items-center justify-center mt-0.5">
                   <Check className="w-3.5 h-3.5 text-[#0092df]" />
                 </div>
                 <span>Year-round support for tax planning</span>
               </li>
             </ul>
          </div>
          
          {/* Card 3 */}
          <div className="group bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-[#0092df]/10 border border-slate-100 hover:border-[#0092df]/20 transition-all duration-500 flex flex-col text-left hover:-translate-y-2 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#0092df]/5 rounded-bl-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
             <div className="w-20 h-20 bg-[#0092df]/10 group-hover:bg-[#0092df] rounded-2xl flex items-center justify-center mb-8 text-[#0092df] group-hover:text-white transition-colors duration-500 relative z-10">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/><path d="m9 14 2 2 4-4"/></svg>
             </div>
             <h3 className="text-2xl font-black text-[#003580] mb-5 leading-snug">Free Tax Filing Estimates</h3>
             <p className="text-slate-600 mb-8 text-sm leading-relaxed flex-grow">
               Know what to expect before you file. We provide free, no-obligation tax filing estimates so you can plan ahead. Get clarity on your potential refund or tax liability without any hidden fees.
             </p>
             <ul className="space-y-4 relative z-10">
               <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0092df]/10 flex items-center justify-center mt-0.5">
                   <Check className="w-3.5 h-3.5 text-[#0092df]" />
                 </div>
                 <span>Maximized deductions and credits for higher refunds</span>
               </li>
               <li className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                 <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0092df]/10 flex items-center justify-center mt-0.5">
                   <Check className="w-3.5 h-3.5 text-[#0092df]" />
                 </div>
                 <span>Free initial tax estimates with no obligation</span>
               </li>
             </ul>
          </div>
        </div>
      </section>

      {/* About Us - Integrafin */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 relative">
           <div className="absolute inset-0 bg-gradient-to-r from-[#0092df]/20 to-transparent rounded-[2rem] transform -rotate-3 scale-105 blur-sm -z-10 transition-transform duration-700 hover:rotate-0"></div>
           <div className="relative h-[450px] w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50">
             <Image src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" alt="About Integrafin" fill className="object-cover transition-transform duration-700 hover:scale-105" />
           </div>
        </div>
        <div className="md:w-1/2 flex flex-col items-start text-left">
           <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-4">Discover Who We Are</span>
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003580] mb-6 tracking-tight">About Us - Integrafin</h2>
           <div className="w-24 h-1.5 bg-gradient-to-r from-[#0092df] to-[#00C2CB] rounded-full mb-8"></div>
           <p className="text-slate-600 mb-10 leading-loose text-base md:text-lg font-medium">
             IntegraFin is a trusted provider of comprehensive tax, accounting, and business advisory services. With a team of experienced Certified Public Accountants (CPAs), Chartered Accountants (CAs), and financial experts, we are committed to delivering high-quality, reliable, and secure financial solutions tailored to businesses and individuals.
           </p>
           <button className="bg-[#003580] hover:bg-[#002050] text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-xl shadow-[#003580]/20 hover:-translate-y-1 group flex items-center gap-3">
             Know More
             <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </section>

      {/* Why Trust Us? */}
      <section className="py-24 px-6 lg:px-8 border-t border-slate-200/60 bg-white">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-4 block">Our Guarantees</span>
               <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003580] mb-6 tracking-tight">Why Trust Us?</h2>
               <p className="text-slate-600 mb-16 max-w-4xl mx-auto leading-relaxed text-lg font-medium">
                 We bring years of combined experience with a commitment to trust, security, and privacy. Our expert team ensures seamless e-filing, reliable guidance, and compliance, making tax and accounting simple, quick, and stress-free.
               </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
               {[
                 "Years of Combined Experience", "Trust", "Security", "Privacy",
                 "Assisted Filing", "Guidance / Advisory", "Simple / Quick", "Reliability, Quality, Integrity",
                 "Deep Knowledge", "Efiling", "Quality", "Compliance"
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

      {/* Our Main Services */}
      <section className="py-24 px-6 lg:px-8 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-20 flex flex-col items-center">
             <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-4">What We Do Best</span>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003580] mb-6 tracking-tight">Our Main Services</h2>
             <div className="w-24 h-1.5 bg-[#0092df] rounded-full mb-6"></div>
             <p className="text-slate-600 text-lg font-medium max-w-2xl">IntegraFin offers a full range of accounting and tax services designed to streamline your financial operations.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Business - Tax & Accounting Services",
                  desc: "Comprehensive accounting and bookkeeping solutions, including software implementation, payroll, financial statements, and tax compliance for businesses of all sizes.",
                  icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#003580] group-hover:text-[#0092df] transition-colors"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><path d="M14 2v6h6"/><rect x="8" y="10" width="8" height="8" rx="1"/></svg>
                },
                {
                  title: "Individual Tax Services",
                  desc: "Expert tax preparation and planning to maximize deductions and ensure compliance with IRS regulations.",
                  icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#003580] group-hover:text-[#0092df] transition-colors"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 11v8"/></svg>
                },
                {
                  title: "Tax Resolution Services",
                  desc: "Assistance with back taxes, IRS audits, penalty abatements, and tax negotiations to resolve outstanding tax issues.",
                  icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#003580] group-hover:text-[#0092df] transition-colors"><path d="m12 14 4-4"/><path d="M3.3 7H6h15l-1.5 13H4.5L3.3 7Z"/><path d="m16 10-4 4"/></svg>
                },
                {
                  title: "Additional Services",
                  desc: "Support for ITIN, SSN, PEIN applications; international compliance (FBAR & FATCA); business certifications, and secure document management.",
                  icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#003580] group-hover:text-[#0092df] transition-colors"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"/><path d="M4.5 8.5V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2h-2"/></svg>
                },
                {
                  title: "New Business & Consultation",
                  desc: "Starting a new business is an exciting yet challenging process that requires careful planning and strategic decision-making.",
                  icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#003580] group-hover:text-[#0092df] transition-colors"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
                },
                {
                  title: "Industries Served",
                  desc: "We cater to various industries, including real estate, construction, manufacturing, healthcare, financial services, legal, retail, and technology, providing tailored tax and accounting solutions.",
                  icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#003580] group-hover:text-[#0092df] transition-colors"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h3.14"/><path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>
                }
              ].map((srv, idx) => (
                <div key={idx} className="group bg-white border border-slate-100 rounded-[2rem] p-8 text-center flex flex-col items-center hover:shadow-[0_20px_50px_-12px_rgba(0,146,223,0.15)] hover:border-[#0092df]/30 transition-all duration-500 hover:-translate-y-2">
                   <div className="w-20 h-20 bg-slate-50 group-hover:bg-[#0092df]/10 rounded-full flex items-center justify-center mb-8 transition-colors duration-500 shadow-sm border border-slate-100 group-hover:border-[#0092df]/20">
                     {srv.icon}
                   </div>
                   <h3 className="text-xl font-black text-[#003580] mb-5 tracking-tight">{srv.title}</h3>
                   <p className="text-slate-600 text-sm mb-8 flex-grow leading-relaxed font-medium">{srv.desc}</p>
                   <Link href="#" className="mt-auto inline-flex items-center justify-center gap-2 text-[#0092df] py-3 px-6 rounded-xl font-bold text-sm bg-slate-50 hover:bg-[#0092df] hover:text-white transition-colors w-full">
                     Read More <ChevronRight className="w-4 h-4" />
                   </Link>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="relative py-32 bg-slate-900 border-b-8 border-[#0092df] text-center flex items-center justify-center min-h-[500px]">
         <div className="absolute inset-0 bg-gradient-to-br from-[#003580]/90 to-slate-900/90 z-10" />
         <Image 
           src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" 
           alt="Testimonial Background" 
           fill 
           className="object-cover object-bottom absolute inset-0 z-0 opacity-40 mix-blend-overlay"
         />
         <div className="relative z-20 max-w-5xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#0092df]/60 mb-8"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h-1c0 0 0 0 0 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>

            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-12 max-w-4xl leading-snug tracking-tight text-shadow-sm">
              &quot;IntegraFin has been instrumental in helping our business stay compliant and financially healthy.&quot;
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 flex items-center justify-center overflow-hidden">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div className="text-left">
                <p className="text-white font-black tracking-widest text-sm uppercase mb-1">JOHN D</p>
                <p className="text-[#0092df] font-bold text-xs">Small Business Owner</p>
              </div>
            </div>
            
            <div className="flex gap-3 justify-center mt-16">
               <div className="w-8 h-1.5 rounded-full bg-[#0092df] cursor-pointer"></div>
               <div className="w-3 h-1.5 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer transition-colors"></div>
               <div className="w-3 h-1.5 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer transition-colors"></div>
            </div>
         </div>
      </section>

      {/* Request a Call Back */}
      <section className="py-24 px-6 lg:px-8 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-slate-50 border-b border-slate-200/50"></div>
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row shadow-2xl shadow-slate-300/60 rounded-[2rem] overflow-hidden bg-white relative z-10 border border-slate-100">
           <div className="lg:w-1/2 p-10 md:p-14 lg:p-16 flex flex-col justify-center bg-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-1 bg-[#0092df] rounded-full inline-block"></span>
                <span className="text-[#0092df] text-sm font-black uppercase tracking-[0.1em]">Get In Touch</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#003580] mb-4 tracking-tight">Request a Call Back</h2>
              <p className="text-slate-600 mb-10 leading-relaxed font-medium">Find an advisor. Our staff can help work out what is right for you.</p>
              
              <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                 <HomeCallbackForm />
              </div>
           </div>
           <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-auto inset-y-0">
              <div className="absolute inset-0 bg-[#003580]/10 z-10 mix-blend-overlay"></div>
              <Image 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" 
                alt="Request Call Back" 
                fill 
                className="object-cover object-center" 
              />
           </div>
        </div>
      </section>
    </div>
  );
}
