import { ContractTransaction } from "@ethersproject/contracts";
import { createAsset } from "./utils/use-asset";

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
