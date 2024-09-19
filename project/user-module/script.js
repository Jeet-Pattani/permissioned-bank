//metamask connect and other btns functionality
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
    const bankMngrAddress = '0x17a3F2E23F0c832E8C6A874B27Cc950a7F59731F';  // Fixed address to transfer tokens to

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
            const response = await fetch('http://localhost:3000/api/borrow/erc20', {
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
            const response = await fetch('http://localhost:3000/api/borrow/nft', {
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


//const baseUrl = 'http://localhost:3000';


$(document).ready(function() {
    // Handle the change event for asset type selection
    $('#assetType').change(function() {
        const assetType = $(this).val();
        if (assetType === 'erc20') {
            $('#erc20Fields').removeClass('d-none');
            $('#nftFields').addClass('d-none');
        } else if (assetType === 'nft') {
            $('#nftFields').removeClass('d-none');
            $('#erc20Fields').addClass('d-none');
        } else {
            $('#erc20Fields').addClass('d-none');
            $('#nftFields').addClass('d-none');
        }
    });

    // Handle form submission
    $('#withdrawalForm').submit(function(e) {
        // Prevent form from refreshing the page
        e.preventDefault();

        // Get selected asset type and initialize variables
        const assetType = $('#assetType').val();
        let url, data;

        // Prepare data based on selected asset type
        if (assetType === 'erc20') {
            url = baseUrl + '/api/withdraw/erc20';
            data = {
                tokenAddress: $('#erc20TokenAddress').val(),
                amount: $('#erc20Amount').val(),
                trnxHash: $('#TrnxHash').val(),
                walletAddress: $('#walletAddress').text()  // Use .val() instead of .text() if it's an input field
            };
        } else if (assetType === 'nft') {
            url = baseUrl + '/api/withdraw/nft';
            data = {
                nftAddress: $('#nftAddress').val(),
                tokenId: $('#nftTokenId').val(),
                trnxHash: $('#TrnxHash').val(),
                walletAddress: $('#walletAddress').text()  // Use .val() instead of .text() if it's an input field
            };
        } else {
            alert('Please select an asset type');
            return;
        }

        // Log data to console to verify what is being sent
        console.log('Sending data to backend:', data);

        // Send AJAX request
        $.ajax({
            url: url,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                alert('Request successful');
                $('#withdrawalModal').modal('hide');
            },
            error: function(xhr) {
                alert('Error processing request');
            }
        });
    });
});



// borrow fxn using jquery
$(document).ready(function() {
$('#assetTypeB').change(function() {
    const assetType = $(this).val();
    if (assetType === 'erc20') {
        $('#erc20FieldsB').removeClass('d-none');
        $('#nftFieldsB').addClass('d-none');
    } else if (assetType === 'nft') {
        $('#nftFieldsB').removeClass('d-none');
        $('#erc20FieldsB').addClass('d-none');
    } else {
        $('#erc20FieldsB').addClass('d-none');
        $('#nftFieldsB').addClass('d-none');
    }
});

$('#borrowalForm').submit(function(e) {
    e.preventDefault();
    const assetType = $('#assetTypeB').val();
    let url, data;

    if (assetType === 'erc20') {
        url = baseUrl + '/api/borrow/erc20';
        data = {
            tokenAddress: $('#erc20TokenAddressB').val(),
            amount: $('#erc20AmountB').val(),
            walletAddress: $('#walletAddress').text() 
        };
    } else if (assetType === 'nft') {
        url = baseUrl +  '/api/withdraw/nft';
        data = {
            nftAddress: $('#nftAddressB').val(),
            tokenId: $('#nftTokenIdB').val(),
            walletAddress: $('#walletAddress').text()
        };
    } else {
        alert('Please select an asset type');
        return;
    }

    $.ajax({
        url: url,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            alert('Request successful');
            $('#borrowalModal').modal('hide');
        },
        error: function(xhr) {
            alert('Error processing request');
        }
    });
});
});
