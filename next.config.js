/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'venuity-backend.onrender.com'],
    unoptimized: true, // Required for Netlify deployment
  },

  // ✅ Standalone build for Netlify SSR
  output: 'standalone',

  // ✅ App Router uses .js/.ts/.jsx/.tsx automatically (no need for pageExtensions)
  productionBrowserSourceMaps: true,

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
