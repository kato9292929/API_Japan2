import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";
import { server } from "@/lib/x402-server";

const TAX_RATES: Record<string, number> = {
  standard: 0.10,
  reduced:  0.08,
  exempt:   0.00,
};

const REDUCED_CATEGORIES = ["food", "beverage", "newspaper", "reduced"];
const EXEMPT_CATEGORIES  = ["medical", "welfare", "education", "exempt"];

const handler = async (req: NextRequest): Promise<NextResponse> => {
  const amountStr  = req.nextUrl.searchParams.get("amount");
  const categoryIn = (req.nextUrl.searchParams.get("category") ?? "standard").toLowerCase();

  if (!amountStr || isNaN(Number(amountStr)) || Number(amountStr) < 0) {
    return NextResponse.json({ error: "Required query param: amount (non-negative number)" }, { status: 400 });
  }

  const amount = Number(amountStr);
  let category = "standard";
  if (REDUCED_CATEGORIES.includes(categoryIn)) category = "reduced";
  if (EXEMPT_CATEGORIES.includes(categoryIn))  category = "exempt";

  const rate       = TAX_RATES[category];
  const tax_amount = Math.round(amount * rate);

  return NextResponse.json({
    amount_excl_tax: amount,
    tax_rate:        rate,
    tax_amount,
    total_incl_tax:  amount + tax_amount,
    category,
    invoice_compliant: true,
    note: category === "reduced" ? "軽減税率 8%: 食料品・非アルコール飲料・新聞" : undefined,
    source: "National Tax Agency Japan",
    reference: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shohi/6101.htm",
  });
};

export const GET = withX402(
  handler,
  {
    accepts: [
      { scheme: "exact", price: "$0.003", network: "eip155:84532", payTo: process.env.WALLET_ADDRESS as `0x${string}` },
      { scheme: "exact", price: "$0.003", network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1", payTo: process.env.SOLANA_WALLET_ADDRESS as string },
    ],
    description: "Japan consumption tax calculation (10% standard / 8% reduced)",
    extensions: {
      ...declareDiscoveryExtension({
        output: {
          example: {
            amount_excl_tax: 1000,
            tax_rate: 0.10,
            tax_amount: 100,
            total_incl_tax: 1100,
            category: "standard",
            invoice_compliant: true,
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
