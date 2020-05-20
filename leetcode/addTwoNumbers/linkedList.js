// 将数字的每一位变成一个listNode的实例
// 既不是字符串也不是字符，而是线性表数据结构
function listNode(val) {
  this.val = val;
  // 指针
  this.next = null;
}

let number = 1234567890;

let n1 = new listNode(1);
console.log(n1);
let n2 = new listNode(2);
n1.next = n2;
let n3 = new listNode(3);
n2.next = n3;
let n4 = new listNode(4);
n3.next = n4;
let n5 = new listNode(5);
n4.next = n5;
let n6 = new listNode(6);
n5.next = n6;

// 遍历链表，travel 一下  
let node = n1;
while (node) {
  console.log(node.val);
  node = node.next;
}