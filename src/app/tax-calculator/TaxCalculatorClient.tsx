"use client";
import { useState } from "react";
import Link from "next/link";

/* ───────────────────────── 2024 TAX DATA ───────────────────────── */

const FILING_STATUSES = [
    { value: "single", label: "Single" },
    { value: "married_joint", label: "Married Filing Jointly" },
    { value: "married_separate", label: "Married Filing Separately" },
    { value: "head_of_household", label: "Head of Household" },
];

const TAX_BRACKETS: Record<string, { rate: number; min: number; max: number }[]> = {
    single: [
        { rate: 0.10, min: 0, max: 11600 },
        { rate: 0.12, min: 11600, max: 47150 },
        { rate: 0.22, min: 47150, max: 100525 },
        { rate: 0.24, min: 100525, max: 191950 },
        { rate: 0.32, min: 191950, max: 243725 },
        { rate: 0.35, min: 243725, max: 609350 },
        { rate: 0.37, min: 609350, max: Infinity },
    ],
    married_joint: [
        { rate: 0.10, min: 0, max: 23200 },
        { rate: 0.12, min: 23200, max: 94300 },
        { rate: 0.22, min: 94300, max: 201050 },
        { rate: 0.24, min: 201050, max: 383900 },
        { rate: 0.32, min: 383900, max: 487450 },
        { rate: 0.35, min: 487450, max: 731200 },
        { rate: 0.37, min: 731200, max: Infinity },
    ],
    married_separate: [
        { rate: 0.10, min: 0, max: 11600 },
        { rate: 0.12, min: 11600, max: 47150 },
        { rate: 0.22, min: 47150, max: 100525 },
        { rate: 0.24, min: 100525, max: 191950 },
        { rate: 0.32, min: 191950, max: 243725 },
        { rate: 0.35, min: 243725, max: 365600 },
        { rate: 0.37, min: 365600, max: Infinity },
    ],
    head_of_household: [
        { rate: 0.10, min: 0, max: 16550 },
        { rate: 0.12, min: 16550, max: 63100 },
        { rate: 0.22, min: 63100, max: 100500 },
        { rate: 0.24, min: 100500, max: 191950 },
        { rate: 0.32, min: 191950, max: 243700 },
        { rate: 0.35, min: 243700, max: 609350 },
        { rate: 0.37, min: 609350, max: Infinity },
    ],
};

const STANDARD_DEDUCTION: Record<string, number> = {
    single: 14600,
    married_joint: 29200,
    married_separate: 14600,
    head_of_household: 21900,
};

const LONG_TERM_CG_BRACKETS: Record<string, { rate: number; max: number }[]> = {
    single: [
        { rate: 0, max: 47025 },
        { rate: 0.15, max: 518900 },
        { rate: 0.20, max: Infinity },
    ],
    married_joint: [
        { rate: 0, max: 94050 },
        { rate: 0.15, max: 583750 },
        { rate: 0.20, max: Infinity },
    ],
    married_separate: [
        { rate: 0, max: 47025 },
        { rate: 0.15, max: 291850 },
        { rate: 0.20, max: Infinity },
    ],
    head_of_household: [
        { rate: 0, max: 63000 },
        { rate: 0.15, max: 551350 },
        { rate: 0.20, max: Infinity },
    ],
};

/* ───────────────────────── HELPERS ───────────────────────── */

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

function calcIncomeTax(taxableIncome: number, filingStatus: string) {
    const brackets = TAX_BRACKETS[filingStatus] || TAX_BRACKETS.single;
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
            rangeLabel: `${fmt(b.min)} – ${b.max === Infinity ? "∞" : fmt(b.max)}`,
        });
    }
    return { total, breakdown };
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

