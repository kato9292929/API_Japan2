import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Japan — Japan Data APIs for AI Agents",
  description:
    "x402対応の日本データAPI。天気・為替・株価をAIエージェントに提供。APIキー不要・USDC決済。",
  openGraph: {
    title: "API Japan — Japan Data APIs for AI Agents",
    description:
      "x402対応の日本データAPI。天気・為替・株価をAIエージェントに提供。APIキー不要・USDC決済。",
    type: "website",
    siteName: "API Japan",
  },
  twitter: {
    card: "summary_large_image",
    title: "API Japan — Japan Data APIs for AI Agents",
    description:
      "x402対応の日本データAPI。天気・為替・株価をAIエージェントに提供。APIキー不要・USDC決済。",
  },
};

const endpoints = [
  {
    path: "/api/weather/[city]",
    description: "Japan weather data",
    price: "$0.001",
    tag: "Weather",
    tagClass: "text-sky-400 bg-sky-400/10 border border-sky-400/20",
  },
  {
    path: "/api/fx/[pair]",
    description: "JPY exchange rate",
    price: "$0.001",
    tag: "FX",
    tagClass: "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20",
  },
  {
    path: "/api/stocks/[ticker]",
    description: "TSE stock data",
    price: "$0.010",
    tag: "Stocks",
    tagClass: "text-violet-400 bg-violet-400/10 border border-violet-400/20",
  },
  {
    path: "/api/news/apac",
    description: "APAC crypto news",
    price: "$0.005",
    tag: "News",
    tagClass: "text-amber-400 bg-amber-400/10 border border-amber-400/20",
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <span className="text-lg font-bold tracking-tight text-white">
            API Japan
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            x402
          </span>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white leading-tight mb-5">
            Japan Data APIs
            <br />
            <span className="text-zinc-500">for AI Agents</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
            APIキー不要。x402プロトコルで USDC を送るだけで
            日本の天気・為替・株価データを取得できます。
          </p>
        </section>

        {/* Endpoint cards */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {endpoints.map((ep) => (
              <div
                key={ep.path}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors duration-150"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${ep.tagClass}`}
                  >
                    {ep.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {ep.price} USDC
                  </span>
                </div>
                <code className="block text-sm font-mono text-emerald-400 mb-2 break-all">
                  {ep.path}
                </code>
                <p className="text-sm text-zinc-500">{ep.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Usage */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <h2 className="text-base font-semibold text-zinc-300 mb-4 tracking-wide uppercase text-sm">
            使い方
          </h2>
          <div className="rounded-xl border border-zinc-800 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              </div>
              <span className="text-zinc-600 text-xs font-mono ml-1">Terminal</span>
            </div>
            <div className="bg-zinc-950 px-5 py-5 overflow-x-auto">
              <pre className="text-sm font-mono">
                <span className="text-zinc-600 select-none">$ </span>
                <span className="text-emerald-400">curl</span>
                <span className="text-zinc-300"> -i https://apijapan.vercel.app/api/weather/tokyo</span>
                {"\n\n"}
                <span className="text-zinc-500"># 支払いなし → 402 が返る</span>
                {"\n"}
                <span className="text-zinc-400">HTTP/1.1 </span>
                <span className="text-amber-400">402 Payment Required</span>
                {"\n"}
                <span className="text-zinc-400">payment-required: </span>
                <span className="text-zinc-500">eyJ4NDAyVmVyc2lvbi...</span>
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-center">
          <p className="text-zinc-600 text-sm">
            Powered by x402 | Built by x402 Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
