import { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("TechStack", {
    args: [],
    from: deployer,
    log: true,
  });
};

deploy.tags = ["TechStack"];

export default deploy;
