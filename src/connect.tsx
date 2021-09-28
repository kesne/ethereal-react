import { ReactNode, useCallback } from "react";
import { useProvider } from ".";
import { web3Modal } from "./provider";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

export function useConnectToWallet() {
  const [, setProvider] = useProvider();

  return useCallback(() => {
    web3Modal.connect().then((provider) => setProvider(provider));
  }, []);
}

export function ConnectedToWallet({ fallback, children }: Props) {
  const [provider] = useProvider();

  if (provider) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
