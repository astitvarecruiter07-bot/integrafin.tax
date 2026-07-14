"use client";
import { useState } from "react";
import Link from "next/link";
import { baseEventParameters, trackEvent } from "@/lib/analytics";

/* ------------------------- 2025/2026 TAX DATA ------------------------- */

type FilingStatus = "single" | "married_joint" | "married_separate" | "head_of_household";
type TaxYear = "2025" | "2026";
type TaxBracket = { rate: number; min: number; max: number };
type CgBracket = { rate: number; max: number };

function trackCalculatorCompletion(calculatorName: string, taxYear: TaxYear) {
    trackEvent("calculator_complete", {
        ...baseEventParameters(),
        calculator_name: calculatorName,
        tax_year: taxYear,
    });
}

type TaxYearData = {
    label: string;
    description: string;
    sourceNote: string;
    filingYear: string;
    standardDeduction: Record<FilingStatus, number>;
    brackets: Record<FilingStatus, TaxBracket[]>;
    longTermCgBrackets: Record<FilingStatus, CgBracket[]>;
    ssWageBase: number;
    childTaxCredit: number;
    childTaxCreditPhaseout: Record<FilingStatus, number>;
    additionalMedicareThreshold: Record<FilingStatus, number>;
    estimatedTaxDueDates: { q: string; date: string; period: string }[];
};

const FILING_STATUSES = [
    { value: "single", label: "Single" },
    { value: "married_joint", label: "Married Filing Jointly" },
    { value: "married_separate", label: "Married Filing Separately" },
    { value: "head_of_household", label: "Head of Household" },
] satisfies { value: FilingStatus; label: string }[];

const TAX_YEAR_OPTIONS = [
    { value: "2026", label: "2026 planning" },
    { value: "2025", label: "2025 filing" },
] satisfies { value: TaxYear; label: string }[];

