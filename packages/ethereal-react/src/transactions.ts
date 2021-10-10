import { ContractTransaction } from '@ethersproject/contracts';
import { createAsset } from "./utils/use-asset";

interface WaitForTransaction {
  transaction: ContractTransaction;
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
