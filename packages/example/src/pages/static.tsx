import React, { Suspense, useState } from "react";
import {
  useBlock,
  Provider,
  useResolveENS,
  useENSForAddress,
} from "ethereal-react";
import { ethers } from "ethers";

function Home() {
  const [block] = useBlock();
  const address = useResolveENS("vapejuicejordan.eth");
  const ens = useENSForAddress(address);

  return (
    <div>
      <div>Block number: {block.number}</div>
      <div>ENS: {ens}</div>
      <div>Address: {address}</div>
    </div>
  );
}

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
);

export default function HomePage() {
  return (
    <Provider provider={provider}>
      <Home />
    </Provider>
  );
}
