import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (_req: NextRequest): Promise<Response> => {
  const res = await fetch(
    "https://api.p2pquake.net/v2/history?codes=552&limit=5",
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const warnings = data.map((e: Record<string, unknown>) => {
    const issue = e.issue as Record<string, unknown>;
    const areas = (e.areas as Record<string, unknown>[]) ?? [];
    return {
      time: issue?.time,
      type: issue?.type,
      areas: areas.map((a) => ({
        name: a.name,
        grade: a.grade,
        immediate: a.immediate,
      })),
    };
  });
  return NextResponse.json({ warnings });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.003",
        network: "eip155:8453",
        payTo: process.env.WALLET_ADDRESS as `0x${string}`,
      },
      {
        scheme: "exact",
        price: "$0.003",
        network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        payTo: process.env.SOLANA_WALLET_ADDRESS as string,
      },
    ],
    description: "Japan tsunami warnings from P2PQuake (JMA data)",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: {
            warnings: [
              {
                time: "2025/01/01 12:00:00",
                type: "Focus",
                areas: [{ name: "岩手県", grade: "Watch", immediate: false }],
              },
            ],
          },
        },
      }),
    },
  },
  server,
  undefined,
  undefined,
  false,
);
