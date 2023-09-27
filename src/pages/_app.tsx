import { type AppType } from "next/dist/shared/lib/utils";
import { siweClient } from "src/utils/siweClient";
import { ConnectKitProvider, getDefaultConfig, type SIWESession } from "connectkit";
import { CHAINS, publicClient, webSocketPublicClient } from "src/utils/onChainConfig";
import { WagmiConfig, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "react-query";
import "src/styles/globals.css";
import { NextSeo } from "next-seo";
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
      <NextSeo
        titleTemplate="Searchers | %s"
        defaultTitle="Kernel Searching Portal"
        description=""
        openGraph={{
          url: "https://searching.kernel.community",
          title: "Kernel Searching Portal",
          description:
            "",
          images: [
            {
              url: "",
              alt: "",
              type: "image/jpeg",
            },
          ],
          site_name: "Kernel Searching Portal",
        }}
        twitter={{
          handle: "@kernel0x",
          site: "https://kernel.community",
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Libre+Franklin:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap",
          },
          {
            rel: "preload",
            href: "/fonts/Futura/futura-medium.ttf",
            as: "font",
            crossOrigin: "anonymous",
          },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Miriam+Libre:wght@400;700&display=swap"
          }
        ]}
      />
      <ThemeProvider defaultTheme="kernel">
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
              onSignIn={(session?: SIWESession) => {
                console.log({ session })
              }}
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
