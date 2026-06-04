import { cookies, headers } from 'next/headers';
import { verifyAdminBasicCredentials } from '@/lib/adminCredentials';
import { verifyAdminSessionToken } from '@/lib/adminSession';

const ADMIN_AUTH_COOKIE = 'admin_auth';

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_TOKEN;
}

export async function isAdminAuthenticated() {
  const sessionSecret = getAdminSessionSecret();
  if (!sessionSecret) return false;

  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
  if (await verifyAdminSessionToken(cookieValue)) {
    return true;
  }

  const headerStore = await headers();
  return Boolean(verifyAdminBasicCredentials(headerStore.get('authorization')));
}

export async function requireAdminAuth() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    throw new Error('Unauthorized');
  }
}

export { ADMIN_AUTH_COOKIE };
