/** @type {import('next').NextConfig} */
const path = require('path');

// Security Headers
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'evento-backend-77q2.onrender.com'],
    unoptimized: true,
  },
  webpack: (config) => {
    // Add path aliases
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
