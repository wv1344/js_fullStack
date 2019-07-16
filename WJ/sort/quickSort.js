// - 快排
// 抽象 a b(女神) c 一次
// 【8，2，5（女神），9，7】
// 递归

function quickSort(arr){
  if(arr.length <= 1) {return arr.concat([222])}
  var left = [],
  right = [],
  baseDot = Math.round(arr.length / 2),
  // round 四舍五入
  // ceil  向上取整
  // floor 向下取整
  base = arr.splice(baseDot,1)[0];

  for(var i = 0;i<arr.length;i++){
    if(arr[i]<base){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }  

  // 找到中间值，

  // left a
  // base b 中间值
  // right c
  return quickSort(left).concat([base],[33333],quickSort(right))
}

const arr = [2,5,14,6,9,7,3]
// const arr = [8,2,5,9,7]


console.log(quickSort(arr))