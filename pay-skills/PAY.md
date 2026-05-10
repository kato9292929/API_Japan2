---
name: japan-data
title: "Japan Data API"
description: "Real-time Japan weather, JPY FX rates, TSE equity prices, visa requirements, land prices, population statistics, tax calculation, and domestic logistics estimates for AI agents."
use_case: "Use for current weather in Tokyo/Osaka/Sapporo; live USDJPY/EURJPY/GBPJPY/AUDJPY rates; TSE stock data; Japan visa eligibility by country; city land prices; prefecture population; consumption tax calculation; or domestic shipping rate estimates."
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
    description: "Latest price and metadata for a TSE-listed ticker (e.g. 7203.T, 6758.T, 9984.T)"
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
  - method: GET
    path: /api/visa/jp
    resource: visa
    description: "Japan visa requirements and max stay by country code (?country=US)"
    pricing:
      dimensions:
        - direction: usage
          unit: requests
          scale: 1
          tiers:
            - price_usd: 0.005
  - method: GET
    path: /api/realestate/{city}
    resource: realestate
    description: "Average land price per sqm and top districts for a Japanese city (MLIT 地価公示 2024)"
    pricing:
      dimensions:
        - direction: usage
          unit: requests
          scale: 1
          tiers:
            - price_usd: 0.005
  - method: GET
    path: /api/tax/jp
    resource: tax
    description: "Japan consumption tax calculation — standard 10% or reduced 8% (?amount=1000&category=standard)"
    pricing:
      dimensions:
        - direction: usage
          unit: requests
          scale: 1
          tiers:
            - price_usd: 0.003
  - method: GET
    path: /api/population/{prefecture}
    resource: population
    description: "Population, household count, and density for all 47 Japan prefectures (総務省 2024)"
    pricing:
      dimensions:
        - direction: usage
          unit: requests
          scale: 1
          tiers:
            - price_usd: 0.003
  - method: GET
    path: /api/logistics/jp
    resource: logistics
    description: "Japan domestic shipping rate and delivery days estimate (?weight_g=500&to_region=kanto)"
    pricing:
      dimensions:
        - direction: usage
          unit: requests
          scale: 1
          tiers:
            - price_usd: 0.005
---

## Overview

Japan Data API provides AI agents with structured real-time and curated data from Japanese markets and government sources. No API keys or accounts required — agents pay per request with USDC on Base (EVM) or Solana via x402.

Endpoint discovery: `https://apijapan.vercel.app/.well-known/x402.json`

| Endpoint | Example | Price | Source |
|---|---|---|---|
| `/api/weather/{city}` | `/api/weather/tokyo` | $0.001 | Open-Meteo |
| `/api/fx/{pair}` | `/api/fx/USDJPY` | $0.001 | Yahoo Finance |
| `/api/stocks/{ticker}` | `/api/stocks/7203.T` | $0.010 | Yahoo Finance |
| `/api/news/apac` | `/api/news/apac` | $0.005 | RSS Aggregator |
| `/api/visa/jp` | `/api/visa/jp?country=US` | $0.005 | MOFA Japan |
| `/api/realestate/{city}` | `/api/realestate/tokyo` | $0.005 | MLIT 地価公示 |
| `/api/tax/jp` | `/api/tax/jp?amount=1000&category=standard` | $0.003 | NTA Japan |
| `/api/population/{prefecture}` | `/api/population/tokyo` | $0.003 | 総務省統計局 |
| `/api/logistics/jp` | `/api/logistics/jp?weight_g=500&to_region=kanto` | $0.005 | Yamato TA-Q-BIN |

## Spend-aware usage

- Specify the exact city, pair, or ticker — avoid fetching multiple endpoints to compare
- Weather updates every 15 minutes; do not poll more frequently
- Cache FX and stock snapshots within a single agent session when tick-level freshness is not critical
- Tax calculation is pure computation; cache results for identical inputs
- Population and real estate data reflect annual statistics; cache aggressively
