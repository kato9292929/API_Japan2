import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (req: NextRequest) => {
  const keyword = req.nextUrl.pathname.split("/").pop() ?? "";
  const url =
    `https://jpsearch.go.jp/api/item/search/simple` +
    `?keyword=${encodeURIComponent(keyword)}&size=10`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  const json = await res.json();
  const items = (json?.list ?? []).map((item: Record<string, unknown>) => ({
    id: item.id,
    title: item.title,
    creator: item.creator,
    type: item.type,
    provider: (item.sourceInfo as Record<string, unknown>)?.providerName,
    thumbnailUrl: item.thumbnailUrl,
  }));
  return NextResponse.json({ keyword, total: json?.hit ?? 0, items });
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
    description: "Japan cultural heritage search via Japan Search (jpsearch.go.jp)",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { keyword: "浮世絵" },
        pathParamsSchema: {
          properties: {
            keyword: { type: "string", description: "Search keyword (Japanese or English)" },
          },
          required: ["keyword"],
        },
        output: {
          example: {
            keyword: "浮世絵",
            total: 1234,
            items: [
              {
                id: "dnpartcom_5301",
                title: "冨嶽三十六景 神奈川沖浪裏",
                creator: "葛飾北斎",
                type: "画像",
                provider: "国立国会図書館",
                thumbnailUrl: "https://jpsearch.go.jp/...",
              },
            ],
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
