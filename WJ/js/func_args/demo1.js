function information({name,sex,money,birthday,color,likes,follow,age}){
  return `${name} ${sex} ${money} ${birthday} ${color} ${likes} ${follow} ${age}`
}

let user = {name:'lidan',sex:'girl',money:'100000000',birthday:'520',color:'green',likes:['music'],follow:'xiao',age:16};
// let name = name;
console.log(information(user));