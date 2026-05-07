import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";
import { registerExactSvmScheme } from "@x402/svm/exact/server";
import { SOLANA_DEVNET_CAIP2 } from "@x402/svm";
import { bazaarResourceServerExtension } from "@x402/extensions/bazaar";

const facilitatorClient = new HTTPFacilitatorClient({
  url: process.env.FACILITATOR_URL ?? "https://x402.org/facilitator",
});

export const server = new x402ResourceServer(facilitatorClient);
registerExactEvmScheme(server);
registerExactSvmScheme(server);
server.registerExtension(bazaarResourceServerExtension);

// Manually populate supportedResponsesMap so the 402 gate works without
// a live facilitator connection (x402.org blocks non-allowlisted hosts).
const x402Version = 2;
const scheme = "exact";

const supportedResponse = (network: string) => ({
  kinds: [{ x402Version, scheme, network }],
  extensions: [] as string[],
  signers: {} as Record<string, string[]>,
});

const versionMap = new Map<string, Map<string, ReturnType<typeof supportedResponse>>>();
const clientVersionMap = new Map<string, Map<string, typeof facilitatorClient>>();

for (const network of ["eip155:84532", SOLANA_DEVNET_CAIP2]) {
  const networkMap = new Map<string, ReturnType<typeof supportedResponse>>();
  networkMap.set(scheme, supportedResponse(network));
  versionMap.set(network, networkMap);

  const clientNetworkMap = new Map<string, typeof facilitatorClient>();
  clientNetworkMap.set(scheme, facilitatorClient);
  clientVersionMap.set(network, clientNetworkMap);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(server as any).supportedResponsesMap.set(x402Version, versionMap);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(server as any).facilitatorClientsMap.set(x402Version, clientVersionMap);
