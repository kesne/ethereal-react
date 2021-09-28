import { useAtom } from "jotai";
import { atomWithDefault, useAtomValue } from "jotai/utils";
import { useEffect } from "react";
import { ethers } from "ethers";
import { requiredProviderAtom } from "./provider";

const blockAtom = atomWithDefault(
  async (get) => {
    const provider = get(requiredProviderAtom);
    return provider.getBlock(await provider.getBlockNumber());
  }
);

export function useOnBlock(listener: ethers.providers.Listener): void {
  const provider = useAtomValue(requiredProviderAtom);

  useEffect(() => {
    provider.on("block", listener);
    return () => {
      provider.off("block", listener);
    };
  }, [provider]);
}

export function useBlock() {
  const provider = useAtomValue(requiredProviderAtom);
  const [block, setBlock] = useAtom(blockAtom);

  useOnBlock(async (number) => {
    setBlock(await provider.getBlock(number));
  });

  return block;
}
