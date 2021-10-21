import { createAsset } from "./utils/use-asset";
import { useProvider, EtherealProvider } from "./provider";
import { BigNumber } from "@ethersproject/bignumber";

const userAddressCache = createAsset(async (provider: EtherealProvider) => {
  return provider.getSigner().getAddress();
});

export function useAddressOrDefault(address?: string, providerName?: string) {
  const provider = useProvider(providerName);
  if (address) {
    return address;
  }
  return userAddressCache.read(provider);
}

/**
 * Loads the public address of the currently connected wallet.
 * This hook will suspend while it loads.
 */
export function useUserAddress(providerName?: string) {
  const provider = useProvider(providerName);
  return userAddressCache.read(provider);
}

const balanceAsset = createAsset(
  async (provider: EtherealProvider, address: string) => {
    return await provider.getBalance(address);
  }
);

/**
 * Loads the current Ethers balance (in wei) of the provided address.
 * This hook will suspend while it loads.
 *
 * @param address The address that you would like to check the balance of. If it is not provided, then the address of the connected wallet is used instead.
 * @returns The current balance of the address, in wei.
 * @see https://docs.ethers.io/v5/single-page/#/v5/api/providers/provider/-%23-Provider-getBalance
 */
export function useBalance(address?: string, providerName?: string): BigNumber {
  const provider = useProvider(providerName);
  const userAddress = useAddressOrDefault(address);
  return balanceAsset.read(provider, userAddress);
}
