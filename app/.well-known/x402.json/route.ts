import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const evmPayTo = (process.env.WALLET_ADDRESS ?? "0x0000000000000000000000000000000000000000") as `0x${string}`;
  const solanaPayTo = process.env.SOLANA_WALLET_ADDRESS ?? "";

  // Base mainnet USDC
  const EVM_USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  // Solana mainnet USDC
  const SOL_USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

  const evm = (maxAmountRequired: string) => ({
    scheme: "exact",
    network: "eip155:8453",
    maxAmountRequired,
    asset: EVM_USDC,
    payTo: evmPayTo,
    maxTimeoutSeconds: 300,
    extra: { name: "USDC", version: "2" },
  });

  const sol = (maxAmountRequired: string) => ({
    scheme: "exact",
    network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    maxAmountRequired,
    asset: SOL_USDC,
    payTo: solanaPayTo,
    maxTimeoutSeconds: 300,
    extra: { name: "USDC" },
  });

  return NextResponse.json({
    x402Version: 2,
    endpoints: [
      // ─── Weather ───
      { path: "/api/weather/tokyo",   method: "GET", description: "Tokyo current weather",   accepts: [evm("1000"),  sol("1000")] },
      { path: "/api/weather/osaka",   method: "GET", description: "Osaka current weather",   accepts: [evm("1000"),  sol("1000")] },
      { path: "/api/weather/sapporo", method: "GET", description: "Sapporo current weather", accepts: [evm("1000"),  sol("1000")] },
      // ─── FX ───
      { path: "/api/fx/USDJPY", method: "GET", description: "USD/JPY exchange rate", accepts: [evm("1000"), sol("1000")] },
      { path: "/api/fx/EURJPY", method: "GET", description: "EUR/JPY exchange rate", accepts: [evm("1000"), sol("1000")] },
      { path: "/api/fx/GBPJPY", method: "GET", description: "GBP/JPY exchange rate", accepts: [evm("1000"), sol("1000")] },
      { path: "/api/fx/AUDJPY", method: "GET", description: "AUD/JPY exchange rate", accepts: [evm("1000"), sol("1000")] },
      // ─── News ───
      { path: "/api/news/apac", method: "GET", description: "APAC crypto news", accepts: [evm("5000"), sol("5000")] },
      // ─── Visa ───
      { path: "/api/visa/jp", method: "GET", description: "Japan visa requirements (?country=US)", accepts: [evm("5000"), sol("5000")] },
      // ─── Real estate ───
      { path: "/api/realestate/{city}", method: "GET", description: "Japan land price data by city", accepts: [evm("5000"), sol("5000")] },
      // ─── Tax ───
      { path: "/api/tax/jp", method: "GET", description: "Japan consumption tax calculation", accepts: [evm("3000"), sol("3000")] },
      // ─── Population ───
      { path: "/api/population/{prefecture}", method: "GET", description: "Japan prefecture population statistics", accepts: [evm("3000"), sol("3000")] },
      // ─── Logistics ───
      { path: "/api/logistics/jp", method: "GET", description: "Japan domestic shipping rate estimate", accepts: [evm("5000"), sol("5000")] },
      // ─── Macro Economy ───
      { path: "/api/jgb", method: "GET", description: "Japan JGB yield curve", accepts: [evm("2000"), sol("2000")] },
      { path: "/api/gdp/jp", method: "GET", description: "Japan GDP growth rate", accepts: [evm("3000"), sol("3000")] },
      { path: "/api/cpi/jp", method: "GET", description: "Japan CPI inflation data", accepts: [evm("2000"), sol("2000")] },
      { path: "/api/boj/policy", method: "GET", description: "Bank of Japan policy rate", accepts: [evm("3000"), sol("3000")] },
      // ─── Infrastructure ───
      { path: "/api/postal/{code}", method: "GET", description: "Japan postal code lookup", accepts: [evm("1000"), sol("1000")] },
      { path: "/api/elevation/{lat}/{lng}", method: "GET", description: "Japan terrain elevation", accepts: [evm("1000"), sol("1000")] },
      // ─── Geospatial / Safety ───
      { path: "/api/address/{lat}/{lng}", method: "GET", description: "Japan reverse geocoder", accepts: [evm("1000"), sol("1000")] },
      { path: "/api/hazard/{lat}/{lng}", method: "GET", description: "Japan hazard map data", accepts: [evm("3000"), sol("3000")] },
      { path: "/api/procurement/jp", method: "GET", description: "Japan government procurement notices", accepts: [evm("3000"), sol("3000")] },
      { path: "/api/resas/{prefecture}", method: "GET", description: "Japan RESAS regional economy data", accepts: [evm("3000"), sol("3000")] },
      { path: "/api/jshis/{lat}/{lng}", method: "GET", description: "Japan seismic hazard probability", accepts: [evm("3000"), sol("3000")] },
      { path: "/api/flood/{lat}/{lng}", method: "GET", description: "Japan flood risk data", accepts: [evm("3000"), sol("3000")] },
    ],
  });
}
