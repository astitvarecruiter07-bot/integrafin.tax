import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));
vi.mock('@/lib/mongodb', () => ({ default: vi.fn() }));
vi.mock('@/lib/zohoCrm', () => ({ syncWebsiteLeadToZoho: vi.fn() }));
vi.mock('@/models/ContactLead', () => ({
  default: { findById: vi.fn(), findByIdAndUpdate: vi.fn() },
}));

import ContactLead from '@/models/ContactLead';
import { syncWebsiteLeadToZoho } from '@/lib/zohoCrm';
import { syncStoredLeadToZoho } from './zohoLeadSync';

const storedLead = {
  name: 'Taylor Morgan',
  email: 'taylor@example.com',
  phone: '+1 832 555 0100',
  company: 'Morgan LLC',
  service: 'Bookkeeping Cleanup',
  message: 'Please call next week.',
  source: 'contact-page',
  attribution: { utmSource: 'google', utmMedium: 'cpc', utmCampaign: 'cleanup' },
  zohoSyncStatus: 'pending',
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(ContactLead.findById).mockReturnValue({ lean: vi.fn().mockResolvedValue(storedLead) } as never);
  vi.mocked(syncWebsiteLeadToZoho).mockResolvedValue({ status: 'synced', recordId: 'zoho-456' });
});

describe('stored lead Zoho sync', () => {
  it.each([
    'contact-page',
    'home-page-callback',
    'facebook-bookkeeping-99-simple',
    'roofing-bookkeeping-houston-landing',
    'bookkeeping-cleanup-calculator',
    'bookkeeping_cleanup_review',
    'newsletter',
    'calendly-booking',
  ])('syncs a newly saved %s lead and records its Zoho ID', async (source) => {
    vi.mocked(ContactLead.findById).mockReturnValue({
      lean: vi.fn().mockResolvedValue({ ...storedLead, source }),
    } as never);

    await syncStoredLeadToZoho('website-123');

    expect(syncWebsiteLeadToZoho).toHaveBeenCalledWith({
      leadId: 'website-123',
      name: storedLead.name,
      email: storedLead.email,
      phone: storedLead.phone,
      company: storedLead.company,
      service: storedLead.service,
      message: storedLead.message,
      source,
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'cleanup',
    });
    expect(ContactLead.findByIdAndUpdate).toHaveBeenCalledWith('website-123', {
      $set: {
        zohoSyncStatus: 'synced',
        zohoSyncCheckedAt: expect.any(Date),
        zohoRecordId: 'zoho-456',
      },
    });
  });

  it('does not create a second Zoho record for an already synced lead', async () => {
    vi.mocked(ContactLead.findById).mockReturnValue({
      lean: vi.fn().mockResolvedValue({ ...storedLead, zohoSyncStatus: 'synced' }),
    } as never);

    await syncStoredLeadToZoho('website-123');

    expect(syncWebsiteLeadToZoho).not.toHaveBeenCalled();
    expect(ContactLead.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('omits the newsletter phone placeholder from Zoho', async () => {
    vi.mocked(ContactLead.findById).mockReturnValue({
      lean: vi.fn().mockResolvedValue({
        ...storedLead,
        recordKind: 'subscriber',
        source: 'newsletter',
        phone: 'Not provided',
      }),
    } as never);

    await syncStoredLeadToZoho('website-123');

    expect(syncWebsiteLeadToZoho).toHaveBeenCalledWith(expect.objectContaining({
      source: 'newsletter',
      phone: '',
    }));
  });

  it('records a Zoho failure without overwriting a record ID', async () => {
    vi.mocked(syncWebsiteLeadToZoho).mockResolvedValue({ status: 'failed' });

    await syncStoredLeadToZoho('website-123');

    expect(ContactLead.findByIdAndUpdate).toHaveBeenCalledWith('website-123', {
      $set: { zohoSyncStatus: 'failed', zohoSyncCheckedAt: expect.any(Date) },
    });
  });
});
