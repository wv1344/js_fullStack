//       1
//      /  \
//  null   2
//         /
//       3   
//  
// 中序遍历  一棵大树 递归的概念  1 -> 3 -> 2
//        root
//       /    \
//     left  right
//    /    \
// left1 right1
// 
// 中序遍历 left1 -> left -> right1 -> root -> right
// 
//                        1
//                    /       \
//                   2         3
//                /    \     /   \
//              4       5   6     7
//  
// 中序遍历   4 -> 2 -> 5 -> 1 -> 6 -> 3 -> 7

// const inorder = (root) => {
//   if(root === null) return null;
//   inorder(root.left)
//   arr.push(root.val)
//   inorder(root.right)
// }

function treeNode(val){
  this.val = val;
  this.left = null;
  this.right = null;
}

let a1 = new treeNode(1)
let a2 = new treeNode(2)
let a3 = new treeNode(3)
let a4 = new treeNode(4)
let a5 = new treeNode(5)
let a6 = new treeNode(6)
let a7 = new treeNode(7)

a1.left=a2;a1.right=a3;
a2.left= a4;a2.right=a5;
a3.left=a6;a3.right=a7;

var inorderTraversal = function(root){
  let arr = [];
  const inorder = root => {
    if(root === null) return null;
    inorder(root.left)
    arr.push(root.val)
    inorder(root.right)
  }
  inorder(root)

  return arr;
}

console.log(inorderTraversal(a1))