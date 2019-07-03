- .ts
  typescript 是 js 超集
  typescript 会编译成 js
  可以跟写 java 一样
  .ts -> webpack loader -> babel -> js
  大型项目，可以有效减少bug 60%
  更好的多人协作

- 将弱类型的 js 变成静态的 typescript
  错误在编译阶段就解决了
  let a:string = 1;  错误
  在比较重要的场合： 如vuex
  interface 声明自定义的类型 接口
  多出的 20% 代码，有了类型检测，代码更可靠
  
- vuex 提供了一些类型给 typescript 