require('dotenv').config(); // Ensure .env is loaded correctly
const { ethers } = require('ethers');// Correct import

// Load environment variables
const API_URL = process.env.POLYGONSCAN_API_URL;
const PRIVATE_KEY = process.env.ACC3_PRIV_KEY;
const CONTRACT_ADDRESS = process.env.BMNGR_ADDR;

// Check if environment variables are loaded correctly
console.log("API URL: ", API_URL);
console.log("Private Key: ", PRIVATE_KEY ? 'Loaded' : 'Not Loaded');
console.log("Contract Address: ", CONTRACT_ADDRESS);

// Import contract ABI
const contract = require("./BankManager.json");

// Ensure API_URL and PRIVATE_KEY are defined
if (!API_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error('Missing environment variables. Please check your .env file.');
}

// Provider and Signer setup
const alchemyProvider = new ethers.JsonRpcProvider('https://polygon-amoy.g.alchemy.com/v2/Ah7O36PfZkIKoL0pjWPmcYxmDvFhPkSH');
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract instance
const bankManagerContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

// Main function to interact with the contract
async function main() {
    try {
        // Example: Get the owner of the contract
        const ownerAddress = await bankManagerContract.owner();
        console.log("Current owner of the contract: ", ownerAddress);

                // Example 2: Transfer ownership (only callable by current owner)
        // const newOwner = '0xNewOwnerAddress'; // replace with actual new owner address
        // const transferOwnershipTx = await bankManagerContract.transferOwnership(newOwner);
        // await transferOwnershipTx.wait(); // wait for the transaction to be mined
        // console.log("Ownership transferred to: ", newOwner);

        // Example 3: Withdraw Ether to a recipient
        // const recipient = '0xRecipientAddress'; // replace with actual recipient address
        // const amount = ethers.utils.parseEther("0.1"); // withdraw 0.1 ether
        // const withdrawEtherTx = await bankManagerContract.withdrawEther(recipient, amount);
        // await withdrawEtherTx.wait();
        // console.log(`Withdrawn 0.1 Ether to ${recipient}`);

        // Example 4: Withdraw ERC20 tokens to a recipient
        // const tokenAddress = '0xTokenAddress'; // replace with the ERC20 token address
        // const recipient = '0xRecipientAddress'; // replace with recipient's address
        // const amount = ethers.utils.parseUnits("100", 18); // withdraw 100 tokens (assuming 18 decimals)
        // const withdrawERC20Tx = await bankManagerContract.withdrawERC20(tokenAddress, recipient, amount);
        // await withdrawERC20Tx.wait();
        // console.log(`Withdrawn ${amount} ERC20 tokens to ${recipient}`);

        // Example 5: Withdraw ERC721 token (NFT) to a recipient
        // const nftTokenAddress = '0xNftTokenAddress'; // replace with ERC721 token address
        // const recipient = '0xRecipientAddress'; // replace with recipient's address
        // const tokenId = 1; // specify the token ID to withdraw
        // const withdrawERC721Tx = await bankManagerContract.withdrawERC721(nftTokenAddress, recipient, tokenId);
        // await withdrawERC721Tx.wait();
        // console.log(`Withdrawn ERC721 token ID ${tokenId} to ${recipient}`);

        // Example 6: Withdraw ERC1155 token to a recipient
        // const tokenAddress = '0xERC1155TokenAddress'; // ERC1155 token address
        // const recipient = '0xRecipientAddress'; // recipient address
        // const tokenId = 1; // token ID to withdraw
        // const amount = 10; // number of tokens to withdraw
        // const data = '0x'; // extra data (optional)
        // const withdrawERC1155Tx = await bankManagerContract.withdrawERC1155(tokenAddress, recipient, tokenId, amount, data);
        // await withdrawERC1155Tx.wait();
        // console.log(`Withdrawn ${amount} ERC1155 tokens (ID: ${tokenId}) to ${recipient}`);

        // Example 7: Renounce ownership (only callable by the owner)
        // const renounceOwnershipTx = await bankManagerContract.renounceOwnership();
        // await renounceOwnershipTx.wait();
        // console.log("Ownership renounced.");
        
    } catch (error) {
        console.error("Error in contract interaction:", error);
    }
}

main();
