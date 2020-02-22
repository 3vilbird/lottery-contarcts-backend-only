pragma solidity >=0.4.0 <0.7.0;
// https://ethfiddle.com/ link to online compiler which i found better
contract Test{
    uint[] public myarray;
     constructor() public{
         myarray.push(1);
         myarray.push(2);
         myarray.push(3);
         myarray.push(4);
     }
     function getLength()public view returns(uint){
         return myarray.length;
         }
     function getEle() public view returns(uint){
         return myarray[3];
     }
      function getarray()public view returns(uint[]){
         return myarray;
     }
     }