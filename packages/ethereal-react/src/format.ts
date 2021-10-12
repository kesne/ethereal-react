import { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";

/**
 * Formats a `value` of wei into another unit. This hook does not suspend.
 *
 * @param value
 * @param unit The desired unit to format the wei into.
 * @returns A string representation of the `value` formatted based on the `unit`.
 * @see https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatUnits
 */
export function useFormatWei(
  value: BigNumberish,
  unit: "wei" | "gwei" | "ether"
) {
  return formatUnits(value, unit);
}
