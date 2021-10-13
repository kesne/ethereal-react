type ReadCB<T> = () => T;

/**
 * This executes multiple suspense-causing reads, and aggregates them into a single
 * thrown promise. This is be useful when you need to read multiple resources together,
 * and don't want to wait to read them all in series.
 */
export function useMultiRead<T extends any[]>(cbs: [...ReadCB<T>[]]): T {
  const promises: Promise<any>[] = [];
  const data: any[] = [];

  cbs.map((read) => {
    try {
      data.push(read());
    } catch (e: any) {
      if ("then" in e) {
        promises.push(e);
      } else {
        // Actual error, just bubble:
        throw e;
      }
    }
  });

  console.log({ promises });

  if (promises.length) {
    // Throw an aggregate promise:
    throw Promise.all(promises);
  }

  return data as T;
}
