const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode} = require('../compile');

let lottery;
let accounts;

beforeEach(async()=>{  
accounts = await web3.eth.getAccounts();
lottery= await new web3.eth.Contract(JSON.parse(interface))
.deploy( {data:bytecode}).send({from:accounts[0],gas:'1000000'});
});

describe ('testing fuckin lottery contract',()=>{
    it('it deploys a contract',()=>{ 
        assert.ok(lottery.options.address);
    });

    it('allows one player to enter',async()=>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value:web3.utils.toWei('0.02','ether') 
        });
        const players = await lottery.methods.getPlayers().call({
            from:accounts[0]
        });
        assert.equal(accounts[0],players[0]);
        assert.equal(1,players.length);

    });
    // testing multiple accounts

    it('allows multiple player to enter',async()=>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value:web3.utils.toWei('0.02','ether') 
        });
        await lottery.methods.enter().send({
            from:accounts[1],
            value:web3.utils.toWei('0.02','ether') 
        });
        await lottery.methods.enter().send({
            from:accounts[2],
            value:web3.utils.toWei('0.02','ether') 
        });
               
        const players = await lottery.methods.getPlayers().call({
            from:accounts[0]
        });
        assert.equal(accounts[0],players[0]);
        assert.equal(accounts[1],players[1]);
        assert.equal(accounts[2],players[2]);
       assert.equal(3,players.length);

    });
    it('requires minimum number  of ethers to join the lottery',async()=>{
        // obiosly throughs errors so wrap  in the try catch block
        try{
     await lottery.methods.enter().send({
         from : accounts[0],
         value:10
     });
     assert(false); // we know that it fails exactly;
    } catch(error) {

                        assert.ok(error);         
    
               }
    
    });
    it('only manager can call pickwinner function',async()=>{
      try {
          await lottery.methods.pickWinner().send({
              from:accounts[1]

          });
          assert(false);
          
      } catch (error) {
          assert(error);
          
      }

    });
    // write end to end test buddy;
    it('end to end , sends money to the player and resets the palyers array',async()=>{
        await lottery.methods.enter().send({
            from:accounts[0],
            value:web3.utils.toWei('2','ether')
        });


        // retrieve  balance before calling 
        const initialBalance = await web3.eth.getBalance(accounts[0]);


        // calling pick winner
        await lottery.methods.pickWinner().send({ from:accounts[0] });

        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const difference = finalBalance-initialBalance;
        //console.log(difference);
        assert(difference > web3.utils.toWei('1.8','ether'));
    });



      
});

