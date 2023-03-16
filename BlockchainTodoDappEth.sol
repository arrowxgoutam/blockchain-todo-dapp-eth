// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BlockchainTodoDappEth {
    struct TodoItem {
        string task;
        bool isDeleted;
    }

    mapping (uint256 => TodoItem) public list;
    uint256 public count = 0;
    address public owner;
    event TaskCompleted(uint256 indexed id);

    constructor () {
        owner = msg.sender;
    }

    function addTask(string calldata task) onlyOwner public {
        TodoItem memory item = TodoItem({ task: task, isDeleted: false });
        list[count] = item;
        count++;
    }

    function deleteTask(uint256 id) onlyOwner public {
        if (!list[id].isDeleted) {
            list[id].isDeleted = true;
            emit TaskCompleted(id);
        }
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Only owner can call this");
        _;
    }
}