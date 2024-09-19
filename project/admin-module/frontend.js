// let baseUrlAdmin = 'http://localhost:5500/admin-api';
// let rootUrl = 'https://full-eagles-wave.loca.lt';
let rootUrl = config.rootUrl;
let baseUrlAdmin = rootUrl + '/admin-api';
$(document).ready(function() {

  // Function to load requests into tables
  function loadRequests(type) {
    $.get(`${baseUrlAdmin}/api/get-${type}-reqs`, function(data) {
      const tableBody = $(`#${type}RequestsTable tbody`);
      tableBody.empty();
      data.forEach(request => {
        let detailsHtml = '';
        if (request.tokenAddress) detailsHtml += `Address: ${request.tokenAddress} <ion-icon name="copy" class="copy-icon" onclick="copyToClipboard('${request.tokenAddress}', this)"></ion-icon><br>`;
        if (request.nftAddress) detailsHtml += `Address: ${request.nftAddress} <ion-icon name="copy" class="copy-icon" onclick="copyToClipboard('${request.nftAddress}', this)"></ion-icon><br>`;
        if (request.amount) detailsHtml += `Amount: ${request.amount} <ion-icon name="copy" class="copy-icon" onclick="copyToClipboard('${request.amount}', this)"></ion-icon><br>`;
        if (request.tokenId) detailsHtml += `Token ID: ${request.tokenId} <ion-icon name="copy" class="copy-icon" onclick="copyToClipboard('${request.tokenId}', this)"></ion-icon><br>`;
        if (request.walletAddress) detailsHtml += `Wallet Address: ${request.walletAddress} <ion-icon name="copy" class="copy-icon" onclick="copyToClipboard('${request.walletAddress}', this)"></ion-icon><br>`;
        if (request.TrnxHash) detailsHtml += `Trnx Hash: ${request.TrnxHash} <ion-icon name="copy" class="copy-icon" onclick="copyToClipboard('${request.TrnxHash}', this)"></ion-icon><br>`;

        tableBody.append(`
          <tr>
            <td>${request.id}</td>
            <td>${request.assetType === 'erc20' ? 'ERC-20 Token' : 'NFT'}</td>
            <td>${detailsHtml}</td>
            <td>${request.timestamp}</td>
            <td>
              <button class="btn btn-success btn-sm approveBtn" onclick="approveRequest(${request.id}, 'Approved', '${type}')">Approve</button>
              <button class="btn btn-warning btn-sm rejectBtn text-dark" onclick="unapproveRequest(${request.id}, 'Unapproved', '${type}')">Unapprove</button>
            </td>
          </tr>
        `);
      });
    });
  }

  // Initial load of all requests
  loadRequests('withdraw');
  loadRequests('borrow');
  loadRequests('deposit');  // Add loading for deposit requests

  // Function to update request status
// Function to update request status
window.approveRequest = function(id, status, type) {
$.ajax({
    url: `${baseUrlAdmin}/api/approve-request`,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ id, status, type }),
    success: function() {
        loadRequests(type);  // Reload requests of the specific type
        alert("Request Approved.")
    },
    error: function() {
        alert('Failed to Update Request.');
    }
});
};


window.unapproveRequest = function(id, status, type) {
$.ajax({
    url: `${baseUrlAdmin}/api/unapprove-request`,
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ id, status, type }),
    success: function() {
        loadRequests(type);  // Reload requests of the specific type
        alert("Request Unapproved.")
    },
    error: function() {
        alert('Failed to Update Request.');
    }
});
};


  // Function to copy text to clipboard
  window.copyToClipboard = function(text, iconElement) {
    navigator.clipboard.writeText(text).then(() => {
      // Change icon to checkmark-done after copying
      iconElement.setAttribute('name', 'checkmark');
      setTimeout(() => {
        // Change it back after 1 seconds
        iconElement.setAttribute('name', 'copy');
      }, 1000);
    }, (err) => {
      console.error('Failed to copy text: ', err);
    });
  };
});