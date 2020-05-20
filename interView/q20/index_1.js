setTimeout(() => {
  console.log('setTimeout')
}, 50);

function foo(){
  console.log('🚀')
}

function bar(){
  foo()
}

Promise.resolve().then(()=>{
  console.log('promise1')
}).then(()=>{
  console.log('promise2')
})

bar()