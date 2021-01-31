const hre = require("hardhat");

async function main() {
  const Userfactory = await hre.ethers.getContractFactory("Users");
  const Tagsfactory = await hre.ethers.getContractFactory("TagsDirectory");

  // If we had constructor arguments, they would be passed into deploy()
  let Usercontract = await Userfactory.deploy();
  let Tagscontract = await Tagsfactory.deploy();

  // The address the Contract WILL have once mined
  console.log(Usercontract.address, "users");
  console.log(Tagscontract.address, "tags");

  // The transaction that was sent to the network to deploy the Contract
  console.log(Usercontract.deployTransaction.hash);
  console.log(Tagscontract.deployTransaction.hash);

  // The contract is NOT deployed yet; we must wait until it is mined
  await Usercontract.deployed();
  await Tagscontract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });