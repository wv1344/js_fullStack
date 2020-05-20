/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    // 最短字符串
    if(strs.length === 0) return "";
    if(strs.length === 1) return strs[0];

    let miniLen = Number.MAX_VALUE;
    for(let i = 0;i<strs.length;i++){
      miniLen = Math.min(miniLen,strs[i].length)
      // if(strs[i].length<miniLen){
      //   miniLen = strs[i].length
      // }
    }
    console.log(miniLen)
    // 二分
    let low = 0,
      height = miniLen;  // 动态
    while(low <= height){
      const middle = (height+low) >>1;
      if(isCommonPrefix(strs,middle)){
        low = middle+1;
      }
      else{
        height = middle-1;
      }
    }
    return strs[0].substring(0,(low+height) >> 1);  // 最后的 middle
};
const isCommonPrefix = function(strs,middle){
  const prefix = strs[0].substring(0,middle);
  for(let i=1;i<strs.length;i++){
    if(!strs[i].startsWith(prefix)){
      return false
    }
  }
  return true
}


console.log(longestCommonPrefix(["flower","flow","flight"]))