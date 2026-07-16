import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { LockKeyhole } from 'lucide-react';
import { ADMIN_AUTH_COOKIE, isAdminAuthenticated } from '@/lib/adminAuth';
import { verifyAdminCredentialPair } from '@/lib/adminCredentials';
import { createAdminSessionToken, getAdminSessionTtlSeconds } from '@/lib/adminSession';
import { checkRateLimit } from '@/lib/rateLimit';

const ADMIN_LOGIN_LIMIT = 5;
const ADMIN_LOGIN_WINDOW_MS = 10 * 60 * 1000;

export const metadata: Metadata = {
  title: 'Admin Login | IntegraFin',
  description: 'Admin login for IntegraFin staff.',
  robots: { index: false, follow: false },
};

function getSafeNextPath(value: FormDataEntryValue | string | null | undefined) {
  const path = typeof value === 'string' ? value : '';

  if (!path || !path.startsWith('/admin') || path.startsWith('//') || path.startsWith('/admin/login')) {
    return '/admin/blogs';
  }

  return path;
}

async function getAdminLoginRateLimitKey() {
  const headerStore = await headers();
  const forwardedFor = headerStore.get('x-forwarded-for');
  const realIp = headerStore.get('x-real-ip');
  const firstForwarded = forwardedFor?.split(',')[0]?.trim();
  return firstForwarded || realIp || 'unknown';
}

async function loginAdmin(formData: FormData) {
  'use server';

  const username = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');
  const nextPath = getSafeNextPath(formData.get('next'));

  const rateLimitKey = await getAdminLoginRateLimitKey();
  const rateResult = checkRateLimit(`adminLogin:${rateLimitKey}`, ADMIN_LOGIN_LIMIT, ADMIN_LOGIN_WINDOW_MS);
  if (!rateResult.allowed) {
    redirect(`/admin/login?error=rate&next=${encodeURIComponent(nextPath)}`);
  }

  const verifiedUser = verifyAdminCredentialPair(username, password);

  if (!verifiedUser) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(nextPath)}`);
  }

  const token = await createAdminSessionToken(verifiedUser);
  if (!token) {
    redirect(`/admin/login?error=config&next=${encodeURIComponent(nextPath)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: getAdminSessionTtlSeconds(),
  });

  redirect(nextPath);
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  const nextPath = getSafeNextPath(next);

  if (await isAdminAuthenticated()) {
    redirect(nextPath);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <section className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <LockKeyhole className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-950">Admin Login</h1>
              <p className="mt-1 text-sm text-gray-600">IntegraFin authenticated publishing access</p>
            </div>
          </div>

          {error && (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error === 'config'
                ? 'Admin access is not fully configured.'
                : error === 'rate'
                  ? 'Too many login attempts. Please wait a few minutes before trying again.'
                  : error === 'session'
                    ? 'Your admin session expired. Sign in again to continue.'
                : 'The username or password is incorrect.'}
            </div>
          )}

          <form action={loginAdmin} className="space-y-5">
            <input type="hidden" name="next" value={nextPath} />

            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-base outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
