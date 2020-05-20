
// console.log(new Promise(function(resolve,reject){
//   console.log('1')
//   resolve('111')
// })
// .then(function(data){
//   console.log('handle-'+data)
//   return new Promise(function(resolve,reject){
//     console.log('2')
//     resolve('222')
//   })
// })
// .then(function(data){
//   console.log('handle-'+ data)
//   return new Promise(function(resolve,reject){
//     console.log('3')
//     resolve('333')
//   })
// })
// .then(function(data){
//   console.log('handle-'+data)
// }))


let a = new Promise(function(resolve,reject){
  setTimeout(() => {
    console.log('1')
    resolve('111')
  }, 1000);
})

let b = new Promise(function(resolve,reject){
  console.log('2')
  resolve('222')
})

let c = new Promise(function(resolve,reject){
  console.log('3')
  resolve('333')
})

Promise.race([a,b,c]).then(function(res){
  console.log(res)
})
