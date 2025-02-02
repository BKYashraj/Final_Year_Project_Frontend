const hre = require("hardhat");

async function main() {
    console.log("Starting deployment...");

    // Fetching the contract factory
    const FarmerToFactory = await hre.ethers.getContractFactory("FarmerToFactory");

    // Deploying the contract
    console.log("Deploying contract...");
    const contract = await FarmerToFactory.deploy();

    // Await deployment transaction receipt
    const receipt = await contract.waitForDeployment();

    // Getting the deployed contract address
    console.log("Contract deployed to:", contract.target);
}

main().catch((error) => {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
    // Yashraj
});


// 0xA2Fb97586Cb2996D2140Bc42f0D852b9D6533C6A
