import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: 'Privacy Policy | IntegraFin CPA Services',
  description: 'Read the Privacy Policy for IntegraFin CPA Services. Learn how we collect, use, and protect your personal and financial information.',
  alternates: { canonical: 'https://integrafin.tax/privacy' },
};

export default function PrivacyPage() {
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
            <span className="text-[#00C2CB] text-xs font-bold tracking-[0.2em] uppercase">Legal & Compliance</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 leading-[1.1]">
            Privacy Policy
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
              <ShieldCheck className="w-6 h-6 text-[#00C2CB]" /> 1. Introduction
            </h2>
            <p className="leading-relaxed">
              IntegraFin ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <Link href="/" className="text-[#00C2CB] hover:underline">integrafin.tax</Link> and use our tax, accounting, and consulting services.
            </p>
            <p className="leading-relaxed mt-2">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-[#00C2CB]" /> 2. Information We Collect
            </h2>
            <p className="leading-relaxed">
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you fill out contact forms, request a callback, or subscribe to our newsletter.
              </li>
              <li>
                <strong>Financial Data:</strong> Financial information, such as data related to your taxes, revenue, or business structure, provided voluntarily during consultations or calculations on our Site.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
              </li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-[#00C2CB]" /> 3. How We Use Your Information
            </h2>
            <p className="leading-relaxed">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Provide, operate, and maintain or improve our services and site.</li>
              <li>Process your requests, such as callback schedules or consultation bookings.</li>
              <li>Understand and analyze how you use our Site to improve performance.</li>
              <li>Develop new products, services, features, and functionality.</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Site, and for marketing and promotional purposes.</li>
              <li>Send you emails or newsletters if you have subscribed.</li>
              <li>Find and prevent fraud.</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#00C2CB]" /> 4. Disclosure of Your Information
            </h2>
            <p className="leading-relaxed">
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide you with advance notice, except as described below:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.
              </li>
              <li>
                <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, such as data analysis, email delivery, hosting services, and customer service.
              </li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4">5. Data Security</h2>
            <p className="leading-relaxed">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4">6. Your Rights</h2>
            <p className="leading-relaxed">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>The right to access – You have the right to request copies of your personal data.</li>
              <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data.</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h2 className="text-2xl font-black text-[#0047AB] mb-4">7. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions or comments about this Privacy Policy, please contact us at:
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
