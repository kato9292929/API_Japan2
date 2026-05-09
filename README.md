# API Japan — Japan Data APIs for AI Agents

**x402-gated REST APIs serving Japan market data. No API keys. Pay per call in USDC.**

Live: [apijapan.vercel.app](https://apijapan.vercel.app)

---

日本語は[こちら](#日本語)

---

## Overview

API Japan exposes REST endpoints protected by the [x402 payment protocol](https://x402.org). Any HTTP client — including AI agents — can access them by attaching a USDC micropayment header. No registration, no API keys, no subscriptions.

| Endpoint | Description | Price |
|---|---|---|
| `GET /api/weather/[city]` | Current weather for APAC cities (tokyo, singapore, seoul, sydney, ...) | $0.001 USDC |
| `GET /api/fx/[pair]` | APAC FX rate against USD (USDJPY, USDSGD, USDKRW, ...) | $0.001 USDC |
| `GET /api/crypto/[coin]` | Crypto price in USD + JPY via CoinGecko (bitcoin, ethereum, solana, ...) | $0.001 USDC |
| `GET /api/news/japan` | Latest Japan news headlines from NHK | $0.002 USDC |
| `GET /api/news/apac` | APAC crypto news headlines from CoinDesk | $0.002 USDC |
| `GET /api/holiday/jp` | Japanese public holidays for the current year | $0.001 USDC |
| `GET /api/earthquake/jp` | Recent Japan earthquakes from P2PQuake (JMA data) | $0.002 USDC |
| `GET /api/tsunami/jp` | Japan tsunami warnings from P2PQuake (JMA data) | $0.003 USDC |
| `GET /api/air/[city]` | Air quality index for APAC cities (AQI, PM2.5, PM10, NO2, O3) | $0.002 USDC |
| `GET /api/company/[number]` | Japan corporate info by corporate number (国税庁 法人番号API) | $0.002 USDC |
| `GET /api/stats/[prefecture]` | Japan prefecture statistics datasets from e-Stat | $0.003 USDC |
| `GET /api/culture/[keyword]` | Japan cultural heritage search via Japan Search | $0.002 USDC |
| `GET /api/stocks/[ticker]` | TSE/APAC stock price | $0.010 USDC |

Networks:
- **Base** (EVM mainnet, chain 8453) · Asset: USDC `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Solana** (Mainnet) · Asset: USDC `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`

---

## How It Works

Without payment the server returns `402 Payment Required` with payment requirements in the response body:

```bash
curl -i https://apijapan.vercel.app/api/weather/tokyo

HTTP/1.1 402 Payment Required
content-type: application/json
```

An x402-capable client reads the payment requirements, signs a USDC transfer on Base Sepolia or Solana Devnet, and retries the request with an `x-payment` header. The server verifies via the x402 facilitator and returns data.

---

## Discovery

A machine-readable endpoint list is available at:

```
GET /.well-known/x402.json
```

This follows the x402 discovery v1 schema and is consumed by [Bazaar](https://docs.cdp.coinbase.com/x402/bazaar) for automatic API cataloging.

---

## Integration

API Japan works with any x402-compatible client:

- **[@x402/fetch](https://www.npmjs.com/package/@x402/fetch)** — drop-in `fetch` wrapper for Node.js
- **[x402cryptocard](https://x402cryptocard.vercel.app)** — Solana devnet wallet + agent card demo

---

## Local Development

### Prerequisites

- Node.js 20+
- An EVM wallet address (Base Sepolia) and/or a Solana wallet address

### Setup

```bash
git clone https://github.com/kato9292929/api_japan2
cd api_japan2
npm install
```

Copy the environment file and fill in your wallet addresses:

```bash
cp .env.local.example .env.local
```

```env
WALLET_ADDRESS=0xYourEvmWalletAddress
SOLANA_WALLET_ADDRESS=YourSolanaWalletAddress
```

```bash
npm run dev
# → http://localhost:3000
```

### Verify the payment gate

```bash
curl -i localhost:3000/api/weather/tokyo
# Expect: HTTP/1.1 402 Payment Required
```

---

## Project Structure

```
app/
  page.tsx                    # Landing page
  layout.tsx                  # Root layout + metadata
  .well-known/x402.json/
    route.ts                  # Discovery endpoint (dynamic, reads wallet addresses)
  api/
    weather/[city]/route.ts   # Weather API
    fx/[pair]/route.ts        # FX rate API
    stocks/[ticker]/route.ts  # Stock price API
    news/apac/route.ts        # News API
lib/
  x402-server.ts              # x402ResourceServer singleton (EVM + Solana schemes)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Payment protocol | x402 v2 (`@x402/next`, `@x402/core`, `@x402/svm`) |
| Discovery | `@x402/extensions` (Bazaar) |
| Networks | Base (EIP-155:8453), Solana Mainnet |
| Facilitator | `x402.org/facilitator` |
| Deployment | Vercel |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `WALLET_ADDRESS` | Yes | EVM address to receive USDC payments (Base mainnet) |
| `SOLANA_WALLET_ADDRESS` | Yes | Solana address to receive USDC payments (Mainnet) |
| `WAQI_TOKEN` | For `/api/air/[city]` | Free token from [aqicn.org/api](https://aqicn.org/api/) |
| `HOUJIN_API_KEY` | For `/api/company/[number]` | Free key from [houjin-bangou.nta.go.jp](https://www.houjin-bangou.nta.go.jp/webapi/) |
| `ESTAT_API_KEY` | For `/api/stats/[prefecture]` | Free key from [api.e-stat.go.jp](https://api.e-stat.go.jp/) |

---

---

# 日本語

## 概要

API Japan は [x402 ペイメントプロトコル](https://x402.org) でアクセス制限された REST API です。AIエージェントを含む任意の HTTP クライアントが、USDC マイクロペイメントのヘッダーを付加するだけでデータを取得できます。登録・APIキー・サブスクリプション不要。

| エンドポイント | 内容 | 価格 |
|---|---|---|
| `GET /api/weather/[city]` | APAC 都市の現在の天気 (tokyo, singapore, seoul, sydney...) | $0.001 USDC |
| `GET /api/fx/[pair]` | APAC 為替レート (USDJPY, USDSGD, USDKRW...) | $0.001 USDC |
| `GET /api/crypto/[coin]` | 暗号資産の USD/JPY 価格 (bitcoin, ethereum, solana...) | $0.001 USDC |
| `GET /api/news/japan` | NHK 最新ニュース | $0.002 USDC |
| `GET /api/news/apac` | APAC 暗号資産ニュース | $0.002 USDC |
| `GET /api/holiday/jp` | 日本の祝日カレンダー | $0.001 USDC |
| `GET /api/stocks/[ticker]` | 東証・APAC 株価 | $0.010 USDC |

対応ネットワーク:
- **Base**（EVM メインネット）
- **Solana Mainnet**

---

## 仕組み

支払いなしでリクエストすると `402 Payment Required` が返ります:

```bash
curl -i https://apijapan.vercel.app/api/weather/tokyo

HTTP/1.1 402 Payment Required
content-type: application/json
```

x402 対応クライアントはレスポンスボディの支払い要件を読み取り、Base Sepolia または Solana Devnet 上で USDC 送金に署名し、`x-payment` ヘッダーを付けてリトライします。サーバーはファシリテーター経由で検証し、データを返します。

---

## ローカル開発

```bash
git clone https://github.com/kato9292929/api_japan2
cd api_japan2
npm install
cp .env.local.example .env.local
# .env.local に WALLET_ADDRESS と SOLANA_WALLET_ADDRESS を設定
npm run dev
```

---

## ライセンス

MIT
