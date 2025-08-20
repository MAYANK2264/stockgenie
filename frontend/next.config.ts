import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  images: { unoptimized: true },
  // Configure for static export
  trailingSlash: true,
  // Set base path for GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/stockgenie',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '/stockgenie/',
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
