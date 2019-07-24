// function Person(name){
//   this.name = name
//   return {}
// }

// let p = new Person('wn')
// console.log(p)
// p.__proto__  等于 Person.prototype
// Person.__proto__ == Function.prototype
// 实例的__proto__ 等于其构造函数的 prototype

// var foo = {}, F = function(){};

// Object.prototype.a = 'valA'
// Function.prototype.b = 'valB'
// console.log(foo.a)
// console.log(foo.__proto__)
// console.log(F.a)

// let o = new Person()
// console.log(o)


// 构造函数是不需要返回值的，使用 new 来创建对象时，如果 return 的是非对象类型，会忽略返回值，如果 return 的是对象，则返回对象，若 return null 也会忽略返回值

function Person(name){  // 构造函数
  this.name = name;
};
function Student(){  // 普通函数

};
Student.prototype = Person.prototype
Student.prototype.constructor = Student

let s = new Student()

// console.log(s instanceof Person)
// console.log(s)

for(var i = 0 ;i<9;i++){
  setTimeout(() => {
    // console.log(i)
  }, 0);
}
for(var i = 0 ; i<9;i++){
  (function(i){
    setTimeout(()=>{
      // console.log(i)
    },0)
  })(i)
}

//  let 每次循环会生成一个封闭的作用域和settimeout绑定，而 var 每次循环会覆盖掉上次的作用域

Array.prototype.method = function(){
  console.log('n')
}

var myArr = [1,2,3,4,5,6,7]

for  (let index of myArr){
  // console.log(index)
}
myArr.name = 'b'
for  (let index in myArr){
  // index 为下标
  // console.log(index)
  // console.log(myArr[index]) 
}
//  避免使用 for in 遍历数组

/**
 * for in 
 * 0. 遍历的数组的索引
 * 1. index 索引为字符串型的数字，不能直接进行几何运算
 * 2. 有可能出现遍历出来的顺序不是按照数组内部的顺序执行的
 * 3. 使用 for in 会遍历数组所有可枚举的属性，包括原型链
 * 4. 所以 for in 更适合遍历对象
 */

/**
 * for of
 * 0. 遍历的是数组的元素
 * 1. 而不包括数组的属性和原型
 */


let gArr = [1,2,[3,4],5,[2,7,[3,9]]]
// let gArr = [1,2,3,4,5,2,7,3,9]

// function outputArr(arr){
//   let res = []
//   for(let i=0;i<arr.length;i++){
//     if(Array.isArray(arr[i])){
//       res = res.concat(outputArr(arr[i]))
//     }else{
//       res.push(arr[i])
//     }
//   }
//   return res
// }

function outputArr(arr){
  return arr.reduce(function(pre,item){
    console.log(pre)
    return pre.concat(Array.isArray(item) ? outputArr(item) : item)
  },[])
}

console.log(outputArr(gArr))