import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_AUTH_COOKIE } from '@/lib/adminAuth';
import { createAdminSessionToken, getAdminSessionTtlSeconds } from '@/lib/adminSession';

function constantTimeEqual(a: string, b: string) {
  const maxLen = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;

  for (let i = 0; i < maxLen; i += 1) {
    const aCode = i < a.length ? a.charCodeAt(i) : 0;
    const bCode = i < b.length ? b.charCodeAt(i) : 0;
    diff |= aCode ^ bCode;
  }

  return diff === 0;
}

function unauthorizedResponse() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export async function proxy(req: NextRequest) {
  const user = process.env.ADMIN_BASIC_USER;
  const pass = process.env.ADMIN_BASIC_PASS;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_TOKEN;

  if (!user || !pass || !sessionSecret) {
    return new NextResponse('Admin auth is not configured', { status: 500 });
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return unauthorizedResponse();
  }

  const encoded = authHeader.split(' ')[1];
  let decoded = '';
  try {
    decoded = atob(encoded);
  } catch {
    return unauthorizedResponse();
  }
  const separatorIndex = decoded.indexOf(':');
  const incomingUser = separatorIndex >= 0 ? decoded.slice(0, separatorIndex) : decoded;
  const incomingPass = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : '';

  if (!constantTimeEqual(incomingUser, user) || !constantTimeEqual(incomingPass, pass)) {
    return unauthorizedResponse();
  }

  const signedSessionToken = await createAdminSessionToken(incomingUser);
  if (!signedSessionToken) {
    return new NextResponse('Admin auth is not configured', { status: 500 });
  }

  const response = NextResponse.next();
  response.cookies.set(ADMIN_AUTH_COOKIE, signedSessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: getAdminSessionTtlSeconds(),
  });
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/test-db'],
};
