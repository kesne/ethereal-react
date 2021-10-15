import { unstable_batchedUpdates } from "react-dom";

// NOTE: This batches updates for React < 18. In React >= 18, updates are automatically
// batched, and we can remove this function:
export function safeBatchedUpdates(cb: () => void) {
  if (unstable_batchedUpdates) {
    return unstable_batchedUpdates(cb);
  }
  cb();
}
