const spawn = require('child_process').spawn;

// 노드에서 spawn 으로 다른 언어의 파일 호출 
const process = spawn('python', ['test.py']);

process.stdout.on('data', function(data){
  console.log(data.toString());
})

process.stderr.on('data', function(data){
  console.error(data.toString());
})