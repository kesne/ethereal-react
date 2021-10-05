import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import { createAsset } from "./utils/use-asset";
import { useUserAddress } from "./accounts";

const tokenBalanceAsset = createAsset(
  async (contract: Contract, address: string | null) => {
    return (await contract.balanceOf(address)) as BigNumber;
  }
);

/**
 * Gets the current token balance for a specified address, or the currently-connected wallet.
 * This should be used on ERC20 or ERC721 contracts.
 *
 * @param contract The smart contract address for the token. Should be an ERC20 or ERC721 contract.
 * @param address The address. Defaults to the address of the connected wallet.
 */
export function useTokenBalance(contract: Contract, address?: string | null) {
  const userAddress = useUserAddress();
  return tokenBalanceAsset.read(contract, address ?? userAddress);
}
