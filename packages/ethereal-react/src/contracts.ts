import {
  Contract,
  ContractInterface,
  ContractTransaction,
} from "@ethersproject/contracts";
import { createAsset } from "./utils/use-asset";
import { EtherealProvider, useProvider } from "./provider";
import {
  Awaited,
  ContractFactory,
  ContractFunctions,
  ContractInstance,
} from "./types";
import { useMutation } from "./utils/use-mutation";

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
  typechainFactoryOrABI: ContractInterface | ContractFactory<T>,
  providerName?: string
): T {
  const provider = useProvider(providerName);

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

export function useWriteContract<
  TContract extends ContractInstance = any,
  TFunctionName extends string & keyof ContractFunctions<TContract> = string
>(contract: TContract | Contract, functionName: TFunctionName) {
  return useMutation(
    async (
      ...args: Parameters<ContractFunctions<TContract>[TFunctionName]>
    ) => {
      return (await (contract as Contract)[functionName](
        ...args
      )) as ContractTransaction;
    },
    [contract, functionName]
  );
}
