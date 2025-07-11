import type { NextConfig } from "next";

import "@/env";

const nextConfig: NextConfig = {
  compress: true,
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
