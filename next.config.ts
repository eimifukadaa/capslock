import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ikrtxsbyzgrxxyweehuw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
