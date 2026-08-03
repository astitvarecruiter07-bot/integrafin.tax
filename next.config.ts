import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  async redirects() {
    return [
      // Force a single canonical host for SEO consistency.
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.integrafin.tax',
          },
        ],
        destination: 'https://integrafin.tax/:path*',
        permanent: true,
      },
      {
        source: '/individual-tax-services',
        destination: '/individual-tax-preparation',
        permanent: true,
      },
      {
        source: '/tax-resolution-services',
        destination: '/tax-resolution',
        permanent: true,
      },
      {
        source: '/additional-services',
        destination: '/services#additional',
        permanent: true,
      },
      {
        source: '/new-business-consultation',
        destination: '/services#startup',
        permanent: true,
      },
    ];
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production';
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "frame-src 'self' https://www.google.com",
      isDev
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:"
        : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
      isDev
        ? "connect-src 'self' https: ws: wss:"
        : "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.vercel-insights.com https://www.facebook.com https://*.facebook.com",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [
          { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 68, 70, 72, 75, 80],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
