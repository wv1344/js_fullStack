console.log('A')
setTimeout(() => {
  console.log('B')
}, 0);
while(true) {}


//  顺序执行，输出A，
//  setTimeout 进入任务队列， 
//  while死循环，setTimeout中的内容无法执行