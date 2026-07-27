const JUSTCALL_DIALER_URL = 'https://app.justcall.io/dialer';

export function getJustCallNumber(phone: string) {
  const trimmedPhone = phone.trim();
  const digits = trimmedPhone.replace(/\D/g, '');

  if (digits.length < 10 || digits.length > 15) return null;
  if (trimmedPhone.startsWith('+')) return `+${digits}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return null;
}

export function getJustCallDialerUrl(phone: string) {
  const normalizedNumber = getJustCallNumber(phone);
  if (!normalizedNumber) return null;

  const dialerUrl = new URL(JUSTCALL_DIALER_URL);
  dialerUrl.searchParams.set('numbers', normalizedNumber);
  return dialerUrl.toString();
}
