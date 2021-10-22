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
    // NOTE: Reverse resolution is not always accurate, so we need to perform
    // the reverse lookup, then the normal lookup to verify that they point
    // to the same address.
    // This is taken from these docs: https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution
    const ensName = await provider.lookupAddress(address);
    const resolvedAddress = await provider.resolveName(ensName);
    if (resolvedAddress === address) {
      return ensName;
    }

    return null;
  }
);

export function useENSForAddress(address?: string) {
  const provider = useProvider();
  const userAddress = useAddressOrDefault(address);
  return ensForAddressAsset.read(provider, userAddress);
}
