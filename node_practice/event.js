const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', ()=>{
  console.log('event 1')
});

myEvent.on('event2', ()=>{
  console.log('event 2')
});
myEvent.on('event2', ()=>{
  console.log('event 2 추가')
});

myEvent.once('event3', ()=>{
  console.log('event 3')
})

myEvent.emit('event1');
myEvent.emit('event2');

myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', ()=>{
  console.log('event 4');
})
myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 실행안됨

const listener = () => {
  console.log('event 5');
}

myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5');

// event2에 콜백함수가 몇개 등록되어 있는지
console.log(myEvent.listenerCount('event2'));
