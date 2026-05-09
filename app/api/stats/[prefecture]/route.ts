import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const PREFECTURE_CODE: Record<string, string> = {
  hokkaido: "01", aomori: "02", iwate: "03", miyagi: "04", akita: "05",
  yamagata: "06", fukushima: "07", ibaraki: "08", tochigi: "09", gunma: "10",
  saitama: "11", chiba: "12", tokyo: "13", kanagawa: "14", niigata: "15",
  toyama: "16", ishikawa: "17", fukui: "18", yamanashi: "19", nagano: "20",
  gifu: "21", shizuoka: "22", aichi: "23", mie: "24", shiga: "25",
  kyoto: "26", osaka: "27", hyogo: "28", nara: "29", wakayama: "30",
  tottori: "31", shimane: "32", okayama: "33", hiroshima: "34", yamaguchi: "35",
  tokushima: "36", kagawa: "37", ehime: "38", kochi: "39", fukuoka: "40",
  saga: "41", nagasaki: "42", kumamoto: "43", oita: "44", miyazaki: "45",
  kagoshima: "46", okinawa: "47",
};

const handler = async (req: NextRequest): Promise<Response> => {
  const prefecture = req.nextUrl.pathname.split("/").pop()?.toLowerCase() ?? "tokyo";
  const appId = process.env.ESTAT_API_KEY;
  if (!appId) {
    return NextResponse.json({ error: "ESTAT_API_KEY not configured" }, { status: 500 });
  }
  const code = PREFECTURE_CODE[prefecture];
  if (!code) {
    return NextResponse.json({ error: `Unknown prefecture: ${prefecture}` }, { status: 404 });
  }
  const url =
    `https://api.e-stat.go.jp/rest/3.0/app/json/getStatsList` +
    `?appId=${appId}&searchWord=人口&cdArea=${code}&limit=10&lang=J`;
  const res = await fetch(url, { next: { revalidate: 86400 } });
  const json = await res.json();
  const list = json?.GET_STATS_LIST?.DATALIST_INF?.TABLE_INF ?? [];
  const datasets = (Array.isArray(list) ? list : [list]).map(
    (t: Record<string, unknown>) => ({
      id: t["@id"],
      title: (t.TITLE as Record<string, string>)?.["$"] ?? t.TITLE,
      cycle: t.CYCLE,
      surveyDate: t.SURVEY_DATE,
    })
  );
  return NextResponse.json({ prefecture, code, datasets });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      {
        scheme: "exact",
        price: "$0.003",
        network: "eip155:8453",
        payTo: process.env.WALLET_ADDRESS as `0x${string}`,
      },
      {
        scheme: "exact",
        price: "$0.003",
        network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        payTo: process.env.SOLANA_WALLET_ADDRESS as string,
      },
    ],
    description: "Japan prefecture statistics datasets from e-Stat (総務省)",
    extensions: {
      ...declareDiscoveryExtension({
        pathParams: { prefecture: "tokyo" },
        pathParamsSchema: {
          properties: {
            prefecture: {
              type: "string",
              description: "Prefecture name in romaji (tokyo, osaka, kyoto, fukuoka, ...)",
            },
          },
          required: ["prefecture"],
        },
        output: {
          example: {
            prefecture: "tokyo",
            code: "13",
            datasets: [
              { id: "0003412826", title: "東京都の人口", cycle: "年", surveyDate: "2020" },
            ],
          },
        },
      }),
    },
  },
  server,
  undefined,
  undefined,
  false,
);
