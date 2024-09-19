Sample Token Address = '0x261F742c2a04BEB9d88Ba888a35997c889cB1a3f'

Bank Manager Address = '0x17a3f2e23f0c832e8c6a874b27cc950a7f59731f'

Bank Manager Owner (Acc3)= '0xb7e546E258E500566bD02F4b3D2bE7e54E40369B'

user wallet address = '0xb7e546E258E500566bD02F4b3D2bE7e54E40369B'

Proof of Deposit: '0x08763fc61e15c1d980d654e51d886e9972539baeedbc5c14e51b9cfda89d7a0d'









There are 3 modules


User-module: works on web2 and web3 uses ethersjs

Admin-module: manages requests on hyperledger network. Uses nodejs

BankManager-Module: a smart contract deployed in testnet. It holds all the assets and can only be controlled by the keys inside admin-module. 

BankManager can deposit/withdraw assets to any address

Admin-module is collection of all requests made by user. Any user request is to be cross verified by checking on explorer. If verified successfully then make withdraw request to BankManager.

BankManager, successfully fulfills the request



Instructions to run the project:


- Create a BankManager.sol Contract deploy it to testnet/mainnet using hardhat or RemixIDE
- save the BankManager.json (abi), the contract address, private key and public key/address of the wallet from which BankManager.sol was deployed (this wallet is owner of BankManager.sol only this can interact with the contract later on)
-go inside BankManager-module. update the .env file with relevant info
- add/update BankManager.json
- update functions in interact.js (if required)
- after testing interact.js modify interact-endpoints.js (allows interacting with BankManager.sol via using ethersjs)
- run interact-endpoints.js
-run/serve index.html (provides UI to use the interact-endpoints.js APIs)
- now open new terminal and go inside admin-module
- delete requests.db if starting from new
- run server.js
- use test.js to test before using it with frontend
- run/serve index.html inside admin-module to access all the requests made by the user
-open new terminal and go inside user-module dir(this is the user module using which users can deposit/withdraw tokens and NFTs, Borrow NFTs/Tokens)
- serve/run the index.html inside user-module dir
- the index.html interacts with the APIs of admin panel to make requests of depositing/withdrawing/borrowing
- the admin using the admin-module can approve/reject the requests
- after approving a requests the admin can make the required transaction using api-interact

Module Links:
- http://127.0.0.1:5500/user-module/index.html 
- http://127.0.0.1:5500/admin-module/index.html
- http://127.0.0.1:5500/BankManager-module/index.html


