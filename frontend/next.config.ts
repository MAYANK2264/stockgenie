import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  images: { unoptimized: true },
  // Allow setting basePath/assetPrefix at build time if deploying to /<repo>
  basePath,
  assetPrefix: basePath,
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
