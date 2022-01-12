const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if(cluster.isMaster){
  console.log(`마스터 : ${process.pid}`);
  for(let i = 0; i< numCPUs; i += 1){
    // cpu 갯수만큼 서버가 띄워짐
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
    // 워커가 종료 될 때마다 새로운 워커를 실행시킴
    cluster.fork();
  });
} else{
  // 워커 프로세스
  http.createServer((req, res)=>{
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node</h1>');
    res.end('<p>Hello Cluster</p>');
    setTimeout(()=>{
      process.exit(1);
    },1000);
  }).listen(8086);

  console.log(`${process.pid}번 워커 실행`);
  }