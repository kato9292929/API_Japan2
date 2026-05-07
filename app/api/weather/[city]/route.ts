import { NextRequest, NextResponse } from 'next/server';
import { X402PaymentHandler } from 'x402-solana/server';

const x402 = new X402PaymentHandler({
  network: 'solana-devnet',
  treasuryAddress: process.env.SOLANA_WALLET_ADDRESS!,
  facilitatorUrl: 'https://facilitator.payai.network',
});

export async function GET(req: NextRequest) {
  const city = req.nextUrl.pathname.split('/').pop() ?? 'tokyo';
  const resourceUrl = `https://apijapan.vercel.app/api/weather/${city}`;
  const paymentHeader = x402.extractPayment(req.headers);

  const paymentRequirements = await x402.createPaymentRequirements({
    amount: '1000',
    asset: {
      address: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
      decimals: 6,
    },
    description: `${city} weather data`,
  }, resourceUrl);

  if (!paymentHeader) {
    const response = x402.create402Response(paymentRequirements, resourceUrl);
    return NextResponse.json(response.body, { status: response.status });
  }

  const verified = await x402.verifyPayment(paymentHeader, paymentRequirements);
  if (!verified.isValid) {
    return NextResponse.json({ error: 'Invalid payment' }, { status: 402 });
  }

  await x402.settlePayment(paymentHeader, paymentRequirements);

  const res = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.69&current=temperature_2m,relative_humidity_2m,wind_speed_10m'
  );
  const data = await res.json();
  return NextResponse.json({ city, ...data.current });
}
