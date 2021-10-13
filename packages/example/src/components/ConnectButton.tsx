import { useConnectToWallet } from "ethereal-react";

export function ConnectButton() {
  const [connect, { loading }] = useConnectToWallet();

  return (
    <button onClick={connect} disabled={loading}>
      Connect to Wallet
    </button>
  );
}
