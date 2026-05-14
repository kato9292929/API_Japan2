import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const FALLBACK = {
  date: "2025-05-09",
  rates_pct: { "2y": 0.535, "5y": 0.835, "10y": 1.565, "20y": 2.195, "30y": 2.395 },
  note: "Fallback static data — live MOF CSV unavailable",
};

const handler = async (_req: NextRequest): Promise<NextResponse> => {
  try {
    const res = await fetch(
      "https://www.mof.go.jp/english/jgbs/reference/interest_rate/historical/jgbcme_all.csv",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("MOF fetch failed");
    const text = await res.text();
    const lines = text.trim().split("\n").filter((l) => l.trim());
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
    const vals = lines[lines.length - 1].split(",").map((v) => v.trim().replace(/"/g, ""));
    const row: Record<string, string | number> = {};
    headers.forEach((h, i) => {
      row[h] = vals[i] !== "" && !isNaN(Number(vals[i])) ? Number(vals[i]) : vals[i];
    });
    return NextResponse.json({
      date: row["Date"] ?? vals[0],
      rates_pct: {
        "2y":  row["2Y"]  ?? null,
        "5y":  row["5Y"]  ?? null,
        "10y": row["10Y"] ?? null,
        "20y": row["20Y"] ?? null,
        "30y": row["30Y"] ?? null,
      },
      source: "Ministry of Finance Japan (財務省)",
      reference: "https://www.mof.go.jp/english/jgbs/reference/interest_rate/",
      license: "Government data — free, unrestricted commercial use",
      update_frequency: "daily (business days)",
    });
  } catch {
    return NextResponse.json({
      ...FALLBACK,
      source: "Ministry of Finance Japan (財務省)",
      reference: "https://www.mof.go.jp/english/jgbs/reference/interest_rate/",
    });
  }
};

export const GET = withX402(
  handler,
  {
    accepts: [
      { scheme: "exact", price: "$0.002", network: "eip155:84532", payTo: process.env.WALLET_ADDRESS as `0x${string}` },
    ],
    description: "Japan Government Bond yields (2Y 5Y 10Y 20Y 30Y)",
    extensions: { ...declareDiscoveryExtension({ output: { example: { date: "2025-05-09", rates_pct: { "2y": 0.535, "10y": 1.565, "30y": 2.395 } } } }) },
  },
  server,
);
