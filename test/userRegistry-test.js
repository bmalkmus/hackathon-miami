const { expect } = require("chai");
const hre = require("hardhat");

describe("Users", function(){
        let users;
    beforeEach(async ()=>{
        const Users = await hre.ethers.getContractFactory("Users");
        users = await Users.deploy();
    })
    it("Should have a set Registry Count of 5 users", async function(){
        expect (await users.getUserCount()).to.equal(5);
    })
    it("Should have a user count of 6 when new user added", async function(){
        const address = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

        await users.AddUser(address, "Fionna");
        const count = await users.getUserCount();

        expect(count).to.equal(6);
    })
    it("Should have a username of Fionna when added", async function(){
        const address = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

        await users.AddUser(address, "Fionna");
        const user = await users.Registry(address);

        expect(user.username).to.equal("Fionna")
    })
})