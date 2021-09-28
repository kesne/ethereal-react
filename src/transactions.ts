import { ethers } from "ethers";
import { createAsyncFamily } from "./utils/createAsyncFamily";

interface WaitForTransaction {
  confirmations?: number;
  transaction: ethers.ContractTransaction;
}

export const useWaitForTransaction = createAsyncFamily(
  async (params: WaitForTransaction) => {
    return params.transaction.wait(params.confirmations ?? 1);
  }
);
