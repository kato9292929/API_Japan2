import { ENDPOINTS } from "@/lib/endpoints";

const TAG_STYLE: Record<string, string> = {
  Weather:    "text-sky-400    border-sky-400/30",
  FX:         "text-emerald-400 border-emerald-400/30",
  Crypto:     "text-amber-400  border-amber-400/30",
  News:       "text-violet-400 border-violet-400/30",
  Calendar:   "text-yellow-400 border-yellow-400/30",
  Disaster:   "text-red-400    border-red-400/30",
  Air:        "text-cyan-400   border-cyan-400/30",
  Corporate:  "text-blue-400   border-blue-400/30",
  Statistics: "text-indigo-400 border-indigo-400/30",
  Culture:    "text-rose-400   border-rose-400/30",
  Stocks:     "text-purple-400 border-purple-400/30",
};

const STEPS = [
  {
    num: "01",
    title: "リクエスト送信",
    body: "x402対応クライアントが APIエンドポイントにリクエスト",
    code: "GET /api/weather/tokyo",
    codeColor: "text-sky-400",
  },
  {
    num: "02",
    title: "402 返却",
    body: "サーバーが支払い要件（金額・ネットワーク・アドレス）を返す",
    code: "← 402 Payment Required",
    codeColor: "text-[#D4AF37]",
  },
  {
    num: "03",
    title: "USDC 決済",
    body: "クライアントが Base / Solana でUSDC送金に署名し再送",
    code: "→ x-payment: <signed tx>",
    codeColor: "text-emerald-400",
  },
  {
    num: "04",
    title: "200 OK",
    body: "サーバーが決済を検証し、データを即座に返す",
    code: '← 200 {"temperature_2m":22.5}',
    codeColor: "text-emerald-400",
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#000", color: "#fff", fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ── Header ── */}
      <header style={{ borderBottom: "1px solid #1a1a1a" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-semibold tracking-tight">API Japan</span>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full border tracking-widest"
              style={{ color: "#D4AF37", borderColor: "#D4AF3740", background: "#D4AF3710" }}
            >
              x402
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs" style={{ color: "#555" }}>LIVE</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span
              className="text-[10px] font-semibold tracking-[0.25em] px-3 py-1 rounded-full border"
              style={{ color: "#D4AF37", borderColor: "#D4AF3740", background: "#D4AF3708" }}
            >
              x402 ENABLED
            </span>
            <span className="text-[10px]" style={{ color: "#333" }}>·</span>
            <span
              className="text-[10px] font-semibold tracking-[0.25em] px-3 py-1 rounded-full border"
              style={{ color: "#888", borderColor: "#333" }}
            >
              APAC FIRST
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Japan Data APIs
            <br />
            <span style={{ color: "#444" }}>for AI Agents</span>
          </h1>

          <p className="text-lg max-w-md mx-auto leading-relaxed" style={{ color: "#888" }}>
            APIキー不要。x402プロトコルで USDC を送るだけで
            <br />
            APAC の天気・為替・地震・企業情報を取得。
          </p>

          <div className="mt-10 flex items-center justify-center">
            <a
              href="https://apijapan.vercel.app"
              className="text-sm font-mono px-5 py-2.5 rounded-lg border transition-colors"
              style={{
                color: "#D4AF37",
                borderColor: "#D4AF3750",
                background: "#D4AF3708",
              }}
            >
              apijapan.vercel.app ↗
            </a>
          </div>
        </section>

        {/* ── Endpoints ── */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex items-center gap-4 mb-8">
            <span
              className="text-[10px] font-semibold tracking-[0.25em]"
              style={{ color: "#D4AF37" }}
            >
              ENDPOINTS
            </span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded border"
              style={{ color: "#555", borderColor: "#222" }}
            >
              {ENDPOINTS.length}
            </span>
            <span
              className="text-[10px] tracking-widest"
              style={{ color: "#333" }}
            >
              Base Mainnet · Solana Mainnet
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ENDPOINTS.map((ep) => (
              <div
                key={ep.path}
                className="rounded-xl p-5 transition-colors group"
                style={{
                  background: "#080808",
                  border: "1px solid #1a1a1a",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = "#2a2a2a")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a")
                }
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded border ${TAG_STYLE[ep.tag] ?? "text-zinc-400 border-zinc-700"}`}
                  >
                    {ep.tag.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono" style={{ color: "#D4AF37" }}>
                    {ep.price}
                  </span>
                </div>
                <code className="block text-sm font-mono mb-2 break-all" style={{ color: "#e0e0e0" }}>
                  {ep.path}
                </code>
                <p className="text-xs leading-relaxed" style={{ color: "#555" }}>
                  {ep.description}
                </p>
                <p className="text-[10px] mt-2" style={{ color: "#333" }}>
                  {ep.source}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <span
            className="block text-[10px] font-semibold tracking-[0.25em] mb-10"
            style={{ color: "#D4AF37" }}
          >
            PROTOCOL
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="rounded-xl p-5"
                style={{ background: "#080808", border: "1px solid #1a1a1a" }}
              >
                <div
                  className="text-4xl font-bold mb-4 leading-none"
                  style={{ color: "#1a1a1a" }}
                >
                  {step.num}
                </div>
                <div className="text-sm font-semibold mb-2">{step.title}</div>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "#555" }}>
                  {step.body}
                </p>
                <code className={`text-xs font-mono break-all ${step.codeColor}`}>
                  {step.code}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* ── Terminal ── */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <span
            className="block text-[10px] font-semibold tracking-[0.25em] mb-6"
            style={{ color: "#D4AF37" }}
          >
            TERMINAL
          </span>

          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1a1a1a" }}>
            {/* title bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: "#0d0d0d", borderBottom: "1px solid #1a1a1a" }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#2a2a2a" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#2a2a2a" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#2a2a2a" }} />
              <span className="text-xs font-mono ml-2" style={{ color: "#333" }}>bash</span>
            </div>

            <div className="px-6 py-6 overflow-x-auto" style={{ background: "#050505" }}>
              <pre className="text-sm font-mono leading-relaxed">
                <span style={{ color: "#555" }}>$ </span>
                <span className="text-emerald-400">curl</span>
                <span style={{ color: "#ccc" }}> -i https://apijapan.vercel.app/api/weather/tokyo</span>
                {"\n\n"}
                <span style={{ color: "#333" }}># 支払いなし → 402 が返る</span>
                {"\n"}
                <span style={{ color: "#666" }}>HTTP/1.1 </span>
                <span style={{ color: "#D4AF37" }}>402 Payment Required</span>
                {"\n"}
                <span style={{ color: "#444" }}>
                  {"{"}&quot;x402Version&quot;:1,&quot;accepts&quot;:[&#123;&quot;scheme&quot;:&quot;exact&quot;,&quot;network&quot;:&quot;base&quot;,...&#125;]{"}"}
                </span>
                {"\n\n"}
                <span style={{ color: "#555" }}>$ </span>
                <span className="text-emerald-400">curl</span>
                <span style={{ color: "#ccc" }}>{" "}-H </span>
                <span style={{ color: "#D4AF37" }}>&quot;x-payment: &lt;signed-tx&gt;&quot;</span>
                <span style={{ color: "#ccc" }}> https://apijapan.vercel.app/api/weather/tokyo</span>
                {"\n\n"}
                <span style={{ color: "#666" }}>HTTP/1.1 </span>
                <span className="text-emerald-400">200 OK</span>
                {"\n"}
                <span style={{ color: "#888" }}>
                  {"{"}&quot;city&quot;:&quot;tokyo&quot;,&quot;temperature_2m&quot;:22.5,&quot;relative_humidity_2m&quot;:60,&quot;wind_speed_10m&quot;:5.2{"}"}
                </span>
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <p className="text-xs" style={{ color: "#333" }}>
            Built by{" "}
            <a
              href="https://x402jp.com"
              className="transition-colors hover:text-white"
              style={{ color: "#D4AF37" }}
            >
              x402 Inc.
            </a>
          </p>
          <a
            href="https://x402jp.com"
            className="text-xs transition-colors hover:text-white"
            style={{ color: "#333" }}
          >
            x402jp.com ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
