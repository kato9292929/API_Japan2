import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const raw  = req.nextUrl.pathname.split("/").pop() ?? "";
  const code = raw.replace("-", "");
  if (!/^\d{7}$/.test(code)) {
    return NextResponse.json({ error: "Invalid postal code. Provide 7 digits e.g. 1000001 or 100-0001" }, { status: 400 });
  }
  try {
    const res  = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${code}`);
    const data = await res.json();
    if (!data.results) {
      return NextResponse.json({ error: "Postal code not found", code }, { status: 404 });
    }
    const r = data.results[0];
    return NextResponse.json({
      code: r.zipcode,
      prefecture: r.address1,
      city:       r.address2,
      town:       r.address3,
      prefecture_kana: r.kana1,
      city_kana:       r.kana2,
      town_kana:       r.kana3,
      prefecture_code: r.prefcode,
      source: "zipcloud (ibsnet)",
      reference: "https://zipcloud.ibsnet.co.jp/api/search",
      license: "Free — commercial use permitted, no registration required",
      update_frequency: "as Japan Post publishes new codes",
    });
  } catch {
    return NextResponse.json({ error: "Upstream fetch failed" }, { status: 502 });
  }
};

export const GET = withX402(
  handler,
  {
    accepts: [
      { scheme: "exact", price: "$0.001", network: "eip155:8453", payTo: process.env.WALLET_ADDRESS as `0x${string}` },
      { scheme: "exact", price: "$0.001", network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp", payTo: process.env.SOLANA_WALLET_ADDRESS as string },
    ],
    description: "Japan postal code to address lookup (zipcloud)",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { code: "1000001" },
        pathParamsSchema: { properties: { code: { type: "string", description: "7-digit postal code (hyphens optional)" } }, required: ["code"] },
        output: { example: { code: "1000001", prefecture: "東京都", city: "千代田区", town: "" } },
      }),
    },
  },
  server,
);
