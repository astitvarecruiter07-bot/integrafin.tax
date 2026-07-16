'use client';

import { useMemo, useState } from 'react';
import {
  AlertCircle,
  BadgeDollarSign,
  Building,
  Calendar,
  CheckCircle2,
  Clock3,
  Filter,
  Mail,
  Phone,
  Search,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  getLeadMetrics,
  recordFirstResponse,
  updateLeadDetails,
  updateLeadStatus,
} from '@/app/actions/leads';
import type { LeadStatus } from '@/models/ContactLead';

type LeadAttributionRecord = {
  firstLandingPage?: string;
  currentSubmissionPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
};

export type AdminLeadRecord = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  source: string;
  status: LeadStatus | 'completed';
  estimatedValue?: number;
  actualRevenue?: number;
  reasonLost?: string;
  firstResponseAt?: string;
  appointmentAt?: string;
  statusUpdatedAt?: string;
  internalNotes?: string;
  attribution?: LeadAttributionRecord;
  createdAt: string;
};

export type LeadMetrics = {
  total: number;
  newCount: number;
  qualifiedCount: number;
  appointmentCount: number;
  clientWonCount: number;
  overdueNewCount: number;
  estimatedValue: number;
  wonRevenue: number;
  responseSlaMinutes: number;
  generatedAt: number;
};

type AdminActionFailure = {
  success: false;
  message: string;
  code?: 'UNAUTHORIZED';
};

const statusOptions: Array<{ value: LeadStatus; label: string }> = [
  { value: 'new', label: 'New' },
  { value: 'contact_attempted', label: 'Contact attempted' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'appointment_booked', label: 'Appointment booked' },
  { value: 'proposal_sent', label: 'Proposal sent' },
  { value: 'client_won', label: 'Client won' },
  { value: 'client_lost', label: 'Client lost' },
  { value: 'spam', label: 'Spam' },
  { value: 'duplicate', label: 'Duplicate' },
];

const statusLabels = Object.fromEntries(statusOptions.map(({ value, label }) => [value, label]));

const statusStyles: Record<LeadStatus | 'completed', string> = {
  new: 'border-sky-200 bg-sky-50 text-sky-700',
  contact_attempted: 'border-amber-200 bg-amber-50 text-amber-700',
  contacted: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  qualified: 'border-violet-200 bg-violet-50 text-violet-700',
  appointment_booked: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  proposal_sent: 'border-orange-200 bg-orange-50 text-orange-700',
  client_won: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  client_lost: 'border-rose-200 bg-rose-50 text-rose-700',
  spam: 'border-slate-200 bg-slate-100 text-slate-600',
  duplicate: 'border-slate-200 bg-slate-100 text-slate-600',
  completed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

function formatStatus(status: AdminLeadRecord['status']) {
  return status === 'completed' ? 'Completed (legacy)' : statusLabels[status] || status;
}

function formatDate(value?: string, includeTime = false) {
  if (!value) return 'Not recorded';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not recorded';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...(includeTime ? { hour: 'numeric', minute: '2-digit' } : {}),
  }).format(date);
}

function formatMoney(value?: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function toDateTimeLocal(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function isLeadOverdue(lead: AdminLeadRecord, responseSlaMinutes: number, referenceTime: number) {
  if (lead.status !== 'new' || lead.firstResponseAt) return false;
  return referenceTime - new Date(lead.createdAt).getTime() > responseSlaMinutes * 60_000;
}

function getLeadAge(lead: AdminLeadRecord, referenceTime: number) {
  const minutes = Math.max(0, Math.floor((referenceTime - new Date(lead.createdAt).getTime()) / 60_000));
  if (minutes < 60) return `${minutes}m old`;
  const hours = Math.floor(minutes / 60);
  if (hours < 48) return `${hours}h old`;
  return `${Math.floor(hours / 24)}d old`;
}

function DetailField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</dt>
      <dd className="mt-1 break-words text-sm text-slate-700">{value || 'Unavailable'}</dd>
    </div>
  );
}

