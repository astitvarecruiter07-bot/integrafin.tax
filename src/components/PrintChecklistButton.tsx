'use client';

import { Printer } from 'lucide-react';

export default function PrintChecklistButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <Printer size={18} aria-hidden="true" />
      Print this checklist
    </button>
  );
}
