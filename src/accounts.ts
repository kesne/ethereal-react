import { createAsset } from "./utils/use-asset";
import { useProvider, EtherealProvider } from "./provider";

const userAddressCache = createAsset(
  async (provider: EtherealProvider) => {
    return provider.getSigner().getAddress();
  }
);

export function useAddressOrDefault(address?: string) {
  const provider = useProvider();
  if (address) {
    return address;
  }
  return userAddressCache.read(provider);
}

export function useUserAddress() {
  const provider = useProvider();
  return userAddressCache.read(provider);
}

const balanceAsset = createAsset(
  async (provider: EtherealProvider, address: string) => {
    return await provider.getBalance(address);
  }
);

export function useBalance(address?: string) {
  const provider = useProvider();
  const userAddress = useAddressOrDefault(address);
  return balanceAsset.read(provider, userAddress);
}
