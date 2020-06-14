var fs = require('fs')

console.log('before')

let filebefore = process.hrtime()
fs.readFile('hello.txt', 'utf8',function(err,data){
    // 文件读取是异步的，有结果后 推入队列
    console.log(data)
    fileTook = process.hrtime(filebefore)
    console.log('File took ' +fileTook)
})
//  文件读取结果 与 定时器，实际运行时，哪个先入栈？ 
    // 
setTimeout(() => {
    // setTimeout 是延迟 xxx 时间后，推入队列，
    // 假如 时间到了后，js线程并不空闲，就会继续等待，直到空闲再执行队列中事件
    console.log('timeout')
}, 2000);
      
console.log('after')  // 此处在文件读取有结果前运行，获取不到 文件内容

var obj = { a: 1 };
var niter = 22;

var before, str, pos, res, took;

for (var i = 0; i < niter; i++) {
  obj = { obj1: obj, obj2: obj }; // Doubles in size each iter
}

// 此处阻塞js主线程
before = process.hrtime();
str = JSON.stringify(obj);
took = process.hrtime(before);
console.log('JSON.stringify took ' + took);

for(var j = 0; j < 5; j++){
    console.log(j)
}