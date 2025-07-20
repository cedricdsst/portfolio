/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Disable all CSS optimization to fix build error
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Disable all CSS minification
      config.optimization.minimize = false;
    }
    return config;
  },
}

module.exports = nextConfig 