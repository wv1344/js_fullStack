/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let bar = {}
  // nums.forEach(item => {
  //   if (!bar[item]) bar[item] = 1
  //   else bar[item]++
  // })
  // for (let i = 0; i < nums.length; i++) {
  //   if (bar[nums[i]] > nums.length / 2) return nums[i]
  // }

  if(nums.length===1) return nums[0]
  for(let i=0;i<nums.length;i++){
    if(!bar[nums[i]])  bar[nums[i]] = 1
    else {
      bar[nums[i]]++
      if(bar[nums[i]]>nums.length/2) return nums[i]
    }
  }
  return -1
};

console.log(majorityElement([6,5,5]))