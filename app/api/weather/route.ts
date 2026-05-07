import { NextRequest, NextResponse } from 'next/server';
import { X402PaymentHandler } from 'x402-solana/server';

const x402 = new X402PaymentHandler({
  network: 'solana-devnet',
  treasuryAddress: process.env.SOLANA_WALLET_ADDRESS!,
  facilitatorUrl: 'https://facilitator.payai.network',
});

export async function GET(req: NextRequest) {
  const resourceUrl = 'https://apijapan.vercel.app/api/weather/tokyo';
  const paymentHeader = x402.extractPayment(req.headers);

  const paymentRequirements = await x402.createPaymentRequirements({
    amount: '1000',
    asset: {
      address: '4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU',
      decimals: 6,
    },
    description: 'Tokyo weather data',
  }, resourceUrl);

  if (!paymentHeader) {
    const response = x402.create402Response(paymentRequirements, resourceUrl);
    const encoded = Buffer.from(JSON.stringify(response.body)).toString('base64');
    return NextResponse.json(response.body, {
      status: response.status,
      headers: { 'PAYMENT-REQUIRED': encoded },
    });
  }

  const verified = await x402.verifyPayment(paymentHeader, paymentRequirements);
  if (!verified.isValid) {
    return NextResponse.json({ error: 'Invalid payment' }, { status: 402 });
  }

  await x402.settlePayment(paymentHeader, paymentRequirements);

  return NextResponse.json({ weather: 'sunny', temperature: 22, city: 'Tokyo' });
}
