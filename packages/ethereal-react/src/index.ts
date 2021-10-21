export { useProvider, Provider } from "./provider";
export {
  useConnectToWallet,
  WalletProvider,
  useDisconnectWallet,
  useWeb3Modal,
  useWalletConnected,
} from "./wallet";
export { useContract, useReadContract, useWriteContract } from "./contracts";
export { ERC20_ABI, ERC165_ABI, ERC721_ABI } from "./abi";
export { useBlock } from "./blocks";
export { useSignMessage } from "./transactions";
export { useSwitchNetwork, RequireNetwork } from "./network";

// Re-export types from Ethers that are used frequently:
// TODO: Figure out if this is what we want to do long term, or if we're just fine
// with users importing ethers types when they need them.
export type { BigNumber } from "@ethersproject/bignumber";
export type { Contract, ContractTransaction } from "@ethersproject/contracts";
export type { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
