import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const evmPayTo = (process.env.WALLET_ADDRESS ?? "0x0000000000000000000000000000000000000000") as `0x${string}`;
  const solanaPayTo = process.env.SOLANA_WALLET_ADDRESS ?? "";

  const evmAccept = (maxAmountRequired: string) => ({
    scheme: "exact",
    network: "base-sepolia",
    maxAmountRequired,
    asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    payTo: evmPayTo,
    maxTimeoutSeconds: 300,
    extra: { name: "USDC", version: "2" },
  });

  const solanaAccept = (maxAmountRequired: string) => ({
    scheme: "exact",
    network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
    maxAmountRequired,
    asset: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    payTo: solanaPayTo,
    maxTimeoutSeconds: 300,
    extra: { name: "USDC" },
  });

  return NextResponse.json({
    x402Version: 1,
    endpoints: [
      // Weather — 3 cities
      {
        path: "/api/weather/tokyo",
        method: "GET",
        description: "Tokyo weather data",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      {
        path: "/api/weather/osaka",
        method: "GET",
        description: "Osaka weather data",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      {
        path: "/api/weather/sapporo",
        method: "GET",
        description: "Sapporo weather data",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      // FX — 4 pairs
      {
        path: "/api/fx/USDJPY",
        method: "GET",
        description: "USD/JPY exchange rate",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      {
        path: "/api/fx/EURJPY",
        method: "GET",
        description: "EUR/JPY exchange rate",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      {
        path: "/api/fx/GBPJPY",
        method: "GET",
        description: "GBP/JPY exchange rate",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      {
        path: "/api/fx/AUDJPY",
        method: "GET",
        description: "AUD/JPY exchange rate",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      // Stocks — 5 tickers
      {
        path: "/api/stocks/7203.T",
        method: "GET",
        description: "Toyota (TSE:7203)",
        accepts: [evmAccept("10000"), solanaAccept("10000")],
      },
      {
        path: "/api/stocks/6758.T",
        method: "GET",
        description: "Sony (TSE:6758)",
        accepts: [evmAccept("10000"), solanaAccept("10000")],
      },
      {
        path: "/api/stocks/9984.T",
        method: "GET",
        description: "SoftBank (TSE:9984)",
        accepts: [evmAccept("10000"), solanaAccept("10000")],
      },
      {
        path: "/api/stocks/7974.T",
        method: "GET",
        description: "Nintendo (TSE:7974)",
        accepts: [evmAccept("10000"), solanaAccept("10000")],
      },
      {
        path: "/api/stocks/6861.T",
        method: "GET",
        description: "Keyence (TSE:6861)",
        accepts: [evmAccept("10000"), solanaAccept("10000")],
      },
      // News — 1
      {
        path: "/api/news/apac",
        method: "GET",
        description: "APAC crypto news",
        accepts: [evmAccept("5000"), solanaAccept("5000")],
      },
    ],
  });
}
