// 类 抽象 实例化 对象
// JS 没有类，只有对象 基于原型式
// prototype __proto__

// 抽象类
const person = {
  name:'lsdj',
  isHuman : false,
  printInfo:function(){
    console.log(`My name is ${this.name}`)
  }
}

const me = Object.create(person)

me.printInfo()
console.log(me.__proto__)