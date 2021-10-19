import "hardhat-deploy";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/types";

export default {
  solidity: "0.8.4",
  typechain: {
    outDir: "src/typechain/",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
} as HardhatUserConfig;
