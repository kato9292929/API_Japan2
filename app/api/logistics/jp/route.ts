import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const SIZE_CLASSES = [
  { name: "60",  max_weight_g: 2000,  max_girth_cm: 60,  base_jpy: 1100 },
  { name: "80",  max_weight_g: 5000,  max_girth_cm: 80,  base_jpy: 1320 },
  { name: "100", max_weight_g: 10000, max_girth_cm: 100, base_jpy: 1540 },
  { name: "120", max_weight_g: 15000, max_girth_cm: 120, base_jpy: 1650 },
  { name: "140", max_weight_g: 20000, max_girth_cm: 140, base_jpy: 1870 },
  { name: "160", max_weight_g: 25000, max_girth_cm: 160, base_jpy: 2090 },
];

const ZONE_SURCHARGE: Record<string, number> = {
  hokkaido: 330, tohoku: 110, kanto: 0, chubu: 110,
  kinki: 220, chugoku: 330, shikoku: 330, kyushu: 440, okinawa: 660,
};

const DELIVERY_DAYS: Record<string, number> = {
  hokkaido: 2, tohoku: 1, kanto: 1, chubu: 1,
  kinki: 2, chugoku: 2, shikoku: 2, kyushu: 2, okinawa: 3,
};

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const weightGStr = req.nextUrl.searchParams.get("weight_g");
  const toRegion   = (req.nextUrl.searchParams.get("to_region") ?? "kanto").toLowerCase();
  const girthStr   = req.nextUrl.searchParams.get("girth_cm");

  if (!weightGStr || isNaN(Number(weightGStr)) || Number(weightGStr) <= 0) {
    return NextResponse.json({ error: "Required query param: weight_g (positive number in grams)" }, { status: 400 });
  }
  if (!(toRegion in ZONE_SURCHARGE)) {
    return NextResponse.json({
      error: `to_region '${toRegion}' not found`,
      supported: Object.keys(ZONE_SURCHARGE),
    }, { status: 400 });
  }

  const weight_g = Number(weightGStr);
  const girth_cm = girthStr ? Number(girthStr) : 60;
  const sizeClass = SIZE_CLASSES.find(
    (s) => weight_g <= s.max_weight_g && girth_cm <= s.max_girth_cm
  );

  if (!sizeClass) {
    return NextResponse.json({ error: "Package exceeds maximum size (160 size / 25 kg)" }, { status: 400 });
  }

  return NextResponse.json({
    weight_g,
    girth_cm,
    to_region: toRegion,
    size_class: sizeClass.name,
    carrier: "Yamato Transport (TA-Q-BIN)",
    price_jpy: sizeClass.base_jpy + ZONE_SURCHARGE[toRegion],
    estimated_delivery_days: DELIVERY_DAYS[toRegion],
    note: "From Tokyo. Rates based on published 2024 TA-Q-BIN standard pricing.",
    source: "ヤマト運輸",
    reference: "https://www.kuronekoyamato.co.jp/ytc/customer/send/services/takkyubin/",
  });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      { scheme: "exact", price: "$0.005", network: "eip155:84532", payTo: process.env.WALLET_ADDRESS as `0x${string}` },
      { scheme: "exact", price: "$0.005", network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1", payTo: process.env.SOLANA_WALLET_ADDRESS as string },
    ],
    description: "Japan domestic shipping rate and delivery estimate (Yamato TA-Q-BIN)",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: {
            weight_g: 500, size_class: "60", carrier: "Yamato Transport (TA-Q-BIN)",
            price_jpy: 1100, estimated_delivery_days: 1, to_region: "kanto",
          },
        },
      }),
    },
  },
  server,
);
