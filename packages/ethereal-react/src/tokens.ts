import { Contract } from "@ethersproject/contracts";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { createAsset } from "./utils/use-asset";
import { useAddressOrDefault } from "./accounts";
import { ContractInstance } from "./types";
import { useReadContract } from "./contracts";

const tokenBalanceAsset = createAsset(
  async (contract: Contract, address: string | null) => {
    return (await contract.balanceOf(address)) as BigNumber;
  }
);

/**
 * Gets the current token balance for a specified address, or the currently-connected wallet.
 * This should be used on ERC20 or ERC721 contracts that implement the `balanceOf(address)` function.
 * This hook will suspend while it loads.
 *
 * @param contract The smart contract address for the token. Should be an ERC20 or ERC721 contract.
 * @param address The address. Defaults to the address of the connected wallet.
 */
export function useTokenBalance<
  T extends
    | ContractInstance<{
        balanceOf(address: string): Promise<BigNumber>;
      }>
    | Contract = Contract
>(contract: T, address?: string) {
  const userAddress = useAddressOrDefault(address);
  return tokenBalanceAsset.read(contract as Contract, address ?? userAddress);
}

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

interface TokenMetadata extends Record<string, JSONValue> {
  name: string;
  description: string;
  image: string;
}

const tokenMetadataAsset = createAsset(
  async (contract: Contract, token: BigNumberish) => {
    let uri = await contract.tokenURI(token);
    if (uri.startsWith("ipns://")) {
      // Support IPNS:
      uri = `https://gateway.ipfs.io/ipns/${uri.slice(7)}`;
    } else if (uri.startsWith("ipfs://")) {
      // Handle IPFS:
      uri = `https://ipfs.io/ipfs/${uri.slice(7)}`;
    }
    const res = await fetch(uri);
    const metadata = await res.json();
    return metadata as TokenMetadata;
  }
);

/**
 * Loads the token metadata for a specific token ID.
 * This loads the metadata by calling `tokenURI` on the contract.
 * Token metadata should support all browser-loadable URIs. IPFS/IPNS URIs are loaded through the https://ipfs.io gateway.
 * This hook will suspend while it loads.
 *
 * @param contract An ERC721 contract.
 * @param token The token ID to load the metadata for.
 * @returns A JSON object loaded from the `tokenURI` method of the contract.
 */
export function useTokenMetadata<
  T extends
    | ContractInstance<{
        tokenURI(index: BigNumberish): Promise<string>;
      }>
    | Contract = Contract
>(contract: T, token: BigNumberish) {
  return tokenMetadataAsset.read(contract as Contract, token);
}

/**
 * Loads the token metadata for a specific token at a given index, for a given owner.
 * This loads the token ID for the given index using the `tokenOfOwnerByIndex` method.
 * The metadata is loaded using the {@link useTokenMetadata} hook.
 * This hook will suspend while it loads.
 *
 * @param contract An ERC721 contract.
 * @param index The index of the token, for the specific address.
 * @param address The owner address that will be used to load the token ID. Defaults to the currently connected wallet address.
 * @returns A JSON object loaded from the `tokenURI` method of the contract.
 */
export function useTokenMetadataByIndex<
  T extends
    | ContractInstance<{
        tokenURI(token: BigNumberish): Promise<string>;
        tokenOfOwnerByIndex(
          address: string,
          index: BigNumberish
        ): Promise<BigNumber>;
      }>
    | Contract = Contract
>(contract: T, index: BigNumberish, address?: string) {
  const userAddress = useAddressOrDefault(address);
  const tokenID = useReadContract(
    contract as Contract,
    "tokenOfOwnerByIndex",
    userAddress,
    index
  );
  return useTokenMetadata(contract, tokenID);
}
