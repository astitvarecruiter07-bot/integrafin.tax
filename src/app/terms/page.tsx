import type { Metadata } from "next";
import Link from "next/link";
import { Scale, FileText, ShieldAlert, BadgeCheck, Gavel, Globe, RefreshCw, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: 'Terms & Conditions | IntegraFin Tax Expert Services',
  description: 'Read the Terms & Conditions for IntegraFin Tax Expert Services. Learn about our service terms, user responsibilities, and legal agreements.',
  alternates: { canonical: 'https://integrafin.tax/terms' },
};

const sections = [
  {
    icon: Scale,
    title: "1. Acceptance of Terms",
    content: (
      <p className="leading-relaxed">
        By accessing and using the website{" "}
        <Link href="/" className="text-[#0092df] hover:text-[#003580] hover:underline transition-colors font-semibold">integrafin.tax</Link>
        {" "}(the &ldquo;Site&rdquo;) and any services provided by IntegraFin (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you agree to be bound by these Terms and Conditions (&ldquo;Terms&rdquo;). If you do not agree to all of these Terms, you are prohibited from using the Site and our services.
      </p>
    ),
  },
  {
    icon: FileText,
    title: "2. Services Offered",
    content: (
      <p className="leading-relaxed">
        IntegraFin provides professional tax preparation, bookkeeping, payroll, and business consulting services. The information provided on our Site is for general informational purposes only and does not style itself as professional financial, legal, or tax advice until a formal engagement letter is signed between you and IntegraFin.
      </p>
    ),
  },
  {
    icon: BadgeCheck,
    title: "3. User Responsibilities",
    content: (
      <>
        <p className="leading-relaxed">When using our Site and Services, you agree to:</p>
        <ul className="mt-4 space-y-2">
          {[
            "Provide accurate, current, and complete information as may be prompted by any forms on the Site.",
            "Maintain the security of your account or data transmissions if applicable.",
            "Not use the Site for any illegal or unauthorized purpose or engage in any activity that violates applicable laws.",
            "Not attempt to gain unauthorized access to any portion of the Site or our servers.",
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
    icon: ShieldAlert,
    title: "4. Intellectual Property",
    content: (
      <p className="leading-relaxed">
        All content on this Site, including text, graphics, logos, icons, images, data compilations, and software, is the property of IntegraFin or its content suppliers and is protected by United States and international copyright laws. You may not reproduce, distribute, or create derivative works from this content without our express written permission.
      </p>
    ),
  },
  {
    icon: Gavel,
    title: "5. Limitation of Liability",
    content: (
      <p className="leading-relaxed">
        In no event shall IntegraFin, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Site; (ii) any conduct or content of any third party on the Site; (iii) any content obtained from the Site; and (iv) unauthorized access, use, or alteration of your transmissions or content.
      </p>
    ),
  },
  {
    icon: Globe,
    title: "6. Governing Law",
    content: (
      <p className="leading-relaxed">
        These Terms shall be governed and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions. Any dispute arising from these terms shall be resolved in the courts of Katy, Texas or Harris County, Texas.
      </p>
    ),
  },
  {
    icon: RefreshCw,
    title: "7. Changes to Terms",
    content: (
      <p className="leading-relaxed">
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
      </p>
    ),
  },
  {
    icon: FileText,
    title: "8. Contact Us",
    content: (
      <>
        <p className="leading-relaxed">If you have any questions about these Terms, please contact us at:</p>
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

export default function TermsPage() {
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
            <span className="text-[#00C2CB] text-[10px] font-black tracking-[0.3em] uppercase">Legal &amp; Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-4 leading-tight">
            Terms &amp; Conditions
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
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tight">Questions About Our Terms?</h2>
          <p className="text-[#D7E3FC] text-sm sm:text-lg mb-8 max-w-xl mx-auto font-medium leading-relaxed">
            Our team is happy to clarify any of our terms of service or answer questions about your engagement with IntegraFin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#00C2CB] hover:bg-[#00cedb] text-[#003580] px-8 py-4 rounded-xl font-black tracking-widest uppercase text-xs transition-all duration-300 shadow-lg hover:-translate-y-0.5"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-black tracking-widest uppercase text-xs hover:bg-white/5 transition-all duration-300"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
