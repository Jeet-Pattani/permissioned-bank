require('dotenv').config(); // Ensure .env is loaded correctly
const { ethers } = require('ethers');// Correct import

// Load environment variables
const API_URL = process.env.ALCHEMY_PROVIDER_URL;
const PRIVATE_KEY = process.env.ACC3_PRIV_KEY;
const CONTRACT_ADDRESS = process.env.BMNGR_ADDR;

// Check if environment variables are loaded correctly

/*
console.log("API URL: ", API_URL);
console.log("Private Key: ", PRIVATE_KEY ? 'Loaded' : 'Not Loaded');
console.log("Contract Address: ", CONTRACT_ADDRESS);

*/

// Import contract ABI
const contract = require("./BankManager.json");

// Ensure API_URL and PRIVATE_KEY are defined
if (!API_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error('Missing environment variables. Please check your .env file.');
}

// Provider and Signer setup
const alchemyProvider = new ethers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract instance
const bankManagerContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

// Main function to interact with the contract
async function main() {
    try {
        // Example: Get the owner of the contract
        const ownerAddress = await bankManagerContract.owner();
        console.log("Current owner of the contract: ", ownerAddress);

        // Add additional function calls here if needed.
        
    } catch (error) {
        console.error("Error in contract interaction:", error);
    }
}

main();
