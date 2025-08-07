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
  webpack: (config, { isServer, dev }) => {
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

    // Add CSS loaders
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              auto: true,
              localIdentName: dev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
            },
          },
        },
        'postcss-loader',
      ],
    });

    return config;
  },
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
