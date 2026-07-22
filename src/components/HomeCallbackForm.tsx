'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
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

const FORM_SOURCE = 'home-page-callback';

export default function HomeCallbackForm() {
  const router = useRouter();
  const trackFormStart = useFormAnalytics(FORM_SOURCE);
  const [selectedService, setSelectedService] = useState<LeadService | ''>('');
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
        (document.getElementById('home-callback-form') as HTMLFormElement).reset();
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
      <div className="py-8 flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-black text-[#003580] tracking-tight">Request Sent!</h3>
          <p className="text-gray-600 text-sm max-w-xs">{message.text}</p>
        </div>
        <button
          onClick={() => setMessage(null)}
          className="text-[#00C2CB] font-bold text-xs uppercase tracking-widest hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      id="home-callback-form"
      action={handleSubmit}
      onFocusCapture={trackFormStart}
      className="space-y-4"
    >
      {message?.type === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg" role="alert">
          {message.text}
        </div>
      )}

      <input
        id="callback-name"
        name="name"
        required
        minLength={2}
        maxLength={100}
        autoComplete="name"
        aria-label="Full Name"
        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all"
        placeholder="Full Name"
        type="text"
      />

      <select
        id="callback-service"
        name="service"
        required
        value={selectedService}
        onChange={(event) => setSelectedService(normalizeLeadService(event.target.value))}
        aria-label="Service Needed"
        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#45474c] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all"
      >
        <option value="">Service Needed</option>
        {LEAD_SERVICE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            id="callback-email"
            name="email"
            autoComplete="email"
            aria-label="Email"
            aria-describedby="callback-method-help"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all"
            placeholder="Email"
            type="email"
          />
          <input
            id="callback-phone"
            name="phone"
            minLength={10}
            maxLength={20}
            autoComplete="tel"
            aria-label="Phone"
            aria-describedby="callback-method-help"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all"
            placeholder="Phone"
            type="tel"
          />
        </div>
        <p id="callback-method-help" className="mt-2 text-xs text-slate-500">
          Provide at least one way to reach you: email or phone.
        </p>
      </div>

      <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer text-sm font-bold text-[#003580]">
          Add situation details (optional)
        </summary>
        <textarea
          id="callback-message"
          name="message"
          maxLength={2000}
          aria-label="Message"
          className="mt-4 w-full bg-white border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all"
          placeholder="Share a deadline or brief concern. Do not include sensitive tax or financial information."
          rows={4}
        />
      </details>

      <button
        disabled={isPending}
        className="w-full bg-[#00C2CB] text-[#003580] py-5 px-5 rounded-lg font-black uppercase tracking-[0.14em] shadow-lg shadow-[#00C2CB]/20 hover:bg-[#33ced5] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            Requesting...
            <Loader2 className="w-4 h-4 animate-spin" />
          </>
        ) : submitLabel}
      </button>

      <div className="pt-2 text-center">
        <p className="text-xs text-[#45474c]">
          Prefer to call?{' '}
          <a href="tel:+18326471819" data-analytics-label="home_form_phone_call" className="text-[#0047AB] font-bold hover:underline">
            (832) 647-1819
          </a>{' '}
          · Mon–Fri, 9AM–6PM
        </p>
      </div>
    </form>
  );
}
