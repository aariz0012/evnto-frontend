/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'evento-backend-77q2.onrender.com'],
    unoptimized: true,
  },
  // Remove output: 'export' for now as it might be causing issues
  // output: 'export',
  trailingSlash: true,
  // Add basePath if your app is not running at the root
  // basePath: '/frontend',
  // Add assetPrefix for static assets
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Disable React's StrictMode if needed
  reactStrictMode: false,
  // Add webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
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
        ],
      },
    ];
  },
};

module.exports = nextConfig;
