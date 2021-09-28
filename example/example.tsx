/// <reference types="vite/client" />
/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />

import { StrictMode, Suspense, useState } from "react";
import { createRoot } from "react-dom";
import {
  useConnectToWallet,
  ConnectedToWallet,
  useTokenBalance,
  useContract,
  ERC721_ABI,
  useWriteContract,
  useWaitForTransaction,
  useReadContract,
} from "ethical-react";
import { ethers } from "ethers";

function ConnectButton() {
  const connect = useConnectToWallet();
  return <button onClick={connect}>Connect to Wallet</button>;
}

function Minted({
  transaction,
  contract,
  tokenId,
}: {
  transaction: ethers.ContractTransaction;
  contract: ethers.Contract;
  tokenId: number;
}) {
  const confirmation = useWaitForTransaction({ transaction });
  const tokenURI = useReadContract({
    contract,
    function: "tokenURI",
    args: [tokenId],
  });

  return (
    <div>
      Minted!
      {confirmation.status}
      <img src={JSON.parse(atob(tokenURI.split(",")[1])).image} />
    </div>
  );
}

function Minter({ contract }: { contract: ethers.Contract }) {
  const [id, setId] = useState("");
  const [claimTechStack, { loading, data }] = useWriteContract({
    contract,
    function: "claim",
  });

  if (data) {
    return (
      <Suspense fallback={<div>Minting...</div>}>
        <Minted contract={contract} tokenId={+id} transaction={data} />
      </Suspense>
    );
  }

  return (
    <div style={{ border: "2px solid green", padding: 10 }}>
      <div>
        <input
          placeholder="Token ID..."
          value={id}
          onChange={(e) => setId(e.currentTarget.value)}
        />
      </div>
      <button disabled={loading} onClick={() => claimTechStack(+id)}>
        Mint TechStack
      </button>
    </div>
  );
}

function App() {
  const TechStack = useContract({
    // PROD:
    // address: "0x6A63Bb17c831555783b46C6B344237E80372C97F",
    // ROPSTEN:
    address: "0x2A4eEfd9679aB26c5FD70D8A5982025dC6Ca6EC2",
    abi: [
      ...ERC721_ABI,
      "function claim(uint256 tokenId)",
      "function tokenURI(uint256 tokenId) view returns (string memory)",
    ],
  });

  const stack = useTokenBalance({ contract: TechStack });

  return (
    <div>
      Current TechStack: {stack.toString()}
      <Minter contract={TechStack} />
    </div>
  );
}

if (!globalThis.reactRoot) {
  globalThis.reactRoot = createRoot(document.getElementById("root")!);
}

globalThis.reactRoot.render(
  <StrictMode>
    <Suspense fallback="Loading...">
      <ConnectedToWallet fallback={<ConnectButton />}>
        <App />
      </ConnectedToWallet>
    </Suspense>
  </StrictMode>
);
