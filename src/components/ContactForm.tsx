'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { submitLead } from '@/app/actions/leads';
import { useRouter } from 'next/navigation';
import { getLeadAttribution } from '@/lib/attribution';
import { baseEventParameters, trackEvent, useFormAnalytics } from '@/lib/analytics';

const FORM_SOURCE = 'contact-page';

export default function ContactForm() {
  const router = useRouter();
  const trackFormStart = useFormAnalytics(FORM_SOURCE);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
      source: FORM_SOURCE,
      attribution: getLeadAttribution(),
    };

    try {
      const result = await submitLead(data);
      if (result.success) {
        trackEvent('lead_submit', {
          ...baseEventParameters(data.attribution),
          service: data.service,
          form_source: FORM_SOURCE,
          cta_name: 'request_call_back',
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
      <div className="py-12 flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-[#003580] tracking-tight">Message Received!</h3>
          <p className="text-gray-600 max-w-sm">{message.text}</p>
        </div>
        <button 
          onClick={() => setMessage(null)}
          className="text-[#00C2CB] font-bold text-sm uppercase tracking-widest hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      action={handleSubmit}
      onFocusCapture={trackFormStart}
      className="space-y-6"
    >
      {message?.type === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          {message.text}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label htmlFor="contact-name" className="text-xs sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#003580]">Full Name</label>
          <input 
            id="contact-name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className="w-full bg-gray-50 border-none focus:ring-1 focus:ring-[#00C2CB] p-4 text-sm rounded-lg" 
            placeholder="John Doe" 
            type="text" 
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="contact-email" className="text-xs sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#003580]">Email Address</label>
          <input 
            id="contact-email"
            name="email"
            required
            autoComplete="email"
            className="w-full bg-gray-50 border-none focus:ring-1 focus:ring-[#00C2CB] p-4 text-sm rounded-lg" 
            placeholder="john@example.com" 
            type="email" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label htmlFor="contact-phone" className="text-xs sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#003580]">Phone</label>
          <input 
            id="contact-phone"
            name="phone"
            required
            minLength={10}
            maxLength={20}
            autoComplete="tel"
            className="w-full bg-gray-50 border-none focus:ring-1 focus:ring-[#00C2CB] p-4 text-sm rounded-lg" 
            placeholder="+1 (000) 000-0000" 
            type="tel" 
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="contact-company" className="text-xs sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#003580]">Company Name (Optional)</label>
          <input 
            id="contact-company"
            name="company"
            maxLength={100}
            autoComplete="organization"
            className="w-full bg-gray-50 border-none focus:ring-1 focus:ring-[#00C2CB] p-4 text-sm rounded-lg" 
            placeholder="Your Firm LLC" 
            type="text" 
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="contact-service" className="text-xs sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#003580]">Enquiry Type</label>
        <select 
          id="contact-service"
          name="service"
          required
          className="w-full bg-gray-50 border-none focus:ring-1 focus:ring-[#00C2CB] p-4 text-sm rounded-lg appearance-none"
        >
          <option value="">Select a service...</option>
          <option value="Individual Taxes">Individual Taxes</option>
          <option value="Business Bookkeeping and Taxes">Business Bookkeeping and Taxes</option>
          <option value="New Business Formation">New Business Formation</option>
          <option value="Tax Expert Bookkeeping Outsourcing">Tax Expert Bookkeeping Outsourcing</option>
          <option value="Partnership LLC / Single Member LLC Inquiries">Partnership LLC / Single Member LLC Inquiries</option>
          <option value="Other Enquiry">Other Enquiry</option>
        </select>
      </div>
      
      <div className="space-y-1">
        <label htmlFor="contact-message" className="text-xs sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#003580]">Message</label>
        <textarea 
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          className="w-full bg-gray-50 border-none focus:ring-1 focus:ring-[#00C2CB] p-4 text-sm rounded-lg" 
          placeholder="How can our experts assist you today?" 
          rows={4}
        ></textarea>
      </div>
      
      <button 
        disabled={isPending}
        className="w-full md:w-auto bg-[#00C2CB] text-[#003580] px-12 py-4 rounded-lg font-black text-xs uppercase tracking-[0.2em] hover:brightness-105 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" 
        type="submit"
      >
        {isPending ? (
          <>
            Processing...
            <Loader2 className="w-4 h-4 animate-spin" />
          </>
        ) : (
          <>
            Request Call Back
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
