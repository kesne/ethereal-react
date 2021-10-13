import { AppProps } from "next/app";
import { Suspense } from "react";
import { WalletProvider } from "ethereal-react";
// @ts-ignore: This package does not have types.
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ConnectButton } from "../components/ConnectButton";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Suspense fallback="Loading...">
      <WalletProvider
        cacheProvider
        network="ropsten"
        providerOptions={{
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
            },
          },
        }}
        fallback={<ConnectButton />}
      >
        <Component {...pageProps} />
      </WalletProvider>
    </Suspense>
  );
}

export default MyApp;
