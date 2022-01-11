process.on('uncaughtException', (err) => {
  // 노드에서 발생하는 모든 에러를 관리한다.
  // 에러 기록용으로만 사용한다. (이 코드가 실행되지 않도록)
  console.error('예기치 못한 에러', err);
})

setInterval(()=>{
  throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(()=>{
  console.log('실행됩니다');
}, 2000);

// 맥 /리눅스 프로세스 종료하기
// $ lsof -i tcp:포트
// $ kill -9 프로세스 아이디 