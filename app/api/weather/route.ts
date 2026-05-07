import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { getServer, svmAddress } from "../../../lib/x402-server";

const handler = async (_: NextRequest) => {
  return NextResponse.json({ weather: "sunny", temperature: 22 }, { status: 200 });
};

export const GET = withX402(handler, {
  accepts: [{
    scheme: "exact",
    price: "$0.001",
    network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
    payTo: svmAddress,
  }],
  description: "Japan weather data",
  mimeType: "application/json",
}, await getServer());
