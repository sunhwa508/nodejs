const fs = require('fs');
const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});
// 스트림 방식 읽기
// 처음에 64kbyte 를 읽음 
// 64kbyte이하면 한번에 읽음

const data = [];
readStream.on('data', (chunk)=>{
    data.push(chunk);
    console.log('data:', chunk, chunk.length);
});

readStream.on('end', () =>{
    console.log('end', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.log('error:', err)
});