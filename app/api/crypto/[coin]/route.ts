import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const coin = req.nextUrl.pathname.split("/").pop() ?? "bitcoin";
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd,jpy&include_24hr_change=true&include_market_cap=true`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  if (!data[coin]) {
    return NextResponse.json({ error: `Unknown coin: ${coin}` }, { status: 404 });
  }
  return NextResponse.json({ coin, ...data[coin] });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.001",
        network: "eip155:8453",
        payTo: process.env.WALLET_ADDRESS as `0x${string}`,
      },
      {
        scheme: "exact",
        price: "$0.001",
        network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        payTo: process.env.SOLANA_WALLET_ADDRESS as string,
      },
    ],
    description: "Crypto price in USD and JPY via CoinGecko",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { coin: "bitcoin" },
        pathParamsSchema: {
          properties: {
            coin: {
              type: "string",
              description:
                "CoinGecko coin ID (e.g. bitcoin, ethereum, solana, ripple, binancecoin)",
            },
          },
          required: ["coin"],
        },
        output: {
          example: {
            coin: "bitcoin",
            usd: 62000,
            jpy: 9300000,
            usd_24h_change: 1.23,
            jpy_24h_change: 1.21,
            usd_market_cap: 1200000000000,
            jpy_market_cap: 180000000000000,
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
