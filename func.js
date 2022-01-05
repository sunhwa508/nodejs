// const value = require('./var.js')
// 구조분해할당
const {odd, even} = require('./var.js');

function checkOddOrEven(number){
  if(number%2){
    return odd;
  }else{
    return even;
  }
}
module.exports = {checkOddOrEven, odd, even}