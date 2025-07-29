/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'enjoy-booking-api.onrender.com'],
    unoptimized: true,
  },
  webpack: (config) => {
    // Add path aliases
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
}

module.exports = nextConfig;
