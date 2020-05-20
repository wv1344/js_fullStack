/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumbers = function(nums) {
  let ret = 0;
  for(let i=0;i<nums.length;i++){
    ret ^= nums[i]
    console.log(ret)
  }
  
};

console.log(singleNumbers([1,2,10,4,1,4,3,3]))