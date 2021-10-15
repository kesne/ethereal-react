import { ContractTransaction } from "@ethersproject/contracts";
import { useProvider } from "../dist";
import { createAsset } from "./utils/use-asset";
import { useMutation } from "./utils/use-mutation";

const transactionAsset = createAsset(
  async (transaction: ContractTransaction, confirmations: number) => {
    return transaction.wait(confirmations);
  }
);

/**
 * Waits for a contract transaction (from useWriteContract) to be confirmed on the blockchain.
 *
 * @param transaction
 * @param confirmations The number of confirmations to wait for. Defaults to 1.
 */
export function useWaitForTransaction(
  transaction: ContractTransaction,
  confirmations = 1
) {
  return transactionAsset.read(transaction, confirmations);
}

/**
 * Used to sign messages with their currently connected wallet.
 * Returns a mutation that can be called with a string, which is the message that should be signed.
 *
 * @see https://docs.ethers.io/v5/api/signer/#Signer-signMessage
 */
export function useSignMessage() {
  const provider = useProvider();
  return useMutation(async (message: string) => {
    return provider.getSigner().signMessage(message);
  }, []);
}
