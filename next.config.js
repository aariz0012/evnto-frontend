/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'enjoy-booking-api.onrender.com'],
    unoptimized: true,
  },

}

module.exports = nextConfig;
