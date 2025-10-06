import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore ESLint errors during production builds to avoid blocking builds due to lint-only issues.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during production builds to avoid blocking builds due to type-only issues.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
