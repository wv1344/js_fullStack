将 js 走向后端

没有 DOM
有命令行，有服务器，
文件系统 

代码的书写顺序和执行顺序不一样
如何确保顺序
回调解决带来了回调地狱 可读性
Promise

拆分Promise 来理解
- 解决耗时这一类问题 new Promise()
- 问题解决了后，控制权的转移能够得以控制，js 单线程 resolve => then 
- resolve(data) 
  代码编写顺序和执行顺序是一致的，异步问题就变成了同步。
  callback 读很难，
- reject I/O等操作有可能发生问题
- 多个文件确保执行顺序 then 链
  在每个Promise then 里返回一个Promise
- 如果我们要让多个文件并发去执行 当所有文件都读取完，再执行？