import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const payTo = (process.env.WALLET_ADDRESS ?? "0x0000000000000000000000000000000000000000") as `0x${string}`;

  return NextResponse.json({
    x402Version: 1,
    endpoints: [
      {
        path: "/api/weather/tokyo",
        method: "GET",
        description: "Japan weather data",
        accepts: [
          {
            scheme: "exact",
            network: "base-sepolia",
            maxAmountRequired: "1000",
            asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
            payTo,
            maxTimeoutSeconds: 300,
            extra: { name: "USDC", version: "2" },
          },
        ],
      },
      {
        path: "/api/fx/USDJPY",
        method: "GET",
        description: "JPY exchange rate",
        accepts: [
          {
            scheme: "exact",
            network: "base-sepolia",
            maxAmountRequired: "1000",
            asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
            payTo,
            maxTimeoutSeconds: 300,
            extra: { name: "USDC", version: "2" },
          },
        ],
      },
      {
        path: "/api/stocks/7203.T",
        method: "GET",
        description: "TSE stock data",
        accepts: [
          {
            scheme: "exact",
            network: "base-sepolia",
            maxAmountRequired: "10000",
            asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
            payTo,
            maxTimeoutSeconds: 300,
            extra: { name: "USDC", version: "2" },
          },
        ],
      },
    ],
  });
}
