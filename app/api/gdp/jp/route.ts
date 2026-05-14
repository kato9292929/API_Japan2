import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const GDP_DATA = {
  latest_quarter: "2024-Q4",
  real_gdp_growth_qoq_pct: -0.7,
  real_gdp_growth_yoy_pct: -1.2,
  nominal_gdp_trillion_jpy: 609.5,
  releases: [
    { quarter: "2024-Q4", real_qoq_pct: -0.7, real_yoy_pct: -1.2, release: "2nd preliminary" },
    { quarter: "2024-Q3", real_qoq_pct:  0.3, real_yoy_pct:  0.8 },
    { quarter: "2024-Q2", real_qoq_pct:  0.5, real_yoy_pct:  2.2 },
    { quarter: "2024-Q1", real_qoq_pct: -0.5, real_yoy_pct: -0.9 },
  ],
  source: "内閣府 経済社会総合研究所 (Cabinet Office ESRI)",
  reference: "https://www.esri.cao.go.jp/jp/sna/data/data_list/",
  license: "Government data — free, unrestricted commercial use with attribution",
  update_frequency: "quarterly (preliminary ~6 weeks after quarter end)",
  data_type: "static_curated",
  last_curated: "2025-03",
};

const handler = async (_req: NextRequest): Promise<NextResponse> =>
  NextResponse.json(GDP_DATA);

export const GET = withX402(
  handler,
  {
    accepts: [
      { scheme: "exact", price: "$0.003", network: "eip155:84532", payTo: process.env.WALLET_ADDRESS as `0x${string}` },
    ],
    description: "Japan GDP quarterly growth (Cabinet Office ESRI)",
    extensions: { ...declareDiscoveryExtension({ output: { example: { latest_quarter: "2024-Q4", real_gdp_growth_qoq_pct: -0.7, nominal_gdp_trillion_jpy: 609.5 } } }) },
  },
  server,
);
