import { EtherealProvider } from "../provider";
import { providerFunction } from "./registry";

export async function addressOrDefault(
  provider: EtherealProvider,
  address?: string
) {
  return address ?? (await provider.getSigner().getAddress());
}

export const readUserAddress = providerFunction(({ provider }) => {
  return provider.getSigner().getAddress();
});

export const readBalance = providerFunction(
  async ({ provider }, address?: string) => {
    return provider.getBalance(addressOrDefault(provider, address));
  }
);
