let objArr = [{name:'shili',age:77},{name:'shiwo',age:88}]
let b = objArr.map(item => {
  item.age = 99
  return item
})
console.log(objArr)
console.log(b)

let array = [1,2,3,4,5]
array.map(item => {
  
})

Array.prototype.myMap = function (fn,ctx) {
  let arr = Array.prototype.slice.call(this)
  let mappedArr = []
  console.log(fn)
  for(let i=0;i<arr.length;i++){
    mappedArr.push(fn.call(ctx,arr[i],i,this))
  }
  return mappedArr
}
let a = array.slice()

a.push(0)
// console.log(array.slice(1))
console.log(a)
let c = array.myMap(item=> {
  item = item+1
  return item
})
console.log(c)
array.reduce((total,cur,index,arr) => {
  console.log('arr-'+arr)
  console.log('cur-'+cur)
  console.log('index-'+index)
  return cur
},[])