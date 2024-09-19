//const baseUrl = 'http://localhost:3000'
$(document).ready(function() {
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

    $('#withdrawalForm').submit(function(e) {
e.preventDefault();
const assetType = $('#assetType').val();
let url, data;

if (assetType === 'erc20') {
url = baseUrlAdmin + '/api/withdraw/erc20';
data = {
tokenAddress: $('#erc20TokenAddress').val(),
amount: $('#erc20Amount').val(),
TrnxHash: $('#TrnxHash').val(),  // Include TrnxHash
walletAddress: $('#walletAddress').text()  // Include walletAddress
};
} else if (assetType === 'nft') {
url = baseUrlAdmin + '/api/withdraw/nft';
data = {
nftAddress: $('#nftAddress').val(),
tokenId: $('#nftTokenId').val(),
TrnxHash: $('#TrnxHash').val(),  // Include TrnxHash
walletAddress: $('#walletAddress').text()  // Include walletAddress
};
} else {
alert('Please select an asset type');
return;
}

console.log('Sending data:', data);  // Log data before sending

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