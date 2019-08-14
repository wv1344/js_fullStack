const requireComponent = require.context(
  // 组件目录的相对路径
  '../../components/global',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名，使用正则
  /[A-Z]\w+\.(vue|js)$/
)

export default {
  install:(Vue,option) => {
    requireComponent.keys().forEach(fileName => {
      // 获取组件的配置
      const componentConfig = requireComponent(fileName)
      // 获取组件的命名
      const componentName = fileName.replace(/^\.\/(.*)\.\w+$/,'$1')

      // 全局注册组件
      Vue.component(
        componentName,
        componentConfig.default || componentConfig
      )
    })
  }
}