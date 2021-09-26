import { atom, useAtom } from "jotai";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useAtomValue } from "jotai/utils";

export const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
});

const rawProviderAtom = atom<ethers.providers.Web3Provider | null>(null);

export const providerAtom = atom(
  (get) => get(rawProviderAtom),
  (_get, set, provider: any) =>
    set(rawProviderAtom, new ethers.providers.Web3Provider(provider))
);
providerAtom.onMount = (setAtom) => {
  if (web3Modal.cachedProvider) {
    web3Modal.connect().then((provider) => {
      setAtom(provider);
    });
  }
};

export const requiredProviderAtom = atom((get) => {
  const provider = get(providerAtom);

  if (!provider) {
    throw new Error("No provider found.");
  }

  return provider;
});

export function useProvider() {
  return useAtom(providerAtom);
}

export function useRequiredProvider() {
  return useAtomValue(requiredProviderAtom);
}
