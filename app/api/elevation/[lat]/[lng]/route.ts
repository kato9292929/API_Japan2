import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const parts = req.nextUrl.pathname.split("/");
  const lng = parts[parts.length - 1];
  const lat = parts[parts.length - 2];
  if (isNaN(Number(lat)) || isNaN(Number(lng))) {
    return NextResponse.json({ error: "Invalid lat/lng" }, { status: 400 });
  }
  try {
    const res = await fetch(
      `https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php?lon=${lng}&lat=${lat}&outtype=JSON`
    );
    const data = await res.json();
    return NextResponse.json({
      lat: Number(lat),
      lng: Number(lng),
      elevation_m: data.elevation,
      data_source_detail: data.hsrc,
      source: "国土地理院 標高API",
      reference: "https://maps.gsi.go.jp/development/elevation.html",
      license: "国土地理院オープンデータ — 登録不要・商用利用可",
      update_frequency: "static DEM (5m laser or 10m)",
    });
  } catch {
    return NextResponse.json({ error: "GSI elevation API unavailable" }, { status: 502 });
  }
};

export const GET = withX402(
  handler,
  {
    accepts: [
      { scheme: "exact", price: "$0.001", network: "eip155:84532", payTo: process.env.WALLET_ADDRESS as `0x${string}` },
      { scheme: "exact", price: "$0.001", network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1", payTo: process.env.SOLANA_WALLET_ADDRESS as string },
    ],
    description: "Elevation in meters at a lat/lng point (GSI Japan)",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { lat: "35.6812", lng: "139.7671" },
        output: { example: { lat: 35.6812, lng: 139.7671, elevation_m: 3.2, data_source_detail: "5m(レーザ)" } },
      }),
    },
  },
  server,
);
