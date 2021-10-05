import type { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
import { createContext, ReactNode, useContext, useMemo } from "react";

export type EthicalProvider = Web3Provider | JsonRpcProvider;

const ProvidersContext = createContext<Record<string, EthicalProvider>>({});

interface ProviderProps {
  name?: string;
  provider: EthicalProvider;
  children: ReactNode;
}

export function Provider({
  name = "default",
  provider,
  children,
}: ProviderProps) {
  const providers = useContext(ProvidersContext);
  const newContext = useMemo(
    () => ({
      ...providers,
      [name]: provider,
    }),
    [providers, provider, name]
  );

  return (
    <ProvidersContext.Provider value={newContext}>
      {children}
    </ProvidersContext.Provider>
  );
}

export function useProvider(name: string = "default") {
  const providers = useContext(ProvidersContext);

  if (!Object.keys(providers).length) {
    throw new Error("No providers were found in the current React tree.");
  }

  if (!providers.hasOwnProperty(name)) {
    throw new Error(
      `Provider with name "${name}" not found in the current React tree. Only found providers with names: ${Object.keys(
        providers
      ).join(", ")}`
    );
  }

  return providers[name];
}
