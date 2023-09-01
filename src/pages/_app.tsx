import { type AppType } from "next/dist/shared/lib/utils";
import { siweClient } from "src/utils/siweClient";
import { ConnectKitProvider, getDefaultConfig, type SIWESession } from "connectkit";
import { CHAINS, publicClient, webSocketPublicClient } from "src/utils/onChainConfig";
import { WagmiConfig, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "react-query";
import "src/styles/globals.css";
import { ThemeProvider } from "next-themes";


const queryClient = new QueryClient()
const config = createConfig(getDefaultConfig({
  alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
  // /env.mjs ensures the the app isn't built without .env vars
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  appName: "KERNEL Searchers App",
  appDescription: "Kernel Searchers Helper App",
  appUrl: "https://kernel.community",
  appIcon: "https://kernel.community/logo.png",
  publicClient,
  webSocketPublicClient,
  chains: CHAINS
}));

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider defaultTheme="retro">
        <WagmiConfig config={config}>
          <QueryClientProvider client={queryClient}>
            <siweClient.Provider
              // Optional parameters
              enabled={true} // defaults true
              nonceRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
              sessionRefetchInterval={300000}// in milliseconds, defaults to 5 minutes
              signOutOnDisconnect={true} // defaults true
              signOutOnAccountChange={true} // defaults true
              signOutOnNetworkChange={true} // defaults true
              onSignIn={(session?: SIWESession) => { console.log({ session }) }}
              onSignOut={() => console.log("signed out")}
            >
              <ConnectKitProvider theme="retro">
                <Component {...pageProps} />
              </ConnectKitProvider>
            </siweClient.Provider>
          </QueryClientProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  )
};

export default MyApp;
