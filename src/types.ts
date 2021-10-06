import { Signer } from "@ethersproject/abstract-signer";
import { Provider } from "@ethersproject/providers";

export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

export interface ContractFactory<T extends ContractInstance> {
  connect(address: string, signerOrProvider: Signer | Provider): T;
}

export interface ContractInstance<
  TFunctions extends Record<string, (...args: any[]) => any> = any
> {
  // Note: We use 'callStatic' here because the types are easier to work with
  // than their `functions` counterparts:
  callStatic: TFunctions;
}

export type ContractFunctions<TContract extends ContractInstance> =
  TContract extends ContractInstance<infer TFunctions> ? TFunctions : never;
