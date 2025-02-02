// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;//sanika

contract FarmerToFactory {
    struct Transaction {
        address farmer;
        address factory;
        uint256 sugarcaneInTons;
        uint256 pricePerTon;
        uint256 totalCost;
        bool isPaid;
    }

    Transaction[] public transactions;

    function createTransaction(
        address factory,
        uint256 sugarcaneInTons,
        uint256 pricePerTon
    ) public {
        uint256 totalCost = sugarcaneInTons * pricePerTon;
        transactions.push(
            Transaction(msg.sender, factory, sugarcaneInTons, pricePerTon, totalCost, false)
        );
    }

    function pay(uint256 transactionId) public payable {
        require(transactionId < transactions.length, "Invalid transaction ID");
        Transaction storage txn = transactions[transactionId];
        require(msg.sender == txn.factory, "Only the factory can pay");
        require(msg.value == txn.totalCost, "Incorrect amount");
        require(!txn.isPaid, "Already paid");

        txn.isPaid = true;
        payable(txn.farmer).transfer(msg.value);
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}
