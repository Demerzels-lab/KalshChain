/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    webpackBuildWorker: false
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      // Disable webpack cache in production to reduce build size
      config.cache = false;
    }
    return config;
  }
};

export default nextConfig;
