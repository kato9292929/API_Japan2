import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const BOJ_DATA = {
  policy_interest_rate_pct: 0.50,
  rate_target: "Uncollateralized Overnight Call Rate",
  last_change_date: "2025-01-24",
  previous_rate_pct: 0.25,
  rate_history: [
    { date: "2025-01-24", rate_pct: 0.50 },
    { date: "2024-07-31", rate_pct: 0.25 },
    { date: "2024-03-19", rate_pct: 0.10 },
    { date: "2016-01-29", rate_pct: -0.10 },
  ],
  qe_notes: "YCC (Yield Curve Control) abolished March 2024. 10Y JGB yield allowed to move freely.",
  source: "日本銀行 (Bank of Japan)",
  reference: "https://www.boj.or.jp/mopo/mpmdeci/index.htm",
  data_source_detail: "https://www.stat-search.boj.or.jp/",
  license: "Bank of Japan data — free, unrestricted use",
  update_frequency: "per MPM meeting (approx. 8 times/year)",
  data_type: "static_curated",
  last_curated: "2025-02",
};

const handler = async (_req: NextRequest): Promise<NextResponse> =>
  NextResponse.json(BOJ_DATA);

export const GET = withX402(
  handler,
  {
    accepts: [
      { scheme: "exact", price: "$0.003", network: "eip155:8453", payTo: process.env.WALLET_ADDRESS as `0x${string}` },
      { scheme: "exact", price: "$0.003", network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp", payTo: process.env.SOLANA_WALLET_ADDRESS as string },
    ],
    description: "Bank of Japan policy interest rate and rate history",
    extensions: { ...declareDiscoveryExtension({ output: { example: { policy_interest_rate_pct: 0.50, last_change_date: "2025-01-24", rate_target: "Uncollateralized Overnight Call Rate" } } }) },
  },
  server,
);
