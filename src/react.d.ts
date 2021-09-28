import * as React from "react";

declare module "react" {
  export const unstable_Cache: React.Component;
  export const unstable_getCacheForType: <T>(cacheType: () => T) => T;
  export const unstable_useCacheRefresh: () => () => void;
}
