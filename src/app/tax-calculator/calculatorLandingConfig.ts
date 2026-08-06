export type TaxCalculatorVariant = "hub" | "quarterly" | "selfEmployment" | "1099" | "capitalGains";
export type CalculatorInitialTab = "federal" | "quarterly" | "selfEmployment" | "1099" | "capitalGains";

export type CalculatorFaq = { question: string; answer: string };

export type CalculatorLandingConfig = {
  path: string;
  title: string;
  h1: string;
  description: string;
  badge: string;
  initialTab: CalculatorInitialTab;
  analyticsName: string;
  contentEyebrow: string;
  contentHeading: string;
  contentIntro: string;
  explanationPoints: { title: string; description: string }[];
  exampleTitle: string;
  exampleBody: string;
  faqs: CalculatorFaq[];
};

export const calculatorLandingConfigs: Record<TaxCalculatorVariant, CalculatorLandingConfig> = {
  hub: {
    path: "/tax-calculator",
    title: "2025 & 2026 Federal Tax Calculator | Refund Estimator",
    h1: "2025 and 2026 Federal Tax Calculator & Refund Estimator",
    description:
      "Use this federal tax calculator to estimate 2025 filing or 2026 planning results from filing status, income, deductions, credits, self-employment, and long-term gains. It is a planning estimate, not a filed return, and excludes state tax and several federal adjustments.",
    badge: "Free 2025 + 2026 Tax Estimator",
    initialTab: "federal",
    analyticsName: "federal_tax",
    contentEyebrow: "Six planning tools",
    contentHeading: "Choose the federal tax estimate that matches your question",
    contentIntro:
      "Use the broad federal estimator for income, deductions, credits, and payments, or open a focused tool for quarterly payments, self-employment, 1099 income, capital gains, or scenario comparison.",
    explanationPoints: [
      { title: "Selected-year federal rules", description: "Choose 2025 filing or 2026 planning amounts before entering a scenario." },
      { title: "Payment-aware results", description: "The broad estimator compares estimated liability with withholding and estimated payments." },
      { title: "Visible limitations", description: "Every result remains a planning estimate and identifies major rules outside the model." },
    ],
    exampleTitle: "Example: compare liability with payments",
    exampleBody:
      "A taxpayer can enter income, filing status, deductions, credits, federal withholding, and estimated payments to see an illustrative federal liability and a possible refund or balance-due estimate.",
    faqs: [
      { question: "How accurate is this tax calculator?", answer: "It provides a planning estimate using selected-year federal brackets, standard deductions, selected credits, Social Security wage bases, and capital-gain thresholds. A final return can differ after complete facts and exclusions are reviewed." },
      { question: "Does this calculator estimate my 2025 tax refund?", answer: "Yes. Choose 2025 filing and enter income, payments, deductions, and supported credits to estimate a federal refund or balance due." },
      { question: "Can I use this for 2026 tax planning?", answer: "Yes. Choose 2026 planning to estimate federal income tax, self-employment tax, capital gains, and selected quarterly planning amounts." },
      { question: "Does this include state income tax?", answer: "No. The calculators are federal estimates and exclude state and local income tax." },
      { question: "Does this replace a tax return?", answer: "No. It is an educational planning tool, not tax preparation software, a filed return, or individualized tax advice." },
    ],
  },
  quarterly: {
    path: "/quarterly-estimated-tax-calculator",
    title: "2026 Quarterly Estimated Tax Calculator | IntegraFin",
    h1: "2026 Quarterly Estimated Tax Calculator",
    description:
      "Estimate remaining 2026 federal quarterly tax payments using expected net self-employment income, W-2 wages, withholding, and payments already made.",
    badge: "2026 Form 1040-ES Planning",
    initialTab: "quarterly",
    analyticsName: "quarterly_estimated_tax",
    contentEyebrow: "Quarterly payment planning",
    contentHeading: "Estimate the federal balance still left to plan for",
    contentIntro:
      "This focused tool combines a simplified annual federal income and self-employment tax estimate with withholding and payments already made, then spreads the remaining estimate across the number of installments you select.",
    explanationPoints: [
      { title: "Start with annual expectations", description: "Use expected full-year net self-employment income and optional W-2 wages rather than one quarter of income." },
      { title: "Subtract payments already covered", description: "Enter expected withholding and estimated payments already made to estimate the remaining annual amount." },
      { title: "Choose remaining installments", description: "The tool divides the remaining simplified estimate across the installment count you select; it does not test every safe-harbor method." },
    ],
    exampleTitle: "Illustrative quarterly-payment example",
    exampleBody:
      "If the simplified annual federal estimate is $20,000 and entered withholding and payments total $12,000, the remaining estimate is $8,000. Selecting two remaining installments shows an illustrative $4,000 per installment. Actual required payments can differ under Form 1040-ES, safe-harbor, annualized-income, penalty, or disaster-relief rules.",
    faqs: [
      { question: "Who may need to make quarterly estimated tax payments?", answer: "People with income not fully covered by withholding, including some freelancers, contractors, business owners, investors, and landlords, may need estimated payments. Eligibility depends on the complete federal tax situation." },
      { question: "What are the standard 2026 estimated tax due dates?", answer: "For calendar-year individual planning, the standard dates are April 15, June 15, and September 15, 2026, followed by January 15, 2027. Individual circumstances and IRS relief can change an applicable deadline." },
      { question: "Does this calculator apply the IRS safe-harbor rules?", answer: "No. It provides a simplified planning amount and does not fully test prior-year liability, higher-income safe harbor, annualized income, penalties, or every Form 1040-ES rule." },
      { question: "Does federal withholding reduce the estimate?", answer: "Yes. Enter expected federal withholding and estimated payments already made so the tool can subtract them from the simplified annual estimate." },
      { question: "Does this include state estimated taxes?", answer: "No. State and local estimated taxes are outside this calculator's scope." },
    ],
  },
  selfEmployment: {
    path: "/self-employment-tax-calculator",
    title: "2026 Self-Employment Tax Calculator | Schedule SE Estimate",
    h1: "2026 Self-Employment Tax Calculator",
    description:
      "Estimate 2026 self-employment tax, Social Security and Medicare components, the deductible portion, combined federal income tax, and quarterly planning amounts.",
    badge: "2026 Schedule SE Estimate",
    initialTab: "selfEmployment",
    analyticsName: "self_employment_tax",
    contentEyebrow: "Schedule SE planning",
    contentHeading: "See how net profit becomes a self-employment tax estimate",
    contentIntro:
      "The tool starts with net self-employment profit, applies the 92.35% Schedule SE adjustment, coordinates the Social Security wage base with the taxpayer's own W-2 wages, and estimates Medicare tax and the deductible employer-equivalent portion.",
    explanationPoints: [
      { title: "Use net profit", description: "Enter estimated business profit after ordinary and necessary expenses, not gross receipts." },
      { title: "Coordinate W-2 wages", description: "The taxpayer's own W-2 Social Security wages reduce the remaining wage base used by the estimate." },
      { title: "Review both tax layers", description: "Self-employment tax can apply in addition to regular federal income tax." },
    ],
    exampleTitle: "Illustrative self-employment example",
    exampleBody:
      "A single filer with $80,000 of net self-employment profit and no W-2 wages can use the tool to review the adjusted net-earnings base, estimated Social Security and Medicare components, deductible portion, regular income tax, and an annual estimate divided into four planning amounts.",
    faqs: [
      { question: "What income should I enter?", answer: "Enter estimated net self-employment profit after ordinary and necessary business expenses, not gross sales or the total printed on a Form 1099." },
      { question: "Why does the calculator use 92.35% of net profit?", answer: "Schedule SE generally applies Social Security and Medicare calculations to 92.35% of net self-employment earnings, subject to thresholds and limitations." },
      { question: "How do W-2 wages affect self-employment tax?", answer: "The same taxpayer's Social Security wages generally reduce the remaining Social Security wage base available for self-employment earnings. A spouse has a separate wage base." },
      { question: "Is half of self-employment tax a tax credit?", answer: "No. The deductible employer-equivalent portion is generally an income adjustment, not a dollar-for-dollar credit, and Additional Medicare Tax is not included in that deductible portion." },
      { question: "Does self-employment tax apply below $400?", answer: "Schedule SE generally applies when adjusted net earnings from self-employment are $400 or more, although other filing and tax rules can still apply." },
    ],
  },
  "1099": {
    path: "/1099-tax-calculator",
    title: "2026 1099 Tax Calculator for Freelancers & Contractors",
    h1: "2026 1099 Tax Calculator",
    description:
      "Estimate 2026 federal income and self-employment tax from gross 1099 or contract income, business expenses, W-2 wages, and payments already made.",
    badge: "Freelancer + Contractor Planning",
    initialTab: "1099",
    analyticsName: "1099_tax",
    contentEyebrow: "Gross-to-net planning",
    contentHeading: "Turn gross contract income into a clearer tax reserve estimate",
    contentIntro:
      "Unlike the self-employment calculator, this workflow begins with gross 1099 or contract receipts, subtracts the expenses you enter to estimate net profit, and then calculates simplified federal income and self-employment tax.",
    explanationPoints: [
      { title: "Enter gross receipts", description: "Include expected contract, freelance, and platform income before business expenses." },
      { title: "Estimate business expenses", description: "Use only ordinary and necessary expenses you can support; the calculator does not decide deductibility." },
      { title: "Plan a reserve", description: "Review the annual estimate, remaining liability after entered payments, and an illustrative gross-income reserve percentage." },
    ],
    exampleTitle: "Illustrative 1099 contractor example",
    exampleBody:
      "A contractor expecting $100,000 of gross receipts and $20,000 of entered business expenses has $80,000 of estimated net profit before other return adjustments. The tool uses that net amount for a simplified income and self-employment tax estimate; it does not determine whether every entered expense is deductible.",
    faqs: [
      { question: "Is the amount on my Form 1099 my taxable profit?", answer: "Not necessarily. A Form 1099 generally reports gross payment information. Taxable business profit can differ after ordinary and necessary expenses and other return rules are applied." },
      { question: "What expenses can I enter?", answer: "Enter only estimated ordinary and necessary business expenses you can support. This calculator does not determine whether a specific expense is deductible." },
      { question: "Why can a 1099 worker owe two types of federal tax?", answer: "Net self-employment profit may be subject to regular federal income tax and self-employment Social Security and Medicare tax." },
      { question: "How much should a freelancer set aside?", answer: "There is no universal percentage. The tool shows an illustrative reserve rate based on the simplified estimate and entered gross receipts, but complete facts can change the amount." },
      { question: "Does this calculator include state tax?", answer: "No. State and local taxes, fees, and business obligations are not included." },
    ],
  },
  capitalGains: {
    path: "/capital-gains-tax-calculator",
    title: "2026 Capital Gains Tax Calculator | Short & Long Term",
    h1: "2026 Capital Gains Tax Calculator",
    description:
      "Estimate 2026 federal tax on short-term and long-term capital gains using filing status, ordinary income, the standard deduction, and selected-year thresholds.",
    badge: "2026 Investment Tax Planning",
    initialTab: "capitalGains",
    analyticsName: "capital_gains_tax",
    contentEyebrow: "Capital-gain stacking",
    contentHeading: "Estimate short- and long-term gains in the right income order",
    contentIntro:
      "The calculator treats short-term gains as ordinary income and stacks taxable long-term gains above ordinary taxable income before applying the selected-year 0%, 15%, and 20% federal thresholds.",
    explanationPoints: [
      { title: "Separate gain types", description: "Enter short-term and long-term gains separately because their federal rate treatment differs." },
      { title: "Include ordinary income", description: "Ordinary taxable income uses lower capital-gain threshold space before long-term gains are applied." },
      { title: "Review exclusions", description: "NIIT, collectibles, depreciation recapture, Section 1202, state taxes, and carryovers are not modeled." },
    ],
    exampleTitle: "Illustrative long-term gain example",
    exampleBody:
      "A single filer can enter $75,000 of ordinary income and $20,000 of long-term gains to see how the standard deduction and ordinary taxable income affect the gain amount falling into the selected-year 0% or 15% range. The estimate excludes NIIT and state tax.",
    faqs: [
      { question: "What is the difference between short-term and long-term capital gains?", answer: "Gains on assets held one year or less are generally short term and taxed as ordinary income. Gains on assets held more than one year may use long-term federal capital-gain rates." },
      { question: "Why does the calculator ask for ordinary income?", answer: "Long-term gains stack above ordinary taxable income, so ordinary income can use some or all of the lower capital-gain threshold ranges." },
      { question: "Does the calculator include the Net Investment Income Tax?", answer: "No. The 3.8% NIIT is not included." },
      { question: "Does this calculate tax on collectibles or real-estate depreciation recapture?", answer: "No. Collectibles, unrecaptured Section 1250 gain, depreciation recapture, and other special-rate categories are excluded." },
      { question: "Does this include state capital-gains tax?", answer: "No. The result is a federal estimate only." },
    ],
  },
};

export const focusedCalculatorVariants: TaxCalculatorVariant[] = [
  "quarterly",
  "selfEmployment",
  "1099",
  "capitalGains",
];
