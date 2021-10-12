---
---

# Contracts

[Smart Contracts](https://ethereum.org/en/developers/docs/smart-contracts/) are what power most dApps, and it's common that you'll need to read data from them, in addition to write data to them using transactions.

For more details, we recommend reading the [ethers documentation on contracts](https://docs.ethers.io/v5/getting-started/#getting-started--contracts).

## Defining a contract

Defining a contract requires two pieces of information:

- The address that the contract is deployed to. Note that this address may change based on the [network](https://ethereum.org/en/developers/docs/networks/) that you are connected to.
- The ABI of the contract.
  - This can be defined as an output when running the [Solidity compiler](https://docs.soliditylang.org/en/v0.5.1/index.html).
  - If you are using Hardhat, you can use the [ABI exporter plugin](https://hardhat.org/plugins/hardhat-abi-exporter.html) to generate this.

```tsx
import { useContract } from "ethereal-react";

const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
const CONTRACT_ABI = [
  "function setGreeting(string memory greeting)",
  "function greeting() view returns (string memory)",
];

const contract = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);
```

We include [common ABIs](../advanced/02-ABIs.md) for well-known contract types (ERC-20 and ERC-721 tokens).

For full TypeScript support, you can also use a generated TypeChain factory in place of a contract ABI. For more details, [you can read the TypeChain docs](../advanced/01-typechain.md).

## Reading data from contracts

You can read data easily from any contract that has a `view` function on it. To do so, use the `useReadContract` hook.

The hook takes the following arguments:

- The contract, loaded via the `useContract` hook.
- The function name on the contract to invoke. Should be a `view` function.

Any additional arguments will be passed to the contract function.

```tsx
import { useContract, useReadContract } from "ethereal-react";

function Greeting() {
  const contract = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);
  const greeting = useReadContract(contract, "greeting");

  return <div>Current greeting: {greeting}</div>;
}
```

## Writing data to contracts (transactions)

You can write data to any contract by using the `useWriteContract` hook. The hook takes the following arguments:

- The contract, loaded via the `useContract` hook.
- The function name on the contract to invoke.

The hook returns a tuple containg the following elements:

- A mutation function, which can be called to call the contract. This will prompt the user to initiate a transaction on Ethereum. Any arguments passed to this function will be passed to the contract function.
- An object containing the current status of the mutation. This contains a `loading` boolean, an `error` property, and a `data` payload for when the transaction is completed.

```tsx
import { useContract, useWriteContract } from "ethereal-react";

function UpdateGreeting() {
  const contract = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);
  const [setGreeting, { loading }] = useWriteContract(contract, "setGreeting");

  return (
    <button onClick={() => setGreeting("Hello, docs!")}>Update Greeting</button>
  );
}
```

### Waiting for transactions

The `useWriteContract` hook initiates a transaction, but it does not wait for it to be confirmed to the blockchain. If you wish to wait for the transaction to be confirmed, you can use the `useWaitForTransaction` hook. This will cause the component to suspend while the transaction is confirmed. You can also specify the number of confirmations that you wish to wait for.

```tsx
import { Suspense } from "react";
import {
  useContract,
  useReadContract,
  useWriteContract,
  useWaitForTransaction,
} from "ethereal-react";

function Greeting({ transaction }) {
  // Wait for the transaction to be confirmed:
  useWaitForTransaction(transaction);
  const contract = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);
  const greeting = useReadContract(contract, "greeting");
  return <div>Current greeting: {greeting}</div>;
}

function UpdateGreeting() {
  const contract = useContract(CONTRACT_ADDRESS, CONTRACT_ABI);
  const [setGreeting, { loading, data }] = useWriteContract(
    contract,
    "setGreeting"
  );

  // Once this transaction has started, render the updated greeting:
  if (data) {
    return (
      <Suspense
        fallback={<div>Waiting for transaction to be confirmed...</div>}
      >
        <Greeting transaction={data} />
      </Suspense>
    );
  }

  return (
    <button onClick={() => setGreeting("Hello, docs!")}>Update Greeting</button>
  );
}
```
