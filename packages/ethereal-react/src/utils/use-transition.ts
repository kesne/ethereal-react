import { useTransition } from "react";

export function useSafeTransition() {
  if (useTransition) {
    return useTransition();
  }

  return [false, (cb: () => void) => cb()] as const;
}
