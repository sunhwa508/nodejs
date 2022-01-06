const path = require('path');

// 운영체제마다 파일경로 형태가 다 다르지만 path를 사용하면 한번에 정리할 수 있다.
// C:\user\zerocho
// C:\\user\\zerocho
// /user/zerocho

// 절대경로 무시
console.log(path.join(__dirname, '..','/var.js'))
// 절대경로가 있으면 앞에것들을 무시
console.log(path.resolve(__dirname, '..', '/var.js'))
   