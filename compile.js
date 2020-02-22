const path=require('path');
const fs=require('fs');
const solc=require('solc');

const lotteryPath=path.resolve(__dirname,'contracts','Lottery.sol');
const source = fs.readFileSync(lotteryPath,'utf8'); // path and encoding;
// console.log(solc.compile(source,1));
module.exports=solc.compile(source,1).contracts[':lottery']; // source and noo of contracts to be complied;



