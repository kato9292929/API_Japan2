import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { ExactSvmScheme } from "@x402/svm/exact/server";

const facilitatorClient = new HTTPFacilitatorClient({
  url: "https://facilitator.payai.network"
});

export const server = new x402ResourceServer(facilitatorClient);
server.register("solana:*", new ExactSvmScheme());

// Lazy init: caches the promise so initialize() is called at most once.
// On failure, resets so the next call retries.
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

// Kick off at module load (non-blocking) so the first request doesn't wait cold.
ensureServerReady().catch(console.error);

export const svmAddress = process.env.SOLANA_WALLET_ADDRESS!;
