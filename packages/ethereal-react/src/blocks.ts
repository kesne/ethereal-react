import { useEffect, useTransition } from "react";
import { Listener } from "@ethersproject/providers";
import { useProvider, EtherealProvider } from "./provider";
import { createAsset, useAsset } from "./utils/use-asset";

/**
 * Listens to the network and invokes a callback whenever a new block is added to the network.
 * This hook will not suspend.
 *
 * @param listener A function that will be called every time a new block is added to the network.
 */
export function useOnBlock(listener: Listener): void {
  const provider = useProvider();

  useEffect(() => {
    provider.on("block", listener);
    return () => {
      provider.off("block", listener);
    };
  }, [provider]);
}

const blockAsset = createAsset(async (provider: EtherealProvider) => {
  return provider.getBlock(await provider.getBlockNumber());
});

function useSafeTransition() {
  if (useTransition) {
    return useTransition();
  }

  return [false, (cb: () => void) => cb()] as const;
}

// TODO: Should this automatically re-fetch, or should we just return the `refetch` method
// that lets users refetch if they want to?

/**
 * Loads the most recent block from the network.
 * As new blocks are added to the network, this hook will automatically load the new block data.
 * This hook will suspend while it loads.
 *
 * @returns A tuple with the `Block` object from `ethers`, and a boolean indicating if the block is currently being refetched.
 * @see https://docs.ethers.io/v5/api/providers/provider/#Provider-getBlock
 * @see https://docs.ethers.io/v5/api/providers/types/#providers-Block
 */
export function useBlock() {
  const provider = useProvider();
  const [block, refresh] = useAsset(blockAsset, provider);
  const [isInFlight, startTransition] = useSafeTransition();

  useOnBlock(() => {
    // NOTE: We run this inside of a transition so that the previous UI can still
    // be shown while we fetch new block data.
    startTransition(() => {
      refresh();
    });
  });

  return [block, isInFlight] as const;
}
