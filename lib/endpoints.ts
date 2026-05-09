export type EndpointConfig = {
  path: string;
  method: "GET";
  description: string;
  price: string;
  maxAmount: string;
  source: string;
  tag: string;
};

export const ENDPOINTS: EndpointConfig[] = [
  {
    path: "/api/weather/{city}",
    method: "GET",
    description: "Current weather for APAC cities",
    price: "$0.001",
    maxAmount: "1000",
    source: "Open-Meteo",
    tag: "Weather",
  },
  {
    path: "/api/fx/{pair}",
    method: "GET",
    description: "APAC FX rate against USD",
    price: "$0.001",
    maxAmount: "1000",
    source: "er-api.com",
    tag: "FX",
  },
  {
    path: "/api/crypto/{coin}",
    method: "GET",
    description: "Crypto price in USD and JPY",
    price: "$0.001",
    maxAmount: "1000",
    source: "CoinGecko",
    tag: "Crypto",
  },
  {
    path: "/api/news/japan",
    method: "GET",
    description: "Latest Japan news headlines",
    price: "$0.002",
    maxAmount: "2000",
    source: "NHK RSS",
    tag: "News",
  },
  {
    path: "/api/news/apac",
    method: "GET",
    description: "APAC crypto news headlines",
    price: "$0.002",
    maxAmount: "2000",
    source: "CoinDesk",
    tag: "News",
  },
  {
    path: "/api/holiday/jp",
    method: "GET",
    description: "Japanese public holidays",
    price: "$0.001",
    maxAmount: "1000",
    source: "holidays-jp",
    tag: "Calendar",
  },
  {
    path: "/api/earthquake/jp",
    method: "GET",
    description: "Recent Japan earthquakes (JMA)",
    price: "$0.002",
    maxAmount: "2000",
    source: "P2PQuake",
    tag: "Disaster",
  },
  {
    path: "/api/tsunami/jp",
    method: "GET",
    description: "Japan tsunami warnings (JMA)",
    price: "$0.003",
    maxAmount: "3000",
    source: "P2PQuake",
    tag: "Disaster",
  },
  {
    path: "/api/air/{city}",
    method: "GET",
    description: "AQI, PM2.5, NO2 for APAC cities",
    price: "$0.002",
    maxAmount: "2000",
    source: "WAQI",
    tag: "Air",
  },
  {
    path: "/api/company/{number}",
    method: "GET",
    description: "Japan corporate info by 法人番号",
    price: "$0.002",
    maxAmount: "2000",
    source: "国税庁",
    tag: "Corporate",
  },
  {
    path: "/api/stats/{prefecture}",
    method: "GET",
    description: "Japan prefecture statistics",
    price: "$0.003",
    maxAmount: "3000",
    source: "e-Stat / 総務省",
    tag: "Statistics",
  },
  {
    path: "/api/culture/{keyword}",
    method: "GET",
    description: "Japan cultural heritage search",
    price: "$0.002",
    maxAmount: "2000",
    source: "Japan Search",
    tag: "Culture",
  },
  {
    path: "/api/stocks/{ticker}",
    method: "GET",
    description: "TSE / APAC stock price",
    price: "$0.010",
    maxAmount: "10000",
    source: "mock",
    tag: "Stocks",
  },
];
