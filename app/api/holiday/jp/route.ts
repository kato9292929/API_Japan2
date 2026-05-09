import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (_req: NextRequest) => {
  const res = await fetch("https://holidays-jp.github.io/api/v1/date.json", {
    next: { revalidate: 86400 },
  });
  const all: Record<string, string> = await res.json();
  const year = new Date().getFullYear();
  const holidays = Object.fromEntries(
    Object.entries(all).filter(([date]) => date.startsWith(String(year)))
  );
  return NextResponse.json({ year, holidays });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.001",
        network: "eip155:8453",
        payTo: process.env.WALLET_ADDRESS as `0x${string}`,
      },
      {
        scheme: "exact",
        price: "$0.001",
        network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        payTo: process.env.SOLANA_WALLET_ADDRESS as string,
      },
    ],
    description: "Japanese public holidays for the current year",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: {
            year: 2025,
            holidays: {
              "2025-01-01": "元日",
              "2025-01-13": "成人の日",
              "2025-02-11": "建国記念の日",
            },
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
