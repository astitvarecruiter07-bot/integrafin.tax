import type { LeadStatus, StoredLeadStatus } from '@/models/ContactLead';

export const FOLLOW_UP_ACTIVE_STATUSES = [
  'new',
  'contact_attempted',
  'contacted',
  'qualified',
  'appointment_booked',
  'proposal_sent',
] as const satisfies readonly LeadStatus[];

export type FollowUpBucket = 'overdue' | 'today' | 'upcoming' | 'none' | 'inactive';

const followUpActiveStatusSet = new Set<string>(FOLLOW_UP_ACTIVE_STATUSES);

export function isFollowUpActiveStatus(status: StoredLeadStatus) {
  return followUpActiveStatusSet.has(status);
}

export function getFollowUpBucket(
  nextFollowUpAt: string | Date | null | undefined,
  status: StoredLeadStatus,
  referenceTime: number,
): FollowUpBucket {
  if (!isFollowUpActiveStatus(status)) return 'inactive';
  if (!nextFollowUpAt) return 'none';

  const followUpTime = new Date(nextFollowUpAt).getTime();
  if (Number.isNaN(followUpTime)) return 'none';
  if (followUpTime < referenceTime) return 'overdue';

  const endOfToday = new Date(referenceTime);
  endOfToday.setHours(24, 0, 0, 0);
  return followUpTime < endOfToday.getTime() ? 'today' : 'upcoming';
}
