# Static Providers

If your project does not need to use the wallet, and instead can just use a JSON-RPC provider, then you can use the low-level `Provider` component.

For more details, [see the ethers documentation](https://docs.ethers.io/v5/api/providers/jsonrpc-provider/#JsonRpcProvider).

```tsx
import { ethers } from "ethers";
import { Provider } from "ethereal-react";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

function App() {
  return (
    <Provider provider={provider}>
      <ConnectedApp />
    </Provider>
  );
}
```
