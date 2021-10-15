---
sidebar_position: 5
---

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

### Only getting blocks once

If you do not wish to have the UI re-render when the new blocks are received, you can use the `useBlockOnce` hook, which will only deliver the most recent block once.

```tsx
import { useBlockOnce } from "ethereal-react";

function BlockOnce() {
  const block = useBlockOnce();

  return <div>Current Block: {block.timestamp}</div>;
}
```

## Block notification

You can use the `useBlock` hook, along with a `useEffect` hook to have logic that runs when a block is added to the blockchain.

```tsx
import { useEffect } from "react";
import { useBlock } from "ethereal-react";

function BlockWatcher() {
  const block = useBlock();
  useEffect(() => {
    console.log("Block discovered");
  }, [block]);
}
```
