const fs = require('fs');
const zlib = require('zlib');

// streaming 을 하면 다양한 pipe 끼리 연결할 수 있다.
const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});
// 압축하기
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./writeme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);