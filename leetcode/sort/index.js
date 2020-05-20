

var arr1 = [1,7,3,75,4,9]

let a = arr1.sort(function(a,b){
  return b-a
})


// function findKthlargest(nums,k){
//   if(k<0 || k>nums.length-1) return NaN;
//   return nums.sort((a,b) => b-a)[k-1]
// }

function quickSort(arr){
  if(arr.length <= 1) {return arr};
  let left = [];
  let right = [];
  let baseDom = Math.round(arr.length / 2)
  let base = arr.splice(baseDom,1)[0]
  for(let i=0;i<arr.length;i++){
    if(arr[i]>base){
      right.push(arr[i])
    }else(
      left.push(arr[i])
    )
  }
  return quickSort(right).concat([base],quickSort(left));
}

function findKthlargest(nums,k){
  if(k<0 || k>nums.length-1) return NaN;
  console.log(quickSort(nums))
  return quickSort(nums)[k]
}

console.log(findKthlargest(arr1,1))