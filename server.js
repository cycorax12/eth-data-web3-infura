const Web3 = require("web3")
const axios = require('axios');

const CONTRACT_ADDRESS = "0xc2c747e0f7004f9e8817db2ca4997657a7746928" //contract address of your choice of ethereum
const INFURA_PROJECT_ID = "<pass-infura-project-id>"

const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`))



if(!web3.utils.isAddress(CONTRACT_ADDRESS)){
    console.log("Not Valid Contract Address")
    return
}

axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}`)
    .then(response => {
        var contractABI = "";
        contractABI = JSON.parse(response.data.result);
        if (contractABI != ''){
            console.log(contractABI) // prints ABI to reveal functions, event and other data we can play with.
            console.log("\n\n")
            const contractDetails = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS)
            
            //get symbol for given contract 
            contractDetails.methods.symbol().call({ from: CONTRACT_ADDRESS }, function (error, result) {
                console.log("Result of symbol: " + result)
            });

            //get isMintedBeforeReveal for given contract  against Index 1
            contractDetails.methods.isMintedBeforeReveal(1).call({ from: CONTRACT_ADDRESS }, function (error, result) {
                console.log("Result of isMintedBeforeReveal: " + result)
            });
        } 
        else {
            console.log(`Error fetching ABI contract for address ${CONTRACT_ADDRESS}`);
        }            
    })
    .catch(error => {
        console.log(error);
});