function FederalIncomeTab() {
    const [status, setStatus] = useState("single");
    const [income, setIncome] = useState("");
    const [deductionType, setDeductionType] = useState("standard");
    const [itemizedDeduction, setItemizedDeduction] = useState("");
    const [credits, setCredits] = useState("");
    const [dependents, setDependents] = useState("0");
    const [taxWithheld, setTaxWithheld] = useState("");
    const [result, setResult] = useState<{
        taxableIncome: number;
        totalTax: number;
        effectiveRate: number;
        marginalRate: number;
        breakdown: { rate: number; amount: number; rangeLabel: string }[];
        afterCredits: number;
        childCredit: number;
    } | null>(null);

    const calculate = () => {
        const gross = parseNum(income);
        if (gross <= 0) return;
        const deduction =
            deductionType === "standard"
                ? STANDARD_DEDUCTION[status] || 14600
                : parseNum(itemizedDeduction);
        const taxableIncome = Math.max(0, gross - deduction);
        const { total, breakdown } = calcIncomeTax(taxableIncome, status);

        const numDep = parseInt(dependents) || 0;
        const childCredit = Math.min(numDep * 2000, total);
        const otherCredits = parseNum(credits);
        const afterCredits = Math.max(0, total - childCredit - otherCredits);

        const brackets = TAX_BRACKETS[status] || TAX_BRACKETS.single;
        const marginal = brackets.find(
            (b) => taxableIncome >= b.min && taxableIncome < b.max
        )?.rate ?? 0;

        setResult({
            taxableIncome,
            totalTax: total,
            effectiveRate: gross > 0 ? (afterCredits / gross) * 100 : 0,
            marginalRate: marginal * 100,
            breakdown,
            afterCredits,
            childCredit,
        });
    };

    const maxBracket = result?.breakdown.reduce((a, b) => (b.amount > a ? b.amount : a), 0) || 1;

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
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">02. Annual Income</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0047AB] font-bold">$</span>
                                <input
                                    className="w-full bg-gray-50 border-none rounded-xl py-4 pl-8 pr-4 focus:ring-2 focus:ring-[#00C2CB] transition-all text-xl font-bold text-[#0047AB]"
                                    placeholder="0"
                                    type="text"
                                    value={income}
                                    onChange={(e) => setIncome(formatInput(e.target.value))}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Tax Withheld</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0047AB] font-medium">$</span>
                                        <input
                                            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-[#00C2CB] transition-all"
                                            type="text"
                                            placeholder="0"
                                            value={taxWithheld}
                                            onChange={(e) => setTaxWithheld(formatInput(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Other Income</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0047AB] font-medium">$</span>
                                        <input
                                            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-[#00C2CB] transition-all"
                                            type="text"
                                            placeholder="0"
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
                                    type="checkbox"
                                    checked={deductionType === "standard"}
                                    onChange={() => setDeductionType(deductionType === "standard" ? "itemized" : "standard")}
                                    className="w-5 h-5 text-[#00C2CB] border-none rounded bg-gray-200 focus:ring-[#00C2CB]"
                                />
                                <div>
                                    <p className="font-bold text-sm">Standard Deduction</p>
                                    <p className="text-xs text-gray-500">
                                        {fmt(STANDARD_DEDUCTION[status] || 14600)} for {FILING_STATUSES.find(f => f.value === status)?.label} filers in 2024
                                    </p>
                                </div>
                            </div>
                            {deductionType === "itemized" && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Itemized Deductions</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0047AB] font-medium">$</span>
                                        <input
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
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Other Tax Credits</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0047AB] font-medium">$</span>
                                        <input
                                            className="w-full bg-gray-50 border-none rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-[#00C2CB] transition-all"
                                            type="text"
                                            value={credits}
                                            onChange={(e) => setCredits(formatInput(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Dependents</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={dependents}
                                        onChange={(e) => setDependents(e.target.value)}
                                        className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#00C2CB] transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <button
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
                            <h3 className="text-xl font-bold">Calculate Your Liability</h3>
                            <p className="text-white/70 text-sm">
                                Enter your details to view your estimated refund or balance due, visual brackets, and strategic insights.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-[#003580] p-1 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="bg-[#0047AB] p-8 space-y-8">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00C2CB]">
                                        {parseNum(taxWithheld) >= result.afterCredits ? "Estimated Refund" : "Estimated Balance Due"}
                                    </label>
                                    <div className="text-5xl font-black text-white tracking-tighter mt-2">
                                        {fmt(Math.abs(parseNum(taxWithheld) - result.afterCredits))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-white/70 text-sm font-light">Total Tax Liability</span>
                                        <span className="text-white font-bold">{fmt(result.afterCredits)}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                                        <span className="text-white/70 text-sm font-light">Taxes Paid to Date</span>
                                        <span className="text-white font-bold">{fmt(parseNum(taxWithheld))}</span>
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
                                <span className="material-symbols-outlined text-[#2b1705]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                                <div>
                                    <p className="font-bold text-sm">Strategic Insight</p>
                                    <p className="text-xs opacity-90 leading-relaxed">
                                        {result.marginalRate > 12 
                                            ? "Consider increasing your 401(k) contribution to reduce your taxable income and potentially drop into a lower tax bracket."
                                            : "You are currently in a lower tax bracket. Consider tax-advantaged investments while rates are favorable."}
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
                    <h2 className="text-2xl font-extrabold text-[#0047AB] tracking-tight mb-12">2024 Tax Brackets Visualizer</h2>
                    <div className="space-y-10">
                        <div className="relative h-24 flex items-end gap-2">
                            {TAX_BRACKETS[status].map((b, idx) => {
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

function SelfEmploymentTab() {
    const [status, setStatus] = useState("single");
    const [netIncome, setNetIncome] = useState("");
    const [result, setResult] = useState<{
        seTax: number;
        ssComponent: number;
        medicareComponent: number;
        incomeTax: number;
        totalTax: number;
        quarterlyEstimate: number;
        seDeduction: number;
    } | null>(null);

    const calculate = () => {
        const net = parseNum(netIncome);
        if (net <= 0) return;

        const seBase = net * 0.9235;
        const ssCap = 168600; // 2024 SS cap
        const ssTax = Math.min(seBase, ssCap) * 0.124;
        const medicareTax = seBase * 0.029;
        const additionalMedicare = seBase > 200000 ? (seBase - 200000) * 0.009 : 0;
        const seTax = ssTax + medicareTax + additionalMedicare;
        const seDeduction = seTax / 2;

        const deduction = STANDARD_DEDUCTION[status] || 14600;
        const taxableIncome = Math.max(0, net - deduction - seDeduction);
        const { total: incomeTax } = calcIncomeTax(taxableIncome, status);

        setResult({
            seTax,
            ssComponent: ssTax,
            medicareComponent: medicareTax + additionalMedicare,
            incomeTax,
            totalTax: seTax + incomeTax,
            quarterlyEstimate: (seTax + incomeTax) / 4,
            seDeduction,
        });
    };

    return (
        <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-5">
                <div className="glass-card rounded-2xl p-6 space-y-5">
                    <SelectInput label="Filing Status" value={status} onChange={setStatus} options={FILING_STATUSES} id="se-status" />
                    <MoneyInput label="Net Self-Employment Income" value={netIncome} onChange={setNetIncome} id="se-income" placeholder="80,000" />
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-amber-800">
                                Self-employment tax is 15.3% (12.4% Social Security + 2.9% Medicare) on 92.35% of your net self-employment earnings.
                            </p>
                        </div>
                    </div>
                    <button
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

                        {/* Quarterly due dates */}
                        <div className="glass-card rounded-2xl p-6">
                            <h4 className="font-bold text-foreground mb-4">2024 Quarterly Due Dates</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { q: "Q1", date: "Apr 15", period: "Jan–Mar" },
                                    { q: "Q2", date: "Jun 16", period: "Apr–May" },
                                    { q: "Q3", date: "Sep 15", period: "Jun–Aug" },
                                    { q: "Q4", date: "Jan 15", period: "Sep–Dec" },
                                ].map((qtr) => (
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

function CapitalGainsTab() {
    const [status, setStatus] = useState("single");
    const [ordinaryIncome, setOrdinaryIncome] = useState("");
    const [shortTermGains, setShortTermGains] = useState("");
    const [longTermGains, setLongTermGains] = useState("");
    const [result, setResult] = useState<{
        shortTermTax: number;
        longTermTax: number;
        ordinaryTax: number;
        totalTax: number;
        longTermRate: number;
    } | null>(null);

    const calculate = () => {
        const ordinary = parseNum(ordinaryIncome);
        const stGains = parseNum(shortTermGains);
        const ltGains = parseNum(longTermGains);
        if (ordinary + stGains + ltGains <= 0) return;

        const deduction = STANDARD_DEDUCTION[status] || 14600;
        const ordinaryTaxable = Math.max(0, ordinary - deduction);

        // Short-term gains are taxed as ordinary income
        const combinedOrdinary = ordinaryTaxable + stGains;
        const { total: combinedTax } = calcIncomeTax(combinedOrdinary, status);
        const { total: baseTax } = calcIncomeTax(ordinaryTaxable, status);
        const shortTermTax = combinedTax - baseTax;

        // Long-term gains
        const cgBrackets = LONG_TERM_CG_BRACKETS[status] || LONG_TERM_CG_BRACKETS.single;
        let ltTax = 0;
        let remainingGains = ltGains;
        let baseForCG = combinedOrdinary; // stack on top of ordinary + ST
        let appliedRate = 0;

        for (const bracket of cgBrackets) {
            if (remainingGains <= 0) break;
            const roomInBracket = Math.max(0, bracket.max - baseForCG);
            const gainsInBracket = Math.min(remainingGains, roomInBracket);
            ltTax += gainsInBracket * bracket.rate;
            if (gainsInBracket > 0) appliedRate = bracket.rate;
            baseForCG += gainsInBracket;
            remainingGains -= gainsInBracket;
        }

        setResult({
            shortTermTax,
            longTermTax: ltTax,
            ordinaryTax: baseTax,
            totalTax: combinedTax + ltTax,
            longTermRate: appliedRate * 100,
        });
    };

    return (
        <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-5">
                <div className="glass-card rounded-2xl p-6 space-y-5">
                    <SelectInput label="Filing Status" value={status} onChange={setStatus} options={FILING_STATUSES} id="cg-status" />
                    <MoneyInput label="Ordinary Income" value={ordinaryIncome} onChange={setOrdinaryIncome} id="cg-ordinary" placeholder="75,000" />
                    <MoneyInput label="Short-Term Capital Gains" value={shortTermGains} onChange={setShortTermGains} id="cg-short" placeholder="0" />
                    <MoneyInput label="Long-Term Capital Gains" value={longTermGains} onChange={setLongTermGains} id="cg-long" placeholder="20,000" />
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs text-blue-800">
                                Short-term gains (assets held &lt; 1 year) are taxed as ordinary income. Long-term gains get preferential rates of 0%, 15%, or 20%.
                            </p>
                        </div>
                    </div>
                    <button
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
                            <ResultCard label="Long-Term CG Rate" value={`${result.longTermRate.toFixed(0)}%`} sub="Your effective LT rate" />
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

function ComparisonTab() {
    const [statusA, setStatusA] = useState("single");
    const [incomeA, setIncomeA] = useState("");
    const [deductionA, setDeductionA] = useState("");
    const [statusB, setStatusB] = useState("married_joint");
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

        const dedA = parseNum(deductionA) || STANDARD_DEDUCTION[statusA] || 14600;
        const dedB = parseNum(deductionB) || STANDARD_DEDUCTION[statusB] || 14600;
        const taxableA = Math.max(0, grossA - dedA);
        const taxableB = Math.max(0, grossB - dedB);
        const { total: taxA } = calcIncomeTax(taxableA, statusA);
        const { total: taxB } = calcIncomeTax(taxableB, statusB);

        setResult({
            taxA,
            rateA: grossA > 0 ? (taxA / grossA) * 100 : 0,
            taxB,
            rateB: grossB > 0 ? (taxB / grossB) * 100 : 0,
            savings: Math.abs(taxA - taxB),
            better: taxA < taxB ? "A" : taxB < taxA ? "B" : "equal",
        });
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
                    <SelectInput label="Filing Status" value={statusA} onChange={setStatusA} options={FILING_STATUSES} id="cmp-status-a" />
                    <MoneyInput label="Gross Annual Income" value={incomeA} onChange={setIncomeA} id="cmp-income-a" placeholder="100,000" />
                    <MoneyInput label="Deductions (leave blank for standard)" value={deductionA} onChange={setDeductionA} id="cmp-ded-a" placeholder={`${new Intl.NumberFormat("en-US").format(STANDARD_DEDUCTION[statusA] || 14600)}`} />
                </div>

                {/* Scenario B */}
                <div className="glass-card rounded-2xl p-6 space-y-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-dark to-purple-400" />
                    <h4 className="font-bold text-foreground flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-accent-dark text-white text-sm flex items-center justify-center font-bold">B</span>
                        Scenario B
                    </h4>
                    <SelectInput label="Filing Status" value={statusB} onChange={setStatusB} options={FILING_STATUSES} id="cmp-status-b" />
                    <MoneyInput label="Gross Annual Income" value={incomeB} onChange={setIncomeB} id="cmp-income-b" placeholder="100,000" />
                    <MoneyInput label="Deductions (leave blank for standard)" value={deductionB} onChange={setDeductionB} id="cmp-ded-b" placeholder={`${new Intl.NumberFormat("en-US").format(STANDARD_DEDUCTION[statusB] || 14600)}`} />
                </div>
            </div>

            <button
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
                            label="Potential Savings"
                            value={fmt(result.savings)}
                            sub={result.better === "equal" ? "Same tax" : `Scenario ${result.better} saves more`}
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
                                        Scenario {result.better} is better by {fmt(result.savings)}
                                    </p>
                                    <p className="text-sm text-green-700">
                                        You could save {fmt(result.savings)} per year by choosing Scenario {result.better}.
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

    return (
        <>
            {/* Hero Header */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden" style={{ background: "linear-gradient(to bottom, #0047AB, #002D6E)" }}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C2CB] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                </div>

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
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00C2CB]">Free 2024 Tax Estimator</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter text-white mb-6">
                            Calculate Your Tax <br />
                            <span className="text-[#00C2CB]">Refund Instantly.</span>
                        </h1>
                        
                        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                            Professional-grade federal tax estimation built for institutional precision. 
                            Get clear insights into your 2024 liability across multiple tax profiles.
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-[#00C2CB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-xs font-bold uppercase tracking-widest text-white/80">IRS Compliant</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 text-[#00C2CB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs font-bold uppercase tracking-widest text-white/80">Bank-Level Security</span>
                            </div>
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
            <section className="section-padding bg-section-bg min-h-[600px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {activeTab === "federal" && <FederalIncomeTab />}
                    {activeTab === "selfEmployment" && <SelfEmploymentTab />}
                    {activeTab === "capitalGains" && <CapitalGainsTab />}
                    {activeTab === "comparison" && <ComparisonTab />}
                </div>
            </section>

            {/* Disclaimer */}
            <section className="py-10 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-xs text-text-secondary leading-relaxed">
                        <strong>Disclaimer:</strong> This calculator provides estimates based on 2024 federal tax brackets and standard deductions.
                        It does not account for state taxes, AMT, NIIT, phase-outs, or specific tax credits beyond those listed.
                        Results are for informational purposes only. For personalized tax advice,{" "}
                        <Link href="/contact" className="text-primary hover:underline font-medium">
                            consult our tax professionals
                        </Link>.
                    </p>
                </div>
            </section>

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
                        <p className="text-sm text-gray-600 leading-relaxed">Our engine uses the most recent 2024 IRS tax tables and standard deduction rates. We apply a sequential logic of income aggregation followed by deduction subtraction to reach your taxable base.</p>
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
                        <p className="text-sm text-gray-600 leading-relaxed font-medium">Maximize your refund by contributing to tax-advantaged accounts like IRAs or HSAs before the April deadline to retroactively lower your 2024 taxable income.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
                <div className="bg-[#0b1320] rounded-[2rem] p-8 md:p-16 relative overflow-hidden flex flex-col md:grid md:grid-cols-12 items-center justify-between gap-12">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C2CB] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    
                    <div className="relative z-10 md:col-span-7 max-w-xl">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6">Want the Exact Number?</h2>
                        <p className="text-gray-400 text-lg font-light mb-8">Calculators are great for estimates, but tax codes are complex. Book a diagnostic with an IntegraFin senior architect.</p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#00C2CB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="text-white font-medium">+1-832-647-1819</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#00C2CB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span className="text-white font-medium">contact@integrafin.tax</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 md:col-span-5 w-full bg-white p-8 rounded-2xl shadow-2xl">
                        <form className="space-y-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Full Name</label>
                                <input className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#00C2CB] transition-all" placeholder="John Doe" type="text" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Work Email</label>
                                <input className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#00C2CB] transition-all" placeholder="john@company.com" type="email" />
                            </div>
                            <button className="w-full bg-[#0047AB] text-white font-black py-4 rounded-xl shadow-lg shadow-[#0047AB]/20 uppercase tracking-[0.2em] transition-all hover:bg-[#003580] cursor-pointer">
                                Request Consultation
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
