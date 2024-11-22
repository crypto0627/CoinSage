"use client";
// WAGMI Libraries
import { WagmiProvider, createConfig, http } from "wagmi";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";
import { sepolia, mainnet, arbitrumSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Web3AuthConnectorInstance from "./Web3AuthConnectorInstance";
import { ReactNode } from "react";

const queryClient = new QueryClient();

// Set up client
const config = createConfig({
  chains: [arbitrumSepolia, sepolia, mainnet],
  transports: {
    [arbitrumSepolia.id]: http(),
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId: "44afca0bf279d880e23769a3169b60a3",
      showQrModal: true,
    }),
    coinbaseWallet({ appName: "wagmi" }),
    Web3AuthConnectorInstance([arbitrumSepolia, sepolia, mainnet]),
  ],
});

// Pass client to React Context Provider
function Web3AuthxWagmiProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children as React.ReactNode}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Web3AuthxWagmiProvider;
