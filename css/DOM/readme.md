## DOM
  将 一个文档 建模为 一个对象，通常是一棵树。
  我们可以用 js 操作树上的每一个节点，关联事件。

## attr
  ```html
  <p style="" class="" data-item=""> text </p>
  ```
  getAttribute
  setAttribute

## document
  整个树的入口
  document.documentElement  html节点
  不止 document.forms

## event
  事件流
  事件模型
  捕获 冒泡

## Element
  .clientHeight
  .clientWidth
  .clientTop
  .clientLeft
  .scrollHeight  滚动的高度
  .getBoundingClientReact()

## node
  nodeType
  同级节点相关的
  nextSibing
  previousSibiing
  所有子节点
  childNodes   所有的节点
  elementNodes 只获取元素节点

  remove
  append
  clone

## MutationObserver
  监测 dom 树的改变