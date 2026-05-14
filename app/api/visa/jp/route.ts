import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const VISA_INFO: Record<string, {
  visa_required: boolean;
  max_stay_days: number | null;
  visa_type: string;
  notes: string;
}> = {
  US: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  GB: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  AU: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  CA: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  NZ: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  DE: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  FR: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  IT: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  ES: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  NL: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  CH: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  KR: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  SG: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  MY: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  TH: { visa_required: false, max_stay_days: 30, visa_type: "waiver", notes: "Short-term stay without visa up to 30 days" },
  PH: { visa_required: false, max_stay_days: 30, visa_type: "waiver", notes: "Short-term stay without visa up to 30 days" },
  ID: { visa_required: false, max_stay_days: 30, visa_type: "waiver", notes: "Short-term stay without visa up to 30 days" },
  CN: { visa_required: false, max_stay_days: 15, visa_type: "waiver", notes: "Visa exemption restored 2024; up to 15 days" },
  IN: { visa_required: true,  max_stay_days: null, visa_type: "required", notes: "Visa required; apply via Japanese embassy" },
  VN: { visa_required: true,  max_stay_days: null, visa_type: "required", notes: "Visa required" },
  BR: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  MX: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  AR: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  RU: { visa_required: true,  max_stay_days: null, visa_type: "required", notes: "Visa required" },
  UA: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  AE: { visa_required: false, max_stay_days: 30, visa_type: "waiver", notes: "Short-term stay without visa up to 30 days" },
  TR: { visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
  ZA: { visa_required: true,  max_stay_days: null, visa_type: "required", notes: "Visa required" },
};

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const country = (req.nextUrl.searchParams.get("country") ?? "US").toUpperCase();
  const info = VISA_INFO[country];
  if (!info) {
    return NextResponse.json({
      error: `Country '${country}' not found`,
      supported: Object.keys(VISA_INFO),
    }, { status: 404 });
  }
  return NextResponse.json({
    country,
    ...info,
    source: "MOFA Japan",
    reference: "https://www.mofa.go.jp/j_info/visit/visa/",
    updated: "2025-01",
  });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      { scheme: "exact", price: "$0.005", network: "eip155:8453", payTo: process.env.WALLET_ADDRESS as `0x${string}` },
      { scheme: "exact", price: "$0.005", network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp", payTo: process.env.SOLANA_WALLET_ADDRESS as string },
    ],
    description: "Japan visa requirements by country",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: { country: "US", visa_required: false, max_stay_days: 90, visa_type: "waiver", notes: "Short-term stay without visa" },
        },
      }),
    },
  },
  server,
);
