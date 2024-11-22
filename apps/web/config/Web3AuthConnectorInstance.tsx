"use client";
// Web3Auth Libraries
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { Chain } from "wagmi/chains";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

export default function Web3AuthConnectorInstance(chains: Chain[]) {
  // Create Web3Auth Instance
  const name = "CoinSage";
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + (chains[0]?.id?.toString(16) || ""),
    rpcTarget: chains[0]?.rpcUrls?.default?.http?.[0] || "", // Public RPC endpoint
    displayName: chains[0]?.name || "",
    tickerName: chains[0]?.nativeCurrency?.name || "",
    ticker: chains[0]?.nativeCurrency?.symbol || "",
    blockExplorerUrl: chains[0]?.blockExplorers?.default.url || "",
    logo: "/logo.jpeg",
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: {
      chainConfig: { ...chainConfig, rpcTarget: chainConfig.rpcTarget || "" },
    },
  });

  const web3AuthInstance = new Web3Auth({
    clientId:
      "BIdhEREQ1A6Z2cDcDXK7TLcMxSu74xfTaBiKuSGDQ8W0DqEROpMRDHx_rs5aHN6bWy6hyXdO367KNktiZ3O8vko",
    chainConfig: { ...chainConfig, rpcTarget: chainConfig.rpcTarget || "" },
    privateKeyProvider,
    uiConfig: {
      appName: name,
      loginMethodsOrder: ["github", "google"],
      defaultLanguage: "en",
      modalZIndex: "2147483647",
      logoLight: "/logo.jpeg",
      logoDark: "/logo.jpeg",
      uxMode: "redirect",
      mode: "dark",
    },
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    enableLogging: true,
  });

  const walletServicesPlugin = new WalletServicesPlugin({
    walletInitOptions: {
      whiteLabel: {
        showWidgetButton: true,
      },
    },
  });
  web3AuthInstance.addPlugin(walletServicesPlugin);

  const modalConfig = {
    [WALLET_ADAPTERS.AUTH]: {
      label: "openlogin",
      loginMethods: {
        facebook: {
          // it will hide the facebook option from the Web3Auth modal.
          name: "facebook login",
          showOnModal: false,
        },
      },
      // setting it to false will hide all social login methods from modal.
      showOnModal: true,
    },
  };

  return Web3AuthConnector({
    web3AuthInstance,
    modalConfig,
  });
}
