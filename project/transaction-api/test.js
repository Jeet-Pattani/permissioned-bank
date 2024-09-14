const Web3 = require('web3');
require('dotenv').config();

const web3 = new Web3(`${process.env.INFURA_URL}`); // Replace with your provider

const contractABI = [ /* ABI of the NFT contract */ ];
const contractAddress = '0x08a99e93AdB26Ac8557e6081285F941cbFD4Cacd'; // Replace with the NFT contract address

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function getTokenId(ownerAddress) {
    // Replace with the function that retrieves the tokenId
    const tokenId = await contract.methods.tokenOfOwnerByIndex(ownerAddress, 0).call();
    return tokenId;
}

const ownerAddress = '0x...'; // Replace with the owner’s address
getTokenId(ownerAddress).then(tokenId => console.log(tokenId));
