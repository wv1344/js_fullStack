// 'aba'
var str1 = "A man, a plan, a canal: Panama";
var str2 = 'abcdcba';

function confirmStr (str){
  // str = str.replace(/\s*/g,"");
  // str = str.replace(/,/g,'');
  // str = str.replace(/:/g,'');
  // str = str.toLowerCase();
  // console.log(str)

  let strArr = str.split("")
  let reStr = strArr.reverse().join("")

  // console.log(strArr.reverse())
  // console.log(reStr)
  // console.log(strArr)

  if(reStr === str){
    return true
  }else{
    return false
  }
  
}


var isValidChar = (c) =>  {  // abc 123
  return /^[\w]$/.test(c);
}

var isPalindrom = (s) => {
  s = s.toLowerCase();
  let left = 0, right = s.length - 1;
  while(left < right){
    if(!isValidChar(s[left])){
      left ++;
      continue;
    }
    if(!isValidChar(s[right])){
      right --;
      continue;
    }
    if(s[left] == s[right]){
      left ++ ;
      right -- ;
    }else{
      break;
    }
  }
  return right <= left
}

// console.log(confirmStr(str1))
// console.log(confirmStr(str2))

console.log(isPalindrom(str1))