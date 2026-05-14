import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (_req: NextRequest) => {
  return NextResponse.json({
    news: [
      { title: "APAC crypto market update", sentiment: "positive" },
      { title: "Japan stablecoin regulation news", sentiment: "neutral" },
    ],
  });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.005",
        network: "eip155:8453",
        payTo: process.env.WALLET_ADDRESS as `0x${string}`,
      },
      {
        scheme: "exact",
        price: "$0.005",
        network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        payTo: process.env.SOLANA_WALLET_ADDRESS as string,
      },
    ],
    description: "APAC crypto news",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: {
            news: [
              { title: "APAC crypto market update", sentiment: "positive" },
              { title: "Japan stablecoin regulation news", sentiment: "neutral" },
            ],
          },
        },
      }),
    },
  },
  server,
);
