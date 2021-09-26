import { ethers } from "ethers";
import { requiredProviderAtom } from "./provider";
import { createAsyncFamily } from "./utils/createAsyncFamily";

interface ExternalContract {
  address: string;
  abi: ethers.ContractInterface;
}

export const useExternalContractLoader = createAsyncFamily(
  async ({ address, abi }: ExternalContract, get) => {
    const provider = get(requiredProviderAtom);

    // we need to check to see if this provider has a signer or not
    let signer;
    const accounts = await provider.listAccounts();
    if (accounts && accounts.length > 0) {
      signer = provider.getSigner();
    } else {
      signer = provider;
    }

    return new ethers.Contract(address, abi, signer);
  }
);

interface ContractRead {
  contract: ethers.Contract;
  function: string;
  args: any[];
}

export const useContractReader = createAsyncFamily(
  (contractRead: ContractRead) => {
    return contractRead.contract[contractRead.function](...contractRead.args);
  }
);
