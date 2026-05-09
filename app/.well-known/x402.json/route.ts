import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const evmPayTo = (process.env.WALLET_ADDRESS ?? "0x0000000000000000000000000000000000000000") as `0x${string}`;
  const solanaPayTo = process.env.SOLANA_WALLET_ADDRESS ?? "";

  const evmAccept = (maxAmountRequired: string) => ({
    scheme: "exact",
    network: "base",
    maxAmountRequired,
    asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    payTo: evmPayTo,
    maxTimeoutSeconds: 300,
    extra: { name: "USDC", version: "2" },
  });

  const solanaAccept = (maxAmountRequired: string) => ({
    scheme: "exact",
    network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    maxAmountRequired,
    asset: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    payTo: solanaPayTo,
    maxTimeoutSeconds: 300,
    extra: { name: "USDC" },
  });

  return NextResponse.json({
    x402Version: 1,
    endpoints: [
      {
        path: "/api/weather/{city}",
        method: "GET",
        description: "Current weather for APAC cities (tokyo, singapore, seoul, sydney, ...)",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      {
        path: "/api/fx/{pair}",
        method: "GET",
        description: "APAC FX rate against USD",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      {
        path: "/api/crypto/{coin}",
        method: "GET",
        description: "Crypto price in USD and JPY (bitcoin, ethereum, solana, ripple, ...)",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      {
        path: "/api/news/japan",
        method: "GET",
        description: "Latest Japan news headlines from NHK",
        accepts: [evmAccept("2000"), solanaAccept("2000")],
      },
      {
        path: "/api/news/apac",
        method: "GET",
        description: "APAC crypto news headlines",
        accepts: [evmAccept("2000"), solanaAccept("2000")],
      },
      {
        path: "/api/holiday/jp",
        method: "GET",
        description: "Japanese public holidays for the current year",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      {
        path: "/api/stocks/{ticker}",
        method: "GET",
        description: "TSE/APAC stock price",
        accepts: [evmAccept("10000"), solanaAccept("10000")],
      },
    ],
  });
}
