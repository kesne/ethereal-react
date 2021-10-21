import { providerFunction } from "./registry";

export const readGasPrice = providerFunction(({ provider }) => {
  return provider.getGasPrice();
});
