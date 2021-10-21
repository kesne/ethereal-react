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

const WalletContext = createContext<{
  web3Modal: Web3Modal | null;
  provider: Web3Provider | null;
  updateProvider(provider: ExternalProvider | null): void;
} | null>(null);

function useWalletContext(hookName: string) {
  const walletContext = useContext(WalletContext);

  if (!walletContext) {
    throw new Error(
      `The "${hookName}" hook must be used inside of a "WalletProvider".`
    );
  }

  return walletContext;
}

export function useWeb3Modal() {
  const { web3Modal } = useWalletContext("useWeb3Modal");
  return web3Modal;
}

export function useDisconnectWallet() {
  const walletContext = useWalletContext("useDisconnectWallet");

  return () => {
    walletContext.updateProvider(null);
    walletContext.web3Modal?.clearCachedProvider();
  };
}

export function useWalletConnected() {
  const walletContext = useWalletContext("useWalletConnected");
  return !!walletContext.provider;
}

interface WalletProviderProps extends Partial<ICoreOptions> {
  name?: string;
  /**
   * The fallback will be rendered when the wallet
   * If you wish to instead always render the `children`, even when the wallet
   * is connected, then you can use the `noFallback` prop, and omit this prop.
   */
  fallback?: ReactNode;
  /**
   * If you would like to
   */
  noFallback?: boolean;
  /**
   * While the wallet connection is initializing, you can optionally display
   * a different node than the `fallback` node. This can prevent the user from
   * seeing a flash of the fallback node when they have a cached wallet connected.
   * In the future, this may instead be powered by suspense.
   */
  loading?: ReactNode;
  /**
   * The React elements that will be rendered when the wallet is connected.
   * If `noFallback` is provided, then this will always be rendered.
   */
  children: ReactNode;
  /**
   * A fully-configured instance of Web3Modal.
   */
  web3Modal?: Web3Modal;
}

export function WalletProvider(props: WalletProviderProps) {
  const {
    name = "default",
    fallback,
    noFallback,
    loading,
    children,
    web3Modal: providedWeb3Modal,
    ...web3ModalOptions
  } = props;

  const [externalProvider, setExternalProvider] =
    useState<ExternalProvider | null>(null);

  const [provider, setProvider] = useState<Web3Provider | null>(null);

  const [initialized, setInitialized] = useState(false);

  const web3Modal = useMemo(() => {
    // To support SSR environments, we just create this as null:
    if (typeof window === "undefined") return null;

    return providedWeb3Modal || new Web3Modal(web3ModalOptions);
  }, [providedWeb3Modal]);

  const updateProvider = useCallback((provider: ExternalProvider) => {
    safeBatchedUpdates(() => {
      setExternalProvider(provider);
      setProvider(provider ? new Web3Provider(provider) : null);
    });
  }, []);

  useEffect(() => {
    if (!web3Modal) return;

    // If we have a cached provider, and we wish to honor the cached provider,
    // then automatically just connect to that.
    if (web3Modal.cachedProvider && web3ModalOptions.cacheProvider) {
      web3Modal.connect().then((provider) => {
        setInitialized(true);
        updateProvider(provider);
      });
    } else {
      setInitialized(true);
    }
  }, [web3Modal]);

  // Listen to changes on the provider so that we can automatically reflect account
  // changes in the UI.
  useEffect(() => {
    if (!provider || !externalProvider) return;

    const events = [
      {
        name: "chainChanged",
        handle: () => setProvider(new Web3Provider(externalProvider)),
      },
      {
        name: "accountsChanged",
        handle: () => setProvider(new Web3Provider(externalProvider)),
      },
      {
        name: "disconnect",
        handle: () => setProvider(null),
      },
    ] as const;

    try {
      events.forEach(({ name, handle }) => {
        (externalProvider as EventEmitter).on(name, handle);
      });
    } catch (e) {
      console.warn(
        "Unable to attach event listener to the connected wallet.",
        e
      );
    }

    return () => {
      try {
        events.forEach(({ name, handle }) => {
          (externalProvider as EventEmitter).removeListener(name, handle);
        });
      } catch (e) {
        console.warn(
          "Unable to remove event listener to the connected wallet.",
          e
        );
      }
    };
  }, [provider, externalProvider]);

  if (fallback && noFallback) {
    throw new Error(
      "You cannot specify both `noFallback` and a `fallback` prop."
    );
  }

  if (!fallback && !noFallback) {
    throw new Error(
      "No fallback prop was found. Either specify a fallback for when the wallet is not connected, or use the `noFallback` prop to disable the fallback entirely"
    );
  }

  // The fallback node is either the `fallback` prop, or the `loading` prop.
  const fallbackNode = initialized
    ? fallback
    : typeof loading === "undefined"
    ? fallback
    : loading;

  return (
    <WalletContext.Provider value={{ web3Modal, provider, updateProvider }}>
      {provider ? (
        <Provider name={name} provider={provider}>
          {children}
        </Provider>
      ) : noFallback ? (
        children
      ) : (
        fallbackNode
      )}
    </WalletContext.Provider>
  );
}

export function useConnectToWallet() {
  const { web3Modal, updateProvider } = useWalletContext("useConnectToWallet");

  return useMutation(async () => {
    if (!web3Modal) {
      throw new Error(
        "Attempting to connect, but no `web3modal` instance was found."
      );
    }

    return web3Modal.connect().then(updateProvider);
  }, [web3Modal]);
}
