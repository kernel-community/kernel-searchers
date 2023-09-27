import { alchemyProvider } from "wagmi/providers/alchemy";
import { configureChains } from "wagmi";
import { goerli, mainnet, polygon } from "wagmi/chains";

export const CHAINS = [goerli, mainnet, polygon];

export const { publicClient, webSocketPublicClient } = configureChains(
  CHAINS,
  // /env.mjs ensures the the app isn't built without .env vars
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! })],
)
