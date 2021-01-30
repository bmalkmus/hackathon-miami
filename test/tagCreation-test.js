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
})