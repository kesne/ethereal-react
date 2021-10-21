import React, { Suspense, useState } from "react";
import {
  useContract,
  ERC721_ABI,
  useWriteContract,
  useWaitForTransaction,
  useBlock,
  useReadContract,
  useBalance,
  Contract,
  ContractTransaction,
  useDisconnectWallet,
  WalletProvider,
  RequireNetwork,
} from "ethereal-react";
import { TechStackList } from "../components/TechStackList";
import TechStackDeployment from "../../deployments/localhost/TechStack.json";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ConnectButton } from "src/components/ConnectButton";
import { SwitchNetwork } from "src/components/SwitchNetwork";

function Minted({
  transaction,
  contract,
  tokenId,
}: {
  transaction: ContractTransaction;
  contract: Contract;
  tokenId: number;
}) {
  const confirmation = useWaitForTransaction(transaction);
  const tokenURI = useReadContract(contract, "tokenURI", tokenId);

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

function Home() {
  const disconnect = useDisconnectWallet();
  const [block] = useBlock();
  const balance = useBalance();
  const TechStack = useContract(TechStackDeployment.address, [
    ...ERC721_ABI,
    "function claim(uint256 tokenId)",
  ]);

  return (
    <div>
      <div>Block number: {block.number}</div>
      <div>Balance: {balance.toString()}</div>
      <TechStackList />
      <Minter contract={TechStack} />
      <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}

export default function HomePage() {
  return (
    <WalletProvider
      cacheProvider
      network="localhost"
      providerOptions={{
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
          },
        },
      }}
      fallback={<ConnectButton />}
      loading={null}
    >
      <Suspense fallback="Loading...">
        <RequireNetwork chainId={1337} fallback={<SwitchNetwork />}>
          <Home />
        </RequireNetwork>
      </Suspense>
    </WalletProvider>
  );
}
