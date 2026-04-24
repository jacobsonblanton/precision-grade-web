/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['msnodesqlv8'],
  },
};

module.exports = nextConfig;
