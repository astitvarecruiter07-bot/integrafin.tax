'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { submitLead } from '@/app/actions/leads';
import { useRouter } from 'next/navigation';
import { getLeadAttribution } from '@/lib/attribution';
import { baseEventParameters, trackEvent, useFormAnalytics } from '@/lib/analytics';
import {
  getLeadCtaLabel,
  LEAD_SERVICE_OPTIONS,
  normalizeLeadService,
  type LeadService,
} from '@/lib/leadServices';

const FORM_SOURCE = 'contact-page';

export default function ContactForm({ initialService = '' }: { initialService?: LeadService | '' }) {
  const router = useRouter();
  const trackFormStart = useFormAnalytics(FORM_SOURCE);
  const [selectedService, setSelectedService] = useState<LeadService | ''>(initialService);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const submitLabel = selectedService
    ? getLeadCtaLabel(selectedService, 'Request a Consultation')
    : 'Request a Consultation';

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);

    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();

    if (!email && !phone) {
      setMessage({ type: 'error', text: 'Please provide an email address or phone number.' });
      setIsPending(false);
      return;
    }

    const data = {
      name: String(formData.get('name') || '').trim(),
      email,
      phone,
      company: String(formData.get('company') || '').trim(),
      service: String(formData.get('service') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      source: FORM_SOURCE,
      attribution: getLeadAttribution(),
    };

    try {
      const result = await submitLead(data);
      if (result.success) {
        trackEvent('generate_lead', {
          ...baseEventParameters(data.attribution),
          service: data.service,
          form_source: FORM_SOURCE,
          cta_name: 'request_consultation',
        });
        setMessage({ type: 'success', text: result.message });
        (document.getElementById('contact-form') as HTMLFormElement).reset();
        router.push('/thank-you');
      } else {
        setMessage({ type: 'error', text: result.message || 'Something went wrong.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsPending(false);
    }
  }

  if (message?.type === 'success') {
    return (
      <div className="flex flex-col items-center space-y-6 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-10 w-10 text-emerald-700" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tight text-primary-dark">Request received</h3>
          <p className="max-w-sm leading-6 text-slate-600">{message.text}</p>
        </div>
        <button
          onClick={() => setMessage(null)}
          className="text-sm font-bold text-primary hover:text-primary-dark hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      action={handleSubmit}
      onFocusCapture={trackFormStart}
      className="space-y-5"
    >
      {message?.type === 'error' && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700" role="alert">
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="contact-name" className="text-sm font-bold text-primary-dark">Full name</label>
          <input
            id="contact-name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-blue-bright focus:ring-4 focus:ring-highlight-light"
            placeholder="John Doe"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="contact-service" className="text-sm font-bold text-primary-dark">Service needed</label>
          <select
            id="contact-service"
            name="service"
            required
            value={selectedService}
            onChange={(event) => setSelectedService(normalizeLeadService(event.target.value))}
            className="w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-brand-blue-bright focus:ring-4 focus:ring-highlight-light"
          >
            <option value="">Select a service...</option>
            {LEAD_SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="contact-email" className="text-sm font-bold text-primary-dark">Email address</label>
            <input
              id="contact-email"
              name="email"
              autoComplete="email"
              aria-describedby="contact-method-help"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-blue-bright focus:ring-4 focus:ring-highlight-light"
              placeholder="john@example.com"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-phone" className="text-sm font-bold text-primary-dark">Phone number</label>
            <input
              id="contact-phone"
              name="phone"
              minLength={10}
              maxLength={20}
              autoComplete="tel"
              aria-describedby="contact-method-help"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-blue-bright focus:ring-4 focus:ring-highlight-light"
              placeholder="+1 (000) 000-0000"
              type="tel"
            />
          </div>
        </div>
        <p id="contact-method-help" className="mt-2 text-sm leading-6 text-slate-500">
          Provide at least one way to reach you: email or phone.
        </p>
      </div>

      <details className="rounded-xl border border-slate-200 bg-slate-50 p-4 open:bg-white">
        <summary className="cursor-pointer text-sm font-bold text-primary-dark marker:text-brand-blue">
          Add company or situation details (optional)
        </summary>
        <div className="mt-5 space-y-5">
          <div className="space-y-2">
            <label htmlFor="contact-company" className="text-sm font-bold text-primary-dark">Company name</label>
            <input
              id="contact-company"
              name="company"
              maxLength={100}
              autoComplete="organization"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-blue-bright focus:ring-4 focus:ring-highlight-light"
              placeholder="Your Firm LLC"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-sm font-bold text-primary-dark">Situation details</label>
            <textarea
              id="contact-message"
              name="message"
              maxLength={2000}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-blue-bright focus:ring-4 focus:ring-highlight-light"
              placeholder="Share any deadline, notice number, or bookkeeping concern. Do not include sensitive tax or financial information."
              rows={4}
            />
          </div>
        </div>
      </details>

      <button
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-dark px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary-dark/15 transition-all hover:-translate-y-0.5 hover:bg-brand-blue-dark focus:outline-none focus:ring-4 focus:ring-highlight-light disabled:cursor-not-allowed disabled:opacity-70"
        type="submit"
      >
        {isPending ? (
          <>
            Processing...
            <Loader2 className="w-4 h-4 animate-spin" />
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
