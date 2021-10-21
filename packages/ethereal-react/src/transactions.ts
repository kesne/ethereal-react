import { useProvider } from "./provider";
import { useMutation } from "./utils/use-mutation";

/**
 * Used to sign messages with their currently connected wallet.
 * Returns a mutation that can be called with a string, which is the message that should be signed.
 *
 * @see https://docs.ethers.io/v5/api/signer/#Signer-signMessage
 */
export function useSignMessage() {
  const { ethers } = useProvider();

  return useMutation(async (message: string) => {
    return ethers.getSigner().signMessage(message);
  }, []);
}
