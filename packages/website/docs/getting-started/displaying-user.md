---
sidebar_position: 2
---

# Displaying User Information

Once the user has connected their wallet, you can load the current address of the connected user with the `useUserAddress` hook. The `useBalance` hook can be used to load the balance of the current user as well.

```tsx
import { Suspense } from "react";
import { useUserAddress, useBalance } from "ethereal-react";

function User() {
  const address = useUserAddress();
  const balance = useBalance();

  return (
    <div>
      Address {address} currently has balance {balance.toString()}.
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <User />
    </Suspense>
  );
}
```

In order to display a loading UI while the data is loaded, we take advantage of `Suspense`, which will render the `fallback` while the data is loaded. You can learn more about this in the "[Loading and Error States](./loading-and-error-states.md)" docs.
