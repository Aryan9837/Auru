import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-neon"],
  experimental: {
    optimizePackageImports: ["@clerk/nextjs"],
    
  },
};

export default nextConfig;
