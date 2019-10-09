

1. 如何使用git进行团队协作？
2. 从输入url到渲染的整个过程
3. 实现ELEMENT-UI中的组件


## 撤销 commit 操作
  git reset --soft -HEAD^
  
  HEAD^主要是控制 merge 之后回退的方向
  HEAD~才是回退的步数

  --soft 不删除工作空间改动代码，撤销 commit，不撤销 git add .

  --mixed 不删除工作空间改动代码，撤销 commit，并且撤销 git add . 操作，
    这个为默认参数, git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。

  --hard 删除工作空间改动代码，撤销 commit，撤销 git add . 
    注意完成这个操作后，就恢复到了上一次的 commit 状态。