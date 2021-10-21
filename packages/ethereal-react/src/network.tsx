import { ReactNode } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useProvider, EtherealProvider } from "./provider";
import { createAsset } from "./utils/use-asset";
import { useMutation } from "./utils/use-mutation";

const networkAsset = createAsset(async (provider: EtherealProvider) => {
  return provider.getNetwork();
});

/**
 * Returns the current chain information for currently-connected Ethereum network.
 *
 * @returns An `ethers` `Network` object.
 * @see https://docs.ethers.io/v5/api/providers/types/#providers-Network
 */
export function useNetwork(providerName?: string) {
  const provider = useProvider(providerName);
  return networkAsset.read(provider);
}

/**
 * @see https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
 */
interface AddEthereumChainParameter {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[];
}

/**
 * @see https://docs.metamask.io/guide/rpc-api.html#wallet-switchethereumchain
 */
interface SwitchEthereumChainParameter {
  chainId: number;
}

type SwitchNetworkOptions =
  | AddEthereumChainParameter
  | SwitchEthereumChainParameter;

export function useSwitchNetwork(
  options: SwitchNetworkOptions,
  providerName?: string
) {
  const { chainId, ...networkConfig } = options;
  const chainIdHex = `0x${chainId.toString(16)}`;

  const provider = useProvider(providerName);

  if (!(provider instanceof Web3Provider)) {
    throw new Error(
      "The `useSwitchNetwork` hook only supports being used within a `WalletProvider`."
    );
  }

  return useMutation(async () => {
    try {
      await provider.send("wallet_switchEthereumChain", [
        { chainId: chainIdHex },
      ]);
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902 && "chainName" in networkConfig) {
        await provider.send("wallet_addEthereumChain", [
          { chainId: chainIdHex, ...networkConfig },
        ]);
      } else {
        throw switchError;
      }
    }
  }, [provider]);
}

interface RequireNetworkProps {
  chainId: number;
  fallback: ReactNode;
  children: ReactNode;
}

/**
 * Require a specific `chainId` to be currently connected in the user's wallet in order to render the `children` prop.
 * If the `chainId` does not match, then the `fallback` will be returned.
 * The {@link useSwitchNetwork} hook can be used to prompt the user to switch their network to the expected network.
 */
export function RequireNetwork(props: RequireNetworkProps) {
  const { chainId, fallback, children } = props;

  const network = useNetwork();

  return <>{network.chainId === chainId ? children : fallback}</>;
}
