import { ethers, BigNumber } from "ethers";
import { createAsset } from "use-asset";
import { useUserAddress } from "./accounts";

interface GetERC20TokenBalance {
  /** The smart contract for the token. Should be an ERC20 or ERC721 contract. */
  contract: ethers.Contract;
  /** The address. Defaults to the address of the connected wallet. */
  address?: string | null;
}

const tokenBalanceAsset = createAsset(
  async (contract: ethers.Contract, address: string | null) => {
    return (await contract.balanceOf(address)) as BigNumber;
  }
);

/**
 * Gets the current token balance for a specified address, or the currently-connected wallet.
 * This should be used on ERC20 or ERC721 contracts.
 */
export function useTokenBalance({ contract, address }: GetERC20TokenBalance) {
  const userAddress = useUserAddress();
  return tokenBalanceAsset.read(contract, address ?? userAddress);
}
