import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (_req: NextRequest): Promise<NextResponse> => {
  const res = await fetch(
    "https://feeds.feedburner.com/CoinDesk" ,
    { headers: { "User-Agent": "Mozilla/5.0" }, next: { revalidate: 300 } }
  );

  if (!res.ok) {
    return NextResponse.json({
      source: "CoinDesk",
      items: [
        { title: "APAC crypto market update", pubDate: new Date().toUTCString() },
      ],
    });
  }

  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .slice(0, 10)
    .map((m) => {
      const raw = m[1];
      const title =
        raw.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/s)?.[1] ??
        raw.match(/<title>(.*?)<\/title>/s)?.[1] ??
        "";
      const link =
        raw.match(/<link>(.*?)<\/link>/s)?.[1] ??
        raw.match(/<guid[^>]*>(.*?)<\/guid>/s)?.[1] ??
        "";
      const pubDate = raw.match(/<pubDate>(.*?)<\/pubDate>/s)?.[1] ?? "";
      return { title: title.trim(), link: link.trim(), pubDate: pubDate.trim() };
    });

  return NextResponse.json({ source: "CoinDesk", items });
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
    description: "APAC crypto news headlines from CoinDesk",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: {
            source: "CoinDesk",
            items: [
              {
                title: "Bitcoin Hits New High as APAC Investors Pile In",
                link: "https://coindesk.com/...",
                pubDate: "Thu, 08 May 2025 10:00:00 +0000",
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
