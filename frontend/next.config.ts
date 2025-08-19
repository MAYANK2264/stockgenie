import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  images: { unoptimized: true },
  // Allow setting basePath/assetPrefix at build time if deploying to /<repo>
  basePath: isProd ? '/stockgenie' : undefined,
  assetPrefix: isProd ? '/stockgenie' : undefined,
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
