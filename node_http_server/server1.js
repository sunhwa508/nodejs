const http = require('http');

const server = http.createServer((req, res)=>{
  // 우리가 실행한 서버로 요청이 올 것이다. (클라이언트가 뭔지 아직 모름)
  // stream 형태
  // 일부 브라우저에서는 string, html 코드를 인식하지 못하기 때문에 Head 설정이 필요!
  res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
  res.write('<h1>Hello Node!</h1>')
  res.write('<h2>Hello server!</h2>')
  res.end('<p>Hello Sunhwa!</p>')
})
  // 8080의 프로세스, 포트 라고 부름, 하나의 포트를 하나의 프로그램 이라고 생각함
  // localhost:80 === localhost
  .listen(8080);

  server.on('listening', ()=>{
    console.log('8080번 포트에서 서버 대기 중입니다.');
  });

server.on('error', (error)=>{
  console.error(error);
});