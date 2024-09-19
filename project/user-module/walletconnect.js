// to simulate clicking of connect wallet after every page refresh. Because MM disconnects partially after every page refresh
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, simulating click on connectButton');

    const connectButton = document.getElementById('connectButton');
    if (connectButton) {
        connectButton.click();
    } else {
        console.error('connectButton not found');
    }
});

// let baseUrlAdmin = 'http://localhost:5500/admin-api';
// let rootUrl = 'https://full-eagles-wave.loca.lt';
let rootUrl = config.rootUrl;
let baseUrlAdmin = rootUrl + '/admin-api'
let userWalletAddress = '';
const ERC20_ABI = [
    "function transfer(address to, uint256 amount) public returns (bool)"
];

const ERC721_ABI = [
    "function safeTransferFrom(address from, address to, uint256 tokenId) external"
];

if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    console.log('MetaMask is not installed!');
}

const provider1 = new ethers.providers.Web3Provider(window.ethereum);

async function connectMetaMask() {
    try {
        await provider1.send("eth_requestAccounts", []);
        const signer = provider1.getSigner();
        const address = await signer.getAddress();
        userWalletAddress = address; //setting global variable
        const balance = await provider1.getBalance(address);

        document.getElementById('walletAddress').textContent = address;
        document.getElementById('walletBalance').textContent = ethers.utils.formatEther(balance);
        document.getElementById('walletInfo').style.display = 'block';
    } catch (error) {
        console.error('Error connecting MetaMask:', error);
    }
}

document.getElementById('connectButton').addEventListener('click', connectMetaMask);

document.getElementById('depositTokenButton').addEventListener('click', () => {
    $('#depositTokenModal').modal('show');
});

document.getElementById('depositNFTButton').addEventListener('click', () => {
    $('#depositNFTModal').modal('show');
});


document.getElementById('submitDepositToken').addEventListener('click', async () => {
    const tokenContractAddress = document.getElementById('tokenContractAddress').value;
    const amount = document.getElementById('tokenAmount').value;
    const bankMngrAddress = '0x64657709e47f098715a5aa33c985af15ccc77b32';  // Fixed address to transfer tokens to

    try {
        const signer = provider1.getSigner();
        const tokenContract = new ethers.Contract(tokenContractAddress, ERC20_ABI, signer);

        // Transfer tokens to the fixed address
        const tx = await tokenContract.transfer(bankMngrAddress, ethers.utils.parseUnits(amount, 18));
        await tx.wait();

        alert('Token deposited successfully!');
    } catch (error) {
        console.error('Error depositing token:', error);
    }
});

document.getElementById('submitDepositNFT').addEventListener('click', async () => {
    const nftContractAddress = document.getElementById('nftContractAddress').value;
    const tokenId = document.getElementById('nftTokenId').value;

    try {
        const signer = provider1.getSigner();
        const nftContract = new ethers.Contract(nftContractAddress, ERC721_ABI, signer);
        // Assume 'to' is the current address of the signer
        const tx = await nftContract.safeTransferFrom(signer.getAddress(), signer.getAddress(), tokenId);
        await tx.wait();
        alert('NFT deposited successfully!');
    } catch (error) {
        console.error('Error depositing NFT:', error);
    }
});

document.getElementById('submitBorrowAsset').addEventListener('click', async () => {
    const borrowType = document.getElementById('borrowType').value;
    console.log('Borrow type:', borrowType);

    if (borrowType === 'erc20') {
        const tokenAddress = document.getElementById('borrowTokenContractAddress').value;
        const amount = document.getElementById('borrowTokenAmount').value;
        console.log('Token address:', tokenAddress, 'Amount:', amount);

        try {
            const response = await fetch(`${baseUrlAdmin}/api/borrow/erc20`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tokenAddress, amount })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();  // Get error details from response
                throw new Error(errorText || 'Failed to process ERC-20 borrow request');
            }

            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error('Error borrowing ERC-20 token:', error);
            alert('Error borrowing ERC-20 token: ' + error.message);
        }
    } else if (borrowType === 'nft') {
        const nftAddress = document.getElementById('borrowNFTContractAddress').value;
        const tokenId = document.getElementById('borrowNFTTokenId').value;
        console.log('NFT address:', nftAddress, 'Token ID:', tokenId);

        try {
            const response = await fetch(`${baseUrlAdmin}/api/borrow/nft`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nftAddress, tokenId })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();  // Get error details from response
                throw new Error(errorText || 'Failed to process NFT borrow request');
            }

            const result = await response.text();
            alert(result);
        } catch (error) {
            console.error('Error borrowing NFT:', error);
            alert('Error borrowing NFT: ' + error.message);
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, simulating click on connectButton');

    const connectButton = document.getElementById('connectButton');
    if (connectButton) {
        connectButton.click();
    } else {
        console.error('connectButton not found');
    }
});

