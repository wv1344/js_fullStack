function bubbleSort(arr){
  for(var i=0;i<arr.length;i++){
    for(var j=0;j<arr.length-1-i;j++){
      
      if(arr[j]>arr[j+1]){
        var temp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

const arr = [2,6,3,7,1]

console.log(bubbleSort(arr))