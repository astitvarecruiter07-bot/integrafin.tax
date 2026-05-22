const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_TOKEN || '';
}

function toBase64Url(base64: string) {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(base64url: string) {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = base64.length % 4 ? '='.repeat(4 - (base64.length % 4)) : '';
  return `${base64}${padding}`;
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return toBase64Url(btoa(binary));
}

function base64UrlToBytes(base64url: string) {
  const base64 = fromBase64Url(base64url);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function encodeBase64Url(input: string) {
  return bytesToBase64Url(new TextEncoder().encode(input));
}

function decodeBase64Url(input: string) {
  return new TextDecoder().decode(base64UrlToBytes(input));
}

async function signPayload(payloadB64: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(payloadB64)
  );

  return bytesToBase64Url(new Uint8Array(signature));
}

export function getAdminSessionTtlSeconds() {
  return SESSION_TTL_SECONDS;
}

export async function createAdminSessionToken(username: string) {
  const secret = getSecret();
  if (!secret) return null;

  const payload = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    nonce: crypto.randomUUID(),
  };

  const payloadB64 = encodeBase64Url(JSON.stringify(payload));
  const signature = await signPayload(payloadB64, secret);
  return `${payloadB64}.${signature}`;
}

export async function verifyAdminSessionToken(token: string | undefined) {
  if (!token) return false;

  const secret = getSecret();
  if (!secret) return false;

  const [payloadB64, providedSig] = token.split('.');
  if (!payloadB64 || !providedSig) return false;

  const expectedSig = await signPayload(payloadB64, secret);
  if (providedSig !== expectedSig) return false;

  try {
    const payload = JSON.parse(decodeBase64Url(payloadB64)) as { exp?: number };
    if (!payload.exp) return false;
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}
