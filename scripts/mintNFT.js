require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/crucibleTestNFT.sol/CrucibleRewardProgramGiftNFT.json"); 


const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);


async function mintNFT(tokenURI) {
    try {
        const nonce = web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

        const tx = {
            'from': PUBLIC_KEY,
            'to': CONTRACT_ADDRESS,
            'nonce': nonce,
            'gas': 500000,
            'maxPriorityFeePerGas': 1999999987,
            'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
        const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log("Transaction hash: ", transactionReceipt.transactionHash, "\nCheck Alchemy's Mempool to view the status of your transaction!");
    }
    catch (err) {
        console.log("Transaction failed", err);
    }
}

// fill in url for artwork
const tokenURI = "https://raw.githubusercontent.com/hypermilla/nft-gift-mint/main/data/nft-metadata.json";
mintNFT(tokenURI);

module.exports = mintNFT; 

