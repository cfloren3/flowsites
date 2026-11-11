import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/case-studies/ontario-deca", destination: "/work", permanent: true }];
  },
};

export default nextConfig;
