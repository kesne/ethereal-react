import { useEffect } from "react";
import { ethers } from "ethers";
import { useProvider } from "./provider";
import { createAsset } from "use-asset";

export function useOnBlock(listener: ethers.providers.Listener): void {
  const provider = useProvider();

  useEffect(() => {
    provider.on("block", listener);
    return () => {
      provider.off("block", listener);
    };
  }, [provider]);
}

const blockAsset = createAsset(async (provider) => {
  return provider.getBlock(await provider.getBlockNumber());
});

export function useBlock() {
  const provider = useProvider();
  const block = blockAsset.read(provider);

  useOnBlock(async (number) => {
    blockAsset.clear(provider);
    // setBlock(await provider.getBlock(number));
  });

  return block;
}
