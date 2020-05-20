## context
  跨组件之间数据传递
  this.props

  父 -> 子 -> 孙
  父 -> 孙
  被 react-router react-redux 广泛使用

## 问题
  shouldComponentUpdate
  尽可能少渲染
  return true
  return false 不更新

## context16