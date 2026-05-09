import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const CITIES: Record<string, { lat: number; lon: number }> = {
  tokyo: { lat: 35.68, lon: 139.69 },
  osaka: { lat: 34.69, lon: 135.50 },
  fukuoka: { lat: 33.59, lon: 130.40 },
  sapporo: { lat: 43.06, lon: 141.35 },
  nagoya: { lat: 35.18, lon: 136.91 },
  singapore: { lat: 1.29, lon: 103.85 },
  hongkong: { lat: 22.32, lon: 114.17 },
  seoul: { lat: 37.57, lon: 126.98 },
  sydney: { lat: -33.87, lon: 151.21 },
  melbourne: { lat: -37.81, lon: 144.96 },
  beijing: { lat: 39.91, lon: 116.39 },
  shanghai: { lat: 31.23, lon: 121.47 },
  bangkok: { lat: 13.75, lon: 100.52 },
  jakarta: { lat: -6.21, lon: 106.85 },
  mumbai: { lat: 19.08, lon: 72.88 },
  kualalumpur: { lat: 3.14, lon: 101.69 },
  manila: { lat: 14.60, lon: 120.98 },
  taipei: { lat: 25.04, lon: 121.56 },
  auckland: { lat: -36.86, lon: 174.77 },
};

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const city = req.nextUrl.pathname.split("/").pop()?.toLowerCase() ?? "tokyo";
  const coords = CITIES[city] ?? CITIES.tokyo;
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`,
    { next: { revalidate: 900 } }
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
    description: "Current weather for APAC cities",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { city: "tokyo" },
        pathParamsSchema: {
          properties: {
            city: {
              type: "string",
              description:
                "City name: tokyo, osaka, singapore, hongkong, seoul, sydney, bangkok, taipei, etc.",
            },
          },
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
