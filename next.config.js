/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'venuity-backend.onrender.com'],
    unoptimized: true, // Required for Netlify deployment
  },
  // Enable server-side rendering
  output: 'standalone',
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Enable source maps in development
  productionBrowserSourceMaps: true,
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Handle Node.js modules in the browser
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
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Enable experimental CSS optimizations
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
