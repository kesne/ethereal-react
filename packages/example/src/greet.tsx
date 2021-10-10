import { useContract, useReadContract, useWriteContract } from "ethereal-react";
import { Greeter__factory } from "./typechain";

function GreeterComponent() {
  const contract = useContract("0x0000", Greeter__factory);
	const greeting = useReadContract(contract, 'greet');
  const [setGreeting] = useWriteContract(contract, "setGreeting");

  return (
    <div>
      {greeting}
      <button onClick={() => setGreeting('Hello, world!')}>Set</button>
    </div>
  );
}
