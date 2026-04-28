# API Japan — Japan Data APIs for AI Agents

**x402-gated REST APIs serving Japan market data. No API keys. Pay per call in USDC.**

Live: [apijapan.vercel.app](https://apijapan.vercel.app)

---

日本語は[こちら](#日本語)

---

## Overview

API Japan exposes four REST endpoints protected by the [x402 payment protocol](https://x402.org). Any HTTP client — including AI agents — can access them by attaching a USDC micropayment header. No registration, no API keys, no subscriptions.

| Endpoint | Description | Price |
|---|---|---|
| `GET /api/weather/[city]` | Current weather for a Japanese city | $0.001 USDC |
| `GET /api/fx/[pair]` | JPY exchange rate | $0.001 USDC |
| `GET /api/stocks/[ticker]` | TSE stock price (mock) | $0.010 USDC |
| `GET /api/news/apac` | APAC crypto news headlines | $0.005 USDC |

Network: **Base Sepolia** (testnet) · Asset: **USDC**

---

## How It Works

Without payment the server returns `402 Payment Required` with a `payment-required` header describing what is owed:

```bash
curl -i https://apijapan.vercel.app/api/weather/tokyo

HTTP/1.1 402 Payment Required
payment-required: eyJ4NDAyVmVyc2lvbi...
```

An x402-capable client reads that header, signs a USDC transfer on Base Sepolia, and retries the request with a `payment-signature` header. The server verifies and settles atomically before returning data.

---

## Discovery

A machine-readable endpoint list is available at:

```
GET /.well-known/x402.json
```

This follows the x402 discovery v1 schema and is consumed by [Bazaar](https://docs.cdp.coinbase.com/x402/bazaar) for automatic API cataloging.

---

## Local Development

### Prerequisites

- Node.js 20+
- A wallet address on Base Sepolia

### Setup

```bash
git clone https://github.com/kato9292929/api_japan2
cd api_japan2
npm install
```

Copy the environment file and fill in your wallet address:

```bash
cp .env.local.example .env.local
```

```env
WALLET_ADDRESS=0xYourWalletAddress
FACILITATOR_URL=https://x402.org/facilitator
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
    route.ts                  # Discovery endpoint (dynamic, reads WALLET_ADDRESS)
  api/
    weather/[city]/route.ts   # Weather API
    fx/[pair]/route.ts        # FX rate API
    stocks/[ticker]/route.ts  # Stock price API
    news/apac/route.ts        # News API
lib/
  x402-server.ts              # x402ResourceServer singleton
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Payment protocol | x402 v2 (`@x402/next`, `@x402/core`, `@x402/evm`) |
| Discovery | `@x402/extensions` (Bazaar) |
| Network | Base Sepolia (EIP-155 chain 84532) |
| Deployment | Vercel |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `WALLET_ADDRESS` | Yes | EVM address to receive USDC payments |
| `FACILITATOR_URL` | No | x402 facilitator URL (default: `https://x402.org/facilitator`) |

---

---

# 日本語

## 概要

API Japan は [x402 ペイメントプロトコル](https://x402.org) でアクセス制限された REST API です。AIエージェントを含む任意の HTTP クライアントが、USDC マイクロペイメントのヘッダーを付加するだけでデータを取得できます。登録・APIキー・サブスクリプション不要。

| エンドポイント | 内容 | 価格 |
|---|---|---|
| `GET /api/weather/[city]` | 日本の都市の現在の天気 | $0.001 USDC |
| `GET /api/fx/[pair]` | JPY 為替レート | $0.001 USDC |
| `GET /api/stocks/[ticker]` | 東証株価（モックデータ） | $0.010 USDC |
| `GET /api/news/apac` | APAC 暗号資産ニュース | $0.005 USDC |

ネットワーク: **Base Sepolia**（テストネット）· アセット: **USDC**

---

## 仕組み

支払いなしでリクエストすると `402 Payment Required` が返ります:

```bash
curl -i https://apijapan.vercel.app/api/weather/tokyo

HTTP/1.1 402 Payment Required
payment-required: eyJ4NDAyVmVyc2lvbi...
```

x402 対応クライアントはそのヘッダーを読み取り、Base Sepolia 上で USDC 送金に署名し、`payment-signature` ヘッダーを付けてリトライします。サーバーはアトミックに検証・決済してからデータを返します。

---

## ローカル開発

```bash
git clone https://github.com/kato9292929/api_japan2
cd api_japan2
npm install
cp .env.local.example .env.local
# .env.local に WALLET_ADDRESS を設定
npm run dev
```

---

## ライセンス

MIT
