import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: 'Privacy Policy | IntegraFin Tax Expert Services',
  description: 'Read the Privacy Policy for IntegraFin Tax Expert Services. Learn how we collect, use, and protect your personal and financial information.',
  alternates: { canonical: 'https://integrafin.tax/privacy' },
};

const sections = [
  {
    icon: ShieldCheck,
    title: "1. Introduction",
    content: (
      <>
        <p className="leading-relaxed">
          IntegraFin (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{" "}
          <Link href="/" className="text-[#0092df] hover:text-[#003580] hover:underline transition-colors font-semibold">integrafin.tax</Link>{" "}
          and use our tax, accounting, and consulting services.
        </p>
        <p className="leading-relaxed mt-3">
          Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
        </p>
      </>
    ),
  },
  {
    icon: Lock,
    title: "2. Information We Collect",
    content: (
      <>
        <p className="leading-relaxed">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
        <ul className="mt-4 space-y-3">
          {[
            { label: "Personal Data", desc: "Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you fill out contact forms, request a callback, or subscribe to our newsletter." },
            { label: "Financial Data", desc: "Financial information, such as data related to your taxes, revenue, or business structure, provided voluntarily during consultations or calculations on our Site." },
            { label: "Derivative Data", desc: "Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site." },
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 w-2 h-2 rounded-full bg-[#0092df] flex-shrink-0" />
              <span><strong className="text-[#003580]">{item.label}:</strong> {item.desc}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: Eye,
    title: "3. How We Use Your Information",
    content: (
      <>
        <p className="leading-relaxed">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
        <ul className="mt-4 space-y-2">
          {[
            "Provide, operate, and maintain or improve our services and site.",
            "Process your requests, such as callback schedules or consultation bookings.",
            "Understand and analyze how you use our Site to improve performance.",
            "Develop new products, services, features, and functionality.",
            "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Site, and for marketing and promotional purposes.",
            "Send you emails or newsletters if you have subscribed.",
            "Find and prevent fraud.",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 w-2 h-2 rounded-full bg-[#00C2CB] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: FileText,
    title: "4. Disclosure of Your Information",
    content: (
      <>
        <p className="leading-relaxed">We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide you with advance notice, except as described below:</p>
        <ul className="mt-4 space-y-3">
          {[
            { label: "By Law or to Protect Rights", desc: "If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others." },
            { label: "Third-Party Service Providers", desc: "We may share your information with third parties that perform services for us or on our behalf, such as data analysis, email delivery, hosting services, and customer service." },
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 w-2 h-2 rounded-full bg-[#0092df] flex-shrink-0" />
              <span><strong className="text-[#003580]">{item.label}:</strong> {item.desc}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "5. Data Security",
    content: (
      <p className="leading-relaxed">
        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
      </p>
    ),
  },
  {
    icon: FileText,
    title: "6. Your Rights",
    content: (
      <>
        <p className="leading-relaxed">Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul className="mt-4 space-y-2">
          {[
            "The right to access – You have the right to request copies of your personal data.",
            "The right to rectification – You have the right to request that we correct any information you believe is inaccurate.",
            "The right to erasure – You have the right to request that we erase your personal data, under certain conditions.",
            "The right to restrict processing – You have the right to request that we restrict the processing of your personal data.",
          ].map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 w-2 h-2 rounded-full bg-[#00C2CB] flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: FileText,
    title: "7. Contact Us",
    content: (
      <>
        <p className="leading-relaxed">If you have questions or comments about this Privacy Policy, please contact us at:</p>
        <div className="mt-4 bg-[#003580]/5 p-6 rounded-xl border border-[#003580]/10 space-y-1.5 text-sm">
          <p className="font-black text-[#003580] text-base">IntegraFin Tax &amp; Accounting</p>
          <p className="text-slate-600">2039 N Mason Rd, Suite 604</p>
          <p className="text-slate-600">Katy, TX 77449</p>
          <p className="text-slate-600">Email: <a href="mailto:contact@integrafin.tax" className="text-[#0092df] hover:text-[#003580] hover:underline transition-colors font-semibold">contact@integrafin.tax</a></p>
          <p className="text-slate-600">Phone: <a href="tel:+18326471819" className="text-[#0092df] hover:text-[#003580] hover:underline transition-colors font-semibold">(832) 647-1819</a></p>
        </div>
      </>
    ),
  },
];

export default function PrivacyPage() {
  const lastUpdated = "March 24, 2026";

  return (
    <main className="bg-slate-50 text-left">
      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-28 sm:pt-40 pb-16 sm:pb-24 bg-[#003580] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0092df 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0092df]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00C2CB]/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00C2CB]/10 border border-[#00C2CB]/30 mb-6">
            <span className="text-[#00C2CB] text-[10px] font-black tracking-[0.3em] uppercase">Legal &amp; Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-[#D7E3FC] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ========== TABLE OF CONTENTS ========== */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-8">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#0092df] mb-4">On This Page</h2>
          <div className="flex flex-wrap gap-2">
            {sections.map((s, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-[#003580] hover:text-white hover:border-[#003580] transition-all duration-200"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTENT SECTION ========== */}
      <section className="py-12 sm:py-20 max-w-4xl mx-auto px-6 sm:px-8">
        <div className="space-y-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div
                key={i}
                id={`section-${i}`}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-[#003580]/10 transition-all duration-300 overflow-hidden"
              >
                {/* Section Header */}
                <div className="flex items-center gap-4 px-6 sm:px-8 py-5 border-b border-slate-50 bg-slate-50/50">
                  <div className="w-10 h-10 rounded-xl bg-[#003580]/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#0092df]" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-[#003580] tracking-tight">{section.title}</h2>
                </div>
                {/* Section Body */}
                <div className="px-6 sm:px-8 py-6 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="py-12 sm:py-20 bg-[#003580] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0092df 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0092df]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 text-center">
          <span className="text-[#0092df] text-xs font-black uppercase tracking-[0.2em] mb-4 block">Have Questions?</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tight">Need Clarification on Our Privacy Practices?</h2>
          <p className="text-[#D7E3FC] text-sm sm:text-lg mb-8 max-w-xl mx-auto font-medium leading-relaxed">
            Our team is available to address any concerns you may have about how we handle your data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#00C2CB] hover:bg-[#00cedb] text-[#003580] px-8 py-4 rounded-xl font-black tracking-widest uppercase text-xs transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-black tracking-widest uppercase text-xs hover:bg-white/5 transition-all duration-300"
            >
              View Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
