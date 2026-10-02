'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  Clock3,
  FileLock2,
  Gauge,
  ListChecks,
  Phone,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import { submitBookkeepingAssessmentLead } from '@/app/actions/leads';
import { baseEventParameters, trackEvent } from '@/lib/analytics';
import { getLeadAttribution } from '@/lib/attribution';
import { BookkeepingAssessmentAnswersSchema } from '@/lib/bookkeeping-cleanup/schema';
import { calculateCleanupAssessment } from '@/lib/bookkeeping-cleanup/scoring';
import {
  categoryContent,
  checklistContent,
  factorExplanations,
  requiredDisclaimer,
  sensitiveInformationWarning,
  serviceContent,
  urgencyContent,
} from '@/lib/bookkeeping-cleanup/content';
import type { BookkeepingAssessmentAnswers, BookkeepingAssessmentResult } from '@/lib/bookkeeping-cleanup/types';
import { deadlineTypeOptions, questions, type SingleAnswerKey } from './questions';

type CalculatorView = 'landing' | 'assessment' | 'basic_result' | 'lead_form' | 'full_plan';
type DraftAnswers = Partial<Omit<BookkeepingAssessmentAnswers, 'complexities'>> & { complexities?: BookkeepingAssessmentAnswers['complexities'] };

const SESSION_KEY = 'integrafin_bookkeeping_cleanup_v1';
const inputClass = 'mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#0092df] focus:ring-4 focus:ring-sky-100';

function isAnswered(answers: DraftAnswers, step: number) {
  const question = questions[step];
  if (question.key === 'complexities') return Boolean(answers.complexities?.length);
  return Boolean(answers[question.key]);
}

