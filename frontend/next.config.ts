import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  images: { unoptimized: true },
  // Remove basePath and assetPrefix for GitHub Pages deployment
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
