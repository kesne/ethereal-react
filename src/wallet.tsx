import { Web3Provider } from "@ethersproject/providers";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Web3Modal from "web3modal";
import { EthicalProvider, Provider } from "./provider";

const Web3ModalContext = createContext<{
  web3Modal: Web3Modal;
  setProvider(provider: EthicalProvider): void;
} | null>(null);

interface WalletProviderProps {
  name?: string;
  fallback: ReactNode;
  children: ReactNode;
}

export function WalletProvider({
  name = "default",
  fallback,
  children,
}: WalletProviderProps) {
  const [provider, setProvider] = useState<EthicalProvider | null>(null);

  const web3ModalContextValue = useMemo(
    () => ({
      web3Modal: new Web3Modal({ network: "ropsten" }),
      setProvider,
    }),
    []
  );

  const { web3Modal } = web3ModalContextValue;

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      web3Modal.connect().then((provider) => {
        setProvider(new Web3Provider(provider));
      });
    }
  }, [web3Modal]);

  if (!provider) {
    return (
      <Web3ModalContext.Provider value={web3ModalContextValue}>
        {fallback}
      </Web3ModalContext.Provider>
    );
  }

  return (
    <Provider name={name} provider={provider}>
      {children}
    </Provider>
  );
}

export function useConnectToWallet() {
  const web3ModalContext = useContext(Web3ModalContext);

  if (!web3ModalContext) {
    throw new Error(
      "The `useConnectToWallet` hook must be used inside of the `fallback` of the `WalletProvider`."
    );
  }

  const { web3Modal, setProvider } = web3ModalContext;

  return useCallback(() => {
    web3Modal.connect().then((provider) => {
      setProvider(new Web3Provider(provider));
    });
  }, [web3Modal]);
}
