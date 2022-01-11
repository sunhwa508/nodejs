const http = require('http');

http.createServer((req, res)=>{
  // 우리가 실행한 서버로 요청이 올 것이다. (클라이언트가 뭔지 아직 모름)
  // stream 형태
  res.write('<h1>Hello Node!</h1>')
  res.write('<h2>Hello server!</h2>')
  res.end('<p>Hello Sunhwa!</p>')
})
  // 8080의 프로세스, 포트 라고 부름 
  .listen(8080, ()=>{
      console.log('8080번 포트에서 서버 대기 중입니다.');
  })
