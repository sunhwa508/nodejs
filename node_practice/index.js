const {odd ,even} = require('./var');
const {checkOddOrEven} = require('./func');

function checkStringOddOrEven(str){
  if(str.length % 2){
    return odd;
  }else{
    return even;
  }
}

console.log(checkOddOrEven(20));
console.log(checkStringOddOrEven('hello'))
