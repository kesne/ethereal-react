import { useEffect } from "react";
import { atom, Getter, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import deepEqual from "fast-deep-equal";

export function createAsyncFamily<TParams, TReturn>(
  creator: (params: TParams, get: Getter) => Promise<TReturn> | TReturn
) {
  const family = atomFamily(
    (params: TParams) =>
      atom(async (get) => {
        return await creator(params, get);
      }),
    deepEqual
  );

  function useAsyncFamily(params: TParams) {
    const atom = family(params);
    const [value] = useAtom(atom);

    useEffect(() => {
      return () => {
        // Defer the actual removal of the atom from the family:
        Promise.resolve().then(() => {
          family.remove(params);
        });
      };
    }, [atom]);

    return value;
  }

  return useAsyncFamily;
}
