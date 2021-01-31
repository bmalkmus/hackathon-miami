// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

contract Users {

    uint public userCount = 0;

    struct User {
        address account;
        string username;
    }

    event AddedUser(address account, string username);

    mapping (address => User) public Registry;

    constructor() {
        AddUser(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, "Alice");
        AddUser(0x70997970C51812dc3A010C7d01b50e0d17dc79C8, "Bob");
        AddUser(0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC, "Charlie");
        AddUser(0x90F79bf6EB2c4f870365E785982E1f101E93b906, "Debbie");
        AddUser(0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65, "Everett");
    }

    function getUserCount() public view returns (uint){
        return userCount;
    }

    function AddUser (address  _account, string memory _username)
    public {
        userCount++;
        address  account = _account;
        Registry[account] = User(_account, _username);
        emit AddedUser(_account, _username);
    }

}