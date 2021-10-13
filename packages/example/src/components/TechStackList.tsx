import {
  ERC721_ABI,
  useContract,
  useTokenMetadata,
  Contract,
  useTokenBalance,
  useReadContract,
  useUserAddress,
} from "ethereal-react";

function TechStackPreview({
  index,
  contract,
}: {
  index: number;
  contract: Contract;
}) {
  const address = useUserAddress();
  const tokenID = useReadContract(
    contract,
    "tokenOfOwnerByIndex",
    address,
    index
  );
  const metadata = useTokenMetadata(contract, tokenID);

  return (
    <div>
      {metadata.name} <img width={100} height={100} src={metadata.image} />
    </div>
  );
}

export function TechStackList() {
  const TechStack = useContract(
    // PROD:
    // "0x6A63Bb17c831555783b46C6B344237E80372C97F",
    // ROPSTEN:
    "0x2A4eEfd9679aB26c5FD70D8A5982025dC6Ca6EC2",
    [...ERC721_ABI, "function claim(uint256 tokenId)"]
  );

  const balance = useTokenBalance(TechStack);

  return (
    <div>
      Tech Stack Balance: {balance.toString()}
      <ul>
        {Array.from({ length: balance.toNumber() }, (_, index) => (
          <TechStackPreview key={index} index={index} contract={TechStack} />
        ))}
      </ul>
    </div>
  );
}
