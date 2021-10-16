import type { EventEmitter } from "events";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
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
import { Provider } from "./provider";
import { safeBatchedUpdates } from "./utils/batch-updates";
import { useMutation } from "./utils/use-mutation";

const Web3ModalContext = createContext<{
  web3Modal: Web3Modal | null;
  updateProvider(provider: ExternalProvider | null): void;
} | null>(null);

interface WalletProviderProps extends Partial<ICoreOptions> {
  name?: string;
  fallback: ReactNode;
  children: ReactNode;
  // Allow passing a fully-configured web3modal instance:
  web3Modal?: Web3Modal;
}

export function useWeb3Modal() {
  const web3ModalContext = useContext(Web3ModalContext);

  if (!web3ModalContext) {
    throw new Error(
      "The `useWeb3Modal` hook must be used inside of the `WalletProvider`."
    );
  }

  return web3ModalContext.web3Modal;
}

export function useLogout() {
  const web3ModalContext = useContext(Web3ModalContext);

  if (!web3ModalContext) {
    throw new Error(
      "The `useLogout` hook must be used inside of the `WalletProvider`."
    );
  }

  return () => {
    web3ModalContext.updateProvider(null);
    web3ModalContext.web3Modal?.clearCachedProvider();
  };
}

export function WalletProvider(props: WalletProviderProps) {
  const {
    name = "default",
    fallback,
    children,
    web3Modal: providedWeb3Modal,
    ...web3ModalOptions
  } = props;

  const [externalProvider, setExternalProvider] =
    useState<ExternalProvider | null>(null);

  const [provider, setProvider] = useState<Web3Provider | null>(null);

  const web3Modal = useMemo(() => {
    // To support SSR environments, we just create this as null:
    if (typeof window === "undefined") return null;

    if (providedWeb3Modal) return providedWeb3Modal;

    return new Web3Modal(web3ModalOptions);
  }, [providedWeb3Modal]);

  const updateProvider = useCallback((provider: ExternalProvider) => {
    safeBatchedUpdates(() => {
      setExternalProvider(provider);
      setProvider(new Web3Provider(provider));
    });
  }, []);

  useEffect(() => {
    if (!web3Modal) return;

    // If we have a cached provider, and we wish to honor the cached provider,
    // then automatically just connect to that.
    if (web3Modal.cachedProvider && web3ModalOptions.cacheProvider) {
      web3Modal.connect().then(updateProvider);
    }
  }, [web3Modal]);

  // Listen to changes on the provider so that we can automatically reflect account
  // changes in the UI.
  useEffect(() => {
    if (!provider || !externalProvider) return;

    const events = [
      ["chainChanged", () => setProvider(new Web3Provider(externalProvider))],
      [
        "accountsChanged",
        () => setProvider(new Web3Provider(externalProvider)),
      ],
      ["disconnect", () => setProvider(null)],
    ] as const;

    try {
      events.forEach(([key, fn]) => {
        (externalProvider as EventEmitter).on(key, fn);
      });
    } catch (e) {
      console.warn(
        "Unable to attach event listener to the connected wallet.",
        e
      );
    }

    return () => {
      try {
        events.forEach(([key, fn]) => {
          (externalProvider as EventEmitter).removeListener(key, fn);
        });
      } catch (e) {
        console.warn(
          "Unable to remove event listener to the connected wallet.",
          e
        );
      }
    };
  }, [provider, externalProvider]);

  return (
    <Web3ModalContext.Provider value={{ web3Modal, updateProvider }}>
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

  const { web3Modal, updateProvider } = web3ModalContext;

  return useMutation(async () => {
    if (!web3Modal) {
      throw new Error(
        "Attempting to connect, but no `web3modal` instance was found."
      );
    }
    return web3Modal.connect().then(updateProvider);
  }, [web3Modal]);
}
