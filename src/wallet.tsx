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
import Web3Modal, { ICoreOptions } from "web3modal";
import { EthicalProvider, Provider, ProvidersContext } from "./provider";

const Web3ModalContext = createContext<{
  web3Modal: Web3Modal;
  setProvider(provider: EthicalProvider | null): void;
} | null>(null);

interface WalletProviderProps extends Partial<ICoreOptions> {
  name?: string;
  fallback: ReactNode;
  children: ReactNode;
  // Allow passing a fully-configured web3modal instance:
  web3Modal?: Web3Modal;
}

export function useLogout() {
  const web3ModalContext = useContext(Web3ModalContext);

  if (!web3ModalContext) {
    throw new Error(
      "The `useLogout` hook must be used inside of the `WalletProvider`."
    );
  }

  return () => {
    web3ModalContext.setProvider(null);
    web3ModalContext.web3Modal.clearCachedProvider();
  };
}

export function WalletProvider({
  name = "default",
  fallback,
  children,
  web3Modal: providedWeb3Modal,
  ...web3ModalOptions
}: WalletProviderProps) {
  const [provider, setProvider] = useState<EthicalProvider | null>(null);

  const web3Modal = useMemo(() => {
    if (providedWeb3Modal) return providedWeb3Modal;
    return new Web3Modal(web3ModalOptions);
  }, [providedWeb3Modal]);

  useEffect(() => {
    // If we have a cached provider, and we wish to honor the cached provider,
    // then automatically just connect to that.
    if (web3Modal.cachedProvider && web3ModalOptions.cacheProvider) {
      web3Modal.connect().then((provider) => {
        setProvider(new Web3Provider(provider));
      });
    }
  }, [web3Modal]);

  return (
    <Web3ModalContext.Provider value={{ web3Modal, setProvider }}>
      {provider ? (
        <Provider name={name} provider={provider}>
          {children}
        </Provider>
      ) : (
        fallback
      )}
    </Web3ModalContext.Provider>
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
