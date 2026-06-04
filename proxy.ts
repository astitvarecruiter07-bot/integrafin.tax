import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_AUTH_COOKIE } from '@/lib/adminAuth';
import {
  createAdminSessionToken,
  getAdminSessionTtlSeconds,
  verifyAdminSessionToken,
} from '@/lib/adminSession';
import { getAdminAuthConfig, verifyAdminBasicCredentials } from '@/lib/adminCredentials';

function unauthorizedResponse() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

function adminLoginRedirect(req: NextRequest, hasError = false) {
  const loginUrl = req.nextUrl.clone();
  const nextPath = `${req.nextUrl.pathname}${req.nextUrl.search}`;

  loginUrl.pathname = '/admin/login';
  loginUrl.search = '';
  loginUrl.searchParams.set('next', nextPath);
  if (hasError) {
    loginUrl.searchParams.set('error', '1');
  }

  return NextResponse.redirect(loginUrl);
}

export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const { user, pass, sessionSecret } = getAdminAuthConfig();

  if (process.env.NODE_ENV === 'production' && req.headers.get('x-forwarded-proto') === 'http') {
    const secureUrl = req.nextUrl.clone();
    secureUrl.protocol = 'https:';
    return NextResponse.redirect(secureUrl, 308);
  }

  if (!user || !pass || !sessionSecret) {
    return new NextResponse('Admin auth is not configured', { status: 500 });
  }

  const existingSessionToken = req.cookies.get(ADMIN_AUTH_COOKIE)?.value;
  if (await verifyAdminSessionToken(existingSessionToken)) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('authorization');
  const incomingUser = verifyAdminBasicCredentials(authHeader);
  if (!incomingUser) {
    if (req.nextUrl.pathname.startsWith('/admin')) {
      return adminLoginRedirect(req, Boolean(authHeader));
    }

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
