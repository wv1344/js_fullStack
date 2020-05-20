/**
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 */
/*
动态规划的思想，可考虑如下几种情况：
1、如果一个字符串的首尾两个字符不相等，那么这个字符串一定不是回文串；
2、如果一个字符串的首尾两个字符相等:
（1）如果里面的子串是回文，整体就是回文串；
（2）如果里面的子串不是回文串，整体就不是回文串；
*/

/**
 * @param {string} s
 * @return {string}
 */
// var longestPalindrome = function(s) {
//   let res = ''
//   let max = 0
//   let str = s.split('')
//   while(str.length>0){
//     let len = str.length
//     for(let i=0;i<len;i++){
//       let temp = str.slice(0,i+1)
//       let bar = [...temp].reverse().join('')
//       if( bar == temp.join('')) {
//         if(temp.length>max) {
//           max = temp.length
//           res = temp.join('')
//         }
//       }
//     }
//     str.shift()
//   }
//   return res
// };

// var isPalindrome = function(x) {
//   var reveseNum = String(x).split("").reverse().join("");
//   return reveseNum==x
// };
// var longestPalindrome = function(s) {
//   let res = ''
//   let max = 0
//   let str = s.split('')
//   for(let i=0;i<str.length;i++){
//     for(let j=i+1;j<=str.length;j++){
//       let test = s.substring(i,j)
//       console.log(test)
//       if(isPalindrome(test)&&test.split().length>max){
//         res = test
//         max = test.split().length
//       }
//     }
//   }
//   return res
// }

var longestPalindrome = function (s) {
  let res = ''
  let max = 0
  let str = s.split('')
  let n = str.length
  // console.log(str)
  // 每一个数组
  let dp = Array.from(new Array(n), () => new Array().fill(0));
  for (let i = n- 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i + 1][j - 1]);
      if (dp[i][j] && j - i + 1 > res.length) {
        res = s.slice(i, j + 1);
      }
    }
  }
  return res
}



console.log(longestPalindrome("civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth"))
// console.log(longestPalindrome("babad"))