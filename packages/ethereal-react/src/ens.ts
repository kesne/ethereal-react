import { useAddressOrDefault } from "./accounts";
import { EtherealProvider, useProvider } from "./provider";
import { createAsset } from "./utils/use-asset";

const resolveENSAsset = createAsset(
  async (provider: EtherealProvider, ensName: string) => {
    return provider.resolveName(ensName);
  }
);

export function useResolveENS(ensName: string) {
  const provider = useProvider();
  return resolveENSAsset.read(provider, ensName);
}

const ensForAddressAsset = createAsset(
  async (provider: EtherealProvider, address: string) => {
    return await provider.lookupAddress(address);
  }
);

export function useENSForAddress(address?: string) {
  const provider = useProvider();
  const userAddress = useAddressOrDefault(address);
  return ensForAddressAsset.read(provider, userAddress);
}
