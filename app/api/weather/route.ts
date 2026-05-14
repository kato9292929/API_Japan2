import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { server } from "@/lib/x402-server";

const handler = async (_req: NextRequest) => {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.69&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
  );
  const data = await res.json();
  return NextResponse.json({ city: "tokyo", ...data.current });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.001",
        network: "eip155:84532",
        payTo: process.env.WALLET_ADDRESS as `0x${string}`,
      },
    ],
    description: "Tokyo weather data",
  },
  server,
);
