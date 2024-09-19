/*
fetch('http://localhost:3000/api/borrow/nft', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nftAddress: '0xExampleNFTAddress456',
        tokenId: 1
    })
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));


fetch('http://localhost:3000/api/borrow/erc20', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        contractAddress: '0xExampleNFTAddress456',
        amount: 55
    })
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
*/

/*
fetch('http://localhost:3000/api/withdraw/nft', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nftAddress: '0xExampleNFTAddress456',
        tokenId: 1
    })
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));


fetch('http://localhost:3000/api/withdraw/erc20', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        contractAddress: '0xExampleNFTAddress456',
        amount: 55
    })
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

*/



/*
fetch('http://localhost:3000/api/get-withdraw-reqs')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

fetch('http://localhost:3000/api/get-borrow-reqs')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
*/


fetch('http://localhost:3000/api/get-withdraw-reqs')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

