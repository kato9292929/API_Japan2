import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { ExactSvmScheme } from "@x402/svm/exact/server";

const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://api.developer.coinbase.com/rpc/v1/base/facilitator",
});

export const server = new x402ResourceServer(facilitatorClient);
server.register("eip155:*", new ExactEvmScheme());
server.register("solana:*", new ExactSvmScheme());

let _initPromise: Promise<void> | null = null;
export const ensureServerReady = (): Promise<void> => {
  if (!_initPromise) {
    _initPromise = server.initialize().catch((err: unknown) => {
      _initPromise = null;
      return Promise.reject(err);
    });
  }
  return _initPromise;
};

ensureServerReady().catch(console.error);

export const getServer = (): Promise<x402ResourceServer> =>
  ensureServerReady().then(() => server);

export const svmAddress = process.env.SOLANA_WALLET_ADDRESS!;
