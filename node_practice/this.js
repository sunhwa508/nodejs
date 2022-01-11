console.log(this) //global?
// console.log(this === module.exports === {} === exports);

function a(){
  console.log(this === global);
}

a();