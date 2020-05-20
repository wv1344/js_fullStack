// /**
//  * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
//  */

// function Stack() {
//   this.dataStore = [],
//   this.top = 0,
//   this.pop = pop,
//   this.push = push,
//   this.peek = peek,
//   this.length = length,
//   this.clear = clear
// }
// function push(data) {
//   this.dataStore[this.top++] = data
// }
// function pop() {
//   return this.dataStore[--this.top]
// }
// function peek(){
//   if(this.top>0) return this.dataStore[this.top-1];
//   else return 'Empty'
// }
// function length() {
//   return this.top
// }
// function clear (){
//   delete this.dataStore
//   this.dataStore = []
//   this.top = 0
// }


// /**
//  * @param {number} x
//  * @return {boolean}
//  */
// var isPalindrome = function(x) {
//   let a = new Stack()
//   let str = String(x).split('')
//   let len = str.length
//   for(let i=0;i<len;i++){
//     a.push(str[i])
//   }
//   let revert = ''
//   while(a.length()>0){
//     revert += a.pop() 
//   }
//   if (revert === String(x)) return true
//   else return false
// };

/**
 *  速度慢
 */
// var isPalindrome = function(x) {
//   let str = String(x).split('')
//   for(let i=0;i<str.length/2;i++){
//     if(str[i]!==str[str.length-i-1]) return false
//   }
//   return true
// };

// var isPalindrome = function(x) {
//   if(x<0) return false
//   let bar = 1
//   while(x/bar>10) bar *= 10
//   while(x>0){
//     let left = parseInt(x/bar)
//     let right = parseInt(x%10)
//     if(left!==right) return false
//     x = parseInt((x%bar)/10)
//     bar/=100
//   }
//   return true
// };


var isPalindrome = function(x) {
  var reveseNum = String(x).split("").reverse().join("");
  return reveseNum==x
};




console.log(isPalindrome(1221))