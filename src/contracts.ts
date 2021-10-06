import {
  Contract,
  ContractInterface,
  ContractTransaction,
} from "@ethersproject/contracts";
import { useCallback, useEffect, useReducer } from "react";
import { createAsset } from "./utils/use-asset";
import { EtherealProvider, useProvider } from "./provider";
import {
  Awaited,
  ContractFactory,
  ContractFunctions,
  ContractInstance,
} from "./types";

const contractAsset = createAsset(
  async (
    provider: EtherealProvider,
    address: string,
    typechainFactoryOrABI: ContractFactory<any> | ContractInterface
  ) => {
    // we need to check to see if this provider has a signer or not
    let signer;
    const accounts = await provider.listAccounts();
    if (accounts && accounts.length > 0) {
      signer = provider.getSigner();
    } else {
      signer = provider;
    }

    // Typechain factory:
    if (
      typeof typechainFactoryOrABI === "object" &&
      "connect" in typechainFactoryOrABI
    ) {
      return typechainFactoryOrABI.connect(address, signer);
    }

    // ABI:
    return new Contract(address, typechainFactoryOrABI, signer);
  }
);

export function useContract<T extends ContractInstance = Contract>(
  address: string,
  typechainFactoryOrABI: ContractInterface | ContractFactory<T>
): T {
  const provider = useProvider();

  return contractAsset.read(provider, address, typechainFactoryOrABI);
}

const readContractAsset = createAsset(
  async (contract: Contract, functionName: string, args: any[] = []) => {
    return contract[functionName](...args);
  }
);

export function useReadContract<
  TContract extends ContractInstance = any,
  TFunctionName extends string & keyof ContractFunctions<TContract> = string
>(
  contract: TContract | Contract,
  functionName: TFunctionName,
  ...args: Parameters<ContractFunctions<TContract>[TFunctionName]>
): Awaited<ReturnType<ContractFunctions<TContract>[TFunctionName]>> {
  return readContractAsset.read(contract as Contract, functionName, args);
}

interface Actions {
  type: "loading" | "success" | "error" | "reset";
  payload?: ContractTransaction;
  error?: Error;
}

interface WriteContractState {
  loading: boolean;
  data: ContractTransaction | null;
  error: Error | null;
}

const INITIAL_WRITE_STATE: WriteContractState = {
  loading: false,
  data: null,
  error: null,
};

export function useWriteContract<
  TContract extends ContractInstance = any,
  TFunctionName extends string & keyof ContractFunctions<TContract> = string
>(contract: TContract | Contract, functionName: TFunctionName) {
  const [state, dispatch] = useReducer(
    (_state: WriteContractState, action: Actions): WriteContractState => {
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
    async (
      ...args: Parameters<ContractFunctions<TContract>[TFunctionName]>
    ) => {
      dispatch({ type: "loading" });
      try {
        const result = await (contract as Contract)[functionName](...args);
        dispatch({ type: "success", payload: result });
        return result as ContractTransaction;
      } catch (e) {
        dispatch({ type: "error", error: e as Error });
        throw e;
      }
    },
    [contract, functionName]
  );

  return [write, state] as const;
}
