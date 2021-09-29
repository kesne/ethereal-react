import { useEffect, useTransition } from "react";
import { ethers } from "ethers";
import { useProvider } from "./provider";
import { createAsset, useAsset } from "./utils/use-asset";

export function useOnBlock(listener: ethers.providers.Listener): void {
  const provider = useProvider();

  useEffect(() => {
    provider.on("block", listener);
    return () => {
      provider.off("block", listener);
    };
  }, [provider]);
}

const blockAsset = createAsset(
  async (provider: ethers.providers.Web3Provider) => {
    return provider.getBlock(await provider.getBlockNumber());
  }
);

function useSafeTransition() {
  if (useTransition) {
    return useTransition();
  }

  return [false, (cb: () => void) => cb()] as const;
}

// TODO: Probably tuple this because it automatically fetches new blocks under a
// transition, so it may be desirable for the UI to react to the `isInFlight`.
export function useBlock() {
  const provider = useProvider();
  const [block, refresh] = useAsset(blockAsset, provider);
  const [_isInFlight, startTransition] = useSafeTransition();

  useOnBlock(() => {
    // NOTE: We run this inside of a transition so that the previous UI can still
    // be shown while we fetch new block data.
    startTransition(() => {
      refresh();
    });
  });

  return block;
}
