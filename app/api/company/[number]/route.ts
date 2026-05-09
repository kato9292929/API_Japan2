import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const pick = (xml: string, tag: string) =>
  xml.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`))?.[1]?.trim() ?? null;

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const number = req.nextUrl.pathname.split("/").pop() ?? "";
  const appId = process.env.HOUJIN_API_KEY;
  if (!appId) {
    return NextResponse.json({ error: "HOUJIN_API_KEY not configured" }, { status: 500 });
  }
  const url = `https://api.houjin-bangou.nta.go.jp/4/num?id=${appId}&number=${number}&type=12&history=0`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  const xml = await res.text();
  const count = Number(pick(xml, "count") ?? "0");
  if (count === 0) {
    return NextResponse.json({ error: "Corporate number not found" }, { status: 404 });
  }
  return NextResponse.json({
    corporateNumber: pick(xml, "corporateNumber"),
    name: pick(xml, "name"),
    furigana: pick(xml, "furigana"),
    kind: pick(xml, "kind"),
    prefecture: pick(xml, "prefectureName"),
    city: pick(xml, "cityName"),
    streetNumber: pick(xml, "streetNumber"),
    postCode: pick(xml, "postCode"),
    updateDate: pick(xml, "updateDate"),
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
    description: "Japan corporate information by 13-digit corporate number (国税庁法人番号API)",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { number: "4010401052626" },
        pathParamsSchema: {
          properties: {
            number: { type: "string", description: "13-digit Japanese corporate number (法人番号)" },
          },
          required: ["number"],
        },
        output: {
          example: {
            corporateNumber: "4010401052626",
            name: "株式会社〇〇",
            furigana: "カブシキガイシャ〇〇",
            kind: "301",
            prefecture: "東京都",
            city: "千代田区",
            streetNumber: "大手町1-1-1",
            postCode: "1000000",
            updateDate: "2023-04-01",
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
