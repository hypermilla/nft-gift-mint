async function main() {
    // Grab the contract factory 
    const CrucibleRewardProgramGift = await ethers.getContractFactory("CrucibleRewardProgramGiftNFT");
 
    // Start deployment, returning a promise that resolves to a contract object
    const rewardProgramGift = await CrucibleRewardProgramGift.deploy(); // Instance of the contract 
    console.log("Contract deployed to address:", rewardProgramGift.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });