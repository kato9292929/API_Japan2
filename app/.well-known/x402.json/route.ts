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

  const jgbSource = {
    name: "Ministry of Finance Japan (財務省) — JGB CME Yields",
    url: "https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/",
    license: "Japanese Government data — public domain, unrestricted use",
    registration_required: false,
    commercial_use: "unrestricted",
    update_frequency: "daily (business days)",
    data_type: "live",
    coverage: "2Y, 5Y, 10Y, 20Y, 30Y, 40Y maturity yields",
  };

  const gdpSource = {
    name: "Cabinet Office Japan (内閣府) — GDP Quarterly Estimates (QE)",
    url: "https://www.esri.cao.go.jp/en/sna/data/sokuhou/files/2024/qe244_2/gdemenuea.html",
    license: "Japanese Government data — public domain, unrestricted use",
    registration_required: false,
    commercial_use: "unrestricted",
    update_frequency: "quarterly (preliminary then revised)",
    data_type: "static_curated",
    last_curated: "2025-03",
    coverage: "Real GDP growth QoQ and YoY, latest quarter",
  };

  const cpiSource = {
    name: "Statistics Bureau of Japan (総務省統計局) — Consumer Price Index via e-Stat",
    url: "https://www.e-stat.go.jp/stat-search/files?stat_infid=000040135083",
    license: "e-Stat 利用規約 — 出典明示のうえ商用利用可",
    registration_required: true,
    commercial_use: "permitted with attribution",
    update_frequency: "monthly (released ~3–4 weeks after reference month)",
    data_type: "live (with static fallback)",
    env_key: "ESTAT_API_KEY",
  };

  const bojSource = {
    name: "Bank of Japan (日本銀行) — Policy Rate Decisions",
    url: "https://www.boj.or.jp/en/mopo/mpmdeci/",
    license: "Japanese Government/BOJ public data — unrestricted use",
    registration_required: false,
    commercial_use: "unrestricted",
    update_frequency: "per MPM meeting (approx. 8 times per year)",
    data_type: "static_curated",
    last_curated: "2025-01-24",
    coverage: "Uncollateralized overnight call rate target, full history",
  };

  const postalSource = {
    name: "zipcloud (住所検索API by Japan Post / 日本郵便)",
    url: "https://zipcloud.ibsnet.co.jp/doc/api",
    license: "Free to use — no registration, no commercial restriction stated",
    registration_required: false,
    commercial_use: "permitted",
    update_frequency: "monthly (follows Japan Post zip code updates)",
    data_type: "live",
    coverage: "All Japan postal codes (7-digit)",
  };

  const elevationSource = {
    name: "Geospatial Information Authority of Japan (国土地理院) — Elevation API",
    url: "https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php",
    license: "国土地理院コンテンツ利用規約 — 出典明示のうえ商用利用可",
    registration_required: false,
    commercial_use: "permitted with attribution",
    update_frequency: "static (DEM dataset, updated periodically)",
    data_type: "live",
    coverage: "All Japan coordinates, resolution: 10m DEM",
  };

  const addressSource = {
    name: "Geospatial Information Authority of Japan (国土地理院) — Reverse Geocoder",
    url: "https://mreversegeocoder.gsi.go.jp",
    license: "国土地理院コンテンツ利用規約 — 出典明示のうえ商用利用可",
    registration_required: false,
    commercial_use: "permitted with attribution",
    update_frequency: "static (administrative boundary dataset)",
    data_type: "live",
    coverage: "All Japan coordinates → municipality + town/district name",
  };

  const hazardSource = {
    name: "Geospatial Information Authority of Japan / 国土交通省 — ハザードマップポータル",
    url: "https://disaportal.gsi.go.jp",
    license: "国土地理院コンテンツ利用規約 — 出典明示のうえ商用利用可",
    registration_required: false,
    commercial_use: "permitted with attribution",
    update_frequency: "per municipal hazard map update cycle",
    data_type: "live",
    coverage: "Flood, landslide, tsunami, storm surge hazard levels by coordinate",
  };

  const procurementSource = {
    name: "e-Gov 官公需情報 (KKJ) — Japanese Government Procurement Portal",
    url: "https://www.e-gov.go.jp/",
    license: "Japanese Government data — public domain, unrestricted use",
    registration_required: false,
    commercial_use: "unrestricted",
    update_frequency: "daily (new notices published on business days)",
    data_type: "live (with static fallback)",
    coverage: "All central government procurement notices",
  };

  const resasSource = {
    name: "地域経済分析システム RESAS (Regional Economy Society Analyzing System)",
    url: "https://opendata.resas-portal.go.jp",
    license: "RESAS API 利用規約 — 登録必要・非商用・出典明示",
    registration_required: true,
    commercial_use: "non-commercial only (government research/public benefit)",
    update_frequency: "annual",
    data_type: "live (with static fallback)",
    env_key: "RESAS_API_KEY",
    coverage: "All 47 prefectures — population, economy, industry data",
  };

  const jshisSource = {
    name: "防災科学技術研究所 J-SHIS — Japan Seismic Hazard Information Station",
    url: "https://j-shis.bosai.go.jp",
    license: "NIED公開データ — 出典明示のうえ利用可（商用利用別途確認推奨）",
    registration_required: false,
    commercial_use: "permitted with attribution (verify for production use)",
    update_frequency: "per NIED model update (National Seismic Hazard Map revision cycle)",
    data_type: "live",
    coverage: "Probability of seismic intensity ≥6- in 30/50 years, nationwide",
  };

  const floodSource = {
    name: "Geospatial Information Authority of Japan / 国土交通省 — 洪水浸水想定区域",
    url: "https://disaportal.gsi.go.jp",
    license: "国土地理院コンテンツ利用規約 — 出典明示のうえ商用利用可",
    registration_required: false,
    commercial_use: "permitted with attribution",
    update_frequency: "per municipal flood hazard map update",
    data_type: "live",
    coverage: "Estimated inundation depth (m) by coordinate",
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
      // ─── Macro Economy (4) ───
      { path: "/api/jgb", method: "GET", description: "Japan JGB yield curve", accepts: [evm("2000"), sol("2000")], data_source: jgbSource },
      { path: "/api/gdp/jp", method: "GET", description: "Japan GDP growth rate", accepts: [evm("3000"), sol("3000")], data_source: gdpSource },
      { path: "/api/cpi/jp", method: "GET", description: "Japan CPI inflation data", accepts: [evm("2000"), sol("2000")], data_source: cpiSource },
      { path: "/api/boj/policy", method: "GET", description: "Bank of Japan policy rate", accepts: [evm("3000"), sol("3000")], data_source: bojSource },
      // ─── Infrastructure (2) ───
      { path: "/api/postal/{code}", method: "GET", description: "Japan postal code lookup", accepts: [evm("1000"), sol("1000")], data_source: postalSource },
      { path: "/api/elevation/{lat}/{lng}", method: "GET", description: "Japan terrain elevation", accepts: [evm("1000"), sol("1000")], data_source: elevationSource },
      // ─── Geospatial / Safety (6) ───
      { path: "/api/address/{lat}/{lng}", method: "GET", description: "Japan reverse geocoder", accepts: [evm("1000"), sol("1000")], data_source: addressSource },
      { path: "/api/hazard/{lat}/{lng}", method: "GET", description: "Japan hazard map data", accepts: [evm("3000"), sol("3000")], data_source: hazardSource },
      { path: "/api/procurement/jp", method: "GET", description: "Japan government procurement notices", accepts: [evm("3000"), sol("3000")], data_source: procurementSource },
      { path: "/api/resas/{prefecture}", method: "GET", description: "Japan RESAS regional economy data", accepts: [evm("3000"), sol("3000")], data_source: resasSource },
      { path: "/api/jshis/{lat}/{lng}", method: "GET", description: "Japan seismic hazard probability", accepts: [evm("3000"), sol("3000")], data_source: jshisSource },
      { path: "/api/flood/{lat}/{lng}", method: "GET", description: "Japan flood risk data", accepts: [evm("3000"), sol("3000")], data_source: floodSource },
    ],
  });
}
