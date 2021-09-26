import { atom } from "jotai";
import { useAtomValue } from "jotai/utils";
import { requiredProviderAtom } from "./provider";

const userAddressAtom = atom(async (get) => {
  const provider = get(requiredProviderAtom);
  return provider.getSigner().getAddress();
});

export function useUserAddress() {
  return useAtomValue(userAddressAtom);
}
