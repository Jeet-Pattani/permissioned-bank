
document.addEventListener('DOMContentLoaded', function () {
  const renounceButton = document.getElementById('renounceButton');
  const confirmButton = document.getElementById('confirmButton');
  const confirmationInput = document.getElementById('confirmationInput');
  const renounceOutput = document.getElementById('renounceOutput');

  confirmButton.addEventListener('click', function () {
    if (confirmationInput.value === 'Yes I understand') {
      renounceButton.classList.remove('btn-disabled');
      renounceButton.disabled = false;
      renounceOutput.textContent = 'Button enabled. You can now proceed with renouncing ownership.';
      $('#confirmModal').modal('hide');
    } else {
      renounceOutput.textContent = 'Confirmation text is incorrect. Please type "Yes I understand".';
    }
  });
});

function renounceOwnership() {
  // Your function to handle renouncing ownership
  console.log('Renounce ownership logic here.');
}

// Base URL for API calls (adjust it based on where your server is running)
// const baseURL = 'http://localhost:5500/bm-api';
// let rootUrl = 'https://full-eagles-wave.loca.lt';
let rootUrl = config.rootUrl;
let baseURL = rootUrl + '/bm-api'
// Function to fetch the owner of the contract
async function getOwner() {
  try {
    const response = await fetch(`${baseURL}/owner`);
    const data = await response.json();
    document.getElementById('ownerOutput').textContent = `Owner Address: ${data.owner}`;
  } catch (error) {
    document.getElementById('ownerOutput').textContent = `Error: ${error.message}`;
  }
}

// Function to transfer ownership of the contract
async function transferOwnership() {
  const newOwner = document.getElementById('newOwner').value;
  try {
    const response = await fetch(`${baseURL}/transferOwnership`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newOwner })
    });
    const data = await response.json();
    document.getElementById('transferOwnershipOutput').textContent = data.message || `Error: ${data.error}`;
  } catch (error) {
    document.getElementById('transferOwnershipOutput').textContent = `Error: ${error.message}`;
  }
}

// Function to withdraw Ether from the contract
async function withdrawEther() {
  const recipient = document.getElementById('recipientEth').value;
  const amount = document.getElementById('amountEth').value;
  try {
    const response = await fetch(`${baseURL}/withdrawEther`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipient, amount })
    });
    const data = await response.json();
    document.getElementById('withdrawEthOutput').textContent = data.message || `Error: ${data.error}`;
  } catch (error) {
    document.getElementById('withdrawEthOutput').textContent = `Error: ${error.message}`;
  }
}

// Function to withdraw ERC20 tokens from the contract
async function withdrawERC20() {
  const tokenAddress = document.getElementById('tokenAddress').value;
  const recipient = document.getElementById('recipientERC20').value;
  const amount = document.getElementById('amountERC20').value;
  try {
    const response = await fetch(`${baseURL}/withdrawERC20`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tokenAddress, recipient, amount })
    });
    const data = await response.json();
    document.getElementById('withdrawERC20Output').textContent = data.message || `Error: ${data.error}`;
  } catch (error) {
    document.getElementById('withdrawERC20Output').textContent = `Error: ${error.message}`;
  }
}

// Function to renounce ownership of the contract
async function renounceOwnership() {
  console.log("This function is commented as it can break the total working")
  /*
  try {
    const response = await fetch(`${baseURL}/renounceOwnership`, {
      method: 'POST'
    });
    const data = await response.json();
    document.getElementById('renounceOutput').textContent = data.message || `Error: ${data.error}`;
  } catch (error) {
    document.getElementById('renounceOutput').textContent = `Error: ${error.message}`;
  }*/
}