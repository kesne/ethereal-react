# Common ABIs

To help make developing your dApps easier, we include a set of pre-built [ABIs](https://docs.ethers.io/v5/api/utils/abi/) for common contracts. These ABIs can be used directly with the `useContract` hook, and easily extended.

## ERC-20

The ABI for [ERC-20 tokens](https://docs.openzeppelin.com/contracts/4.x/erc20) is provided.

```tsx
import { ERC20_ABI, useContract } from "ethereal-react";

const contract = useContract(address, ERC20_ABI);
```

## ERC-721

The ABI for [ERC-721 tokens](https://docs.openzeppelin.com/contracts/4.x/erc721) is provided, and includes common extensions for token metadata as well.

```tsx
import { ERC721_ABI, useContract } from "ethereal-react";

const contract = useContract(address, ERC721_ABI);
```

## Extending ABIs

The exported ABIs are arrays, and as such can be extended by spreading it into another array. For example, if you have an ERC721 token with a `mint` method, you could create the ABI as follows:

```tsx
import { ERC721_ABI } from "ethereal-react";

const MintableERC721 = [
  // Copy all of the ERC721 ABIs:
  ...ERC721_ABI,
  // Add the `mint()` function:
  "function mint()",
];
```
