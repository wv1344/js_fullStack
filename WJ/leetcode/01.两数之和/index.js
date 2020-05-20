// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number[]}
//  */
// // var twoSum = function(nums, target) {
// //   const cur = [];
// //   for(let i = 0;i<nums.length;i++){
// //     for(let j = i+1;j<nums.length;j++){
// //       if(nums[i]+nums[j] === target){
// //         cur.push(i,j)
// //         return cur;
// //       }
// //     }
// //   }
// // };

// var twoSum = function(nums, target) {
//   var map = {
//     'lilei':'李雷',
//     'lihua':'李华'
//   }
//   var lihuaFun = () => {
//     console.log('shuijiao')
//   }
//   var lileiFun = () => {
//     console.log('chifan')
//   }
//   var userNameMap = {
//     'lilei':lileiFun,
//     'lihua':lihuaFun,
//   }
//   function doSomething(userName){
//     if(userName === 'lilei'){
//       lileiFun();
//     }else if(userName === 'lihua'){
//       lihuaFun();
//     }
//   }
//   let map1 = new Map();

//   var numsMap ={
//     '2':0,
//     '7':1,
//     '11':2,
//     '5':3,
//   }
//   // for(var i = 0;i<length;i++)

// };


// var set = [...(new Set([1,2,3,4,5,6]))]
var twoSum = function(nums,target){
  // 给所有值建立map
  var obj = {}
  for(let i=0;i<nums.length;i++){
    obj[nums[i]] = i;
  }
  for(let i=0;i<nums.length;i++){
    let cur = nums[i];
    let anotherNum = target - cur;
    if(obj[anotherNum] !== undefined && obj[anotherNum] !== i){
      return [i,obj[anotherNum]]
    }
  }
}

var num = [3,2,4]

console.log(twoSum(num,6))