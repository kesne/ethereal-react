import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("Greeter", {
    args: ["Hello, world!"],
    from: deployer,
    log: true,
  });
};

deploy.tags = ["Greeter"];

export default deploy;
