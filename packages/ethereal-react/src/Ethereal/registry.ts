import { EtherealProvider } from "../provider";
import { Awaited } from "../types";

export function providerFunction<TArgs extends any[], TResult>(
  fn: (state: { provider: EtherealProvider }, ...args: [...TArgs]) => TResult
): (...args: TArgs) => Awaited<TResult> {
  return fn as any;
}
