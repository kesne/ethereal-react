import { useCallback, useEffect, useState } from "react";
import { safeBatchedUpdates } from "./batch-updates";

export function useMutation<TArgs extends any[], TData>(
  mutation: (...args: TArgs) => Promise<TData>,
  deps: any[]
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | null>(null);

  // If the deps change, we reset the state entirely:
  useEffect(() => {
    return () => {
      safeBatchedUpdates(() => {
        setLoading(false);
        setError(null);
        setData(null);
      });
    };
  }, deps);

  const mutate = useCallback(async (...args: TArgs) => {
    safeBatchedUpdates(() => {
      setLoading(true);
      setData(null);
      setError(null);
    });

    try {
      const result = await mutation(...args);
      safeBatchedUpdates(() => {
        setData(result);
        setLoading(false);
      });
      return result as TData;
    } catch (e) {
      safeBatchedUpdates(() => {
        setError(e as Error);
        setLoading(false);
      });
      throw e;
    }
  }, deps);

  return [mutate, { loading, error, data }] as const;
}
