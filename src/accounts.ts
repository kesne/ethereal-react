import { ethers } from "ethers";
import { createAsset } from "use-asset";
import { useProvider } from "./provider";

const userAddressCache = createAsset(
  async (provider: ethers.providers.Web3Provider) => {
    return provider.getSigner().getAddress();
  }
);

export function useUserAddress() {
  const provider = useProvider();
  return userAddressCache.read(provider);
}

export function useBalance() {
  throw new Error("TODO: Implement");
}
