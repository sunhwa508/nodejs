const http = require('http');
const fs = require('fs').promises

const server = http.createServer(async(req, res)=>{
  try{
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
    const data = await fs.readFile('./server2.html');
    res.end(data);
  }catch(error){
    console.error(err);
    res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
    res.end(err.message);
  }

}).listen(8080);
  // 8080의 프로세스, 포트 라고 부름, 하나의 포트를 하나의 프로그램 이라고 생각함
  // localhost:80 === localhost


server.on('listening', ()=>{
  console.log('8080번 포트에서 서버 대기 중입니다.');
});

server.on('error', (error)=>{
  console.error(error);
});