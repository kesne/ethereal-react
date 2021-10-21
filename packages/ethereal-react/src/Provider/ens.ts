import { addressOrDefault } from "./accounts";
import { providerFunction } from "./registry";

export const readResolveENS = providerFunction(
  ({ provider }, ensName: string) => {
    return provider.resolveName(ensName);
  }
);

export const readENSForAddress = providerFunction(
  async ({ provider }, address?: string) => {
    const ensAddress = await addressOrDefault(provider, address);

    // NOTE: Reverse resolution is not always accurate, so we need to perform
    // the reverse lookup, then the normal lookup to verify that they point
    // to the same address.
    // This is taken from these docs: https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution
    const ensName = await provider.lookupAddress(ensAddress);
    const resolvedAddress = await provider.resolveName(ensName);
    if (resolvedAddress === ensAddress) {
      return ensAddress;
    }

    return null;
  }
);
