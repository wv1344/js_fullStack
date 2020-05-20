// console.log('hello ts!')

let decLitera: number = 1;
// decLitera = "12987";

let hexLitera:number = 0xf00d;

let user_name: string = "Tom";
let sentence: string = `Hello,my name is ${user_name}`;

let arr:number[] = [1,2,3];
let list:Array<number> = [1,2,3];  // 泛型

function div(x){
  if(isFinite(1000/x)){
    return 'Number is NOT infinity'
  }
  return 'Number is Infinity'
}

console.log(div(0))