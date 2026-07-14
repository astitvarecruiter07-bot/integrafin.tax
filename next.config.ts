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
      "font-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline' https:",
      "frame-src 'self' https://www.google.com",
      isDev
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:"
        : "script-src 'self' 'unsafe-inline' https: blob:",
      "connect-src 'self' https:",
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
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
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
