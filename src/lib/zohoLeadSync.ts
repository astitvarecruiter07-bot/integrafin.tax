import 'server-only';

import dbConnect from '@/lib/mongodb';
import { syncWebsiteLeadToZoho } from '@/lib/zohoCrm';
import ContactLead from '@/models/ContactLead';

export async function syncStoredLeadToZoho(leadId: string) {
  try {
    await dbConnect();
    const lead = await ContactLead.findById(leadId).lean();
    if (!lead || lead.zohoSyncStatus === 'synced' || lead.zohoSyncStatus === 'duplicate') return;

    const result = await syncWebsiteLeadToZoho({
      leadId,
      name: lead.name,
      email: lead.email,
      phone: lead.recordKind === 'subscriber' ? '' : lead.phone,
      company: lead.company,
      service: lead.service,
      message: lead.message,
      source: lead.source,
      utmSource: lead.attribution?.utmSource,
      utmMedium: lead.attribution?.utmMedium,
      utmCampaign: lead.attribution?.utmCampaign,
    });

    await ContactLead.findByIdAndUpdate(leadId, {
      $set: {
        zohoSyncStatus: result.status,
        zohoSyncCheckedAt: new Date(),
        ...(result.status === 'synced' ? { zohoRecordId: result.recordId } : {}),
      },
    });
  } catch (error) {
    console.error('Could not sync website lead to Zoho CRM.', {
      leadId,
      error: error instanceof Error ? error.name : 'UnknownError',
    });
    try {
      await ContactLead.findByIdAndUpdate(leadId, {
        $set: { zohoSyncStatus: 'failed', zohoSyncCheckedAt: new Date() },
      });
    } catch {
      // The original failure is already logged without exposing lead data or credentials.
    }
  }
}
