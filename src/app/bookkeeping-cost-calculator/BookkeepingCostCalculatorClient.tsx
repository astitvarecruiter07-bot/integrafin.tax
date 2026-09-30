'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  BarChart3,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Info,
  Layers3,
  ListChecks,
  LockKeyhole,
  ReceiptText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  WalletCards,
} from 'lucide-react';
import { baseEventParameters, trackEvent } from '@/lib/analytics';
import { BookkeepingCostInputsSchema } from '@/lib/bookkeeping-cost/schema';
import { calculateBookkeepingCost } from '@/lib/bookkeeping-cost/pricing';
import {
  factorLabels,
  manualReviewLabels,
  pricingDisclaimer,
  serviceLabels,
  tierLabels,
} from '@/lib/bookkeeping-cost/content';
import {
  defaultBookkeepingCostInputs,
  type BookkeepingCostInputs,
  type BookkeepingCostResult,
} from '@/lib/bookkeeping-cost/types';
import { getContactHref } from '@/lib/leadServices';

const stepTitles = ['Business activity', 'Accounting complexity', 'Service scope', 'Catch-up details'];

function currency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  helper,
  presets,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  helper?: string;
  presets?: number[];
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-black text-slate-800">{label}</label>
      {helper && <p id={`${id}-help`} className="mt-1 text-xs leading-5 text-slate-500">{helper}</p>}
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step="1"
        value={value}
        aria-describedby={helper ? `${id}-help` : undefined}
        onChange={(event) => {
          const number = Number(event.target.value);
          onChange(Number.isFinite(number) ? Math.min(max, Math.max(min, Math.round(number))) : min);
        }}
        className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-bold text-slate-900 outline-none transition focus:border-[#0092df] focus:ring-4 focus:ring-sky-100"
      />
      {presets && (
        <div className="mt-2 flex flex-wrap gap-2" aria-label={`Common ${label.toLowerCase()} values`}>
          {presets.map((preset) => (
            <button key={preset} type="button" aria-pressed={value === preset} onClick={() => onChange(preset)} className={`min-h-9 rounded-full border px-3 py-1 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${value === preset ? 'border-[#0092df] bg-sky-50 text-[#0047AB]' : 'border-slate-200 bg-white text-slate-600 hover:border-sky-300'}`}>
              {preset.toLocaleString()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChoiceGroup<T extends string>({
  legend,
  value,
  options,
  onChange,
}: {
  legend: string;
  value: T;
  options: Array<{ value: T; label: string; detail?: string }>;
  onChange: (value: T) => void;
}) {
  const groupName = useId();
  return (
    <fieldset>
      <legend className="text-sm font-black text-slate-800">{legend}</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <label key={option.value} className={`flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition focus-within:ring-4 focus-within:ring-sky-100 ${selected ? 'border-[#0092df] bg-sky-50' : 'border-slate-200 bg-white hover:border-sky-300'}`}>
              <input type="radio" name={groupName} value={option.value} className="sr-only" checked={selected} onChange={() => onChange(option.value)} />
              <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${selected ? 'border-[#0092df] bg-[#0092df] text-white' : 'border-slate-300'}`}>{selected && <Check className="h-3 w-3" strokeWidth={4} />}</span>
              <span><strong className="block text-sm text-slate-800">{option.label}</strong>{option.detail && <span className="mt-1 block text-xs leading-5 text-slate-500">{option.detail}</span>}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function ToggleCard({ checked, onChange, title, detail }: { checked: boolean; onChange: (checked: boolean) => void; title: string; detail?: string }) {
  return (
    <label className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition focus-within:ring-4 focus-within:ring-sky-100 ${checked ? 'border-[#0092df] bg-sky-50' : 'border-slate-200 bg-white hover:border-sky-300'}`}>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 ${checked ? 'border-[#0092df] bg-[#0092df] text-white' : 'border-slate-300 bg-white'}`}>{checked && <Check className="h-4 w-4" strokeWidth={3} />}</span>
      <span><strong className="block text-sm text-slate-800">{title}</strong>{detail && <span className="mt-1 block text-xs leading-5 text-slate-500">{detail}</span>}</span>
    </label>
  );
}

function SelectField<T extends string>({ id, label, value, options, onChange, helper }: { id: string; label: string; value: T; options: Array<{ value: T; label: string }>; onChange: (value: T) => void; helper?: string }) {
  return (
    <label htmlFor={id} className="block text-sm font-black text-slate-800">
      {label}
      {helper && <span className="mt-1 block text-xs font-normal leading-5 text-slate-500">{helper}</span>}
      <select id={id} value={value} onChange={(event) => onChange(event.target.value as T)} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800 outline-none focus:border-[#0092df] focus:ring-4 focus:ring-sky-100">
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function EstimatePanel({ result, compact = false }: { result: BookkeepingCostResult; compact?: boolean }) {
  const primary = result.monthly || result.catchUp;
  return (
    <aside className={`${compact ? '' : 'lg:sticky lg:top-28'} overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,35,70,0.10)]`}>
      <div className="bg-primary-dark p-5 text-white sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-sky-200">Live planning estimate</p>
          <span className="rounded-full border border-amber-300/30 bg-amber-300/15 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-100">Draft rates</span>
        </div>
        {primary && <p className="mt-4 text-3xl font-black tracking-[-0.03em] sm:text-4xl">{currency(primary.low)}–{currency(primary.high)}</p>}
        <p className="mt-1 text-sm text-sky-100">{result.monthly ? 'estimated per month' : 'estimated catch-up project'}</p>
      </div>
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-3">
          {result.monthly && <div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Workload</p><p className="mt-1 text-lg font-black text-primary-dark">{result.monthly.estimatedHours} hrs<span className="text-xs font-semibold text-slate-400">/mo</span></p></div>}
          <div className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Service tier</p><p className="mt-1 text-sm font-black leading-5 text-primary-dark">{tierLabels[result.recommendedTier]}</p></div>
        </div>
        {result.catchUp && <div className="mt-3 rounded-xl border border-cyan-200 bg-cyan-50 p-4"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-cyan-800"><Clock3 className="h-4 w-4" />Catch-up estimate</div><p className="mt-2 text-xl font-black text-primary-dark">{currency(result.catchUp.low)}–{currency(result.catchUp.high)}</p><p className="mt-1 text-xs text-slate-600">{result.catchUp.estimatedHours} estimated hours · {result.catchUp.estimatedWeeksLow}–{result.catchUp.estimatedWeeksHigh} planning weeks</p></div>}
        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4"><span className="text-xs font-bold text-slate-500">Estimated first year</span><strong className="text-lg text-primary-dark">{currency(result.firstYear.low)}–{currency(result.firstYear.high)}</strong></div>
        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500"><Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0067b3]" />Planning estimate only. Final pricing requires a records review.</p>
      </div>
    </aside>
  );
}

function ResultSection({ result, onEdit, onRestart }: { result: BookkeepingCostResult; onEdit: () => void; onRestart: () => void }) {
  const resultHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => { resultHeading.current?.focus(); }, []);
  const monetaryCards: Array<{ label: string; value: string; detail: string; icon: typeof Banknote }> = [];
  if (result.monthly) monetaryCards.push({ label: 'Monthly bookkeeping', value: `${currency(result.monthly.low)}–${currency(result.monthly.high)}`, detail: `${result.monthly.estimatedHours} estimated hours per month`, icon: WalletCards });
  if (result.onboarding) monetaryCards.push({ label: 'One-time onboarding', value: `${currency(result.onboarding.low)}–${currency(result.onboarding.high)}`, detail: 'Reference assumption: approximately one monthly cycle', icon: FileCheck2 });
  if (result.catchUp) monetaryCards.push({ label: 'Catch-up / cleanup', value: `${currency(result.catchUp.low)}–${currency(result.catchUp.high)}`, detail: `${result.catchUp.estimatedHours} estimated hours`, icon: Clock3 });
  monetaryCards.push({ label: 'Estimated first year', value: `${currency(result.firstYear.low)}–${currency(result.firstYear.high)}`, detail: 'Recurring and applicable one-time work combined', icon: CircleDollarSign });

  return (
    <section aria-labelledby="cost-result-heading" className="mx-auto max-w-6xl">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,35,70,0.12)]">
        <div className="bg-[linear-gradient(135deg,#002050,#003580_60%,#0067b3)] px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">Your bookkeeping cost estimate</p><h2 ref={resultHeading} id="cost-result-heading" tabIndex={-1} className="mt-3 text-3xl font-black tracking-[-0.03em] outline-none sm:text-4xl">{tierLabels[result.recommendedTier]}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100">Calculated from your expected workload and requested service scope—not just business revenue.</p></div>
            <span className="w-fit rounded-full border border-amber-200/30 bg-amber-200/15 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-amber-100">Reference pricing · not a quote</span>
          </div>
        </div>
        <div className="p-6 sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {monetaryCards.map(({ label, value, detail, icon: Icon }) => <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><Icon className="h-5 w-5 text-[#0067b3]" /><p className="mt-4 text-xs font-black uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-2xl font-black tracking-[-0.03em] text-primary-dark">{value}</p><p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p></div>)}
          </div>

          {result.manualReviewReasons.length > 0 && <div className="mt-7 rounded-2xl border border-amber-300 bg-amber-50 p-5"><h3 className="flex items-center gap-2 text-sm font-black text-amber-950"><TriangleAlert className="h-5 w-5" />Professional scope review required</h3><p className="mt-2 text-sm leading-6 text-amber-900">The calculator can provide a planning range, but these factors need a closer review:</p><ul className="mt-3 grid gap-2 sm:grid-cols-2">{result.manualReviewReasons.map((reason) => <li key={reason} className="flex gap-2 text-sm text-amber-950"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />{manualReviewLabels[reason]}</li>)}</ul></div>}

          <div className="mt-9 grid gap-8 lg:grid-cols-2">
            <div><h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#0047AB]"><BarChart3 className="h-4 w-4" />How this estimate was built</h3><div className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-200 px-4">{result.factorBreakdown.map((factor) => <div key={factor.key} className="flex items-center justify-between gap-4 py-3 text-sm"><span className="text-slate-700">{factorLabels[factor.labelKey]}</span><strong className="shrink-0 text-primary-dark">{factor.hoursAdded !== undefined ? `+${factor.hoursAdded} hrs` : `×${factor.multiplier}`}</strong></div>)}</div></div>
            <div><h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#0047AB]"><ListChecks className="h-4 w-4" />Included in this scope</h3><ul className="mt-4 space-y-3">{result.includedServiceKeys.map((service) => <li key={service} className="flex gap-3 text-sm leading-6 text-slate-700"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />{serviceLabels[service]}</li>)}</ul><h3 className="mt-7 text-xs font-black uppercase tracking-wide text-slate-400">Not included</h3><ul className="mt-3 space-y-2">{result.excludedServiceKeys.map((service) => <li key={service} className="text-sm text-slate-500">{serviceLabels[service]}</li>)}</ul></div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-xs font-black uppercase tracking-wide text-slate-500">Planning assumptions</h3>
              <ul className="mt-3 space-y-2">{result.assumptions.map((assumption) => <li key={assumption} className="flex gap-2 text-xs leading-5 text-slate-600"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />{assumption}</li>)}</ul>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-xs leading-5 text-amber-950"><strong className="block text-xs font-black uppercase tracking-wide">Keep sensitive records private</strong><span className="mt-3 block">Do not enter account numbers, bank details, Social Security numbers, tax identification numbers, passwords, tax returns, or confidential financial records. This calculator does not need them.</span></div>
          </div>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-xs leading-5 text-slate-600">{pricingDisclaimer}</div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={getContactHref('Small Business Bookkeeping')} onClick={() => trackEvent('bookkeeping_quote_cta', { ...baseEventParameters(), calculator_version: result.calculatorVersion, cta_name: 'request_reviewed_quote' })} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary-dark px-6 py-3 text-sm font-black text-white hover:bg-[#002050] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200">Request a Reviewed Quote <ArrowRight className="h-4 w-4" /></Link>
            <button type="button" onClick={onEdit} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"><ArrowLeft className="h-4 w-4" />Change inputs</button>
            <button type="button" onClick={onRestart} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100"><RefreshCw className="h-4 w-4" />Reset</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BookkeepingCostCalculatorClient() {
  const [inputs, setInputs] = useState<BookkeepingCostInputs>(defaultBookkeepingCostInputs);
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startedRef = useRef(false);
  const parsed = useMemo(() => BookkeepingCostInputsSchema.safeParse(inputs), [inputs]);
  const result = useMemo(() => parsed.success ? calculateBookkeepingCost(parsed.data) : null, [parsed]);
  const totalSteps = inputs.estimateMode === 'monthly' ? 3 : 4;

  useEffect(() => {
    trackEvent('bookkeeping_cost_view', { ...baseEventParameters(), calculator_version: '1.0-draft', page_type: 'calculator' });
  }, []);

  useEffect(() => {
    if (!showResult) headingRef.current?.focus();
  }, [step, showResult]);

  function markStarted(estimateMode = inputs.estimateMode) {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('bookkeeping_cost_start', { ...baseEventParameters(), calculator_version: '1.0-draft', estimate_mode: estimateMode });
  }

  function update<K extends keyof BookkeepingCostInputs>(key: K, value: BookkeepingCostInputs[K]) {
    markStarted();
    setError('');
    setInputs((current) => ({ ...current, [key]: value }));
  }

  function setMode(mode: BookkeepingCostInputs['estimateMode']) {
    markStarted(mode);
    setError('');
    setInputs((current) => ({ ...current, estimateMode: mode, monthsBehind: mode === 'monthly' ? 0 : Math.max(1, current.monthsBehind) }));
    setStep((current) => Math.min(current, mode === 'monthly' ? 2 : 3));
  }

  function continueStep() {
    markStarted();
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || 'Review this step before continuing.');
      return;
    }
    trackEvent('bookkeeping_cost_step', { calculator_version: '1.0-draft', step_number: step + 1, estimate_mode: inputs.estimateMode });
    if (step < totalSteps - 1) {
      setStep((current) => current + 1);
      return;
    }
    setShowResult(true);
    if (result) trackEvent('bookkeeping_cost_result', { calculator_version: result.calculatorVersion });
  }

  function reset() {
    setInputs(defaultBookkeepingCostInputs);
    setStep(0);
    setShowResult(false);
    setError('');
    startedRef.current = false;
  }

  function editInputs() {
    if (result) {
      trackEvent('bookkeeping_cost_adjust', {
        ...baseEventParameters(),
        calculator_version: result.calculatorVersion,
        estimate_mode: inputs.estimateMode,
      });
    }
    setShowResult(false);
  }

  let stepContent: ReactNode;
  if (step === 0) {
    stepContent = <div className="space-y-7">
      <ChoiceGroup legend="What would you like to estimate?" value={inputs.estimateMode} onChange={setMode} options={[
        { value: 'monthly', label: 'Monthly bookkeeping', detail: 'Ongoing books and reporting' },
        { value: 'catch_up', label: 'Catch-up only', detail: 'Bring prior months up to date' },
        { value: 'both', label: 'Both', detail: 'Catch up, then stay current' },
      ]} />
      <div className="grid gap-6 sm:grid-cols-2">
        <NumberField id="transactions" label="Average monthly transactions" helper="Use the average from your last three months." value={inputs.averageMonthlyTransactions} max={5000} presets={[50, 100, 250, 500]} onChange={(value) => update('averageMonthlyTransactions', value)} />
        <NumberField id="accounts" label="Active financial accounts" helper="Bank, card, loan, and payment-clearing accounts." value={inputs.activeFinancialAccounts} min={1} max={50} presets={[1, 3, 5, 8]} onChange={(value) => update('activeFinancialAccounts', value)} />
        <NumberField id="entities" label="Business entities" value={inputs.entities} min={1} max={10} presets={[1, 2, 3]} onChange={(value) => update('entities', value)} />
        <NumberField id="locations" label="Locations or divisions" value={inputs.locations} min={1} max={50} presets={[1, 2, 5]} onChange={(value) => update('locations', value)} />
      </div>
    </div>;
  } else if (step === 1) {
    stepContent = <div className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField id="accounting-software" label="Accounting system" value={inputs.accountingSoftware} onChange={(value) => update('accountingSoftware', value)} options={[
          { value: 'quickbooks_online', label: 'QuickBooks Online' }, { value: 'quickbooks_desktop', label: 'QuickBooks Desktop' }, { value: 'xero', label: 'Xero' }, { value: 'wave', label: 'Wave' }, { value: 'spreadsheet', label: 'Spreadsheet' }, { value: 'none', label: 'No accounting system' }, { value: 'other', label: 'Other' },
        ]} />
        <SelectField id="accounting-method" label="Accounting method" value={inputs.accountingMethod} onChange={(value) => update('accountingMethod', value)} options={[{ value: 'cash', label: 'Cash basis' }, { value: 'accrual', label: 'Accrual basis' }, { value: 'unsure', label: 'Not sure' }]} />
        <NumberField id="processors" label="Payment processors" helper="Examples: Stripe, Square, PayPal, Shopify Payments." value={inputs.paymentProcessors} max={20} presets={[0, 1, 2, 4]} onChange={(value) => update('paymentProcessors', value)} />
      </div>
      <fieldset><legend className="text-sm font-black text-slate-800">Which complexity factors apply?</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">
        <ToggleCard checked={inputs.inventoryOrEcommerce} onChange={(value) => update('inventoryOrEcommerce', value)} title="Inventory or ecommerce" detail="Inventory, marketplace, or clearing-account activity" />
        <ToggleCard checked={inputs.jobCosting} onChange={(value) => update('jobCosting', value)} title="Job costing" detail="Track income and costs by project or job" />
        <ToggleCard checked={inputs.classOrLocationTracking} onChange={(value) => update('classOrLocationTracking', value)} title="Class or location tracking" />
        <ToggleCard checked={inputs.multiCurrency} onChange={(value) => update('multiCurrency', value)} title="Multi-currency activity" />
        <ToggleCard checked={inputs.commingledPersonalActivity} onChange={(value) => update('commingledPersonalActivity', value)} title="Personal and business transactions are mixed" />
        <ToggleCard checked={inputs.reportingCadence === 'weekly'} onChange={(value) => update('reportingCadence', value ? 'weekly' : 'monthly')} title="Weekly reporting" detail="Monthly reporting is included by default" />
      </div></fieldset>
    </div>;
  } else if (step === 2) {
    stepContent = <div className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <NumberField id="sales-invoices" label="Sales invoices each month" helper="Enter 0 if invoice administration is not needed." value={inputs.monthlySalesInvoices} max={1000} presets={[0, 25, 75, 150]} onChange={(value) => update('monthlySalesInvoices', value)} />
        <NumberField id="vendor-bills" label="Vendor bills each month" helper="Enter 0 if bill-pay support is not needed." value={inputs.monthlyVendorBills} max={1000} presets={[0, 25, 75, 150]} onChange={(value) => update('monthlyVendorBills', value)} />
        <SelectField id="payroll-service" label="Payroll support needed" value={inputs.payrollService} onChange={(value) => { markStarted(); setError(''); setInputs((current) => ({ ...current, payrollService: value, employees: value === 'full_administration' ? Math.max(1, current.employees) : current.employees })); }} options={[{ value: 'none', label: 'No payroll support' }, { value: 'reconciliation_only', label: 'Payroll reconciliation only' }, { value: 'full_administration', label: 'Full payroll administration' }]} />
        <NumberField id="employees" label="Employees" value={inputs.employees} max={500} presets={[0, 5, 10, 25]} onChange={(value) => update('employees', value)} />
        <NumberField id="contractors" label="Contractors needing 1099 tracking" value={inputs.contractors1099} max={500} presets={[0, 5, 20, 50]} onChange={(value) => update('contractors1099', value)} />
        <NumberField id="sales-tax-jurisdictions" label="Sales-tax jurisdictions" value={inputs.salesTaxJurisdictions} max={50} presets={[0, 1, 3, 5]} onChange={(value) => { markStarted(); setError(''); setInputs((current) => ({ ...current, salesTaxJurisdictions: value, salesTaxFrequency: value === 0 ? 'none' : current.salesTaxFrequency === 'none' ? 'monthly' : current.salesTaxFrequency })); }} />
      </div>
      {inputs.employees > 0 && inputs.payrollService === 'none' && <ToggleCard checked={inputs.payrollHandledOutsideScope} onChange={(value) => update('payrollHandledOutsideScope', value)} title="Payroll is handled outside this bookkeeping scope" detail="Required when employees exist but payroll support is not requested" />}
      {inputs.salesTaxJurisdictions > 0 && <ChoiceGroup legend="Sales-tax filing frequency" value={inputs.salesTaxFrequency} onChange={(value) => update('salesTaxFrequency', value)} options={[{ value: 'monthly', label: 'Monthly' }, { value: 'quarterly', label: 'Quarterly' }]} />}
    </div>;
  } else {
    stepContent = <div className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        <NumberField id="months-behind" label="Months behind" helper="Enter the number of historical months to prepare or repair." value={inputs.monthsBehind} min={1} max={60} presets={[3, 6, 12, 24]} onChange={(value) => update('monthsBehind', value)} />
        <SelectField id="book-condition" label="Current condition of the books" value={inputs.bookCondition} onChange={(value) => update('bookCondition', value)} options={[{ value: 'clean_but_behind', label: 'Mostly clean, just behind' }, { value: 'some_corrections', label: 'Some corrections expected' }, { value: 'unreconciled', label: 'Accounts are unreconciled' }, { value: 'major_reconstruction', label: 'Major reconstruction may be needed' }, { value: 'unsure', label: 'Not sure' }]} />
        <SelectField id="prior-return" label="Is the prior business tax return available?" value={String(inputs.priorTaxReturnAvailable) as 'true' | 'false' | 'unknown'} onChange={(value) => update('priorTaxReturnAvailable', value === 'true' ? true : value === 'false' ? false : 'unknown')} options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }, { value: 'unknown', label: 'Not sure' }]} />
      </div>
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-slate-700"><strong>How catch-up is estimated:</strong> monthly workload × months behind × book-condition factor. Repeated historical work receives an efficiency adjustment, while reconstruction increases the estimate.</div>
    </div>;
  }

  return (
    <main className="saas-page bg-[#f6f8fb] pt-24 text-slate-900">
      <section className="border-b border-slate-200 bg-white px-4 py-9 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div><div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-[#0047AB]"><Calculator className="h-4 w-4" />Free planning calculator</div><h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.06] tracking-[-0.04em] text-[#09233f] sm:text-5xl">How Much Should Bookkeeping Cost for Your Business?</h1><p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">Estimate monthly bookkeeping, catch-up work, workload, and first-year cost from the services your business actually needs.</p></div>
            <div className="flex max-w-md items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-950"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" /><span><strong className="block">No signup required for your result.</strong>No documents, account numbers, bank details, or credentials.</span></div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-6xl">
          {showResult && result ? <ResultSection result={result} onEdit={editInputs} onRestart={reset} /> : <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-8">
                <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-[#0067b3]">Step {step + 1} of {totalSteps}</p><h2 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-black tracking-[-0.025em] text-[#09233f] outline-none">{stepTitles[step]}</h2></div><span className="text-sm font-bold text-slate-500">About 2 minutes</span></div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-[linear-gradient(90deg,#0092df,#00c2cb)] transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} /></div>
              </div>
              <div className="p-5 sm:p-8">{stepContent}{error && <p role="alert" className="mt-6 flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700"><TriangleAlert className="h-4 w-4" />{error}</p>}<div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-6"><button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" onClick={continueStep} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary-dark px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-950/10 hover:bg-[#002050] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200">{step === totalSteps - 1 ? 'See Full Estimate' : 'Continue'}<ArrowRight className="h-4 w-4" /></button></div></div>
            </div>
            {result ? <EstimatePanel result={result} /> : <aside className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">Complete the highlighted fields to restore the live estimate.</aside>}
          </div>}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [ReceiptText, 'Workload before price', 'The calculator estimates recurring bookkeeping hours first, then applies the reference rate and a delivery allowance.'],
              [Layers3, 'Scope changes the number', 'AR, AP, payroll, sales tax, entities, inventory, job costing, and reporting cadence affect the result.'],
              [LockKeyhole, 'Your records stay private', 'The calculator uses only the counts and choices you enter. It never connects to financial accounts or bookkeeping software.'],
            ].map(([Icon, title, copy]) => <article key={String(title)} className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-100 text-[#0067b3]"><Icon className="h-5 w-5" /></span><h2 className="mt-5 text-lg font-black text-[#09233f]">{String(title)}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{String(copy)}</p></article>)}
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_.75fr]">
            <div><h2 className="text-3xl font-black tracking-[-0.03em] text-[#09233f]">Bookkeeping cost questions</h2><div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 px-5 sm:px-7">{[
              ['Is this an exact quote?', 'No. It is a planning range using a draft, versioned pricing configuration. A reviewed quote requires confirming the condition and availability of your records.'],
              ['Why not calculate from revenue?', 'Revenue and expenses are simple proxies, but bookkeeping work is driven more directly by transactions, accounts, reconciliations, service scope, and reporting complexity.'],
              ['Why is catch-up separate?', 'Historical reconstruction has different uncertainty, repetition, and record-availability risks. It is estimated as a one-time project instead of inflating the monthly fee.'],
              ['What happens with a complex business?', 'The calculator still shows a planning range and identifies the conditions that require a professional scope review.'],
            ].map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-6 text-base font-black text-[#09233f]">{question}</summary><p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p></details>)}</div></div>
            <aside className="rounded-2xl bg-[#09233f] p-7 text-white"><Sparkles className="h-6 w-6 text-cyan-300" /><h2 className="mt-5 text-2xl font-black">Need help choosing inputs?</h2><p className="mt-3 text-sm leading-6 text-sky-100">Use your last three months of activity. If you are unsure, choose the closest reasonable value—the reviewed quote will confirm the details.</p><nav className="mt-6 grid gap-2" aria-label="Related bookkeeping services">{[['/bookkeeping-cleanup', 'Bookkeeping cleanup'], ['/quickbooks-bookkeeping-services', 'QuickBooks bookkeeping'], ['/small-business-bookkeeping-services', 'Small-business bookkeeping'], ['/pricing', 'Pricing and scope']].map(([href, label]) => <Link key={href} href={href} className="flex min-h-11 items-center justify-between rounded-lg bg-white/10 px-4 py-2.5 text-sm font-bold hover:bg-white/15">{label}<ChevronRight className="h-4 w-4" /></Link>)}</nav></aside>
          </div>
        </div>
      </section>
    </main>
  );
}
