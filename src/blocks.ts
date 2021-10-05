import { useEffect, useTransition } from "react";
import { Listener } from "@ethersproject/providers";
import { useProvider, EthicalProvider } from "./provider";
import { createAsset, useAsset } from "./utils/use-asset";

export function useOnBlock(listener: Listener): void {
  const provider = useProvider();

  useEffect(() => {
    provider.on("block", listener);
    return () => {
      provider.off("block", listener);
    };
  }, [provider]);
}

const blockAsset = createAsset(async (provider: EthicalProvider) => {
  return provider.getBlock(await provider.getBlockNumber());
});

function useSafeTransition() {
  if (useTransition) {
    return useTransition();
  }

  return [false, (cb: () => void) => cb()] as const;
}

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
