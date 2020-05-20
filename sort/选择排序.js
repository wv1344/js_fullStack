function bubbleSort(arr){
  let len = arr.length
  var minIndex,temp
  for(i=0;i<len-1;i++){
    minIndex = i
    for(j=i+1;j<len;j++){
      if(arr[j] < arr[minIndex]){
        minIndex = j
      }   
      // let temp = 0;
      // if(arr[i]>arr[j]){
      //    temp = arr[i]
      //    arr[i]=arr[j]
      //    arr[j]  = temp 
      // }
    } 
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

// 每次让一个数排好，两两交换位置
const arr = [8,2,5,9,7]

console.log(bubbleSort(arr))