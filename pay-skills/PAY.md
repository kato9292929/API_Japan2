---
name: japan-data
title: "Japan Data API"
description: "Real-time Japan weather, JPY foreign-exchange rates, TSE equity prices, and APAC crypto news delivered as structured JSON for AI agents."
use_case: "Use for current weather in Tokyo, Osaka, or Sapporo; live USDJPY, EURJPY, GBPJPY, or AUDJPY rates; TSE equity data for Toyota, Sony, SoftBank, Nintendo, or Keyence; or APAC crypto market headlines."
category: data
service_url: https://apijapan.vercel.app
endpoints:
  - method: GET
    path: /api/weather/{city}
    resource: weather
    description: "Current weather conditions for a Japanese city (tokyo, osaka, sapporo)"
    pricing:
      dimensions:
        - direction: usage
          unit: requests
          scale: 1
          tiers:
            - price_usd: 0.001
  - method: GET
    path: /api/fx/{pair}
    resource: fx
    description: "Live JPY exchange rate for a currency pair (USDJPY, EURJPY, GBPJPY, AUDJPY)"
    pricing:
      dimensions:
        - direction: usage
          unit: requests
          scale: 1
          tiers:
            - price_usd: 0.001
  - method: GET
    path: /api/stocks/{ticker}
    resource: stocks
    description: "Latest price and metadata for a TSE-listed ticker (e.g. 7203.T, 6758.T)"
    pricing:
      dimensions:
        - direction: usage
          unit: requests
          scale: 1
          tiers:
            - price_usd: 0.010
  - method: GET
    path: /api/news/apac
    resource: news
    description: "Recent APAC crypto market headlines aggregated from RSS feeds"
    pricing:
      dimensions:
        - direction: usage
          unit: requests
          scale: 1
          tiers:
            - price_usd: 0.005
---

## Overview

Japan Data API gives AI agents structured real-time access to Japanese market data using the x402 payment protocol. No API keys or accounts required — agents pay per request with USDC on Base (EVM) or Solana.

Endpoint discovery is available at `https://apijapan.vercel.app/.well-known/x402.json`.

| Endpoint | Example | Price |
|---|---|---|
| `/api/weather/{city}` | `/api/weather/tokyo` | $0.001 |
| `/api/fx/{pair}` | `/api/fx/USDJPY` | $0.001 |
| `/api/stocks/{ticker}` | `/api/stocks/7203.T` | $0.010 |
| `/api/news/apac` | `/api/news/apac` | $0.005 |

**Supported cities:** `tokyo` · `osaka` · `sapporo`

**Supported FX pairs:** `USDJPY` · `EURJPY` · `GBPJPY` · `AUDJPY`

**Supported TSE tickers:** `7203.T` (Toyota) · `6758.T` (Sony) · `9984.T` (SoftBank) · `7974.T` (Nintendo) · `6861.T` (Keyence)

## Spend-aware usage

- Specify the exact city, pair, or ticker — avoid fetching multiple endpoints to compare
- Weather updates every 15 minutes; do not poll more frequently
- Cache FX and stock snapshots within a single agent session when tick-level freshness is not required
- Fetch `/api/fx/USDJPY` first when you need a JPY baseline before requesting stock data
