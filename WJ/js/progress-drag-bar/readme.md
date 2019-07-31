1. 三个容器 背后 100%宽度 原点 已经拖动进度条
2. touchStart touchMove touchEnd 
3. 改变 width left

```js
new Promise('selector',{
  onDrag:() => {},
  onDragStart:() => {},
  onDragEnd:() => {},
  progress:0.5,
  disableDrag:false
})
```