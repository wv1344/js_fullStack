/**
 * @param {number} n
 * @param {number[][]} relation
 * @param {number} k
 * @return {number}
 */
var numWays = function(n, relation, k) {
  let count = 0
  let left = relation.map(item => item[0])
  let right = relation.map(item => item[1])
  console.log(left)
  console.log(right)
  
};

// 5个人k步传到4  k=3
console.log(numWays(5,[[0,2],[2,1],[3,4],[2,3],[1,4],[2,0],[0,4]],3))