import { providerFunction } from "./registry";

export const readNetwork = providerFunction(({ provider }) => {
  return provider.getNetwork();
});
