import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const POPULATION: Record<string, { name_ja: string; population: number; households: number; density_per_km2: number; change_yoy_pct: number }> = {
  hokkaido:  { name_ja: "北海道", population: 5140000,  households: 2730000, density_per_km2: 62,   change_yoy_pct: -0.65 },
  aomori:    { name_ja: "青森県", population: 1201000,  households: 583000,  density_per_km2: 129,  change_yoy_pct: -1.42 },
  iwate:     { name_ja: "岩手県", population: 1181000,  households: 528000,  density_per_km2: 78,   change_yoy_pct: -1.18 },
  miyagi:    { name_ja: "宮城県", population: 2290000,  households: 1030000, density_per_km2: 314,  change_yoy_pct: -0.29 },
  akita:     { name_ja: "秋田県", population: 930000,   households: 416000,  density_per_km2: 87,   change_yoy_pct: -1.61 },
  yamagata:  { name_ja: "山形県", population: 1044000,  households: 428000,  density_per_km2: 113,  change_yoy_pct: -1.04 },
  fukushima: { name_ja: "福島県", population: 1784000,  households: 756000,  density_per_km2: 130,  change_yoy_pct: -0.96 },
  ibaraki:   { name_ja: "茨城県", population: 2840000,  households: 1191000, density_per_km2: 469,  change_yoy_pct: -0.42 },
  tochigi:   { name_ja: "栃木県", population: 1916000,  households: 793000,  density_per_km2: 299,  change_yoy_pct: -0.44 },
  gunma:     { name_ja: "群馬県", population: 1921000,  households: 802000,  density_per_km2: 303,  change_yoy_pct: -0.41 },
  saitama:   { name_ja: "埼玉県", population: 7340000,  households: 3201000, density_per_km2: 1934, change_yoy_pct: 0.07  },
  chiba:     { name_ja: "千葉県", population: 6290000,  households: 2801000, density_per_km2: 1228, change_yoy_pct: 0.05  },
  tokyo:     { name_ja: "東京都", population: 14090000, households: 7289000, density_per_km2: 6476, change_yoy_pct: 0.31  },
  kanagawa:  { name_ja: "神奈川県", population: 9240000, households: 4230000, density_per_km2: 3831, change_yoy_pct: 0.09 },
  niigata:   { name_ja: "新潟県", population: 2130000,  households: 874000,  density_per_km2: 178,  change_yoy_pct: -0.88 },
  toyama:    { name_ja: "富山県", population: 1019000,  households: 382000,  density_per_km2: 241,  change_yoy_pct: -0.71 },
  ishikawa:  { name_ja: "石川県", population: 1115000,  households: 462000,  density_per_km2: 271,  change_yoy_pct: -0.31 },
  fukui:     { name_ja: "福井県", population: 756000,   households: 286000,  density_per_km2: 182,  change_yoy_pct: -0.58 },
  yamanashi: { name_ja: "山梨県", population: 808000,   households: 348000,  density_per_km2: 184,  change_yoy_pct: -0.49 },
  nagano:    { name_ja: "長野県", population: 2040000,  households: 845000,  density_per_km2: 151,  change_yoy_pct: -0.59 },
  gifu:      { name_ja: "岐阜県", population: 1971000,  households: 773000,  density_per_km2: 184,  change_yoy_pct: -0.64 },
  shizuoka:  { name_ja: "静岡県", population: 3580000,  households: 1510000, density_per_km2: 467,  change_yoy_pct: -0.52 },
  aichi:     { name_ja: "愛知県", population: 7540000,  households: 3340000, density_per_km2: 1458, change_yoy_pct: 0.24  },
  mie:       { name_ja: "三重県", population: 1762000,  households: 718000,  density_per_km2: 305,  change_yoy_pct: -0.61 },
  shiga:     { name_ja: "滋賀県", population: 1412000,  households: 562000,  density_per_km2: 352,  change_yoy_pct: -0.06 },
  kyoto:     { name_ja: "京都府", population: 2560000,  households: 1190000, density_per_km2: 555,  change_yoy_pct: -0.31 },
  osaka:     { name_ja: "大阪府", population: 8820000,  households: 4360000, density_per_km2: 4631, change_yoy_pct: 0.01  },
  hyogo:     { name_ja: "兵庫県", population: 5440000,  households: 2430000, density_per_km2: 651,  change_yoy_pct: -0.28 },
  nara:      { name_ja: "奈良県", population: 1317000,  households: 554000,  density_per_km2: 356,  change_yoy_pct: -0.66 },
  wakayama:  { name_ja: "和歌山県", population: 916000, households: 387000, density_per_km2: 194, change_yoy_pct: -0.97 },
  tottori:   { name_ja: "鳥取県", population: 549000,   households: 228000,  density_per_km2: 158,  change_yoy_pct: -0.82 },
  shimane:   { name_ja: "島根県", population: 671000,   households: 278000,  density_per_km2: 99,   change_yoy_pct: -0.72 },
  okayama:   { name_ja: "岡山県", population: 1890000,  households: 808000,  density_per_km2: 269,  change_yoy_pct: -0.29 },
  hiroshima: { name_ja: "広島県", population: 2780000,  households: 1249000, density_per_km2: 332,  change_yoy_pct: -0.22 },
  yamaguchi: { name_ja: "山口県", population: 1314000,  households: 578000,  density_per_km2: 214,  change_yoy_pct: -0.88 },
  tokushima: { name_ja: "徳島県", population: 705000,   households: 304000,  density_per_km2: 168,  change_yoy_pct: -0.96 },
  kagawa:    { name_ja: "香川県", population: 942000,   households: 413000,  density_per_km2: 500,  change_yoy_pct: -0.51 },
  ehime:     { name_ja: "愛媛県", population: 1312000,  households: 589000,  density_per_km2: 237,  change_yoy_pct: -0.83 },
  kochi:     { name_ja: "高知県", population: 682000,   households: 327000,  density_per_km2: 101,  change_yoy_pct: -0.99 },
  fukuoka:   { name_ja: "福岡県", population: 5140000,  households: 2430000, density_per_km2: 1027, change_yoy_pct: 0.12  },
  saga:      { name_ja: "佐賀県", population: 804000,   households: 318000,  density_per_km2: 331,  change_yoy_pct: -0.46 },
  nagasaki:  { name_ja: "長崎県", population: 1282000,  households: 580000,  density_per_km2: 321,  change_yoy_pct: -0.85 },
  kumamoto:  { name_ja: "熊本県", population: 1747000,  households: 753000,  density_per_km2: 237,  change_yoy_pct: -0.31 },
  oita:      { name_ja: "大分県", population: 1117000,  households: 501000,  density_per_km2: 176,  change_yoy_pct: -0.61 },
  miyazaki:  { name_ja: "宮崎県", population: 1060000,  households: 471000,  density_per_km2: 140,  change_yoy_pct: -0.61 },
  kagoshima: { name_ja: "鹿児島県", population: 1574000, households: 720000, density_per_km2: 175, change_yoy_pct: -0.69 },
  okinawa:   { name_ja: "沖縄県", population: 1470000,  households: 637000,  density_per_km2: 648,  change_yoy_pct: 0.09  },
};

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const prefecture = (req.nextUrl.pathname.split("/").pop() ?? "tokyo").toLowerCase();
  const data = POPULATION[prefecture];
  if (!data) {
    return NextResponse.json({
      error: `Prefecture '${prefecture}' not found`,
      supported: Object.keys(POPULATION),
    }, { status: 404 });
  }
  return NextResponse.json({
    prefecture,
    ...data,
    source: "総務省統計局 推計人口",
    reference: "https://www.stat.go.jp/data/jinsui/",
    data_year: 2024,
  });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      { scheme: "exact", price: "$0.003", network: "eip155:84532", payTo: process.env.WALLET_ADDRESS as `0x${string}` },
      { scheme: "exact", price: "$0.003", network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1", payTo: process.env.SOLANA_WALLET_ADDRESS as string },
    ],
    description: "Japan prefecture population statistics",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { prefecture: "tokyo" },
        pathParamsSchema: {
          properties: { prefecture: { type: "string", description: "Prefecture name in English (e.g. tokyo, osaka, hokkaido)" } },
          required: ["prefecture"],
        },
        output: { example: { prefecture: "tokyo", name_ja: "東京都", population: 14090000, density_per_km2: 6476, data_year: 2024 } },
      }),
    },
  },
  server, undefined, undefined, false,
);
