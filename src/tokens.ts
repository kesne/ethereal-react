import { ethers, BigNumber } from "ethers";
import { userAddressAtom } from "./accounts";
import { createAsyncFamily } from "./utils/createAsyncFamily";

interface GetERC20TokenBalance {
  /** The smart contract for the token. Should be an ERC20 or ERC721 contract. */
  contract: ethers.Contract;
  /** The address. Defaults to the address of the connected wallet. */
  address?: string | null;
}

/**
 * Gets the current token balance for a specified address, or the currently-connected wallet.
 * This should be used on ERC20 or ERC721 contracts.
 */
export const useTokenBalance = createAsyncFamily(
  async (params: GetERC20TokenBalance, get) => {
    const address = params.address ?? get(userAddressAtom);
    return (await params.contract.balanceOf(address)) as BigNumber;
  }
);
