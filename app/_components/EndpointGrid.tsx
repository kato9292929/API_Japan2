"use client";
import { useEffect, useState } from "react";

interface X402Accept {
  scheme: string;
  network: string;
  maxAmountRequired: string;
}

interface X402Endpoint {
  path: string;
  method: string;
  description: string;
  accepts: X402Accept[];
}

interface X402Discovery {
  x402Version: number;
  endpoints: X402Endpoint[];
}

function formatPrice(maxAmountRequired: string): string {
  const amount = parseInt(maxAmountRequired, 10) / 1_000_000;
  if (amount < 0.01) return `$${amount.toFixed(3)}`;
  return `$${amount.toFixed(2)}`;
}

const DATA_SOURCES: Record<string, string> = {
  "Japan weather data": "Open-Meteo",
  "JPY exchange rate": "Yahoo Finance",
  "TSE stock data": "Yahoo Finance",
  "APAC crypto news": "RSS Aggregator",
};

export function EndpointGrid() {
  const [endpoints, setEndpoints] = useState<X402Endpoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/.well-known/x402.json")
      .then((r) => r.json())
      .then((data: X402Discovery) => {
        setEndpoints(data.endpoints);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-[#444] text-sm font-mono py-8">
        loading endpoints...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#111]">
      {endpoints.map((ep) => {
        const price = ep.accepts[0]?.maxAmountRequired
          ? formatPrice(ep.accepts[0].maxAmountRequired)
          : "—";
        const source = DATA_SOURCES[ep.description] ?? ep.description;
        return (
          <div
            key={ep.path}
            className="bg-black p-6 group hover:bg-[#060606] transition-colors duration-150"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono tracking-widest text-[#444] uppercase">
                {ep.method}
              </span>
              <span className="text-xs font-mono text-[#D4AF37]">
                {price} USDC
              </span>
            </div>
            <code className="block text-sm font-mono text-white mb-3 break-all group-hover:text-[#D4AF37] transition-colors duration-150">
              {ep.path}
            </code>
            <p className="text-[11px] text-[#444] font-mono">{source}</p>
          </div>
        );
      })}
    </div>
  );
}
