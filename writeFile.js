const fs = require('fs').promises;

//자바스크립트로 파일 생성
fs.writeFile('./writeme.txt', '글이 입력됩니다.')
    .then(()=>{
        return fs.readFile('./writeme.txt');
    })
    .then((data)=>{
        console.log(data.toString());
    })
    .catch((err)=>{
        throw err
    })