import { useSwitchNetwork } from "ethereal-react";

export function SwitchNetwork() {
  const [switchNetwork, { loading }] = useSwitchNetwork({ chainId: 1337 });

  return (
    <div>
      The example only supports the local Hardhat network.
      <button onClick={switchNetwork} disabled={loading}>
        Switch to Hardhat Network
      </button>
    </div>
  );
}
