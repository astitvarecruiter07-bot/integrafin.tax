'use client';

import { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { submitLead } from '@/app/actions/leads';

export default function HomeCallbackForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
      source: 'home-page-callback',
    };

    try {
      const result = await submitLead(data);
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        (document.getElementById('home-callback-form') as HTMLFormElement).reset();
      } else {
        setMessage({ type: 'error', text: result.message || 'Something went wrong.' });
      }
    } catch (error) {
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
    <form id="home-callback-form" action={handleSubmit} className="space-y-4">
      {message?.type === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
          {message.text}
        </div>
      )}
      
      <input 
        name="name"
        required
        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all" 
        placeholder="Full Name" 
        type="text" 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input 
          name="email"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all" 
          placeholder="Email" 
          type="email" 
        />
        <input 
          name="phone"
          required
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all" 
          placeholder="Phone" 
          type="tel" 
        />
      </div>
      
      <select 
        name="service"
        required
        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#45474c] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all"
      >
        <option value="">Enquiry Type</option>
        <option value="Corporate Tax">Corporate Tax</option>
        <option value="Individual Filing">Individual Filing</option>
        <option value="Audit Representation">Audit Representation</option>
        <option value="Bookkeeping">Bookkeeping</option>
      </select>
      
      <textarea 
        name="message"
        required
        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-[#191c1e] focus:ring-[#00C2CB] focus:border-[#00C2CB] transition-all" 
        placeholder="Message" 
        rows={4}
      ></textarea>
      
      <button 
        disabled={isPending}
        className="w-full bg-[#00C2CB] text-[#003580] py-5 rounded-lg font-black uppercase tracking-[0.2em] shadow-lg shadow-[#00C2CB]/20 hover:bg-[#33ced5] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            Requesting...
            <Loader2 className="w-4 h-4 animate-spin" />
          </>
        ) : (
          'Request Callback'
        )}
      </button>
      
      <div className="pt-4 text-center">
        <p className="text-xs text-[#45474c]">Prefer to call? <span className="text-[#0047AB] font-bold">(832) 647-1819</span> • Available 24/7</p>
      </div>
    </form>
  );
}
