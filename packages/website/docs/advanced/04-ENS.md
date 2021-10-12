# Resolving ENS

[ENS](https://ens.domains/) resolution is built-in, with both forward and backwards resolution supported.

The [ethers](https://github.com/ethers-io/ethers.js/) package also include built-in support for ENS names. Thanks to that, any address passed to `ethereal-react` will also support automatic ENS resolution.

## Resolving an ENS name to an address

The `useResolveENS` can be used to resolve an ENS name to an address. If the ENS name is not found, then it will return null.

```tsx
import { useResolveENS } from "ethereal-react";

function Address() {
  const address = useResolveENS("vapejuicejordan.eth");

  return <div>{address}</div>;
}
```

## Resolving an address to an ENS name

```tsx
import { useENSForAddress } from "ethereal-react";

function Name() {
  const address = "0x0000000000000000000000000000000000000000";
  const name = useENSForAddress(address);

  return <div>{name}</div>;
}
```

If the wallet is connected, then you can omit the address, and it will default to using the address of the currently-connected wallet instead:

```tsx
import { useENSForAddress } from "ethereal-react";

function CurrentUser() {
  const name = useENSForAddress();

  return <div>{name}</div>;
}
```
