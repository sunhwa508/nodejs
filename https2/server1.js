const https2 = require('https');
const fs = require('fs');

https2.createServer({
  // 서버에서 Sync 를 써도 되는 경우
  // 한번만 실행 되거나, 초기화 할때
  // letsencrypt (인증서 받는 유명한 사이트)
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
// https 는 포트가 443 
  .listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다!');
  });