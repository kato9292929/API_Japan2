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
| 8 | `GET /api/stocks/7203.T` | Toyota TSE price | $0.010 | **Mock** |
| 9 | `GET /api/stocks/6758.T` | Sony TSE price | $0.010 | **Mock** |
| 10 | `GET /api/stocks/9984.T` | SoftBank TSE price | $0.010 | **Mock** |
| 11 | `GET /api/stocks/7974.T` | Nintendo TSE price | $0.010 | **Mock** |
| 12 | `GET /api/stocks/6861.T` | Keyence TSE price | $0.010 | **Mock** |
| 13 | `GET /api/news/apac` | APAC crypto news | $0.005 | **Mock** |
| 14 | `GET /api/visa/jp?country=US` | Japan visa requirements | $0.005 | Static (curated) |
| 15 | `GET /api/realestate/{city}` | Land price by city | $0.005 | Static (curated) |
| 16 | `GET /api/tax/jp?amount=1000&category=standard` | Consumption tax calc | $0.003 | Computed |
| 17 | `GET /api/population/{prefecture}` | Prefecture population | $0.003 | Static (curated) |
| 18 | `GET /api/logistics/jp?weight_g=500&to_region=kanto` | Domestic shipping rate | $0.005 | Static (computed) |

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

### 8–12 · TSE Stocks — Mock Data ⚠️

| Item | Detail |
|---|---|
| **Current status** | **MOCK DATA** — returns static placeholder values; no real market data |
| **Planned source** | [J-Quants API](https://jpx-jquants.com) — Japan Exchange Group (JPX) official data API |
| **Planned license** | J-Quants free plan: personal/research use OK; commercial plan available |
| **Note** | Endpoints will be updated to live data once J-Quants API integration is complete. Current response always includes `"note": "mock data"`. |

---

### 13 · APAC Crypto News — Mock Data ⚠️

| Item | Detail |
|---|---|
| **Current status** | **MOCK DATA** — returns hardcoded headline stubs |
| **Planned source** | RSS aggregation (CoinDesk Asia, Decrypt, CoinTelegraph Japan) |
| **Planned license** | RSS feeds are generally available for aggregation; per-feed terms apply |
| **Note** | Response always returns same two headlines until RSS integration is implemented |

---

### 14 · Japan Visa Requirements — MOFA Japan

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

### 15 · Land Price Data — MLIT 地価公示

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

### 16 · Consumption Tax — National Tax Agency Japan

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

### 17 · Prefecture Population — Statistics Bureau of Japan

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

### 18 · Domestic Logistics — Yamato Transport (TA-Q-BIN)

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
