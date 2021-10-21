import { ReactNode } from "react";
import { useProvider } from "./provider";
import { useMutation } from "./utils/use-mutation";
import { useWalletContext } from "./wallet";

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

export function useSwitchNetwork(options: SwitchNetworkOptions) {
  const { chainId, ...networkConfig } = options;
  const chainIdHex = `0x${chainId.toString(16)}`;

  const { provider } = useWalletContext("useSwitchNetwork");

  if (!provider) {
    throw new Error(
      "The `useSwitchNetwork` hook cannot be used without a connected wallet."
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
  providerName?: string;
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
  const { chainId, fallback, children, providerName } = props;

  const provider = useProvider(providerName);
  const network = provider.readNetwork();

  return <>{network.chainId === chainId ? children : fallback}</>;
}
