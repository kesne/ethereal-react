import { AppProps } from "next/app";
import { Suspense } from "react";
import { RequireNetwork, WalletProvider } from "ethereal-react";
// @ts-ignore: This package does not have types.
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ConnectButton } from "../components/ConnectButton";
import { SwitchNetwork } from "../components/SwitchNetwork";

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
      <Suspense fallback="Loading...">
        <RequireNetwork chainId={3} fallback={<SwitchNetwork />}>
          <Component {...pageProps} />
        </RequireNetwork>
      </Suspense>
    </WalletProvider>
  );
}

export default MyApp;
