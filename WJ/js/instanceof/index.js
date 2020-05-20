/**
 * 原型三者关系
 * 类（构造函数+原型对象） 实例对象
 * Constructor.prototype = 原型对象
 * 原型对象.constructor = 构造函数
 * 实例对象.__proto__ = 原型对象
 * instanceof  原型对象的两种表示，或者沿着原型链不停的查找
 */

// 类和实例 
// constructor
function instance_of (L,R){
  var O = R.prototype;
  console.log(O)
  L = L.__proto__;
  while(true){
    if(L === null) return false;
    if(L === O){
      return true
    }
    L = L.__proto__  // 往上级查找
  }
  // if(L.__proto__ === O){
  //   return true
  // }else{
  //   return false
  // }

}
function Animal(name){
  this.name = name
}
// 原型对象
Animal.prototype = {
  canRun : function () {
    console.log('it can run !')
  }
}
function Cat () {
  this.speak = "miao"
}
// 将Animal的实例交给Cat 子类构造函数prototype属性作为原型对象
Cat.prototype  = new Animal('miaomiaomiao')
// 原型对象的constructor属性 谁是原型对象的构造函数？
Cat.prototype.constructor = Cat;
// 实例
var dog = new Animal('小黄')
// dog.canRun()   // dog实例没有 canRun 往上查找 Animal.prototype
// console.log(dog instanceof Animal)   // true

// console.log(Animal.prototype)

// console.log(dog.__proto__)

// console.log(dog.__proto__ === Animal.prototype) // true

console.log(instance_of(dog,Animal))  // true

const garfield = new Cat('加菲猫')
console.log(instance_of(garfield,Animal))
console.log(garfield.__proto__.__proto__ === Animal.prototype)

