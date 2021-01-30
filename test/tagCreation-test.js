const { expect } = require("chai");
const hre = require("hardhat");

describe("TagsDirectory", function(){
    let tagsDirectory;
    beforeEach(async ()=>{
        const TagsDirectory = await hre.ethers.getContractFactory("TagsDirectory");
        tagsDirectory = await TagsDirectory.deploy();
    })
    it("Should have a collection count of 1", async function() {
        expect (await tagsDirectory.getCollectionCount()).to.equal(1);
    })
    it("Should have a tag array of length 5", async function() {
        expect (await tagsDirectory.getCollectionTagArrayLength("Sample Collection")).to.equal(5);
    })
    it("Should have return an owner address of creator", async function() {
        const tagInfo = await tagsDirectory.getCollectionTagInfo("Sample Collection", 1);
        const [owner] = await hre.ethers.getSigners();
        expect (tagInfo[1]).to.equal(owner.address);
    })
    it("Should have a tag length of two", async function (){
        const [a, AltOwner] = await hre.ethers.getSigners();
        await tagsDirectory.AddTag("Sample Collection", AltOwner.address);
        expect (await tagsDirectory.getCollectionTagArrayLength("Sample Collection")).to.equal(6);
    });
})

describe("Approve Transfer", function (){
    let tagsDirectory;
    beforeEach(async ()=>{
        const [old, future] = await hre.ethers.getSigners();
        const TagsDirectory = await hre.ethers.getContractFactory("TagsDirectory");
        tagsDirectory = await TagsDirectory.deploy();
        await tagsDirectory.AddTag("Sample Collection", future.address);
        await tagsDirectory.ApproveAddress("Sample Collection", 1, future.address);
    })
    it("Should approve address to be prepped for transfer", async function (){
        const [old, future] = await hre.ethers.getSigners();
        const newOwner = await tagsDirectory.getCollectionTagInfo("Sample Collection", 1)
        expect (newOwner[2]).to.equal(future.address);
    })
    it("Transfer Token to new Address", async function (){
        const [old, future] = await hre.ethers.getSigners();
        await tagsDirectory.TransferTag("Sample Collection", 1, future.address);
        const newOwner = await tagsDirectory.getCollectionTagInfo("Sample Collection", 1)
        expect (newOwner[1]).to.equal(future.address);
    })
})