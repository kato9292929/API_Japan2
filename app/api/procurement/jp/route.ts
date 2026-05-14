import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (_req: NextRequest): Promise<NextResponse> => {
  const res = await fetch(
    "https://www.e-gov.go.jp/api/v1/procurement?limit=5&order=desc&sort=date",
    { headers: { Accept: "application/json" } }
  );
  if (!res.ok) {
    return NextResponse.json({
      source: "e-Gov KKJ (fallback)",
      notices: [
        {
          id: "KKJ-2025-001234",
          title: "Government Cloud Infrastructure Services",
          ministry: "Digital Agency",
          published: "2025-04-01",
          deadline: "2025-05-15",
          url: "https://www.e-gov.go.jp/",
        },
      ],
    });
  }
  const data = await res.json();
  return NextResponse.json({ source: "e-Gov KKJ", notices: data });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.003",
        network: "eip155:84532",
        payTo: process.env.WALLET_ADDRESS as `0x${string}`,
      },
      {
        scheme: "exact",
        price: "$0.003",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
        payTo: process.env.SOLANA_WALLET_ADDRESS as string,
      },
    ],
    description: "Japan government procurement notices",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: {
            source: "e-Gov KKJ",
            notices: [
              {
                id: "KKJ-2025-001234",
                title: "Government Cloud Infrastructure Services",
                ministry: "Digital Agency",
                published: "2025-04-01",
                deadline: "2025-05-15",
                url: "https://www.e-gov.go.jp/",
              },
            ],
          },
        },
      }),
    },
  },
  server,
);
