
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
            url = baseUrlAdmin + '/api/borrow/erc20';
            data = {
                tokenAddress: $('#erc20TokenAddressB').val(),
                amount: $('#erc20AmountB').val(),
                walletAddress: userWalletAddress
            };
        } else if (assetType === 'nft') {
            url = baseUrlAdmin +  '/api/borrow/nft';
            data = {
                nftAddress: $('#nftAddressB').val(),
                tokenId: $('#nftTokenIdB').val(),
                walletAddress: userWalletAddress
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