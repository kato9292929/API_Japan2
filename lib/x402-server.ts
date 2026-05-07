import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactSvmScheme } from "@x402/svm/exact/server";

const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://facilitator.payai.network"
});

export const server = new x402ResourceServer(facilitatorClient);
server.register("solana:*", new ExactSvmScheme());

export const svmAddress = process.env.SOLANA_WALLET_ADDRESS!;
