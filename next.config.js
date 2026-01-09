/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // optimizePackageImports: ['@radix-ui/*'],
    serverActions: true,
  },
  webpack(config) {
    config.watchOptions = {
      ignored: /node_modules/,
    }
    return config
  },
}

module.exports = nextConfig
