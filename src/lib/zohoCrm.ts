import 'server-only';

type WebsiteLead = {
  leadId: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  source: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type ZohoSyncResult =
  | { status: 'synced'; recordId: string }
  | { status: 'duplicate' | 'not_configured' | 'failed' };

const ZOHO_DOMAINS = {
  com: { accounts: 'accounts.zoho.com', api: 'www.zohoapis.com' },
  in: { accounts: 'accounts.zoho.in', api: 'www.zohoapis.in' },
  eu: { accounts: 'accounts.zoho.eu', api: 'www.zohoapis.eu' },
  'com.au': { accounts: 'accounts.zoho.com.au', api: 'www.zohoapis.com.au' },
  jp: { accounts: 'accounts.zoho.jp', api: 'www.zohoapis.jp' },
  'com.cn': { accounts: 'accounts.zoho.com.cn', api: 'www.zohoapis.com.cn' },
  ca: { accounts: 'accounts.zohocloud.ca', api: 'www.zohoapis.ca' },
  sa: { accounts: 'accounts.zoho.sa', api: 'www.zohoapis.sa' },
} as const;

function getConfiguration() {
  const region = process.env.ZOHO_REGION?.trim();
  const clientId = process.env.ZOHO_CLIENT_ID?.trim();
  const clientSecret = process.env.ZOHO_CLIENT_SECRET?.trim();
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN?.trim();
  if (!region || !(region in ZOHO_DOMAINS) || !clientId || !clientSecret || !refreshToken) {
    return null;
  }
  return { domains: ZOHO_DOMAINS[region as keyof typeof ZOHO_DOMAINS], clientId, clientSecret, refreshToken };
}

export function mapWebsiteLeadToZoho(lead: WebsiteLead) {
  const nameParts = lead.name.trim().split(/\s+/);
  const lastName = nameParts.pop() || lead.name.trim();
  const firstName = nameParts.join(' ');
  const description = [
    `Website lead ID: ${lead.leadId}`,
    `Full name: ${lead.name}`,
    `Requested service: ${lead.service}`,
    `Source: ${lead.source}`,
    lead.email.length > 100 ? `Email: ${lead.email}` : '',
    lead.utmSource ? `UTM source: ${lead.utmSource}` : '',
    lead.utmMedium ? `UTM medium: ${lead.utmMedium}` : '',
    lead.utmCampaign ? `UTM campaign: ${lead.utmCampaign}` : '',
    lead.message ? `Message:\n${lead.message}` : '',
  ].filter(Boolean).join('\n');

  return {
    Last_Name: lastName.slice(0, 80),
    ...(firstName ? { First_Name: firstName.slice(0, 40) } : {}),
    ...(lead.email && lead.email.length <= 100 ? { Email: lead.email } : {}),
    ...(lead.phone ? { Phone: lead.phone } : {}),
    ...(lead.company ? { Company: lead.company } : {}),
    Description: description,
  };
}

export async function syncWebsiteLeadToZoho(lead: WebsiteLead): Promise<ZohoSyncResult> {
  const configuration = getConfiguration();
  if (!configuration) return { status: 'not_configured' };

  try {
    const tokenResponse = await fetch(`https://${configuration.domains.accounts}/oauth/v2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: configuration.refreshToken,
        client_id: configuration.clientId,
        client_secret: configuration.clientSecret,
        grant_type: 'refresh_token',
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    if (!tokenResponse.ok) return { status: 'failed' };

    const token = await tokenResponse.json() as { access_token?: string; api_domain?: string };
    if (!token.access_token || !token.api_domain) return { status: 'failed' };
    const apiDomain = new URL(token.api_domain);
    if (apiDomain.protocol !== 'https:' || apiDomain.hostname !== configuration.domains.api || apiDomain.port || apiDomain.username || apiDomain.password || apiDomain.pathname !== '/' || apiDomain.search || apiDomain.hash) {
      return { status: 'failed' };
    }

    const response = await fetch(`${apiDomain.origin}/crm/v8/Leads`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${token.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: [mapWebsiteLeadToZoho(lead)] }),
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    const payload = await response.json() as {
      code?: string;
      data?: Array<{ status?: string; code?: string; details?: { id?: string } }>;
    };
    if (payload.code === 'DUPLICATE_DATA') return { status: 'duplicate' };
    if (!response.ok && response.status !== 207) return { status: 'failed' };
    const record = payload.data?.[0];
    if (record?.status === 'success' && record.details?.id) {
      return { status: 'synced', recordId: record.details.id };
    }
    if (record?.code === 'DUPLICATE_DATA') return { status: 'duplicate' };
    return { status: 'failed' };
  } catch {
    return { status: 'failed' };
  }
}
