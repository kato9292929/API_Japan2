import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const LAND_PRICES: Record<string, {
  prefecture_ja: string;
  avg_price_per_sqm_jpy: number;
  change_yoy_pct: number;
  top_districts: Array<{ name: string; price_per_sqm_jpy: number }>;
  data_year: number;
}> = {
  tokyo:     { prefecture_ja: "東京都", avg_price_per_sqm_jpy: 1150000, change_yoy_pct: 5.3, top_districts: [{ name: "千代田区", price_per_sqm_jpy: 6800000 }, { name: "港区", price_per_sqm_jpy: 4200000 }, { name: "渋谷区", price_per_sqm_jpy: 3800000 }], data_year: 2024 },
  osaka:     { prefecture_ja: "大阪府", avg_price_per_sqm_jpy: 480000,  change_yoy_pct: 8.2, top_districts: [{ name: "北区", price_per_sqm_jpy: 2100000 }, { name: "中央区", price_per_sqm_jpy: 1950000 }, { name: "西区", price_per_sqm_jpy: 980000 }], data_year: 2024 },
  nagoya:    { prefecture_ja: "愛知県", avg_price_per_sqm_jpy: 320000,  change_yoy_pct: 4.1, top_districts: [{ name: "中区", price_per_sqm_jpy: 1200000 }, { name: "栄", price_per_sqm_jpy: 980000 }], data_year: 2024 },
  sapporo:   { prefecture_ja: "北海道", avg_price_per_sqm_jpy: 180000,  change_yoy_pct: 9.5, top_districts: [{ name: "中央区", price_per_sqm_jpy: 420000 }], data_year: 2024 },
  fukuoka:   { prefecture_ja: "福岡県", avg_price_per_sqm_jpy: 210000,  change_yoy_pct: 7.8, top_districts: [{ name: "中央区", price_per_sqm_jpy: 720000 }, { name: "博多区", price_per_sqm_jpy: 580000 }], data_year: 2024 },
  kyoto:     { prefecture_ja: "京都府", avg_price_per_sqm_jpy: 290000,  change_yoy_pct: 6.1, top_districts: [{ name: "下京区", price_per_sqm_jpy: 850000 }, { name: "中京区", price_per_sqm_jpy: 780000 }], data_year: 2024 },
  yokohama:  { prefecture_ja: "神奈川県", avg_price_per_sqm_jpy: 420000, change_yoy_pct: 4.8, top_districts: [{ name: "西区", price_per_sqm_jpy: 1100000 }, { name: "中区", price_per_sqm_jpy: 980000 }], data_year: 2024 },
  sendai:    { prefecture_ja: "宮城県", avg_price_per_sqm_jpy: 130000,  change_yoy_pct: 5.6, top_districts: [{ name: "青葉区", price_per_sqm_jpy: 320000 }], data_year: 2024 },
  hiroshima: { prefecture_ja: "広島県", avg_price_per_sqm_jpy: 160000,  change_yoy_pct: 3.9, top_districts: [{ name: "中区", price_per_sqm_jpy: 580000 }], data_year: 2024 },
  naha:      { prefecture_ja: "沖縄県", avg_price_per_sqm_jpy: 145000,  change_yoy_pct: 6.3, top_districts: [{ name: "那覇市中心部", price_per_sqm_jpy: 380000 }], data_year: 2024 },
};

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const city = (req.nextUrl.pathname.split("/").pop() ?? "tokyo").toLowerCase();
  const data = LAND_PRICES[city];
  if (!data) {
    return NextResponse.json({
      error: `City '${city}' not found`,
      supported: Object.keys(LAND_PRICES),
    }, { status: 404 });
  }
  return NextResponse.json({
    city,
    ...data,
    source: "国土交通省 地価公示",
    reference: "https://www.mlit.go.jp/totikensangyo/totikensangyo_fr4_000043.html",
  });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      { scheme: "exact", price: "$0.005", network: "eip155:84532", payTo: process.env.WALLET_ADDRESS as `0x${string}` },
      { scheme: "exact", price: "$0.005", network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1", payTo: process.env.SOLANA_WALLET_ADDRESS as string },
    ],
    description: "Japan land price data by city",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { city: "tokyo" },
        pathParamsSchema: {
          properties: { city: { type: "string", description: "City name (tokyo, osaka, nagoya, sapporo, fukuoka, kyoto, yokohama, sendai, hiroshima, naha)" } },
          required: ["city"],
        },
        output: { example: { city: "tokyo", avg_price_per_sqm_jpy: 1150000, change_yoy_pct: 5.3, data_year: 2024 } },
      }),
    },
  },
  server, undefined, undefined, false,
);
