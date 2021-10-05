import "./polyfill";
import { StrictMode, Suspense, useState } from "react";
import { createRoot } from "react-dom";
import {
  useConnectToWallet,
  WalletProvider,
  useTokenBalance,
  useContract,
  ERC721_ABI,
  useWriteContract,
  useWaitForTransaction,
  useBlock,
  useReadContract,
  useBalance,
  Contract,
  ContractTransaction,
  useLogout,
} from "ethical-react";
// @ts-ignore: This package does not have types.
import WalletConnectProvider from "@walletconnect/web3-provider";

function ConnectButton() {
  const connect = useConnectToWallet();
  return <button onClick={connect}>Connect to Wallet</button>;
}

function Minted({
  transaction,
  contract,
  tokenId,
}: {
  transaction: ContractTransaction;
  contract: Contract;
  tokenId: number;
}) {
  const confirmation = useWaitForTransaction({ transaction });
  const tokenURI = useReadContract(contract, "tokenURI", [tokenId]);

  return (
    <div>
      Minted!
      {confirmation.status}
      <img src={JSON.parse(atob(tokenURI.split(",")[1])).image} />
    </div>
  );
}

function Minter({ contract }: { contract: Contract }) {
  const [id, setId] = useState("");
  const [claimTechStack, { loading, data }] = useWriteContract(
    contract,
    "claim"
  );

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
  const logout = useLogout();
  const [block] = useBlock();
  const balance = useBalance();
  const TechStack = useContract(
    // PROD:
    // "0x6A63Bb17c831555783b46C6B344237E80372C97F",
    // ROPSTEN:
    "0x2A4eEfd9679aB26c5FD70D8A5982025dC6Ca6EC2",
    [...ERC721_ABI, "function claim(uint256 tokenId)"]
  );

  const stack = useTokenBalance(TechStack);

  return (
    <div>
      <div>Block number: {block.number}</div>
      <div>Balance: {balance.toString()}</div>
      <div>Current TechStack: {stack.toString()}</div>
      <Minter contract={TechStack} />
      <button onClick={logout}>Logout</button>
    </div>
  );
}

if (!globalThis.reactRoot) {
  globalThis.reactRoot = createRoot(document.getElementById("root")!);
}

globalThis.reactRoot.render(
  <StrictMode>
    <Suspense fallback="Loading...">
      <WalletProvider
        network="ropsten"
        providerOptions={{
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: import.meta.env.VITE_INFURA_ID,
            },
          },
        }}
        fallback={<ConnectButton />}
      >
        <App />
      </WalletProvider>
    </Suspense>
  </StrictMode>
);
