import { useProvider, EtherealProvider } from "./provider";
import { createAsset } from "./utils/use-asset";

const networkAsset = createAsset(async (provider: EtherealProvider) => {
  return provider.getNetwork();
});

/**
 * Returns the current chain information for currently-connected Ethereum network.
 *
 * @returns An `ethers` `Network` object.
 * @see https://docs.ethers.io/v5/api/providers/types/#providers-Network
 */
export function useNetwork() {
  const provider = useProvider();
  return networkAsset.read(provider);
}
