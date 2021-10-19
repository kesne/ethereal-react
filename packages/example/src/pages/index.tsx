import { Suspense, useState } from "react";
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
  useLogout,
} from "ethereal-react";
import { TechStackList } from "../components/TechStackList";
import TechStackDeployment from "../../deployments/localhost/TechStack.json";

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

console.log(TechStackDeployment);

export default function App() {
  const logout = useLogout();
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
      <button onClick={logout}>Logout</button>
    </div>
  );
}
