import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";

const facilitatorClient = new HTTPFacilitatorClient({
  url: process.env.FACILITATOR_URL ?? "https://x402.org/facilitator",
});

export const server = new x402ResourceServer(facilitatorClient);
registerExactEvmScheme(server);

// Manually populate supportedResponsesMap so the 402 gate works without
// a live facilitator connection (x402.org blocks non-allowlisted hosts).
const x402Version = 2;
const network = "eip155:84532";
const scheme = "exact";

const supportedResponse = {
  kinds: [{ x402Version, scheme, network }],
  extensions: [] as string[],
  signers: {} as Record<string, string[]>,
};

const versionMap = new Map<string, Map<string, typeof supportedResponse>>();
const networkMap = new Map<string, typeof supportedResponse>();
networkMap.set(scheme, supportedResponse);
versionMap.set(network, networkMap);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(server as any).supportedResponsesMap.set(x402Version, versionMap);

const clientVersionMap = new Map<string, Map<string, typeof facilitatorClient>>();
const clientNetworkMap = new Map<string, typeof facilitatorClient>();
clientNetworkMap.set(scheme, facilitatorClient);
clientVersionMap.set(network, clientNetworkMap);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(server as any).facilitatorClientsMap.set(x402Version, clientVersionMap);
