// /**
//  * 
// I             1
// V             5
// X             10
// L             50
// C             100
// D             500
// M             1000
//  */

/**
 * @param {string} s
 * @return {number}
 */
var data = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
}
var romanToInt = function(s) {
let str = s.split('').reverse()
let res = 0
for(let i=0;i<str.length;i++){
  res = res + data[str[i]]
  // if((str[i-1] === 'V' || str[i-1] === 'X') && str[i] === 'I'){
  //   res = res - 2
  // }
  // if((str[i-1] === 'L' || str[i-1] === 'C') && str[i] === 'X'){
  //   res = res - 20
  // }
  // if((str[i-1] === 'D' || str[i-1] === 'M') && str[i] === 'C'){
  //   res = res - 200
  // }
  if(data[str[i]]<data[str[i-1]]) {
    res = res - 2*data[str[i]]
  }

}
return res
};

// console.log(romanToInt("IV"))

// var data = {
//   I: 1,
//   V: 5,
//   X: 10,
//   L: 50,
//   C: 100,
//   D: 500,
//   M: 1000
// }
// var romanToInt = function(s) {
// // let str = s.split('').reverse()
// let str = s.split('')
// let res = 0
// for(let i=str.length-1;i>=0;i--){
//   res = res + data[str[i]]
//   // if((str[i-1] === 'V' || str[i-1] === 'X') && str[i] === 'I'){
//   //   res = res - 2
//   // }
//   // if((str[i-1] === 'L' || str[i-1] === 'C') && str[i] === 'X'){
//   //   res = res - 20
//   // }
//   // if((str[i-1] === 'D' || str[i-1] === 'M') && str[i] === 'C'){
//   //   res = res - 200
//   // }
//   if(data[str[i]]<data[str[i+1]]) {
//     res = res - 2*data[str[i]]
//   }

// }
// return res
// };

// console.log(romanToInt("LVIII"))
