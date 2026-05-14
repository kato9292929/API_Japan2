import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { ExactSvmScheme } from "@x402/svm/exact/server";

// CDP facilitator supports both Base (EVM) and Solana
const cdpApiKey = process.env.CDP_API_KEY;

const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://api.developer.coinbase.com/rpc/v1/base/facilitator",
  ...(cdpApiKey
    ? {
        createAuthHeaders: async () => ({
          verify: { "x-api-key": cdpApiKey },
          settle: { "x-api-key": cdpApiKey },
          supported: { "x-api-key": cdpApiKey },
        }),
      }
    : {}),
});

export const server = new x402ResourceServer(facilitatorClient);
server.register("eip155:*", new ExactEvmScheme());
server.register("solana:*", new ExactSvmScheme());

export const svmAddress = process.env.SOLANA_WALLET_ADDRESS!;
