import { Contract } from "@ethersproject/contracts";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { addressOrDefault } from "./accounts";
import { providerFunction } from "./registry";

export const readTokenBalance = providerFunction(
  async ({ provider }, contract: Contract, address?: string) => {
    return (await contract.balanceOf(
      await addressOrDefault(provider, address)
    )) as BigNumber;
  }
);

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

export interface TokenMetadata extends Record<string, JSONValue> {
  name: string;
  description: string;
  image: string;
}

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
export const readTokenMetadata = providerFunction(
  async (_, contract: Contract, token: BigNumberish) => {
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
export const readTokenMetadataByIndex = providerFunction(
  async (
    { provider },
    contract: Contract,
    index: BigNumberish,
    address?: string
  ) => {
    const userAddress = await addressOrDefault(provider, address);
    // TODO: Read contract:
    // const tokenID = useReadContract(
    //   contract as Contract,
    //   "tokenOfOwnerByIndex",
    //   await,
    //   index
    // );
    // return useTokenMetadata(contract, tokenID);
  }
);
