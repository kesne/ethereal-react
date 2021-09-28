import React, { Fragment, ReactNode, useCallback } from "react";
import { web3Modal, useProvider } from "./provider";

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
    return <Fragment>{children}</Fragment>;
  }

  return <Fragment>{fallback}</Fragment>;
}
