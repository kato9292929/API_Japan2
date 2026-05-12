# API Japan — Japan Data APIs for AI Agents

x402対応の日本データAPI。AIエージェントがAPIキーなしでUSDCを送るだけで日本の各種データをリアルタイム取得できます。

**Base URL:** `https://apijapan.vercel.app`  
**Discovery:** `https://apijapan.vercel.app/.well-known/x402.json`  
**Payment:** x402 (USDC on Base / Solana)

---

## Endpoints

| # | Endpoint | Description | Price | Data Type |
|---|---|---|---|---|
| 1 | `GET /api/weather/tokyo` | Tokyo current weather | $0.001 | Live |
| 2 | `GET /api/weather/osaka` | Osaka current weather | $0.001 | Live |
| 3 | `GET /api/weather/sapporo` | Sapporo current weather | $0.001 | Live |
| 4 | `GET /api/fx/USDJPY` | USD/JPY exchange rate | $0.001 | Live |
| 5 | `GET /api/fx/EURJPY` | EUR/JPY exchange rate | $0.001 | Live |
| 6 | `GET /api/fx/GBPJPY` | GBP/JPY exchange rate | $0.001 | Live |
| 7 | `GET /api/fx/AUDJPY` | AUD/JPY exchange rate | $0.001 | Live |
| 8 | `GET /api/news/apac` | APAC crypto news | $0.005 | **Mock** |
| 9 | `GET /api/visa/jp?country=US` | Japan visa requirements | $0.005 | Static (curated) |
| 10 | `GET /api/realestate/{city}` | Land price by city | $0.005 | Static (curated) |
| 11 | `GET /api/tax/jp?amount=1000&category=standard` | Consumption tax calc | $0.003 | Computed |
| 12 | `GET /api/population/{prefecture}` | Prefecture population | $0.003 | Static (curated) |
| 13 | `GET /api/logistics/jp?weight_g=500&to_region=kanto` | Domestic shipping rate | $0.005 | Static (computed) |
| 14 | `GET /api/jgb` | Japan JGB yield curve | $0.002 | Live |
| 15 | `GET /api/gdp/jp` | Japan GDP growth rate | $0.003 | Static (curated) |
| 16 | `GET /api/cpi/jp` | Japan CPI inflation data | $0.002 | Live (w/ fallback) |
| 17 | `GET /api/boj/policy` | Bank of Japan policy rate | $0.003 | Static (curated) |
| 18 | `GET /api/postal/{code}` | Japan postal code lookup | $0.001 | Live |
| 19 | `GET /api/elevation/{lat}/{lng}` | Japan terrain elevation | $0.001 | Live |
| 20 | `GET /api/address/{lat}/{lng}` | Japan reverse geocoder | $0.001 | Live |
| 21 | `GET /api/hazard/{lat}/{lng}` | Japan hazard map data | $0.003 | Live |
| 22 | `GET /api/procurement/jp` | Govt procurement notices | $0.003 | Live (w/ fallback) |
| 23 | `GET /api/resas/{prefecture}` | RESAS regional economy | $0.003 | Live (w/ fallback) |
| 24 | `GET /api/jshis/{lat}/{lng}` | Seismic hazard probability | $0.003 | Live |
| 25 | `GET /api/flood/{lat}/{lng}` | Japan flood risk data | $0.003 | Live |

> **Note:** `/api/stocks` has been removed. JPX redistribution requires a corporate contract.

---

## Data Sources & Provenance

This section documents the origin, license, and update cadence of every data source used.  
Designed to pass the **Agentic.market verified-service filter**.

---

### 1–3 · Weather — Open-Meteo

