import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { server } from "@/lib/x402-server";

const handler = async (req: NextRequest) => {
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
    accepts: {
      scheme: "exact",
      price: "$0.01",
      network: "eip155:84532",
      payTo: process.env.WALLET_ADDRESS as `0x${string}`,
    },
    description: "TSE stock data",
  },
  server,
  undefined,
  undefined,
  false,
);
