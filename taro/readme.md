- 小程序为什么要框架？
  原生写小程序 有组件化，但是语法好怪，vue，react开发者，学习成本高
  taro（react） mpvue（vue） 让开发者不用学小程序就可以写了
  命令行工具可以安装一堆的 npm 包，极大的扩展了小程序的功能
  compile  src -> dist

- jsx 
  xml in js,react template 的新语法
  jsx -> babel -> preset react -> js
  render(){
    return(

    )
  }

  react 没有 v-for v-if 指令
  原生写
  <view>
    {
      this.data.list.map((item,index) => {
        return (
          ....
        )
      }
    }
  </view>