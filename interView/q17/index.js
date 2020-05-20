function Animal (name){
  this.name = name;
  this.sleep = function(){
    console.log(this.name + '睡着了')
  }
}
Animal.prototype.eat = function(food){
  console.log(this.name + '正在吃' + food)
}



// //  原型链的继承
// function Cat (){}

// Cat.prototype = new Animal(); //将 Animal 实例赋给Cat.prototype
// Cat.prototype.name = 'cat'

// let  a = new Cat()

// console.log(a.eat('fish'))
// console.log(a.sleep())
// console.log(a.name)
// console.log('prototype'+Cat.prototype)
// console.log('prototype'+a.__proto__)
// console.log(a instanceof Animal)
// console.log(a instanceof Cat)



//   构造函数的继承
// function Cat(name){
//   Animal.call(this)
//   this.name = name || 'Tom'
// }

// var cat = new Cat('ndndn')

// console.log(cat.name)
// console.log(cat.sleep())
// console.log(cat instanceof Cat)
// console.log(cat instanceof Animal)
// console.log(Cat.prototype)
// console.log(Cat.__proto__)



//  组合继承
// function Cat(name){
//   Animal.call(this)
//   this.name = name || 'Tom'
// }

// Cat.prototype = new Animal();

// var bigcat = new Cat()

// console.log(bigcat.name)
// console.log(bigcat.sleep())
// console.log(bigcat instanceof Cat)
// console.log(bigcat instanceof Animal)
// console.log(Cat.prototype)
// console.log(bigcat.__proto__)



//  寄生组合继承
function Cat(name){
  Animal.call(this)
  this.name = name || 'Tom'
}

(function(){
  // 创建没有实例方法的类
  var Super = function(){}
  Super.prototype = Animal.prototype
  Cat.prototype = new Super()
})()

var fitcat = new Cat();

console.log(fitcat.name)
console.log(fitcat.sleep())
console.log(fitcat.eat('wn'))
console.log(fitcat instanceof Cat)
console.log(fitcat instanceof Animal)
console.log(Cat.prototype)
console.log(fitcat.__proto__)