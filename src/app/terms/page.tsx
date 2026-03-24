import type { Metadata } from "next";
import Link from "next/link";
import { Scale, FileText, ShieldAlert, BadgeCheck } from "lucide-react";

export const metadata: Metadata = {
  title: 'Terms & Conditions | IntegraFin CPA Services',
  description: 'Read the Terms & Conditions for IntegraFin CPA Services. Learn about our service terms, user responsibilities, and legal agreements.',
  alternates: { canonical: 'https://integrafin.tax/terms' },
};

export default function TermsPage() {
  const lastUpdated = "March 24, 2026";

  return (
    <main className="bg-white text-left">
      {/* ========== HERO SECTION ========== */}
      <section className="relative hero-gradient py-20 lg:py-28 overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00C2CB]/10 border border-[#00C2CB]/30 mb-6">
            <span className="text-[#00C2CB] text-xs font-bold tracking-[0.2em] uppercase">Legal & Agreement</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 leading-[1.1]">
            Terms & Conditions
          </h1>
          <p className="text-lg text-[#d7e3fc] max-w-2xl mx-auto leading-relaxed">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ========== CONTENT SECTION ========== */}
      <section className="py-16 lg:py-24 max-w-4xl mx-auto px-8">
        <div className="prose prose-slate max-w-none text-[#45474c] space-y-8 font-medium">
          
          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-[#00C2CB]" /> 1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing and using the website <Link href="/" className="text-[#00C2CB] hover:underline">integrafin.tax</Link> (the "Site") and any services provided by IntegraFin ("we," "our," or "us"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all of these Terms, you are prohibited from using the Site and our services.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#00C2CB]" /> 2. Services Offered
            </h2>
            <p className="leading-relaxed">
              IntegraFin provides professional tax preparation, bookkeeping, payroll, and business consulting services. The information provided on our Site is for general informational purposes only and does not style itself as professional financial, legal, or tax advice until a formal engagement letter is signed between you and IntegraFin.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4 flex items-center gap-2">
              <BadgeCheck className="w-6 h-6 text-[#00C2CB]" /> 3. User Responsibilities
            </h2>
            <p className="leading-relaxed">
              When using our Site and Services, you agree to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Provide accurate, current, and complete information as may be prompted by any forms on the Site.</li>
              <li>Maintain the security of your account or data transmissions if applicable.</li>
              <li>Not use the Site for any illegal or unauthorized purpose or engage in any activity that violates applicable laws.</li>
              <li>Not attempt to gain unauthorized access to any portion of the Site or our servers.</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-[#00C2CB]" /> 4. Intellectual Property
            </h2>
            <p className="leading-relaxed">
              All content on this Site, including text, graphics, logos, icons, images, data compilations, and software, is the property of IntegraFin or its content suppliers and is protected by United States and international copyright laws. You may not reproduce, distribute, or create derivative works from this content without our express written permission.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4">5. Limitation of Liability</h2>
            <p className="leading-relaxed">
              In no event shall IntegraFin, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Site; (ii) any conduct or content of any third party on the Site; (iii) any content obtained from the Site; and (iv) unauthorized access, use, or alteration of your transmissions or content.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4">6. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law provisions. Any dispute arising from these terms shall be resolved in the courts of Katy, Texas or Harris County, Texas.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4">7. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4">8. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-2 text-sm">
              <p className="font-bold text-[#0047AB]">IntegraFin Tax & Accounting</p>
              <p>2039 N Mason Rd, Suite 604</p>
              <p>Katy, TX 77449</p>
              <p>Email: <a href="mailto:contact@integrafin.tax" className="text-[#00C2CB] hover:underline">contact@integrafin.tax</a></p>
              <p>Phone: <a href="tel:+18326471819" className="text-[#00C2CB] hover:underline">(832) 647-1819</a></p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
