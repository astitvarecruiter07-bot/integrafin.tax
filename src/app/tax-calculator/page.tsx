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
        <div className="grid lg:grid-cols-5 gap-8">
            {/* Inputs - 2 cols */}
            <div className="lg:col-span-2 space-y-5">
                <div className="glass-card rounded-2xl p-6 space-y-5">
                    <SelectInput label="Filing Status" value={status} onChange={setStatus} options={FILING_STATUSES} id="fed-status" />
                    <MoneyInput label="Gross Annual Income" value={income} onChange={setIncome} id="fed-income" placeholder="100,000" />
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Deduction Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            {["standard", "itemized"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setDeductionType(type)}
                                    className={`py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${deductionType === type
                                        ? "bg-accent-dark text-white shadow-md"
                                        : "bg-accent-light text-foreground hover:bg-accent"
                                        }`}
                                >
                                    {type === "standard" ? "Standard" : "Itemized"}
                                </button>
                            ))}
                        </div>
                        {deductionType === "standard" && (
                            <p className="text-xs text-text-secondary mt-2">
                                Standard deduction: {fmt(STANDARD_DEDUCTION[status] || 14600)}
                            </p>
                        )}
                    </div>
                    {deductionType === "itemized" && (
                        <MoneyInput label="Total Itemized Deductions" value={itemizedDeduction} onChange={setItemizedDeduction} id="fed-itemized" />
                    )}
                    <MoneyInput label="Other Tax Credits" value={credits} onChange={setCredits} id="fed-credits" placeholder="0" />
                    <div>
                        <label htmlFor="fed-dependents" className="block text-sm font-semibold text-foreground mb-2">
                            Number of Dependents (under 17)
                        </label>
                        <input
                            id="fed-dependents"
                            type="number"
                            min="0"
                            max="20"
                            value={dependents}
                            onChange={(e) => setDependents(e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                    </div>
                    <button
                        onClick={calculate}
                        disabled={!income}
                        className="w-full py-3.5 bg-gradient-to-r from-primary to-accent-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        id="fed-calculate-btn"
                    >
                        Calculate Federal Tax
                    </button>
                </div>
            </div>

            {/* Results - 3 cols */}
            <div className="lg:col-span-3 space-y-5">
                {!result ? (
                    <div className="glass-card rounded-2xl p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-accent-light flex items-center justify-center">
                            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Enter Your Details</h3>
                        <p className="text-text-secondary text-sm max-w-sm mx-auto">
                            Fill in your income details and click calculate to see your detailed federal tax breakdown.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ResultCard
                                label="Total Tax (After Credits)"
                                value={fmt(result.afterCredits)}
                                sub={`Before credits: ${fmt(result.totalTax)}`}
                                accent
                                icon={
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                            />
                            <ResultCard
                                label="Taxable Income"
                                value={fmt(result.taxableIncome)}
                                sub="After deductions"
                                icon={
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                                    </svg>
                                }
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <ResultCard label="Effective Rate" value={`${result.effectiveRate.toFixed(1)}%`} />
                            <ResultCard label="Marginal Rate" value={`${result.marginalRate.toFixed(0)}%`} />
                            <ResultCard label="Child Tax Credit" value={fmt(result.childCredit)} />
                        </div>

                        {/* Bracket Chart */}
                        <div className="glass-card rounded-2xl p-6">
                            <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Tax Bracket Breakdown
                            </h4>
                            <div className="space-y-3">
                                {result.breakdown.map((b, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-text-secondary w-10 text-right shrink-0">
                                            {b.rate}%
                                        </span>
                                        <div className="flex-1 bg-gray-100 rounded-full h-7 overflow-hidden relative">
                                            <div
                                                className="h-full rounded-full transition-all duration-700 ease-out flex items-center px-3"
                                                style={{
                                                    width: `${Math.max(8, (b.amount / maxBracket) * 100)}%`,
                                                    background: `linear-gradient(90deg, #1F72B8, #0D4F8A)`,
                                                    opacity: 0.6 + (i / result.breakdown.length) * 0.4,
                                                }}
                                            >
                                                <span className="text-white text-xs font-semibold whitespace-nowrap">
                                                    {fmt(b.amount)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-text-secondary mt-3">
                                Each bar represents the tax owed in that bracket range.
                            </p>
                        </div>
                    </>
                )}
            </div>
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

export default function TaxCalculatorPage() {
    const [activeTab, setActiveTab] = useState<TabKey>("federal");

    return (
        <>
            {/* Hero Header */}
            <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-br from-accent-light via-white to-lavender">
                <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary/5 rounded-bl-[120px] -z-0" />
                <div className="absolute top-20 left-10 w-48 h-48 bg-accent rounded-full opacity-20 blur-3xl -z-0" />
                <div className="absolute bottom-0 right-20 w-72 h-72 bg-primary rounded-full opacity-10 blur-3xl -z-0" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-6"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Link>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-tight text-foreground mb-5">
                            Advanced{" "}
                            <span className="gradient-text">Tax Calculator</span>
                        </h1>
                        <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
                            Comprehensive tax planning tools using 2024 federal tax brackets.
                            Calculate income tax, self-employment tax, capital gains, and
                            compare filing scenarios — all in one place.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-6">
                            {[
                                { label: "2024 Tax Year", color: "green" },
                                { label: "Multiple Calculators", color: "blue" },
                                { label: "Instant Results", color: "purple" },
                            ].map((badge) => (
                                <span
                                    key={badge.label}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${badge.color === "green"
                                        ? "bg-green-50 text-green-700 border border-green-200"
                                        : badge.color === "blue"
                                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                                            : "bg-purple-50 text-purple-700 border border-purple-200"
                                        }`}
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {badge.label}
                                </span>
                            ))}
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
                                    ? "bg-accent-dark text-white shadow-md shadow-accent-dark/20"
                                    : "text-text-secondary hover:bg-accent-light hover:text-foreground"
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

            {/* CTA */}
            <section className="py-16 bg-accent-dark text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                        Need Professional Tax Help?
                    </h2>
                    <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">
                        Our expert CPAs can help you maximize deductions and ensure full compliance.
                        Schedule a free consultation today.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-8 py-3.5 bg-white text-accent-dark font-semibold rounded-full hover:bg-accent transition-colors duration-200"
                        >
                            Get Free Consultation
                        </Link>
                        <a
                            href="tel:+18326471819"
                            className="inline-flex items-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            +1-832-647-1819
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
