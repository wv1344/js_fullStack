/**
 * @param {number[]} nums
 * @return {number}
 */
// var massage = function(nums) {
//   if (nums.length <= 1) return nums[0] || 0
//   let prev2 = 0, prev1 = 0
//   for (let i = 0; i < nums.length; ++i) {
//     [prev2, prev1] = [prev1, Math.max(prev1, prev2 + nums[i])]
//     console.log(nums[i])
//     console.log('prev1-'+prev1)
//     console.log('prev2-'+prev2)
//     console.log('---')
//   }
//   return prev1
// };

// 
// var massage = function(nums) {
//   let n = nums.length
//   if (n === 0) return 0
//   if (n === 1) return nums[0]
//   let dp = new Array(n+1).fill(0)
//   dp[0] = nums[0]
//   dp[1] = Math.max(nums[0],nums[1])
//   for(let i=2;i<n;i++){
//     dp[i] = Math.max(dp[i-1], dp[i-2]+nums[i])
//   }
//   return dp[n-1]
// }

var massage = function(nums) {
  let n = nums.length
  let dp = new Array(n+1).fill(0)
  if(n===0) return 0
  if(n===1) return nums[0]
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0],nums[1])
  for(let i=2;i<n;i++){
    dp[i] = Math.max(dp[i-1],dp[i-2]+nums[i])
  }
  console.log(dp[n-1])
}

console.log(massage([2,1,4,5,3,1,1,3]))