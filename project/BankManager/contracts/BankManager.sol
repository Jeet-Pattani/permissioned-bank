// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19; // Ensure this matches your Hardhat config

// Import OpenZeppelin Contracts for ERC20, ERC721, and ERC1155
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BankManager is Ownable {
    // Event for logging withdrawals
    event FundsWithdrawn(address indexed admin, address indexed recipient, address tokenAddress, uint256 amountOrTokenId);
    
    constructor(address initialOwner) Ownable(initialOwner) {}
    
    // Function to withdraw ERC20 tokens
    function withdrawERC20 (address tokenAddress, address recipient, uint256 amount) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(address(this)) >= amount, "Insufficient balance in the contract");
        token.transfer(recipient, amount);
        emit FundsWithdrawn(msg.sender, recipient, tokenAddress, amount);
    }

    // Function to withdraw ERC721 tokens (NFTs)
    function withdrawERC721(address tokenAddress, address recipient, uint256 tokenId) external onlyOwner {
        IERC721 token = IERC721(tokenAddress);
        require(token.ownerOf(tokenId) == address(this), "Contract does not own this token");
        token.safeTransferFrom(address(this), recipient, tokenId);
        emit FundsWithdrawn(msg.sender, recipient, tokenAddress, tokenId);
    }

    // Function to withdraw ERC1155 tokens (multi-token standard)
    function withdrawERC1155(address tokenAddress, address recipient, uint256 tokenId, uint256 amount, bytes calldata data) external onlyOwner {
        IERC1155 token = IERC1155(tokenAddress);
        require(token.balanceOf(address(this), tokenId) >= amount, "Insufficient token balance in the contract");
        token.safeTransferFrom(address(this), recipient, tokenId, amount, data);
        emit FundsWithdrawn(msg.sender, recipient, tokenAddress, tokenId);
    }

    // Fallback function to receive Ether
    receive() external payable {}

    // Function to withdraw Ether
    function withdrawEther(address payable recipient, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient Ether balance in the contract");
        recipient.transfer(amount);
        emit FundsWithdrawn(msg.sender, recipient, address(0), amount);
    }
}
