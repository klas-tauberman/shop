/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['shop.tauberman.se'],
  },
}

module.exports = nextConfig

