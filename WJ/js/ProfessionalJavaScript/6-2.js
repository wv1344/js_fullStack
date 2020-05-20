/**
 * 组合使用构造函数和原型模式
 * 
 * 实例属性在构造函数中定义
 * 实例共享属性和方法在原型中定义
 */
function Person0 () {
  this.name = name;
  this.age = age;
}
Person0.prototype = {
  constructor : Person0,
  sayName0 : function(){
    console.log(this.name)
  }
}


/**
 * 原型模式
 * 
 * 实例的指针只指向原型，不指向构造函数
 */
function Person () {
}
Person.prototype = {
  name:'ld',
  sayName:function(){
    console.log(this.name)
  }
}
let friend = new Person()
friend.sayName()  // ld

// 重写原型对象切断了现有原型与任何之前已经存在的对象实例之间的联系；
// 他们引用的仍然是最初的原型
Person.prototype = {
  sex:'gg',
  say:function (){
    console.log('hi')
  }
}
let gg = new Person()
friend.sayName() //  ld
gg.say()          // hi

// gg.sayName()  //error 
// friend.say()  //error



/**
 * 构造函数模式
 */

function Person1 () {
  this.name = name;
  this.age = age;
  this.job = job
  this.sayName = sayName
}
function sayName(){
  console.log(this.name)
}