| Item | Detail |
|---|---|
| **Source** | Open-Meteo AG (Switzerland) |
| **API endpoint** | `https://api.open-meteo.com/v1/forecast` |
| **Source URL** | https://open-meteo.com |
| **License** | Weather model data: **CC BY 4.0** — share & adapt with attribution. API usage: free for non-commercial use (<10,000 req/day); commercial use requires a paid subscription (from $6/month). |
| **Registration required** | No (free tier) |
| **Commercial use** | Requires subscription for commercial API calls; underlying data CC BY 4.0 permits commercial reuse with attribution |
| **Update frequency** | Hourly (temperature, humidity, wind speed) |
| **Data type** | Live API call on every request |
| **Attribution** | Weather data by [Open-Meteo](https://open-meteo.com) — CC BY 4.0 |

---

### 4–7 · FX Rates — ExchangeRate-API

| Item | Detail |
|---|---|
| **Source** | ExchangeRate-API by AYR Tech Pty Ltd |
| **API endpoint** | `https://open.er-api.com/v6/latest/USD` |
| **Source URL** | https://www.exchangerate-api.com |
| **License** | Free & commercial use permitted. Redistribution of raw rate data is prohibited. Attribution required on pages displaying rates. |
| **Registration required** | No (open access endpoint) |
| **Commercial use** | Permitted (both free and paid plans allow commercial use) |
| **Update frequency** | Daily (free open-access tier) |
| **Data type** | Live API call on every request |
| **Attribution** | Exchange rates by [ExchangeRate-API](https://www.exchangerate-api.com) |

---

### 8 · APAC Crypto News — Mock Data ⚠️

| Item | Detail |
|---|---|
| **Current status** | **MOCK DATA** — returns hardcoded headline stubs |
| **Planned source** | RSS aggregation (CoinDesk Asia, Decrypt, CoinTelegraph Japan) |
| **Planned license** | RSS feeds are generally available for aggregation; per-feed terms apply |
| **Note** | Response always returns same two headlines until RSS integration is implemented |

---

### 9 · Japan Visa Requirements — MOFA Japan

| Item | Detail |
|---|---|
| **Source** | Ministry of Foreign Affairs of Japan (外務省) |
| **Source URL** | https://www.mofa.go.jp/j_info/visit/visa/ |
| **License** | 日本国政府著作物。利用規約に従い情報利用可。出典明示のうえ非営利・商用を問わず参照可。 |
| **Registration required** | No |
| **Commercial use** | Permitted with attribution |
| **Update frequency** | Policy-driven (typically a few updates per year when immigration rules change) |
| **Data type** | Static curated dataset — manually updated from official MOFA publications |
| **Coverage** | 27 countries (US, GB, AU, CA, NZ, DE, FR, IT, ES, NL, CH, KR, SG, MY, TH, PH, ID, CN, IN, VN, BR, MX, AR, RU, UA, AE, TR, ZA) |
| **Last curated** | 2025-01 |

---

### 10 · Land Price Data — MLIT 地価公示

| Item | Detail |
|---|---|
| **Source** | Ministry of Land, Infrastructure, Transport and Tourism (国土交通省) |
| **Source URL** | https://www.mlit.go.jp/totikensangyo/totikensangyo_fr4_000043.html |
| **Also available via** | https://www.reinfolib.mlit.go.jp (REINFOLIB open API) |
| **License** | 国土交通省データ利用規約 — 出典明示のうえ商用・非商用を問わず利用可 (CC BY 4.0 相当) |
| **Registration required** | No (public data) |
| **Commercial use** | Permitted with source attribution |
| **Update frequency** | Annual — 地価公示 published every March |
| **Data type** | Static curated dataset from 地価公示2024 |
| **Coverage** | 10 cities: tokyo, osaka, nagoya, sapporo, fukuoka, kyoto, yokohama, sendai, hiroshima, naha |
| **Last curated** | 2024-03 (地価公示2024) |

---

### 11 · Consumption Tax — National Tax Agency Japan

| Item | Detail |
|---|---|
| **Source** | National Tax Agency Japan (国税庁) |
| **Source URL** | https://www.nta.go.jp/taxes/shiraberu/taxanswer/shohi/6101.htm |
| **Legal basis** | 消費税法第29条 / 消費税法附則第34条 (軽減税率) |
| **License** | Statutory tax rates — public law. No restrictions on use or distribution. |
| **Registration required** | No |
| **Commercial use** | Unrestricted (statutory data) |
| **Update frequency** | Tax law amendments only. Current rates: standard 10%, reduced 8% (since October 2019). |
| **Data type** | Pure computation — no external API call. Rates hardcoded from statute. |
| **Note** | Endpoint is invoice-compliant (インボイス制度対応) |

---

### 12 · Prefecture Population — Statistics Bureau of Japan

| Item | Detail |
|---|---|
| **Source** | Statistics Bureau of Japan (総務省統計局) |
| **Source URL** | https://www.stat.go.jp/data/jinsui/ |
| **Also via** | https://www.e-stat.go.jp (e-Stat open data portal) |
| **License** | e-Stat 利用規約 — 登録不要・出典明示のうえ商用利用可 |
| **Registration required** | No |
| **Commercial use** | Permitted with attribution |
| **Update frequency** | Source publishes monthly estimates; this endpoint uses annual snapshot |
| **Data type** | Static curated dataset |
| **Coverage** | All 47 prefectures (都道府県) |
| **Last curated** | 2024-10 (令和6年10月1日現在推計人口) |

---

### 13 · Domestic Logistics — Yamato Transport (TA-Q-BIN)

| Item | Detail |
|---|---|
| **Source** | ヤマト運輸株式会社 (Yamato Transport Co., Ltd.) |
| **Source URL** | https://www.kuronekoyamato.co.jp/ytc/customer/send/services/takkyubin/ |
| **License** | Publicly published rate tables (公開料金表). Informational reference use. This endpoint is not an official Yamato API. Rate data is derived from Yamato's public rate schedule. |
| **Registration required** | No |
| **Commercial use** | Rate table is public information; this endpoint provides calculated estimates only |
| **Update frequency** | Yamato publishes new rates annually (typically April); static data updated accordingly |
| **Data type** | Static rate table + zone-based calculation. No external API call. |
| **Rate basis** | 2024 TA-Q-BIN standard rates (宅急便料金表2024) |
| **Coverage** | 9 regions: hokkaido, tohoku, kanto, chubu, kinki, chugoku, shikoku, kyushu, okinawa |
| **Last curated** | 2024-04 |

---

### 14 · JGB Yield Curve — Ministry of Finance Japan

| Item | Detail |
|---|---|
| **Source** | 財務省 (Ministry of Finance Japan) — JGB CME Benchmark Yields |
| **Source URL** | https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/ |
| **Data file** | `https://www.mof.go.jp/jgbs/reference/interest_rate/jgbcme_all.csv` |
| **License** | Japanese Government data — public domain, unrestricted use |
| **Registration required** | No |
| **Commercial use** | Unrestricted |
| **Update frequency** | Daily (each business day; TSE hours) |
| **Data type** | Live CSV fetch (with static fallback for weekends/holidays) |
| **Coverage** | 2Y, 5Y, 10Y, 20Y, 30Y, 40Y maturity yields |
| **Fallback** | Returns last known values if MOF CSV unavailable |

---

### 15 · GDP — Cabinet Office Japan (内閣府)

| Item | Detail |
|---|---|
| **Source** | 内閣府経済社会総合研究所 (Cabinet Office, ESRI) — GDP Quarterly Estimates (QE) |
| **Source URL** | https://www.esri.cao.go.jp/en/sna/data/sokuhou/files/2024/qe244_2/gdemenuea.html |
| **License** | Japanese Government data — public domain, unrestricted use |
| **Registration required** | No |
| **Commercial use** | Unrestricted |
| **Update frequency** | Quarterly — preliminary (速報), first revised (1次QE), second revised (2次QE) |
| **Data type** | Static curated — updated when Cabinet Office releases new figures |
| **Coverage** | Real GDP QoQ % change and annualized rate |
| **Last curated** | 2025-03 (2024-Q4 second preliminary) |

---

### 16 · CPI — Statistics Bureau of Japan via e-Stat

| Item | Detail |
|---|---|
| **Source** | 総務省統計局 (Statistics Bureau of Japan) — Consumer Price Index (全国消費者物価指数) |
| **Source URL** | https://www.e-stat.go.jp/stat-search/files?stat_infid=000040135083 |
| **API** | e-Stat API v3 — `statsDataId: 0003427113` |
| **License** | e-Stat 利用規約 — 出典明示のうえ商用利用可 |
| **Registration required** | Yes (`ESTAT_API_KEY` env var; free registration at https://www.e-stat.go.jp/api/) |
| **Commercial use** | Permitted with attribution |
| **Update frequency** | Monthly (released approx. 3–4 weeks after reference month) |
| **Data type** | Live API call (with static fallback when `ESTAT_API_KEY` not set) |
| **Fallback** | Returns 2025-03: YoY +3.6% (core CPI) |

---

### 17 · BOJ Policy Rate — Bank of Japan

| Item | Detail |
|---|---|
| **Source** | 日本銀行 (Bank of Japan) — Monetary Policy Meeting decisions |
| **Source URL** | https://www.boj.or.jp/en/mopo/mpmdeci/ |
| **License** | BOJ public data — unrestricted use |
| **Registration required** | No |
| **Commercial use** | Unrestricted |
| **Update frequency** | Per MPM meeting — approx. 8 times per year |
| **Data type** | Static curated — updated after each MPM decision |
| **Current rate** | 0.50% (as of 2025-01-24) |
| **Last curated** | 2025-01-24 |

---

### 18 · Postal Code — zipcloud (日本郵便)

| Item | Detail |
|---|---|
| **Source** | zipcloud — Japan Post zip code database via ibsnet.co.jp |
| **API endpoint** | `https://zipcloud.ibsnet.co.jp/api/search?zipcode={code}` |
| **Source URL** | https://zipcloud.ibsnet.co.jp/doc/api |
| **Data origin** | 日本郵便 (Japan Post) official postal code database |
| **License** | Free to use — no registration required, no stated commercial restriction |
| **Registration required** | No |
| **Commercial use** | Permitted |
| **Update frequency** | Monthly (follows Japan Post zip code master updates) |
| **Data type** | Live API call on every request |
| **Coverage** | All Japan 7-digit postal codes (〒) |

---

### 19 · Elevation — Geospatial Information Authority (国土地理院)

| Item | Detail |
|---|---|
| **Source** | 国土地理院 (Geospatial Information Authority of Japan) — Digital Elevation Model |
| **API endpoint** | `https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php` |
| **Source URL** | https://maps.gsi.go.jp/development/elevation_s.html |
| **License** | 国土地理院コンテンツ利用規約 — 出典明示のうえ商用利用可 |
| **Registration required** | No |
| **Commercial use** | Permitted with attribution |
| **Update frequency** | Static dataset (DEM updated periodically by GSI) |
| **Data type** | Live API call on every request |
| **Resolution** | 10m DEM (基盤地図情報数値標高モデル) |
| **Coverage** | All Japan coordinates |

---

### 20 · Reverse Geocoder — Geospatial Information Authority (国土地理院)

| Item | Detail |
|---|---|
| **Source** | 国土地理院 (Geospatial Information Authority of Japan) — Reverse Geocoder |
| **API endpoint** | `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress` |
| **Source URL** | https://mreversegeocoder.gsi.go.jp |
| **License** | 国土地理院コンテンツ利用規約 — 出典明示のうえ商用利用可 |
| **Registration required** | No |
| **Commercial use** | Permitted with attribution |
| **Update frequency** | Static (administrative boundary dataset, updated on administrative changes) |
| **Data type** | Live API call — coordinate → municipality code + town/district name |
| **Coverage** | All Japan coordinates |

---

### 21 · Hazard Map — GSI / 国土交通省 ハザードマップポータル

| Item | Detail |
|---|---|
| **Source** | 国土地理院 / 国土交通省 — ハザードマップポータルサイト |
| **API endpoint** | `https://disaportal.gsi.go.jp/hazardmap/api/getHazardmapInfo` |
| **Source URL** | https://disaportal.gsi.go.jp |
| **License** | 国土地理院コンテンツ利用規約 — 出典明示のうえ商用利用可 |
| **Registration required** | No |
| **Commercial use** | Permitted with attribution |
| **Update frequency** | Per municipal hazard map update cycle (varies by municipality) |
| **Data type** | Live API call — flood, landslide, tsunami, storm surge risk by coordinate |
| **Coverage** | All Japan coordinates |

---

### 22 · Government Procurement — e-Gov KKJ (官公需情報)

| Item | Detail |
|---|---|
| **Source** | デジタル庁 e-Gov — 官公需情報ポータルサイト (KKJ) |
| **Source URL** | https://www.e-gov.go.jp/ |
| **License** | Japanese Government data — public domain, unrestricted use |
| **Registration required** | No |
| **Commercial use** | Unrestricted |
| **Update frequency** | Daily (new procurement notices posted on business days) |
| **Data type** | Live API call (with static fallback sample) |
| **Coverage** | All central government ministries and agencies |

---

### 23 · Regional Economy — RESAS (地域経済分析システム)

| Item | Detail |
|---|---|
| **Source** | 経済産業省 / デジタル庁 — RESAS (Regional Economy Society Analyzing System) |
| **API endpoint** | `https://opendata.resas-portal.go.jp/api/v1/population/sum/estimate` |
| **Source URL** | https://opendata.resas-portal.go.jp |
| **License** | RESAS API 利用規約 — 登録必要。非商用・調査研究・公益目的のみ。出典明示必須。 |
| **Registration required** | Yes (`RESAS_API_KEY` env var; free at https://opendata.resas-portal.go.jp/form.html) |
| **Commercial use** | Non-commercial only (government policy; verify for your use case) |
| **Update frequency** | Annual |
| **Data type** | Live API call (with static fallback for 10 major prefectures) |
| **Coverage** | All 47 prefectures — population trends, economy, industry breakdown |
| **Note** | Static fallback returns 2023 population for prefectures 01, 11–14, 23, 26–28, 40 |

---

### 24 · Seismic Hazard — J-SHIS (防災科学技術研究所)

| Item | Detail |
|---|---|
| **Source** | 国立研究開発法人 防災科学技術研究所 (NIED) — J-SHIS (Japan Seismic Hazard Information Station) |
| **API endpoint** | `https://j-shis.bosai.go.jp/map/api/pshm/Y2020/meshinfo.geojson` |
| **Source URL** | https://j-shis.bosai.go.jp |
| **License** | NIED公開データ — 出典明示のうえ利用可。商用利用は個別確認を推奨。 |
| **Registration required** | No |
| **Commercial use** | Permitted with attribution (verify for production commercial use) |
| **Update frequency** | Per NIED model revision cycle (National Seismic Hazard Map for Japan) |
| **Data type** | Live API call — probability of seismic intensity ≥6- within 30/50 years |
| **Coverage** | Nationwide Japan coordinate grid (250m mesh) |

---

### 25 · Flood Risk — GSI / 国土交通省 洪水浸水想定区域

| Item | Detail |
|---|---|
| **Source** | 国土地理院 / 国土交通省 — 洪水浸水想定区域データ |
| **API endpoint** | `https://disaportal.gsi.go.jp/hazardmap/api/getFloodInfo` |
| **Source URL** | https://disaportal.gsi.go.jp |
| **License** | 国土地理院コンテンツ利用規約 — 出典明示のうえ商用利用可 |
| **Registration required** | No |
| **Commercial use** | Permitted with attribution |
| **Update frequency** | Per municipal flood hazard map update (水防法に基づく洪水浸水想定区域) |
| **Data type** | Live API call — estimated inundation depth (m) by coordinate |
| **Coverage** | Major river basins nationwide |

---

## x402 Protocol

All endpoints implement the [x402 payment protocol](https://x402.org):

```
1. Agent sends GET request (no auth)
2. Server returns HTTP 402 Payment Required + payment-required header
3. Agent pays USDC via x402 (Base Sepolia or Solana)
4. Server verifies payment and returns 200 OK with data
```

**Networks supported:**
- EVM: Base Sepolia (`eip155:84532`) — USDC `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- Solana: Devnet (`solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1`) — USDC `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU`

---

## Built by

[x402 Inc.](https://x402jp.com) — Building the payment layer for AI agents in Japan.