export default function LeadOperationsDashboard({
  initialLeads,
  initialMetrics,
  initialLoadError,
}: {
  initialLeads: AdminLeadRecord[];
  initialMetrics: LeadMetrics;
  initialLoadError?: string;
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [metrics, setMetrics] = useState(initialMetrics);
  const [selectedId, setSelectedId] = useState(initialLeads[0]?._id || '');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(
    initialLoadError ? { type: 'error', text: initialLoadError } : null,
  );

  const selectedLead = leads.find((lead) => lead._id === selectedId);
  const services = useMemo(() => [...new Set(leads.map((lead) => lead.service))].sort(), [leads]);
  const sources = useMemo(() => [...new Set(leads.map((lead) => lead.source))].sort(), [leads]);

  const filteredLeads = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const days = dateFilter === 'all' ? 0 : Number(dateFilter);
    const earliest = days ? metrics.generatedAt - days * 86_400_000 : 0;

    return leads.filter((lead) => {
      const matchesSearch =
        !normalizedSearch ||
        [lead.name, lead.email, lead.phone, lead.company, lead.service]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(normalizedSearch));
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesService = serviceFilter === 'all' || lead.service === serviceFilter;
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
      const matchesDate = !earliest || new Date(lead.createdAt).getTime() >= earliest;
      return matchesSearch && matchesStatus && matchesService && matchesSource && matchesDate;
    });
  }, [dateFilter, leads, metrics.generatedAt, search, serviceFilter, sourceFilter, statusFilter]);

  function replaceLead(updatedLead: AdminLeadRecord) {
    setLeads((current) => current.map((lead) => (lead._id === updatedLead._id ? updatedLead : lead)));
  }

  function handleActionFailure(result: AdminActionFailure) {
    if (result.code === 'UNAUTHORIZED') {
      window.location.assign('/admin/login?error=session&next=%2Fadmin%2Fleads');
      return;
    }

    setNotice({ type: 'error', text: result.message });
  }

  async function refreshMetrics() {
    try {
      const result = await getLeadMetrics();
      if (result.success) {
        setMetrics(result.metrics);
        return;
      }

      handleActionFailure(result);
    } catch {
      setNotice({ type: 'error', text: 'The lead was saved, but the dashboard summary could not refresh.' });
    }
  }

  async function handleStatusChange(leadId: string, status: LeadStatus) {
    setSaving(true);
    setNotice(null);
    try {
      const result = await updateLeadStatus({ leadId, status });
      if (result.success) {
        replaceLead(result.lead as AdminLeadRecord);
        setNotice({ type: 'success', text: result.message });
        await refreshMetrics();
      } else {
        handleActionFailure(result);
      }
    } catch {
      setNotice({ type: 'error', text: 'Could not update the lead status. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  async function handleDetailsSubmit(formData: FormData) {
    if (!selectedLead) return;
    setSaving(true);
    setNotice(null);

    const appointmentValue = String(formData.get('appointmentAt') || '');
    const estimatedValue = String(formData.get('estimatedValue') || '');
    const actualRevenue = String(formData.get('actualRevenue') || '');
    const appointmentDate = appointmentValue ? new Date(appointmentValue) : null;

    if (appointmentDate && Number.isNaN(appointmentDate.getTime())) {
      setNotice({ type: 'error', text: 'Enter a valid appointment date and time.' });
      setSaving(false);
      return;
    }

    try {
      const result = await updateLeadDetails({
        leadId: selectedLead._id,
        estimatedValue: estimatedValue ? Number(estimatedValue) : null,
        actualRevenue: actualRevenue ? Number(actualRevenue) : null,
        reasonLost: String(formData.get('reasonLost') || ''),
        internalNotes: String(formData.get('internalNotes') || ''),
        appointmentAt: appointmentDate?.toISOString() || null,
      });

      if (result.success) {
        replaceLead(result.lead as AdminLeadRecord);
        setNotice({ type: 'success', text: result.message });
        await refreshMetrics();
      } else {
        handleActionFailure(result);
      }
    } catch {
      setNotice({ type: 'error', text: 'Could not save the lead details. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  async function handleRecordResponse() {
    if (!selectedLead) return;
    setSaving(true);
    setNotice(null);
    try {
      const result = await recordFirstResponse({ leadId: selectedLead._id });
      if (result.success) {
        replaceLead(result.lead as AdminLeadRecord);
        setNotice({ type: 'success', text: result.message });
        await refreshMetrics();
      } else {
        handleActionFailure(result);
      }
    } catch {
      setNotice({ type: 'error', text: 'Could not record the first response. Please try again.' });
    } finally {
      setSaving(false);
    }
  }

  const summaryCards = [
    { label: 'Total leads', value: metrics.total, detail: `${metrics.newCount} new`, icon: Users },
    { label: 'Qualified', value: metrics.qualifiedCount, detail: `${metrics.appointmentCount} appointments`, icon: UserCheck },
    { label: 'Won clients', value: metrics.clientWonCount, detail: formatMoney(metrics.wonRevenue), icon: CheckCircle2 },
    { label: 'Open pipeline', value: formatMoney(metrics.estimatedValue), detail: 'Estimated value', icon: BadgeDollarSign },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 text-slate-900 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0092df]">Lead operations</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-[#003580]">Customer Leads</h1>
            <p className="mt-2 text-slate-600">Qualify enquiries, track follow-up and connect source to revenue.</p>
          </div>
          {metrics.overdueNewCount > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
              {metrics.overdueNewCount} new {metrics.overdueNewCount === 1 ? 'lead is' : 'leads are'} beyond the {metrics.responseSlaMinutes}-minute SLA
            </div>
          )}
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Lead summary">
          {summaryCards.map(({ label, value, detail, icon: Icon }) => (
            <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</p>
                  <p className="mt-2 text-3xl font-black text-[#003580]">{value}</p>
                  <p className="mt-1 text-sm text-slate-500">{detail}</p>
                </div>
                <div className="rounded-xl bg-sky-50 p-3 text-[#0092df]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </article>
          ))}
        </section>

        {notice && (
          <div aria-live="polite" className={`mb-5 rounded-xl border px-4 py-3 text-sm font-semibold ${notice.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
            {notice.text}
          </div>
        )}

        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <label className="relative xl:col-span-1">
              <span className="sr-only">Search leads</span>
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" aria-hidden="true" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email or phone"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[#0092df] focus:ring-2 focus:ring-sky-100"
              />
            </label>
            <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter}>
              <option value="all">All statuses</option>
              {statusOptions.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
              <option value="completed">Completed (legacy)</option>
            </FilterSelect>
            <FilterSelect label="Service" value={serviceFilter} onChange={setServiceFilter}>
              <option value="all">All services</option>
              {services.map((service) => <option key={service} value={service}>{service}</option>)}
            </FilterSelect>
            <FilterSelect label="Source" value={sourceFilter} onChange={setSourceFilter}>
              <option value="all">All sources</option>
              {sources.map((source) => <option key={source} value={source}>{source}</option>)}
            </FilterSelect>
            <FilterSelect label="Date" value={dateFilter} onChange={setDateFilter}>
              <option value="all">All dates</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </FilterSelect>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Filter className="h-3.5 w-3.5" aria-hidden="true" />
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        </section>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    {['Lead', 'Service and source', 'Status', 'Submitted', 'Follow-up'].map((heading) => (
                      <th key={heading} className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-[#0047AB]">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-16 text-center text-sm text-slate-400">No leads match these filters.</td></tr>
                  ) : filteredLeads.map((lead) => {
                    const overdue = isLeadOverdue(lead, metrics.responseSlaMinutes, metrics.generatedAt);
                    return (
                      <tr
                        key={lead._id}
                        onClick={() => setSelectedId(lead._id)}
                        className={`cursor-pointer transition-colors ${selectedId === lead._id ? 'bg-sky-50/70' : 'hover:bg-slate-50'}`}
                      >
                        <td className="px-5 py-5">
                          <div className="font-bold text-[#003580]">{lead.name}</div>
                          <a onClick={(event) => event.stopPropagation()} href={`mailto:${lead.email}`} className="mt-1 block text-xs text-slate-500 hover:text-[#0092df] hover:underline">{lead.email}</a>
                          {lead.company && <div className="mt-1 flex items-center gap-1 text-xs text-slate-400"><Building className="h-3 w-3" />{lead.company}</div>}
                        </td>
                        <td className="max-w-[240px] px-5 py-5">
                          <div className="truncate text-sm font-semibold text-slate-700">{lead.service}</div>
                          <div className="mt-1 truncate text-xs text-slate-400">{lead.source}</div>
                        </td>
                        <td className="px-5 py-5">
                          <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${statusStyles[lead.status]}`}>
                            {formatStatus(lead.status)}
                          </span>
                        </td>
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-2 text-sm text-slate-600"><Calendar className="h-3.5 w-3.5" />{formatDate(lead.createdAt)}</div>
                          <div className="mt-1 text-xs text-slate-400">{getLeadAge(lead, metrics.generatedAt)}</div>
                        </td>
                        <td className="px-5 py-5">
                          {lead.firstResponseAt ? (
                            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4" />Responded {formatDate(lead.firstResponseAt, true)}</div>
                          ) : overdue ? (
                            <div className="flex items-center gap-2 text-xs font-bold text-amber-700"><AlertCircle className="h-4 w-4" />Response overdue</div>
                          ) : (
                            <div className="flex items-center gap-2 text-xs text-slate-500"><Clock3 className="h-4 w-4" />Within SLA</div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white shadow-sm xl:sticky xl:top-28">
            {selectedLead ? (
              <div key={`${selectedLead._id}-${selectedLead.statusUpdatedAt || ''}`}>
                <div className="border-b border-slate-200 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lead details</p>
                      <h2 className="mt-1 text-xl font-black text-[#003580]">{selectedLead.name}</h2>
                    </div>
                    {isLeadOverdue(selectedLead, metrics.responseSlaMinutes, metrics.generatedAt) && <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black uppercase text-amber-700">Overdue</span>}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <a href={`mailto:${selectedLead.email}`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-[#0047AB] hover:bg-slate-50"><Mail className="h-3.5 w-3.5" />Email</a>
                    <a href={`tel:${selectedLead.phone}`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-[#0047AB] hover:bg-slate-50"><Phone className="h-3.5 w-3.5" />Call</a>
                  </div>
                </div>

                <div className="space-y-6 p-5">
                  <div>
                    <label htmlFor="lead-status" className="text-xs font-black uppercase tracking-widest text-slate-500">Pipeline status</label>
                    <select
                      id="lead-status"
                      value={selectedLead.status}
                      disabled={saving}
                      onChange={(event) => handleStatusChange(selectedLead._id, event.target.value as LeadStatus)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold outline-none focus:border-[#0092df] focus:ring-2 focus:ring-sky-100 disabled:opacity-60"
                    >
                      {selectedLead.status === 'completed' && <option value="completed" disabled>Completed (legacy)</option>}
                      {statusOptions.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                    </select>
                  </div>

                  {!selectedLead.firstResponseAt && (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={handleRecordResponse}
                      className="w-full rounded-xl bg-[#003580] px-4 py-3 text-sm font-bold text-white hover:bg-[#002050] disabled:opacity-60"
                    >
                      Record first response now
                    </button>
                  )}

                  <dl className="grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
                    <DetailField label="Email" value={selectedLead.email} />
                    <DetailField label="Phone" value={selectedLead.phone} />
                    <DetailField label="Service" value={selectedLead.service} />
                    <DetailField label="Source" value={selectedLead.source} />
                    <DetailField label="First response" value={formatDate(selectedLead.firstResponseAt, true)} />
                    <DetailField label="Appointment" value={formatDate(selectedLead.appointmentAt, true)} />
                    <DetailField label="Status updated" value={formatDate(selectedLead.statusUpdatedAt, true)} />
                  </dl>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Customer message</h3>
                    <p className="mt-2 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">{selectedLead.message}</p>
                  </div>

                  <form action={handleDetailsSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Estimated value (USD)" name="estimatedValue" type="number" defaultValue={selectedLead.estimatedValue} />
                      <FormField label="Actual revenue (USD)" name="actualRevenue" type="number" defaultValue={selectedLead.actualRevenue} />
                    </div>
                    <FormField label="Appointment" name="appointmentAt" type="datetime-local" defaultValue={toDateTimeLocal(selectedLead.appointmentAt)} />
                    <div>
                      <label htmlFor="reasonLost" className="text-xs font-black uppercase tracking-widest text-slate-500">Reason lost</label>
                      <textarea id="reasonLost" name="reasonLost" maxLength={1000} defaultValue={selectedLead.reasonLost || ''} rows={2} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#0092df] focus:ring-2 focus:ring-sky-100" />
                    </div>
                    <div>
                      <label htmlFor="internalNotes" className="text-xs font-black uppercase tracking-widest text-slate-500">Internal notes</label>
                      <textarea id="internalNotes" name="internalNotes" maxLength={5000} defaultValue={selectedLead.internalNotes || ''} rows={4} placeholder="Visible only to authenticated admins" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#0092df] focus:ring-2 focus:ring-sky-100" />
                    </div>
                    <button disabled={saving} className="w-full rounded-xl bg-[#00C2CB] px-4 py-3 text-sm font-black text-[#003580] hover:brightness-105 disabled:opacity-60">
                      {saving ? 'Saving…' : 'Save lead details'}
                    </button>
                  </form>

                  {selectedLead.attribution && (
                    <details className="rounded-xl border border-slate-200 p-4 text-sm">
                      <summary className="cursor-pointer font-bold text-[#0047AB]">Attribution details</summary>
                      <dl className="mt-4 space-y-3">
                        <DetailField label="First page" value={selectedLead.attribution.firstLandingPage} />
                        <DetailField label="Submission page" value={selectedLead.attribution.currentSubmissionPage} />
                        <DetailField label="Referrer" value={selectedLead.attribution.referrer || 'Direct / unavailable'} />
                        <DetailField label="Campaign" value={selectedLead.attribution.utmCampaign || 'None'} />
                        <DetailField label="Source / medium" value={[selectedLead.attribution.utmSource, selectedLead.attribution.utmMedium].filter(Boolean).join(' / ') || 'None'} />
                        <DetailField label="Ad click ID" value={(selectedLead.attribution.gclid || selectedLead.attribution.gbraid || selectedLead.attribution.wbraid || selectedLead.attribution.msclkid) ? 'Present' : 'None'} />
                      </dl>
                    </details>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-10 text-center text-sm text-slate-400">Select a lead to view and update it.</div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#0092df] focus:ring-2 focus:ring-sky-100">
        {children}
      </select>
    </label>
  );
}

function FormField({
  label,
  name,
  type,
  defaultValue,
}: {
  label: string;
  name: string;
  type: 'number' | 'datetime-local';
  defaultValue?: string | number;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        min={type === 'number' ? 0 : undefined}
        max={type === 'number' ? 1_000_000_000 : undefined}
        step={type === 'number' ? '0.01' : undefined}
        defaultValue={defaultValue ?? ''}
        className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#0092df] focus:ring-2 focus:ring-sky-100"
      />
    </div>
  );
}
