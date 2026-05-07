import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (req: NextRequest) => {
  const city = req.nextUrl.pathname.split("/").pop() ?? "tokyo";
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.69&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
  );
  const data = await res.json();
  return NextResponse.json({ city, ...data.current });
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
      {
        scheme: "exact",
        price: "$0.001",
        network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
        payTo: process.env.SOLANA_WALLET_ADDRESS as string,
      },
    ],
    description: "Japan weather data",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { city: "tokyo" },
        pathParamsSchema: {
          properties: { city: { type: "string", description: "City name" } },
          required: ["city"],
        },
        output: {
          example: {
            city: "tokyo",
            temperature_2m: 22.5,
            relative_humidity_2m: 60,
            wind_speed_10m: 5.2,
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
