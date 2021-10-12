# Blocks

## Reading the current block

The `useBlock` hook can be used to read information about the latest block in the network. This returns a tuple containing:

- An [ethers block object](https://docs.ethers.io/v5/api/providers/types/#providers-Block). This will automatically update as new blocks are added.
- A boolean that indicates if a new block has been added, and its metadata is currently being fetched. This boolean will only return `true` for versions React that support concurrent rendering (React 18+)

```tsx
import { useBlock } from "ethereal-react";

function BlockWatcher() {
  const [block, isInFlight] = useBlock();

  return (
    <div>
      Current Block: {block.timestamp}
      Block refetching: {isInFlight}
    </div>
  );
}
```

## Block notification

You can use the `useOnBlock` hook to be notified of whenever new blocks are added to the blockchain.

```tsx
import { useOnBlock } from "ethereal-react";

function BlockWatcher() {
  useOnBlock(() => {
    console.log("A new block was added.");
  });
}
```
