import { Contract, ContractInterface } from "@ethersproject/contracts";
import { useCallback, useEffect, useReducer } from "react";
import { createAsset } from "./utils/use-asset";
import { EtherealProvider, useProvider } from "./provider";

const contractAsset = createAsset(
  async (
    provider: EtherealProvider,
    address: string,
    abi: ContractInterface
  ) => {
    // we need to check to see if this provider has a signer or not
    let signer;
    const accounts = await provider.listAccounts();
    if (accounts && accounts.length > 0) {
      signer = provider.getSigner();
    } else {
      signer = provider;
    }

    return new Contract(address, abi, signer);
  }
);

export function useContract(address: string, abi: ContractInterface) {
  const provider = useProvider();
  return contractAsset.read(provider, address, abi);
}

const readContractAsset = createAsset(
  async (contract: Contract, functionName: string, args: any[]) => {
    return contract[functionName](...args);
  }
);

export function useReadContract(
  contract: Contract,
  functionName: string,
  args: any[]
) {
  return readContractAsset.read(contract, functionName, args);
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

interface Actions<TData = any> {
  type: "loading" | "success" | "error" | "reset";
  payload?: TData;
  error?: Error;
}

const INITIAL_WRITE_STATE = {
  loading: false,
  data: null,
  error: null,
};

export function useWriteContract<TArgs extends any[] = any[], TData = any>(
  contract: Contract,
  functionName: string
): WriteContractHook<TArgs, TData> {
  const [state, dispatch] = useReducer(
    (
      _state: WriteContractState<TData>,
      action: Actions<TData>
    ): WriteContractState<TData> => {
      switch (action.type) {
        case "reset":
          return INITIAL_WRITE_STATE;
        case "loading":
          return { loading: true, data: null, error: null };
        case "error":
          return { loading: false, data: null, error: action.error! };
        case "success":
          return { loading: false, data: action.payload!, error: null };
        default:
          throw new Error(`Unknown action: ${action}`);
      }
    },
    INITIAL_WRITE_STATE
  );

  // If you provide a new contract or functionName, then we need to reset the state:
  useEffect(() => {
    return () => {
      dispatch({ type: "reset" });
    };
  }, [contract, functionName]);

  const write = useCallback(
    async (...args: TArgs) => {
      dispatch({ type: "loading" });
      try {
        const result = await contract[functionName](...args);
        dispatch({ type: "success", payload: result });
        return result as TData;
      } catch (e) {
        dispatch({ type: "error", error: e as Error });
        throw e;
      }
    },
    [contract, functionName]
  );

  return [write, state];
}
