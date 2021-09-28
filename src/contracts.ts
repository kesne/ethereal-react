import { ethers } from "ethers";
import { useCallback, useReducer } from "react";
import { createAsset } from "use-asset";
import { useProvider } from "./provider";

interface Contract {
  address: string;
  abi: ethers.ContractInterface;
}

const contractAsset = createAsset(
  async (
    provider: ethers.providers.Web3Provider,
    { address, abi }: Contract
  ) => {
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

export function useContract(contract: Contract) {
  const provider = useProvider();
  return contractAsset.read(provider, contract);
}

interface ReadContract {
  contract: ethers.Contract;
  function: string;
  args: any[];
}

const readContractAsset = createAsset(async (contractRead: ReadContract) => {
  return contractRead.contract[contractRead.function](...contractRead.args);
});

export function useReadContract(contractRead: ReadContract) {
  return readContractAsset.read(contractRead);
}

interface WriteContract {
  contract: ethers.Contract;
  function: string;
}

interface WriteContractState<TData = any> {
  loading: boolean;
  data: TData | null;
  error: Error | null;
}

type WriteContractHook<TArgs extends any[] = any[], TData = any> = [
  write: (...args: TArgs) => Promise<TData>,
  state: WriteContractState<TData>
];

type Actions<TData = any> =
  | {
      type: "loading";
    }
  | {
      type: "success";
      payload: TData;
    }
  | {
      type: "error";
      payload: Error;
    };

export function useWriteContract<TArgs extends any[] = any[], TData = any>(
  writeContract: WriteContract
): WriteContractHook<TArgs, TData> {
  const [state, dispatch] = useReducer(
    (_state: WriteContractState<TData>, action: Actions<TData>) => {
      switch (action.type) {
        case "loading":
          return { loading: true, data: null, error: null };
        case "error":
          return { loading: false, data: null, error: action.payload };
        case "success":
          return { loading: false, data: action.payload, error: null };
        default:
          throw new Error(`Unknown action: ${action}`);
      }
    },
    {
      loading: false,
      data: null,
      error: null,
    }
  );

  const write = useCallback(
    async (...args: TArgs) => {
      dispatch({ type: "loading" });
      try {
        const result = await writeContract.contract[writeContract.function](
          ...args
        );
        dispatch({ type: "success", payload: result });
        return result as TData;
      } catch (e) {
        dispatch({ type: "error", payload: e as Error });
        throw e;
      }
    },
    [writeContract.contract, writeContract.function]
  );

  return [write, state];
}
