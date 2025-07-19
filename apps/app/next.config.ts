import type { NextConfig } from "next";

import { env } from "@/env";

const nextConfig: NextConfig = {
  compress: true,
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${env.SERVER_ORIGIN}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
