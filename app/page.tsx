import type { Metadata } from "next";
import { EndpointGrid } from "./_components/EndpointGrid";

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

const steps = [
  {
    num: "01",
    title: "Request",
    desc: "AIエージェントがAPIエンドポイントにGETリクエストを送信",
  },
  {
    num: "02",
    title: "402",
    desc: "サーバーが HTTP 402 Payment Required を返す",
  },
  {
    num: "03",
    title: "Payment",
    desc: "エージェントがUSDCをx402プロトコルで自動決済",
  },
  {
    num: "04",
    title: "200 OK",
    desc: "決済確認後、サーバーがデータを返す",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[#111]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-widest text-white uppercase">
              API Japan
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5">
              x402
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
          <div className="mb-6">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37] uppercase">
              x402 ENABLED · APAC FIRST
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.1] mb-6">
            Japan Data APIs
            <br />
            <span className="text-[#333]">for AI Agents</span>
          </h1>
          <p className="text-[#555] text-lg max-w-md leading-relaxed font-light">
            APIキー不要。x402プロトコルで
            <span className="text-white"> USDC を送るだけ</span>で
            日本の天気・為替・株価データを取得できます。
          </p>
        </section>

        {/* Endpoints */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#444] uppercase">
              Endpoints
            </span>
            <div className="flex-1 h-px bg-[#111]" />
          </div>
          <div className="border border-[#111] overflow-hidden">
            <EndpointGrid />
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="mb-8 flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#444] uppercase">
              Protocol
            </span>
            <div className="flex-1 h-px bg-[#111]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-px bg-[#111]">
            {steps.map((step) => (
              <div key={step.num} className="bg-black p-6">
                <div className="text-[10px] font-mono tracking-widest text-[#D4AF37] mb-3">
                  {step.num}
                </div>
                <div className="text-sm font-semibold text-white mb-2 tracking-wide">
                  {step.title}
                </div>
                <p className="text-[11px] text-[#444] leading-relaxed font-mono">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Terminal */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#444] uppercase">
              Example
            </span>
            <div className="flex-1 h-px bg-[#111]" />
          </div>
          <div className="border border-[#111] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#111] bg-[#040404]">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#222]" />
                <div className="w-2 h-2 rounded-full bg-[#222]" />
                <div className="w-2 h-2 rounded-full bg-[#222]" />
              </div>
              <span className="text-[#333] text-[10px] font-mono tracking-widest ml-1 uppercase">
                Terminal
              </span>
            </div>
            <div className="bg-[#020202] px-6 py-6 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <span className="text-[#444] select-none">$ </span>
                <span className="text-white">curl -i https://apijapan.vercel.app/api/weather/tokyo</span>
                {"\n\n"}
                <span className="text-[#333]">{"# APIキーなし → 402 が返る"}</span>
                {"\n"}
                <span className="text-[#555]">HTTP/1.1 </span>
                <span className="text-[#D4AF37]">402 Payment Required</span>
                {"\n"}
                <span className="text-[#555]">content-type: </span>
                <span className="text-[#444]">application/json</span>
                {"\n"}
                <span className="text-[#555]">payment-required: </span>
                <span className="text-[#333]">eyJ4NDAyVmVyc2lvbiI6MSwicGF5VG8iOi...</span>
                {"\n\n"}
                <span className="text-[#333]">{"# x402クライアントが自動で決済 → データ受信"}</span>
                {"\n"}
                <span className="text-[#555]">HTTP/1.1 </span>
                <span className="text-[#4ade80]">200 OK</span>
                {"\n"}
                <span className="text-[#555]">{"{"}</span>
                <span className="text-[#444]"> &quot;city&quot;: &quot;Tokyo&quot;, &quot;temp&quot;: 22, &quot;condition&quot;: &quot;Partly cloudy&quot; </span>
                <span className="text-[#555]">{"}"}</span>
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#111]">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <p className="text-[#333] text-xs font-mono tracking-wide">
            Built by x402 Inc.
          </p>
          <a
            href="https://x402jp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#333] text-xs font-mono tracking-wide hover:text-[#D4AF37] transition-colors duration-150"
          >
            x402jp.com →
          </a>
        </div>
      </footer>
    </div>
  );
}
