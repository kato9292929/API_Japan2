import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const STATIC_CPI = {
  month: "2025-03",
  base_year: 2020,
  all_items: { index: 109.3, yoy_pct: 3.6 },
  core: { index: 108.7, yoy_pct: 3.2, note: "excl. fresh food" },
  core_core: { index: 107.1, yoy_pct: 2.4, note: "excl. fresh food & energy" },
  data_type: "static_curated",
  last_curated: "2025-04",
};

const handler = async (_req: NextRequest): Promise<NextResponse> => {
  const key = process.env.ESTAT_API_KEY;
  if (key) {
    try {
      // 全国消費者物価指数 (statsDataId: 0003427113)
      const url = `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?appId=${key}&statsDataId=0003427113&metaGetFlg=N&cntGetFlg=N&sectionHeaderFlg=1&limit=12`;
      const res = await fetch(url, { next: { revalidate: 86400 } });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({
          source: "e-Stat (総務省統計局)",
          reference: "https://api.e-stat.go.jp/",
          license: "e-Stat 利用規約 — 登録不要・商用利用可",
          update_frequency: "monthly",
          raw: data?.GET_STATS_DATA?.STATISTICAL_DATA?.DATA_INF?.VALUE?.slice(-3) ?? [],
        });
      }
    } catch { /* fall through to static */ }
  }
  return NextResponse.json({
    ...STATIC_CPI,
    source: "e-Stat 総務省統計局 (静的データ — ESTAT_API_KEY未設定)",
    reference: "https://www.e-stat.go.jp/",
    license: "e-Stat 利用規約 — 登録不要・商用利用可",
    update_frequency: "monthly",
  });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      { scheme: "exact", price: "$0.002", network: "eip155:84532", payTo: process.env.WALLET_ADDRESS as `0x${string}` },
      { scheme: "exact", price: "$0.002", network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1", payTo: process.env.SOLANA_WALLET_ADDRESS as string },
    ],
    description: "Japan CPI — all items, core, core-core (Statistics Bureau via e-Stat)",
    extensions: { ...declareDiscoveryExtension({ output: { example: { month: "2025-03", all_items: { index: 109.3, yoy_pct: 3.6 }, core: { yoy_pct: 3.2 } } } }) },
  },
  server,
);
