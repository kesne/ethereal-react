import { ethers } from "ethers";
import { createAsset } from "use-asset";

interface WaitForTransaction {
  transaction: ethers.ContractTransaction;
  /** The number of confirmations to wait for. Defaults to 1. */
  confirmations?: number;
}

const transactionAsset = createAsset(
  async ({ transaction, confirmations }: WaitForTransaction) => {
    return transaction.wait(confirmations ?? 1);
  }
);

export function useWaitForTransaction(params: WaitForTransaction) {
  return transactionAsset.read(params);
}
