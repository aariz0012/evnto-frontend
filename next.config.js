/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'venuity-backend.onrender.com'],
    unoptimized: true, // Required for Netlify deployment
  },

  // ✅ Dynamic site with proper static asset handling
  output: 'standalone',
  
  // Ensure static assets are properly handled
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',

  // ✅ App Router uses .js/.ts/.jsx/.tsx automatically (no need for pageExtensions)
  productionBrowserSourceMaps: true,

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
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  experimental: {
    // ✅ App Router already optimizes CSS, you can keep this if you want
    optimizeCss: true,
  },
};

module.exports = nextConfig;
