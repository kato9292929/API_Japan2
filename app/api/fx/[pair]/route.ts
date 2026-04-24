import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (req: NextRequest) => {
  const pair = req.nextUrl.pathname.split("/").pop() ?? "USDJPY";
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  const data = await res.json();
  return NextResponse.json({ pair, rate: data.rates?.JPY ?? null });
};

export const GET = withX402(
  handler,
  {
    accepts: {
      scheme: "exact",
      price: "$0.001",
      network: "eip155:84532",
      payTo: process.env.WALLET_ADDRESS as `0x${string}`,
    },
    description: "JPY exchange rate",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { pair: "USDJPY" },
        pathParamsSchema: {
          properties: { pair: { type: "string", description: "Currency pair (e.g. USDJPY)" } },
          required: ["pair"],
        },
        output: {
          example: {
            pair: "USDJPY",
            rate: 154.32,
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
