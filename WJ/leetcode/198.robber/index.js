/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  let n = nums.length
  let dp = new Array(n+1).fill(0)
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0],nums[1])
  for(let i=2;i<n;i++){
    dp[i] = Math.max(dp[i-1],dp[i-2]+nums[i])
  }
  console.log(dp)
  return dp[n-1]
};

console.log(rob([2,7,9,3,1]))