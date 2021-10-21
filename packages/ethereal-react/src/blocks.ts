import { useEffect } from "react";
import { useProvider, EtherealProvider } from "./provider";
import { createAsset, useAsset } from "./utils/use-asset";
import { useSafeTransition } from "./utils/use-transition";

const blockAsset = createAsset(async (provider: EtherealProvider) => {
  return provider.getBlock(await provider.getBlockNumber());
});

/**
 * Loads the most recent block from the network.
 * As new blocks are added to the network, this hook will automatically load the new block data.
 * This hook will suspend while it loads.
 *
 * @returns A tuple with the `Block` object from `ethers`, and a boolean indicating if the block is currently being refetched.
 * @see https://docs.ethers.io/v5/api/providers/provider/#Provider-getBlock
 * @see https://docs.ethers.io/v5/api/providers/types/#providers-Block
 */
export function useBlock(providerName?: string) {
  const provider = useProvider(providerName);
  const [block, refresh] = useAsset(blockAsset, provider);
  const [isInFlight, startTransition] = useSafeTransition();

  useEffect(() => {
    const onBlock = () => {
      // NOTE: We run this inside of a transition so that the previous UI can still
      // be shown while we fetch new block data.
      startTransition(() => {
        refresh();
      });
    };

    provider.on("block", onBlock);
    return () => {
      provider.off("block", onBlock);
    };
  }, [provider]);

  return [block, isInFlight] as const;
}

/**
 * Loads the most recent block from the network. This hook only loads the block once,
 * and will not automatically load new blocks.
 * This hook will suspend while it loads.
 *
 * @returns A `Block` object from `ethers`.
 */
export function useBlockOnce(providerName?: string) {
  const provider = useProvider(providerName);
  const block = blockAsset.read(provider);
  return block;
}
