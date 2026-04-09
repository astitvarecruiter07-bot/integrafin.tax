import Image from "next/image";
import Link from "next/link";
import { 
  TrendingUp, Wallet, BarChart2, Briefcase, 
  User, Scale, Globe, Lightbulb, Building, Share2, Mail, ArrowRight, FileDown, Check, Phone, Star, ShieldCheck, Award, DollarSign, PlusCircle
} from "lucide-react";
import { homepageFaqSchema } from "@/lib/seo/schema";
import IndustriesSection from "@/components/IndustriesSection";
import TaxCalculator from "@/components/TaxCalculator";
import HomeCallbackForm from "@/components/HomeCallbackForm";


export const metadata = {
  title: 'Tax Accountant Katy TX | IntegraFin Tax Expert Services',
  description: 'IntegraFin provides tax expert services in Katy, TX offering tax preparation, bookkeeping, payroll, and IRS resolution. Schedule your free consultation today. Call (832) 647-1819.',
  alternates: { canonical: 'https://integrafin.tax/' },
  openGraph: {
    title: 'Tax Accountant Katy TX | IntegraFin Tax Expert Services',
    description: 'IntegraFin tax experts in Katy TX. Tax preparation, bookkeeping, IRS help, payroll. Free consultation.',
    url: 'https://integrafin.tax/',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
};

const expertises = [
  "Corporate Tax", "R&D Tax Credits", "International Compliance", 
  "M&A Advisory", "Wealth Management", "Strategic Audit"
];

const whyChoose = [
  {
    icon: <DollarSign className="text-4xl" />,
    title: "Worry-Free Tax & Accounting",
    desc: "Our tax experts handle the complexities of your financial filings so you can focus on scaling your vision without compliance stress."
  },
  {
    icon: <Wallet className="text-4xl" />,
    title: "Maximize Your Refund",
    desc: "Leveraging deep structural knowledge to identify every available credit and deduction to keep more capital in your pockets."
  },
  {
    icon: <BarChart2 className="text-4xl" />,
    title: "Free Filing Estimates",
    desc: "Transparent financial modeling that provides clear projections of your tax liabilities and potential savings before you commit."
  }
];

const services = [
  {
    icon: <Briefcase className="text-3xl text-[#D4A017]" />,
    title: "Business Tax & Accounting",
    desc: "Comprehensive compliance and strategic planning for enterprises of all sizes, ensuring structural integrity."
  },
  {
    icon: <User className="text-3xl text-[#D4A017]" />,
    title: "Individual Tax Services",
    desc: "High-net-worth individual filing and personal wealth optimization strategies tailored to your life goals."
  },
  {
    icon: <Scale className="text-3xl text-[#D4A017]" />,
    title: "Tax Resolution Services",
    desc: "Expert negotiation and defense for complex audit and compliance disputes with regulatory authorities."
  },
  {
    icon: <Globe className="text-3xl text-[#D4A017]" />,
    title: "ITIN, FBAR, FATCA",
    desc: "Specialized international compliance for foreign nationals and global assets requiring precision filings."
  },
  {
    icon: <Lightbulb className="text-3xl text-[#D4A017]" />,
    title: "New Business & Consultation",
    desc: "Entity structuring and financial foundation setup for emerging startups to ensure early capital efficiency."
  },
  {
    icon: <Building className="text-3xl text-[#D4A017]" />,
    title: "Industries Served",
    desc: "Niche expertise across tech, real estate, healthcare, and manufacturing sectors globally."
  }
];

const stats = [
  { val: "1050+", label: "Projects" },
  { val: "217K+", label: "Happy Clients" },
  { val: "100", label: "Advisors" },
  { val: "21", label: "Years Experience" },
  { val: "24/7", label: "Support" }
];

const testimonials = [
  {
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeL8eEhJGLAAhaBXP7DqWIL7Ja0MICPKkI7mtBd2kiYATZ--IhZVS3OaL6qgbXG_2wZSxMqB1d7hFXCxuSdqag0xHvEIWDO_rZ3GaQ28S9SMuFj4yEp-C_mHclJvKaSQMWAXeRhnRswV7siuAp1GUPhL9gLNBHk4RLh_y-CtFa0nGImB3-iE6Q3EmhemdZdMQspB-uEwQzg0QhCnh0DCttgVhnlx7_xV-4rmZ29UhOuSIsEHknGdpysQZrdBOqwmjMMXCzCG92vv4",
    quote: "IntegraFin redefined our international tax structure. They didn't just save us money; they simplified our global operations.",
    role: "CEO, Apex Logistics"
  },
  {
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxCeyFuzC_Tbo6qpvF3gxtYkIvDP9oa_P29pWAGPvWfmiszd7M0jhLA4fYCCRIodHbvSwWvbxkqrYYNiizkE-VILjCSQ9_MssHu1JxXo4c5DjZTQXinRXyjdmcjt0l5W984GwRBKxamMc1JBU7yLmfAzUkE2zJp2Vt-jruiouhKEeko0dZobcZiHaHgFNoaKHHCflny9Ooj74w1HBCyHEl5NKkpN-dNEm2P0Y5com6jzTLAFEuOqxMCdK5xfZ6R3RORY6PXbrRzEY",
    quote: "Their meticulous approach to R&D credits uncovered hundreds of thousands in untapped potential for our tech firm.",
    role: "CTO, Veridical AI"
  },
  {
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrg4yKEzFCDB9NH-BBX7c_YyM3fZL6JBc0Get9fp7-47NkBuAaN5_2HZ9IlH8ze94z0Q6emMXCTKNdLtVGulp-kSu0RrScyc7L72Hu2T1PyLt8jvGJKT9G3-qn2_Huu9rf-XkptEfv85pmeUimK5NConQbB_odJezZhrrDF47AhRtufGDYyXaxQ4Qo0TJA_w7M4XOc8oRYIp0JXPg7XfFj_zMf4_V4p3rAio4nGrWy1F-TxO8kAuZQBi6LpnpVF07S908WauA13Qk",
    quote: "The audit defense was impeccable. Professional, calm, and 100% successful. Truly elite representation.",
    role: "Director, Heritage Holdings"
  },
  {
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj7D8F2w62f6YBbZfV3dquD--NM-8n7d43UuvqVRfs3DjC4-J8ttC0eCoX00Oq8icqheCQ8_zi3WB0C22bMs3v-qk3IS2K2eP_2_RI_iKIp-0rnb7cYGPF1t25kmxlLNTDXaGac6QzyWbv6PtIkTOX7xsBqOdG2a4a2pa9h8rOmsla3I7k5UqM4n5dR99yJNLWGi62sbYq2oJwgZcmTMIUsKZqUPQfcAQxLNSYOi96fxYy2SRFKjIBvSue9uYl6gVu9sGBgev3IQw",
    quote: "I've never worked with an accounting firm that felt like architects. They build financial fortresses.",
    role: "Founder, Nova Real Estate"
  }
];

export default function Home() {
  return (
    <>
      {/* ========== HERO SECTION (Assumes Navbar is handled separately or loads on top) ========== */}
      <header className="pt-24 lg:pt-32 pb-12 sm:pb-20 hero-gradient min-h-[600px] sm:min-h-[700px] lg:min-h-[921px] flex items-center overflow-hidden text-left">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[60%_40%] gap-8 lg:gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-[#003580] text-3xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
              Tax Filing and <br />
              <span className="text-[#0067b3]">Bookkeeping</span> Services
            </h1>
            <p className="text-[#45474c] text-base sm:text-lg max-w-xl leading-relaxed">
              Taxes and accounting can feel overwhelming—but that&apos;s where we come in. We support both individuals and businesses with reliable, stress-free financial services, ensuring everything is handled accurately and on time.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#0067b3] mt-0.5 flex-shrink-0" />
                <span className="text-[#45474c] text-sm sm:text-base font-medium">Individual and business tax filing handled with care</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#0067b3] mt-0.5 flex-shrink-0" />
                <span className="text-[#45474c] text-sm sm:text-base font-medium">Clean, accurate bookkeeping you can trust</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#0067b3] mt-0.5 flex-shrink-0" />
                <span className="text-[#45474c] text-sm sm:text-base font-medium">Smart tax planning to help you save more</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
              <Link href="/contact" className="bg-[#0047AB] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-widest shadow-lg shadow-[#0047AB]/20 hover:scale-105 transition-transform text-center">
                Schedule Consultation
              </Link>
              <Link href="/case-study" className="border border-[#0047AB]/40 text-[#0047AB] px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-[#0047AB]/5 transition-colors text-center">
                View Case Studies
              </Link>
            </div>
            <div className="flex items-center gap-4 sm:gap-8 pt-8 sm:pt-12 border-t border-[#0047AB]/10">
              <div className="flex -space-x-3">
                {testimonials.slice(0, 3).map((t, i) => (
                  <div key={i} className="relative w-12 h-12 rounded-full border-2 border-[#0047AB]/30 overflow-hidden">
                    <Image src={t.avatar} alt={`IntegraFin Client ${i + 1}`} fill className="object-cover" sizes="48px" />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[#003580] font-bold text-sm sm:text-lg leading-tight">Trusted by 500+ Corporations</div>
                <div className="text-[#45474c] text-xs sm:text-sm">Averaging 24% tax liability reduction</div>
              </div>
            </div>
          </div>
            <div className="relative hidden lg:block">
              <div className="absolute -inset-10 bg-[#0067b3]/10 blur-[100px] rounded-full opacity-50"></div>
              <div className="relative z-10">
                <Image
                  src="/A_professional,_wide-angle_202604082301.png"
                  alt="Professional tax filing and bookkeeping illustration"
                  width={700}
                  height={500}
                  className="w-full h-auto rounded-2xl"
                  priority
                />
              </div>
            </div>
        </div>
      </header>

      {/* ========== SERVICES STRIP ========== */}
      <section className="bg-[#f2f4f7] py-8 overflow-hidden">
        <div className="flex items-center space-x-12 px-8 animate-none whitespace-nowrap overflow-x-auto no-scrollbar">
          <span className="text-[#45474c]/50 font-bold uppercase tracking-widest text-xs flex-shrink-0">Sector Expertise:</span>
          {expertises.map((exp, i) => (
            <button key={i} className="group relative px-2 py-2 flex-shrink-0">
              <span className="text-[#191c1e] font-semibold text-sm">{exp}</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00C2CB] group-hover:w-full transition-all duration-300"></div>
            </button>
          ))}
        </div>
      </section>

      {/* ========== TAX CALCULATOR ========== */}
      <section className="py-12 sm:py-24 px-4 sm:px-8 bg-[#003580] relative overflow-hidden text-left">
        <TaxCalculator />
      </section>

      {/* ========== WHY CHOOSE INTEGRAFIN ========== */}
      <section className="py-12 sm:py-24 px-4 sm:px-8 bg-white text-left">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <span className="text-[#00C2CB] text-xs font-black uppercase tracking-widest">The Integra Advantage</span>
            <h2 className="text-[#0047AB] text-2xl sm:text-4xl md:text-5xl font-black tracking-tight">Why Are We The Best Tax Accountant Near You in Katy?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-10">
            {whyChoose.map((item, i) => (
              <div key={i} className="p-6 sm:p-12 bg-white border border-slate-100 rounded-3xl hover:shadow-2xl hover:shadow-[#00C2CB]/10 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2CB]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="mb-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00C2CB]/10 text-[#00C2CB] group-hover:bg-[#00C2CB] group-hover:text-[#003580] transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-[#0047AB]">{item.title}</h3>
                <p className="text-[#45474c] leading-relaxed text-base font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CORE SERVICES GRID ========== */}
      <section className="py-12 sm:py-24 px-4 sm:px-8 bg-[#0047AB] text-left">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <span className="text-[#D4A017] text-xs font-black uppercase tracking-widest">Our Expertise</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">What Corporate & Small Business Tax Expert Services Do We Offer?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="p-6 sm:p-10 border border-white/10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#D4A017]/40 transition-all duration-500 group bg-white/10">
                <div className="w-14 h-14 bg-[#D4A017]/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#D4A017] transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-black mb-4 text-white">{service.title}</h3>
                <p className="leading-relaxed text-sm mb-6 text-white/90">{service.desc}</p>
                <Link href="/services" className="text-[#D4A017] font-bold text-xs uppercase tracking-widest flex items-center gap-2 group/link">
                  Learn More <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INDUSTRIES SERVED SECTION ========== */}
      <IndustriesSection />

      {/* ========== STATS BAR ========== */}
      <section className="bg-[#001D3D] py-10 sm:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="px-2 sm:px-8 sm:border-r sm:border-white/10 sm:last:border-0">
              <div className="text-[#00C2CB] text-2xl sm:text-4xl font-black mb-1 sm:mb-2">{stat.val}</div>
              <div className="text-white/70 text-[10px] uppercase font-bold tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-12 sm:py-24 px-4 sm:px-8 bg-slate-50 overflow-hidden text-left">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[#0047AB] text-2xl sm:text-3xl font-black mb-8 sm:mb-16">What Our Clients Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-5 sm:p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={t.avatar} alt={`IntegraFin Client Testimonial ${i + 1}`} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="flex gap-0.5 text-[#00C2CB]">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                  </div>
                </div>
                <p className="text-[#191c1e] text-sm italic mb-6 leading-relaxed flex-grow">&quot;{t.quote}&quot;</p>
                <div className="font-bold text-xs uppercase tracking-widest text-[#0047AB] mt-auto">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section id="faq" className="py-12 sm:py-24 max-w-4xl mx-auto px-4 sm:px-8 scroll-mt-24 border-b border-slate-100 text-left">
        <div className="text-center mb-16">
          <span className="text-[#00C2CB] text-xs font-black uppercase tracking-widest">Questions</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0047AB] tracking-tight mt-2">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {homepageFaqSchema.mainEntity.map((item: any, index: number) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-8 shadow-sm hover:shadow-lg transition-all group">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="text-base sm:text-xl font-black text-[#0047AB] group-hover:text-[#00C2CB] transition-colors">{item.name}</h3>
                <PlusCircle className="w-5 h-5 text-[#00C2CB] group-hover:scale-110 transition-transform flex-shrink-0" />
              </div>
              <p className="mt-4 text-[#45474c] font-medium leading-relaxed text-sm">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CALLBACK FORM ========== */}
      <section className="py-12 sm:py-24 px-4 sm:px-8 bg-slate-50 text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-white">
          <div className="md:w-1/2 relative min-h-[400px]">
            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj7D8F2w62f6YBbZfV3dquD--NM-8n7d43UuvqVRfs3DjC4-J8ttC0eCoX00Oq8icqheCQ8_zi3WB0C22bMs3v-qk3IS2K2eP_2_RI_iKIp-0rnb7cYGPF1t25kmxlLNTDXaGac6QzyWbv6PtIkTOX7xsBqOdG2a4a2pa9h8rOmsla3I7k5UqM4n5dR99yJNLWGi62sbYq2oJwgZcmTMIUsKZqUPQfcAQxLNSYOi96fxYy2SRFKjIBvSue9uYl6gVu9sGBgev3IQw" alt="IntegraFin Tax Consultant reviewing strategy" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-[#0047AB]/20"></div>
          </div>
          <div className="md:w-1/2 p-6 sm:p-12 lg:p-16">
            <h3 className="text-[#0047AB] text-2xl sm:text-3xl font-black mb-6 sm:mb-8">Request a Free Callback</h3>
            <HomeCallbackForm />
          </div>
        </div>
      </section>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
    </>
  );
}
