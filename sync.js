const fs = require('fs');

// 동시에 실행할 수 없기때문에 비 효율적이다.
// 보통 서버 초기화 작업 할때만 사용함
let data = fs.readFileSync('./readme.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('3번', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('4번', data.toString());