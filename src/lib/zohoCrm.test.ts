import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { mapWebsiteLeadToZoho, syncWebsiteLeadToZoho } from './zohoCrm';

const lead = {
  leadId: 'website-123',
  name: 'Taylor Morgan',
  email: 'taylor@example.com',
  phone: '+1 832 555 0100',
  company: 'Morgan LLC',
  service: 'Tax Preparation',
  message: 'Please call next week.',
  source: 'contact-page',
  utmSource: 'google',
};

function configureZoho(region = 'com') {
  vi.stubEnv('ZOHO_REGION', region);
  vi.stubEnv('ZOHO_CLIENT_ID', 'client-id');
  vi.stubEnv('ZOHO_CLIENT_SECRET', 'client-secret');
  vi.stubEnv('ZOHO_REFRESH_TOKEN', 'refresh-token');
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('Zoho CRM website lead sync', () => {
  it('maps the contact form fields without a Zoho-specific browser field', () => {
    expect(mapWebsiteLeadToZoho(lead)).toEqual({
      First_Name: 'Taylor',
      Last_Name: 'Morgan',
      Email: 'taylor@example.com',
      Phone: '+1 832 555 0100',
      Company: 'Morgan LLC',
      Description: expect.stringContaining('Requested service: Tax Preparation'),
    });
    expect(mapWebsiteLeadToZoho(lead).Description).toContain('Message:\nPlease call next week.');
    expect(mapWebsiteLeadToZoho(lead).Description).toContain('UTM source: google');
  });

  it('does not call Zoho when credentials are missing', async () => {
    expect(await syncWebsiteLeadToZoho(lead)).toEqual({ status: 'not_configured' });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('refreshes a token and creates a lead using only server-side credentials', async () => {
    configureZoho();
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json({ access_token: 'access-token', api_domain: 'https://www.zohoapis.com' }))
      .mockResolvedValueOnce(Response.json({ data: [{ status: 'success', details: { id: 'zoho-456' } }] }));

    expect(await syncWebsiteLeadToZoho(lead)).toEqual({ status: 'synced', recordId: 'zoho-456' });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(vi.mocked(fetch).mock.calls[0][0]).toBe('https://accounts.zoho.com/oauth/v2/token');
    expect(vi.mocked(fetch).mock.calls[1][0]).toBe('https://www.zohoapis.com/crm/v8/Leads');
    expect(JSON.parse(String(vi.mocked(fetch).mock.calls[1][1]?.body))).toEqual({
      data: [mapWebsiteLeadToZoho(lead)],
    });
  });

  it('recognizes a duplicate and does not claim the record was created', async () => {
    configureZoho();
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json({ access_token: 'access-token', api_domain: 'https://www.zohoapis.com' }))
      .mockResolvedValueOnce(Response.json({ code: 'DUPLICATE_DATA' }, { status: 400 }));

    expect(await syncWebsiteLeadToZoho(lead)).toEqual({ status: 'duplicate' });
  });

  it('rejects an unexpected API domain returned by the token service', async () => {
    configureZoho();
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({
      access_token: 'access-token',
      api_domain: 'https://example.com',
    }));

    expect(await syncWebsiteLeadToZoho(lead)).toEqual({ status: 'failed' });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
