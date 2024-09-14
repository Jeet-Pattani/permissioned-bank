require('dotenv').config();
const Web3 = require('web3');

// Load environment variables
const API_URL = process.env.POLYGONSCAN_API_URL;
const PRIVATE_KEY = process.env.ACC3_PRIV_KEY;
const CONTRACT_ADDRESS = process.env.BMNGR_ADDR;

const contract = require("./BankManager.json");

// Provider setup with Web3
const web3 = new Web3(new Web3.providers.HttpProvider(API_URL));

// Create an account object using the private key
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// Contract instance
const bankManagerContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

// Main function to interact with the contract
async function main() {
    try {
        // Example: Get the owner of the contract
        const ownerAddress = await bankManagerContract.methods.owner().call();
        console.log("Current owner of the contract: ", ownerAddress);

        // Add additional function calls here if needed.
        
    } catch (error) {
        console.error("Error in contract interaction:", error);
    }
}

main();
