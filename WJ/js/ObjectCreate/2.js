
/**
 * 小红书 P169
 * 
 * 原型式继承
 */

const person = {
  name:'gd',
  isHuman : false,
  printInfo:function(){
    console.log(`My name is ${this.name}`)
  }
}

function create(proto){
  function F() {}
  F.prototype = proto;
  return new F()
}

const me = create(person)
me.printInfo()
console.log(me.__proto__ === person)
console.log(me.name)
console.log(Object.prototype.toString.call(me))