function BasicResult({ result, onPlan, onRetake }: { result: BookkeepingAssessmentResult; onPlan: () => void; onRetake: () => void }) {
  const category = categoryContent[result.category];
  const urgency = urgencyContent[result.urgency];
  const urgencyStyle = result.urgency === 'critical' ? 'bg-rose-100 text-rose-800 border-rose-200' : result.urgency === 'high' ? 'bg-amber-100 text-amber-800 border-amber-200' : result.urgency === 'medium' ? 'bg-sky-100 text-sky-800 border-sky-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200';

  return (
    <section aria-labelledby="result-title" className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,35,70,0.12)]">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col items-center justify-center bg-primary-dark px-6 py-10 text-center text-white sm:px-10">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">Preliminary complexity score</p>
          <div className="mt-5 grid h-40 w-40 place-items-center rounded-full border-[12px] border-white/15 bg-white/10 shadow-inner">
            <div><span className="text-6xl font-black leading-none">{result.score}</span><span className="block text-sm font-bold text-sky-200">out of 100</span></div>
          </div>
          <p className="mt-5 text-sm text-sky-100">Scoring version {result.calculatorVersion}</p>
        </div>
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full border px-3 py-1.5 text-xs font-black uppercase tracking-wide ${urgencyStyle}`}>{urgency.label} urgency</span>
            <span className="text-sm text-slate-500">Complexity and urgency are measured separately.</span>
          </div>
          <h2 id="result-title" tabIndex={-1} className="mt-5 text-3xl font-black tracking-[-0.03em] text-[#09233f] sm:text-4xl">{category.label}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{category.explanation}</p>
          <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600"><strong className="text-slate-800">Deadline context:</strong> {urgency.explanation}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#0047AB]"><Gauge className="h-4 w-4" />Top contributing factors</h3>
              <ul className="mt-3 space-y-3">
                {result.factors.map((factor) => <li key={factor.key} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#00a8c2]" />{factorExplanations[factor.explanationKey]}</li>)}
                {result.factors.length === 0 && <li className="text-sm leading-6 text-slate-700">Your answers did not identify a major cleanup driver. Confirm the records in a professional review before relying on this result.</li>}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#0047AB]"><ListChecks className="h-4 w-4" />Do these three things first</h3>
              <ol className="mt-3 space-y-3">
                {category.nextSteps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sky-100 text-xs font-black text-[#0047AB]">{index + 1}</span>{step}</li>)}
              </ol>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-950">{requiredDisclaimer}</div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onPlan} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary-dark px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-950/15 transition hover:bg-[#002050] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300">Get My Complete Cleanup Action Plan <ArrowRight className="h-4 w-4" /></button>
            <button type="button" onClick={onRetake} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"><RefreshCw className="h-4 w-4" />Change answers</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function BookkeepingCleanupCalculatorClient() {
  const [view, setView] = useState<CalculatorView>('landing');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<DraftAnswers>({});
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [authoritativeResult, setAuthoritativeResult] = useState<BookkeepingAssessmentResult | null>(null);
  const [savedLeadId, setSavedLeadId] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startedRef = useRef(false);
  const leadFormStartedRef = useRef(false);
  const idempotencyKeyRef = useRef('');

  const parsedAnswers = useMemo(() => BookkeepingAssessmentAnswersSchema.safeParse(answers), [answers]);
  const result = parsedAnswers.success ? calculateCleanupAssessment(parsedAnswers.data) : null;

  useEffect(() => {
    trackEvent('cleanup_calculator_view', { ...baseEventParameters(), calculator_version: '1.0', page_type: 'calculator' });
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as { answers?: DraftAnswers; step?: number };
      if (parsed.answers && typeof parsed.step === 'number') {
        queueMicrotask(() => {
          setAnswers(parsed.answers || {});
          setStep(Math.max(0, Math.min(8, parsed.step || 0)));
        });
      }
    } catch { /* A fresh assessment is safer than failing on invalid device-local state. */ }
  }, []);

  useEffect(() => {
    if (view !== 'assessment') return;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ answers, step }));
  }, [answers, step, view]);

  useEffect(() => {
    if (view !== 'landing') window.requestAnimationFrame(() => headingRef.current?.focus());
  }, [view, step]);

  function trackStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent('cleanup_calculator_start', { ...baseEventParameters(), calculator_version: '1.0' });
  }

  function startAssessment() {
    trackStart();
    setView('assessment');
  }

  function trackLeadFormStart() {
    if (leadFormStartedRef.current) return;
    leadFormStartedRef.current = true;
    trackEvent('cleanup_lead_form_start', { calculator_version: '1.0' });
  }

  function chooseSingle(key: SingleAnswerKey, value: string) {
    trackStart();
    setError('');
    setAnswers((current) => ({ ...current, [key]: value, ...(key === 'deadlineWindow' && value === 'none' ? { deadlineType: undefined } : {}) } as DraftAnswers));
  }

  function toggleComplexity(value: BookkeepingAssessmentAnswers['complexities'][number]) {
    trackStart();
    setError('');
    setAnswers((current) => {
      const selected = current.complexities || [];
      if (selected.includes(value)) return { ...current, complexities: selected.filter((item) => item !== value) };
      if (value === 'none' || value === 'unsure') return { ...current, complexities: [value] };
      return { ...current, complexities: [...selected.filter((item) => item !== 'none' && item !== 'unsure'), value] };
    });
  }

  function continueAssessment() {
    if (!isAnswered(answers, step)) {
      setError('Choose an answer before continuing.');
      return;
    }
    trackEvent('cleanup_calculator_step', { calculator_version: '1.0', step_number: step + 1 });
    if (step < questions.length - 1) {
      setStep((current) => current + 1);
      setError('');
      return;
    }
    const parsed = BookkeepingAssessmentAnswersSchema.safeParse(answers);
    if (!parsed.success) {
      setError('One or more answers need attention. Please review the assessment.');
      return;
    }
    setView('basic_result');
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ answers: parsed.data, step: 8 }));
    trackEvent('cleanup_calculator_complete', { calculator_version: '1.0' });
    trackEvent('cleanup_result_view', { calculator_version: '1.0' });
  }

  function restart() {
    if (Object.keys(answers).length && !window.confirm('Restart and clear all assessment answers?')) return;
    sessionStorage.removeItem(SESSION_KEY);
    setAnswers({});
    setStep(0);
    setError('');
    setView('landing');
  }

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!parsedAnswers.success || !result) return;
    const form = new FormData(event.currentTarget);
    const contactPreference = String(form.get('contactPreference') || 'no_preference') as 'email' | 'phone' | 'no_preference';
    const email = String(form.get('email') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    const consentToContact = form.get('consentToContact') === 'on';
    if (!email && !phone) { setFormError('Provide an email address or phone number.'); return; }
    if (contactPreference === 'email' && !email) { setFormError('Enter an email address for your preferred contact method.'); return; }
    if (contactPreference === 'phone' && !phone) { setFormError('Enter a phone number for your preferred contact method.'); return; }
    if (!consentToContact) { setFormError('Consent is required before we can save your request.'); return; }

    setSubmitting(true);
    setFormError('');
    idempotencyKeyRef.current ||= crypto.randomUUID();
    const response = await submitBookkeepingAssessmentLead({
      name: String(form.get('name') || ''),
      email,
      phone,
      company: String(form.get('company') || ''),
      contactPreference,
      consentToContact: true,
      answers: parsedAnswers.data,
      attribution: getLeadAttribution(),
      website: String(form.get('website') || '') as '',
      idempotencyKey: idempotencyKeyRef.current,
    });
    setSubmitting(false);
    if (!response.success) { setFormError(response.message); return; }
    setAuthoritativeResult(response.result);
    setSavedLeadId(response.leadId);
    setView('full_plan');
    sessionStorage.removeItem(SESSION_KEY);
    if (response.created) {
      trackEvent('cleanup_lead_submit', { calculator_version: '1.0' });
      trackEvent('generate_lead', {
        ...baseEventParameters(),
        service: 'Bookkeeping Cleanup',
        form_source: 'bookkeeping-cleanup-calculator',
        calculator_version: '1.0',
      });
    }
  }

  const question = questions[step];
  const finalResult = authoritativeResult || result;

  return (
    <main className="saas-page bg-[#f7f9fc] pt-24 text-slate-900">
      <div aria-live="polite" className="sr-only">{view === 'basic_result' && result ? `Your preliminary score is ${result.score} out of 100. ${categoryContent[result.category].label}.` : ''}</div>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(145deg,#002050_0%,#003580_58%,#0067b3_100%)] px-4 py-10 sm:px-6 sm:py-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[60px] border-white/5" />
        <div className="relative mx-auto max-w-6xl">
          {view === 'landing' ? (
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-white/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-sky-100"><Sparkles className="h-3.5 w-3.5" />Free 9-question assessment</div>
                <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">How Much Work Will It Take to Fix Your Books?</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-100">Get a preliminary complexity score, see how urgent your deadline is, and learn what to prepare for a professional bookkeeping review.</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button type="button" onClick={startAssessment} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-black text-primary-dark shadow-xl shadow-blue-950/25 transition hover:-translate-y-0.5 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300">Check My Books <ArrowRight className="h-5 w-5" /></button>
                  <span className="flex items-center gap-2 text-sm font-semibold text-sky-100"><Clock3 className="h-4 w-4" />About 60–90 seconds</span>
                </div>
              </div>
              <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-sky-200">Your free result includes</p>
                <ul className="mt-6 space-y-5">
                  {[
                    [Gauge, 'Complexity', 'A transparent score from 0–100 and likely cleanup category.'],
                    [Clock3, 'Urgency', 'A separate deadline rating so a short deadline does not inflate complexity.'],
                    [ListChecks, 'Preparation list', 'Practical records to gather before a professional review.'],
                  ].map(([Icon, label, copy]) => <li key={String(label)} className="flex gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-300/15 text-cyan-200"><Icon className="h-5 w-5" /></span><span><strong className="block text-white">{String(label)}</strong><span className="mt-1 block text-sm leading-6 text-sky-100">{String(copy)}</span></span></li>)}
                </ul>
                <div className="mt-7 flex items-start gap-3 border-t border-white/15 pt-6 text-sm leading-6 text-sky-100"><FileLock2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" /><span>No documents, account numbers, passwords, or financial credentials are requested.</span></div>
              </div>
            </div>
          ) : view === 'assessment' ? (
            <div className="mx-auto max-w-4xl">
              <div className="mb-5 flex items-center justify-between gap-4 text-sm font-bold text-sky-100"><span>Question {step + 1} of {questions.length}</span><button type="button" onClick={restart} className="rounded-lg px-3 py-2 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">Exit & restart</button></div>
              <div className="h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-cyan-300 transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
              <div className="mt-5 rounded-[28px] bg-white p-5 shadow-2xl sm:p-9">
                <fieldset aria-describedby={question.helper ? 'question-helper' : undefined}>
                  <legend className="sr-only">{question.title}</legend>
                  <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-black leading-tight tracking-[-0.025em] text-[#09233f] outline-none sm:text-3xl">{question.title}</h2>
                  {question.helper && <p id="question-helper" className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{question.helper}</p>}
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {question.options.map((option) => {
                      const checked = question.key === 'complexities' ? answers.complexities?.includes(option.value as never) : answers[question.key] === option.value;
                      return <label key={option.value} className={`relative flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-sm font-bold transition focus-within:ring-4 focus-within:ring-sky-100 ${checked ? 'border-[#0092df] bg-sky-50 text-primary-dark' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-slate-50'}`}>
                        <input className="sr-only" type={question.multiple ? 'checkbox' : 'radio'} name={question.key} value={option.value} checked={Boolean(checked)} onChange={() => question.key === 'complexities' ? toggleComplexity(option.value as BookkeepingAssessmentAnswers['complexities'][number]) : chooseSingle(question.key, option.value)} />
                        <span className={`grid h-6 w-6 shrink-0 place-items-center border-2 ${question.multiple ? 'rounded-md' : 'rounded-full'} ${checked ? 'border-[#0092df] bg-[#0092df] text-white' : 'border-slate-300 bg-white'}`}>{checked && <Check className="h-4 w-4" strokeWidth={3} />}</span>{option.label}
                      </label>;
                    })}
                  </div>
                  {question.key === 'deadlineWindow' && answers.deadlineWindow && answers.deadlineWindow !== 'none' && (
                    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <label htmlFor="deadline-type" className="text-sm font-bold text-slate-800">What kind of deadline is it? <span className="font-normal text-slate-500">(optional)</span></label>
                      <select id="deadline-type" className={inputClass} value={answers.deadlineType || ''} onChange={(event) => setAnswers((current) => ({ ...current, deadlineType: (event.target.value || undefined) as BookkeepingAssessmentAnswers['deadlineType'] }))}>
                        <option value="">Select a deadline type</option>{deadlineTypeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    </div>
                  )}
                </fieldset>
                {error && <p role="alert" className="mt-5 flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700"><TriangleAlert className="h-4 w-4" />{error}</p>}
                <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-6">
                  <button type="button" onClick={() => step > 0 ? setStep((current) => current - 1) : setView('landing')} className="inline-flex min-h-12 items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"><ArrowLeft className="h-4 w-4" />Back</button>
                  <button type="button" onClick={continueAssessment} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary-dark px-6 py-3 text-sm font-black text-white hover:bg-[#002050] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200">{step === 8 ? 'See My Result' : 'Continue'} <ArrowRight className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          ) : view === 'basic_result' && result ? (
            <BasicResult result={result} onPlan={() => { setView('lead_form'); trackLeadFormStart(); }} onRetake={() => { setStep(0); setView('assessment'); }} />
          ) : view === 'lead_form' && result ? (
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[.7fr_1.3fr]">
              <aside className="rounded-[24px] bg-white/10 p-6 text-white ring-1 ring-white/15 lg:sticky lg:top-28 lg:self-start">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-sky-200">Your free result</p><p className="mt-4 text-5xl font-black">{result.score}<span className="text-lg text-sky-200">/100</span></p><h2 className="mt-3 text-xl font-black">{categoryContent[result.category].label}</h2><p className="mt-3 text-sm leading-6 text-sky-100">{urgencyContent[result.urgency].label} urgency · Your result stays visible even if the form cannot be submitted.</p>
              </aside>
              <form onSubmit={handleLeadSubmit} className="rounded-[28px] bg-white p-6 shadow-2xl sm:p-9" onFocus={trackLeadFormStart}>
                <h2 ref={headingRef} tabIndex={-1} className="text-3xl font-black tracking-[-0.03em] text-[#09233f] outline-none">Get your complete action plan</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">We’ll save your assessment and show the personalized plan immediately. Email is optional when you provide a phone number.</p>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-bold text-slate-700">Full name *<input required name="name" autoComplete="name" className={inputClass} /></label>
                  <label className="text-sm font-bold text-slate-700">Business name <span className="font-normal text-slate-400">(optional)</span><input name="company" autoComplete="organization" className={inputClass} /></label>
                  <label className="text-sm font-bold text-slate-700">Email<input name="email" type="email" autoComplete="email" className={inputClass} /></label>
                  <label className="text-sm font-bold text-slate-700">Phone<input name="phone" type="tel" autoComplete="tel" className={inputClass} /></label>
                  <label className="text-sm font-bold text-slate-700 sm:col-span-2">Preferred contact method<select name="contactPreference" className={inputClass} defaultValue="no_preference"><option value="no_preference">No preference</option><option value="email">Email</option><option value="phone">Phone</option></select></label>
                </div>
                <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-700"><input required name="consentToContact" type="checkbox" className="mt-1 h-5 w-5 rounded border-slate-300 accent-[#003580]" /><span>I agree that IntegraFin may contact me about this assessment and related bookkeeping services. *</span></label>
                <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0067b3]" />{sensitiveInformationWarning}</p>
                <p className="mt-4 text-xs leading-5 text-slate-500">{requiredDisclaimer}</p>
                {formError && <p role="alert" className="mt-5 rounded-lg bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{formError}</p>}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row-reverse sm:justify-between">
                  <button disabled={submitting} type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-dark px-6 py-3 text-sm font-black text-white hover:bg-[#002050] disabled:cursor-wait disabled:opacity-60">{submitting ? 'Saving your plan…' : 'Show My Complete Action Plan'} {!submitting && <ArrowRight className="h-4 w-4" />}</button>
                  <button type="button" onClick={() => setView('basic_result')} className="min-h-12 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-100">Back to result</button>
                </div>
              </form>
            </div>
          ) : view === 'full_plan' && finalResult ? (
            <section className="mx-auto max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
              <div className="bg-emerald-600 p-6 text-white sm:p-8"><div className="flex items-start gap-4"><CheckCircle2 className="h-8 w-8 shrink-0" /><div><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-100">Request saved</p><h2 ref={headingRef} tabIndex={-1} className="mt-2 text-3xl font-black outline-none">Your cleanup action plan is ready</h2><p className="mt-2 text-sm text-emerald-50">Reference {savedLeadId}. Final scope, timing, and pricing still require a records review.</p></div></div></div>
              <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-2">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-[#0047AB]">Your result</p><div className="mt-3 flex items-end gap-3"><span className="text-5xl font-black text-primary-dark">{finalResult.score}</span><span className="pb-1 text-sm font-bold text-slate-500">out of 100 · {urgencyContent[finalResult.urgency].label} urgency</span></div><h3 className="mt-4 text-2xl font-black text-[#09233f]">{categoryContent[finalResult.category].label}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{categoryContent[finalResult.category].explanation}</p>
                  <h3 className="mt-8 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#0047AB]"><BookOpenCheck className="h-4 w-4" />Recommended order of operations</h3><ol className="mt-4 space-y-3">{categoryContent[finalResult.category].nextSteps.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sky-100 text-xs font-black text-[#0047AB]">{index + 1}</span>{item}</li>)}</ol>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#0047AB]"><ListChecks className="h-4 w-4" />Prepare these records</h3><ul className="mt-4 space-y-3">{finalResult.checklistKeys.map((key) => <li key={key} className="flex gap-3 text-sm leading-6 text-slate-700"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />{checklistContent[key]}</li>)}</ul>
                  <h3 className="mt-8 text-sm font-black uppercase tracking-wide text-[#0047AB]">Possible service route</h3><ul className="mt-3 flex flex-wrap gap-2">{finalResult.recommendedServiceKeys.map((key) => <li key={key} className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-[#0047AB]">{serviceContent[key]}</li>)}</ul>
                  <h3 className="mt-8 text-sm font-black uppercase tracking-wide text-[#0047AB]">Questions to prepare for a review</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700"><li>What is the last month you trust as fully reconciled?</li><li>Which deadline or report matters first?</li><li>Are all statements and system logins available to the authorized owner?</li></ul>
                </div>
              </div>
              <div className="border-t border-slate-200 bg-slate-50 p-6 sm:p-8">
                <p className="text-sm leading-6 text-slate-600">{requiredDisclaimer}</p>
                <p className="mt-5 text-sm leading-6 text-slate-700">Your request is already in our team&apos;s queue. You do not need to submit another form. If your deadline is urgent, call us and quote the reference above.</p>
                <a href="tel:+18326471819" onClick={() => trackEvent('cleanup_consultation_click', { calculator_version: '1.0', cta_name: 'call_about_saved_plan' })} className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary-dark px-6 py-3 text-sm font-black text-white hover:bg-[#002050]"><Phone className="h-4 w-4" />Call (832) 647-1819</a>
              </div>
            </section>
          ) : null}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-xs font-black uppercase tracking-wide text-[#0067b3]">Catch-up vs. cleanup</p><h2 className="mt-3 text-xl font-black text-[#09233f]">They solve different bookkeeping gaps</h2><p className="mt-3 text-sm leading-6 text-slate-600"><strong>Catch-up</strong> brings missing periods up to date. <strong>Cleanup</strong> investigates and corrects existing records, classifications, balances, and reconciliations. Many projects involve both.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-xs font-black uppercase tracking-wide text-[#0067b3]">What affects scope</p><h2 className="mt-3 text-xl font-black text-[#09233f]">History, volume, and record quality</h2><p className="mt-3 text-sm leading-6 text-slate-600">Months behind, transaction volume, account count, reconciliation history, payroll, mixed spending, inventory, sales tax, and multiple entities can all change the work involved.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-xs font-black uppercase tracking-wide text-[#0067b3]">How it works</p><h2 className="mt-3 text-xl font-black text-[#09233f]">Deterministic, not AI-generated</h2><p className="mt-3 text-sm leading-6 text-slate-600">Each fixed answer contributes documented points. Deadline urgency is calculated separately, and no uploaded records or account access are used.</p></article>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_.8fr]">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-[#09233f]">Bookkeeping cleanup calculator FAQs</h2>
              <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 sm:px-7">
                {[
                  ['Is this score a quote?', 'No. It is a preliminary complexity assessment. Final scope, timing, and pricing require review of the actual accounting records.'],
                  ['Do you review my QuickBooks file?', 'Not through this calculator. It uses only the fixed answers you select and never connects to your accounting system.'],
                  ['What if I am not sure about an answer?', 'Choose “Not sure” where available. The scoring model uses a conservative middle value rather than assuming the lowest complexity.'],
                  ['Can a low-complexity result still be urgent?', 'Yes. A short external deadline can be critical even when the likely cleanup work is limited. Urgency and complexity are intentionally separate.'],
                ].map(([questionText, answer]) => <details key={questionText} className="group py-5"><summary className="cursor-pointer list-none pr-6 text-base font-black text-[#09233f] marker:hidden">{questionText}</summary><p className="mt-3 text-sm leading-6 text-slate-600">{answer}</p></details>)}
              </div>
            </div>
            <aside className="rounded-2xl bg-[#09233f] p-7 text-white">
              <h2 className="text-2xl font-black">Explore bookkeeping support</h2><p className="mt-3 text-sm leading-6 text-sky-100">Learn about cleanup scope, ongoing bookkeeping, QuickBooks support, contractor records, and pricing considerations.</p>
              <nav aria-label="Related bookkeeping pages" className="mt-6 grid gap-2">{[
                ['/bookkeeping-cleanup', 'Bookkeeping cleanup services'],
                ['/quickbooks-bookkeeping-services', 'QuickBooks bookkeeping services'],
                ['/small-business-bookkeeping-services', 'Small-business bookkeeping'],
                ['/contractor-bookkeeping-services', 'Contractor bookkeeping'],
                ['/pricing', 'Pricing and scope'],
              ].map(([href, label]) => <Link key={href} href={href} className="flex min-h-11 items-center justify-between rounded-lg bg-white/10 px-4 py-2.5 text-sm font-bold hover:bg-white/15">{label}<ArrowRight className="h-4 w-4" /></Link>)}</nav>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
