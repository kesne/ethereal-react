# ethereal-react

## 0.4.0

### Minor Changes

- 2ba0c63: Add `noFallback` prop to the WalletProvider.
- 2ba0c63: Rename `useLogout` hook to `useDisconnectWallet`.

### Patch Changes

- 2ba0c63: Expose new `useWalletConnected` hook.
- b225b0e: Fix ENS resolution returning address
- 2ba0c63: Add new `loading` prop to the `WalletProvider` to allow a different node to be rendered while the wallet initializes.

## 0.3.2

### Patch Changes

- a283553: Fix bug where ESM modules failed on React < 18, and fix SSR rendering bug.

## 0.3.1

### Patch Changes

- 2a74468: Add `useSignMessage` hook.
- 7762be6: Add `useNetwork` hook to retrieve network information.
- 6eab9a8: Add `useSwitchNetwork` hook to prompt network wallet switching, and `RequireNetwork` to require the app to be connected to a specific network.

## 0.3.0

### Minor Changes

- 1c987f7: Remove `useOnBlock` hook. Add `useBlockOnce` hook.
- 9e443da: Add `useGasPrice` hook.

### Patch Changes

- cfbcb9a: Automatically support changing the connected wallet once it has been connected.

## 0.2.0

### Minor Changes

- c782829: Add additional NFT utilities

## 0.1.0

### Minor Changes

- 9457d67: Initial release of Ethereal React
