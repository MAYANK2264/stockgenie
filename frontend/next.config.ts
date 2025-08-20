import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  images: { unoptimized: true },
  // Configure for static export
  trailingSlash: true,
  // Disable dynamic features that don't work in static export
  experimental: {
    esmExternals: false,
  },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
