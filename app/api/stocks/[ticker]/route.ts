import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const ticker = req.nextUrl.pathname.split("/").pop() ?? "7203.T";
  return NextResponse.json({
    ticker,
    price: 3240,
    currency: "JPY",
    note: "mock data",
  });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.01",
        network: "eip155:8453",
        payTo: process.env.WALLET_ADDRESS as `0x${string}`,
      },
      {
        scheme: "exact",
        price: "$0.01",
        network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        payTo: process.env.SOLANA_WALLET_ADDRESS as string,
      },
    ],
    description: "TSE stock data",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { ticker: "7203.T" },
        pathParamsSchema: {
          properties: { ticker: { type: "string", description: "TSE ticker symbol (e.g. 7203.T)" } },
          required: ["ticker"],
        },
        output: {
          example: {
            ticker: "7203.T",
            price: 3240,
            currency: "JPY",
            note: "mock data",
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
