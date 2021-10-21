import { ContractTransaction } from "@ethersproject/contracts";
import { providerFunction } from "./registry";

/**
 * Waits for a contract transaction (from useWriteContract) to be confirmed on the blockchain.
 *
 * @param transaction
 * @param confirmations The number of confirmations to wait for. Defaults to 1.
 */
export const readWaitForTransaction = providerFunction(
  (_, transaction: ContractTransaction, confirmations = 1) => {
    return transaction.wait(confirmations);
  }
);
