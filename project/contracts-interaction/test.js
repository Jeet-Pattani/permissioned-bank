//allows to interact with deployed contracts by using private keys for certain functions

const { ethers } = require("ethers");
const fs = require("fs");
require('dotenv').config();

const deployed_contract_address = process.env.NFTCREATOR_CONTRACT_ADDRESS
const acc1_priv_key = process.env.ACC1_PRIV_KEY
const acc1_addr = process.env.ACC1_PUB_KEY
const acc3_addr = process.env.ACC3_PUB_KEY
const rpc_url = process.env.RPC_URL

// Load ABI and Contract Address
const compiledContract = JSON.parse(fs.readFileSync("createNFT.json"));
const abi = compiledContract.abi;
const contractAddress = deployed_contract_address; // Replace with your contract address

// Connect to Ethereum node
const provider = new ethers.JsonRpcProvider(rpc_url); // Updated URL

// Create a Wallet instance with a private key and connect it to the provider
const privateKey = acc1_priv_key; // Replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

// Create contract instance
const contract = new ethers.Contract(contractAddress, abi, wallet); // Use wallet instead of provider

// Function to get the name of the contract
async function getName() {
    try {
        const name = await contract.name();
        console.log(`Contract Name: ${name}`);
    } catch (error) {
        console.error("Error getting contract name:", error);
    }
}

// Function to get the symbol of the contract
async function getSymbol() {
    try {
        const symbol = await contract.symbol();
        console.log(`Contract Symbol: ${symbol}`);
    } catch (error) {
        console.error("Error getting contract symbol:", error);
    }
}

// Function to get the owner of the contract
async function getOwner() {
    try {
        const owner = await contract.owner();
        console.log(`Contract Owner: ${owner}`);
    } catch (error) {
        console.error("Error getting contract owner:", error);
    }
}

// Function to mint a new NFT
async function mintNFT(toAddress, tokenURI) {
    try {
        const tx = await contract.mintNFT(toAddress, tokenURI);
        console.log(`Transaction Hash: ${tx.hash}`);
        await tx.wait(); // Wait for the transaction to be mined
        console.log("NFT Minted!");
    } catch (error) {
        console.error("Error minting NFT:", error);
    }
}
/*
// Function to transfer ownership of the contract
async function transferOwnership(newOwner) {
    try {
        const tx = await contract.transferOwnership(newOwner);
        console.log(`Transaction Hash: ${tx.hash}`);
        await tx.wait(); // Wait for the transaction to be mined
        console.log("Ownership Transferred!");
    } catch (error) {
        console.error("Error transferring ownership:", error);
    }
}

*/
// Example usage
(async function() {
   // await getName();
   // await getSymbol();
   // await getOwner();
    
    // Replace with actual address and token URI
    await mintNFT(acc3_addr, "https://harlequin-elaborate-fish-988.mypinata.cloud/ipfs/bafkreigzy35thuecyku4kwxx5f64bq4iuqjb2urufv6njphfmj55h2hwci");

    
    // Replace with actual address
   // await getOwner();
})();