const CALCULATOR_SOURCE_LINKS = [
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
        label: "SSA Social Security contribution and benefit base",
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

const TAX_DATA: Record<TaxYear, TaxYearData> = {
    "2025": {
        label: "2025",
        description: "2025 filing estimates for returns generally filed in 2026",
        sourceNote: "2025 IRS tables with OBBBA standard deduction updates",
        filingYear: "returns generally filed in 2026",
        standardDeduction: {
            single: 15750,
            married_joint: 31500,
            married_separate: 15750,
            head_of_household: 23625,
        },
        brackets: {
            single: [
                { rate: 0.10, min: 0, max: 11925 },
                { rate: 0.12, min: 11925, max: 48475 },
                { rate: 0.22, min: 48475, max: 103350 },
                { rate: 0.24, min: 103350, max: 197300 },
                { rate: 0.32, min: 197300, max: 250525 },
                { rate: 0.35, min: 250525, max: 626350 },
                { rate: 0.37, min: 626350, max: Infinity },
            ],
            married_joint: [
                { rate: 0.10, min: 0, max: 23850 },
                { rate: 0.12, min: 23850, max: 96950 },
                { rate: 0.22, min: 96950, max: 206700 },
                { rate: 0.24, min: 206700, max: 394600 },
                { rate: 0.32, min: 394600, max: 501050 },
                { rate: 0.35, min: 501050, max: 751600 },
                { rate: 0.37, min: 751600, max: Infinity },
            ],
            married_separate: [
                { rate: 0.10, min: 0, max: 11925 },
                { rate: 0.12, min: 11925, max: 48475 },
                { rate: 0.22, min: 48475, max: 103350 },
                { rate: 0.24, min: 103350, max: 197300 },
                { rate: 0.32, min: 197300, max: 250525 },
                { rate: 0.35, min: 250525, max: 375800 },
                { rate: 0.37, min: 375800, max: Infinity },
            ],
            head_of_household: [
                { rate: 0.10, min: 0, max: 17000 },
                { rate: 0.12, min: 17000, max: 64850 },
                { rate: 0.22, min: 64850, max: 103350 },
                { rate: 0.24, min: 103350, max: 197300 },
                { rate: 0.32, min: 197300, max: 250500 },
                { rate: 0.35, min: 250500, max: 626350 },
                { rate: 0.37, min: 626350, max: Infinity },
            ],
        },
        longTermCgBrackets: {
            single: [
                { rate: 0, max: 48350 },
                { rate: 0.15, max: 533400 },
                { rate: 0.20, max: Infinity },
            ],
            married_joint: [
                { rate: 0, max: 96700 },
                { rate: 0.15, max: 600050 },
                { rate: 0.20, max: Infinity },
            ],
            married_separate: [
                { rate: 0, max: 48350 },
                { rate: 0.15, max: 300000 },
                { rate: 0.20, max: Infinity },
            ],
            head_of_household: [
                { rate: 0, max: 64750 },
                { rate: 0.15, max: 566700 },
                { rate: 0.20, max: Infinity },
            ],
        },
        ssWageBase: 176100,
        childTaxCredit: 2200,
        childTaxCreditPhaseout: {
            single: 200000,
            married_joint: 400000,
            married_separate: 200000,
            head_of_household: 200000,
        },
        additionalMedicareThreshold: {
            single: 200000,
            married_joint: 250000,
            married_separate: 125000,
            head_of_household: 200000,
        },
        estimatedTaxDueDates: [
            { q: "Q1", date: "Apr 15, 2025", period: "Jan-Mar" },
            { q: "Q2", date: "Jun 16, 2025", period: "Apr-May" },
            { q: "Q3", date: "Sep 15, 2025", period: "Jun-Aug" },
            { q: "Q4", date: "Jan 15, 2026", period: "Sep-Dec" },
        ],
    },
    "2026": {
        label: "2026",
        description: "2026 planning estimates for income earned in 2026",
        sourceNote: "2026 IRS inflation-adjusted tables",
        filingYear: "returns generally filed in 2027",
        standardDeduction: {
            single: 16100,
            married_joint: 32200,
            married_separate: 16100,
            head_of_household: 24150,
        },
        brackets: {
            single: [
                { rate: 0.10, min: 0, max: 12400 },
                { rate: 0.12, min: 12400, max: 50400 },
                { rate: 0.22, min: 50400, max: 105700 },
                { rate: 0.24, min: 105700, max: 201775 },
                { rate: 0.32, min: 201775, max: 256225 },
                { rate: 0.35, min: 256225, max: 640600 },
                { rate: 0.37, min: 640600, max: Infinity },
            ],
            married_joint: [
                { rate: 0.10, min: 0, max: 24800 },
                { rate: 0.12, min: 24800, max: 100800 },
                { rate: 0.22, min: 100800, max: 211400 },
                { rate: 0.24, min: 211400, max: 403550 },
                { rate: 0.32, min: 403550, max: 512450 },
                { rate: 0.35, min: 512450, max: 768700 },
                { rate: 0.37, min: 768700, max: Infinity },
            ],
            married_separate: [
                { rate: 0.10, min: 0, max: 12400 },
                { rate: 0.12, min: 12400, max: 50400 },
                { rate: 0.22, min: 50400, max: 105700 },
                { rate: 0.24, min: 105700, max: 201775 },
                { rate: 0.32, min: 201775, max: 256225 },
                { rate: 0.35, min: 256225, max: 384350 },
                { rate: 0.37, min: 384350, max: Infinity },
            ],
            head_of_household: [
                { rate: 0.10, min: 0, max: 17700 },
                { rate: 0.12, min: 17700, max: 67450 },
                { rate: 0.22, min: 67450, max: 105700 },
                { rate: 0.24, min: 105700, max: 201750 },
                { rate: 0.32, min: 201750, max: 256200 },
                { rate: 0.35, min: 256200, max: 640600 },
                { rate: 0.37, min: 640600, max: Infinity },
            ],
        },
        longTermCgBrackets: {
            single: [
                { rate: 0, max: 49450 },
                { rate: 0.15, max: 545500 },
                { rate: 0.20, max: Infinity },
            ],
            married_joint: [
                { rate: 0, max: 98900 },
                { rate: 0.15, max: 613700 },
                { rate: 0.20, max: Infinity },
            ],
            married_separate: [
                { rate: 0, max: 49450 },
                { rate: 0.15, max: 306850 },
                { rate: 0.20, max: Infinity },
            ],
            head_of_household: [
                { rate: 0, max: 66200 },
                { rate: 0.15, max: 579600 },
                { rate: 0.20, max: Infinity },
            ],
        },
        ssWageBase: 184500,
        childTaxCredit: 2200,
        childTaxCreditPhaseout: {
            single: 200000,
            married_joint: 400000,
            married_separate: 200000,
            head_of_household: 200000,
        },
        additionalMedicareThreshold: {
            single: 200000,
            married_joint: 250000,
            married_separate: 125000,
            head_of_household: 200000,
        },
        estimatedTaxDueDates: [
            { q: "Q1", date: "Apr 15, 2026", period: "Jan-Mar" },
            { q: "Q2", date: "Jun 15, 2026", period: "Apr-May" },
            { q: "Q3", date: "Sep 15, 2026", period: "Jun-Aug" },
            { q: "Q4", date: "Jan 15, 2027", period: "Sep-Dec" },
        ],
    },
};

/* ───────────────────────── HELPERS ───────────────────────── */

const STANDARD_DEDUCTION_ROWS = FILING_STATUSES.map((status) => ({
    ...status,
    deduction2025: TAX_DATA["2025"].standardDeduction[status.value],
    deduction2026: TAX_DATA["2026"].standardDeduction[status.value],
}));

const CALCULATOR_LIMITATIONS = [
    "State and local income taxes are not included.",
    "AMT, NIIT, QBI, EITC, refundable-credit limits, education credits, and most phaseouts are not calculated.",
    "Age 65 or older, blind taxpayer, retirement-plan deductions, HSA deductions, student loan interest, and detailed itemized-deduction limits are not yet modeled.",
    "Self-employment estimates use the selected-year Social Security wage base and Medicare rates, but final Schedule SE results can differ.",
    "Capital gains estimates exclude NIIT, collectibles, Section 1202 stock, unrecaptured Section 1250 gains, wash sales, and carryover-loss details.",
    "The result is not a filed return, IRS software, or a guarantee of refund or tax due.",
];

const TAX_CALCULATOR_FAQS = [
    {
        question: "How accurate is this tax calculator?",
        answer:
            "It provides a planning estimate using selected-year federal brackets, standard deductions, Child Tax Credit amounts, Social Security wage bases, and capital-gain thresholds. Final tax can change after full Form 1040 details, phaseouts, state taxes, penalties, and refundable-credit rules are reviewed.",
    },
    {
        question: "Does this calculator estimate my 2025 tax refund?",
        answer:
            "Yes. Choose 2025 filing, enter income, withholding, deductions, credits, and qualifying children, and the calculator estimates a federal refund or balance due.",
    },
    {
        question: "Can I use this for 2026 tax planning?",
        answer:
            "Yes. Choose 2026 planning to estimate federal income tax, self-employment tax, long-term capital gains, and quarterly planning amounts using 2026 IRS and SSA figures.",
    },
    {
        question: "Does this include self-employment tax?",
        answer:
            "Yes. The self-employment tab estimates Social Security and Medicare tax on 92.35% of net self-employment earnings and coordinates with optional W-2 wages.",
    },
    {
        question: "Does this include state income tax?",
        answer:
            "No. This calculator currently focuses on federal estimates. State income tax, local tax, franchise tax, and sales tax are outside the calculator scope.",
    },
    {
        question: "Does this include capital gains tax?",
        answer:
            "Yes. The capital gains tab estimates short-term gains as ordinary income and long-term gains using selected-year 0%, 15%, and 20% thresholds. It does not include NIIT or special capital-gain rates.",
    },
    {
        question: "What tax brackets does this calculator use?",
        answer:
            "It uses IRS-published 2025 federal income tax brackets and 2026 inflation-adjusted federal tax brackets, plus selected-year standard deduction and long-term capital-gain thresholds.",
    },
    {
        question: "Why is my refund different from my tax liability?",
        answer:
            "Tax liability is the estimated tax after deductions and credits. Refund or balance due compares that liability with withholding and estimated payments already paid.",
    },
    {
        question: "Should I use standard or itemized deductions?",
        answer:
            "Use the larger deduction only after reviewing your actual deductible expenses. The calculator lets you compare the standard deduction with an itemized deduction estimate.",
    },
    {
        question: "When are 2026 estimated tax payments due?",
        answer:
            "For 2026 planning, the calculator displays estimated payment dates of April 15, 2026, June 15, 2026, September 15, 2026, and January 15, 2027.",
    },
];

const RELATED_TAX_RESOURCES = [
    { href: "/tax-calculator-guide", label: "2025 and 2026 federal tax calculator guide" },
    { href: "/services#individual", label: "Individual tax preparation services" },
    { href: "/services#business", label: "Small business tax and accounting services" },
    { href: "/texas-tax-accounting-services", label: "Texas tax and accounting services" },
    { href: "/texas/katy-bookkeeping-services", label: "Katy bookkeeping services" },
    { href: "/texas/irs-notice-help-katy-tx", label: "IRS notice help in Katy TX" },
    { href: "/blog/tax-planning-strategies-2025", label: "Tax planning strategies" },
    { href: "/blog/small-business-accounting-tips", label: "Small business accounting tips" },
];

function fmt(val: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(val);
}

function parseNum(raw: string) {
    return parseFloat(raw.replace(/,/g, "")) || 0;
}

function formatInput(raw: string) {
    const digits = raw.replace(/[^0-9]/g, "");
    if (!digits) return "";
    return new Intl.NumberFormat("en-US").format(parseInt(digits));
}

function calcIncomeTax(taxableIncome: number, filingStatus: FilingStatus, taxYear: TaxYear) {
    const brackets = TAX_DATA[taxYear].brackets[filingStatus];
    let total = 0;
    const breakdown: { rate: number; amount: number; rangeLabel: string }[] = [];
    for (const b of brackets) {
        if (taxableIncome <= b.min) break;
        const inBracket = Math.min(taxableIncome, b.max) - b.min;
        const tax = inBracket * b.rate;
        total += tax;
        breakdown.push({
            rate: b.rate * 100,
            amount: tax,
            rangeLabel: `${fmt(b.min)} - ${b.max === Infinity ? "and up" : fmt(b.max)}`,
        });
    }
    return { total, breakdown };
}

function getMarginalRate(taxableIncome: number, filingStatus: FilingStatus, taxYear: TaxYear) {
    if (taxableIncome <= 0) return 0;
    const brackets = TAX_DATA[taxYear].brackets[filingStatus];
    return brackets.find((bracket) => taxableIncome > bracket.min && taxableIncome <= bracket.max)?.rate ?? 0;
}

function getStandardDeduction(taxYear: TaxYear, filingStatus: FilingStatus) {
    return TAX_DATA[taxYear].standardDeduction[filingStatus];
}

function getChildTaxCreditEstimate(
    taxYear: TaxYear,
    filingStatus: FilingStatus,
    income: number,
    qualifyingChildren: number,
    totalTax: number
) {
    if (qualifyingChildren <= 0 || totalTax <= 0) return 0;
    const data = TAX_DATA[taxYear];
    const phaseoutStart = data.childTaxCreditPhaseout[filingStatus];
    const tentativeCredit = qualifyingChildren * data.childTaxCredit;
    const phaseout = income > phaseoutStart ? Math.ceil((income - phaseoutStart) / 1000) * 50 : 0;
    return Math.min(Math.max(0, tentativeCredit - phaseout), totalTax);
}

function formatPercent(rate: number) {
    return `${(rate * 100).toFixed(0)}%`;
}

function formatTaxableRange(min: number, max: number) {
    return `${fmt(min)} - ${max === Infinity ? "and up" : fmt(max)}`;
}

function DataTablesSection({ taxYear }: { taxYear: TaxYear }) {
    const taxData = TAX_DATA[taxYear];

    return (
        <section className="py-16 bg-white border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
                <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00C2CB] mb-3">
                            IRS data tables
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#003580] tracking-normal">
                            2025 vs 2026 federal tax calculator data
                        </h2>
                        <p className="text-slate-600 leading-relaxed mt-4 max-w-3xl">
                            These selected-year figures support the standard deduction, federal bracket,
                            self-employment, Child Tax Credit, and long-term capital gains estimates.
                        </p>
                    </div>
                    <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Last reviewed
                        </p>
                        <p className="text-[#003580] font-bold mt-1">June 16, 2026</p>
                        <p className="text-sm text-slate-600 mt-2">Reviewed by: IntegraFin tax team</p>
                    </div>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-100 text-[#003580]">
                            <tr>
                                <th className="p-4 font-black">Filing status</th>
                                <th className="p-4 font-black">2025 standard deduction</th>
                                <th className="p-4 font-black">2026 standard deduction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {STANDARD_DEDUCTION_ROWS.map((row) => (
                                <tr key={row.value} className="border-t border-slate-200">
                                    <td className="p-4 font-semibold text-slate-800">{row.label}</td>
                                    <td className="p-4 text-slate-700">{fmt(row.deduction2025)}</td>
                                    <td className="p-4 text-slate-700">{fmt(row.deduction2026)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <article className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Social Security wage base
                        </p>
                        <p className="text-2xl font-black text-[#003580] mt-2">{fmt(taxData.ssWageBase)}</p>
                        <p className="text-sm text-slate-600 mt-2">Used in the {taxYear} self-employment tax estimate.</p>
                    </article>
                    <article className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Child Tax Credit
                        </p>
                        <p className="text-2xl font-black text-[#003580] mt-2">{fmt(taxData.childTaxCredit)}</p>
                        <p className="text-sm text-slate-600 mt-2">Estimated per qualifying child before phaseout and eligibility limits.</p>
                    </article>
                    <article className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Calculator scope
                        </p>
                        <p className="text-2xl font-black text-[#003580] mt-2">Federal only</p>
                        <p className="text-sm text-slate-600 mt-2">State, local, AMT, NIIT, and many phaseouts are excluded.</p>
                    </article>
                </div>

                <div>
                    <h2 className="text-3xl font-black text-[#003580] tracking-normal">
                        {taxYear} federal income tax brackets used
                    </h2>
                    <p className="text-slate-600 leading-relaxed mt-3 max-w-3xl">
                        Federal income tax is marginal. A higher bracket applies only to the next layer of taxable income, not the full income amount.
                    </p>
                    <div className="grid gap-5 lg:grid-cols-2 mt-8">
                        {FILING_STATUSES.map((status) => (
                            <article key={status.value} className="border border-slate-200 rounded-xl overflow-hidden">
                                <h3 className="bg-[#003580] text-white px-4 py-3 font-bold">{status.label}</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-100 text-slate-700">
                                            <tr>
                                                <th className="p-3 font-bold">Rate</th>
                                                <th className="p-3 font-bold">Taxable income</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {taxData.brackets[status.value].map((bracket) => (
                                                <tr key={`${status.value}-${bracket.rate}-${bracket.min}`} className="border-t border-slate-200">
                                                    <td className="p-3 font-semibold text-[#003580]">{formatPercent(bracket.rate)}</td>
                                                    <td className="p-3 text-slate-700">{formatTaxableRange(bracket.min, bracket.max)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-black text-[#003580] tracking-normal">
                        {taxYear} long-term capital gains thresholds
                    </h2>
                    <p className="text-slate-600 leading-relaxed mt-3 max-w-3xl">
                        Long-term gains are stacked on top of ordinary taxable income. Short-term gains are taxed as ordinary income.
                    </p>
                    <div className="overflow-x-auto border border-slate-200 rounded-xl mt-8">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-100 text-[#003580]">
                                <tr>
                                    <th className="p-4 font-black">Filing status</th>
                                    <th className="p-4 font-black">0% threshold</th>
                                    <th className="p-4 font-black">15% threshold</th>
                                    <th className="p-4 font-black">20% applies above</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FILING_STATUSES.map((status) => {
                                    const [zero, fifteen] = taxData.longTermCgBrackets[status.value];
                                    return (
                                        <tr key={status.value} className="border-t border-slate-200">
                                            <td className="p-4 font-semibold text-slate-800">{status.label}</td>
                                            <td className="p-4 text-slate-700">Up to {fmt(zero.max)}</td>
                                            <td className="p-4 text-slate-700">Up to {fmt(fifteen.max)}</td>
                                            <td className="p-4 text-slate-700">Over {fmt(fifteen.max)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

function LimitationsSection() {
    return (
        <section className="py-16 bg-slate-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00C2CB] mb-3">
                        Calculator limitations
                    </p>
                    <h2 className="text-3xl font-black text-[#003580] tracking-normal">
                        What this federal estimate does not cover
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed mt-4">
                        The calculator is built for planning and search transparency. It is intentionally conservative about exclusions so taxpayers know when to request a reviewed estimate.
                    </p>
                </div>
                <div className="lg:col-span-8 grid gap-3 md:grid-cols-2">
                    {CALCULATOR_LIMITATIONS.map((item) => (
                        <div key={item} className="bg-white border border-slate-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CalculatorFaqSection() {
    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <h2 className="text-3xl font-black text-[#003580] tracking-normal">
                    Federal tax calculator FAQ
                </h2>
                <div className="space-y-4 mt-8">
                    {TAX_CALCULATOR_FAQS.map((faq) => (
                        <article key={faq.question} className="border border-slate-200 rounded-xl p-5">
                            <h3 className="text-lg font-bold text-[#003580]">{faq.question}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed mt-2">{faq.answer}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function RelatedResourcesSection() {
    return (
        <section className="py-16 bg-slate-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00C2CB] mb-3">
                        Related resources
                    </p>
                    <h2 className="text-3xl font-black text-[#003580] tracking-normal">
                        More help after the tax estimate
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed mt-4">
                        Use these pages for tax preparation, bookkeeping, IRS notices, and deeper planning context.
                    </p>
                </div>
                <div className="lg:col-span-8 grid gap-3 sm:grid-cols-2">
                    {RELATED_TAX_RESOURCES.map((resource) => (
                        <Link
                            key={resource.href}
                            href={resource.href}
                            className="bg-white border border-slate-200 rounded-xl p-4 text-sm font-semibold text-[#0057b8] hover:text-[#003580] hover:border-[#00C2CB] transition-colors"
                        >
                            {resource.label}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ───────────────────────── TABS ───────────────────────── */

type TabKey = "federal" | "selfEmployment" | "capitalGains" | "comparison";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    {
        key: "federal",
        label: "Federal Income Tax",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        key: "selfEmployment",
        label: "Self-Employment",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        key: "capitalGains",
        label: "Capital Gains",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
        ),
    },
    {
        key: "comparison",
        label: "Tax Comparison",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
];

/* ───────────────────────── RESULT CARD ───────────────────────── */

function ResultCard({
    label,
    value,
    sub,
    accent,
    icon,
}: {
    label: string;
    value: string;
    sub?: string;
    accent?: boolean;
    icon?: React.ReactNode;
}) {
    return (
        <div
            className={`rounded-2xl p-5 animate-fade-in-up ${accent
                ? "bg-gradient-to-br from-primary to-accent-dark text-white shadow-lg shadow-primary/20"
                : "bg-white border border-gray-100 shadow-sm"
                }`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className={`text-xs font-medium mb-1 ${accent ? "text-white/70" : "text-text-secondary"}`}>
                        {label}
                    </p>
                    <p className={`text-xl sm:text-2xl font-bold ${accent ? "text-white" : "text-foreground"}`}>{value}</p>
                    {sub && (
                        <p className={`text-xs mt-1 ${accent ? "text-white/60" : "text-text-secondary"}`}>{sub}</p>
                    )}
                </div>
                {icon && (
                    <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent ? "bg-white/20" : "bg-accent-light text-primary"
                            }`}
                    >
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ───────────────────────── INPUT COMPONENT ───────────────────────── */

function MoneyInput({
    label,
    value,
    onChange,
    id,
    placeholder = "0",
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    id: string;
    placeholder?: string;
}) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-foreground mb-2">
                {label}
            </label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary font-semibold">$</span>
                <input
                    suppressHydrationWarning
                    id={id}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(formatInput(e.target.value))}
                    placeholder={placeholder}
                    className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
            </div>
        </div>
    );
}

function SelectInput({
    label,
    value,
    onChange,
    options,
    id,
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: { value: string; label: string }[];
    id: string;
}) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-semibold text-foreground mb-2">
                {label}
            </label>
            <select
                suppressHydrationWarning
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>
    );
}

/* ═══════════════════════ FEDERAL INCOME TAB ═══════════════════════ */

function FederalIncomeTab({ taxYear }: { taxYear: TaxYear }) {
    const taxData = TAX_DATA[taxYear];
    const [status, setStatus] = useState<FilingStatus>("single");
    const [income, setIncome] = useState("");
    const [otherIncome, setOtherIncome] = useState("");
    const [deductionType, setDeductionType] = useState("standard");
    const [itemizedDeduction, setItemizedDeduction] = useState("");
    const [credits, setCredits] = useState("");
    const [qualifyingChildren, setQualifyingChildren] = useState("0");
    const [taxWithheld, setTaxWithheld] = useState("");
    const [estimatedPayments, setEstimatedPayments] = useState("");
    const [result, setResult] = useState<{
        grossIncome: number;
        taxableIncome: number;
        totalTax: number;
        effectiveRate: number;
        marginalRate: number;
        breakdown: { rate: number; amount: number; rangeLabel: string }[];
        afterCredits: number;
        childCredit: number;
        totalPayments: number;
    } | null>(null);

    const calculate = () => {
        const gross = parseNum(income) + parseNum(otherIncome);
        if (gross <= 0) return;
        const deduction =
            deductionType === "standard"
                ? getStandardDeduction(taxYear, status)
                : parseNum(itemizedDeduction);
        const taxableIncome = Math.max(0, gross - deduction);
        const { total, breakdown } = calcIncomeTax(taxableIncome, status, taxYear);

        const numChildren = parseInt(qualifyingChildren) || 0;
        const childCredit = getChildTaxCreditEstimate(taxYear, status, gross, numChildren, total);
        const otherCredits = parseNum(credits);
        const afterCredits = Math.max(0, total - childCredit - otherCredits);
        const totalPayments = parseNum(taxWithheld) + parseNum(estimatedPayments);
        const marginal = getMarginalRate(taxableIncome, status, taxYear);

        setResult({
            grossIncome: gross,
            taxableIncome,
            totalTax: total,
            effectiveRate: gross > 0 ? (afterCredits / gross) * 100 : 0,
            marginalRate: marginal * 100,
            breakdown,
            afterCredits,
            childCredit,
            totalPayments,
        });
        trackCalculatorCompletion("federal_income_tax", taxYear);
    };

    return (
        <div className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Left Column: Input Form */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-100/50">
                    <div className="space-y-10">
                        {/* Filing Status */}
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">01. Filing Information</label>
                                <span className="text-[10px] font-bold text-[#00C2CB] uppercase">Step 1 of 3</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {FILING_STATUSES.map((fs) => (
                                    <label key={fs.value} className="relative cursor-pointer">
                                        <input
                                            suppressHydrationWarning
                                            checked={status === fs.value}
                                            className="peer sr-only"
                                            name="filing_status"
                                            type="radio"
                                            onChange={() => setStatus(fs.value)}
                                        />
                                        <div className="p-4 border-2 border-gray-100 rounded-xl peer-checked:border-[#00C2CB] peer-checked:bg-[#00C2CB]/5 transition-all h-full">
                                            <p className="font-bold text-[#0047AB]">{fs.label}</p>
                                            <p className="text-xs text-gray-500">
                                                {fs.value === "single" && "Individual filer"}
                                                {fs.value === "married_joint" && "Combined household"}
                                                {fs.value === "married_separate" && "Separate returns"}
                                                {fs.value === "head_of_household" && "Supporting dependents"}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Income */}
                        <div className="space-y-5">
                            <label htmlFor="federal-income" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">02. Annual Income</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0047AB] font-bold">$</span>
                                <input
                                    suppressHydrationWarning
                                    id="federal-income"
                                    className="w-full bg-gray-50 border-none rounded-xl py-4 pl-8 pr-4 focus:ring-2 focus:ring-[#00C2CB] transition-all text-xl font-bold text-[#0047AB]"
                                    placeholder="0"
                                    type="text"
                                    value={income}
                                    onChange={(e) => setIncome(formatInput(e.target.value))}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="federal-withheld" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Tax Withheld</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0047AB] font-medium">$</span>
                                        <input
                                            id="federal-withheld"
                                            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-[#00C2CB] transition-all"
                                            type="text"
                                            placeholder="0"
                                            value={taxWithheld}
                                            onChange={(e) => setTaxWithheld(formatInput(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="federal-estimated-payments" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Estimated Payments</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0047AB] font-medium">$</span>
                                        <input
                                            suppressHydrationWarning
                                            id="federal-estimated-payments"
                                            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-[#00C2CB] transition-all"
                                            type="text"
                                            placeholder="0"
                                            value={estimatedPayments}
                                            onChange={(e) => setEstimatedPayments(formatInput(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="federal-other-income" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Other Income</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0047AB] font-medium">$</span>
                                        <input
                                            suppressHydrationWarning
                                            id="federal-other-income"
                                            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-[#00C2CB] transition-all"
                                            type="text"
                                            placeholder="0"
                                            value={otherIncome}
                                            onChange={(e) => setOtherIncome(formatInput(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Deductions */}
                        <div className="space-y-5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">03. Deductions & Credits</label>
                            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                                <input
                                    suppressHydrationWarning
                                    id="federal-standard-deduction"
                                    type="checkbox"
                                    checked={deductionType === "standard"}
                                    onChange={() => setDeductionType(deductionType === "standard" ? "itemized" : "standard")}
                                    className="w-5 h-5 text-[#00C2CB] border-none rounded bg-gray-200 focus:ring-[#00C2CB]"
                                />
                                <label htmlFor="federal-standard-deduction">
                                    <span className="block font-bold text-sm">Standard Deduction</span>
                                    <p className="text-xs text-gray-500">
                                        {fmt(getStandardDeduction(taxYear, status))} for {FILING_STATUSES.find(f => f.value === status)?.label} filers in {taxYear}
                                    </p>
                                </label>
                            </div>
                            {deductionType === "itemized" && (
                                <div className="space-y-2">
                                    <label htmlFor="federal-itemized-deductions" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Itemized Deductions</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0047AB] font-medium">$</span>
                                        <input
                                            suppressHydrationWarning
                                            id="federal-itemized-deductions"
                                            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-[#00C2CB] transition-all"
                                            type="text"
                                            value={itemizedDeduction}
                                            onChange={(e) => setItemizedDeduction(formatInput(e.target.value))}
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 space-y-2">
                                    <label htmlFor="federal-other-credits" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Other Tax Credits</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0047AB] font-medium">$</span>
                                        <input
                                            suppressHydrationWarning
                                            id="federal-other-credits"
                                            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-[#00C2CB] transition-all"
                                            type="text"
                                            value={credits}
                                            onChange={(e) => setCredits(formatInput(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label htmlFor="federal-qualifying-children" className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Qualifying Children</label>
                                    <input
                                        suppressHydrationWarning
                                        id="federal-qualifying-children"
                                        type="number"
                                        min="0"
                                        value={qualifyingChildren}
                                        onChange={(e) => setQualifyingChildren(e.target.value)}
                                        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#00C2CB] transition-all"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Child tax credit estimates use {fmt(taxData.childTaxCredit)} per qualifying child before income phaseouts. They do not determine eligibility, refundable limits, SSN rules, or Schedule 8812 details.
                            </p>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <button
                                suppressHydrationWarning
                                onClick={calculate}
                                disabled={!income}
                                className="w-full bg-[#00C2CB] text-[#0047AB] font-black py-5 rounded-full shadow-xl shadow-[#00C2CB]/20 uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50"
                            >
                                Calculate My Estimate
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Results Panel */}
                <div className="lg:col-span-5 lg:sticky lg:top-32">
                    {!result ? (
                        <div className="bg-[#0047AB] p-10 rounded-2xl shadow-2xl text-center text-white space-y-6">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 flex items-center justify-center">
                                <svg className="w-10 h-10 text-[#00C2CB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold">Start your federal estimate</h3>
                            <p className="text-white/70 text-sm">
                                Enter your details to view an estimated refund or balance due, taxable income, marginal rate, and effective rate.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-[#003580] p-1 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="bg-[#0047AB] p-8 space-y-8">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00C2CB]">
                                        {result.totalPayments >= result.afterCredits ? "Estimated Refund" : "Estimated Balance Due"}
                                    </label>
                                    <div className="text-5xl font-black text-white tracking-normal mt-2">
                                        {fmt(Math.abs(result.totalPayments - result.afterCredits))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-white/70 text-sm font-light">Total Tax Liability</span>
                                        <span className="text-white font-bold">{fmt(result.afterCredits)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-white/70 text-sm font-light">Withholding + Estimated Payments</span>
                                        <span className="text-white font-bold">{fmt(result.totalPayments)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-white/70 text-sm font-light">Taxable Income</span>
                                        <span className="text-white font-bold">{fmt(result.taxableIncome)}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#00C2CB] mb-1">Marginal Rate</p>
                                        <p className="text-2xl font-black text-white">{result.marginalRate.toFixed(0)}%</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#00C2CB] mb-1">Effective Rate</p>
                                        <p className="text-2xl font-black text-white">{result.effectiveRate.toFixed(1)}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-[#D4A017] text-[#2b1705] flex items-start space-x-4">
                                <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#2b1705]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3a6 6 0 00-3.6 10.8c.6.45.9 1.05.9 1.8v.4h5.4v-.4c0-.75.3-1.35.9-1.8A6 6 0 0012 3z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.5 19h5M10.5 22h3" />
                                </svg>
                                <div>
                                    <p className="font-bold text-sm">Planning Note</p>
                                    <p className="text-xs opacity-90 leading-relaxed">
                                        {result.marginalRate > 12 
                                            ? "Tax-advantaged contributions may reduce taxable income when eligibility and cash flow allow. Review the estimate before changing payroll or retirement elections."
                                            : "This estimate is in a lower marginal bracket. Review withholding, credits, and planned deductions before filing or making estimated payments."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Tax Bracket Visualizer */}
            {result && (
                <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl mt-12 border border-gray-100">
                    <h2 className="text-2xl font-extrabold text-[#0047AB] tracking-tight mb-12">{taxYear} Tax Brackets Visualizer</h2>
                    <div className="space-y-10">
                        <div className="relative h-24 flex items-end gap-2">
                            {taxData.brackets[status].map((b, idx) => {
                                const isCurrent = result && result.taxableIncome >= b.min && result.taxableIncome < b.max;
                                return (
                                    <div key={idx} className="flex-1 flex flex-col justify-end space-y-2 group relative">
                                        {isCurrent && (
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#00C2CB] text-[#0047AB] px-3 py-1 rounded text-[10px] font-black whitespace-nowrap shadow-lg">
                                                YOUR BRACKET
                                            </div>
                                        )}
                                        <div 
                                            className={`w-full rounded-full transition-all ${isCurrent ? 'bg-[#00C2CB] shadow-lg shadow-[#00C2CB]/20' : 'bg-[#0047AB] opacity-40 hover:opacity-60'}`}
                                            style={{ height: `${(b.rate * 100) / 1.5}px` }}
                                        ></div>
                                        <span className={`text-[10px] font-bold text-center ${isCurrent ? 'text-[#00C2CB] font-black' : 'text-gray-400'}`}>{(b.rate * 100)}%</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-gray-100">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 rounded-full bg-[#00C2CB]"></div>
                                <span className="text-xs font-medium text-gray-600">Your Applicable Bracket</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 rounded-full bg-[#0047AB] opacity-40"></div>
                                <span className="text-xs font-medium text-gray-600">Other Tax Brackets</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════ SELF-EMPLOYMENT TAB ═══════════════════════ */

function SelfEmploymentTab({ taxYear }: { taxYear: TaxYear }) {
    const taxData = TAX_DATA[taxYear];
    const [status, setStatus] = useState<FilingStatus>("single");
    const [netIncome, setNetIncome] = useState("");
    const [w2Wages, setW2Wages] = useState("");
    const [result, setResult] = useState<{
        seTax: number;
        ssComponent: number;
        medicareComponent: number;
        incomeTax: number;
        totalTax: number;
        quarterlyEstimate: number;
        seDeduction: number;
        netEarningsBase: number;
    } | null>(null);

    const calculate = () => {
        const net = parseNum(netIncome);
        if (net <= 0) return;
        const wages = parseNum(w2Wages);

        const seBase = net * 0.9235;
        const owesSelfEmploymentTax = seBase >= 400;
        const remainingSocialSecurityBase = Math.max(0, taxData.ssWageBase - wages);
        const ssTax = owesSelfEmploymentTax ? Math.min(seBase, remainingSocialSecurityBase) * 0.124 : 0;
        const medicareTax = owesSelfEmploymentTax ? seBase * 0.029 : 0;
        const medicareThreshold = Math.max(0, taxData.additionalMedicareThreshold[status] - wages);
        const additionalMedicare = owesSelfEmploymentTax && seBase > medicareThreshold ? (seBase - medicareThreshold) * 0.009 : 0;
        const seTax = ssTax + medicareTax + additionalMedicare;
        const seDeduction = seTax / 2;

        const deduction = getStandardDeduction(taxYear, status);
        const taxableIncome = Math.max(0, net + wages - deduction - seDeduction);
        const { total: incomeTax } = calcIncomeTax(taxableIncome, status, taxYear);

        setResult({
            seTax,
            ssComponent: ssTax,
            medicareComponent: medicareTax + additionalMedicare,
            incomeTax,
            totalTax: seTax + incomeTax,
            quarterlyEstimate: (seTax + incomeTax) / 4,
            seDeduction,
            netEarningsBase: seBase,
        });
        trackCalculatorCompletion("self_employment_tax", taxYear);
    };

    return (
        <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-5">
                <div className="glass-card rounded-2xl p-6 space-y-5">
                    <SelectInput label="Filing Status" value={status} onChange={(val) => setStatus(val as FilingStatus)} options={FILING_STATUSES} id="se-status" />
                    <MoneyInput label="Net Self-Employment Income" value={netIncome} onChange={setNetIncome} id="se-income" placeholder="80,000" />
                    <MoneyInput label="W-2 Wage Income (optional)" value={w2Wages} onChange={setW2Wages} id="se-w2-wages" placeholder="0" />
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-amber-800">
                                Self-employment tax generally applies when net earnings are $400 or more and is calculated on 92.35% of net self-employment earnings. Use the self-employed taxpayer&apos;s own W-2 wages to reduce the remaining Social Security wage base of {fmt(taxData.ssWageBase)} for {taxYear}; a spouse has a separate wage base.
                            </p>
                        </div>
                    </div>
                    <button
                        suppressHydrationWarning
                        onClick={calculate}
                        disabled={!netIncome}
                        className="w-full py-3.5 bg-gradient-to-r from-primary to-accent-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        id="se-calculate-btn"
                    >
                        Calculate SE Tax
                    </button>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-5">
                {!result ? (
                    <div className="glass-card rounded-2xl p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-accent-light flex items-center justify-center">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Self-Employment Calculator</h3>
                        <p className="text-text-secondary text-sm max-w-sm mx-auto">
                            Enter your net self-employment income to calculate SE tax, income tax, and quarterly payments.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ResultCard
                                label="Total Combined Tax"
                                value={fmt(result.totalTax)}
                                sub="SE Tax + Income Tax"
                                accent
                                icon={
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1" />
                                    </svg>
                                }
                            />
                            <ResultCard
                                label="Quarterly Estimate"
                                value={fmt(result.quarterlyEstimate)}
                                sub="Pay by each due date"
                                icon={
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10m-5 4h5M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <ResultCard label="Self-Employment Tax" value={fmt(result.seTax)} sub={`SS: ${fmt(result.ssComponent)} + Med: ${fmt(result.medicareComponent)}`} />
                            <ResultCard label="Income Tax" value={fmt(result.incomeTax)} />
                            <ResultCard label="SE Deduction" value={fmt(result.seDeduction)} sub="50% of SE tax" />
                        </div>

                        {result.netEarningsBase < 400 && (
                            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
                                Net earnings after the 92.35% Schedule SE adjustment are below $400, so this estimate shows $0 self-employment tax. Income tax may still apply based on your full return.
                            </div>
                        )}

                        {/* Quarterly due dates */}
                        <div className="glass-card rounded-2xl p-6">
                            <h4 className="font-bold text-foreground mb-4">{taxYear} Estimated Tax Due Dates</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {taxData.estimatedTaxDueDates.map((qtr) => (
                                    <div key={qtr.q} className="bg-accent-light rounded-xl p-3 text-center">
                                        <p className="text-xs text-text-secondary">{qtr.q}</p>
                                        <p className="font-bold text-foreground text-sm">{qtr.date}</p>
                                        <p className="text-xs text-text-secondary">{qtr.period}</p>
                                        <p className="text-sm font-semibold text-primary mt-1">{fmt(result.quarterlyEstimate)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════ CAPITAL GAINS TAB ═══════════════════════ */

function CapitalGainsTab({ taxYear }: { taxYear: TaxYear }) {
    const taxData = TAX_DATA[taxYear];
    const [status, setStatus] = useState<FilingStatus>("single");
    const [ordinaryIncome, setOrdinaryIncome] = useState("");
    const [shortTermGains, setShortTermGains] = useState("");
    const [longTermGains, setLongTermGains] = useState("");
    const [result, setResult] = useState<{
        shortTermTax: number;
        longTermTax: number;
        ordinaryTax: number;
        totalTax: number;
        longTermEffectiveRate: number;
        longTermTopRate: number;
        taxableLongTermGains: number;
    } | null>(null);

    const calculate = () => {
        const ordinary = parseNum(ordinaryIncome);
        const stGains = parseNum(shortTermGains);
        const ltGains = parseNum(longTermGains);
        if (ordinary + stGains + ltGains <= 0) return;

        const deduction = getStandardDeduction(taxYear, status);
        const ordinaryLikeIncome = ordinary + stGains;
        const totalIncome = ordinaryLikeIncome + ltGains;
        const taxableIncome = Math.max(0, totalIncome - deduction);
        const taxableOrdinary = Math.min(taxableIncome, Math.max(0, ordinaryLikeIncome - deduction));
        const ordinaryOnlyTaxable = Math.min(taxableOrdinary, Math.max(0, ordinary - deduction));
        const taxableLongTermGains = Math.max(0, taxableIncome - taxableOrdinary);

        // Short-term gains are taxed as ordinary income
        const { total: combinedTax } = calcIncomeTax(taxableOrdinary, status, taxYear);
        const { total: baseTax } = calcIncomeTax(ordinaryOnlyTaxable, status, taxYear);
        const shortTermTax = combinedTax - baseTax;

        // Long-term gains
        const cgBrackets = taxData.longTermCgBrackets[status];
        let ltTax = 0;
        let remainingGains = taxableLongTermGains;
        let baseForCG = taxableOrdinary; // long-term gains stack on top of ordinary taxable income
        let topRate = 0;

        for (const bracket of cgBrackets) {
            if (remainingGains <= 0) break;
            const roomInBracket = Math.max(0, bracket.max - baseForCG);
            const gainsInBracket = Math.min(remainingGains, roomInBracket);
            ltTax += gainsInBracket * bracket.rate;
            if (gainsInBracket > 0) topRate = bracket.rate;
            baseForCG += gainsInBracket;
            remainingGains -= gainsInBracket;
        }

        setResult({
            shortTermTax,
            longTermTax: ltTax,
            ordinaryTax: baseTax,
            totalTax: combinedTax + ltTax,
            longTermEffectiveRate: taxableLongTermGains > 0 ? (ltTax / taxableLongTermGains) * 100 : 0,
            longTermTopRate: topRate * 100,
            taxableLongTermGains,
        });
        trackCalculatorCompletion("capital_gains_tax", taxYear);
    };

    return (
        <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-5">
                <div className="glass-card rounded-2xl p-6 space-y-5">
                    <SelectInput label="Filing Status" value={status} onChange={(val) => setStatus(val as FilingStatus)} options={FILING_STATUSES} id="cg-status" />
                    <MoneyInput label="Ordinary Income" value={ordinaryIncome} onChange={setOrdinaryIncome} id="cg-ordinary" placeholder="75,000" />
                    <MoneyInput label="Short-Term Capital Gains" value={shortTermGains} onChange={setShortTermGains} id="cg-short" placeholder="0" />
                    <MoneyInput label="Long-Term Capital Gains" value={longTermGains} onChange={setLongTermGains} id="cg-long" placeholder="20,000" />
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-blue-800">
                                Short-term gains (assets held one year or less) are taxed as ordinary income. Long-term gains use the {taxYear} 0%, 15%, or 20% thresholds and do not include NIIT.
                            </p>
                        </div>
                    </div>
                    <button
                        suppressHydrationWarning
                        onClick={calculate}
                        disabled={!ordinaryIncome && !shortTermGains && !longTermGains}
                        className="w-full py-3.5 bg-gradient-to-r from-primary to-accent-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        id="cg-calculate-btn"
                    >
                        Calculate Capital Gains Tax
                    </button>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-5">
                {!result ? (
                    <div className="glass-card rounded-2xl p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-accent-light flex items-center justify-center">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Capital Gains Calculator</h3>
                        <p className="text-text-secondary text-sm max-w-sm mx-auto">
                            Calculate tax on your investment gains, including both short-term and long-term capital gains.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ResultCard
                                label="Total Tax"
                                value={fmt(result.totalTax)}
                                sub="All income + gains"
                                accent
                                icon={
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1" />
                                    </svg>
                                }
                            />
                            <ResultCard
                                label="LT CG Effective Rate"
                                value={`${result.longTermEffectiveRate.toFixed(1)}%`}
                                sub={result.taxableLongTermGains > 0 ? `Top applied rate: ${result.longTermTopRate.toFixed(0)}%` : "No taxable LT gains"}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <ResultCard label="Ordinary Income Tax" value={fmt(result.ordinaryTax)} />
                            <ResultCard label="Short-Term CG Tax" value={fmt(result.shortTermTax)} sub="Taxed as ordinary" />
                            <ResultCard label="Long-Term CG Tax" value={fmt(result.longTermTax)} sub="Preferential rate" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════ COMPARISON TAB ═══════════════════════ */

function ComparisonTab({ taxYear }: { taxYear: TaxYear }) {
    const [statusA, setStatusA] = useState<FilingStatus>("single");
    const [incomeA, setIncomeA] = useState("");
    const [deductionA, setDeductionA] = useState("");
    const [statusB, setStatusB] = useState<FilingStatus>("married_joint");
    const [incomeB, setIncomeB] = useState("");
    const [deductionB, setDeductionB] = useState("");
    const [result, setResult] = useState<{
        taxA: number;
        rateA: number;
        taxB: number;
        rateB: number;
        savings: number;
        better: "A" | "B" | "equal";
    } | null>(null);

    const calculate = () => {
        const grossA = parseNum(incomeA);
        const grossB = parseNum(incomeB);
        if (grossA <= 0 && grossB <= 0) return;

        const dedA = parseNum(deductionA) || getStandardDeduction(taxYear, statusA);
        const dedB = parseNum(deductionB) || getStandardDeduction(taxYear, statusB);
        const taxableA = Math.max(0, grossA - dedA);
        const taxableB = Math.max(0, grossB - dedB);
        const { total: taxA } = calcIncomeTax(taxableA, statusA, taxYear);
        const { total: taxB } = calcIncomeTax(taxableB, statusB, taxYear);

        setResult({
            taxA,
            rateA: grossA > 0 ? (taxA / grossA) * 100 : 0,
            taxB,
            rateB: grossB > 0 ? (taxB / grossB) * 100 : 0,
            savings: Math.abs(taxA - taxB),
            better: taxA < taxB ? "A" : taxB < taxA ? "B" : "equal",
        });
        trackCalculatorCompletion("scenario_comparison", taxYear);
    };

    return (
        <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Scenario A */}
                <div className="glass-card rounded-2xl p-6 space-y-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-400" />
                    <h4 className="font-bold text-foreground flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-primary text-white text-sm flex items-center justify-center font-bold">A</span>
                        Scenario A
                    </h4>
                    <SelectInput label="Filing Status" value={statusA} onChange={(val) => setStatusA(val as FilingStatus)} options={FILING_STATUSES} id="cmp-status-a" />
                    <MoneyInput label="Gross Annual Income" value={incomeA} onChange={setIncomeA} id="cmp-income-a" placeholder="100,000" />
                    <MoneyInput label="Deductions (leave blank for standard)" value={deductionA} onChange={setDeductionA} id="cmp-ded-a" placeholder={`${new Intl.NumberFormat("en-US").format(getStandardDeduction(taxYear, statusA))}`} />
                </div>

                {/* Scenario B */}
                <div className="glass-card rounded-2xl p-6 space-y-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-dark to-purple-400" />
                    <h4 className="font-bold text-foreground flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-accent-dark text-white text-sm flex items-center justify-center font-bold">B</span>
                        Scenario B
                    </h4>
                    <SelectInput label="Filing Status" value={statusB} onChange={(val) => setStatusB(val as FilingStatus)} options={FILING_STATUSES} id="cmp-status-b" />
                    <MoneyInput label="Gross Annual Income" value={incomeB} onChange={setIncomeB} id="cmp-income-b" placeholder="100,000" />
                    <MoneyInput label="Deductions (leave blank for standard)" value={deductionB} onChange={setDeductionB} id="cmp-ded-b" placeholder={`${new Intl.NumberFormat("en-US").format(getStandardDeduction(taxYear, statusB))}`} />
                </div>
            </div>

            <button
                suppressHydrationWarning
                onClick={calculate}
                disabled={!incomeA && !incomeB}
                className="w-full py-3.5 bg-gradient-to-r from-primary to-accent-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer max-w-md mx-auto block"
                id="cmp-calculate-btn"
            >
                Compare Scenarios
            </button>

            {result && (
                <div className="space-y-5 animate-fade-in-up">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <ResultCard label="Scenario A Tax" value={fmt(result.taxA)} sub={`Effective rate: ${result.rateA.toFixed(1)}%`} />
                        <ResultCard
                            label="Estimated Difference"
                            value={fmt(result.savings)}
                            sub={result.better === "equal" ? "Same estimated tax" : `Scenario ${result.better} estimates lower`}
                            accent
                            icon={
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            }
                        />
                        <ResultCard label="Scenario B Tax" value={fmt(result.taxB)} sub={`Effective rate: ${result.rateB.toFixed(1)}%`} />
                    </div>

                    {result.better !== "equal" && (
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-green-800">
                                        Scenario {result.better} estimates {fmt(result.savings)} lower federal tax
                                    </p>
                                    <p className="text-sm text-green-700">
                                        Use this as a planning comparison, not a guaranteed tax savings amount.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

export default function TaxCalculatorClient() {
    const [activeTab, setActiveTab] = useState<TabKey>("federal");
    const [taxYear, setTaxYear] = useState<TaxYear>("2026");
    const taxData = TAX_DATA[taxYear];

    return (
        <main>
            {/* Hero Header */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden" style={{ background: "linear-gradient(to bottom, #0047AB, #002D6E)" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#00C2CB] transition-colors mb-8"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Link>
                        
                        <div className="inline-flex items-center space-x-2 bg-[#00C2CB]/20 border border-[#00C2CB]/30 px-4 py-1.5 rounded-full mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#00C2CB] animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00C2CB]">Free 2025 + 2026 Tax Estimator</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-normal text-white mb-6">
                            2025 and 2026 Federal Tax Calculator & Refund Estimator
                        </h1>
                        
                        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                            Estimate your federal tax picture for 2025 filing or 2026 planning, then see how filing status, deductions, credits, and other income can change the result.
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-[#00C2CB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-xs font-bold uppercase tracking-widest text-white/80">IRS-sourced tables</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-[#00C2CB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs font-bold uppercase tracking-widest text-white/80">No account required</span>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#tax-estimator"
                                className="inline-flex items-center justify-center rounded-xl bg-[#00C2CB] px-5 py-3 text-sm font-black uppercase tracking-wider text-[#003580] hover:bg-white transition-colors"
                            >
                                Start estimate
                            </a>
                            <Link
                                href="/tax-calculator-guide"
                                className="inline-flex items-center justify-center rounded-xl border border-white/25 px-5 py-3 text-sm font-black uppercase tracking-wider text-white hover:border-[#00C2CB] hover:text-[#00C2CB] transition-colors"
                            >
                                Read calculator guide
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tab Navigation */}
            <section className="sticky top-[68px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
                        {TABS.map((tab) => (
                            <button
                                suppressHydrationWarning
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${activeTab === tab.key
                                    ? "bg-[#0047AB] text-white shadow-md shadow-[#0047AB]/20"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-[#0047AB]"
                                    }`}
                                id={`tab-${tab.key}`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tab Content */}
            <section className="section-padding bg-section-bg min-h-[600px]" id="tax-estimator">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="mb-8 bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Tax Year</p>
                                <p className="text-sm font-semibold text-[#0047AB] mt-1">{taxData.description}</p>
                                <p className="text-xs text-gray-500 mt-1">{taxData.sourceNote}; {taxData.filingYear}. Last reviewed June 16, 2026.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:w-auto w-full">
                                {TAX_YEAR_OPTIONS.map((option) => (
                                    <button
                                        suppressHydrationWarning
                                        key={option.value}
                                        type="button"
                                        onClick={() => setTaxYear(option.value)}
                                        className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${taxYear === option.value
                                            ? "bg-[#0047AB] text-white shadow-md shadow-[#0047AB]/20"
                                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {activeTab === "federal" && <FederalIncomeTab key={`federal-${taxYear}`} taxYear={taxYear} />}
                    {activeTab === "selfEmployment" && <SelfEmploymentTab key={`se-${taxYear}`} taxYear={taxYear} />}
                    {activeTab === "capitalGains" && <CapitalGainsTab key={`cg-${taxYear}`} taxYear={taxYear} />}
                    {activeTab === "comparison" && <ComparisonTab key={`cmp-${taxYear}`} taxYear={taxYear} />}
                </div>
            </section>

            {/* Disclaimer */}
            <section className="py-10 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-xs text-text-secondary leading-relaxed">
                        <strong>Disclaimer:</strong> This calculator provides estimates based on selected-year federal brackets, standard deductions, Social Security wage bases, and long-term capital-gain thresholds.
                        It does not account for state taxes, AMT, NIIT, QBI, most phase-outs, refundable-credit limits, local taxes, or every deduction and credit.
                        Results are for informational purposes only. For personalized tax advice,{" "}
                        <Link href="/contact" className="text-primary hover:underline font-medium">
                            consult our tax professionals
                        </Link>.
                    </p>
                </div>
            </section>

            {/* Source and Trust Section */}
            <section className="py-14 bg-slate-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00C2CB] mb-3">
                            IRS-source-backed estimate
                        </p>
                        <h2 className="text-3xl font-black text-[#003580] tracking-normal">
                            Tax data used by this calculator
                        </h2>
                        <p className="text-sm text-slate-600 leading-relaxed mt-4">
                            The estimator uses selected-year federal brackets, standard deduction amounts,
                            long-term capital-gain thresholds, Child Tax Credit amounts, and Social Security
                            wage bases from official IRS and SSA sources. For a deeper walkthrough, read the{" "}
                            <Link href="/tax-calculator-guide" className="text-[#0057b8] font-semibold hover:underline">
                                2025 and 2026 federal tax calculator guide
                            </Link>.
                        </p>
                    </div>
                    <div className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
                        {CALCULATOR_SOURCE_LINKS.map((source) => (
                            <a
                                key={source.href}
                                href={source.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white border border-slate-200 rounded-xl p-4 text-sm font-semibold text-[#0057b8] hover:text-[#003580] hover:border-[#00C2CB] transition-colors"
                            >
                                {source.label}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <DataTablesSection taxYear={taxYear} />
            <LimitationsSection />
            <CalculatorFaqSection />
            <RelatedResourcesSection />

            {/* Info Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-[#0047AB]/5 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#0047AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-extrabold text-[#0047AB]">How We Calculate</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">Our engine uses selected-year IRS-published federal tax tables, standard deductions, and capital-gain thresholds. It aggregates income, subtracts deductions, and applies marginal brackets to estimate the taxable base.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-[#0047AB]/5 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#0047AB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-extrabold text-[#0047AB]">When to Update</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">Recalculate your estimate whenever you experience a major life event: marriage, a new child, a significant raise, or the purchase of a new home to ensure withholding accuracy.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-[#00C2CB]/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-[#00C2CB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10c0-2.21-.6-4.28-1.644-6.056" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-extrabold text-[#00C2CB]">Pro Tip</h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">Plan ahead by reviewing tax-advantaged contributions, withholding, and estimated payments before key filing-year deadlines.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
                <div className="bg-[#0b1320] rounded-[2rem] p-8 md:p-16 relative overflow-hidden flex flex-col md:grid md:grid-cols-12 items-center justify-between gap-12">
                    <div className="relative z-10 md:col-span-7 max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-normal mb-6">Need a reviewed estimate?</h2>
                        <p className="text-gray-400 text-lg font-light mb-8">Calculators are helpful for planning, but complete tax documents can change the final number. Book a review with an IntegraFin tax professional.</p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#00C2CB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <a href="tel:+18326471819" className="text-white font-medium hover:text-[#00C2CB] transition-colors">+1-832-647-1819</a>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#00C2CB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <a href="mailto:contact@integrafin.tax" className="text-white font-medium hover:text-[#00C2CB] transition-colors">contact@integrafin.tax</a>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 md:col-span-5 w-full bg-white p-8 rounded-2xl shadow-2xl">
                        <div className="space-y-5">
                            <h3 className="text-2xl font-black text-[#003580] tracking-normal">Ready for a reviewed estimate?</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Send your details through the contact form for team follow-up and next-step information.
                            </p>
                            <Link href="/contact" className="w-full inline-flex justify-center bg-[#0047AB] text-white font-black py-4 rounded-xl shadow-lg shadow-[#0047AB]/20 uppercase tracking-[0.2em] transition-all hover:bg-[#003580]">
                                Book a tax review
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
