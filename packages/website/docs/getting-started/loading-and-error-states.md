---
sidebar_position: 4
---

# Loading and Error States

Loading states with `ethereal-react` are managed with [React Suspense](https://reactjs.org/docs/react-api.html#reactsuspense), and error states are managed with [Error Boundaries](https://reactjs.org/docs/error-boundaries.html).

## Loading States

When components use `ethereal-react` hooks that load async data, the component will suspend while the data is loaded. The hooks will directly return the data.

```tsx
import { Suspense } from "react";
import { useBalance } from "ethereal-react";

function User() {
  // If the balance has not yet been fetched, this will cause the component to suspend,
  // and the `fallback` in the parent `Suspense` component will be rendered.
  const balance = useBalance();

  return <div>User has {balance.toString()} eth</div>;
}

function UserLoading() {
  return <div>Loading user balance....</div>;
}

function App() {
  return (
    <Suspense fallback={<UserLoading />}>
      <User />
    </Suspense>
  );
}
```

For more details about how suspense and data fetching interop, you can read the [Suspense for Data Fetching](https://reactjs.org/docs/concurrent-mode-suspense.html) documentation.

## Error States

In the event that loading data results in an error, it will trigger an error that can be caught with an Error Boundary. We recommend using [`react-error-boundary`](https://www.npmjs.com/package/react-error-boundary) to make it easy to write error boundaries.

In general, the Error Boundary should exist above the `Suspense` component, as this will correctly catch errors that occurred while loading data.

```tsx
import { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<UserLoading />}>
        <User />
      </Suspense>
    </ErrorBoundary>
  );
}
```
