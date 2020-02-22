
// make sence "Web3" upper case 'W' it is a constractor function;
const Web3 = require('web3');
const {interface,bytecode}=require('./compile');
const HDwallet = require('truffle-hdwallet-provider');

const provider = new HDwallet(
    'jaguar sand bronze purity brother office crunch crowd father slice report uphold',
    'https://rinkeby.infura.io/v3/8b26dde229f6446b9d8ad92d0b2fcce8'
);
const web3 = new Web3(provider);

const deploy = async ()=>{
const accounts = await web3.eth.getAccounts();


console.log("attempting to deploy using an account",accounts[0]);

const result = await new web3.eth.Contract(JSON.parse(interface))
 .deploy({data:bytecode})
 .send({gas:'1000000',from:accounts[0]});

  console.log(interface);
 console.log("contract deployed to",result.options.address);
};
deploy(); // just to make use of asyc and await,which can  be used only inside a function;
