---
sidebar_position: 3
---

# NFTs

NFTs, implemented as ERC-721 smart contracts, are a common use-case for ethereum applications. `ethereal-react` includes hooks to simplify working with them.

## Get Token Balance

:::note

This hook also supports ERC-20 token contracts.

:::

The `useTokenBalance` hook can be used to get the amount of tokens owned by a specific address for a contract. If no address is specified, the address of the currently connected wallet is used.

```tsx
import { useContract, useTokenBalance, ERC721_ABI } from "ethereal-react";

function NFTCount() {
  const contract = useContract(CONTRACT_ADDRESS, ERC721_ABI);
  const balance = useTokenBalance(contract);

  return <div>Current NFT balance: {balance.toString()}</div>;
}
```

## Get Token Metadata

:::note

This depends on the contract implementing the ERC-721 Metadata interface.

:::

NFTs often contain metadata, including a name, description, and image. Loading the metadata for a given token can be done with the `useTokenMetadata` hook, which calls the `tokenURI` on the contract, and automatically loads the resource that is returned.

```tsx
import { useContract, useTokenMetadata, ERC721_ABI } from "ethereal-react";

function NFTPreview({ id }: { id: number }) {
  const contract = useContract(CONTRACT_ADDRESS, ERC721_ABI);
  const metadata = useTokenMetadata(contract, id);

  return <img alt={metadata.name} src={metadata.image} />;
}
```

## Displaying all NFTs for a contract

:::note

This depends on the contract implementing the ERC-721 Enumerable interface.

:::

Combining the balance and metadata APIs, we can easily display all of the NFTs owned by a specific user. Because loading a given token from a specific index can be cumbersome, we also include a `useTokenMetadataByIndex` method, which will automatically resolve the token ID based on the index.

```tsx
import { Suspense } from "react";
import {
  useContract,
  useTokenMetadataByIndex,
  ERC721_ABI,
} from "ethereal-react";

function NFTPreview({ index }: { index: number }) {
  const contract = useContract(CONTRACT_ADDRESS, ERC721_ABI);
  const metadata = useTokenMetadataByIndex(contract, index);

  return <img alt={metadata.name} src={metadata.image} />;
}

function NFTList() {
  const contract = useContract(CONTRACT_ADDRESS, ERC721_ABI);
  const balance = useTokenBalance(TechStack);

  return Array.from({ length: balance }, (_, index) => (
    <Suspense fallback={<NFTLoading />}>
      <NFTPreview key={index} index={index} />
    </Suspense>
  ));
}
```

If you wish to coordinate the loading state for the tokens, you can use the [`SuspenseList`](https://reactjs.org/docs/concurrent-mode-reference.html#suspenselist) component.
