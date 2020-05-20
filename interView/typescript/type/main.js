// console.log('hello ts!')
var decLitera = 1;
// decLitera = "12987";
var hexLitera = 0xf00d;
var user_name = "Tom";
var sentence = "Hello,my name is " + user_name;
var arr = [1, 2, 3];
var list = [1, 2, 3]; // 泛型
function div(x) {
    if (isFinite(1000 / x)) {
        return 'Number is NOT infinity';
    }
    return 'Number is Infinity';
}
console.log(div(0));
