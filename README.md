# Permissioned Banking Application

## Product Overview

This permissioned banking application allows a single admin to verify and manage transactions on behalf of users. The system operates across multiple networks: user interactions occur on Ethereum/Polygon testnets, while the admin operates on a Hyperledger network. Users can deposit, withdraw, and borrow assets, while the admin manages these requests via the BankManager smart contract.

## Minimum Requirements Covered

1. **User Interaction**: Users can deposit and withdraw tokens/NFTs and borrow assets.
2. **Admin Verification**: A single admin verifies and approves user requests.
3. **Transaction Management**: All transactions are securely managed through the BankManager smart contract.
4. **Cross-Network Communication**: The admin can initiate requests to the Ethereum-based BankManager from the Hyperledger network.

## System Architecture

### Modules

1. **User Module**
   - **Technology**: Web2 and Web3; uses Ethers.js.
   - **Functionality**: Allows users to deposit, withdraw, and borrow assets.

2. **Admin Module**
   - **Technology**: Node.js on Hyperledger.
   - **Functionality**: Manages and verifies requests made by users.

3. **BankManager Module**
   - **Technology**: Smart contract deployed on the Ethereum/Polygon testnet.
   - **Functionality**: Holds all assets and processes deposit/withdraw requests. Controlled solely by the keys in the Admin Module.

## Instructions to Run the Project

1. **Deploy the BankManager Contract**:
   - Create the `BankManager.sol` contract.
   - Deploy it to the testnet/mainnet using Hardhat or Remix IDE.
   - Save the following information:
     - `BankManager.json` (ABI)
     - Contract address
     - Private key and public address of the wallet used for deployment (this wallet will own the BankManager contract).

2. **Configure the BankManager Module**:
   - Navigate to the `BankManager-module` directory.
   - Update the `.env` file with relevant information.
   - Add/update `BankManager.json`.
   - Modify functions in `interact.js` if needed.
   - Update `interact-endpoints.js` to enable interactions with the BankManager contract via Ethers.js.
   - Run `interact-endpoints.js`.

3. **Serve the User Interface**:
   - Serve `index.html` from the `BankManager-module` to provide a UI for interacting with the APIs.

4. **Set Up the Admin Module**:
   - Open a new terminal and navigate to the `admin-module`.
   - Delete `requests.db` if starting fresh.
   - Run `server.js`.
   - Use `test.js` to conduct initial tests.
   - Serve `index.html` in the `admin-module` to access user requests.

5. **Set Up the User Module**:
   - Open a new terminal and navigate to the `user-module`.
   - Serve `index.html` to allow users to deposit, withdraw, and borrow tokens/NFTs.
   - The user interface interacts with the admin panel APIs for transaction requests.
   - The admin can approve/reject user requests and perform necessary transactions using the API.

## Module Links

- [User Module](http://127.0.0.1:5500/user-module/index.html)
- [Admin Module](http://127.0.0.1:5500/admin-module/index.html)
- [BankManager Module](http://127.0.0.1:5500/BankManager-module/index.html)

