import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const SCALE_LABEL: Record<number, string> = {
  10: "震度1", 20: "震度2", 30: "震度3", 40: "震度4",
  45: "震度5弱", 50: "震度5強", 55: "震度6弱", 60: "震度6強", 70: "震度7",
};

const handler = async (_req: NextRequest): Promise<NextResponse> => {
  const res = await fetch(
    "https://api.p2pquake.net/v2/history?codes=551&limit=10",
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const events = data.map((e: Record<string, unknown>) => {
    const eq = e.earthquake as Record<string, unknown>;
    const hypo = eq?.hypocenter as Record<string, unknown>;
    return {
      time: eq?.time,
      location: hypo?.name,
      magnitude: hypo?.magnitude,
      depth: hypo?.depth,
      maxScale: eq?.maxScale,
      maxScaleLabel: SCALE_LABEL[(eq?.maxScale as number)] ?? "不明",
      tsunami: eq?.domesticTsunami,
    };
  });
  return NextResponse.json({ events });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.002",
        network: "eip155:8453",
        payTo: process.env.WALLET_ADDRESS as `0x${string}`,
      },
      {
        scheme: "exact",
        price: "$0.002",
        network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        payTo: process.env.SOLANA_WALLET_ADDRESS as string,
      },
    ],
    description: "Recent Japan earthquake events from P2PQuake (JMA data)",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: {
            events: [
              {
                time: "2025/01/01 12:00:00",
                location: "茨城県南部",
                magnitude: 3.5,
                depth: 50,
                maxScale: 30,
                maxScaleLabel: "震度3",
                tsunami: "None",
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
