var a = 1;
function test(){
  // console.log(this === window);
  console.log(this.a)
}  
var obj = {
  a:2
}
test();         
test.call(obj);

// 模拟 call 实现
function Foo () {}
Foo.prototype = {}

// myCall
Function.prototype.myCall = function () {
  console.log(1)
}

function testMyCall() {
  console.log('testMyCall')
}

// test.myCall()