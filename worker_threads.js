const {isMainThread, Worker, parentPort, workerData} = require('worker_threads')

if(isMainThread){
  // main thread
  const threads = new Set(); //중복되지 않는 배열
  threads.add(new Worker(__filename,{
    workerData: {start : 1},
  }));
  threads.add(new Worker(__filename,{
    workerData: {start : 2},
  }));
  for(let worker of threads){
    worker.on('message', (value)=> console.log('from worker', value));
    worker.on('exit', () => {
      threads.delete(worker);
      if(threads.size === 0){
        console.log('워커 끝!');
      }
    });
  }
}else{
  const data = workerData;
  parentPort.postMessage(data.start + 100);
}