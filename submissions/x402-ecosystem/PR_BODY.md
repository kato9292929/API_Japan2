# Add API Japan to x402 Ecosystem

## Summary

Add **API Japan** (`apijapan.vercel.app`) to the x402 ecosystem under the **Services/Endpoints** category.

## About this project

API Japan is a Japan-focused data API service with 25 x402-gated endpoints, all payable with USDC on Base Sepolia or Solana devnet.

**Discovery endpoint:** `https://apijapan.vercel.app/.well-known/x402.json`

### Endpoint categories

| Category | Count | Examples |
|---|---|---|
| Weather | 3 | Tokyo, Osaka, Sapporo (Open-Meteo) |
| FX Rates | 4 | USD/JPY, EUR/JPY, GBP/JPY, AUD/JPY |
| Macro Economy | 4 | JGB yields (MOF), GDP (Cabinet Office), CPI (e-Stat), BOJ policy rate |
| Geospatial | 4 | Elevation, reverse geocoder, hazard map, flood risk (GSI/国土地理院) |
| Safety | 2 | Seismic hazard (J-SHIS), flood depth (国土交通省) |
| Government | 2 | Visa requirements (MOFA), procurement notices (e-Gov KKJ) |
| Real estate | 1 | Land prices by city (MLIT 地価公示) |
| Tax | 1 | Consumption tax calculator (NTA) |
| Population | 1 | Prefecture population (Statistics Bureau) |
| Logistics | 1 | Domestic shipping rates (Yamato TA-Q-BIN) |
| Postal | 1 | Postal code lookup (zipcloud) |
| RESAS | 1 | Regional economy (RESAS API) |

### Pricing

- $0.001–$0.005 per call depending on endpoint
- Supports both EVM (Base Sepolia, `eip155:84532`) and Solana devnet
- No API key required — pay-per-use with USDC

## Files added

- `app/ecosystem/partners-data/api-japan/metadata.json`
- `public/logos/api-japan.svg`

## Checklist

- [x] Service is live and x402-enabled
- [x] `/.well-known/x402.json` discovery endpoint is published
- [x] Logo added to `public/logos/`
- [x] `metadata.json` follows required format
- [x] Category is `Services/Endpoints`
