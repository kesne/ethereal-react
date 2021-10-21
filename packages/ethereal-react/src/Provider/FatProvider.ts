import { EtherealProvider } from "../provider";
import { ProviderCache } from "./cache";
import * as accountsFns from "./accounts";
import * as blocksFns from "./blocks";
import * as ensFns from "./ens";
import * as gasFns from "./gas";
import * as networkFns from "./network";
import * as tokensFns from "./tokens";
import * as transactionFns from "./transactions";

const PROVIDER_FNS = {
  ...accountsFns,
  ...blocksFns,
  ...ensFns,
  ...gasFns,
  ...networkFns,
  ...tokensFns,
  ...transactionFns,
} as const;

export type FatProvider = typeof PROVIDER_FNS & {
  ethers: EtherealProvider;
};

export function makeFatProvider(provider: EtherealProvider) {
  const cache = new ProviderCache();

  const fatProvider = Object.fromEntries(
    Object.entries(PROVIDER_FNS).map(([type, handler]) => {
      return [
        type,
        (...args: any[]) => {
          return cache.read(type, handler({ provider }, ...args));
        },
      ];
    })
  );

  return {
    ...fatProvider,
    ethers: provider,
  } as FatProvider;
}
