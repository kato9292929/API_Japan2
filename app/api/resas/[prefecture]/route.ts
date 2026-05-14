import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const STATIC_POPULATION: Record<string, { name: string; total: number; year: number }> = {
  "13": { name: "Tokyo", total: 14010000, year: 2023 },
  "27": { name: "Osaka", total: 8793000, year: 2023 },
  "23": { name: "Aichi", total: 7542000, year: 2023 },
  "14": { name: "Kanagawa", total: 9240000, year: 2023 },
  "11": { name: "Saitama", total: 7337000, year: 2023 },
  "12": { name: "Chiba", total: 6276000, year: 2023 },
  "01": { name: "Hokkaido", total: 5140000, year: 2023 },
  "40": { name: "Fukuoka", total: 5109000, year: 2023 },
  "28": { name: "Hyogo", total: 5401000, year: 2023 },
  "26": { name: "Kyoto", total: 2556000, year: 2023 },
};

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const prefecture = req.nextUrl.pathname.split("/").pop() ?? "13";
  const apiKey = process.env.RESAS_API_KEY;

  if (apiKey) {
    const res = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/sum/estimate?prefCode=${prefecture}`,
      { headers: { "X-API-KEY": apiKey } }
    );
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ prefecture, source: "RESAS", data: data.result });
    }
  }

  const fallback = STATIC_POPULATION[prefecture];
  if (!fallback) {
    return NextResponse.json({ error: "Unknown prefecture code" }, { status: 404 });
  }
  return NextResponse.json({
    prefecture,
    source: "RESAS (static fallback, 2023)",
    data: fallback,
  });
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
    description: "Japan RESAS regional economy data",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { prefecture: "13" },
        pathParamsSchema: {
          properties: {
            prefecture: { type: "string", description: "JIS prefecture code (e.g. 13 = Tokyo)" },
          },
          required: ["prefecture"],
        },
        output: {
          example: {
            prefecture: "13",
            source: "RESAS",
            data: { name: "Tokyo", total: 14010000, year: 2023 },
          },
        },
      }),
    },
  },
  server,
);
