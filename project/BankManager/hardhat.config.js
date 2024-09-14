require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0", // Ensure this matches your contract pragma version
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
