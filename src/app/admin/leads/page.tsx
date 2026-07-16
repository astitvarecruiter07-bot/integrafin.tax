import { getLeadMetrics, getLeads } from '@/app/actions/leads';
import { isAdminAuthenticated } from '@/lib/adminAuth';
import { redirect } from 'next/navigation';
import LeadOperationsDashboard, {
  type AdminLeadRecord,
  type LeadMetrics,
} from '@/components/admin/LeadOperationsDashboard';

export const metadata = {
  title: 'Leads Management | IntegraFin Admin',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect('/admin/login?next=/admin/leads');
  }

  const [leadsResult, metricsResult] = await Promise.all([getLeads(), getLeadMetrics()]);
  const initialLoadError = [
    !leadsResult.success ? leadsResult.message : null,
    !metricsResult.success ? metricsResult.message : null,
  ].filter(Boolean).join(' ');

  return (
    <LeadOperationsDashboard
      initialLeads={leadsResult.leads as AdminLeadRecord[]}
      initialMetrics={metricsResult.metrics as LeadMetrics}
      initialLoadError={initialLoadError || undefined}
    />
  );
}
