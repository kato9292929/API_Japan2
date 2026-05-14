import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { ExactSvmScheme } from "@x402/svm/exact/server";

// CDP's facilitator endpoint does not expose a /supported route, so
// getSupported() always 404s and x402ResourceServer.initialize() throws.
// This wrapper stubs getSupported() with our known supported networks
// while delegating verify/settle to the real CDP endpoint.
class CDPFacilitatorClient {
  private http: HTTPFacilitatorClient;

  constructor(url: string, apiKey: string | undefined) {
    this.http = new HTTPFacilitatorClient({
      url,
      ...(apiKey
        ? {
            createAuthHeaders: async () => ({
              verify: { "x-api-key": apiKey },
              settle: { "x-api-key": apiKey },
              supported: { "x-api-key": apiKey },
            }),
          }
        : {}),
    });
  }

  async getSupported() {
    return {
      x402Version: 2,
      kinds: [
        { x402Version: 2, scheme: "exact", network: "eip155:8453" as const },
        { x402Version: 2, scheme: "exact", network: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp" as const },
      ],
      extensions: [] as string[],
      signers: {} as Record<string, string[]>,
    };
  }

  verify(...args: Parameters<HTTPFacilitatorClient["verify"]>) {
    return this.http.verify(...args);
  }

  settle(...args: Parameters<HTTPFacilitatorClient["settle"]>) {
    return this.http.settle(...args);
  }
}

const facilitatorClient = new CDPFacilitatorClient(
  "https://api.developer.coinbase.com/rpc/v1/base/facilitator",
  process.env.CDP_API_KEY,
);

export const server = new x402ResourceServer(facilitatorClient);
server.register("eip155:*", new ExactEvmScheme());
server.register("solana:*", new ExactSvmScheme());

export const svmAddress = process.env.SOLANA_WALLET_ADDRESS!;
