import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "x402-discovery",
            value: "/.well-known/x402.json",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
