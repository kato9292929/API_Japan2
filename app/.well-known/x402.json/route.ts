import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const evmPayTo = (process.env.WALLET_ADDRESS ?? "0x0000000000000000000000000000000000000000") as `0x${string}`;
  const solanaPayTo = process.env.SOLANA_WALLET_ADDRESS ?? "";

  const evm = (maxAmountRequired: string) => ({
    scheme: "exact",
    network: "base-sepolia",
    maxAmountRequired,
    asset: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    payTo: evmPayTo,
    maxTimeoutSeconds: 300,
    extra: { name: "USDC", version: "2" },
  });

  const sol = (maxAmountRequired: string) => ({
    scheme: "exact",
    network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
    maxAmountRequired,
    asset: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    payTo: solanaPayTo,
    maxTimeoutSeconds: 300,
    extra: { name: "USDC" },
  });

  const weatherSource = {
    name: "Open-Meteo",
    url: "https://open-meteo.com",
    license: "CC BY 4.0 (data); API: non-commercial free, commercial requires subscription",
    registration_required: false,
    commercial_use: "requires subscription",
    update_frequency: "hourly",
    data_type: "live",
  };

  const fxSource = {
    name: "ExchangeRate-API (open.er-api.com)",
    url: "https://www.exchangerate-api.com",
    license: "Commercial use permitted; no raw data redistribution; attribution required",
    registration_required: false,
    commercial_use: "permitted",
    update_frequency: "daily",
    data_type: "live",
  };

  const stocksSource = {
    name: "Mock data — J-Quants API (planned)",
    url: "https://jpx-jquants.com",
    license: "MOCK: no real data. Planned: J-Quants API (JPX official)",
    registration_required: false,
    commercial_use: "n/a (mock)",
    update_frequency: "n/a (mock; planned: real-time during TSE hours)",
    data_type: "mock",
    warning: "Returns static placeholder values. Response includes note: 'mock data'.",
  };

  const newsSource = {
    name: "Mock data — RSS aggregation (planned)",
    url: "",
    license: "MOCK: no real data. Planned: CoinDesk Asia, CoinTelegraph Japan RSS",
    registration_required: false,
    commercial_use: "n/a (mock)",
    update_frequency: "n/a (mock; planned: hourly)",
    data_type: "mock",
    warning: "Returns hardcoded headline stubs. Not real news.",
  };

  const visaSource = {
    name: "Ministry of Foreign Affairs of Japan (MOFA / 外務省)",
    url: "https://www.mofa.go.jp/j_info/visit/visa/",
    license: "Japanese Government data — permitted for commercial use with attribution",
    registration_required: false,
    commercial_use: "permitted with attribution",
    update_frequency: "policy-driven (several times per year)",
    data_type: "static_curated",
    last_curated: "2025-01",
    coverage: "27 countries",
  };

  const realestateSource = {
    name: "国土交通省 地価公示 (MLIT Land Price Survey)",
    url: "https://www.mlit.go.jp/totikensangyo/totikensangyo_fr4_000043.html",
    also: "https://www.reinfolib.mlit.go.jp",
    license: "CC BY 4.0 相当 (出典明示のうえ商用利用可)",
    registration_required: false,
    commercial_use: "permitted with attribution",
    update_frequency: "annual (published March each year)",
    data_type: "static_curated",
    last_curated: "2024-03",
    coverage: "10 cities: tokyo, osaka, nagoya, sapporo, fukuoka, kyoto, yokohama, sendai, hiroshima, naha",
  };

  const taxSource = {
    name: "National Tax Agency Japan (国税庁)",
    url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shohi/6101.htm",
    legal_basis: "消費税法29条 / 附則第34条 (軽減税率)",
    license: "Statutory rates — public law, unrestricted use",
    registration_required: false,
    commercial_use: "unrestricted",
    update_frequency: "tax law amendments only (current rates since October 2019)",
    data_type: "computed",
    rates: { standard: "10%", reduced: "8% (food, non-alcoholic beverages, newspapers)", exempt: "0%" },
  };

  const populationSource = {
    name: "Statistics Bureau of Japan (総務省統計局)",
    url: "https://www.stat.go.jp/data/jinsui/",
    also: "https://www.e-stat.go.jp",
    license: "e-Stat 利用規約 — 登録不要・出典明示のうえ商用利用可",
    registration_required: false,
    commercial_use: "permitted with attribution",
    update_frequency: "annual snapshot (source publishes monthly)",
    data_type: "static_curated",
    last_curated: "2024-10",
    coverage: "all 47 prefectures",
  };

  const logisticsSource = {
    name: "Yamato Transport TA-Q-BIN (ヤマト運輸 宅急便)",
    url: "https://www.kuronekoyamato.co.jp/ytc/customer/send/services/takkyubin/",
    license: "Public rate table (公開料金表) — informational reference. Not an official Yamato API.",
    registration_required: false,
    commercial_use: "rate table is public information; endpoint provides estimates only",
    update_frequency: "annual (Yamato updates rates each April)",
    data_type: "static_computed",
    last_curated: "2024-04",
    coverage: "9 regions: hokkaido, tohoku, kanto, chubu, kinki, chugoku, shikoku, kyushu, okinawa",
  };

  return NextResponse.json({
    x402Version: 1,
    endpoints: [
      // ─── Weather (3) ───
      { path: "/api/weather/tokyo",   method: "GET", description: "Tokyo current weather",   accepts: [evm("1000"),  sol("1000")],  data_source: weatherSource },
      { path: "/api/weather/osaka",   method: "GET", description: "Osaka current weather",   accepts: [evm("1000"),  sol("1000")],  data_source: weatherSource },
      { path: "/api/weather/sapporo", method: "GET", description: "Sapporo current weather", accepts: [evm("1000"),  sol("1000")],  data_source: weatherSource },
      // ─── FX (4) ───
      { path: "/api/fx/USDJPY", method: "GET", description: "USD/JPY exchange rate", accepts: [evm("1000"), sol("1000")], data_source: fxSource },
      { path: "/api/fx/EURJPY", method: "GET", description: "EUR/JPY exchange rate", accepts: [evm("1000"), sol("1000")], data_source: fxSource },
      { path: "/api/fx/GBPJPY", method: "GET", description: "GBP/JPY exchange rate", accepts: [evm("1000"), sol("1000")], data_source: fxSource },
      { path: "/api/fx/AUDJPY", method: "GET", description: "AUD/JPY exchange rate", accepts: [evm("1000"), sol("1000")], data_source: fxSource },
      // ─── Stocks (5) ───
      { path: "/api/stocks/7203.T", method: "GET", description: "Toyota (TSE:7203)",   accepts: [evm("10000"), sol("10000")], data_source: stocksSource },
      { path: "/api/stocks/6758.T", method: "GET", description: "Sony (TSE:6758)",     accepts: [evm("10000"), sol("10000")], data_source: stocksSource },
      { path: "/api/stocks/9984.T", method: "GET", description: "SoftBank (TSE:9984)", accepts: [evm("10000"), sol("10000")], data_source: stocksSource },
      { path: "/api/stocks/7974.T", method: "GET", description: "Nintendo (TSE:7974)", accepts: [evm("10000"), sol("10000")], data_source: stocksSource },
      { path: "/api/stocks/6861.T", method: "GET", description: "Keyence (TSE:6861)",  accepts: [evm("10000"), sol("10000")], data_source: stocksSource },
      // ─── News (1) ───
      { path: "/api/news/apac", method: "GET", description: "APAC crypto news", accepts: [evm("5000"), sol("5000")], data_source: newsSource },
      // ─── Visa (1) ───
      { path: "/api/visa/jp", method: "GET", description: "Japan visa requirements (?country=US)", accepts: [evm("5000"), sol("5000")], data_source: visaSource },
      // ─── Real estate (1) ───
      { path: "/api/realestate/{city}", method: "GET", description: "Japan land price data by city", accepts: [evm("5000"), sol("5000")], data_source: realestateSource },
      // ─── Tax (1) ───
      { path: "/api/tax/jp", method: "GET", description: "Japan consumption tax calculation (?amount=1000&category=standard)", accepts: [evm("3000"), sol("3000")], data_source: taxSource },
      // ─── Population (1) ───
      { path: "/api/population/{prefecture}", method: "GET", description: "Japan prefecture population statistics", accepts: [evm("3000"), sol("3000")], data_source: populationSource },
      // ─── Logistics (1) ───
      { path: "/api/logistics/jp", method: "GET", description: "Japan domestic shipping rate estimate (?weight_g=500&to_region=kanto)", accepts: [evm("5000"), sol("5000")], data_source: logisticsSource },
    ],
  });
}
