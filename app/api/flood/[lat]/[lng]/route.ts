import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const parts = req.nextUrl.pathname.split("/");
  const lng = parts.pop() ?? "139.6917";
  const lat = parts.pop() ?? "35.6895";

  const res = await fetch(
    `https://disaportal.gsi.go.jp/hazardmap/api/getFloodInfo?lon=${lng}&lat=${lat}`
  );
  if (!res.ok) {
    return NextResponse.json({ error: "upstream error" }, { status: 502 });
  }
  const data = await res.json();
  return NextResponse.json({ lat, lng, flood_risk: data });
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
    description: "Japan flood risk data",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { lat: "35.6895", lng: "139.6917" },
        pathParamsSchema: {
          properties: {
            lat: { type: "string", description: "Latitude (decimal)" },
            lng: { type: "string", description: "Longitude (decimal)" },
          },
          required: ["lat", "lng"],
        },
        output: {
          example: {
            lat: "35.6895",
            lng: "139.6917",
            flood_risk: { depth_m: 0.5, category: "0.5m–1.0m" },
          },
        },
      }),
    },
  },
  server,
);
