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
      {
        path: "/api/weather/tokyo",
        method: "GET",
        description: "Japan weather data",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      {
        path: "/api/fx/USDJPY",
        method: "GET",
        description: "JPY exchange rate",
        accepts: [evmAccept("1000"), solanaAccept("1000")],
      },
      {
        path: "/api/stocks/7203.T",
        method: "GET",
        description: "TSE stock data",
        accepts: [evmAccept("10000"), solanaAccept("10000")],
      },
    ],
  });
}
