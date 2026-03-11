"use client";
import { useState } from "react";
import Link from "next/link";

const FILING_STATUSES = [
    { value: "single", label: "Single" },
    { value: "married_joint", label: "Married Filing Jointly" },
    { value: "married_separate", label: "Married Filing Separately" },
    { value: "head_of_household", label: "Head of Household" },
];

const TAX_BRACKETS_2024: Record<string, { rate: number; min: number; max: number }[]> = {
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

function calculateTax(income: number, filingStatus: string) {
    const deduction = STANDARD_DEDUCTION[filingStatus] || 14600;
    const taxableIncome = Math.max(0, income - deduction);
    const brackets = TAX_BRACKETS_2024[filingStatus] || TAX_BRACKETS_2024.single;

    let totalTax = 0;
    for (const bracket of brackets) {
        if (taxableIncome <= bracket.min) break;
        const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        totalTax += taxableInBracket * bracket.rate;
    }

    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;
    const marginalRate = brackets.find(
        (b) => taxableIncome >= b.min && taxableIncome < b.max
    )?.rate ?? 0;

    return { totalTax, effectiveRate, marginalRate: marginalRate * 100, taxableIncome };
}

export default function TaxCalculatorMini() {
    const [filingStatus, setFilingStatus] = useState("single");
    const [income, setIncome] = useState("");
    const [result, setResult] = useState<{
        totalTax: number;
        effectiveRate: number;
        marginalRate: number;
        taxableIncome: number;
    } | null>(null);
    const [isCalculated, setIsCalculated] = useState(false);

    const handleCalculate = () => {
        const incomeNum = parseFloat(income.replace(/,/g, ""));
        if (isNaN(incomeNum) || incomeNum < 0) return;
        const res = calculateTax(incomeNum, filingStatus);
        setResult(res);
        setIsCalculated(true);
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(val);

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/[^0-9]/g, "");
        if (raw === "") {
            setIncome("");
            setIsCalculated(false);
            setResult(null);
            return;
        }
        const formatted = new Intl.NumberFormat("en-US").format(parseInt(raw));
        setIncome(formatted);
        setIsCalculated(false);
    };

    return (
        <section className="section-padding relative overflow-hidden bg-[#1B2A4A] border-y-2 border-white/10" id="tax-calculator">
            {/* Decorative glowing orbs */}
            <div className="absolute top-[-80px] left-[-60px] w-[350px] h-[350px] rounded-full opacity-30 blur-[100px]" style={{ background: 'radial-gradient(circle, #1F72B8 0%, transparent 70%)' }} />
            <div className="absolute bottom-[-100px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-25 blur-[120px]" style={{ background: 'radial-gradient(circle, #1F72B8 0%, transparent 70%)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-[80px]" style={{ background: 'radial-gradient(circle, #D6E4F0 0%, transparent 70%)' }} />
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                    {/* Left Content */}
                    <div>
                        <p className="text-sm font-semibold text-white/60 mb-2">
                            Quick{" "}
                            <span className="bg-primary text-white px-2 py-0.5 rounded text-xs">
                                Tax Estimate
                            </span>
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5 leading-tight">
                            Estimate Your{" "}
                            <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">Federal Tax</span>
                            <br />
                            In Seconds
                        </h2>
                        <p className="text-white/60 leading-relaxed mb-6">
                            Get a quick estimate of your federal income tax based on the 2024
                            tax brackets. For a detailed breakdown with deductions, credits,
                            and more — try our advanced calculator.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <div className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-white/80 text-sm font-medium">2024 Tax Brackets</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-white/80 text-sm font-medium">Instant Results</span>
                            </div>
                        </div>

                        <Link
                            href="/tax-calculator"
                            className="inline-flex items-center px-7 py-3 bg-white text-accent-dark font-semibold rounded-full hover:bg-accent transition-all duration-300 shadow-lg shadow-white/10"
                        >
                            Try Advanced Calculator
                            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>

                        {/* Floating stat badges */}
                        <div className="flex items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">4</p>
                                <p className="text-white/40 text-xs mt-0.5">Calculator<br />Types</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">7</p>
                                <p className="text-white/40 text-xs mt-0.5">Tax<br />Brackets</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">2024</p>
                                <p className="text-white/40 text-xs mt-0.5">Tax<br />Year</p>
                            </div>
                        </div>
                    </div>

                    {/* Right - Calculator Card */}
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border-2 border-primary/20 hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(31,114,184,0.3)] transition-all duration-500 relative overflow-hidden group">
                        {/* Shimmering top border */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-[#145EA0] to-[#0D4F8A]" />

                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Quick Tax Estimator
                        </h3>

                        {/* Filing Status */}
                        <div className="mb-5">
                            <label className="block text-sm font-semibold text-foreground mb-2">
                                Filing Status
                            </label>
                            <select
                                value={filingStatus}
                                onChange={(e) => {
                                    setFilingStatus(e.target.value);
                                    setIsCalculated(false);
                                }}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
                                id="mini-filing-status"
                            >
                                {FILING_STATUSES.map((s) => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Annual Income */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-foreground mb-2">
                                Annual Income
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary font-semibold">
                                    $
                                </span>
                                <input
                                    type="text"
                                    value={income}
                                    onChange={handleIncomeChange}
                                    onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                                    placeholder="100,000"
                                    className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    id="mini-income"
                                />
                            </div>
                        </div>

                        {/* Calculate Button */}
                        <button
                            onClick={handleCalculate}
                            disabled={!income}
                            className="w-full py-3.5 bg-gradient-to-r from-primary to-accent-dark text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer"
                            id="mini-calculate-btn"
                        >
                            Calculate My Tax
                        </button>

                        {/* Results */}
                        {isCalculated && result && (
                            <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in-up space-y-4">
                                {/* Estimated Tax */}
                                <div className="flex items-center justify-between bg-gradient-to-r from-accent-light to-lavender rounded-xl p-4">
                                    <div>
                                        <p className="text-xs text-text-secondary font-medium">Estimated Federal Tax</p>
                                        <p className="text-2xl font-bold text-foreground">{formatCurrency(result.totalTax)}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Rate cards */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                                        <p className="text-xs text-text-secondary">Effective Rate</p>
                                        <p className="text-lg font-bold text-primary">{result.effectiveRate.toFixed(1)}%</p>
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                                        <p className="text-xs text-text-secondary">Marginal Rate</p>
                                        <p className="text-lg font-bold text-accent-dark">{result.marginalRate.toFixed(0)}%</p>
                                    </div>
                                </div>

                                <p className="text-xs text-text-secondary text-center">
                                    Based on standard deduction of {formatCurrency(STANDARD_DEDUCTION[filingStatus] || 14600)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
