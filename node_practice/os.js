const os = require('os');
console.log(os.cpus())
// os의 스레드와 node의 스레드는 다른 스레드이다.
// 8코어 16스레드 코어갯수가 16개이다.