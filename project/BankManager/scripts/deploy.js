const hre = require("hardhat");

async function main() {
  // Get the contract to deploy
  const BankManager = await hre.ethers.getContractFactory("BankManager");
  const bankManager = await BankManager.deploy();

  await bankManager.deployed();

  console.log("BankManager deployed to:", bankManager.address);
}

// Run the main function and catch errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
