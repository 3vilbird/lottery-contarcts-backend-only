pragma solidity >=0.4.0 <0.7.0;

contract lottery{
    address public manager;
    address[] public players;
    constructor() public {
        manager = msg.sender;
    }
    //if the require fails to there will not be a proper indiacation theat why it is been failed
    function enter() public payable{
      require(msg.value > 0.01 ether ); 
      players.push(msg.sender);

    }

// picking a winner
 function random() private view returns (uint)
 {
   return uint(keccak256(block.difficulty,now,players));

 }
 function pickWinner()public accessOnlyToManager{
    // restricting only to the manager to call winner func;
   uint index= random() % players.length;
   players[index].transfer(this.balance); 
   // to transfer the money players[index] is an address or object which hased some properties which are hashed
  // code cleanup work
  players = new address[](0); // creating new players empty array
   }

// make use of modifire to avoid code duplication;
 modifier accessOnlyToManager(){
   require(msg.sender == manager);
   _;
 }

 function getPlayers() public view returns(address[]){
   return players;
 }



}