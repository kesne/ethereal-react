import { EtherealProvider, useProvider } from "./provider";
import { createAsset } from "./utils/use-asset";

const gasAsset = createAsset((provider: EtherealProvider) => {
  return provider.getGasPrice();
});

export function useGasPrice(providerName?: string) {
  const provider = useProvider(providerName);
  return gasAsset.read(provider);
}
