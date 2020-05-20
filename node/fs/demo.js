// js 的后端node 用核心模块打理起服务器端开发
// 要读文件，先引入fs 
const fs = require('fs');
// 读一个文件有几步？ js运行在服务器命令行上
// 找到文件 代码由 cpu 内存 a.txt在磁盘的文件里，
// IO 花时间找文件 打开文件，读取文件，输出到命令行
// 耗时 callback 

// fs.readFile('./b.txt','utf8',(err,data) => {
//   console.log(data);
//   console.log(err);
//   fs.readFile('./a.txt','utf8',(err,data) => {
//     console.log(data);
//     console.log(err);
//   })
// })

// 当出现耗时问题时，找Promise 这是一类问题
// Promise 是耗时问题的包裹
const fileAPromise = new Promise((resolve,reject) => {
  fs.readFile('./a.txt','utf8',(err,data) =>{
    if(err){
      reject(err);
      return;
    }else{
      resolve(data);
    }
  })
});

const fileBPromise = new Promise((resolve,reject) => {
  fs.readFile('b.txt','utf8',(err,data) => {
    if(err){
      reject(err);
      return;
    }else{
      resolve(data);
    }
  })
})

fileBPromise
.then(data => {
  console.log(data);
  return fileAPromise;
}).catch(err => {
  console.log(err);
})
.then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
})


// .then(fileBPromise.then(data => {
//   console.log(data)
// }).catch(err =>{
//   console.log(err);
// }))
