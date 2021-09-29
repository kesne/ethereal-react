// This is a fork of the `use-asset` package, with some additional features
// based on our needs for manually updating cache values.
// https://github.com/pmndrs/use-asset

import deepEqual from "fast-deep-equal";
import { useState } from "react";

interface Asset<Response, Args extends any[]> {
  read(...args: Args): Response;
  preload(...args: Args): void;
  clear(...args: Args): void;
  peek(...args: Args): void | Response;
}

type PromiseCache<Response, Args extends any[]> = {
  promise: Promise<void>;
  args: Args;
  error?: any;
  response?: Response;
};

type PromiseFn<Response, Args extends any[]> = (
  ...args: Args
) => Promise<Response>;

function handleAsset<Response, Args extends any[]>(
  fn: PromiseFn<Response, Args>,
  cache: PromiseCache<Response, Args>[],
  args: Args,
  lifespan = 0,
  preload = false
) {
  for (const entry of cache) {
    // Find a match
    if (deepEqual(args, entry.args)) {
      // If we're pre-loading and the element is present, just return
      if (preload) return;
      // If an error occurred, throw
      if (entry.error) throw entry.error;
      // If a response was successful, return
      if (entry.response) return entry.response;
      // If the promise is still unresolved, throw
      throw entry.promise;
    }
  }

  // The request is new or has changed.
  const entry: PromiseCache<Response, Args> = {
    args,
    promise:
      // Make the promise request.
      fn(...args)
        // Response can't be undefined or else the loop above wouldn't be able to return it
        // This is for promises that do not return results (delays for instance)
        .then((response) => (entry.response = (response ?? true) as Response))
        .catch((e) => (entry.error = e ?? "unknown error"))
        .then(() => {
          if (lifespan > 0) {
            setTimeout(() => {
              const index = cache.indexOf(entry);
              if (index !== -1) cache.splice(index, 1);
            }, lifespan);
          }
        }),
  };
  cache.push(entry);
  if (!preload) throw entry.promise;
}

function clear<Response, Args extends any[]>(
  cache: PromiseCache<Response, Args>[],
  ...args: Args
) {
  if (args === undefined || args.length === 0) cache.splice(0, cache.length);
  else {
    const entry = cache.find((entry) => deepEqual(args, entry.args));
    if (entry) {
      const index = cache.indexOf(entry);
      if (index !== -1) cache.splice(index, 1);
    }
  }
}

export function createAsset<Response, Args extends any[]>(
  fn: PromiseFn<Response, Args>,
  lifespan = 0
): Asset<Response, Args> {
  const cache: PromiseCache<Response, Args>[] = [];
  return {
    /**
     * @throws Suspense Promise if asset is not yet ready
     * @throws Error if the promise rejected for some reason
     */
    read: (...args: Args): Response =>
      handleAsset(fn, cache, args, lifespan) as Response,
    preload: (...args: Args): void =>
      void handleAsset(fn, cache, args, lifespan, true),
    // update: (...args: Args) => ,
    clear: (...args: Args) => clear(cache, ...args),
    peek: (...args: Args): void | Response =>
      cache.find((entry) => deepEqual(args, entry.args))?.response,
  };
}

export function useAsset<Response, Args extends any[]>(
  asset: Asset<Response, Args>,
  ...args: Args
): [Response, () => void] {
  const [, setForceRender] = useState(0);
  const data = asset.read(...args);

  const refresh = () => {
    asset.clear(...args);
    setForceRender((i) => i + 1);
  };

  return [data, refresh];
}
