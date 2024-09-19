const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Ensure .env is loaded correctly
const { ethers } = require('ethers');// Correct import

// Load environment variables
const API_URL = process.env.ALCHEMY_PROVIDER_URL;
const PRIVATE_KEY = process.env.ACC3_PRIV_KEY;
const CONTRACT_ADDRESS = process.env.BMNGR_ADDR;

// Import contract ABI
const contract = require("./BankManager.json");

// Ensure API_URL and PRIVATE_KEY are defined
if (!API_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    throw new Error('Missing environment variables. Please check your .env file.');
}
// Initialize Express app
const app = express();
app.use(express.json());  // Parse JSON request body
app.use(cors());
// Provider and Signer setup
const alchemyProvider = new ethers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract instance
const bankManagerContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

// API to get the owner of the contract
app.get('/owner', async (req, res) => {
    try {
        const ownerAddress = await bankManagerContract.owner();
        res.json({ owner: ownerAddress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// API to transfer ownership (only callable by current owner)
app.post('/transferOwnership', async (req, res) => {
    const { newOwner } = req.body;
    try {
        const transferOwnershipTx = await bankManagerContract.transferOwnership(newOwner);
        await transferOwnershipTx.wait();
        res.json({ message: `Ownership transferred to ${newOwner}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to withdraw Ether to a recipient
app.post('/withdrawEther', async (req, res) => {
    const { recipient, amount } = req.body;
    try {
        const etherAmount = ethers.parseUnits(amount.toString());
        const withdrawEtherTx = await bankManagerContract.withdrawEther(recipient, etherAmount);
        await withdrawEtherTx.wait();
        res.json({ message: `Withdrawn ${amount} Ether to ${recipient}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to withdraw ERC20 tokens to a recipient
app.post('/withdrawERC20', async (req, res) => {
    const { tokenAddress, recipient, amount } = req.body;
    try {
        const tokenAmount = ethers.parseUnits(amount.toString(), 18);
        console.log(amount.toString())
        console.log(tokenAmount)
        const withdrawERC20Tx = await bankManagerContract.withdrawERC20(tokenAddress, recipient, tokenAmount);
        await withdrawERC20Tx.wait();
        res.json({ message: `Withdrawn ${amount} ERC20 tokens to ${recipient}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to withdraw ERC721 token (NFT) to a recipient
app.post('/withdrawERC721', async (req, res) => {
    const { nftTokenAddress, recipient, tokenId } = req.body;
    try {
        const withdrawERC721Tx = await bankManagerContract.withdrawERC721(nftTokenAddress, recipient, tokenId);
        await withdrawERC721Tx.wait();
        res.json({ message: `Withdrawn ERC721 token ID ${tokenId} to ${recipient}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to withdraw ERC1155 token to a recipient
app.post('/withdrawERC1155', async (req, res) => {
    const { tokenAddress, recipient, tokenId, amount, data } = req.body;
    try {
        const withdrawERC1155Tx = await bankManagerContract.withdrawERC1155(tokenAddress, recipient, tokenId, amount, data || '0x');
        await withdrawERC1155Tx.wait();
        res.json({ message: `Withdrawn ${amount} ERC1155 tokens (ID: ${tokenId}) to ${recipient}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to renounce ownership (only callable by owner)
app.post('/renounceOwnership', async (req, res) => {
    try {
        const renounceOwnershipTx = await bankManagerContract.renounceOwnership();
        await renounceOwnershipTx.wait();
        res.json({ message: "Ownership renounced." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
