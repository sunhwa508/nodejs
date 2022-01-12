const http = require('http');

http.createServer((req, res)=>{
  // cookit = 값 
  console.log(req.url, req.headers.cookie);
  res.writeHead(200, {'Set-Cookie' : 'myCookie=test'});
  res.end('Hello Cookie');
  })
    .listen(8083, ()=>{
      console.log('8083번 포트에서 서버 대기 중입니다!')
    });
