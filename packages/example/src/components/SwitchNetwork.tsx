import { useSwitchNetwork } from "ethereal-react";

export function SwitchNetwork() {
  const [switchNetwork, { loading }] = useSwitchNetwork({ chainId: 3 });

  return (
    <div>
      The example only supports the Ropsten network.
      <button
        onClick={switchNetwork}
        disabled={loading}
      >
        Switch to Ropsten Network
      </button>
    </div>
  );
}
