import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const city = req.nextUrl.pathname.split("/").pop() ?? "tokyo";
  const token = process.env.WAQI_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "WAQI_TOKEN not configured" }, { status: 500 });
  }
  const res = await fetch(
    `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${token}`,
    { next: { revalidate: 300 } }
  );
  const json = await res.json();
  if (json.status !== "ok") {
    return NextResponse.json({ error: json.data ?? "Unknown city" }, { status: 404 });
  }
  const d = json.data;
  return NextResponse.json({
    city: d.city?.name ?? city,
    aqi: d.aqi,
    pm25: d.iaqi?.pm25?.v ?? null,
    pm10: d.iaqi?.pm10?.v ?? null,
    no2: d.iaqi?.no2?.v ?? null,
    o3: d.iaqi?.o3?.v ?? null,
    time: d.time?.s ?? null,
  });
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
    description: "Air quality index (AQI, PM2.5, PM10, NO2, O3) for APAC cities via WAQI",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { city: "tokyo" },
        pathParamsSchema: {
          properties: {
            city: {
              type: "string",
              description: "City name: tokyo, osaka, beijing, seoul, singapore, hongkong, shanghai, taipei, bangkok, jakarta, mumbai",
            },
          },
          required: ["city"],
        },
        output: {
          example: {
            city: "Tokyo",
            aqi: 42,
            pm25: 12.3,
            pm10: 23.1,
            no2: 15.2,
            o3: 35.6,
            time: "2025-01-01 12:00:00",
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
