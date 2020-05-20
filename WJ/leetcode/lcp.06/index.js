/**
 * @param {number[]} coins
 * @return {number}
 */
var minCount = function(coins) {
  let count = 0
  coins.forEach(item => {
    count += parseInt(item/2)
    count += item&1
  })
  return count
};

console.log(minCount([4,2,1]))