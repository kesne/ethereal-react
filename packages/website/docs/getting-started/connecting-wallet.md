---
sidebar_position: 1
---

# Connecting to Wallets

Connecting your dApp to your users wallets is simple, and powered by [Web3Modal](https://github.com/Web3Modal/web3modal).

## Creating the Wallet Provider

To allow users to connect their wallet, you wrap your application in a `WalletProvider` component. This component will manage the

The `children` passed to this component will _not be rendered_ until the wallet is connected. When the wallet is not connected, the `fallback` prop will be used instead. This prop should be used to render a prompt for the user to connect their wallet to your application.

```tsx
import { WalletProvider } from "ethereal-react";

function App() {
  return (
    <WalletProvider fallback={<ConnectButton />} cacheProvider>
      <div>Your wallet is connected!</div>
    </WalletProvider>
  );
}
```

In this example, we use the `cacheProvider` property, which will automatically cache the users last connected wallet, and will connect to it by default when your application is opened.

## Connect to Wallet Button

```tsx
import { useConnectToWallet, WalletProvider } from "ethereal-react";

function ConnectButton() {
  const [connect, { loading, error }] = useConnectToWallet();

  return (
    <div>
      {error && <div>Error connecting to wallet: {error.message}</div>}

      <button onClick={connect} disabled={loading}>
        Connect to Wallet
      </button>
    </div>
  );
}
```

## Pre-Configured Web3Modal Instance

The `WalletProvider` component supports all props that can be passed to the [`Web3Modal`](https://github.com/Web3Modal/web3modal) constructor. If you already have a `Web3Modal` instance, you can also use that directly via the `web3Modal` prop, rather than having the `WalletProvider` construct one for you.

```tsx
import { Web3Modal } from "web3modal";

const web3Modal = new Web3Modal({
  // Options...
});

function App() {
  return (
    <WalletProvider web3Modal={web3Modal} fallback={<ConnectButton />}>
      <ConnectedApp />
    </WalletProvider>
  );
}
```

## Disconnect the Wallet (logging out)

When your user has connected their wallet to your app, you may want to allow them to disconnect their wallet. This is done through the `useDisconnectWallet` hook. This hook must be rendered within the `WalletProvider` component.

```tsx
import { useDisconnectWallet } from "ethereal-react";

function DisconnectButton() {
  const disconnect = useDisconnectWallet();
  return <button onClick={disconnect}>Disconnect</button>;
}
```

When the disconnect button is clicked, the `fallback` of the `WalletProvider` will be rendered. If the `cachedProvider` property is set, then the cached providers will be removed as well.
