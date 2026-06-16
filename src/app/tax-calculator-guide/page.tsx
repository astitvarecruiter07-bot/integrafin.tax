import type { Metadata } from "next";
import Link from "next/link";

const pageUrl = "https://integrafin.tax/tax-calculator-guide";

export const metadata: Metadata = {
  title: "2025 and 2026 Federal Tax Calculator Guide | IntegraFin",
  description:
    "Use this IRS-source-backed guide with IntegraFin's free 2025 and 2026 federal tax calculator for income tax, self-employment tax, and capital gains estimates.",
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title: "2025 and 2026 Federal Tax Calculator Guide | IntegraFin",
    description:
      "A practical guide to federal tax calculator inputs, IRS tax brackets, standard deductions, self-employment tax, and capital gains estimates.",
    url: pageUrl,
  },
};

const sourceLinks = [
  {
    href: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets",
    label: "IRS federal income tax rates and brackets",
  },
  {
    href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
    label: "IRS 2026 inflation adjustments",
  },
  {
    href: "https://www.irs.gov/irb/2025-45_IRB",
    label: "IRS Rev. Proc. 2025-32 OBBBA adjusted items",
  },
  {
    href: "https://www.irs.gov/credits-deductions/individuals/child-tax-credit",
    label: "IRS Child Tax Credit",
  },
  {
    href: "https://www.ssa.gov/oact/cola/cbb.html",
    label: "SSA contribution and benefit base",
  },
  {
    href: "https://www.irs.gov/taxtopics/tc409",
    label: "IRS Topic 409: Capital Gains and Losses",
  },
  {
    href: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes",
    label: "IRS self-employment tax guidance",
  },
  {
    href: "https://www.irs.gov/taxtopics/tc751",
    label: "IRS Topic 751: Social Security and Medicare withholding rates",
  },
];

const standardDeductions = [
  { status: "Single", ty2025: "$15,750", ty2026: "$16,100" },
  { status: "Married filing jointly", ty2025: "$31,500", ty2026: "$32,200" },
  { status: "Married filing separately", ty2025: "$15,750", ty2026: "$16,100" },
  { status: "Head of household", ty2025: "$23,625", ty2026: "$24,150" },
];

const calculatorInputs = [
  "Tax year selection for 2025 filing or 2026 planning",
  "Filing status and standard or itemized deduction amount",
  "Wages, other income, withholding, credits, and qualifying children",
  "Net self-employment income plus optional W-2 wage coordination",
  "Short-term and long-term capital gains",
  "Side-by-side filing or deduction scenario comparison",
];

const useCases = [
  {
    title: "W-2 employees estimating a refund or balance due",
    text: "Enter wage income, federal withholding, filing status, credits, and deductions to estimate whether you may receive a refund or owe additional federal tax.",
  },
  {
    title: "1099 contractors and self-employed taxpayers",
    text: "Use the self-employment tab to estimate Social Security, Medicare, Additional Medicare Tax exposure, income tax, and quarterly planning numbers.",
  },
  {
    title: "Investors with short-term or long-term gains",
    text: "Compare ordinary income, short-term gains, and long-term gains after the selected-year standard deduction and capital-gain thresholds.",
  },
  {
    title: "Small business owners planning quarterly payments",
    text: "Use the federal estimate as a first pass, then compare the result with bookkeeping records, payroll reports, estimated payments, and state obligations.",
  },
];

const faqs = [
  {
    question: "Is this federal tax calculator a replacement for filing a tax return?",
    answer:
      "No. It is an estimate for planning. It does not prepare, sign, or file a federal tax return, and final results depend on complete tax documents and IRS processing.",
  },
  {
    question: "Does the calculator cover both 2025 and 2026?",
    answer:
      "Yes. The calculator lets users choose 2025 filing estimates or 2026 planning estimates, using selected-year federal brackets, standard deductions, Social Security wage bases, and long-term capital-gain thresholds.",
  },
  {
    question: "Does the calculator estimate state taxes?",
    answer:
      "No. The calculator currently focuses on federal estimates. State and local income taxes, sales taxes, franchise taxes, and local filing rules are outside the calculator scope.",
  },
  {
    question: "Why can my final refund differ from the calculator result?",
    answer:
      "Refunds and balances can change because of missing income forms, credits, itemized deductions, retirement contributions, phaseouts, refundable-credit limits, penalties, state taxes, or IRS adjustments.",
  },
  {
    question: "Can self-employed taxpayers use the calculator?",
    answer:
      "Yes. The self-employment tab estimates Social Security and Medicare tax on net self-employment earnings and includes an optional W-2 wage input to coordinate with the annual Social Security wage base.",
  },
  {
    question: "Who should review the estimate with a tax professional?",
    answer:
      "A review is useful for taxpayers with self-employment income, capital gains, multiple jobs, estimated payments, dependents, IRS notices, business losses, or a large expected balance due.",
  },
];

const guideSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "2025 and 2026 Federal Tax Calculator Guide",
  description:
    "A practical guide for using a federal tax calculator to estimate 2025 and 2026 income tax, self-employment tax, and capital gains.",
  datePublished: "2026-06-16",
  dateModified: "2026-06-16",
  author: {
    "@type": "Organization",
    name: "IntegraFin Tax & Accounting",
    url: "https://integrafin.tax",
  },
  publisher: {
    "@type": "Organization",
    name: "IntegraFin Tax & Accounting",
    url: "https://integrafin.tax",
  },
  mainEntityOfPage: pageUrl,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function TaxCalculatorGuidePage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-[#003580] pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/tax-calculator" className="text-sm text-white/70 hover:text-[#00C2CB]">
            Back to tax calculator
          </Link>
          <div className="max-w-4xl mt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00C2CB] mb-4">
              IRS-source-backed calculator guide
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none">
              2025 and 2026 Federal Tax Calculator Guide
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mt-6 max-w-3xl">
              Use this guide with the IntegraFin federal tax calculator to estimate income tax,
              self-employment tax, capital gains tax, and possible refund or balance-due outcomes
              before you file or make estimated payments.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/tax-calculator"
                className="inline-flex items-center justify-center rounded-xl bg-[#00C2CB] px-5 py-3 text-sm font-black uppercase tracking-wider text-[#003580] hover:bg-white transition-colors"
              >
                Open calculator
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-black uppercase tracking-wider text-white hover:border-[#00C2CB] hover:text-[#00C2CB] transition-colors"
              >
                Request review
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Last reviewed</p>
            <p className="text-[#003580] font-bold mt-1">June 16, 2026</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Calculator scope</p>
            <p className="text-[#003580] font-bold mt-1">Federal estimate only</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Primary use</p>
            <p className="text-[#003580] font-bold mt-1">Planning, withholding, and quarterly estimates</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-black text-[#003580] tracking-tight">
              What the calculator estimates
            </h2>
            <p className="text-slate-600 leading-relaxed mt-4">
              A good tax calculator should explain the calculation path, not only show a final number.
              IntegraFin&apos;s calculator starts with selected-year federal rules, subtracts standard or
              itemized deductions, applies marginal tax brackets, then compares the result with tax
              already paid.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {calculatorInputs.map((item) => (
                <li key={item} className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5 bg-[#0b1320] text-white rounded-2xl p-6 h-fit">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00C2CB]">
              Accuracy note
            </p>
            <h3 className="text-2xl font-black mt-3">Use it as an estimate, not a filed return.</h3>
            <p className="text-white/70 text-sm leading-relaxed mt-4">
              The calculator does not replace Form 1040 instructions, tax preparation software, or
              professional review. State taxes, AMT, NIIT, QBI, refundable-credit limits, penalties,
              and many phaseouts can change the final result.
            </p>
          </aside>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black text-[#003580] tracking-tight">
              2025 and 2026 standard deduction quick table
            </h2>
            <p className="text-slate-600 mt-4">
              These amounts are used by the calculator when the standard deduction option is selected.
            </p>
          </div>
          <div className="overflow-x-auto mt-8 border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-[#003580]">
                <tr>
                  <th className="p-4 font-black">Filing status</th>
                  <th className="p-4 font-black">2025</th>
                  <th className="p-4 font-black">2026</th>
                </tr>
              </thead>
              <tbody>
                {standardDeductions.map((row) => (
                  <tr key={row.status} className="border-t border-slate-200">
                    <td className="p-4 font-semibold text-slate-800">{row.status}</td>
                    <td className="p-4 text-slate-700">{row.ty2025}</td>
                    <td className="p-4 text-slate-700">{row.ty2026}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-[#003580] tracking-tight">
            Who should use this tax estimator?
          </h2>
          <div className="grid gap-5 md:grid-cols-2 mt-8">
            {useCases.map((item) => (
              <article key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#003580]">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl font-black text-[#003580] tracking-tight">
              IRS and SSA sources used
            </h2>
            <p className="text-slate-600 leading-relaxed mt-4">
              Tax estimates need fresh source data. These references support the federal brackets,
              standard deductions, Child Tax Credit amount, capital-gain treatment, and Social
              Security wage base used for the calculator.
            </p>
          </div>
          <div className="lg:col-span-7 grid gap-3">
            {sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-semibold text-[#0057b8] hover:text-[#003580] hover:border-[#00C2CB] transition-colors"
              >
                {source.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-[#003580] tracking-tight">
            Frequently asked questions
          </h2>
          <div className="space-y-4 mt-8">
            {faqs.map((faq) => (
              <article key={faq.question} className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#003580]">{faq.question}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#003580] text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight">Ready to run the numbers?</h2>
              <p className="text-white/75 mt-3 max-w-2xl">
                Start with the free estimator, then request a professional review when income,
                credits, self-employment, or capital gains make the final number less clear.
              </p>
            </div>
            <Link
              href="/tax-calculator"
              className="inline-flex items-center justify-center rounded-xl bg-[#00C2CB] px-5 py-3 text-sm font-black uppercase tracking-wider text-[#003580] hover:bg-white transition-colors"
            >
              Use tax calculator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
