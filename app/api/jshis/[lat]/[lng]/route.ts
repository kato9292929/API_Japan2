import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const parts = req.nextUrl.pathname.split("/");
  const lng = parts.pop() ?? "139.6917";
  const lat = parts.pop() ?? "35.6895";

  const res = await fetch(
    `https://j-shis.bosai.go.jp/map/api/pshm/Y2020/meshinfo.geojson?lon=${lng}&lat=${lat}&epsg=4326`
  );
  if (!res.ok) {
    return NextResponse.json({ error: "upstream error" }, { status: 502 });
  }
  const data = await res.json();
  return NextResponse.json({ lat, lng, seismic_hazard: data });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.003",
        network: "eip155:84532",
        payTo: process.env.WALLET_ADDRESS as `0x${string}`,
      },
    ],
    description: "Japan seismic hazard probability",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { lat: "35.6895", lng: "139.6917" },
        pathParamsSchema: {
          properties: {
            lat: { type: "string", description: "Latitude (decimal)" },
            lng: { type: "string", description: "Longitude (decimal)" },
          },
          required: ["lat", "lng"],
        },
        output: {
          example: {
            lat: "35.6895",
            lng: "139.6917",
            seismic_hazard: {
              probability_30yr_seismic_intensity_6lower: 0.82,
            },
          },
        },
      }),
    },
  },
  server,
);
